import { md5 } from 'js-md5'
import { createHash } from 'node:crypto'

export interface HashEntry {
  algorithm: 'md5' | 'sha1' | 'sha256' | 'sha512'
  algorithmLabel: string
  word: string
  hash: string
  slug: string
}

export const algorithms = [
  { id: 'md5' as const, label: 'MD5' },
  { id: 'sha1' as const, label: 'SHA-1' },
  { id: 'sha256' as const, label: 'SHA-256' },
  { id: 'sha512' as const, label: 'SHA-512' },
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
  'email', 'domain', 'api', 'token', 'session', 'cookie', 'nginx', 'apache',
  'mysql', 'postgres', 'redis', 'mongodb', 'aws', 'azure', 'firebase',
  'angular', 'vue', 'svelte', 'tailwind', 'bootstrap', 'webpack', 'vite',
  'npm', 'yarn', 'pnpm', 'typescript', 'golang', 'rust', 'swift', 'kotlin',
  'flutter', 'django', 'flask', 'express', 'fastapi', 'graphql', 'rest',
  'oauth', 'jwt', 'ssl', 'https', 'http', 'tcp', 'dns', 'ssh', 'git',
  'json', 'xml', 'yaml', 'csv',
  // Common names
  'john', 'maria', 'david', 'sarah', 'james', 'emma', 'anna', 'robert',
  'lisa', 'william', 'laura', 'daniel', 'jessica', 'andrew', 'sophia',
  'matthew', 'olivia', 'chris', 'alex', 'max', 'julia', 'mark', 'peter',
  'paul', 'sam', 'kate', 'ryan', 'rachel', 'kevin', 'amanda',
  // Common passwords / security
  'password123', 'admin123', 'root123', 'qwerty123', 'welcome1', 'monkey123',
  'football', 'baseball', 'access', 'passw0rd', 'changeme', 'default',
  'guest', 'temp', 'backup', 'pass123', 'secret123', 'hello123', 'test123',
  'super', 'manager', 'staff', 'system', 'public', 'private',
  // Everyday words
  'goodbye', 'please', 'thanks', 'love', 'peace', 'happy', 'freedom',
  'music', 'coffee', 'pizza', 'ocean', 'mountain', 'sunset', 'summer',
  'winter', 'spring', 'garden', 'forest', 'river', 'bridge', 'castle',
  'knight', 'magic', 'silver', 'golden', 'crystal', 'diamond', 'thunder',
  'lightning', 'storm', 'rainbow', 'phoenix', 'falcon', 'eagle', 'tiger',
  'wolf', 'bear', 'lion', 'panther', 'cobra', 'viper', 'hawk', 'raven',
  'fire', 'water', 'earth', 'wind', 'star', 'moon', 'sun',
  // Tech terms
  'kubernetes', 'terraform', 'ansible', 'jenkins', 'devops', 'microservice',
  'serverless', 'lambda', 'cloud', 'vercel', 'netlify', 'heroku', 'supabase',
  'prisma', 'nextjs', 'nuxt', 'gatsby', 'remix', 'astro', 'deno', 'bun',
  'cypress', 'jest', 'playwright', 'storybook', 'figma', 'sketch', 'zod',
  'trpc', 'drizzle', 'turbo', 'esbuild', 'rollup', 'babel', 'eslint',
  'prettier', 'github-actions', 'gitlab', 'bitbucket', 'jira', 'confluence',
  'slack', 'notion', 'obsidian', 'neovim',
]

function computeHash(algorithm: 'md5' | 'sha1' | 'sha256' | 'sha512', word: string): string {
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
