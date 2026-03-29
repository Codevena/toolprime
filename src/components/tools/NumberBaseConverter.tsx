import { useState, useMemo } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'

type Base = 'binary' | 'octal' | 'decimal' | 'hexadecimal'

const BASE_OPTIONS: { value: Base; label: string; radix: number; prefix: string }[] = [
  { value: 'binary', label: 'Binary (2)', radix: 2, prefix: '0b' },
  { value: 'octal', label: 'Octal (8)', radix: 8, prefix: '0o' },
  { value: 'decimal', label: 'Decimal (10)', radix: 10, prefix: '' },
  { value: 'hexadecimal', label: 'Hexadecimal (16)', radix: 16, prefix: '0x' },
]

function getRadix(base: Base): number {
  return BASE_OPTIONS.find((b) => b.value === base)!.radix
}

function parseInput(input: string, fromBase: Base): number | null {
  const clean = input.trim().replace(/^0[bBxXoO]/, '')
  if (clean === '') return null
  const radix = getRadix(fromBase)
  const num = parseInt(clean, radix)
  if (isNaN(num) || num < 0) return null
  // Validate that the string is valid for the given base
  const valid = num.toString(radix).toUpperCase() === clean.toUpperCase().replace(/^0+/, '') || clean === '0' || clean.replace(/^0+/, '') === ''
  if (!valid) return null
  return num
}

function formatBits(num: number): string[] {
  if (num === 0) return ['0', '0', '0', '0', '0', '0', '0', '0']
  const bits = num.toString(2)
  // Pad to nearest 8 bits
  const padded = bits.padStart(Math.ceil(bits.length / 8) * 8, '0')
  return padded.split('')
}

interface Props {
  defaultValue?: string
  defaultBase?: Base
}

export function NumberBaseConverter({ defaultValue = '', defaultBase = 'decimal' }: Props) {
  const [input, setInput] = useState(defaultValue)
  const [fromBase, setFromBase] = useState<Base>(defaultBase)

  const parsed = useMemo(() => parseInput(input, fromBase), [input, fromBase])

  const conversions = useMemo(() => {
    if (parsed === null) return null
    return BASE_OPTIONS.map((opt) => ({
      ...opt,
      result: parsed.toString(opt.radix).toUpperCase(),
    }))
  }, [parsed])

  const bits = useMemo(() => {
    if (parsed === null) return null
    return formatBits(parsed)
  }, [parsed])

  const asciiChar = useMemo(() => {
    if (parsed === null || parsed < 0 || parsed > 127) return null
    if (parsed < 32 || parsed === 127) return null // control characters
    return String.fromCharCode(parsed)
  }, [parsed])

  const copyText = conversions
    ? conversions.map((c) => `${c.label}: ${c.result}`).join('\n')
    : ''

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nbc-input" className="block text-sm font-medium mb-1">
            Number
          </label>
          <input
            id="nbc-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={fromBase === 'binary' ? 'e.g. 11111111' : fromBase === 'hexadecimal' ? 'e.g. FF' : 'e.g. 255'}
            className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-lg font-mono"
          />
        </div>
        <div>
          <label htmlFor="nbc-base" className="block text-sm font-medium mb-1">
            From Base
          </label>
          <select
            id="nbc-base"
            value={fromBase}
            onChange={(e) => setFromBase(e.target.value as Base)}
            className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-lg"
          >
            {BASE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Validation error */}
      {input.trim() !== '' && parsed === null && (
        <div
          className="p-3 rounded-lg text-sm"
          style={{
            border: '1px solid var(--color-warning-border)',
            background: 'var(--color-warning-bg)',
            color: 'var(--color-warning-text)',
          }}
        >
          Invalid {fromBase} number. Please check your input.
        </div>
      )}

      {/* Results */}
      {conversions && (
        <div
          role="status"
          aria-live="polite"
          className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-6 space-y-4"
        >
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
              Conversions
            </h3>
            <CopyButton text={copyText} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {conversions.map((c) => (
              <div key={c.value} className="space-y-0.5">
                <div className="text-xs text-[var(--color-text-muted)]">{c.label}</div>
                <div
                  className={`text-lg font-mono font-bold ${
                    c.value === fromBase
                      ? 'text-[var(--color-primary-text)]'
                      : 'text-[var(--color-text)]'
                  }`}
                >
                  <span className="text-[var(--color-text-muted)] font-normal">{c.prefix}</span>
                  {c.result}
                </div>
              </div>
            ))}
          </div>

          {/* ASCII character */}
          {asciiChar && (
            <div className="pt-3 border-t border-[var(--color-border)]">
              <div className="text-xs text-[var(--color-text-muted)]">ASCII Character</div>
              <div className="text-3xl font-mono font-bold text-[var(--color-text)]">
                {asciiChar}
              </div>
            </div>
          )}

          {/* Bit visualization */}
          {bits && (
            <div className="pt-3 border-t border-[var(--color-border)]">
              <div className="text-xs text-[var(--color-text-muted)] mb-2">Binary Bits</div>
              <div className="flex flex-wrap gap-1">
                {bits.map((bit, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 flex items-center justify-center rounded text-sm font-mono font-bold ${
                      bit === '1'
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)]'
                    }`}
                  >
                    {bit}
                  </div>
                ))}
              </div>
              {bits.length > 8 && (
                <div className="text-xs text-[var(--color-text-muted)] mt-1">
                  {bits.length} bits ({bits.length / 8} bytes)
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Common values reference */}
      <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
        <table className="w-full text-sm">
          <caption className="sr-only">Common number base conversions</caption>
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-alt)]">
              <th scope="col" className="px-4 py-2.5 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Decimal</th>
              <th scope="col" className="px-4 py-2.5 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Binary</th>
              <th scope="col" className="px-4 py-2.5 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Octal</th>
              <th scope="col" className="px-4 py-2.5 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Hex</th>
            </tr>
          </thead>
          <tbody>
            {[0, 1, 8, 10, 16, 32, 64, 127, 128, 255].map((n) => (
              <tr key={n} className="border-b border-[var(--color-border)] last:border-b-0">
                <td className="px-4 py-2 font-mono text-[var(--color-text)]">{n}</td>
                <td className="px-4 py-2 font-mono text-[var(--color-text-muted)]">{n.toString(2)}</td>
                <td className="px-4 py-2 font-mono text-[var(--color-text-muted)]">{n.toString(8)}</td>
                <td className="px-4 py-2 font-mono text-[var(--color-text-muted)]">{n.toString(16).toUpperCase()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
