import { useState, useMemo } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'

interface Match {
  index: number
  text: string
  groups: string[]
}

function getMatches(pattern: string, flags: string, testString: string): { matches: Match[]; error: string } {
  if (!pattern) return { matches: [], error: '' }
  try {
    const re = new RegExp(pattern, flags)
    const matches: Match[] = []
    const maxLen = 50000
    const safeString = testString.length > maxLen ? testString.slice(0, maxLen) : testString
    if (flags.includes('g')) {
      for (const m of safeString.matchAll(re)) {
        if (m.index !== undefined) {
          matches.push({ index: m.index, text: m[0], groups: m.slice(1) })
        }
      }
    } else {
      const m = safeString.match(re)
      if (m && m.index !== undefined) {
        matches.push({ index: m.index, text: m[0], groups: m.slice(1) })
      }
    }
    return { matches, error: '' }
  } catch (e) {
    return { matches: [], error: (e as Error).message }
  }
}

function highlightMatches(text: string, matches: Match[]): React.ReactNode[] {
  if (matches.length === 0) return [text]
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  for (let i = 0; i < matches.length; i++) {
    const m = matches[i]!
    if (m.index > lastIndex) {
      parts.push(text.slice(lastIndex, m.index))
    }
    parts.push(
      <mark key={i} className="rounded px-0.5" style={{ background: 'var(--color-warning-bg, #fef9c3)', color: 'var(--color-warning-text, #854d0e)' }}>
        {m.text}
      </mark>
    )
    lastIndex = m.index + m.text.length
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }
  return parts
}

export function RegexTester() {
  const [pattern, setPattern] = useState('')
  const [testString, setTestString] = useState('')
  const [flagG, setFlagG] = useState(true)
  const [flagI, setFlagI] = useState(false)
  const [flagM, setFlagM] = useState(false)
  const [flagS, setFlagS] = useState(false)

  const flags = `${flagG ? 'g' : ''}${flagI ? 'i' : ''}${flagM ? 'm' : ''}${flagS ? 's' : ''}`
  const { matches, error } = useMemo(() => getMatches(pattern, flags, testString), [pattern, flags, testString])
  const highlighted = useMemo(() => highlightMatches(testString, matches), [testString, matches])

  return (
    <div className="space-y-4">
      {/* Pattern input */}
      <div>
        <label className="block text-sm font-medium mb-1">Regular Expression</label>
        <div className="flex gap-2 items-center">
          <span className="text-lg text-[var(--color-text-muted)] font-mono">/</span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Enter regex pattern..."
            className="flex-1 p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
          <span className="text-lg text-[var(--color-text-muted)] font-mono">/{flags}</span>
        </div>
      </div>

      {/* Flags */}
      <div className="flex flex-wrap gap-3">
        {([
          ['g', 'Global', flagG, setFlagG],
          ['i', 'Case-insensitive', flagI, setFlagI],
          ['m', 'Multiline', flagM, setFlagM],
          ['s', 'Dotall', flagS, setFlagS],
        ] as const).map(([flag, label, value, setter]) => (
          <label key={flag} className="flex items-center gap-1.5 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={value as boolean}
              onChange={(e) => (setter as (v: boolean) => void)(e.target.checked)}
              className="rounded"
            />
            <code className="text-xs bg-[var(--color-surface-alt)] px-1 rounded">{flag}</code>
            <span className="text-[var(--color-text-muted)]">{label}</span>
          </label>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 rounded-lg text-sm" style={{ border: '1px solid var(--color-error-border)', background: 'var(--color-error-bg)', color: 'var(--color-error-text)' }}>
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Test string */}
        <div>
          <label className="block text-sm font-medium mb-1">Test String</label>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter text to test against..."
            className="w-full h-48 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        {/* Results */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium">
              Matches {matches.length > 0 && <span className="text-[var(--color-primary)]">({matches.length})</span>}
            </label>
          </div>
          {/* Highlighted preview */}
          <div className="w-full h-48 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] font-mono text-sm overflow-auto whitespace-pre-wrap">
            {testString ? highlighted : <span className="text-[var(--color-text-muted)]">Highlighted matches will appear here...</span>}
          </div>
        </div>
      </div>

      {/* Match details */}
      {matches.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Match Details</h3>
          <div className="max-h-48 overflow-auto space-y-1">
            {matches.map((m, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-sm">
                <span className="text-[var(--color-text-muted)] text-xs w-8">#{i + 1}</span>
                <span className="font-mono flex-1">&quot;{m.text}&quot;</span>
                <span className="text-[var(--color-text-muted)] text-xs">index {m.index}</span>
                <CopyButton text={m.text} />
                {m.groups.length > 0 && (
                  <span className="text-xs text-[var(--color-text-muted)]">
                    groups: {m.groups.map((g, j) => <code key={j} className="mx-0.5">{g}</code>)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
