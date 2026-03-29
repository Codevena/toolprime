import { useState, useRef, useCallback } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'
import { Upload, FileImage } from 'lucide-react'

interface FileData {
  name: string
  type: string
  size: number
  dataUri: string
  rawBase64: string
  previewUrl: string
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('Failed to read file'))
      }
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

export function ImageToBase64() {
  const [fileData, setFileData] = useState<FileData | null>(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const processFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (PNG, JPG, GIF, SVG, WebP, etc.)')
      return
    }

    setError('')
    try {
      const dataUri = await readFileAsDataUrl(file)
      const commaIndex = dataUri.indexOf(',')
      const rawBase64 = commaIndex >= 0 ? dataUri.slice(commaIndex + 1) : dataUri

      setFileData((prev) => {
        if (prev?.previewUrl) URL.revokeObjectURL(prev.previewUrl)
        return {
          name: file.name,
          type: file.type,
          size: file.size,
          dataUri,
          rawBase64,
          previewUrl: URL.createObjectURL(file),
        }
      })
    } catch {
      setError('Failed to read the image file')
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) processFile(file)
    },
    [processFile],
  )

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
  }, [])

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) processFile(file)
    },
    [processFile],
  )

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={`flex flex-col items-center justify-center gap-3 p-8 rounded-lg border-2 border-dashed cursor-pointer transition-colors ${
          dragging
            ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
            : 'border-[var(--color-border)] hover:border-[var(--color-primary)] bg-[var(--color-surface-alt)]'
        }`}
      >
        <Upload size={32} className="text-[var(--color-text-muted)]" />
        <p className="text-sm text-[var(--color-text-muted)]">
          <span className="font-medium text-[var(--color-text)]">Click to upload</span> or drag and drop an image
        </p>
        <p className="text-xs text-[var(--color-text-muted)]">PNG, JPG, GIF, SVG, WebP</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
      </div>

      {error && (
        <div
          className="p-3 rounded-lg text-sm"
          style={{
            border: '1px solid var(--color-error-border)',
            background: 'var(--color-error-bg)',
            color: 'var(--color-error-text)',
          }}
        >
          {error}
        </div>
      )}

      {fileData && (
        <>
          {/* Preview & file info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-center p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)]">
              <img
                src={fileData.previewUrl}
                alt={`Preview of ${fileData.name}`}
                className="max-h-48 max-w-full rounded object-contain"
              />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-[var(--color-text)]">
                <FileImage size={16} className="text-[var(--color-text-muted)]" />
                <span className="font-medium">File Info</span>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5">
                <span className="text-[var(--color-text-muted)]">Name:</span>
                <span className="text-[var(--color-text)] font-mono truncate">{fileData.name}</span>
                <span className="text-[var(--color-text-muted)]">Type:</span>
                <span className="text-[var(--color-text)] font-mono">{fileData.type}</span>
                <span className="text-[var(--color-text-muted)]">Size:</span>
                <span className="text-[var(--color-text)] font-mono">{formatBytes(fileData.size)}</span>
                <span className="text-[var(--color-text-muted)]">Base64 length:</span>
                <span className="text-[var(--color-text)] font-mono">{fileData.rawBase64.length.toLocaleString()} chars</span>
              </div>
            </div>
          </div>

          {/* Data URI output */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-[var(--color-text)]">Data URI</label>
              <CopyButton text={fileData.dataUri} />
            </div>
            <textarea
              readOnly
              value={fileData.dataUri}
              className="w-full h-32 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] font-mono text-xs resize-y focus:outline-none"
            />
          </div>

          {/* Raw Base64 output */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-[var(--color-text)]">Raw Base64 String</label>
              <CopyButton text={fileData.rawBase64} />
            </div>
            <textarea
              readOnly
              value={fileData.rawBase64}
              className="w-full h-32 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] font-mono text-xs resize-y focus:outline-none"
            />
          </div>
        </>
      )}
    </div>
  )
}
