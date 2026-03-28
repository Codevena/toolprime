import { useState, useRef, useCallback } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'

interface FaviconSize {
  size: number
  label: string
  blob: Blob | null
}

const SIZES = [
  { size: 16, label: '16x16 (favicon)' },
  { size: 32, label: '32x32 (favicon)' },
  { size: 48, label: '48x48 (favicon)' },
  { size: 64, label: '64x64' },
  { size: 128, label: '128x128' },
  { size: 180, label: '180x180 (apple-touch)' },
  { size: 192, label: '192x192 (android)' },
  { size: 512, label: '512x512 (android)' },
]

function resizeToBlob(img: HTMLImageElement, size: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(img, 0, 0, size, size)
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error('Failed to create blob'))
    }, 'image/png')
  })
}

const htmlSnippet = `<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png">`

export function FaviconGenerator() {
  const [favicons, setFavicons] = useState<FaviconSize[]>([])
  const [previewUrls, setPreviewUrls] = useState<Map<number, string>>(new Map())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const processImage = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }
    setLoading(true)
    setError('')

    // Revoke old URLs
    previewUrls.forEach((url) => URL.revokeObjectURL(url))

    const fileUrl = URL.createObjectURL(file)
    const createdBlobUrls: string[] = []
    try {
      const img = new Image()
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = () => reject(new Error('Failed to load image'))
        img.src = fileUrl
      })

      const results: FaviconSize[] = []
      const urls = new Map<number, string>()

      for (const { size, label } of SIZES) {
        const blob = await resizeToBlob(img, size)
        const blobUrl = URL.createObjectURL(blob)
        createdBlobUrls.push(blobUrl)
        results.push({ size, label, blob })
        urls.set(size, blobUrl)
      }

      URL.revokeObjectURL(fileUrl)
      setFavicons(results)
      setPreviewUrls(urls)
    } catch {
      URL.revokeObjectURL(fileUrl)
      createdBlobUrls.forEach(u => URL.revokeObjectURL(u))
      setError('Failed to process image')
    } finally {
      setLoading(false)
    }
  }, [previewUrls])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) processImage(file)
  }, [processImage])

  const downloadSingle = (favicon: FaviconSize) => {
    if (!favicon.blob) return
    const url = URL.createObjectURL(favicon.blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `favicon-${favicon.size}x${favicon.size}.png`
    a.click()
    URL.revokeObjectURL(url)
  }

  const downloadAll = async () => {
    const { default: JSZip } = await import('jszip')
    const zip = new JSZip()
    for (const f of favicons) {
      if (f.blob) {
        const name = f.size === 180
          ? 'apple-touch-icon.png'
          : f.size >= 192
            ? `android-chrome-${f.size}x${f.size}.png`
            : `favicon-${f.size}x${f.size}.png`
        zip.file(name, f.blob)
      }
    }
    const content = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(content)
    const a = document.createElement('a')
    a.href = url
    a.download = 'favicons.zip'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Upload zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
          dragging
            ? 'border-[var(--color-primary)] bg-[var(--color-surface-alt)]'
            : 'border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-surface-alt)]'
        }`}
      >
        <div className="text-4xl mb-2">🎨</div>
        <p className="font-medium">Drop an image here or click to browse</p>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">Square images work best (PNG, SVG, JPEG)</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) processImage(f) }}
        />
      </div>

      {error && (
        <div className="p-3 rounded-lg text-sm" style={{ border: '1px solid var(--color-error-border)', background: 'var(--color-error-bg)', color: 'var(--color-error-text)' }}>
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center py-4 text-[var(--color-text-muted)]">Generating favicons...</div>
      )}

      {favicons.length > 0 && !loading && (
        <>
          {/* Preview grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {favicons.map((f) => (
              <div
                key={f.size}
                className="flex flex-col items-center gap-2 p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)]"
              >
                <div className="w-16 h-16 flex items-center justify-center" style={{ imageRendering: f.size <= 32 ? 'pixelated' : 'auto' }}>
                  {previewUrls.get(f.size) && (
                    <img
                      src={previewUrls.get(f.size)}
                      alt={f.label}
                      style={{ width: Math.min(f.size, 64), height: Math.min(f.size, 64) }}
                    />
                  )}
                </div>
                <span className="text-xs text-[var(--color-text-muted)]">{f.label}</span>
                <button
                  onClick={() => downloadSingle(f)}
                  className="text-xs px-2 py-1 rounded border border-[var(--color-border)] hover:bg-[var(--color-border)] transition-colors"
                >
                  Download
                </button>
              </div>
            ))}
          </div>

          {/* Download all */}
          <button
            onClick={downloadAll}
            className="w-full py-3 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:opacity-90 transition-opacity"
          >
            Download All as ZIP
          </button>

          {/* HTML snippet */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium">HTML Link Tags</label>
              <CopyButton text={htmlSnippet} />
            </div>
            <pre className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] font-mono text-xs overflow-auto">
              {htmlSnippet}
            </pre>
          </div>
        </>
      )}
    </div>
  )
}
