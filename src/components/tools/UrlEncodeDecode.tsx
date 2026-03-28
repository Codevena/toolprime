import { useState } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'

type Mode = 'encode' | 'decode'
type EncodeType = 'component' | 'uri'

function encode(text: string, type: EncodeType): string {
  return type === 'component' ? encodeURIComponent(text) : encodeURI(text)
}

function decode(text: string): { text: string; error: string } {
  try {
    return { text: decodeURIComponent(text.trim()), error: '' }
  } catch {
    return { text: '', error: 'Invalid URL-encoded string' }
  }
}

export function UrlEncodeDecode() {
  const [mode, setMode] = useState<Mode>('encode')
  const [encodeType, setEncodeType] = useState<EncodeType>('component')
  const [input, setInput] = useState('')

  const output = (() => {
    if (!input.trim()) return { text: '', error: '' }
    if (mode === 'encode') return { text: encode(input, encodeType), error: '' }
    return decode(input)
  })()

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(['encode', 'decode'] as const).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setInput('') }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === m
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-[var(--color-surface-alt)] border border-[var(--color-border)] hover:bg-[var(--color-border)]'
            }`}
          >
            {m === 'encode' ? 'Encode → URL' : 'Decode ← URL'}
          </button>
        ))}
        {mode === 'encode' && (
          <select
            value={encodeType}
            onChange={(e) => setEncodeType(e.target.value as EncodeType)}
            className="px-3 py-2 rounded-md text-sm border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          >
            <option value="component">encodeURIComponent</option>
            <option value="uri">encodeURI</option>
          </select>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            {mode === 'encode' ? 'Plain Text Input' : 'URL-Encoded Input'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter URL-encoded text to decode...'}
            className="w-full h-48 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium">
              {mode === 'encode' ? 'URL-Encoded Output' : 'Decoded Text'}
            </label>
            {output.text && !output.error && <CopyButton text={output.text} />}
          </div>
          {output.error ? (
            <div className="w-full h-48 p-4 rounded-lg font-mono text-sm overflow-auto" style={{ border: '1px solid var(--color-error-border)', background: 'var(--color-error-bg)', color: 'var(--color-error-text)' }}>
              {output.error}
            </div>
          ) : (
            <textarea
              readOnly
              value={output.text}
              placeholder="Output will appear here..."
              className="w-full h-48 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] font-mono text-sm resize-y"
            />
          )}
        </div>
      </div>
    </div>
  )
}
