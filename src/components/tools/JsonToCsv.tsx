import { useState, useCallback } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'
import { Download, ArrowRightLeft } from 'lucide-react'

type Mode = 'json-to-csv' | 'csv-to-json'

interface FlatObject {
  [key: string]: string | number | boolean | null
}

function flattenObject(obj: Record<string, unknown>, prefix = ''): FlatObject {
  const result: FlatObject = {}
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    const value = obj[key]
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value as Record<string, unknown>, fullKey))
    } else if (Array.isArray(value)) {
      result[fullKey] = JSON.stringify(value)
    } else {
      result[fullKey] = value as string | number | boolean | null
    }
  }
  return result
}

async function jsonToCsv(json: string): Promise<string> {
  const Papa = (await import('papaparse')).default
  const parsed = JSON.parse(json) as unknown

  if (!Array.isArray(parsed)) {
    throw new Error('Input must be a JSON array of objects')
  }

  if (parsed.length === 0) {
    throw new Error('JSON array is empty')
  }

  const flattened = parsed.map((item) => {
    if (typeof item !== 'object' || item === null) {
      throw new Error('Each array element must be an object')
    }
    return flattenObject(item as Record<string, unknown>)
  })

  return Papa.unparse(flattened)
}

async function csvToJson(csv: string): Promise<string> {
  const Papa = (await import('papaparse')).default
  const result = Papa.parse<Record<string, string>>(csv.trim(), {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
  })

  if (result.errors.length > 0) {
    const firstError = result.errors[0]
    throw new Error(`CSV parse error (row ${(firstError?.row ?? 0) + 1}): ${firstError?.message ?? 'Unknown error'}`)
  }

  if (result.data.length === 0) {
    throw new Error('CSV has no data rows')
  }

  return JSON.stringify(result.data, null, 2)
}

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function JsonToCsv() {
  const [mode, setMode] = useState<Mode>('json-to-csv')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [converting, setConverting] = useState(false)

  const handleConvert = useCallback(async () => {
    if (!input.trim()) {
      setError('Please enter some data to convert')
      return
    }

    setConverting(true)
    setError('')
    setOutput('')

    try {
      const result = mode === 'json-to-csv'
        ? await jsonToCsv(input)
        : await csvToJson(input)
      setOutput(result)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Conversion failed')
    } finally {
      setConverting(false)
    }
  }, [input, mode])

  const handleDownload = useCallback(() => {
    if (!output) return
    if (mode === 'json-to-csv') {
      downloadFile(output, 'converted.csv', 'text/csv')
    } else {
      downloadFile(output, 'converted.json', 'application/json')
    }
  }, [output, mode])

  const handleModeSwitch = useCallback((newMode: Mode) => {
    setMode(newMode)
    setInput('')
    setOutput('')
    setError('')
  }, [])

  return (
    <div className="space-y-4">
      {/* Mode tabs */}
      <div className="flex gap-2">
        {([
          { key: 'json-to-csv' as const, label: 'JSON → CSV' },
          { key: 'csv-to-json' as const, label: 'CSV → JSON' },
        ]).map((m) => (
          <button
            key={m.key}
            onClick={() => handleModeSwitch(m.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === m.key
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-[var(--color-surface-alt)] border border-[var(--color-border)] hover:bg-[var(--color-border)]'
            }`}
          >
            <span className="inline-flex items-center gap-1.5">
              <ArrowRightLeft size={14} />
              {m.label}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div>
          <label className="block text-sm font-medium mb-1 text-[var(--color-text)]">
            {mode === 'json-to-csv' ? 'JSON Input' : 'CSV Input'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === 'json-to-csv'
                ? '[\n  { "name": "Alice", "age": 30, "city": "Berlin" },\n  { "name": "Bob", "age": 25, "city": "London" }\n]'
                : 'name,age,city\nAlice,30,Berlin\nBob,25,London'
            }
            className="w-full h-64 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        {/* Output */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium text-[var(--color-text)]">
              {mode === 'json-to-csv' ? 'CSV Output' : 'JSON Output'}
            </label>
            <div className="flex gap-2">
              {output && (
                <>
                  <CopyButton text={output} />
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors"
                    title={`Download as ${mode === 'json-to-csv' ? '.csv' : '.json'}`}
                  >
                    <Download size={14} />
                    Download
                  </button>
                </>
              )}
            </div>
          </div>
          {error ? (
            <div
              className="w-full h-64 p-4 rounded-lg font-mono text-sm overflow-auto"
              style={{
                border: '1px solid var(--color-error-border)',
                background: 'var(--color-error-bg)',
                color: 'var(--color-error-text)',
              }}
            >
              {error}
            </div>
          ) : (
            <textarea
              readOnly
              value={output}
              placeholder="Converted output will appear here..."
              className="w-full h-64 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none"
            />
          )}
        </div>
      </div>

      {/* Convert button */}
      <div className="flex justify-center">
        <button
          onClick={handleConvert}
          disabled={converting || !input.trim()}
          className="px-6 py-2.5 rounded-lg font-medium text-white transition-opacity disabled:opacity-50"
          style={{ background: 'var(--color-primary)' }}
        >
          {converting ? 'Converting...' : 'Convert'}
        </button>
      </div>
    </div>
  )
}
