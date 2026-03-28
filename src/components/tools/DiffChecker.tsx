import { useState, useMemo } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'
import { diffLines, diffWords, type Change } from 'diff'

type DiffMode = 'lines' | 'words'

function renderUnifiedDiff(changes: Change[]): React.ReactNode[] {
  return changes.map((part, i) => {
    let className = ''
    if (part.added) className = 'rounded px-0.5'
    else if (part.removed) className = 'rounded px-0.5 line-through'

    const style: React.CSSProperties = part.added
      ? { background: 'var(--color-success-bg, #dcfce7)', color: 'var(--color-success-text, #166534)' }
      : part.removed
        ? { background: 'var(--color-error-bg, #fef2f2)', color: 'var(--color-error-text, #991b1b)' }
        : {}

    return (
      <span key={i} className={className} style={style}>
        {part.value}
      </span>
    )
  })
}

function diffToText(changes: Change[]): string {
  return changes.map((part) => {
    const prefix = part.added ? '+ ' : part.removed ? '- ' : '  '
    return part.value
      .split('\n')
      .filter((line, idx, arr) => idx < arr.length - 1 || line !== '')
      .map((line) => prefix + line)
      .join('\n')
  }).join('\n')
}

export function DiffChecker() {
  const [original, setOriginal] = useState('')
  const [modified, setModified] = useState('')
  const [mode, setMode] = useState<DiffMode>('lines')

  const changes = useMemo(() => {
    if (!original && !modified) return []
    return mode === 'lines' ? diffLines(original, modified) : diffWords(original, modified)
  }, [original, modified, mode])

  const stats = useMemo(() => {
    let added = 0, removed = 0
    for (const c of changes) {
      if (c.added) added += (c.count ?? 0)
      else if (c.removed) removed += (c.count ?? 0)
    }
    return { added, removed }
  }, [changes])

  const diffText = useMemo(() => diffToText(changes), [changes])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        {(['lines', 'words'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === m
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-[var(--color-surface-alt)] border border-[var(--color-border)] hover:bg-[var(--color-border)]'
            }`}
          >
            {m === 'lines' ? 'Line Diff' : 'Word Diff'}
          </button>
        ))}
        {changes.length > 0 && (
          <span className="text-sm text-[var(--color-text-muted)] ml-2">
            <span style={{ color: 'var(--color-success-text, #166534)' }}>+{stats.added}</span>{' / '}
            <span style={{ color: 'var(--color-error-text, #991b1b)' }}>-{stats.removed}</span>
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Original</label>
          <textarea
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder="Paste original text..."
            className="w-full h-48 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Modified</label>
          <textarea
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            placeholder="Paste modified text..."
            className="w-full h-48 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>
      </div>

      {/* Diff output */}
      {changes.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium">Diff Result</label>
            <CopyButton text={diffText} />
          </div>
          <div className="w-full min-h-[12rem] max-h-96 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-output-bg)] font-mono text-sm overflow-auto whitespace-pre-wrap">
            {renderUnifiedDiff(changes)}
          </div>
        </div>
      )}
    </div>
  )
}
