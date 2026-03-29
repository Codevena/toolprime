import { useState, useEffect, useMemo, useCallback } from 'react'
import { ArrowLeftRight } from 'lucide-react'
import { currencies, fallbackRates } from '@/data/currencyData'

// ─── Derive component data from shared currency definitions ─────────────────

const CURRENCIES = currencies
const FALLBACK_RATES = fallbackRates
const CRYPTO_CODES = new Set(currencies.filter((c) => c.isCrypto).map((c) => c.code))

function convert(amount: number, from: string, to: string, rates: Record<string, number>): number {
  const fromRate = rates[from]
  const toRate = rates[to]
  if (!fromRate || !toRate) return 0
  return (amount / fromRate) * toRate
}

function formatResult(value: number): string {
  if (value === 0) return '0'
  if (Math.abs(value) < 0.01) return value.toPrecision(4)
  if (Math.abs(value) >= 1_000_000) return value.toLocaleString('en-US', { maximumFractionDigits: 0 })
  return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

interface CurrencyConverterProps {
  defaultFrom?: string
  defaultTo?: string
  defaultAmount?: number
}

export function CurrencyConverter({
  defaultFrom = 'USD',
  defaultTo = 'EUR',
  defaultAmount = 100,
}: CurrencyConverterProps) {
  const [fromCode, setFromCode] = useState(defaultFrom)
  const [toCode, setToCode] = useState(defaultTo)
  const [amount, setAmount] = useState(String(defaultAmount))
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch('https://api.frankfurter.dev/v1/latest?base=USD')
        if (!res.ok) throw new Error('fetch failed')
        const data = (await res.json()) as { rates: Record<string, number> }
        if (cancelled) return
        const live: Record<string, number> = { USD: 1, ...data.rates }
        // Crypto always from fallback
        for (const code of CRYPTO_CODES) {
          if (FALLBACK_RATES[code] !== undefined) live[code] = FALLBACK_RATES[code]
        }
        setRates(live)
      } catch {
        // keep fallback
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const parsedAmount = useMemo(() => parseFloat(amount), [amount])
  const isNegative = !isNaN(parsedAmount) && parsedAmount < 0

  const result = useMemo(() => {
    if (isNaN(parsedAmount) || parsedAmount < 0) return null
    return convert(parsedAmount, fromCode, toCode, rates)
  }, [parsedAmount, fromCode, toCode, rates])

  const rate = useMemo(() => convert(1, fromCode, toCode, rates), [fromCode, toCode, rates])

  const handleSwap = useCallback(() => {
    setFromCode(toCode)
    setToCode(fromCode)
  }, [fromCode, toCode])

  const quickAmounts = [1, 10, 100, 1000]
  const tableAmounts = [1, 5, 10, 25, 50, 100, 500, 1000]

  return (
    <div className="space-y-6">
      {/* Amount input */}
      <div>
        <label htmlFor="cc-amount" className="block text-sm font-medium mb-1">Amount</label>
        <input
          id="cc-amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
          className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-lg font-mono"
          placeholder="Enter amount"
        />
      </div>

      {/* Quick amount buttons */}
      <div className="flex gap-2 flex-wrap">
        {quickAmounts.map((qa) => (
          <button
            key={qa}
            onClick={() => setAmount(String(qa))}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              amount === String(qa)
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-[var(--color-surface-alt)] border border-[var(--color-border)] hover:bg-[var(--color-border)]'
            }`}
          >
            {qa.toLocaleString()}
          </button>
        ))}
      </div>

      {/* Currency selectors */}
      <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-end">
        <div>
          <label htmlFor="cc-from" className="block text-sm font-medium mb-1">From</label>
          <select
            id="cc-from"
            value={fromCode}
            onChange={(e) => setFromCode(e.target.value)}
            className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.code} — {c.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSwap}
          className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] hover:bg-[var(--color-border)] transition-colors"
          aria-label="Swap currencies"
          title="Swap currencies"
        >
          <ArrowLeftRight size={20} />
        </button>

        <div>
          <label htmlFor="cc-to" className="block text-sm font-medium mb-1">To</label>
          <select
            id="cc-to"
            value={toCode}
            onChange={(e) => setToCode(e.target.value)}
            className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.code} — {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Result */}
      {loading ? (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-6 text-center text-[var(--color-text-muted)]">
          Loading live rates...
        </div>
      ) : isNegative ? (
        <div className="p-3 rounded-lg text-sm" style={{ border: '1px solid var(--color-warning-border)', background: 'var(--color-warning-bg)', color: 'var(--color-warning-text)' }}>
          Please enter a positive amount.
        </div>
      ) : result !== null ? (
        <div role="status" aria-live="polite" className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-6">
          <div className="text-sm text-[var(--color-text-muted)]">{amount} {fromCode} =</div>
          <div className="text-3xl font-bold text-[var(--color-primary-text)]">
            {formatResult(result)} {toCode}
          </div>
          <div className="text-sm text-[var(--color-text-muted)] mt-1">
            1 {fromCode} = {formatResult(rate)} {toCode}
          </div>
        </div>
      ) : null}

      {/* Conversion table */}
      <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
        <table className="w-full text-sm">
          <caption className="sr-only">Conversion table for {fromCode} to {toCode}</caption>
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-alt)]">
              <th scope="col" className="px-4 py-2.5 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">{fromCode}</th>
              <th scope="col" className="px-4 py-2.5 text-right text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">{toCode}</th>
            </tr>
          </thead>
          <tbody>
            {tableAmounts.map((ta) => (
              <tr key={ta} className="border-b border-[var(--color-border)] last:border-b-0">
                <td className="px-4 py-2.5 text-sm text-[var(--color-text)]">{ta.toLocaleString()} {fromCode}</td>
                <td className="px-4 py-2.5 text-sm text-right text-[var(--color-text-muted)]">{formatResult(convert(ta, fromCode, toCode, rates))} {toCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
