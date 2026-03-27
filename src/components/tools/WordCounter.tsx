import { useState } from 'react'

interface Stats {
  words: number
  characters: number
  charactersNoSpaces: number
  sentences: number
  paragraphs: number
  readingTime: string
}

function analyze(text: string): Stats {
  if (!text.trim()) {
    return { words: 0, characters: 0, charactersNoSpaces: 0, sentences: 0, paragraphs: 0, readingTime: '0 sec' }
  }

  const words = text.trim().split(/\s+/).length
  const characters = text.length
  const charactersNoSpaces = text.replace(/\s/g, '').length
  const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length || 1
  const minutes = Math.ceil(words / 200)
  const readingTime = minutes < 1 ? '< 1 min' : `${minutes} min`

  return { words, characters, charactersNoSpaces, sentences, paragraphs, readingTime }
}

export function WordCounter() {
  const [text, setText] = useState('')
  const stats = analyze(text)

  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here..."
        className="w-full h-48 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] resize-y focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-sans text-base"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {([
          ['Words', stats.words],
          ['Characters', stats.characters],
          ['No Spaces', stats.charactersNoSpaces],
          ['Sentences', stats.sentences],
          ['Paragraphs', stats.paragraphs],
          ['Reading Time', stats.readingTime],
        ] as const).map(([label, value]) => (
          <div key={label} className="text-center p-3 rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border)]">
            <div className="text-2xl font-bold text-[var(--color-primary)]">{value}</div>
            <div className="text-xs text-[var(--color-text-muted)] mt-1">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
