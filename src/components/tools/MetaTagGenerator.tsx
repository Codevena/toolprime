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

const presets = [
  {
    label: 'Blog Post',
    fields: {
      title: 'How to Improve Core Web Vitals for Ecommerce Pages',
      description: 'Practical strategies to improve LCP, CLS, and INP on ecommerce product and category pages.',
      keywords: 'core web vitals, ecommerce seo, lcp, cls, inp',
      author: 'ToolPrime',
      robots: 'index, follow',
      ogTitle: 'How to Improve Core Web Vitals for Ecommerce Pages',
      ogDescription: 'A practical guide to faster ecommerce pages and better rankings.',
      ogImage: 'https://example.com/images/core-web-vitals-guide.png',
      ogUrl: 'https://example.com/blog/core-web-vitals-ecommerce',
      twitterCard: 'summary_large_image',
    },
  },
  {
    label: 'Product Page',
    fields: {
      title: 'Noise-Cancelling Headphones - Free Shipping | Example Store',
      description: 'Shop wireless noise-cancelling headphones with fast shipping, clear sound, and all-day battery life.',
      keywords: 'noise cancelling headphones, wireless headphones, audio',
      author: 'Example Store',
      robots: 'index, follow',
      ogTitle: 'Noise-Cancelling Headphones - Free Shipping',
      ogDescription: 'Premium wireless headphones with long battery life and fast shipping.',
      ogImage: 'https://example.com/images/headphones-og.jpg',
      ogUrl: 'https://example.com/products/noise-cancelling-headphones',
      twitterCard: 'summary_large_image',
    },
  },
  {
    label: 'Landing Page',
    fields: {
      title: 'Free AI Workflow Templates for Marketing Teams | Example SaaS',
      description: 'Download ready-to-use AI workflow templates for campaigns, briefs, and reporting.',
      keywords: 'ai workflow templates, marketing templates, saas',
      author: 'Example SaaS',
      robots: 'index, follow',
      ogTitle: 'Free AI Workflow Templates for Marketing Teams',
      ogDescription: 'Ready-to-use templates for briefs, campaigns, and reporting workflows.',
      ogImage: 'https://example.com/images/ai-workflow-templates.png',
      ogUrl: 'https://example.com/ai-workflow-templates',
      twitterCard: 'summary_large_image',
    },
  },
]

function escapeAttr(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function generateHtml(fields: MetaFields): string {
  const lines: string[] = []

  if (fields.title) {
    lines.push(`<title>${escapeAttr(fields.title)}</title>`)
  }
  if (fields.description) {
    lines.push(`<meta name="description" content="${escapeAttr(fields.description)}" />`)
  }
  if (fields.keywords) {
    lines.push(`<meta name="keywords" content="${escapeAttr(fields.keywords)}" />`)
  }
  if (fields.author) {
    lines.push(`<meta name="author" content="${escapeAttr(fields.author)}" />`)
  }
  if (fields.robots) {
    lines.push(`<meta name="robots" content="${escapeAttr(fields.robots)}" />`)
  }

  // Open Graph
  const ogTitle = fields.ogTitle || fields.title
  const ogDesc = fields.ogDescription || fields.description
  if (ogTitle) {
    lines.push(`<meta property="og:title" content="${escapeAttr(ogTitle)}" />`)
  }
  if (ogDesc) {
    lines.push(`<meta property="og:description" content="${escapeAttr(ogDesc)}" />`)
  }
  if (fields.ogImage) {
    lines.push(`<meta property="og:image" content="${escapeAttr(fields.ogImage)}" />`)
  }
  if (fields.ogUrl) {
    lines.push(`<meta property="og:url" content="${escapeAttr(fields.ogUrl)}" />`)
  }
  lines.push(`<meta property="og:type" content="website" />`)

  // Twitter
  if (fields.twitterCard) {
    lines.push(`<meta name="twitter:card" content="${escapeAttr(fields.twitterCard)}" />`)
  }
  if (ogTitle) {
    lines.push(`<meta name="twitter:title" content="${escapeAttr(ogTitle)}" />`)
  }
  if (ogDesc) {
    lines.push(`<meta name="twitter:description" content="${escapeAttr(ogDesc)}" />`)
  }
  if (fields.ogImage) {
    lines.push(`<meta name="twitter:image" content="${escapeAttr(fields.ogImage)}" />`)
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

  const applyPreset = (presetFields: MetaFields) => {
    setFields(presetFields)
  }

  const clearAll = () => {
    setFields(defaultFields)
  }

  const html = useMemo(() => generateHtml(fields), [fields])

  const hasContent = fields.title || fields.description

  const inputClass =
    'w-full p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]'
  const labelClass = 'block text-sm font-medium text-[var(--color-text)] mb-1'

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-[var(--color-text)]">Start from a template:</span>
          {presets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => applyPreset(preset.fields)}
              className="px-3 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-sm text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
            >
              {preset.label}
            </button>
          ))}
          <button
            onClick={clearAll}
            className="px-3 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-sm text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <h3 className="text-sm font-semibold text-[var(--color-text)]">Search snippet</h3>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Keep titles concise and descriptions persuasive so the page earns clicks when it appears in search results.
          </p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <h3 className="text-sm font-semibold text-[var(--color-text)]">Social previews</h3>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Use Open Graph fields to control how links look when they are shared on Slack, LinkedIn, X, Facebook, and other apps.
          </p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <h3 className="text-sm font-semibold text-[var(--color-text)]">Implementation</h3>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Copy the generated tags into the page head, then test the final URL with a real preview validator before publishing.
          </p>
        </div>
      </div>
    </div>
  )
}
