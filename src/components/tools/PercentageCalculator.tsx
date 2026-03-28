import { useState } from 'react'

type Mode = 'xPercentOfY' | 'xIsWhatPercentOfY' | 'percentChange'

interface ModeConfig {
  label: string
  description: string
}

const MODES: Record<Mode, ModeConfig> = {
  xPercentOfY: { label: 'X% of Y', description: 'What is X% of Y?' },
  xIsWhatPercentOfY: { label: 'X is ?% of Y', description: 'X is what % of Y?' },
  percentChange: { label: '% Change', description: '% change from X to Y' },
}

function calculate(mode: Mode, x: number, y: number): { result: number; formula: string } | null {
  if (isNaN(x) || isNaN(y)) return null

  if (mode === 'xPercentOfY') {
    const result = (x / 100) * y
    return {
      result,
      formula: `${x}% × ${y} = ${x} ÷ 100 × ${y} = ${formatNum(result)}`,
    }
  }

  if (mode === 'xIsWhatPercentOfY') {
    if (y === 0) return null
    const result = (x / y) * 100
    return {
      result,
      formula: `${x} ÷ ${y} × 100 = ${formatNum(result)}%`,
    }
  }

  if (mode === 'percentChange') {
    if (x === 0) return null
    const result = ((y - x) / Math.abs(x)) * 100
    const direction = result >= 0 ? 'increase' : 'decrease'
    return {
      result,
      formula: `(${y} − ${x}) ÷ |${x}| × 100 = ${formatNum(result)}% ${direction}`,
    }
  }

  return null
}

function formatNum(n: number): string {
  if (!isFinite(n)) return '∞'
  // Round to 6 significant figures
  return Number(n.toPrecision(6)).toString()
}

export function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>('xPercentOfY')
  const [x, setX] = useState('')
  const [y, setY] = useState('')

  const numX = parseFloat(x)
  const numY = parseFloat(y)
  const calc = calculate(mode, numX, numY)

  const labels: Record<Mode, [string, string]> = {
    xPercentOfY: ['Percentage (X %)', 'Value (Y)'],
    xIsWhatPercentOfY: ['Value (X)', 'Total (Y)'],
    percentChange: ['From (X)', 'To (Y)'],
  }

  const [labelX, labelY] = labels[mode]

  return (
    <div className="space-y-6">
      {/* Mode tabs */}
      <div className="flex flex-wrap gap-2">
        {(Object.entries(MODES) as [Mode, ModeConfig][]).map(([m, cfg]) => (
          <button
            key={m}
            onClick={() => { setMode(m); setX(''); setY('') }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === m
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-[var(--color-surface-alt)] border border-[var(--color-border)] hover:bg-[var(--color-border)]'
            }`}
          >
            {cfg.description}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">{labelX}</label>
          <input
            type="number"
            value={x}
            onChange={(e) => setX(e.target.value)}
            placeholder="Enter number..."
            className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-lg font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{labelY}</label>
          <input
            type="number"
            value={y}
            onChange={(e) => setY(e.target.value)}
            placeholder="Enter number..."
            className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-lg font-mono"
          />
        </div>
      </div>

      {/* Result */}
      {calc && (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-6 space-y-2">
          <div className="text-sm text-[var(--color-text-muted)]">{MODES[mode].description}</div>
          <div className="text-4xl font-bold text-[var(--color-primary)]">
            {formatNum(calc.result)}{mode === 'xIsWhatPercentOfY' || mode === 'percentChange' ? '%' : ''}
          </div>
          <div className="text-sm font-mono text-[var(--color-text-muted)] pt-2 border-t border-[var(--color-border)]">
            {calc.formula}
          </div>
        </div>
      )}

      {!calc && x && y && (
        <div className="p-3 rounded-lg text-sm" style={{ border: '1px solid var(--color-warning-border)', background: 'var(--color-warning-bg)', color: 'var(--color-warning-text)' }}>
          Cannot calculate: check your inputs (division by zero or invalid numbers).
        </div>
      )}
    </div>
  )
}
