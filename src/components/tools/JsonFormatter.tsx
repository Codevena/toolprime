import { useState } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'

type Tab = 'format' | 'minify' | 'validate'

export function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [tab, setTab] = useState<Tab>('format')
  const [indent, setIndent] = useState(2)

  const process = (action: Tab) => {
    setTab(action)
    setError('')
    if (!input.trim()) {
      setOutput('')
      return
    }
    try {
      const parsed = JSON.parse(input)
      if (action === 'format') {
        setOutput(JSON.stringify(parsed, null, indent))
      } else if (action === 'minify') {
        setOutput(JSON.stringify(parsed))
      } else {
        setOutput('✓ Valid JSON')
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Invalid JSON'
      setError(msg)
      setOutput('')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(['format', 'minify', 'validate'] as const).map((action) => (
          <button
            key={action}
            onClick={() => process(action)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              tab === action
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-[var(--color-surface-alt)] border border-[var(--color-border)] hover:bg-[var(--color-border)]'
            }`}
          >
            {action.charAt(0).toUpperCase() + action.slice(1)}
          </button>
        ))}
        {tab === 'format' && (
          <select
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value))}
            className="px-3 py-2 rounded-md text-sm border border-[var(--color-border)] bg-[var(--color-surface)]"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
          </select>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"key": "value"}'
            className="w-full h-64 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium">Output</label>
            {output && !error && <CopyButton text={output} />}
          </div>
          {error ? (
            <div className="w-full h-64 p-4 rounded-lg border border-red-300 bg-red-50 text-red-700 font-mono text-sm overflow-auto">
              {error}
            </div>
          ) : (
            <textarea
              readOnly
              value={output}
              className="w-full h-64 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] font-mono text-sm resize-y"
            />
          )}
        </div>
      </div>
    </div>
  )
}
