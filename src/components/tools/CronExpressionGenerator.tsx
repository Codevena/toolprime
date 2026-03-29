import { useState, useMemo, useCallback, lazy, Suspense } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'

const CronstrueDescriber = lazy(() =>
  import('cronstrue').then((mod) => ({
    default: function CronstrueWrapper({ expression }: { expression: string }) {
      let text: string
      try {
        text = mod.default.toString(expression, { use24HourTimeFormat: false })
      } catch {
        text = 'Invalid expression'
      }
      return <>{text}</>
    },
  }))
)

interface Preset {
  label: string
  expression: string
}

const PRESETS: Preset[] = [
  { label: 'Every Minute', expression: '* * * * *' },
  { label: 'Every 5 Minutes', expression: '*/5 * * * *' },
  { label: 'Every 15 Minutes', expression: '*/15 * * * *' },
  { label: 'Every 30 Minutes', expression: '*/30 * * * *' },
  { label: 'Every Hour', expression: '0 * * * *' },
  { label: 'Every 2 Hours', expression: '0 */2 * * *' },
  { label: 'Daily at Midnight', expression: '0 0 * * *' },
  { label: 'Daily at Noon', expression: '0 12 * * *' },
  { label: 'Daily at 9 AM', expression: '0 9 * * *' },
  { label: 'Every Weekday at 9 AM', expression: '0 9 * * 1-5' },
  { label: 'Weekly on Monday', expression: '0 0 * * 1' },
  { label: 'Monthly (1st at Midnight)', expression: '0 0 1 * *' },
  { label: 'Yearly (Jan 1st)', expression: '0 0 1 1 *' },
]

const MINUTE_OPTIONS = ['*', '*/5', '*/10', '*/15', '*/30', ...Array.from({ length: 60 }, (_, i) => String(i))]
const HOUR_OPTIONS = ['*', '*/2', '*/3', '*/4', '*/6', '*/12', ...Array.from({ length: 24 }, (_, i) => String(i))]
const DAY_OPTIONS = ['*', ...Array.from({ length: 31 }, (_, i) => String(i + 1))]
const MONTH_OPTIONS = ['*', ...Array.from({ length: 12 }, (_, i) => String(i + 1))]
const WEEKDAY_OPTIONS = [
  { value: '*', label: 'Every day' },
  { value: '0', label: 'Sunday' },
  { value: '1', label: 'Monday' },
  { value: '2', label: 'Tuesday' },
  { value: '3', label: 'Wednesday' },
  { value: '4', label: 'Thursday' },
  { value: '5', label: 'Friday' },
  { value: '6', label: 'Saturday' },
  { value: '1-5', label: 'Mon-Fri' },
  { value: '0,6', label: 'Sat-Sun' },
]

const MONTH_NAMES = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const FIELD_LABELS = ['Minute', 'Hour', 'Day (Month)', 'Month', 'Day (Week)']

function parseCronField(field: string, min: number, max: number): number[] {
  const results: number[] = []
  for (const part of field.split(',')) {
    const trimmed = part.trim()
    if (trimmed === '*') {
      for (let i = min; i <= max; i++) results.push(i)
    } else if (trimmed.includes('/')) {
      const [range, stepStr] = trimmed.split('/')
      const step = parseInt(stepStr, 10)
      if (Number.isNaN(step) || step <= 0) continue
      let start = min
      let end = max
      if (range !== '*' && range.includes('-')) {
        const [s, e] = range.split('-').map(Number)
        start = s
        end = e
      } else if (range !== '*') {
        start = parseInt(range, 10)
      }
      for (let i = start; i <= end; i += step) results.push(i)
    } else if (trimmed.includes('-')) {
      const [s, e] = trimmed.split('-').map(Number)
      for (let i = s; i <= e; i++) results.push(i)
    } else {
      const n = parseInt(trimmed, 10)
      if (!Number.isNaN(n)) results.push(n)
    }
  }
  return [...new Set(results)].sort((a, b) => a - b)
}

