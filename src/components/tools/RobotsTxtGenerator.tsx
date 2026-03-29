import { useState, useMemo, useCallback } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'

interface UserAgentRule {
  id: string
  agent: string
  disallow: string[]
  allow: string[]
}

const commonAgents = [
  'Googlebot',
  'Bingbot',
  'Slurp',
  'DuckDuckBot',
  'Baiduspider',
  'YandexBot',
  'facebot',
  'ia_archiver',
  'GPTBot',
  'CCBot',
]

const commonPaths = [
  '/admin/',
  '/private/',
  '/api/',
  '/cgi-bin/',
  '/tmp/',
  '/wp-admin/',
  '/wp-login.php',
  '/search',
  '/*.pdf$',
  '/*.json$',
]

let nextId = 1
function createId(): string {
  return `rule-${nextId++}`
}

function generateRobotsTxt(
  rules: UserAgentRule[],
  sitemapUrl: string,
  crawlDelay: string,
): string {
  const lines: string[] = []

  for (const rule of rules) {
    lines.push(`User-agent: ${rule.agent}`)
    if (crawlDelay && parseInt(crawlDelay, 10) > 0) {
      lines.push(`Crawl-delay: ${crawlDelay}`)
    }
    for (const d of rule.disallow) {
      lines.push(`Disallow: ${d}`)
    }
    for (const a of rule.allow) {
      lines.push(`Allow: ${a}`)
    }
    lines.push('')
  }

  if (sitemapUrl.trim()) {
    lines.push(`Sitemap: ${sitemapUrl.trim()}`)
    lines.push('')
  }

  return lines.join('\n').trim()
}

