export interface MortgagePreset {
  slug: string
  amount: number
  rate: number
  term: number
  title: string
  description: string
  monthlyPayment: number
  totalInterest: number
  totalCost: number
  faqs: Array<{ question: string; answer: string }>
  relatedMortgages: string[]
}

function calcMortgage(amount: number, annualRate: number, termYears: number) {
  const monthlyRate = annualRate / 100 / 12
  const numPayments = termYears * 12
  const monthlyPayment =
    (amount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)
  const totalCost = monthlyPayment * numPayments
  const totalInterest = totalCost - amount
  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
  }
}

function formatAmount(n: number): string {
  if (n >= 1000000) return `$${n / 1000000}M`
  if (n >= 1000) return `$${n / 1000}k`
  return `$${n}`
}

function formatCurrency(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

const amounts = [50000, 100000, 150000, 175000, 200000, 225000, 250000, 275000, 300000, 325000, 350000, 375000, 400000, 425000, 450000, 500000, 600000, 750000, 850000, 1000000]
const rates = [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8]
const terms = [15, 20, 30]

// Build slug including term
function buildSlug(amount: number, rate: number, term: number): string {
  // Convert rate to slug-safe string: 3.5 -> "3-5", 4 -> "4"
  const rateStr = String(rate).replace('.', '-')
  return `mortgage-${amount}-at-${rateStr}-percent-${term}yr`
}

// Generate all combinations
const slugSet = new Set<string>()
const combos: Array<{ amount: number; rate: number; term: number }> = []

for (const a of amounts) {
  for (const r of rates) {
    for (const t of terms) {
      const slug = buildSlug(a, r, t)
      if (!slugSet.has(slug)) {
        slugSet.add(slug)
        combos.push({ amount: a, rate: r, term: t })
      }
    }
  }
}

function getRelated(amount: number, rate: number, term: number): string[] {
  const related: string[] = []

  // Same amount + rate, different terms
  for (const t of terms) {
    if (t !== term) {
      const s = buildSlug(amount, rate, t)
      if (slugSet.has(s)) related.push(s)
    }
  }

  // Same amount + term, different rates
  for (const r of rates) {
    if (r !== rate) {
      const s = buildSlug(amount, r, term)
      if (slugSet.has(s)) related.push(s)
    }
    if (related.length >= 5) break
  }

  // Same rate + term, different amounts
  for (const a of amounts) {
    if (a !== amount) {
      const s = buildSlug(a, rate, term)
      if (slugSet.has(s)) related.push(s)
    }
    if (related.length >= 8) break
  }

  return related.slice(0, 8)
}

export const mortgagePresets: MortgagePreset[] = combos.map(({ amount, rate, term }) => {
  const { monthlyPayment, totalInterest, totalCost } = calcMortgage(amount, rate, term)
  const slug = buildSlug(amount, rate, term)
  const amountLabel = formatAmount(amount)
  const rateLabel = `${rate}%`

  return {
    slug,
    amount,
    rate,
    term,
    title: `${amountLabel} Mortgage at ${rateLabel} for ${term} Years — Monthly Payment`,
    description: `Calculate the monthly payment on a ${formatCurrency(amount)} mortgage at ${rate}% interest for ${term} years. Monthly payment: ${formatCurrency(monthlyPayment)}.`,
    monthlyPayment,
    totalInterest,
    totalCost,
    faqs: [
      {
        question: `What is the monthly payment on a ${formatCurrency(amount)} mortgage at ${rate}% for ${term} years?`,
        answer: `The monthly payment on a ${formatCurrency(amount)} mortgage at ${rate}% for ${term} years is ${formatCurrency(monthlyPayment)}. This includes principal and interest only — taxes and insurance are additional.`,
      },
      {
        question: `How much total interest will I pay on a ${formatCurrency(amount)} loan at ${rate}% over ${term} years?`,
        answer: `Over ${term} years, you will pay ${formatCurrency(totalInterest)} in total interest on a ${formatCurrency(amount)} loan at ${rate}%. The total cost including principal is ${formatCurrency(totalCost)}.`,
      },
      {
        question: `How does a ${term}-year term compare to a 30-year mortgage for ${amountLabel} at ${rateLabel}?`,
        answer: term === 30
          ? `A 30-year mortgage keeps monthly payments lower, making it easier to qualify, but you pay more interest over the life of the loan compared to shorter terms.`
          : `A ${term}-year mortgage has higher monthly payments than a 30-year loan, but you pay significantly less total interest and build equity faster.`,
      },
    ],
    relatedMortgages: getRelated(amount, rate, term),
  }
})

export function getMortgageBySlug(slug: string): MortgagePreset | undefined {
  return mortgagePresets.find((p) => p.slug === slug)
}