function getNextRunTimes(expression: string, count: number): Date[] {
  const parts = expression.trim().split(/\s+/)
  if (parts.length !== 5) return []

  try {
    const minutes = parseCronField(parts[0], 0, 59)
    const hours = parseCronField(parts[1], 0, 23)
    const daysOfMonth = parseCronField(parts[2], 1, 31)
    const months = parseCronField(parts[3], 1, 12)
    const daysOfWeek = parseCronField(parts[4], 0, 6)

    if (!minutes.length || !hours.length || !months.length) return []

    const now = new Date()
    const results: Date[] = []
    const candidate = new Date(now.getTime() + 60000)
    candidate.setSeconds(0, 0)

    const hasDayOfMonthConstraint = parts[2] !== '*'
    const hasDayOfWeekConstraint = parts[4] !== '*'

    const maxIterations = 525960 // ~1 year of minutes
    let iterations = 0

    while (results.length < count && iterations < maxIterations) {
      iterations++
      const m = candidate.getMinutes()
      const h = candidate.getHours()
      const dom = candidate.getDate()
      const mon = candidate.getMonth() + 1
      const dow = candidate.getDay()

      if (!months.includes(mon)) {
        // Skip to next matching month
        candidate.setMonth(candidate.getMonth() + 1, 1)
        candidate.setHours(0, 0, 0, 0)
        continue
      }

      if (!hours.includes(h)) {
        candidate.setMinutes(0)
        candidate.setTime(candidate.getTime() + 3600000)
        continue
      }

      if (!minutes.includes(m)) {
        candidate.setTime(candidate.getTime() + 60000)
        continue
      }

      // Day matching: if both day-of-month and day-of-week are restricted, either matches (OR logic in standard cron)
      let dayMatch = false
      if (hasDayOfMonthConstraint && hasDayOfWeekConstraint) {
        dayMatch = daysOfMonth.includes(dom) || daysOfWeek.includes(dow)
      } else if (hasDayOfMonthConstraint) {
        dayMatch = daysOfMonth.includes(dom)
      } else if (hasDayOfWeekConstraint) {
        dayMatch = daysOfWeek.includes(dow)
      } else {
        dayMatch = true
      }

      if (!dayMatch) {
        candidate.setTime(candidate.getTime() + 60000)
        continue
      }

      results.push(new Date(candidate))
      candidate.setTime(candidate.getTime() + 60000)
    }

    return results
  } catch {
    return []
  }
}

