import { useState } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'

type CaseMode = 'upper' | 'lower' | 'title' | 'sentence' | 'camel' | 'snake' | 'kebab' | 'pascal'

const caseLabels: Record<CaseMode, string> = {
  upper: 'UPPER CASE',
  lower: 'lower case',
  title: 'Title Case',
  sentence: 'Sentence case',
  camel: 'camelCase',
  snake: 'snake_case',
  kebab: 'kebab-case',
  pascal: 'PascalCase',
}

function splitWords(text: string): string[] {
  return text
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
}

function convertCase(text: string, mode: CaseMode): string {
  switch (mode) {
    case 'upper':
      return text.toUpperCase()
    case 'lower':
      return text.toLowerCase()
    case 'title':
      return text.replace(/(?<!')\b\w/g, (c) => c.toUpperCase())
    case 'sentence':
      return text.replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase()).replace(/^./, (c) => c.toUpperCase())
    case 'camel': {
      const words = splitWords(text)
      return words.map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('')
    }
    case 'snake':
      return splitWords(text).map(w => w.toLowerCase()).join('_')
    case 'kebab':
      return splitWords(text).map(w => w.toLowerCase()).join('-')
    case 'pascal': {
      const words = splitWords(text)
      return words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('')
    }
  }
}

export function CaseConverter() {
  const [input, setInput] = useState('')
  const [mode, setMode] = useState<CaseMode>('upper')

  const output = input.trim() ? convertCase(input, mode) : ''

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(caseLabels) as CaseMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              mode === m
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-[var(--color-surface-alt)] border border-[var(--color-border)] hover:bg-[var(--color-border)]'
            }`}
          >
            {caseLabels[m]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Input Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to convert..."
            className="w-full h-48 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium">Converted Output</label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea
            readOnly
            value={output}
            placeholder="Output will appear here..."
            className="w-full h-48 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-output-bg)] text-[var(--color-text)] font-mono text-sm resize-y"
          />
        </div>
      </div>
    </div>
  )
}
