import { useState, useMemo } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'

interface AmortizationRow {
  year: number
  principalPaid: number
  interestPaid: number
  balance: number
}

function calculateMortgage(
  loanAmount: number,
  annualRate: number,
  termYears: number
): {
  monthlyPayment: number
  totalInterest: number
  totalCost: number
  schedule: AmortizationRow[]
} | null {
  if (loanAmount <= 0 || annualRate <= 0 || termYears <= 0) return null

  const monthlyRate = annualRate / 100 / 12
  const numPayments = termYears * 12

  const monthlyPayment =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)

  const totalCost = monthlyPayment * numPayments
  const totalInterest = totalCost - loanAmount

  // Build yearly amortization schedule
  const schedule: AmortizationRow[] = []
  let balance = loanAmount
  for (let year = 1; year <= termYears; year++) {
    let yearPrincipal = 0
    let yearInterest = 0
    for (let m = 0; m < 12; m++) {
      const intPayment = balance * monthlyRate
      const princPayment = monthlyPayment - intPayment
      yearInterest += intPayment
      yearPrincipal += princPayment
      balance -= princPayment
    }
    schedule.push({
      year,
      principalPaid: Math.round(yearPrincipal * 100) / 100,
      interestPaid: Math.round(yearInterest * 100) / 100,
      balance: Math.max(0, Math.round(balance * 100) / 100),
    })
  }

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
    schedule,
  }
}

