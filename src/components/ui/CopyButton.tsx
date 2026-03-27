import { useState, useRef, useEffect } from 'react'
import { Copy, Check, X } from 'lucide-react'

interface CopyButtonProps {
  text: string
  className?: string
}

export function CopyButton({ text, className = '' }: CopyButtonProps) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current != null) clearTimeout(timerRef.current)
    }
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setState('copied')
    } catch {
      setState('failed')
    }
    if (timerRef.current != null) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setState('idle'), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-md border border-[var(--color-border)] hover:bg-[var(--color-surface-alt)] transition-colors ${className}`}
      title="Copy to clipboard"
    >
      {state === 'copied' && <Check size={14} style={{ color: 'var(--color-success)' }} />}
      {state === 'failed' && <X size={14} style={{ color: 'var(--color-error)' }} />}
      {state === 'idle' && <Copy size={14} />}
      {state === 'copied' ? 'Copied!' : state === 'failed' ? 'Failed' : 'Copy'}
    </button>
  )
}
