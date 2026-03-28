import { useState, useCallback } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const NUMBERS = '0123456789'
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?'

function getStrength(password: string, charsetSize: number): { label: string; bgColor: string; width: string } {
  const len = password.length
  if (len === 0) return { label: '', bgColor: '', width: '0%' }
  const score = (len >= 16 ? 2 : len >= 12 ? 1 : 0) + (charsetSize >= 80 ? 2 : charsetSize >= 60 ? 1 : 0)
  if (score <= 1) return { label: 'Weak', bgColor: 'var(--color-error)', width: '25%' }
  if (score === 2) return { label: 'Fair', bgColor: 'var(--color-warning)', width: '50%' }
  if (score === 3) return { label: 'Good', bgColor: 'var(--color-primary)', width: '75%' }
  return { label: 'Strong', bgColor: 'var(--color-success)', width: '100%' }
}

function generatePassword(length: number, useUpper: boolean, useLower: boolean, useNumbers: boolean, useSymbols: boolean): string {
  let charset = ''
  if (useUpper) charset += UPPERCASE
  if (useLower) charset += LOWERCASE
  if (useNumbers) charset += NUMBERS
  if (useSymbols) charset += SYMBOLS
  if (!charset) charset = LOWERCASE

  const array = new Uint32Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, (n) => charset[n % charset.length]).join('')
}

export function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [useUpper, setUseUpper] = useState(true)
  const [useLower, setUseLower] = useState(true)
  const [useNumbers, setUseNumbers] = useState(true)
  const [useSymbols, setUseSymbols] = useState(true)
  const [password, setPassword] = useState(() => generatePassword(16, true, true, true, true))

  const regenerate = useCallback(() => {
    setPassword(generatePassword(length, useUpper, useLower, useNumbers, useSymbols))
  }, [length, useUpper, useLower, useNumbers, useSymbols])

  const charsetSize =
    (useUpper ? UPPERCASE.length : 0) +
    (useLower ? LOWERCASE.length : 0) +
    (useNumbers ? NUMBERS.length : 0) +
    (useSymbols ? SYMBOLS.length : 0)

  const strength = getStrength(password, charsetSize)

  const handleOptionChange = (
    field: 'upper' | 'lower' | 'numbers' | 'symbols',
    newValue: boolean,
  ) => {
    const opts = { upper: useUpper, lower: useLower, numbers: useNumbers, symbols: useSymbols }
    opts[field] = newValue
    // Prevent disabling all options
    if (!Object.values(opts).some(Boolean)) return
    setUseUpper(opts.upper)
    setUseLower(opts.lower)
    setUseNumbers(opts.numbers)
    setUseSymbols(opts.symbols)
    setPassword(generatePassword(length, opts.upper, opts.lower, opts.numbers, opts.symbols))
  }

  return (
    <div className="space-y-6">
      {/* Password display */}
      <div className="relative">
        <div className="w-full p-4 pr-28 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] font-mono text-lg break-all min-h-[3.5rem] flex items-center">
          {password || <span className="text-[var(--color-text-muted)]">Click Regenerate</span>}
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <CopyButton text={password} />
        </div>
      </div>

      {/* Strength meter */}
      {password && (
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-[var(--color-text-muted)]">Strength</span>
            <span className="font-medium">{strength.label}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-[var(--color-border)]">
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{ width: strength.width, backgroundColor: strength.bgColor }}
            />
          </div>
        </div>
      )}

      {/* Length slider */}
      <div>
        <div className="flex justify-between text-sm mb-2">
          <label className="font-medium">Length</label>
          <span className="font-mono font-bold text-[var(--color-primary)]">{length}</span>
        </div>
        <input
          type="range"
          min={8}
          max={128}
          value={length}
          onChange={(e) => {
            const v = Number(e.target.value)
            setLength(v)
            setPassword(generatePassword(v, useUpper, useLower, useNumbers, useSymbols))
          }}
          className="w-full accent-[var(--color-primary)]"
        />
        <div className="flex justify-between text-xs text-[var(--color-text-muted)] mt-1">
          <span>8</span>
          <span>128</span>
        </div>
      </div>

      {/* Toggles */}
      <div className="grid grid-cols-2 gap-3">
        {([
          ['Uppercase (A–Z)', useUpper, 'upper'],
          ['Lowercase (a–z)', useLower, 'lower'],
          ['Numbers (0–9)', useNumbers, 'numbers'],
          ['Symbols (!@#…)', useSymbols, 'symbols'],
        ] as const).map(([label, value, field]) => (
          <label key={label} className="flex items-center gap-3 p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => handleOptionChange(field, e.target.checked)}
              className="w-4 h-4 accent-[var(--color-primary)]"
            />
            <span className="text-sm">{label}</span>
          </label>
        ))}
      </div>

      {/* Regenerate button */}
      <button
        onClick={regenerate}
        className="w-full py-3 rounded-lg bg-[var(--color-primary)] text-white font-semibold hover:opacity-90 transition-opacity"
      >
        Regenerate Password
      </button>
    </div>
  )
}
