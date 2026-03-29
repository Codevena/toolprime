import { useState, useMemo } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'
import {
  computeFraction,
  simplify,
  formatFraction,
  gcd,
  lcm,
  type Fraction,
  type FractionOp,
  opSymbols,
} from '@/data/fractionData'

const ops: { key: FractionOp; symbol: string }[] = [
  { key: 'plus', symbol: '+' },
  { key: 'minus', symbol: '\u2212' },
  { key: 'times', symbol: '\u00d7' },
  { key: 'dividedby', symbol: '\u00f7' },
]

function buildSteps(f1: Fraction, f2: Fraction, op: FractionOp, result: Fraction): string[] {
  const steps: string[] = []
  const sym = opSymbols[op]
  steps.push(`Start: ${formatFraction(f1)} ${sym} ${formatFraction(f2)}`)

  if (op === 'plus' || op === 'minus') {
    const lcd = lcm(f1.d, f2.d)
    const m1 = lcd / f1.d
    const m2 = lcd / f2.d
    const n1 = f1.n * m1
    const n2 = f2.n * m2
    if (f1.d !== f2.d) {
      steps.push(`Find the LCD of ${f1.d} and ${f2.d}: ${lcd}`)
      steps.push(`Convert: ${n1}/${lcd} ${sym} ${n2}/${lcd}`)
    }
    const rawN = op === 'plus' ? n1 + n2 : n1 - n2
    steps.push(`${op === 'plus' ? 'Add' : 'Subtract'} numerators: ${rawN}/${lcd}`)
    const g = gcd(Math.abs(rawN), lcd)
    if (g > 1) {
      steps.push(`Simplify by dividing by ${g}: ${formatFraction(result)}`)
    }
  } else if (op === 'times') {
    steps.push(`Multiply numerators: ${f1.n} \u00d7 ${f2.n} = ${f1.n * f2.n}`)
    steps.push(`Multiply denominators: ${f1.d} \u00d7 ${f2.d} = ${f1.d * f2.d}`)
    steps.push(`Result: ${f1.n * f2.n}/${f1.d * f2.d}`)
    const g = gcd(Math.abs(f1.n * f2.n), f1.d * f2.d)
    if (g > 1) {
      steps.push(`Simplify by dividing by ${g}: ${formatFraction(result)}`)
    }
  } else {
    steps.push(`Flip the second fraction: ${f2.d}/${f2.n}`)
    steps.push(`Multiply: ${f1.n}/${f1.d} \u00d7 ${f2.d}/${f2.n}`)
    const rawN = f1.n * f2.d
    const rawD = f1.d * f2.n
    steps.push(`= ${rawN}/${rawD}`)
    const g = gcd(Math.abs(rawN), Math.abs(rawD))
    if (g > 1) {
      steps.push(`Simplify by dividing by ${g}: ${formatFraction(result)}`)
    }
  }

  return steps
}

const inputClass =
  'w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-lg font-mono text-center'

