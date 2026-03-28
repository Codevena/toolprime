import { useState, useEffect } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'

function formatDate(date: Date): string {
  return date.toLocaleString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  })
}

function formatUTC(date: Date): string {
  return date.toLocaleString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    timeZone: 'UTC',
  })
}

export function TimestampConverter() {
  const [now, setNow] = useState(Math.floor(Date.now() / 1000))
  const [unixInput, setUnixInput] = useState('')
  const [dateInput, setDateInput] = useState('')
  const [unit, setUnit] = useState<'seconds' | 'milliseconds'>('seconds')

  useEffect(() => {
    const id = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000)
    return () => clearInterval(id)
  }, [])

  const unixToDate = (() => {
    if (!unixInput.trim()) return null
    const n = Number(unixInput.trim())
    if (Number.isNaN(n)) return { error: 'Invalid number' }
    const ms = unit === 'seconds' ? n * 1000 : n
    const date = new Date(ms)
    if (Number.isNaN(date.getTime())) return { error: 'Invalid timestamp' }
    return {
      local: formatDate(date),
      utc: formatUTC(date),
      iso: date.toISOString(),
    }
  })()

  const dateToUnix = (() => {
    if (!dateInput.trim()) return null
    const date = new Date(dateInput)
    if (Number.isNaN(date.getTime())) return { error: 'Invalid date' }
    const ts = unit === 'seconds' ? Math.floor(date.getTime() / 1000) : date.getTime()
    return { timestamp: String(ts) }
  })()

  return (
    <div className="space-y-6">
      {/* Live clock */}
      <div className="text-center p-4 rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border)]">
        <p className="text-sm text-[var(--color-text-muted)] mb-1">Current Unix Timestamp</p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-3xl font-mono font-bold">{now}</span>
          <CopyButton text={String(now)} />
        </div>
      </div>

      {/* Unit toggle */}
      <div className="flex justify-center gap-2">
        {(['seconds', 'milliseconds'] as const).map((u) => (
          <button
            key={u}
            onClick={() => setUnit(u)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              unit === u
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-[var(--color-surface-alt)] border border-[var(--color-border)] hover:bg-[var(--color-border)]'
            }`}
          >
            {u === 'seconds' ? 'Seconds' : 'Milliseconds'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Unix → Date */}
        <div className="space-y-3">
          <h3 className="font-semibold">Unix Timestamp → Date</h3>
          <input
            type="text"
            value={unixInput}
            onChange={(e) => setUnixInput(e.target.value)}
            placeholder={unit === 'seconds' ? 'e.g. 1735689600' : 'e.g. 1735689600000'}
            className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
          {unixToDate && 'error' in unixToDate && (
            <div className="p-3 rounded-lg text-sm" style={{ border: '1px solid var(--color-error-border)', background: 'var(--color-error-bg)', color: 'var(--color-error-text)' }}>
              {unixToDate.error}
            </div>
          )}
          {unixToDate && !('error' in unixToDate) && (
            <div className="space-y-2 p-3 rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border)]">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[var(--color-text-muted)]">Local:</span>
                <div className="flex items-center gap-2 font-mono">{unixToDate.local} <CopyButton text={unixToDate.local} /></div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[var(--color-text-muted)]">UTC:</span>
                <div className="flex items-center gap-2 font-mono">{unixToDate.utc} <CopyButton text={unixToDate.utc} /></div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[var(--color-text-muted)]">ISO 8601:</span>
                <div className="flex items-center gap-2 font-mono">{unixToDate.iso} <CopyButton text={unixToDate.iso} /></div>
              </div>
            </div>
          )}
        </div>

        {/* Date → Unix */}
        <div className="space-y-3">
          <h3 className="font-semibold">Date → Unix Timestamp</h3>
          <input
            type="datetime-local"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
          {dateToUnix && 'error' in dateToUnix && (
            <div className="p-3 rounded-lg text-sm" style={{ border: '1px solid var(--color-error-border)', background: 'var(--color-error-bg)', color: 'var(--color-error-text)' }}>
              {dateToUnix.error}
            </div>
          )}
          {dateToUnix && !('error' in dateToUnix) && (
            <div className="p-3 rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border)]">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[var(--color-text-muted)]">Timestamp ({unit}):</span>
                <div className="flex items-center gap-2 font-mono font-bold">{dateToUnix.timestamp} <CopyButton text={dateToUnix.timestamp} /></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
