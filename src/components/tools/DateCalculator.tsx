import { useState, useMemo } from 'react'

export function DateCalculator() {
  const [mode, setMode] = useState<'between' | 'add' | 'subtract'>('between')
  const [date1, setDate1] = useState(toInputDate(new Date()))
  const [date2, setDate2] = useState(toInputDate(addDaysLocal(new Date(), 30)))
  const [daysToAdd, setDaysToAdd] = useState(30)

  const result = useMemo(() => {
    if (mode === 'between') {
      const d1 = new Date(date1)
      const d2 = new Date(date2)
      const diffMs = Math.abs(d2.getTime() - d1.getTime())
      const days = Math.round(diffMs / (1000 * 60 * 60 * 24))
      const weeks = Math.floor(days / 7)
      const remainingDays = days % 7
      return { days, weeks, remainingDays, resultDate: null }
    }

    const base = new Date(date1)
    const offset = mode === 'add' ? daysToAdd : -daysToAdd
    const resultDate = addDaysLocal(base, offset)
    const days = Math.abs(offset)
    return { days, weeks: Math.floor(days / 7), remainingDays: days % 7, resultDate }
  }, [mode, date1, date2, daysToAdd])

  return (
    <div className="space-y-6">
      {/* Mode selector */}
      <div className="flex gap-2 flex-wrap">
        {(['between', 'add', 'subtract'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-lg border transition-colors text-sm font-medium ${
              mode === m
                ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                : 'border-[var(--color-border)] hover:bg-[var(--color-surface-alt)]'
            }`}
          >
            {m === 'between' ? 'Days Between' : m === 'add' ? 'Add Days' : 'Subtract Days'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date1" className="block text-sm font-medium mb-1">
            {mode === 'between' ? 'Start Date' : 'Date'}
          </label>
          <input
            type="date"
            id="date1"
            value={date1}
            onChange={(e) => setDate1(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-3 py-2 text-[var(--color-text)]"
          />
        </div>

        {mode === 'between' ? (
          <div>
            <label htmlFor="date2" className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              id="date2"
              value={date2}
              onChange={(e) => setDate2(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-3 py-2 text-[var(--color-text)]"
            />
          </div>
        ) : (
          <div>
            <label htmlFor="days-input" className="block text-sm font-medium mb-1">Number of Days</label>
            <input
              type="number"
              id="days-input"
              value={daysToAdd}
              min={1}
              onChange={(e) => setDaysToAdd(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-3 py-2 text-[var(--color-text)]"
            />
          </div>
        )}
      </div>

      {/* Result */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-6 text-center" role="status" aria-live="polite">
        {mode === 'between' ? (
          <>
            <p className="text-3xl font-bold">{result.days.toLocaleString()} days</p>
            <p className="text-[var(--color-text-muted)] mt-2">
              {result.weeks} week{result.weeks !== 1 ? 's' : ''} and {result.remainingDays} day{result.remainingDays !== 1 ? 's' : ''}
            </p>
          </>
        ) : (
          <>
            <p className="text-lg text-[var(--color-text-muted)]">
              {result.days} days {mode === 'add' ? 'from' : 'before'} {formatDateDisplay(new Date(date1))}
            </p>
            <p className="text-3xl font-bold mt-1">
              {result.resultDate ? formatDateDisplay(result.resultDate) : ''}
            </p>
          </>
        )}
      </div>
    </div>
  )
}

function toInputDate(d: Date): string {
  return d.toISOString().slice(0, 10)
}

function addDaysLocal(d: Date, days: number): Date {
  const result = new Date(d)
  result.setDate(result.getDate() + days)
  return result
}

function formatDateDisplay(d: Date): string {
  return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}
