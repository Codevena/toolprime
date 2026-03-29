import { useState, useCallback, useRef, useEffect } from 'react'
import DOMPurify from 'dompurify'

const DEFAULT_MARKDOWN = `# My Document

This is a sample document. Edit the Markdown below and click **Download PDF** to export it.

## Section One

- Item A
- Item B
- Item C

## Section Two

> A well-formatted PDF starts with well-written Markdown.

| Name  | Role      |
|-------|-----------|
| Alice | Engineer  |
| Bob   | Designer  |
`

export function MarkdownToPdf() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN)
  const [renderedHtml, setRenderedHtml] = useState('')
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')
  const previewRef = useRef<HTMLDivElement>(null)
  const markedRef = useRef<typeof import('marked') | null>(null)

  const renderMarkdown = useCallback(async (text: string) => {
    if (!markedRef.current) {
      markedRef.current = await import('marked')
    }
    const rawHtml = await markedRef.current.marked.parse(text)
    setRenderedHtml(DOMPurify.sanitize(rawHtml))
    setLoading(false)
  }, [])

  useEffect(() => {
    renderMarkdown(markdown)
  }, [markdown, renderMarkdown])

  const handleDownload = async () => {
    if (!previewRef.current || !renderedHtml.trim()) return
    setGenerating(true)
    setError('')

    try {
      const html2pdfModule = await import('html2pdf.js')
      const html2pdf = html2pdfModule.default

      const container = document.createElement('div')
      container.innerHTML = DOMPurify.sanitize(renderedHtml)
      container.style.padding = '20px'
      container.style.fontFamily = 'system-ui, -apple-system, sans-serif'
      container.style.fontSize = '14px'
      container.style.lineHeight = '1.6'
      container.style.color = '#1a1a1a'

      await html2pdf()
        .set({
          margin: [10, 10, 10, 10],
          filename: 'document.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        })
        .from(container)
        .save()
    } catch (err) {
      console.error('PDF generation failed:', err)
      setError('Failed to generate PDF. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  const handleClear = () => {
    setMarkdown('')
    setRenderedHtml('')
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 items-center">
        <button
          onClick={handleDownload}
          disabled={generating || !renderedHtml.trim()}
          className="px-4 py-2 rounded-md text-sm font-medium text-white bg-[var(--color-primary)] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {generating ? 'Generating PDF...' : 'Download PDF'}
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-1.5 text-sm font-medium rounded-md border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors"
        >
          Clear
        </button>
      </div>

      {error && (
        <p className="text-sm" style={{ color: 'var(--color-error, #ef4444)' }}>
          {error}
        </p>
      )}

      {/* Editor + Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div>
          <label className="block text-sm font-medium mb-1 text-[var(--color-text)]">
            Markdown Input
          </label>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Type or paste your Markdown here..."
            className="w-full h-[32rem] p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            spellCheck={false}
          />
        </div>

        {/* Preview */}
        <div>
          <label className="block text-sm font-medium mb-1 text-[var(--color-text)]">
            PDF Preview
          </label>
          <div
            ref={previewRef}
            className="w-full h-[32rem] p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] overflow-auto prose prose-sm max-w-none dark:prose-invert"
            style={{ color: 'var(--color-text)' }}
          >
            {loading ? (
              <p className="text-[var(--color-text-muted)]">Loading preview...</p>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
