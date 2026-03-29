import { useState } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'
import { calculateAge, getGeneration, getZodiacSign } from '@/data/ageData'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const

const currentYear = new Date().getFullYear()

function getDaysUntilNextBirthday(month: number, day: number): number {
  const now = new Date()
  const thisYear = now.getFullYear()
  let next = new Date(thisYear, month - 1, day)
  if (next <= now) {
    next = new Date(thisYear + 1, month - 1, day)
  }
  return Math.ceil((next.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

function formatNumber(n: number): string {
  return n.toLocaleString('en-US')
}

interface Props {
  defaultYear?: number
  defaultMonth?: number
  defaultDay?: number
}

export function AgeCalculator({ defaultYear, defaultMonth, defaultDay }: Props) {
  const [year, setYear] = useState(defaultYear?.toString() ?? '')
  const [month, setMonth] = useState(defaultMonth?.toString() ?? '')
  const [day, setDay] = useState(defaultDay?.toString() ?? '')
  const [calculated, setCalculated] = useState(false)

  const handleCalculate = () => {
    setCalculated(true)
  }

  const y = parseInt(year, 10)
  const m = parseInt(month, 10)
  const d = parseInt(day, 10)
  const validYear = !isNaN(y) && y >= 1920 && y <= currentYear
  const validMonth = !isNaN(m) && m >= 1 && m <= 12
  const maxDay = validYear && validMonth ? new Date(y, m, 0).getDate() : 31
  const validDay = !isNaN(d) && d >= 1 && d <= maxDay
  const notFuture = validYear && validMonth && validDay ? new Date(y, m - 1, d) <= new Date() : true
  const hasValidInput = validYear && validMonth && validDay && notFuture

  const result = hasValidInput ? calculateAge(y, m, d) : null
  const generation = validYear ? getGeneration(y) : null
  const zodiac = hasValidInput ? getZodiacSign(m, d) : null
  const daysUntil = hasValidInput ? getDaysUntilNextBirthday(m, d) : null

  const copyText = result
    ? `Age: ${result.years} years, ${result.months} months, ${result.days} days (${formatNumber(result.totalDays)} total days)`
    : ''

  const yearOptions: number[] = []
  for (let i = currentYear; i >= 1920; i--) yearOptions.push(i)

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="age-year" className="block text-sm font-medium mb-1">Birth Year</label>
          <select
            id="age-year"
            value={year}
            onChange={(e) => { setYear(e.target.value); setCalculated(false) }}
            className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-lg"
            aria-label="Birth year"
          >
            <option value="">Year</option>
            {yearOptions.map((yr) => (
              <option key={yr} value={yr}>{yr}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="age-month" className="block text-sm font-medium mb-1">Birth Month</label>
          <select
            id="age-month"
            value={month}
            onChange={(e) => { setMonth(e.target.value); setCalculated(false) }}
            className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-lg"
            aria-label="Birth month"
          >
            <option value="">Month</option>
            {MONTHS.map((mn, i) => (
              <option key={mn} value={i + 1}>{mn}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="age-day" className="block text-sm font-medium mb-1">Birth Day</label>
          <select
            id="age-day"
            value={day}
            onChange={(e) => { setDay(e.target.value); setCalculated(false) }}
            className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-lg"
            aria-label="Birth day"
          >
            <option value="">Day</option>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((dd) => (
              <option key={dd} value={dd}>{dd}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Calculate button */}
      <button
        onClick={handleCalculate}
        className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:opacity-90 transition-opacity"
      >
        Calculate Age
      </button>

      {/* Result */}
      {calculated && result && (
        <div role="status" aria-live="polite" className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm text-[var(--color-text-muted)]">Your Age</div>
              <div className="text-4xl font-bold text-[var(--color-primary-text)]">
                {result.years} years
              </div>
              <div className="text-lg text-[var(--color-text-muted)]">
                {result.months} months, {result.days} days
              </div>
            </div>
            <CopyButton text={copyText} />
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[var(--color-border)]">
            <div className="text-center">
              <div className="text-xs text-[var(--color-text-muted)]">Total Days</div>
              <div className="text-lg font-semibold text-[var(--color-text)]">{formatNumber(result.totalDays)}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-[var(--color-text-muted)]">Total Hours</div>
              <div className="text-lg font-semibold text-[var(--color-text)]">{formatNumber(result.totalDays * 24)}</div>
            </div>
            {generation && (
              <div className="text-center">
                <div className="text-xs text-[var(--color-text-muted)]">Generation</div>
                <div className="text-lg font-semibold text-[var(--color-text)]">{generation.name}</div>
              </div>
            )}
            {zodiac && (
              <div className="text-center">
                <div className="text-xs text-[var(--color-text-muted)]">Zodiac Sign</div>
                <div className="text-lg font-semibold text-[var(--color-text)]">{zodiac}</div>
              </div>
            )}
          </div>

          {/* Days until next birthday */}
          {daysUntil !== null && (
            <div className="pt-3 border-t border-[var(--color-border)]">
              <div className="text-sm text-[var(--color-text-muted)]">
                Days until next birthday
              </div>
              <div className="text-lg font-semibold text-[var(--color-text)]">
                {daysUntil === 0 ? 'Today is your birthday!' : `${formatNumber(daysUntil)} days`}
              </div>
            </div>
          )}
        </div>
      )}

      {calculated && !hasValidInput && (
        <div className="p-3 rounded-lg text-sm" style={{ border: '1px solid var(--color-warning-border)', background: 'var(--color-warning-bg)', color: 'var(--color-warning-text)' }}>
          Please select a valid birth year, month, and day.
        </div>
      )}

      {/* Generations Reference */}
      <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
        <table className="w-full text-sm">
          <caption className="sr-only">Generation Names by Birth Year Range</caption>
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-alt)]">
              <th scope="col" className="px-4 py-2.5 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Generation</th>
              <th scope="col" className="px-4 py-2.5 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Birth Years</th>
              <th scope="col" className="px-4 py-2.5 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Age Range</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Silent Generation', start: 1928, end: 1945 },
              { name: 'Baby Boomers', start: 1946, end: 1964 },
              { name: 'Generation X', start: 1965, end: 1980 },
              { name: 'Millennials', start: 1981, end: 1996 },
              { name: 'Generation Z', start: 1997, end: 2012 },
              { name: 'Generation Alpha', start: 2013, end: 2025 },
            ].map((gen, i, arr) => (
              <tr key={gen.name} className={i < arr.length - 1 ? 'border-b border-[var(--color-border)]' : ''}>
                <th scope="row" className="px-4 py-2.5 text-sm font-medium text-[var(--color-text)]">{gen.name}</th>
                <td className="px-4 py-2.5 text-sm text-[var(--color-text-muted)]">{gen.start}–{gen.end}</td>
                <td className="px-4 py-2.5 text-sm text-[var(--color-text-muted)]">{currentYear - gen.end}–{currentYear - gen.start}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