function formatCurrency(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

const presets = [
  {
    label: 'Starter Home',
    homePrice: '300000',
    downPayment: '10',
    downPaymentType: 'percent' as const,
    rate: '6.5',
    term: '30',
  },
  {
    label: '20% Down',
    homePrice: '450000',
    downPayment: '20',
    downPaymentType: 'percent' as const,
    rate: '6.25',
    term: '30',
  },
  {
    label: 'Lower Interest',
    homePrice: '400000',
    downPayment: '80000',
    downPaymentType: 'amount' as const,
    rate: '5.5',
    term: '30',
  },
  {
    label: '15-Year Payoff',
    homePrice: '350000',
    downPayment: '70000',
    downPaymentType: 'amount' as const,
    rate: '5.75',
    term: '15',
  },
]

export function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState('300000')
  const [downPayment, setDownPayment] = useState('60000')
  const [downPaymentType, setDownPaymentType] = useState<'amount' | 'percent'>('amount')
  const [rate, setRate] = useState('6.5')
  const [term, setTerm] = useState('30')
  const [showSchedule, setShowSchedule] = useState(false)

  const loanAmount = useMemo(() => {
    const price = parseFloat(homePrice) || 0
    const dp = parseFloat(downPayment) || 0
    if (downPaymentType === 'percent') {
      return price - price * (dp / 100)
    }
    return price - dp
  }, [homePrice, downPayment, downPaymentType])

  const result = useMemo(
    () => calculateMortgage(loanAmount, parseFloat(rate) || 0, parseInt(term) || 0),
    [loanAmount, rate, term]
  )

  const downPaymentValue = useMemo(() => {
    const price = parseFloat(homePrice) || 0
    const dp = parseFloat(downPayment) || 0
    if (downPaymentType === 'percent') {
      return price * (dp / 100)
    }
    return dp
  }, [homePrice, downPayment, downPaymentType])

  const downPaymentPercent = useMemo(() => {
    const price = parseFloat(homePrice) || 0
    if (price <= 0) return 0
    return (downPaymentValue / price) * 100
  }, [homePrice, downPaymentValue])

  const loanToValue = useMemo(() => {
    const price = parseFloat(homePrice) || 0
    if (price <= 0) return 0
    return (loanAmount / price) * 100
  }, [homePrice, loanAmount])

  const summaryText = result
    ? `Monthly Payment: ${formatCurrency(result.monthlyPayment)}\nTotal Interest: ${formatCurrency(result.totalInterest)}\nTotal Cost: ${formatCurrency(result.totalCost)}\nLoan Amount: ${formatCurrency(loanAmount)}`
    : ''

  // Calculate max values for the chart
  const maxYearlyTotal = result
    ? Math.max(...result.schedule.map((r) => r.principalPaid + r.interestPaid))
    : 0

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-[var(--color-text)]">Try a common scenario:</span>
          {presets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                setHomePrice(preset.homePrice)
                setDownPayment(preset.downPayment)
                setDownPaymentType(preset.downPaymentType)
                setRate(preset.rate)
                setTerm(preset.term)
              }}
              className="px-3 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-sm text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="home-price" className="block text-sm font-medium mb-1">
            Home Price ($)
          </label>
          <input
            id="home-price"
            type="number"
            min="0"
            value={homePrice}
            onChange={(e) => setHomePrice(e.target.value)}
            className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-lg font-mono"
          />
        </div>

        <div>
          <label htmlFor="down-payment" className="block text-sm font-medium mb-1">
            Down Payment
          </label>
          <div className="flex gap-2">
            <input
              id="down-payment"
              type="number"
              min="0"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              className="flex-1 p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-lg font-mono"
            />
            <button
              onClick={() =>
                setDownPaymentType((t) => (t === 'amount' ? 'percent' : 'amount'))
              }
              className="px-3 py-2 rounded-md text-sm font-medium border border-[var(--color-border)] bg-[var(--color-surface-alt)] hover:bg-[var(--color-border)] transition-colors"
              title="Toggle between dollar amount and percentage"
            >
              {downPaymentType === 'amount' ? '$' : '%'}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="interest-rate" className="block text-sm font-medium mb-1">
            Interest Rate (%)
          </label>
          <input
            id="interest-rate"
            type="number"
            min="0"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-lg font-mono"
          />
        </div>

        <div>
          <label htmlFor="loan-term" className="block text-sm font-medium mb-1">
            Loan Term (years)
          </label>
          <div className="flex gap-2">
            {[15, 20, 30].map((t) => (
              <button
                key={t}
                onClick={() => setTerm(String(t))}
                className={`flex-1 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  term === String(t)
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'border border-[var(--color-border)] bg-[var(--color-surface-alt)] hover:bg-[var(--color-border)]'
                }`}
              >
                {t} yr
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loan amount display */}
      {loanAmount > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm">
            <div className="text-[var(--color-text-muted)]">Loan Amount</div>
            <div className="font-semibold text-[var(--color-text)]">{formatCurrency(loanAmount)}</div>
          </div>
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm">
            <div className="text-[var(--color-text-muted)]">Down Payment</div>
            <div className="font-semibold text-[var(--color-text)]">
              {formatCurrency(downPaymentValue)} ({downPaymentPercent.toFixed(1)}%)
            </div>
          </div>
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm">
            <div className="text-[var(--color-text-muted)]">Loan-to-Value</div>
            <div className="font-semibold text-[var(--color-text)]">{loanToValue.toFixed(1)}% LTV</div>
          </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <div role="status" aria-live="polite" className="space-y-6">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-sm text-[var(--color-text-muted)]">Monthly Payment</div>
                <div className="text-3xl font-bold text-[var(--color-primary)]">
                  {formatCurrency(result.monthlyPayment)}
                </div>
              </div>
              <div>
                <div className="text-sm text-[var(--color-text-muted)]">Total Interest</div>
                <div className="text-2xl font-bold text-[var(--color-text)]">
                  {formatCurrency(result.totalInterest)}
                </div>
              </div>
              <div>
                <div className="text-sm text-[var(--color-text-muted)]">Total Cost</div>
                <div className="text-2xl font-bold text-[var(--color-text)]">
                  {formatCurrency(result.totalCost)}
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <CopyButton text={summaryText} />
            </div>
            <p className="mt-4 text-center text-sm text-[var(--color-text-muted)]">
              Estimate includes principal and interest only. Property taxes, insurance, HOA fees, and PMI are not included.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <h3 className="text-sm font-semibold text-[var(--color-text)]">Affordability signal</h3>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                Use the monthly payment to compare this mortgage against your target monthly housing budget, not just the home price.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <h3 className="text-sm font-semibold text-[var(--color-text)]">Rate sensitivity</h3>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                A small rate change can materially affect the lifetime interest cost. Test multiple rate scenarios before deciding.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <h3 className="text-sm font-semibold text-[var(--color-text)]">Down payment impact</h3>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                A larger down payment reduces the loan amount, lowers monthly payments, and may help you avoid PMI.
              </p>
            </div>
          </div>

          {/* Principal vs Interest visual chart */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4">
            <h3 className="text-sm font-semibold mb-3">Principal vs Interest Over Time</h3>
            <div className="flex items-end gap-[2px] h-40 overflow-x-auto">
              {result.schedule.map((row) => {
                const total = row.principalPaid + row.interestPaid
                const heightPct = maxYearlyTotal > 0 ? (total / maxYearlyTotal) * 100 : 0
                const principalPct = total > 0 ? (row.principalPaid / total) * 100 : 0
                return (
                  <div
                    key={row.year}
                    className="flex-1 min-w-[8px] flex flex-col justify-end rounded-t-sm overflow-hidden"
                    style={{ height: `${heightPct}%` }}
                    title={`Year ${row.year}: Principal ${formatCurrency(row.principalPaid)}, Interest ${formatCurrency(row.interestPaid)}`}
                  >
                    <div
                      className="w-full"
                      style={{
                        height: `${principalPct}%`,
                        background: 'var(--color-primary)',
                      }}
                    />
                    <div
                      className="w-full"
                      style={{
                        height: `${100 - principalPct}%`,
                        background: 'var(--color-border)',
                      }}
                    />
                  </div>
                )
              })}
            </div>
            <div className="flex gap-4 mt-2 text-xs text-[var(--color-text-muted)]">
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-sm" style={{ background: 'var(--color-primary)' }} />
                Principal
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-sm" style={{ background: 'var(--color-border)' }} />
                Interest
              </span>
            </div>
          </div>

          {/* Amortization schedule toggle */}
          <button
            onClick={() => setShowSchedule((s) => !s)}
            className="text-sm font-medium text-[var(--color-primary)] hover:underline"
          >
            {showSchedule ? 'Hide' : 'Show'} Amortization Schedule
          </button>

          {showSchedule && (
            <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
              <table className="w-full text-sm">
                <caption className="sr-only">Yearly amortization schedule</caption>
                <thead>
                  <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-alt)]">
                    <th scope="col" className="px-4 py-2.5 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase">Year</th>
                    <th scope="col" className="px-4 py-2.5 text-right text-xs font-semibold text-[var(--color-text-muted)] uppercase">Principal</th>
                    <th scope="col" className="px-4 py-2.5 text-right text-xs font-semibold text-[var(--color-text-muted)] uppercase">Interest</th>
                    <th scope="col" className="px-4 py-2.5 text-right text-xs font-semibold text-[var(--color-text-muted)] uppercase">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {result.schedule.map((row) => (
                    <tr key={row.year} className="border-b border-[var(--color-border)] last:border-0">
                      <td className="px-4 py-2.5 font-medium">{row.year}</td>
                      <td className="px-4 py-2.5 text-right font-mono">{formatCurrency(row.principalPaid)}</td>
                      <td className="px-4 py-2.5 text-right font-mono">{formatCurrency(row.interestPaid)}</td>
                      <td className="px-4 py-2.5 text-right font-mono">{formatCurrency(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
