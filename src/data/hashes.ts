import md5 from 'js-md5'
import { createHash } from 'node:crypto'

export interface HashEntry {
  algorithm: 'md5' | 'sha1' | 'sha256'
  algorithmLabel: string
  word: string
  hash: string
  slug: string
}

export const algorithms = [
  { id: 'md5' as const, label: 'MD5' },
  { id: 'sha1' as const, label: 'SHA-1' },
  { id: 'sha256' as const, label: 'SHA-256' },
]

export const words = [
  'hello', 'password', 'admin', 'test', '123456', 'world', 'foo', 'bar',
  'example', 'user', 'login', 'secret', 'root', 'welcome', 'master',
  'qwerty', 'monkey', 'dragon', 'letmein', 'abc123', 'trustno1',
  'iloveyou', 'sunshine', 'princess', 'shadow', 'michael', 'jennifer',
  'hunter', 'charlie', 'thomas', 'george', 'computer', 'internet',
  'server', 'database', 'bitcoin', 'crypto', 'blockchain', 'openai',
  'google', 'apple', 'amazon', 'github', 'linux', 'ubuntu', 'docker',
  'python', 'javascript', 'react', 'nodejs',
]

function computeHash(algorithm: 'md5' | 'sha1' | 'sha256', word: string): string {
  if (algorithm === 'md5') return md5(word)
  return createHash(algorithm).update(word).digest('hex')
}

export const hashEntries: HashEntry[] = algorithms.flatMap((algo) =>
  words.map((word) => ({
    algorithm: algo.id,
    algorithmLabel: algo.label,
    word,
    hash: computeHash(algo.id, word),
    slug: `${algo.id}-${word}`,
  }))
)

export function getRelatedByWord(word: string, excludeAlgo: string): HashEntry[] {
  return hashEntries.filter((e) => e.word === word && e.algorithm !== excludeAlgo)
}

export function getRelatedByAlgorithm(algorithm: string, excludeWord: string): HashEntry[] {
  return hashEntries
    .filter((e) => e.algorithm === algorithm && e.word !== excludeWord)
    .slice(0, 12)
}