export function RobotsTxtGenerator() {
  const [rules, setRules] = useState<UserAgentRule[]>([
    { id: createId(), agent: '*', disallow: [], allow: [] },
  ])
  const [sitemapUrl, setSitemapUrl] = useState('')
  const [crawlDelay, setCrawlDelay] = useState('')

  const output = useMemo(
    () => generateRobotsTxt(rules, sitemapUrl, crawlDelay),
    [rules, sitemapUrl, crawlDelay],
  )

  const addRule = useCallback(() => {
    setRules(prev => [...prev, { id: createId(), agent: '*', disallow: [], allow: [] }])
  }, [])

  const removeRule = useCallback((id: string) => {
    setRules(prev => prev.filter(r => r.id !== id))
  }, [])

  const updateAgent = useCallback((id: string, agent: string) => {
    setRules(prev => prev.map(r => (r.id === id ? { ...r, agent } : r)))
  }, [])

  const togglePath = useCallback(
    (ruleId: string, type: 'disallow' | 'allow', path: string) => {
      setRules(prev =>
        prev.map(r => {
          if (r.id !== ruleId) return r
          const list = r[type]
          const next = list.includes(path)
            ? list.filter(p => p !== path)
            : [...list, path]
          return { ...r, [type]: next }
        }),
      )
    },
    [],
  )

  const addCustomPath = useCallback(
    (ruleId: string, type: 'disallow' | 'allow', path: string) => {
      if (!path.trim()) return
      setRules(prev =>
        prev.map(r => {
          if (r.id !== ruleId) return r
          const list = r[type]
          if (list.includes(path.trim())) return r
          return { ...r, [type]: [...list, path.trim()] }
        }),
      )
    },
    [],
  )

  const handleDownload = useCallback(() => {
    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'robots.txt'
    a.click()
    URL.revokeObjectURL(url)
  }, [output])

  const inputClass =
    'w-full p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]'
  const labelClass = 'block text-sm font-medium text-[var(--color-text)] mb-1'
  const btnClass =
    'px-3 py-1.5 text-sm font-medium rounded-md border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-alt)] transition-colors'

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration */}
        <div className="space-y-5">
          {rules.map((rule, idx) => (
            <div
              key={rule.id}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[var(--color-text)]">
                  Rule {idx + 1}
                </span>
                {rules.length > 1 && (
                  <button
                    onClick={() => removeRule(rule.id)}
                    className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div>
                <label className={labelClass}>User-agent</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  <button
                    onClick={() => updateAgent(rule.id, '*')}
                    className={`text-xs px-2 py-1 rounded-md border transition-colors ${
                      rule.agent === '*'
                        ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                        : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface)]'
                    }`}
                  >
                    * (All)
                  </button>
                  {commonAgents.map(agent => (
                    <button
                      key={agent}
                      onClick={() => updateAgent(rule.id, agent)}
                      className={`text-xs px-2 py-1 rounded-md border transition-colors ${
                        rule.agent === agent
                          ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                          : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface)]'
                      }`}
                    >
                      {agent}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={rule.agent}
                  onChange={e => updateAgent(rule.id, e.target.value)}
                  placeholder="Custom user-agent..."
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Disallow Paths</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {commonPaths.map(path => (
                    <button
                      key={path}
                      onClick={() => togglePath(rule.id, 'disallow', path)}
                      className={`text-xs px-2 py-1 rounded-md border font-mono transition-colors ${
                        rule.disallow.includes(path)
                          ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                          : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface)]'
                      }`}
                    >
                      {path}
                    </button>
                  ))}
                </div>
                <CustomPathInput
                  onAdd={path => addCustomPath(rule.id, 'disallow', path)}
                  placeholder="/custom-path/"
                />
              </div>

              <div>
                <label className={labelClass}>Allow Paths</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {rule.disallow.length > 0 && (
                    <p className="text-xs text-[var(--color-text-muted)] w-full mb-1">
                      Add exceptions for disallowed paths:
                    </p>
                  )}
                  {['/'].map(path => (
                    <button
                      key={path}
                      onClick={() => togglePath(rule.id, 'allow', path)}
                      className={`text-xs px-2 py-1 rounded-md border font-mono transition-colors ${
                        rule.allow.includes(path)
                          ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                          : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface)]'
                      }`}
                    >
                      {path}
                    </button>
                  ))}
                </div>
                <CustomPathInput
                  onAdd={path => addCustomPath(rule.id, 'allow', path)}
                  placeholder="/allowed-path/"
                />
              </div>
            </div>
          ))}

          <button onClick={addRule} className={btnClass}>
            + Add User-agent Rule
          </button>

          <div>
            <label className={labelClass}>Sitemap URL</label>
            <input
              type="url"
              value={sitemapUrl}
              onChange={e => setSitemapUrl(e.target.value)}
              placeholder="https://example.com/sitemap.xml"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Crawl-delay (seconds)</label>
            <input
              type="number"
              min="0"
              max="120"
              value={crawlDelay}
              onChange={e => setCrawlDelay(e.target.value)}
              placeholder="0"
              className={inputClass}
            />
          </div>
        </div>

        {/* Preview */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
              Preview
            </h3>
            <div className="flex gap-2">
              <CopyButton text={output} />
              <button onClick={handleDownload} className={btnClass}>
                Download
              </button>
            </div>
          </div>
          <pre className="w-full p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] font-mono text-sm overflow-x-auto whitespace-pre-wrap min-h-[300px]">
            {output || '# Your robots.txt will appear here'}
          </pre>
        </div>
      </div>
    </div>
  )
}

function CustomPathInput({
  onAdd,
  placeholder,
}: {
  onAdd: (path: string) => void
  placeholder: string
}) {
  const [value, setValue] = useState('')

  const handleAdd = () => {
    if (value.trim()) {
      onAdd(value.trim())
      setValue('')
    }
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault()
            handleAdd()
          }
        }}
        placeholder={placeholder}
        className="flex-1 p-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
      />
      <button
        onClick={handleAdd}
        className="px-3 py-1.5 text-sm font-medium rounded-md border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-alt)] transition-colors"
      >
        Add
      </button>
    </div>
  )
}
