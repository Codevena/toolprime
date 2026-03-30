import { useState, useEffect } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'

interface TimestampPreset {
  label: string
  unixSeconds: string
  note: string
}

const presets: TimestampPreset[] = [
  {
    label: 'Unix Epoch',
    unixSeconds: '0',
    note: 'The baseline reference point: January 1, 1970 at 00:00:00 UTC.',
  },
  {
    label: 'New Year 2025',
    unixSeconds: '1735689600',
    note: 'Useful for sanity-checking calendar conversions across local time and UTC.',
  },
  {
    label: '1 Day Later',
    unixSeconds: '1735776000',
    note: 'A quick way to verify day boundaries and whether your workflow uses seconds or milliseconds.',
  },
]

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

  const currentLocal = formatDate(new Date(now * 1000))
  const currentUtc = formatUTC(new Date(now * 1000))
  const currentMilliseconds = String(now * 1000)

  const applyPreset = (preset: TimestampPreset) => {
    setUnit('seconds')
    setUnixInput(preset.unixSeconds)
  }

  const useCurrentTime = () => {
    const currentTimestamp = Math.floor(Date.now() / 1000)
    setNow(currentTimestamp)
    setUnit('seconds')
    setUnixInput(String(currentTimestamp))
  }

  const clearAll = () => {
    setUnixInput('')
    setDateInput('')
    setUnit('seconds')
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-[var(--color-text)]">Try a common timestamp:</span>
          {presets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => applyPreset(preset)}
              className="px-3 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-sm text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
            >
              {preset.label}
            </button>
          ))}
          <button
            onClick={useCurrentTime}
            className="px-3 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-sm text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
          >
            Use Current Time
          </button>
          <button
            onClick={clearAll}
            className="px-3 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-sm text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <h3 className="text-sm font-semibold text-[var(--color-text)]">API and log debugging</h3>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Convert raw event timestamps from logs, queue payloads, and exported datasets into readable dates.
          </p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <h3 className="text-sm font-semibold text-[var(--color-text)]">UTC and local comparison</h3>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Check both representations side by side so timezone assumptions are explicit before you debug the wrong issue.
          </p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <h3 className="text-sm font-semibold text-[var(--color-text)]">Seconds vs. milliseconds</h3>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Switch units quickly when a timestamp looks off by decades because one system uses seconds and another uses milliseconds.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm text-[var(--color-text-muted)] mb-1">Current Unix Timestamp ({unit})</p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-3xl font-mono font-bold text-[var(--color-text)]">{unit === 'milliseconds' ? now * 1000 : now}</span>
              <CopyButton text={String(unit === 'milliseconds' ? now * 1000 : now)} />
            </div>
          </div>
          <div className="flex gap-2">
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
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-3">
            <p className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">Local time</p>
            <div className="mt-1 flex items-center justify-between gap-2">
              <span className="text-sm font-mono text-[var(--color-text)]">{currentLocal}</span>
              <CopyButton text={currentLocal} />
            </div>
          </div>
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-3">
            <p className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">UTC time</p>
            <div className="mt-1 flex items-center justify-between gap-2">
              <span className="text-sm font-mono text-[var(--color-text)]">{currentUtc}</span>
              <CopyButton text={currentUtc} />
            </div>
          </div>
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-3">
            <p className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">Milliseconds</p>
            <div className="mt-1 flex items-center justify-between gap-2">
              <span className="text-sm font-mono text-[var(--color-text)]">{currentMilliseconds}</span>
              <CopyButton text={currentMilliseconds} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="font-semibold">Unix Timestamp → Date</h3>
          <input
            type="text"
            value={unixInput}
            onChange={(e) => setUnixInput(e.target.value)}
            placeholder={unit === 'seconds' ? 'e.g. 1735689600' : 'e.g. 1735689600000'}
            className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
          {presets.find((preset) => preset.unixSeconds === unixInput && unit === 'seconds') && (
            <p className="text-sm text-[var(--color-text-muted)]">
              {presets.find((preset) => preset.unixSeconds === unixInput)!.note}
            </p>
          )}
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

        <div className="space-y-3">
          <h3 className="font-semibold">Date → Unix Timestamp</h3>
          <input
            type="datetime-local"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <h3 className="text-sm font-semibold text-[var(--color-text)]">Backend events</h3>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Inspect timestamps from API responses, job runners, queues, and observability tools without switching context.
          </p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <h3 className="text-sm font-semibold text-[var(--color-text)]">Data cleanup</h3>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Normalize values before importing or exporting CSV files, JSON fixtures, or analytics reports.
          </p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <h3 className="text-sm font-semibold text-[var(--color-text)]">Human-readable handoff</h3>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Share UTC, local time, and ISO 8601 versions when you need a timestamp everyone on the team can interpret the same way.
          </p>
        </div>
      </div>
    </div>
  )
}
