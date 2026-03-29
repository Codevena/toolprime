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

const amounts = [50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000, 600000, 750000, 850000, 1000000]
const rates = [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8]
const defaultTerm = 30

// Generate all combinations for a robust set of ~150 pages
const slugSet = new Set<string>()
const combos: Array<{ amount: number; rate: number }> = []

for (const a of amounts) {
  for (const r of rates) {
    const slug = `mortgage-${a}-at-${r}-percent`
    if (!slugSet.has(slug)) {
      slugSet.add(slug)
      combos.push({ amount: a, rate: r })
    }
  }
}

function buildSlug(amount: number, rate: number): string {
  return `mortgage-${amount}-at-${rate}-percent`
}

function getRelated(amount: number, rate: number): string[] {
  const related: string[] = []

  // Same amount, different rates
  for (const r of rates) {
    if (r !== rate) {
      const s = buildSlug(amount, r)
      if (slugSet.has(s)) related.push(s)
    }
    if (related.length >= 4) break
  }

  // Same rate, different amounts
  for (const a of amounts) {
    if (a !== amount) {
      const s = buildSlug(a, rate)
      if (slugSet.has(s)) related.push(s)
    }
    if (related.length >= 8) break
  }

  return related.slice(0, 8)
}

export const mortgagePresets: MortgagePreset[] = combos.map(({ amount, rate }) => {
  const { monthlyPayment, totalInterest, totalCost } = calcMortgage(amount, rate, defaultTerm)
  const slug = buildSlug(amount, rate)
  const amountLabel = formatAmount(amount)
  const rateLabel = `${rate}%`

  return {
    slug,
    amount,
    rate,
    term: defaultTerm,
    title: `${amountLabel} Mortgage at ${rateLabel} — Monthly Payment Calculator`,
    description: `Calculate the monthly payment on a ${formatCurrency(amount)} mortgage at ${rate}% interest for ${defaultTerm} years. Monthly payment: ${formatCurrency(monthlyPayment)}.`,
    monthlyPayment,
    totalInterest,
    totalCost,
    faqs: [
      {
        question: `What is the monthly payment on a ${formatCurrency(amount)} mortgage at ${rate}%?`,
        answer: `The monthly payment on a ${formatCurrency(amount)} mortgage at ${rate}% for ${defaultTerm} years is ${formatCurrency(monthlyPayment)}. This includes principal and interest only — taxes and insurance are additional.`,
      },
      {
        question: `How much total interest will I pay on a ${formatCurrency(amount)} loan at ${rate}%?`,
        answer: `Over ${defaultTerm} years, you will pay ${formatCurrency(totalInterest)} in total interest on a ${formatCurrency(amount)} loan at ${rate}%. The total cost including principal is ${formatCurrency(totalCost)}.`,
      },
      {
        question: `Can I reduce the interest on a ${amountLabel} mortgage?`,
        answer: `Yes. Making extra principal payments, choosing a shorter loan term (15 or 20 years), or refinancing to a lower rate can all significantly reduce total interest paid. Even one extra payment per year can save thousands.`,
      },
    ],
    relatedMortgages: getRelated(amount, rate),
  }
})

export function getMortgageBySlug(slug: string): MortgagePreset | undefined {
  return mortgagePresets.find((p) => p.slug === slug)
}
