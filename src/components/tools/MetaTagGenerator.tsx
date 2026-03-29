import { useState, useMemo } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'

interface MetaFields {
  title: string
  description: string
  keywords: string
  author: string
  robots: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  ogUrl: string
  twitterCard: string
}

const defaultFields: MetaFields = {
  title: '',
  description: '',
  keywords: '',
  author: '',
  robots: 'index, follow',
  ogTitle: '',
  ogDescription: '',
  ogImage: '',
  ogUrl: '',
  twitterCard: 'summary_large_image',
}

const robotsOptions = [
  'index, follow',
  'noindex, follow',
  'index, nofollow',
  'noindex, nofollow',
]

const twitterCardOptions = [
  'summary',
  'summary_large_image',
  'app',
  'player',
]

function generateHtml(fields: MetaFields): string {
  const lines: string[] = []

  if (fields.title) {
    lines.push(`<title>${fields.title}</title>`)
  }
  if (fields.description) {
    lines.push(`<meta name="description" content="${fields.description}" />`)
  }
  if (fields.keywords) {
    lines.push(`<meta name="keywords" content="${fields.keywords}" />`)
  }
  if (fields.author) {
    lines.push(`<meta name="author" content="${fields.author}" />`)
  }
  if (fields.robots) {
    lines.push(`<meta name="robots" content="${fields.robots}" />`)
  }

  // Open Graph
  const ogTitle = fields.ogTitle || fields.title
  const ogDesc = fields.ogDescription || fields.description
  if (ogTitle) {
    lines.push(`<meta property="og:title" content="${ogTitle}" />`)
  }
  if (ogDesc) {
    lines.push(`<meta property="og:description" content="${ogDesc}" />`)
  }
  if (fields.ogImage) {
    lines.push(`<meta property="og:image" content="${fields.ogImage}" />`)
  }
  if (fields.ogUrl) {
    lines.push(`<meta property="og:url" content="${fields.ogUrl}" />`)
  }
  lines.push(`<meta property="og:type" content="website" />`)

  // Twitter
  if (fields.twitterCard) {
    lines.push(`<meta name="twitter:card" content="${fields.twitterCard}" />`)
  }
  if (ogTitle) {
    lines.push(`<meta name="twitter:title" content="${ogTitle}" />`)
  }
  if (ogDesc) {
    lines.push(`<meta name="twitter:description" content="${ogDesc}" />`)
  }
  if (fields.ogImage) {
    lines.push(`<meta name="twitter:image" content="${fields.ogImage}" />`)
  }

  return lines.join('\n')
}

function SerpPreview({ fields }: { fields: MetaFields }) {
  const displayTitle = fields.title || 'Page Title'
  const displayDesc = fields.description || 'Meta description will appear here. Write a compelling description under 160 characters.'
  const displayUrl = fields.ogUrl || 'https://example.com/page'

  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4">
      <p className="text-xs text-[var(--color-text-muted)] mb-2 font-medium uppercase tracking-wide">Google SERP Preview</p>
      <div className="space-y-0.5">
        <p className="text-sm text-[var(--color-text-muted)] truncate">{displayUrl}</p>
        <p className="text-lg font-medium" style={{ color: '#1a0dab' }}>
          {displayTitle.length > 60 ? displayTitle.slice(0, 60) + '...' : displayTitle}
        </p>
        <p className="text-sm text-[var(--color-text-muted)] line-clamp-2">
          {displayDesc.length > 160 ? displayDesc.slice(0, 160) + '...' : displayDesc}
        </p>
      </div>
    </div>
  )
}

export function MetaTagGenerator() {
  const [fields, setFields] = useState<MetaFields>(defaultFields)

  const update = (key: keyof MetaFields, value: string) => {
    setFields(prev => ({ ...prev, [key]: value }))
  }

  const html = useMemo(() => generateHtml(fields), [fields])

  const hasContent = fields.title || fields.description

  const inputClass =
    'w-full p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]'
  const labelClass = 'block text-sm font-medium text-[var(--color-text)] mb-1'

  return (
    <div className="space-y-6">
      {/* SERP Preview */}
      <SerpPreview fields={fields} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">Basic Meta Tags</h3>

          <div>
            <label className={labelClass}>
              Title <span className="text-[var(--color-text-muted)] font-normal">({fields.title.length}/60)</span>
            </label>
            <input
              type="text"
              value={fields.title}
              onChange={e => update('title', e.target.value)}
              placeholder="My Awesome Page"
              className={inputClass}
            />
            {fields.title.length > 60 && (
              <p className="text-xs mt-1" style={{ color: 'var(--color-error-text, #ef4444)' }}>Title exceeds 60 characters and may be truncated in search results.</p>
            )}
          </div>

          <div>
            <label className={labelClass}>
              Description <span className="text-[var(--color-text-muted)] font-normal">({fields.description.length}/160)</span>
            </label>
            <textarea
              value={fields.description}
              onChange={e => update('description', e.target.value)}
              placeholder="A brief description of your page content..."
              rows={3}
              className={inputClass + ' resize-y'}
            />
            {fields.description.length > 160 && (
              <p className="text-xs mt-1" style={{ color: 'var(--color-error-text, #ef4444)' }}>Description exceeds 160 characters and may be truncated.</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Keywords</label>
            <input
              type="text"
              value={fields.keywords}
              onChange={e => update('keywords', e.target.value)}
              placeholder="seo, meta tags, web development"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Author</label>
            <input
              type="text"
              value={fields.author}
              onChange={e => update('author', e.target.value)}
              placeholder="John Doe"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Robots</label>
            <select
              value={fields.robots}
              onChange={e => update('robots', e.target.value)}
              className={inputClass}
            >
              {robotsOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Social / OG */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">Open Graph & Twitter</h3>

          <div>
            <label className={labelClass}>og:title <span className="text-[var(--color-text-muted)] font-normal">(falls back to title)</span></label>
            <input
              type="text"
              value={fields.ogTitle}
              onChange={e => update('ogTitle', e.target.value)}
              placeholder={fields.title || 'Same as title'}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>og:description <span className="text-[var(--color-text-muted)] font-normal">(falls back to description)</span></label>
            <textarea
              value={fields.ogDescription}
              onChange={e => update('ogDescription', e.target.value)}
              placeholder={fields.description || 'Same as description'}
              rows={3}
              className={inputClass + ' resize-y'}
            />
          </div>

          <div>
            <label className={labelClass}>og:image</label>
            <input
              type="url"
              value={fields.ogImage}
              onChange={e => update('ogImage', e.target.value)}
              placeholder="https://example.com/image.png"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>og:url</label>
            <input
              type="url"
              value={fields.ogUrl}
              onChange={e => update('ogUrl', e.target.value)}
              placeholder="https://example.com/page"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>twitter:card</label>
            <select
              value={fields.twitterCard}
              onChange={e => update('twitterCard', e.target.value)}
              className={inputClass}
            >
              {twitterCardOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Generated HTML */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">Generated HTML</h3>
          {hasContent && <CopyButton text={html} />}
        </div>
        <pre className="w-full p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] font-mono text-sm overflow-x-auto whitespace-pre-wrap">
          {html || '<!-- Fill in the fields above to generate meta tags -->'}
        </pre>
      </div>
    </div>
  )
}
