import { useState, useEffect, useMemo, useCallback } from 'react'
import { ArrowLeftRight } from 'lucide-react'

// ─── Self-contained currency list & fallback rates ──────────────────────────

interface CurrencyOption {
  code: string
  name: string
  symbol: string
  flag: string
}

const CURRENCIES: CurrencyOption[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '\u{1F1FA}\u{1F1F8}' },
  { code: 'EUR', name: 'Euro', symbol: '\u20AC', flag: '\u{1F1EA}\u{1F1FA}' },
  { code: 'GBP', name: 'British Pound', symbol: '\u00A3', flag: '\u{1F1EC}\u{1F1E7}' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '\u00A5', flag: '\u{1F1EF}\u{1F1F5}' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '\u{1F1E8}\u{1F1ED}' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', flag: '\u{1F1E8}\u{1F1E6}' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '\u{1F1E6}\u{1F1FA}' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '\u00A5', flag: '\u{1F1E8}\u{1F1F3}' },
  { code: 'INR', name: 'Indian Rupee', symbol: '\u20B9', flag: '\u{1F1EE}\u{1F1F3}' },
  { code: 'KRW', name: 'South Korean Won', symbol: '\u20A9', flag: '\u{1F1F0}\u{1F1F7}' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '\u{1F1F3}\u{1F1FF}' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '\u{1F1F8}\u{1F1EC}' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '\u{1F1ED}\u{1F1F0}' },
  { code: 'TWD', name: 'Taiwan Dollar', symbol: 'NT$', flag: '\u{1F1F9}\u{1F1FC}' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '\u{1F1F8}\u{1F1EA}' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '\u{1F1F3}\u{1F1F4}' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '\u{1F1E9}\u{1F1F0}' },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'z\u0142', flag: '\u{1F1F5}\u{1F1F1}' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'K\u010D', flag: '\u{1F1E8}\u{1F1FF}' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', flag: '\u{1F1ED}\u{1F1FA}' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '\u20BA', flag: '\u{1F1F9}\u{1F1F7}' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '\u{1F1E7}\u{1F1F7}' },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'MX$', flag: '\u{1F1F2}\u{1F1FD}' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '\u{1F1FF}\u{1F1E6}' },
  { code: 'THB', name: 'Thai Baht', symbol: '\u0E3F', flag: '\u{1F1F9}\u{1F1ED}' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '\u{1F1F2}\u{1F1FE}' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '\u{1F1EE}\u{1F1E9}' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '\u20B1', flag: '\u{1F1F5}\u{1F1ED}' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'AED', flag: '\u{1F1E6}\u{1F1EA}' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'SAR', flag: '\u{1F1F8}\u{1F1E6}' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '\u20AA', flag: '\u{1F1EE}\u{1F1F1}' },
  { code: 'BTC', name: 'Bitcoin', symbol: '\u20BF', flag: '\u{1FA99}' },
  { code: 'ETH', name: 'Ethereum', symbol: '\u039E', flag: '\u{1FA99}' },
  { code: 'SOL', name: 'Solana', symbol: 'SOL', flag: '\u{1FA99}' },
  { code: 'DOGE', name: 'Dogecoin', symbol: '\u0110', flag: '\u{1FA99}' },
]

const FALLBACK_RATES: Record<string, number> = {
  USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149.5, CHF: 0.88, CAD: 1.36,
  AUD: 1.53, CNY: 7.24, INR: 83.1, KRW: 1330, NZD: 1.64, SGD: 1.34,
  HKD: 7.82, TWD: 31.5, SEK: 10.4, NOK: 10.6, DKK: 6.87, PLN: 3.98,
  CZK: 23.2, HUF: 362, TRY: 32.5, BRL: 4.97, MXN: 17.1, ZAR: 18.6,
  THB: 35.2, MYR: 4.72, IDR: 15650, PHP: 55.8, AED: 3.67, SAR: 3.75,
  ILS: 3.64, BTC: 0.0000148, ETH: 0.000285, SOL: 0.0053, DOGE: 5.88,
}

const CRYPTO_CODES = new Set(['BTC', 'ETH', 'SOL', 'DOGE'])

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

  const result = useMemo(() => {
    const num = parseFloat(amount)
    if (isNaN(num) || num < 0) return null
    return convert(num, fromCode, toCode, rates)
  }, [amount, fromCode, toCode, rates])

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
