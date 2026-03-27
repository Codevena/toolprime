import { useState, useRef, useCallback } from 'react'
import imageCompression from 'browser-image-compression'

interface FileInfo {
  name: string
  originalSize: number
  compressedSize: number | null
  originalUrl: string
  compressedUrl: string | null
  compressedBlob: Blob | null
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function ImageCompressor() {
  const [quality, setQuality] = useState(80)
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const compress = useCallback(async (file: File, q: number) => {
    setLoading(true)
    setError('')
    try {
      const options = {
        maxSizeMB: 100,
        useWebWorker: true,
        initialQuality: q / 100,
        alwaysKeepResolution: true,
      }
      const compressed = await imageCompression(file, options)
      const compressedUrl = URL.createObjectURL(compressed)
      setFileInfo((prev) => {
        if (prev?.compressedUrl) URL.revokeObjectURL(prev.compressedUrl)
        return {
          name: file.name,
          originalSize: file.size,
          compressedSize: compressed.size,
          originalUrl: prev?.originalUrl ?? URL.createObjectURL(file),
          compressedUrl,
          compressedBlob: compressed,
        }
      })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Compression failed')
    } finally {
      setLoading(false)
    }
  }, [])

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPEG, PNG, WebP, etc.)')
      return
    }
    // Revoke the previous originalUrl to avoid memory leaks
    setFileInfo((prev) => {
      if (prev?.originalUrl) URL.revokeObjectURL(prev.originalUrl)
      if (prev?.compressedUrl) URL.revokeObjectURL(prev.compressedUrl)
      return {
        name: file.name,
        originalSize: file.size,
        compressedSize: null,
        originalUrl: URL.createObjectURL(file),
        compressedUrl: null,
        compressedBlob: null,
      }
    })
    compress(file, quality)
  }, [compress, quality])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const handleDownload = () => {
    if (!fileInfo?.compressedBlob) return
    const url = URL.createObjectURL(fileInfo.compressedBlob)
    const link = document.createElement('a')
    link.download = `compressed-${fileInfo.name}`
    link.href = url
    link.click()
    URL.revokeObjectURL(url)
  }

  const savings = fileInfo?.compressedSize != null
    ? Math.round((1 - fileInfo.compressedSize / fileInfo.originalSize) * 100)
    : null

  return (
    <div className="space-y-6">
      {/* Drop zone */}
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
        <div className="text-4xl mb-2">🖼️</div>
        <p className="font-medium">Drop an image here or click to browse</p>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">JPEG, PNG, WebP supported</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
        />
      </div>

      {/* Quality slider */}
      <div>
        <div className="flex justify-between text-sm mb-2">
          <label className="font-medium">Quality</label>
          <span className="font-mono font-bold text-[var(--color-primary)]">{quality}%</span>
        </div>
        <input
          type="range"
          min={1}
          max={100}
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
          className="w-full accent-[var(--color-primary)]"
        />
        <div className="flex justify-between text-xs text-[var(--color-text-muted)] mt-1">
          <span>1% (smallest)</span>
          <span>100% (best quality)</span>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg text-sm" style={{ border: '1px solid var(--color-error-border)', background: 'var(--color-error-bg)', color: 'var(--color-error-text)' }}>
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center py-4 text-[var(--color-text-muted)]">
          Compressing…
        </div>
      )}

      {fileInfo && !loading && (
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{formatBytes(fileInfo.originalSize)}</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-1">Original size</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: 'var(--color-success)' }}>
                {fileInfo.compressedSize != null ? formatBytes(fileInfo.compressedSize) : '—'}
              </div>
              <div className="text-xs text-[var(--color-text-muted)] mt-1">Compressed size</div>
            </div>
          </div>

          {savings != null && (
            <div className="text-center text-sm font-medium rounded-lg py-2" style={{ color: 'var(--color-success-text)', background: 'var(--color-success-bg)' }}>
              {savings > 0 ? `${savings}% smaller` : 'No size reduction at this quality'}
            </div>
          )}

          <button
            onClick={handleDownload}
            disabled={!fileInfo.compressedBlob}
            className="w-full py-2 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Download Compressed Image
          </button>
        </div>
      )}
    </div>
  )
}
