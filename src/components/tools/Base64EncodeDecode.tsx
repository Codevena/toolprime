import { useState } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'

type Mode = 'encode' | 'decode'

function encodeBase64(text: string): string {
  const bytes = new TextEncoder().encode(text)
  let binary = ''
  bytes.forEach((b) => { binary += String.fromCharCode(b) })
  return btoa(binary)
}

function decodeBase64(text: string): { text: string; error: string } {
  try {
    const binary = atob(text.trim())
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    return { text: new TextDecoder().decode(bytes), error: '' }
  } catch {
    return { text: '', error: 'Invalid Base64 string' }
  }
}

export function Base64EncodeDecode() {
  const [mode, setMode] = useState<Mode>('encode')
  const [input, setInput] = useState('')

  const output = (() => {
    if (!input.trim()) return { text: '', error: '' }
    if (mode === 'encode') return { text: encodeBase64(input), error: '' }
    return decodeBase64(input)
  })()

  return (
    <div className="space-y-4">
      {/* Mode tabs */}
      <div className="flex gap-2">
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
            {m === 'encode' ? 'Encode → Base64' : 'Decode ← Base64'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            {mode === 'encode' ? 'Plain Text Input' : 'Base64 Input'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
            className="w-full h-48 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium">
              {mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}
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
              className="w-full h-48 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-output-bg)] text-[var(--color-text)] font-mono text-sm resize-y"
            />
          )}
        </div>
      </div>
    </div>
  )
}
