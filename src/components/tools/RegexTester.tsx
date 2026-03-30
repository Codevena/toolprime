import { useState, useMemo } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'

interface Match {
  index: number
  text: string
  groups: string[]
}

interface RegexExample {
  label: string
  pattern: string
  testString: string
  flags: {
    g: boolean
    i: boolean
    m: boolean
    s: boolean
  }
  note: string
}

const examples: RegexExample[] = [
  {
    label: 'Emails',
    pattern: '[\\w.%+-]+@[\\w.-]+\\.[A-Za-z]{2,}',
    testString: 'Primary: alex@example.com\nBackup: team+alerts@toolprime.dev',
    flags: { g: true, i: true, m: false, s: false },
    note: 'Useful for scanning logs, forms, or CSV exports for email-like values.',
  },
  {
    label: 'Order IDs',
    pattern: 'ORD-(\\d{4})',
    testString: 'Processed ORD-1024 and ORD-2048.\nIgnore REF-9988.',
    flags: { g: true, i: false, m: false, s: false },
    note: 'Capture groups help isolate just the numeric part for downstream validation.',
  },
  {
    label: 'Multiline Headings',
    pattern: '^##\\s+(.+)$',
    testString: '# Title\n## Overview\nText block\n## Release Notes',
    flags: { g: true, i: false, m: true, s: false },
    note: 'The multiline flag changes how ^ and $ behave across each line.',
  },
  {
    label: 'Quoted Text',
    pattern: '"(.*?)"',
    testString: 'title="Regex Tester" aria-label="Copy output" data-state="ready"',
    flags: { g: true, i: false, m: false, s: false },
    note: 'A quick way to test non-greedy matching before using it in scraping or parsing rules.',
  },
]

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
  const hasInput = pattern.trim() || testString.trim()

  const applyExample = (example: RegexExample) => {
    setPattern(example.pattern)
    setTestString(example.testString)
    setFlagG(example.flags.g)
    setFlagI(example.flags.i)
    setFlagM(example.flags.m)
    setFlagS(example.flags.s)
  }

  const clearAll = () => {
    setPattern('')
    setTestString('')
    setFlagG(true)
    setFlagI(false)
    setFlagM(false)
    setFlagS(false)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-[var(--color-text)]">Start with a real pattern:</span>
          {examples.map((example) => (
            <button
              key={example.label}
              onClick={() => applyExample(example)}
              className="px-3 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-sm text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
            >
              {example.label}
            </button>
          ))}
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
          <h3 className="text-sm font-semibold text-[var(--color-text)]">Validation and extraction</h3>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Test patterns against sample payloads before using them in forms, ETL jobs, or app logic.
          </p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <h3 className="text-sm font-semibold text-[var(--color-text)]">Flag-aware debugging</h3>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Toggle global, case-insensitive, multiline, and dotall behavior to see exactly why a match succeeds or fails.
          </p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <h3 className="text-sm font-semibold text-[var(--color-text)]">Capture group inspection</h3>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Review extracted groups and start positions before you ship a parser, validator, or search rule.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <div>
          <label className="block text-sm font-medium mb-1">Regular Expression</label>
          <div className="flex gap-2 items-center">
            <span className="text-lg text-[var(--color-text-muted)] font-mono">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="e.g. ^https?:\\/\\/([^\\s/$.?#].[^\\s]*)$"
              className="flex-1 p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
            <span className="text-lg text-[var(--color-text-muted)] font-mono">/{flags}</span>
          </div>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Build and verify a pattern locally in the browser before copying it into application code, form rules, or search logic.
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          {([
            ['g', 'Global', flagG, setFlagG, 'Find all matches instead of stopping at the first one.'],
            ['i', 'Case-insensitive', flagI, setFlagI, 'Ignore letter case when matching text.'],
            ['m', 'Multiline', flagM, setFlagM, 'Treat each line as its own start and end boundary.'],
            ['s', 'Dotall', flagS, setFlagS, 'Let . match newline characters too.'],
          ] as const).map(([flag, label, value, setter, description]) => (
            <label key={flag} className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-3 py-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={value as boolean}
                onChange={(e) => (setter as (v: boolean) => void)(e.target.checked)}
                className="rounded"
              />
              <code className="text-xs bg-[var(--color-surface)] px-1.5 py-0.5 rounded">{flag}</code>
              <span className="font-medium text-[var(--color-text)]">{label}</span>
              <span className="text-[var(--color-text-muted)] hidden xl:inline">{description}</span>
            </label>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg text-sm" style={{ border: '1px solid var(--color-error-border)', background: 'var(--color-error-bg)', color: 'var(--color-error-text)' }}>
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Test String</label>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Paste sample text, logs, config values, or request payloads here..."
            className="w-full h-48 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Large inputs are safely trimmed for performance after 50,000 characters.
          </p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium">
              Matches {matches.length > 0 && <span className="text-[var(--color-primary)]">({matches.length})</span>}
            </label>
          </div>
          <div className="w-full h-48 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-output-bg)] font-mono text-sm overflow-auto whitespace-pre-wrap">
            {testString ? highlighted : <span className="text-[var(--color-text-muted)]">Highlighted matches will appear here...</span>}
          </div>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
              <p className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">Match count</p>
              <p className="mt-1 text-lg font-semibold text-[var(--color-text)]">{matches.length}</p>
            </div>
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
              <p className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">Active flags</p>
              <p className="mt-1 text-lg font-mono font-semibold text-[var(--color-text)]">{flags || '(none)'}</p>
            </div>
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
              <p className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">Pattern state</p>
              <p className="mt-1 text-sm font-medium text-[var(--color-text)]">
                {pattern.trim() ? (error ? 'Invalid regex' : 'Ready to test') : 'Add a pattern'}
              </p>
            </div>
          </div>
        </div>
      </div>

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

      {!matches.length && !error && hasInput && (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <h3 className="text-sm font-semibold text-[var(--color-text)]">No matches yet</h3>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Check whether the pattern needs a different flag, a broader character class, or line-aware anchors like <code>^</code> and <code>$</code>.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {examples.map((example) => (
          <button
            key={example.label}
            onClick={() => applyExample(example)}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-left hover:border-[var(--color-primary)] transition-colors"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-[var(--color-text)]">{example.label}</h3>
              <span className="text-xs font-mono text-[var(--color-text-muted)]">/{example.pattern}/</span>
            </div>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">{example.note}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
