import { useState, useCallback, useRef, useEffect } from 'react'
import DOMPurify from 'dompurify'
import { CopyButton } from '@/components/ui/CopyButton'

const DEFAULT_MARKDOWN = `# Welcome to the Markdown Editor

Start typing your **Markdown** here and see it rendered in real time.

## Features

- **Bold**, *italic*, and ~~strikethrough~~ text
- [Links](https://example.com)
- Lists (ordered and unordered)
- Code blocks with syntax highlighting

### Code Example

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

> Blockquotes are supported too.

| Column 1 | Column 2 |
|-----------|----------|
| Cell A    | Cell B   |
`

export function MarkdownEditor() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN)
  const [renderedHtml, setRenderedHtml] = useState('')
  const [loading, setLoading] = useState(true)
  const markedRef = useRef<typeof import('marked') | null>(null)
  const hljsRef = useRef<typeof import('highlight.js') | null>(null)

  const renderMarkdown = useCallback(async (text: string) => {
    if (!markedRef.current) {
      const [markedMod, hljsMod, markedHighlightMod] = await Promise.all([
        import('marked'),
        import('highlight.js'),
        import('marked-highlight'),
      ])
      markedRef.current = markedMod
      hljsRef.current = hljsMod

      markedMod.marked.use(
        markedHighlightMod.markedHighlight({
          langPrefix: 'hljs language-',
          highlight(code: string, lang: string) {
            if (lang && hljsMod.default.getLanguage(lang)) {
              return hljsMod.default.highlight(code, { language: lang }).value
            }
            return hljsMod.default.highlightAuto(code).value
          },
        })
      )
    }

    const rawHtml = await markedRef.current.marked.parse(text)
    setRenderedHtml(DOMPurify.sanitize(rawHtml))
    setLoading(false)
  }, [])

  useEffect(() => {
    renderMarkdown(markdown)
  }, [markdown, renderMarkdown])

  const handleClear = () => {
    setMarkdown('')
    setRenderedHtml('')
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 items-center">
        <CopyButton text={renderedHtml} className="" />
        <span className="text-xs text-[var(--color-text-muted)]">HTML</span>
        <CopyButton text={markdown} className="" />
        <span className="text-xs text-[var(--color-text-muted)]">Markdown</span>
        <button
          onClick={handleClear}
          className="px-4 py-1.5 text-sm font-medium rounded-md border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Split Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Editor */}
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
            Preview
          </label>
          <div
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
