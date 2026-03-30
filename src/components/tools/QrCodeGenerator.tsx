import { useState, useRef, useEffect } from 'react'
import QRCode from 'qrcode'

const SIZES = [256, 512, 1024] as const
type Size = typeof SIZES[number]

const presets = [
  { label: 'Website', value: 'https://toolprime.dev' },
  { label: 'WiFi', value: 'WIFI:T:WPA;S:MyWiFi;P:strongpassword123;;' },
  { label: 'Email', value: 'mailto:hello@example.com?subject=Quick%20question' },
  { label: 'Phone', value: 'tel:+491234567890' },
  { label: 'vCard', value: 'BEGIN:VCARD\nVERSION:3.0\nFN:Alex Example\nORG:ToolPrime\nTEL:+491234567890\nEMAIL:alex@example.com\nEND:VCARD' },
]

export function QrCodeGenerator() {
  const [text, setText] = useState('https://toolprime.dev')
  const [size, setSize] = useState<Size>(256)
  const [error, setError] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!text.trim()) {
      setError('')
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
      }
      return
    }

    QRCode.toCanvas(canvasRef.current!, text, {
      width: size,
      margin: 2,
      color: { dark: '#000000', light: '#ffffff' },
    }).then(() => {
      setError('')
    }).catch((err: Error) => {
      setError(err.message)
    })
  }, [text, size])

  const handleDownloadPng = () => {
    const canvas = canvasRef.current
    if (!canvas || !text.trim()) return
    const link = document.createElement('a')
    link.download = 'qrcode.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  const handleDownloadSvg = () => {
    if (!text.trim()) return
    QRCode.toString(text, { type: 'svg', width: size, margin: 2 })
      .then((svg: string) => {
        const blob = new Blob([svg], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.download = 'qrcode.svg'
        link.href = url
        link.click()
        URL.revokeObjectURL(url)
      })
      .catch(() => {/* ignore download errors */})
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-[var(--color-text)]">Popular presets:</span>
          {presets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => setText(preset.value)}
              className="px-3 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-sm text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Text or URL</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text or URL..."
          className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          Works for URLs, plain text, WiFi credentials, phone numbers, email links, and vCard contact info.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Size</label>
        <div className="flex gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                size === s
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-surface-alt)] border border-[var(--color-border)] hover:bg-[var(--color-border)]'
              }`}
            >
              {s}×{s}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg text-sm" style={{ border: '1px solid var(--color-error-border)', background: 'var(--color-error-bg)', color: 'var(--color-error-text)' }}>
          {error}
        </div>
      )}

      <div className="flex flex-col items-center gap-4">
        <div className="rounded-lg border border-[var(--color-border)] bg-white p-4 inline-block">
          <canvas
            ref={canvasRef}
            style={{ width: '256px', height: '256px', display: text.trim() ? 'block' : 'none' }}
          />
          {!text.trim() && (
            <div className="w-64 h-64 flex items-center justify-center text-[var(--color-text-muted)] text-sm">
              Enter text above to generate QR code
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <h3 className="text-sm font-semibold text-[var(--color-text)]">Print and signage</h3>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              Use larger sizes for posters, menus, flyers, packaging, or in-store materials where scan distance matters.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <h3 className="text-sm font-semibold text-[var(--color-text)]">Digital sharing</h3>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              PNG is convenient for websites and slides. SVG is better when you need sharp scaling for print or design tools.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <h3 className="text-sm font-semibold text-[var(--color-text)]">Testing</h3>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              Always test the final QR code with a phone camera before distributing it, especially for printed assets.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleDownloadPng}
            disabled={!text.trim() || !!error}
            className="px-6 py-2 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Download PNG
          </button>
          <button
            onClick={handleDownloadSvg}
            disabled={!text.trim() || !!error}
            className="px-6 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] font-medium hover:bg-[var(--color-border)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Download SVG
          </button>
        </div>
      </div>
    </div>
  )
}
