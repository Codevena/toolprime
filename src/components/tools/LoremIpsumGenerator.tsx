import { useState, useCallback } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'

type OutputType = 'paragraphs' | 'sentences' | 'words'

const SENTENCES = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
  'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
  'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.',
  'Ut labore et dolore magnam aliquam quaerat voluptatem.',
  'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.',
  'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.',
  'Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit.',
  'Temporibus autem quibusdam et aut officiis debitis rerum necessitatibus saepe eveniet.',
  'Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis.',
  'Quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi consequatur.',
  'Et harum quidem rerum facilis est et expedita distinctio.',
  'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit.',
  'Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
  'Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
  'Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae.',
]

const WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'eiusmod',
  'tempor', 'incididunt', 'labore', 'dolore', 'magna', 'aliqua', 'enim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'commodo', 'consequat', 'aute', 'irure',
  'reprehenderit', 'voluptate', 'velit', 'esse', 'cillum', 'eu', 'fugiat', 'nulla', 'pariatur',
  'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'culpa', 'officia', 'deserunt',
  'mollit', 'anim', 'laborum',
]

function pick<T>(arr: T[], count: number, seed: number): T[] {
  // Deterministic-ish shuffle based on seed
  const result: T[] = []
  let s = seed
  for (let i = 0; i < count; i++) {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    result.push(arr[Math.abs(s) % arr.length])
  }
  return result
}

function generate(count: number, type: OutputType, seed: number): string {
  if (type === 'words') {
    return pick(WORDS, count, seed).join(' ')
  }
  if (type === 'sentences') {
    return pick(SENTENCES, count, seed).join(' ')
  }
  // paragraphs: 4–7 sentences each
  const paragraphs: string[] = []
  for (let p = 0; p < count; p++) {
    const len = 4 + ((seed + p * 7) % 4)
    const sentences = pick(SENTENCES, len, seed + p * 1000)
    paragraphs.push(sentences.join(' '))
  }
  return paragraphs.join('\n\n')
}

export function LoremIpsumGenerator() {
  const [count, setCount] = useState(5)
  const [type, setType] = useState<OutputType>('paragraphs')
  const [seed, setSeed] = useState(42)

  const text = generate(count, type, seed)

  const regenerate = useCallback(() => {
    setSeed(Math.floor(Math.random() * 1_000_000))
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">Count</label>
          <input
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(50, Number(e.target.value))))}
            className="w-24 p-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <div className="flex gap-2">
            {(['paragraphs', 'sentences', 'words'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  type === t
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-[var(--color-surface-alt)] border border-[var(--color-border)] hover:bg-[var(--color-border)]'
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={regenerate}
          className="px-4 py-2 rounded-md text-sm font-medium bg-[var(--color-surface-alt)] border border-[var(--color-border)] hover:bg-[var(--color-border)] transition-colors"
        >
          Shuffle
        </button>
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-sm font-medium">Generated Text</label>
          <CopyButton text={text} />
        </div>
        <textarea
          readOnly
          value={text}
          className="w-full h-64 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-sm resize-y"
        />
      </div>
    </div>
  )
}