export function CronExpressionGenerator() {
  const [minute, setMinute] = useState('*')
  const [hour, setHour] = useState('*')
  const [dayOfMonth, setDayOfMonth] = useState('*')
  const [month, setMonth] = useState('*')
  const [dayOfWeek, setDayOfWeek] = useState('*')

  const expression = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`

  const applyPreset = useCallback((expr: string) => {
    const parts = expr.split(' ')
    if (parts.length === 5) {
      setMinute(parts[0])
      setHour(parts[1])
      setDayOfMonth(parts[2])
      setMonth(parts[3])
      setDayOfWeek(parts[4])
    }
  }, [])

  const nextRuns = useMemo(() => getNextRunTimes(expression, 5), [expression])

  const selectClass =
    'w-full p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]'

  return (
    <div className="space-y-6">
      {/* Expression display */}
      <div className="text-center p-5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)]">
        <p className="text-sm text-[var(--color-text-muted)] mb-1">Cron Expression</p>
        <div className="flex items-center justify-center gap-3">
          <code className="text-2xl sm:text-3xl font-mono font-bold tracking-wider">{expression}</code>
          <CopyButton text={expression} />
        </div>
        <div className="mt-3 text-sm text-[var(--color-text-muted)]">
          <Suspense fallback={<span>Loading...</span>}>
            <CronstrueDescriber expression={expression} />
          </Suspense>
        </div>
      </div>

      {/* Field labels */}
      <div className="grid grid-cols-5 gap-2 text-center text-xs text-[var(--color-text-muted)] font-medium">
        {FIELD_LABELS.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>

      {/* Presets */}
      <div>
        <h3 className="text-sm font-semibold text-[var(--color-text)] mb-2">Presets</h3>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.expression}
              onClick={() => applyPreset(preset.expression)}
              className={`px-3 py-1.5 text-xs rounded-md font-medium transition-colors ${
                expression === preset.expression
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-surface-alt)] border border-[var(--color-border)] hover:bg-[var(--color-border)]'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Builder dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        {/* Minute */}
        <div>
          <label htmlFor="cron-minute" className="block text-sm font-medium text-[var(--color-text)] mb-1">
            Minute
          </label>
          <select id="cron-minute" value={minute} onChange={(e) => setMinute(e.target.value)} className={selectClass}>
            {MINUTE_OPTIONS.map((v) => (
              <option key={v} value={v}>
                {v === '*' ? 'Every minute' : v.startsWith('*/') ? `Every ${v.slice(2)} min` : v}
              </option>
            ))}
          </select>
        </div>

        {/* Hour */}
        <div>
          <label htmlFor="cron-hour" className="block text-sm font-medium text-[var(--color-text)] mb-1">
            Hour
          </label>
          <select id="cron-hour" value={hour} onChange={(e) => setHour(e.target.value)} className={selectClass}>
            {HOUR_OPTIONS.map((v) => (
              <option key={v} value={v}>
                {v === '*' ? 'Every hour' : v.startsWith('*/') ? `Every ${v.slice(2)} hrs` : `${v}:00`}
              </option>
            ))}
          </select>
        </div>

        {/* Day of Month */}
        <div>
          <label htmlFor="cron-dom" className="block text-sm font-medium text-[var(--color-text)] mb-1">
            Day (Month)
          </label>
          <select id="cron-dom" value={dayOfMonth} onChange={(e) => setDayOfMonth(e.target.value)} className={selectClass}>
            {DAY_OPTIONS.map((v) => (
              <option key={v} value={v}>
                {v === '*' ? 'Every day' : v}
              </option>
            ))}
          </select>
        </div>

        {/* Month */}
        <div>
          <label htmlFor="cron-month" className="block text-sm font-medium text-[var(--color-text)] mb-1">
            Month
          </label>
          <select id="cron-month" value={month} onChange={(e) => setMonth(e.target.value)} className={selectClass}>
            {MONTH_OPTIONS.map((v) => (
              <option key={v} value={v}>
                {v === '*' ? 'Every month' : `${v} (${MONTH_NAMES[parseInt(v, 10)]})`}
              </option>
            ))}
          </select>
        </div>

        {/* Day of Week */}
        <div>
          <label htmlFor="cron-dow" className="block text-sm font-medium text-[var(--color-text)] mb-1">
            Day (Week)
          </label>
          <select id="cron-dow" value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)} className={selectClass}>
            {WEEKDAY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Next 5 run times */}
      {nextRuns.length > 0 && (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-5">
          <h3 className="text-sm font-semibold text-[var(--color-text)] mb-3">Next 5 Run Times</h3>
          <ol className="space-y-1.5">
            {nextRuns.map((date, i) => (
              <li key={i} className="flex items-center gap-2 text-sm font-mono">
                <span className="w-5 h-5 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-xs flex-shrink-0">
                  {i + 1}
                </span>
                <span>
                  {date.toLocaleString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Cron syntax reference */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-5">
        <h3 className="text-sm font-semibold text-[var(--color-text)] mb-3">Cron Syntax Reference</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[var(--color-text-muted)]">
                <th className="pb-2 pr-4 font-medium">Field</th>
                <th className="pb-2 pr-4 font-medium">Allowed Values</th>
                <th className="pb-2 font-medium">Special Characters</th>
              </tr>
            </thead>
            <tbody className="font-mono text-xs">
              <tr><td className="py-1 pr-4">Minute</td><td className="py-1 pr-4">0-59</td><td className="py-1">* , - /</td></tr>
              <tr><td className="py-1 pr-4">Hour</td><td className="py-1 pr-4">0-23</td><td className="py-1">* , - /</td></tr>
              <tr><td className="py-1 pr-4">Day of Month</td><td className="py-1 pr-4">1-31</td><td className="py-1">* , - /</td></tr>
              <tr><td className="py-1 pr-4">Month</td><td className="py-1 pr-4">1-12</td><td className="py-1">* , - /</td></tr>
              <tr><td className="py-1 pr-4">Day of Week</td><td className="py-1 pr-4">0-6 (Sun-Sat)</td><td className="py-1">* , - /</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
