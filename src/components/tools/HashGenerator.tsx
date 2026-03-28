import { useState, useEffect } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'
import { md5 } from 'js-md5'

async function sha(algorithm: string, text: string): Promise<string> {
  const data = new TextEncoder().encode(text)
  const hash = await crypto.subtle.digest(algorithm, data)
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('')
}

interface Hashes {
  md5: string
  sha1: string
  sha256: string
  sha512: string
}

export function HashGenerator() {
  const [input, setInput] = useState('')
  const [hashes, setHashes] = useState<Hashes | null>(null)

  useEffect(() => {
    if (!input) {
      setHashes(null)
      return
    }

    let cancelled = false
    async function compute() {
      const [s1, s256, s512] = await Promise.all([
        sha('SHA-1', input),
        sha('SHA-256', input),
        sha('SHA-512', input),
      ])
      if (!cancelled) {
        setHashes({ md5: md5(input), sha1: s1, sha256: s256, sha512: s512 })
      }
    }
    compute()
    return () => { cancelled = true }
  }, [input])

  const algorithms = [
    { label: 'MD5', value: hashes?.md5 },
    { label: 'SHA-1', value: hashes?.sha1 },
    { label: 'SHA-256', value: hashes?.sha256 },
    { label: 'SHA-512', value: hashes?.sha512 },
  ]

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Input Text</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
          className="w-full h-36 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {algorithms.map(({ label, value }) => (
          <div key={label} className="p-3 rounded-lg bg-[var(--color-output-bg)] border border-[var(--color-border)]">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">{label}</span>
              {value && <CopyButton text={value} />}
            </div>
            <p className="font-mono text-xs break-all text-[var(--color-text-muted)]">
              {value || 'Hash will appear here...'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
