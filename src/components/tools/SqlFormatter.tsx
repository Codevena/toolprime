import { useState } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'
import { format } from 'sql-formatter'

type Dialect = 'sql' | 'mysql' | 'postgresql' | 'transactsql' | 'plsql'

const dialects: { value: Dialect; label: string }[] = [
  { value: 'sql', label: 'Standard SQL' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'postgresql', label: 'PostgreSQL' },
  { value: 'transactsql', label: 'T-SQL' },
  { value: 'plsql', label: 'PL/SQL' },
]

export function SqlFormatter() {
  const [input, setInput] = useState('')
  const [dialect, setDialect] = useState<Dialect>('sql')
  const [indent, setIndent] = useState(2)
  const [uppercase, setUppercase] = useState(true)

  const output = (() => {
    if (!input.trim()) return { text: '', error: '' }
    try {
      const formatted = format(input, {
        language: dialect,
        tabWidth: indent,
        keywordCase: uppercase ? 'upper' : 'preserve',
      })
      return { text: formatted, error: '' }
    } catch {
      return { text: '', error: 'Could not format SQL. Check your syntax.' }
    }
  })()

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        <select
          aria-label="SQL dialect"
          value={dialect}
          onChange={(e) => setDialect(e.target.value as Dialect)}
          className="px-3 py-2 rounded-md text-sm border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        >
          {dialects.map((d) => (
            <option key={d.value} value={d.value}>{d.label}</option>
          ))}
        </select>
        <select
          aria-label="Indentation size"
          value={indent}
          onChange={(e) => setIndent(Number(e.target.value))}
          className="px-3 py-2 rounded-md text-sm border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        >
          <option value={2}>2 spaces</option>
          <option value={4}>4 spaces</option>
        </select>
        <label className="flex items-center gap-1.5 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
            className="rounded"
          />
          <span>Uppercase keywords</span>
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">SQL Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your SQL query here..."
            className="w-full h-64 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium">Formatted SQL</label>
            {output.text && !output.error && <CopyButton text={output.text} />}
          </div>
          {output.error ? (
            <div className="w-full h-64 p-4 rounded-lg font-mono text-sm overflow-auto" style={{ border: '1px solid var(--color-error-border)', background: 'var(--color-error-bg)', color: 'var(--color-error-text)' }}>
              {output.error}
            </div>
          ) : (
            <textarea
              readOnly
              value={output.text}
              placeholder="Formatted SQL will appear here..."
              className="w-full h-64 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-output-bg)] text-[var(--color-text)] font-mono text-sm resize-y"
            />
          )}
        </div>
      </div>
    </div>
  )
}
