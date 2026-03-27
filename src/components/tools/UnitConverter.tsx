import { useState, useMemo } from 'react'
import {
  conversions,
  convert,
  getConversionsByCategory,
  conversionCategoryLabels,
  formulaFunctions,
  type ConversionCategory,
  type Conversion,
} from '@/data/conversions'

const CATEGORIES = Object.keys(conversionCategoryLabels) as ConversionCategory[]

function getUnits(category: ConversionCategory): string[] {
  const cats = getConversionsByCategory(category)
  const set = new Set<string>()
  cats.forEach((c) => { set.add(c.from); set.add(c.to) })
  return Array.from(set)
}

function findConversion(from: string, to: string): Conversion | null {
  return conversions.find((c) => c.from === from && c.to === to) ?? null
}

function doConvert(from: string, to: string, value: number): number | null {
  if (from === to) return value
  const direct = findConversion(from, to)
  if (direct) return convert(direct, value)
  // Try reverse
  const reverse = findConversion(to, from)
  if (reverse) {
    if (reverse.factor !== undefined) return value / reverse.factor
    if (reverse.reverseFormula) {
      const fn = formulaFunctions[reverse.reverseFormula]
      if (!fn) throw new Error(`Unknown formula: ${reverse.reverseFormula}`)
      return fn(value)
    }
  }
  return null
}

export function UnitConverter() {
  const [category, setCategory] = useState<ConversionCategory>('length')
  const [value, setValue] = useState('1')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const units = useMemo(() => getUnits(category), [category])

  // Auto-select defaults when category changes
  const fromUnit = from && units.includes(from) ? from : units[0] ?? ''
  const toUnit = to && units.includes(to) ? to : (units[1] ?? units[0] ?? '')

  const numVal = parseFloat(value)
  const result = !isNaN(numVal) && fromUnit && toUnit ? doConvert(fromUnit, toUnit, numVal) : null

  const handleCategoryChange = (cat: ConversionCategory) => {
    setCategory(cat)
    setFrom('')
    setTo('')
  }

  const swap = () => {
    setFrom(toUnit)
    setTo(fromUnit)
  }

  return (
    <div className="space-y-6">
      {/* Category selector */}
      <div>
        <label className="block text-sm font-medium mb-2">Category</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                category === cat
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-surface-alt)] border border-[var(--color-border)] hover:bg-[var(--color-border)]'
              }`}
            >
              {conversionCategoryLabels[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Converter */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">From</label>
          <select
            value={fromUnit}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full p-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm mb-2"
          >
            {units.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value..."
            className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-lg font-mono"
          />
        </div>

        <button
          onClick={swap}
          className="px-3 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] hover:bg-[var(--color-border)] transition-colors self-end"
          title="Swap units"
          aria-label="Swap units"
        >
          ⇄
        </button>

        <div>
          <label className="block text-sm font-medium mb-1">To</label>
          <select
            value={toUnit}
            onChange={(e) => setTo(e.target.value)}
            className="w-full p-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm mb-2"
          >
            {units.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
          <div className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-lg font-mono min-h-[3rem] flex items-center">
            {result != null
              ? <span className="text-[var(--color-primary)] font-semibold">{Number(result.toPrecision(7)).toString()}</span>
              : <span className="text-[var(--color-text-muted)]">—</span>
            }
          </div>
        </div>
      </div>

      {result != null && (
        <div className="p-3 rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-sm text-[var(--color-text-muted)]">
          {numVal} {fromUnit} = <strong>{Number(result.toPrecision(7))} {toUnit}</strong>
        </div>
      )}

      {result == null && fromUnit && toUnit && fromUnit !== toUnit && !isNaN(numVal) && (
        <div className="p-3 rounded-lg text-sm" style={{ border: '1px solid var(--color-warning-border)', background: 'var(--color-warning-bg)', color: 'var(--color-warning-text)' }}>
          Direct conversion between {fromUnit} and {toUnit} is not available. Try a different unit combination.
        </div>
      )}
    </div>
  )
}