export function FractionCalculator() {
  const [n1, setN1] = useState('')
  const [d1, setD1] = useState('')
  const [n2, setN2] = useState('')
  const [d2, setD2] = useState('')
  const [op, setOp] = useState<FractionOp>('plus')
  const [decInput, setDecInput] = useState('')

  const result = useMemo(() => {
    const a = parseInt(n1, 10)
    const b = parseInt(d1, 10)
    const c = parseInt(n2, 10)
    const d = parseInt(d2, 10)
    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d) || b === 0 || d === 0) return null
    if (op === 'dividedby' && c === 0) return null
    const f1: Fraction = { n: a, d: b }
    const f2: Fraction = { n: c, d: d }
    const res = computeFraction(f1, f2, op)
    const decVal = res.d !== 0 ? res.n / res.d : 0
    const pct = decVal * 100
    const steps = buildSteps(f1, f2, op, res)
    return { fraction: res, decimal: decVal, percentage: pct, steps }
  }, [n1, d1, n2, d2, op])

  const decResult = useMemo(() => {
    const val = parseFloat(decInput)
    if (isNaN(val) || !isFinite(val)) return null
    // Convert decimal to fraction by finding precision
    const str = String(val)
    const decPlaces = str.includes('.') ? str.split('.')[1]!.length : 0
    const denom = Math.pow(10, decPlaces)
    const numer = Math.round(val * denom)
    return simplify(numer, denom)
  }, [decInput])

  const copyText = result
    ? `${n1}/${d1} ${opSymbols[op]} ${n2}/${d2} = ${formatFraction(result.fraction)} (${result.decimal.toFixed(4)})`
    : ''

  return (
    <div className="space-y-6">
      {/* Fraction inputs */}
      <div className="flex flex-wrap items-center gap-3">
        {/* First fraction */}
        <div className="flex flex-col items-center gap-1">
          <label htmlFor="frac-n1" className="sr-only">Numerator 1</label>
          <input
            id="frac-n1"
            type="number"
            value={n1}
            onChange={(e) => setN1(e.target.value)}
            placeholder="1"
            aria-label="First numerator"
            className={inputClass}
            style={{ width: '4.5rem' }}
          />
          <div className="w-full h-0.5 bg-[var(--color-text)]" aria-hidden="true" />
          <label htmlFor="frac-d1" className="sr-only">Denominator 1</label>
          <input
            id="frac-d1"
            type="number"
            value={d1}
            onChange={(e) => setD1(e.target.value)}
            placeholder="2"
            aria-label="First denominator"
            className={inputClass}
            style={{ width: '4.5rem' }}
          />
        </div>

        {/* Operation buttons */}
        <div className="flex gap-1">
          {ops.map((o) => (
            <button
              key={o.key}
              onClick={() => setOp(o.key)}
              aria-label={`Operation: ${o.key}`}
              className={`w-10 h-10 rounded-md text-lg font-bold transition-colors ${
                op === o.key
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-surface-alt)] border border-[var(--color-border)] hover:bg-[var(--color-border)]'
              }`}
            >
              {o.symbol}
            </button>
          ))}
        </div>

        {/* Second fraction */}
        <div className="flex flex-col items-center gap-1">
          <label htmlFor="frac-n2" className="sr-only">Numerator 2</label>
          <input
            id="frac-n2"
            type="number"
            value={n2}
            onChange={(e) => setN2(e.target.value)}
            placeholder="1"
            aria-label="Second numerator"
            className={inputClass}
            style={{ width: '4.5rem' }}
          />
          <div className="w-full h-0.5 bg-[var(--color-text)]" aria-hidden="true" />
          <label htmlFor="frac-d2" className="sr-only">Denominator 2</label>
          <input
            id="frac-d2"
            type="number"
            value={d2}
            onChange={(e) => setD2(e.target.value)}
            placeholder="3"
            aria-label="Second denominator"
            className={inputClass}
            style={{ width: '4.5rem' }}
          />
        </div>

        {/* Equals and result */}
        {result && (
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-[var(--color-text)]">=</span>
            <span className="text-2xl font-bold text-[var(--color-primary-text)]">
              {formatFraction(result.fraction)}
            </span>
          </div>
        )}
      </div>

      {/* Result card */}
      {result && (
        <div role="status" aria-live="polite" className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm text-[var(--color-text-muted)]">Result</div>
              <div className="text-4xl font-bold text-[var(--color-primary-text)]">
                {formatFraction(result.fraction)}
              </div>
              <div className="flex gap-4 mt-2 text-sm text-[var(--color-text-muted)]">
                <span>Decimal: {result.decimal.toFixed(4)}</span>
                <span>Percentage: {result.percentage.toFixed(2)}%</span>
              </div>
            </div>
            <CopyButton text={copyText} />
          </div>

          {/* Steps */}
          <div className="pt-3 border-t border-[var(--color-border)]">
            <div className="text-sm font-semibold text-[var(--color-text)] mb-2">Step-by-Step Solution</div>
            <ol className="space-y-1 text-sm text-[var(--color-text-muted)] list-decimal list-inside">
              {result.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {/* Decimal to Fraction converter */}
      <div className="pt-4 border-t border-[var(--color-border)]">
        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-3">Decimal to Fraction</h3>
        <div className="flex items-center gap-3">
          <div className="flex-1 max-w-48">
            <label htmlFor="dec-input" className="sr-only">Decimal value</label>
            <input
              id="dec-input"
              type="number"
              step="any"
              value={decInput}
              onChange={(e) => setDecInput(e.target.value)}
              placeholder="0.75"
              aria-label="Decimal value"
              className={inputClass}
            />
          </div>
          {decResult && (
            <>
              <span className="text-xl font-bold text-[var(--color-text)]">=</span>
              <span className="text-xl font-bold text-[var(--color-primary-text)]">
                {formatFraction(decResult)}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
