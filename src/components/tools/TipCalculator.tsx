import { useState, useMemo } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'

const TIP_PRESETS = [10, 15, 18, 20, 25] as const

function formatCurrency(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

export function TipCalculator() {
  const [billAmount, setBillAmount] = useState('50')
  const [tipPercent, setTipPercent] = useState(18)
  const [customTip, setCustomTip] = useState('')
  const [splitCount, setSplitCount] = useState('1')
  const [isCustom, setIsCustom] = useState(false)

  const activeTip = isCustom ? parseFloat(customTip) || 0 : tipPercent
  const bill = parseFloat(billAmount) || 0
  const people = Math.max(1, parseInt(splitCount) || 1)

  const result = useMemo(() => {
    const tipAmount = bill * (activeTip / 100)
    const total = bill + tipAmount
    const perPerson = total / people
    const tipPerPerson = tipAmount / people
    return {
      tipAmount: Math.round(tipAmount * 100) / 100,
      total: Math.round(total * 100) / 100,
      perPerson: Math.round(perPerson * 100) / 100,
      tipPerPerson: Math.round(tipPerPerson * 100) / 100,
    }
  }, [bill, activeTip, people])

  const summaryText = `Bill: ${formatCurrency(bill)}\nTip (${activeTip}%): ${formatCurrency(result.tipAmount)}\nTotal: ${formatCurrency(result.total)}${people > 1 ? `\nPer Person: ${formatCurrency(result.perPerson)}` : ''}`

  return (
    <div className="space-y-6">
      {/* Bill amount */}
      <div>
        <label htmlFor="bill-amount" className="block text-sm font-medium mb-1">
          Bill Amount ($)
        </label>
        <input
          id="bill-amount"
          type="number"
          min="0"
          step="0.01"
          value={billAmount}
          onChange={(e) => setBillAmount(e.target.value)}
          className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-lg font-mono"
        />
      </div>

      {/* Tip percentage presets */}
      <div>
        <label className="block text-sm font-medium mb-2">Tip Percentage</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {TIP_PRESETS.map((pct) => (
            <button
              key={pct}
              onClick={() => {
                setTipPercent(pct)
                setIsCustom(false)
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                !isCustom && tipPercent === pct
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'border border-[var(--color-border)] bg-[var(--color-surface-alt)] hover:bg-[var(--color-border)]'
              }`}
            >
              {pct}%
            </button>
          ))}
          <button
            onClick={() => setIsCustom(true)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isCustom
                ? 'bg-[var(--color-primary)] text-white'
                : 'border border-[var(--color-border)] bg-[var(--color-surface-alt)] hover:bg-[var(--color-border)]'
            }`}
          >
            Custom
          </button>
        </div>

        {isCustom && (
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={customTip || '0'}
              onChange={(e) => setCustomTip(e.target.value)}
              className="flex-1"
              aria-label="Custom tip percentage slider"
            />
            <div className="flex items-center gap-1">
              <input
                type="number"
                min="0"
                max="100"
                value={customTip}
                onChange={(e) => setCustomTip(e.target.value)}
                className="w-20 p-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                aria-label="Custom tip percentage"
              />
              <span className="text-sm text-[var(--color-text-muted)]">%</span>
            </div>
          </div>
        )}
      </div>

      {/* Split */}
      <div>
        <label htmlFor="split-count" className="block text-sm font-medium mb-1">
          Split Between
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSplitCount((c) => String(Math.max(1, (parseInt(c) || 1) - 1)))}
            className="w-10 h-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] hover:bg-[var(--color-border)] text-lg font-bold transition-colors"
            aria-label="Decrease number of people"
          >
            -
          </button>
          <input
            id="split-count"
            type="number"
            min="1"
            value={splitCount}
            onChange={(e) => setSplitCount(e.target.value)}
            className="w-20 p-2 text-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] text-lg font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
          <button
            onClick={() => setSplitCount((c) => String((parseInt(c) || 1) + 1))}
            className="w-10 h-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] hover:bg-[var(--color-border)] text-lg font-bold transition-colors"
            aria-label="Increase number of people"
          >
            +
          </button>
          <span className="text-sm text-[var(--color-text-muted)]">
            {people === 1 ? 'person' : 'people'}
          </span>
        </div>
      </div>

      {/* Results */}
      {bill > 0 && (
        <div role="status" aria-live="polite" className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm text-[var(--color-text-muted)]">Tip Amount</div>
              <div className="text-2xl font-bold text-[var(--color-primary)]">
                {formatCurrency(result.tipAmount)}
              </div>
            </div>
            <div>
              <div className="text-sm text-[var(--color-text-muted)]">Total</div>
              <div className="text-2xl font-bold text-[var(--color-text)]">
                {formatCurrency(result.total)}
              </div>
            </div>
            {people > 1 && (
              <div>
                <div className="text-sm text-[var(--color-text-muted)]">Per Person</div>
                <div className="text-2xl font-bold text-[var(--color-text)]">
                  {formatCurrency(result.perPerson)}
                </div>
                <div className="text-xs text-[var(--color-text-muted)]">
                  (tip: {formatCurrency(result.tipPerPerson)})
                </div>
              </div>
            )}
          </div>

          {/* Quick comparison table */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm">
              <caption className="sr-only">Tip comparison for different percentages</caption>
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase">Tip %</th>
                  <th scope="col" className="px-3 py-2 text-right text-xs font-semibold text-[var(--color-text-muted)] uppercase">Tip</th>
                  <th scope="col" className="px-3 py-2 text-right text-xs font-semibold text-[var(--color-text-muted)] uppercase">Total</th>
                  {people > 1 && (
                    <th scope="col" className="px-3 py-2 text-right text-xs font-semibold text-[var(--color-text-muted)] uppercase">Per Person</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {TIP_PRESETS.map((pct) => {
                  const tip = bill * (pct / 100)
                  const tot = bill + tip
                  const isActive = !isCustom && tipPercent === pct
                  return (
                    <tr
                      key={pct}
                      className={`border-b border-[var(--color-border)] last:border-0 ${isActive ? 'bg-[var(--color-primary)]/5' : ''}`}
                    >
                      <td className={`px-3 py-2 font-medium ${isActive ? 'text-[var(--color-primary)]' : ''}`}>
                        {pct}%
                      </td>
                      <td className="px-3 py-2 text-right font-mono">{formatCurrency(Math.round(tip * 100) / 100)}</td>
                      <td className="px-3 py-2 text-right font-mono">{formatCurrency(Math.round(tot * 100) / 100)}</td>
                      {people > 1 && (
                        <td className="px-3 py-2 text-right font-mono">
                          {formatCurrency(Math.round((tot / people) * 100) / 100)}
                        </td>
                      )}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center">
            <CopyButton text={summaryText} />
          </div>
        </div>
      )}
    </div>
  )
}
