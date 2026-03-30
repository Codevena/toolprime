import { useState, useMemo, useEffect } from 'react'

// Inline a compact subset for the interactive tool
const popularCities = [
  { name: 'New York', timezone: 'America/New_York' },
  { name: 'Los Angeles', timezone: 'America/Los_Angeles' },
  { name: 'Chicago', timezone: 'America/Chicago' },
  { name: 'Denver', timezone: 'America/Denver' },
  { name: 'London', timezone: 'Europe/London' },
  { name: 'Paris', timezone: 'Europe/Paris' },
  { name: 'Berlin', timezone: 'Europe/Berlin' },
  { name: 'Moscow', timezone: 'Europe/Moscow' },
  { name: 'Istanbul', timezone: 'Europe/Istanbul' },
  { name: 'Dubai', timezone: 'Asia/Dubai' },
  { name: 'Mumbai', timezone: 'Asia/Kolkata' },
  { name: 'Singapore', timezone: 'Asia/Singapore' },
  { name: 'Hong Kong', timezone: 'Asia/Hong_Kong' },
  { name: 'Shanghai', timezone: 'Asia/Shanghai' },
  { name: 'Tokyo', timezone: 'Asia/Tokyo' },
  { name: 'Seoul', timezone: 'Asia/Seoul' },
  { name: 'Sydney', timezone: 'Australia/Sydney' },
  { name: 'Auckland', timezone: 'Pacific/Auckland' },
  { name: 'São Paulo', timezone: 'America/Sao_Paulo' },
  { name: 'Toronto', timezone: 'America/Toronto' },
  { name: 'Mexico City', timezone: 'America/Mexico_City' },
  { name: 'Cairo', timezone: 'Africa/Cairo' },
  { name: 'Lagos', timezone: 'Africa/Lagos' },
  { name: 'Nairobi', timezone: 'Africa/Nairobi' },
  { name: 'Johannesburg', timezone: 'Africa/Johannesburg' },
]

interface TimezoneConverterProps {
  defaultFrom?: string
  defaultTo?: string
}

export function TimezoneConverter({ defaultFrom, defaultTo }: TimezoneConverterProps) {
  const [fromTz, setFromTz] = useState(defaultFrom ?? 'America/New_York')
  const [toTz, setToTz] = useState(defaultTo ?? 'Europe/London')
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const fromTime = useMemo(() => formatTime(fromTz, now), [fromTz, now])
  const toTime = useMemo(() => formatTime(toTz, now), [toTz, now])
  const fromDate = useMemo(() => formatDate(fromTz, now), [fromTz, now])
  const toDate = useMemo(() => formatDate(toTz, now), [toTz, now])
  const fromOffset = useMemo(() => getOffset(fromTz, now), [fromTz, now])
  const toOffset = useMemo(() => getOffset(toTz, now), [toTz, now])

  // Only recompute table when date changes (not every second)
  const dateKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`
  const hourTable = useMemo(() => {
    const rows: { fromHour: string; toHour: string }[] = []
    for (let h = 0; h < 24; h++) {
      const base = new Date(now)
      base.setHours(h, 0, 0, 0)
      const fromStr = new Intl.DateTimeFormat('en-US', {
        timeZone: fromTz, hour: '2-digit', minute: '2-digit', hour12: true,
      }).format(base)
      const toStr = new Intl.DateTimeFormat('en-US', {
        timeZone: toTz, hour: '2-digit', minute: '2-digit', hour12: true,
      }).format(base)
      rows.push({ fromHour: fromStr, toHour: toStr })
    }
    return rows
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromTz, toTz, dateKey])

  function swap() {
    setFromTz(toTz)
    setToTz(fromTz)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-end">
        <div>
          <label htmlFor="from-tz" className="block text-sm font-medium mb-1">From</label>
          <select
            id="from-tz"
            value={fromTz}
            onChange={(e) => setFromTz(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-3 py-2 text-[var(--color-text)]"
          >
            {popularCities.map((c) => (
              <option key={c.timezone + c.name} value={c.timezone}>{c.name}</option>
            ))}
          </select>
        </div>

        <button
          onClick={swap}
          className="self-end rounded-lg border border-[var(--color-border)] px-3 py-2 hover:bg-[var(--color-surface-alt)] transition-colors"
          aria-label="Swap timezones"
        >
          ⇄
        </button>

        <div>
          <label htmlFor="to-tz" className="block text-sm font-medium mb-1">To</label>
          <select
            id="to-tz"
            value={toTz}
            onChange={(e) => setToTz(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-3 py-2 text-[var(--color-text)]"
          >
            {popularCities.map((c) => (
              <option key={c.timezone + c.name} value={c.timezone}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Live clocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4 text-center" role="status" aria-live="polite">
          <p className="text-3xl font-bold font-mono">{fromTime}</p>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">{fromDate}</p>
          <p className="text-xs text-[var(--color-text-muted)]">{fromOffset}</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4 text-center" role="status" aria-live="polite">
          <p className="text-3xl font-bold font-mono">{toTime}</p>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">{toDate}</p>
          <p className="text-xs text-[var(--color-text-muted)]">{toOffset}</p>
        </div>
      </div>

      {/* Hour-by-hour table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <caption className="sr-only">Hour-by-hour time comparison</caption>
          <thead>
            <tr className="border-b border-[var(--color-border)]">
              <th scope="col" className="text-left py-2 px-3 font-medium">
                {popularCities.find((c) => c.timezone === fromTz)?.name ?? fromTz}
              </th>
              <th scope="col" className="text-left py-2 px-3 font-medium">
                {popularCities.find((c) => c.timezone === toTz)?.name ?? toTz}
              </th>
            </tr>
          </thead>
          <tbody>
            {hourTable.map((row, i) => (
              <tr key={i} className="border-b border-[var(--color-border)] last:border-0">
                <td className="py-1.5 px-3 font-mono">{row.fromHour}</td>
                <td className="py-1.5 px-3 font-mono">{row.toHour}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function formatTime(tz: string, date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
  }).format(date)
}

function formatDate(tz: string, date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: tz, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  }).format(date)
}

function getOffset(tz: string, date: Date): string {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: tz, timeZoneName: 'shortOffset',
  })
  const parts = formatter.formatToParts(date)
  return parts.find((p) => p.type === 'timeZoneName')?.value ?? 'UTC'
}
