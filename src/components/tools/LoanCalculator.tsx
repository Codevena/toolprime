import { useState, useMemo, useRef, useEffect } from 'react'

interface Props {
  defaultAmount?: number
  defaultRate?: number
  defaultYears?: number
}

function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12
  const numPayments = years * 12
  if (monthlyRate === 0) return principal / numPayments
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)
}

function formatMoney(v: number): string {
  return v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

function formatMoneyExact(v: number): string {
  return v.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

interface AmortizationRow {
  month: number
  payment: number
  principal: number
  interest: number
  balance: number
}

function generateAmortization(principal: number, annualRate: number, years: number): AmortizationRow[] {
  const monthlyRate = annualRate / 100 / 12
  const numPayments = years * 12
  const payment = calculateMonthlyPayment(principal, annualRate, years)
  const rows: AmortizationRow[] = []
  let balance = principal

  for (let m = 1; m <= numPayments; m++) {
    const interest = balance * monthlyRate
    const princ = payment - interest
    balance -= princ
    rows.push({
      month: m,
      payment,
      principal: princ,
      interest,
      balance: Math.max(0, balance),
    })
  }

  return rows
}

export function LoanCalculator({ defaultAmount, defaultRate, defaultYears }: Props) {
  const [amount, setAmount] = useState(String(defaultAmount ?? 100000))
  const [rate, setRate] = useState(String(defaultRate ?? 6))
  const [years, setYears] = useState(String(defaultYears ?? 30))
  const [showAllRows, setShowAllRows] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const a = parseFloat(amount) || 0
  const r = parseFloat(rate) || 0
  const y = parseInt(years, 10) || 0

  const result = useMemo(() => {
    if (a <= 0 || r < 0 || y <= 0) return null
    const monthlyPayment = calculateMonthlyPayment(a, r, y)
    const totalPaid = monthlyPayment * y * 12
    const totalInterest = totalPaid - a
    const amortization = generateAmortization(a, r, y)

    return { monthlyPayment, totalPaid, totalInterest, amortization }
  }, [a, r, y])

  // Draw donut chart
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !result) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const observer = new ResizeObserver(() => {
      drawDonut(canvas, ctx, a, result.totalInterest)
    })
    observer.observe(canvas.parentElement!)

    drawDonut(canvas, ctx, a, result.totalInterest)

    return () => observer.disconnect()
  }, [result, a])

  const visibleRows = result
    ? showAllRows
      ? result.amortization
      : result.amortization.slice(0, 12)
    : []

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="loan-amount" className="block text-sm font-medium text-[var(--color-text)] mb-1">
            Loan Amount ($)
          </label>
          <input
            id="loan-amount"
            type="number"
            min="0"
            step="1000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-3 py-2 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>
        <div>
          <label htmlFor="loan-rate" className="block text-sm font-medium text-[var(--color-text)] mb-1">
            Annual Interest Rate (%)
          </label>
          <input
            id="loan-rate"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-3 py-2 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>
        <div>
          <label htmlFor="loan-years" className="block text-sm font-medium text-[var(--color-text)] mb-1">
            Loan Term (Years)
          </label>
          <input
            id="loan-years"
            type="number"
            min="1"
            max="50"
            step="1"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-3 py-2 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>
      </div>

      {/* Result */}
      {result && (
        <div aria-live="polite" className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">Monthly Payment</p>
              <p className="text-2xl font-bold text-[var(--color-text)]">{formatMoneyExact(result.monthlyPayment)}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">Total Paid</p>
              <p className="text-2xl font-bold text-[var(--color-text)]">{formatMoney(result.totalPaid)}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">Total Interest</p>
              <p className="text-2xl font-bold text-[var(--color-primary)]">{formatMoney(result.totalInterest)}</p>
            </div>
          </div>

          {/* Donut Chart */}
          <div className="mt-6 flex flex-col items-center">
            <h3 className="text-sm font-medium text-[var(--color-text-muted)] mb-2">Principal vs Interest</h3>
            <div style={{ width: '180px', height: '180px' }}>
              <canvas ref={canvasRef} className="w-full h-full" />
            </div>
            <div className="flex gap-4 mt-2 text-xs text-[var(--color-text-muted)]">
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: 'var(--color-primary)' }} />
                Principal ({formatMoney(a)})
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: 'var(--color-primary)', opacity: 0.4 }} />
                Interest ({formatMoney(result.totalInterest)})
              </span>
            </div>
          </div>

          {/* Amortization Table */}
          {result.amortization.length > 0 && (
            <div className="mt-6 overflow-x-auto">
              <h3 className="text-sm font-medium text-[var(--color-text-muted)] mb-2">Amortization Schedule</h3>
              <table className="w-full border-collapse text-sm">
                <caption className="sr-only">Monthly loan amortization schedule</caption>
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th scope="col" className="text-left py-2 px-3 font-medium text-[var(--color-text)]">Month</th>
                    <th scope="col" className="text-right py-2 px-3 font-medium text-[var(--color-text)]">Payment</th>
                    <th scope="col" className="text-right py-2 px-3 font-medium text-[var(--color-text)]">Principal</th>
                    <th scope="col" className="text-right py-2 px-3 font-medium text-[var(--color-text)]">Interest</th>
                    <th scope="col" className="text-right py-2 px-3 font-medium text-[var(--color-text)]">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.map((row) => (
                    <tr key={row.month} className="border-b border-[var(--color-border)] last:border-0">
                      <td className="py-1.5 px-3 text-[var(--color-text)]">{row.month}</td>
                      <td className="py-1.5 px-3 text-right font-mono text-[var(--color-text)]">{formatMoneyExact(row.payment)}</td>
                      <td className="py-1.5 px-3 text-right font-mono text-[var(--color-text)]">{formatMoneyExact(row.principal)}</td>
                      <td className="py-1.5 px-3 text-right font-mono text-[var(--color-text)]">{formatMoneyExact(row.interest)}</td>
                      <td className="py-1.5 px-3 text-right font-mono text-[var(--color-text)]">{formatMoneyExact(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!showAllRows && result.amortization.length > 12 && (
                <button
                  type="button"
                  onClick={() => setShowAllRows(true)}
                  className="mt-2 text-sm text-[var(--color-primary)] hover:underline"
                >
                  Show all {result.amortization.length} months
                </button>
              )}
              {showAllRows && result.amortization.length > 12 && (
                <button
                  type="button"
                  onClick={() => setShowAllRows(false)}
                  className="mt-2 text-sm text-[var(--color-primary)] hover:underline"
                >
                  Show fewer rows
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function drawDonut(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  principal: number,
  totalInterest: number,
) {
  const dpr = window.devicePixelRatio || 1
  const rect = canvas.parentElement!.getBoundingClientRect()
  const size = Math.min(rect.width, rect.height)
  canvas.width = size * dpr
  canvas.height = size * dpr
  canvas.style.width = `${size}px`
  canvas.style.height = `${size}px`
  ctx.scale(dpr, dpr)

  ctx.clearRect(0, 0, size, size)

  const total = principal + totalInterest
  if (total <= 0) return

  const cx = size / 2
  const cy = size / 2
  const outerR = size / 2 - 4
  const innerR = outerR * 0.55

  const style = getComputedStyle(canvas)
  const primaryColor = style.getPropertyValue('--color-primary').trim() || '#6366f1'

  const principalAngle = (principal / total) * Math.PI * 2
  const startAngle = -Math.PI / 2

  // Principal arc
  ctx.beginPath()
  ctx.arc(cx, cy, outerR, startAngle, startAngle + principalAngle)
  ctx.arc(cx, cy, innerR, startAngle + principalAngle, startAngle, true)
  ctx.closePath()
  ctx.fillStyle = primaryColor
  ctx.fill()

  // Interest arc
  ctx.beginPath()
  ctx.arc(cx, cy, outerR, startAngle + principalAngle, startAngle + Math.PI * 2)
  ctx.arc(cx, cy, innerR, startAngle + Math.PI * 2, startAngle + principalAngle, true)
  ctx.closePath()
  ctx.globalAlpha = 0.4
  ctx.fillStyle = primaryColor
  ctx.fill()
  ctx.globalAlpha = 1
}
