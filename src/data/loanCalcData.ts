export interface LoanEntry {
  slug: string
  amount: number
  rate: number       // annual percentage
  years: number
  monthlyPayment: number
  totalPaid: number
  totalInterest: number
}

const amounts = [10000, 25000, 50000, 100000, 150000, 200000, 250000, 300000, 400000, 500000]
const rates = [3, 4, 5, 6, 7, 8, 9, 10]
const terms = [5, 10, 15, 20, 25, 30]

function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12
  const numPayments = years * 12
  if (monthlyRate === 0) return principal / numPayments
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)
}

function generateEntries(): LoanEntry[] {
  const entries: LoanEntry[] = []

  for (const amount of amounts) {
    for (const rate of rates) {
      for (const years of terms) {
        const monthlyPayment = calculateMonthlyPayment(amount, rate, years)
        const totalPaid = monthlyPayment * years * 12
        const totalInterest = totalPaid - amount
        const slug = `loan-${amount}-at-${rate}-percent-${years}-years`
        entries.push({ slug, amount, rate, years, monthlyPayment, totalPaid, totalInterest })
      }
    }
  }

  return entries
}

export const loanEntries = generateEntries()
// 10 amounts × 8 rates × 6 terms = 480 entries

export { calculateMonthlyPayment }

export function formatMoney(v: number): string {
  return v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

export function formatMoneyExact(v: number): string {
  return v.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export interface AmortizationRow {
  month: number
  payment: number
  principal: number
  interest: number
  balance: number
}

export function generateAmortization(amount: number, annualRate: number, years: number): AmortizationRow[] {
  const monthlyRate = annualRate / 100 / 12
  const numPayments = years * 12
  const payment = calculateMonthlyPayment(amount, annualRate, years)
  const rows: AmortizationRow[] = []
  let balance = amount

  for (let m = 1; m <= numPayments; m++) {
    const interest = balance * monthlyRate
    const principal = payment - interest
    balance -= principal
    rows.push({
      month: m,
      payment,
      principal,
      interest,
      balance: Math.max(0, balance),
    })
  }

  return rows
}

export function getRelatedLoanEntries(currentSlug: string, amount: number, rate: number): LoanEntry[] {
  return loanEntries
    .filter((e) => e.slug !== currentSlug && (e.amount === amount || e.rate === rate))
    .slice(0, 8)
}
