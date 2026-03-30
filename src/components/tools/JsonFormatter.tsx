import { useState } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'

type Tab = 'format' | 'minify' | 'validate'

const examples = [
  {
    label: 'API Response',
    value: '{"user":{"id":42,"name":"Alex","roles":["admin","editor"]},"meta":{"requestId":"req_123","success":true}}',
  },
  {
    label: 'Nested Config',
    value: '{"app":{"name":"ToolPrime","features":{"analytics":true,"beta":false},"theme":{"mode":"light","accent":"indigo"}},"env":"production"}',
  },
  {
    label: 'Array Data',
    value: '[{"id":1,"status":"open"},{"id":2,"status":"closed"},{"id":3,"status":"pending"}]',
  },
]

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

  const handleExample = (value: string) => {
    setInput(value)
    setOutput('')
    setError('')
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-[var(--color-text)]">Try an example:</span>
          {examples.map((example) => (
            <button
              key={example.label}
              onClick={() => handleExample(example.value)}
              className="px-3 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-sm text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
            >
              {example.label}
            </button>
          ))}
          <button
            onClick={handleClear}
            className="px-3 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-sm text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

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
            className="px-3 py-2 rounded-md text-sm border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
          </select>
        )}
        <button
          onClick={() => process(tab)}
          className="px-4 py-2 rounded-md text-sm font-medium border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-primary)] transition-colors"
        >
          Run Current Action
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"key": "value"}'
            className="w-full h-64 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium">Output</label>
            {output && !error && <CopyButton text={output} />}
          </div>
          {error ? (
            <div className="w-full h-64 p-4 rounded-lg overflow-auto" style={{ border: '1px solid var(--color-error-border)', background: 'var(--color-error-bg)', color: 'var(--color-error-text)' }}>
              <div className="text-sm font-semibold mb-2">Invalid JSON</div>
              <div className="font-mono text-sm">{error}</div>
              <p className="mt-3 text-sm">
                Common causes include trailing commas, missing double quotes around keys, unmatched brackets, or invalid escape characters.
              </p>
            </div>
          ) : (
            <textarea
              readOnly
              value={output}
              className="w-full h-64 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-output-bg)] font-mono text-sm resize-y"
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <h3 className="text-sm font-semibold text-[var(--color-text)]">Format for debugging</h3>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Beautify API responses and configuration files before you inspect fields, nesting, or unexpected values.
          </p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <h3 className="text-sm font-semibold text-[var(--color-text)]">Validate before shipping</h3>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Catch broken payloads early before they hit an app, webhook, import flow, or production config file.
          </p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <h3 className="text-sm font-semibold text-[var(--color-text)]">Minify for transport</h3>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Remove whitespace when you need a compact JSON string for fixtures, embedding, or transmission.
          </p>
        </div>
      </div>
    </div>
  )
}
