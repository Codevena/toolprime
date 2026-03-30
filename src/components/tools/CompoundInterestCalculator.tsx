import { useState, useMemo, useRef, useEffect } from 'react'

interface Props {
  defaultPrincipal?: number
  defaultRate?: number
  defaultYears?: number
}

type Frequency = 1 | 4 | 12 | 365

const frequencyLabels: Record<Frequency, string> = {
  1: 'Annually',
  4: 'Quarterly',
  12: 'Monthly',
  365: 'Daily',
}

function calculate(principal: number, rate: number, years: number, n: Frequency) {
  const r = rate / 100
  const amount = principal * Math.pow(1 + r / n, n * years)
  return amount
}

function formatMoney(v: number): string {
  return v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

export function CompoundInterestCalculator({ defaultPrincipal, defaultRate, defaultYears }: Props) {
  const [principal, setPrincipal] = useState(String(defaultPrincipal ?? 10000))
  const [rate, setRate] = useState(String(defaultRate ?? 7))
  const [years, setYears] = useState(String(defaultYears ?? 10))
  const [frequency, setFrequency] = useState<Frequency>(1)
  const [showAllRows, setShowAllRows] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const p = parseFloat(principal) || 0
  const r = parseFloat(rate) || 0
  const y = parseInt(years, 10) || 0

  const result = useMemo(() => {
    if (p <= 0 || r <= 0 || y <= 0) return null
    const finalAmount = calculate(p, r, y, frequency)
    const totalInterest = finalAmount - p

    const rows: { year: number; balance: number; yearInterest: number; totalInterest: number }[] = []
    for (let i = 1; i <= y; i++) {
      const balance = calculate(p, r, i, frequency)
      const prevBalance = i > 1 ? calculate(p, r, i - 1, frequency) : p
      rows.push({
        year: i,
        balance,
        yearInterest: balance - prevBalance,
        totalInterest: balance - p,
      })
    }

    return { finalAmount, totalInterest, rows }
  }, [p, r, y, frequency])

  // Draw bar chart
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !result || result.rows.length === 0) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const observer = new ResizeObserver(() => {
      drawChart(canvas, ctx, result.rows, p)
    })
    observer.observe(canvas.parentElement!)

    drawChart(canvas, ctx, result.rows, p)

    return () => observer.disconnect()
  }, [result, p])

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="ci-principal" className="block text-sm font-medium text-[var(--color-text)] mb-1">
            Principal ($)
          </label>
          <input
            id="ci-principal"
            type="number"
            min="0"
            step="100"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-3 py-2 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>
        <div>
          <label htmlFor="ci-rate" className="block text-sm font-medium text-[var(--color-text)] mb-1">
            Annual Rate (%)
          </label>
          <input
            id="ci-rate"
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
          <label htmlFor="ci-years" className="block text-sm font-medium text-[var(--color-text)] mb-1">
            Years
          </label>
          <input
            id="ci-years"
            type="number"
            min="1"
            max="100"
            step="1"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-3 py-2 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>
        <div>
          <label htmlFor="ci-frequency" className="block text-sm font-medium text-[var(--color-text)] mb-1">
            Compounding Frequency
          </label>
          <select
            id="ci-frequency"
            value={frequency}
            onChange={(e) => setFrequency(Number(e.target.value) as Frequency)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-3 py-2 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          >
            {(Object.entries(frequencyLabels) as [string, string][]).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div aria-live="polite" className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">Final Amount</p>
              <p className="text-2xl font-bold text-[var(--color-text)]">{formatMoney(result.finalAmount)}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">Total Interest</p>
              <p className="text-2xl font-bold text-[var(--color-primary)]">{formatMoney(result.totalInterest)}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">Principal</p>
              <p className="text-2xl font-bold text-[var(--color-text)]">{formatMoney(p)}</p>
            </div>
          </div>

          {/* Chart */}
          {result.rows.length > 1 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-[var(--color-text-muted)] mb-2">Growth Over Time</h3>
              <div className="w-full" style={{ height: '200px' }}>
                <canvas ref={canvasRef} className="w-full h-full" role="img" aria-label="Bar chart showing compound interest growth over time" />
              </div>
            </div>
          )}

          {/* Table */}
          {result.rows.length > 0 && (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <caption className="sr-only">Year-by-year compound interest breakdown</caption>
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th scope="col" className="text-left py-2 px-3 font-medium text-[var(--color-text)]">Year</th>
                    <th scope="col" className="text-right py-2 px-3 font-medium text-[var(--color-text)]">Balance</th>
                    <th scope="col" className="text-right py-2 px-3 font-medium text-[var(--color-text)]">Year Interest</th>
                    <th scope="col" className="text-right py-2 px-3 font-medium text-[var(--color-text)]">Total Interest</th>
                  </tr>
                </thead>
                <tbody>
                  {(showAllRows ? result.rows : result.rows.slice(0, 10)).map((row) => (
                    <tr key={row.year} className="border-b border-[var(--color-border)] last:border-0">
                      <td className="py-1.5 px-3 text-[var(--color-text)]">{row.year}</td>
                      <td className="py-1.5 px-3 text-right font-mono text-[var(--color-text)]">{formatMoney(row.balance)}</td>
                      <td className="py-1.5 px-3 text-right font-mono text-[var(--color-text)]">{formatMoney(row.yearInterest)}</td>
                      <td className="py-1.5 px-3 text-right font-mono text-[var(--color-text)]">{formatMoney(row.totalInterest)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!showAllRows && result.rows.length > 10 && (
                <button
                  type="button"
                  onClick={() => setShowAllRows(true)}
                  className="mt-2 text-sm text-[var(--color-primary)] hover:underline"
                >
                  Show all {result.rows.length} years
                </button>
              )}
              {showAllRows && result.rows.length > 10 && (
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

function drawChart(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  rows: { year: number; balance: number; totalInterest: number }[],
  principal: number,
) {
  const dpr = window.devicePixelRatio || 1
  const rect = canvas.parentElement!.getBoundingClientRect()
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  canvas.style.width = `${rect.width}px`
  canvas.style.height = `${rect.height}px`
  ctx.scale(dpr, dpr)

  const w = rect.width
  const h = rect.height
  const pad = { top: 10, right: 10, bottom: 24, left: 10 }
  const chartW = w - pad.left - pad.right
  const chartH = h - pad.top - pad.bottom

  ctx.clearRect(0, 0, w, h)

  if (rows.length === 0) return

  const maxBalance = Math.max(...rows.map((r) => r.balance))
  if (maxBalance <= 0) return

  // Get primary color from CSS
  const style = getComputedStyle(canvas)
  const primaryColor = style.getPropertyValue('--color-primary').trim() || '#6366f1'

  const barGap = Math.max(1, Math.floor(chartW / rows.length * 0.15))
  const barWidth = Math.max(2, (chartW - barGap * (rows.length + 1)) / rows.length)

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]!
    const x = pad.left + barGap + i * (barWidth + barGap)
    const totalH = (row.balance / maxBalance) * chartH
    const principalH = (principal / maxBalance) * chartH
    const interestH = totalH - principalH

    // Principal portion (solid)
    ctx.fillStyle = primaryColor
    ctx.fillRect(x, pad.top + chartH - totalH, barWidth, principalH)

    // Interest portion (lighter)
    ctx.globalAlpha = 0.45
    ctx.fillStyle = primaryColor
    ctx.fillRect(x, pad.top + chartH - totalH, barWidth, interestH)
    ctx.globalAlpha = 1

    // Year label (show subset if many bars)
    if (rows.length <= 15 || i % Math.ceil(rows.length / 10) === 0 || i === rows.length - 1) {
      ctx.fillStyle = style.getPropertyValue('--color-text-muted').trim() || '#888'
      ctx.font = '10px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(String(row.year), x + barWidth / 2, h - 4)
    }
  }
}
