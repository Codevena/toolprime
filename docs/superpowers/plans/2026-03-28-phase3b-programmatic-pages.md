# Phase 3b — Programmatic Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add ~853 new programmatic SEO pages across 4 types (Hash Lookup, Reverse Percentage, Regex Patterns, Gradient Presets), bringing the site from 812 to ~1665 pages.

**Architecture:** Each page type follows the established pattern: data file with entries + helper functions → dynamic `[...slug].astro` route → SEO meta/schema helpers. All pages are statically generated at build time.

**Tech Stack:** Astro 6, TypeScript, Node.js `crypto` (build-time SHA), existing `js-md5`, Tailwind CSS 4

---

## Task 1: Hash Lookup — Data File

**Files:**
- Create: `src/data/hashes.ts`

- [ ] **Step 1: Create `src/data/hashes.ts`**

```ts
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
```

- [ ] **Step 2: Verify the data compiles**

Run: `cd /Users/markus/Developer/toolprime && npx tsx -e "const h = require('./src/data/hashes.ts'); console.log(h.hashEntries.length, 'entries'); console.log(h.hashEntries[0])"`

Expected: `150 entries` and a valid HashEntry object.

- [ ] **Step 3: Commit**

```bash
git add src/data/hashes.ts
git commit -m "feat: add hash lookup data (150 entries)"
```

---

## Task 2: Hash Lookup — SEO Helpers

**Files:**
- Modify: `src/lib/seo.ts`
- Modify: `src/lib/schema.ts`

- [ ] **Step 1: Add `getHashMeta` to `src/lib/seo.ts`**

Add at the end of the file:

```ts
export function getHashMeta(algorithm: string, algorithmLabel: string, word: string, hash: string): MetaTags {
  return {
    title: `${algorithmLabel} Hash of "${word}" — ${hash.slice(0, 8)}... | ${SITE_NAME}`,
    description: `The ${algorithmLabel} hash of "${word}" is ${hash}. Generate ${algorithmLabel} hashes instantly with our free online hash generator.`,
    canonical: `${SITE_URL}/hashes/${algorithm}-${word}`,
    ogTitle: `${algorithmLabel} Hash of "${word}"`,
    ogDescription: `${algorithmLabel} hash: ${hash}`,
    ogType: 'website',
  }
}
```

- [ ] **Step 2: Add `hashFaqSchema` to `src/lib/schema.ts`**

Add at the end of the file:

```ts
export function hashFaqSchema(algorithmLabel: string, word: string, hash: string): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the ${algorithmLabel} hash of "${word}"?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The ${algorithmLabel} hash of "${word}" is ${hash}.`,
        },
      },
    ],
  })
}
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `cd /Users/markus/Developer/toolprime && pnpm build 2>&1 | tail -5`

Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/lib/seo.ts src/lib/schema.ts
git commit -m "feat: add hash lookup SEO meta + schema helpers"
```

---

## Task 3: Hash Lookup — Page Template

**Files:**
- Create: `src/pages/hashes/[...slug].astro`

- [ ] **Step 1: Create `src/pages/hashes/[...slug].astro`**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro'
import Breadcrumbs from '@/components/seo/Breadcrumbs.astro'
import SchemaMarkup from '@/components/seo/SchemaMarkup.astro'
import { hashEntries, getRelatedByWord, getRelatedByAlgorithm } from '@/data/hashes'
import { getHashMeta } from '@/lib/seo'
import { hashFaqSchema } from '@/lib/schema'

export function getStaticPaths() {
  return hashEntries.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry },
  }))
}

const { entry } = Astro.props
const { algorithm, algorithmLabel, word, hash } = entry
const meta = getHashMeta(algorithm, algorithmLabel, word, hash)
const relatedByWord = getRelatedByWord(word, algorithm)
const relatedByAlgorithm = getRelatedByAlgorithm(algorithm, word)
---

<BaseLayout {...meta}>
  <SchemaMarkup json={hashFaqSchema(algorithmLabel, word, hash)} />
  <Breadcrumbs items={[
    { name: 'Hash Generator', url: 'https://toolprime.dev/hash-generator' },
    { name: `${algorithmLabel} of "${word}"`, url: meta.canonical },
  ]} />

  <h1 class="text-3xl font-bold mb-2">{algorithmLabel} Hash of "{word}"</h1>

  <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 mb-8">
    <p class="text-sm text-[var(--color-text-muted)] mb-1">{algorithmLabel} Hash</p>
    <div class="flex items-center gap-3">
      <code id="hash-value" class="flex-1 text-lg sm:text-xl font-mono break-all text-[var(--color-primary-text)]">{hash}</code>
      <button id="copy-btn" class="shrink-0 px-3 py-1.5 text-sm rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-surface-alt)] transition-colors">
        Copy
      </button>
    </div>
  </div>

  <script>
    const copyBtn = document.getElementById('copy-btn')!
    const hashValue = document.getElementById('hash-value')!
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(hashValue.textContent ?? '')
      copyBtn.textContent = 'Copied!'
      setTimeout(() => { copyBtn.textContent = 'Copy' }, 2000)
    })
  </script>

  <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 mb-8">
    <h2 class="text-lg font-semibold mb-4">All Hashes of "{word}"</h2>
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-[var(--color-surface-alt)]">
          <th class="border border-[var(--color-border)] px-4 py-2 text-left">Algorithm</th>
          <th class="border border-[var(--color-border)] px-4 py-2 text-left">Hash</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border border-[var(--color-border)] px-4 py-2 font-medium">{algorithmLabel}</td>
          <td class="border border-[var(--color-border)] px-4 py-2 font-mono text-sm break-all">{hash}</td>
        </tr>
        {relatedByWord.map((e) => (
          <tr>
            <td class="border border-[var(--color-border)] px-4 py-2">
              <a href={`/hashes/${e.slug}`} class="text-[var(--color-primary-text)] hover:underline font-medium">{e.algorithmLabel}</a>
            </td>
            <td class="border border-[var(--color-border)] px-4 py-2 font-mono text-sm break-all">{e.hash}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <div class="prose prose-slate max-w-none mb-8">
    <h2>What is {algorithmLabel}?</h2>
    <p>
      {algorithmLabel} is a cryptographic hash function that produces a fixed-length hexadecimal string from any input. The same input always produces the same hash, but even a small change in the input produces a completely different output. Hash functions are one-way — you cannot reverse a hash to recover the original input.
    </p>
  </div>

  {relatedByAlgorithm.length > 0 && (
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">More {algorithmLabel} Hashes</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {relatedByAlgorithm.map((e) => (
          <a href={`/hashes/${e.slug}`}
            class="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] hover:border-[var(--color-primary)] transition-colors">
            <span class="text-sm font-medium">"{e.word}"</span>
            <span class="block text-xs text-[var(--color-text-muted)] font-mono truncate">{e.hash.slice(0, 16)}...</span>
          </a>
        ))}
      </div>
    </div>
  )}
</BaseLayout>
```

- [ ] **Step 2: Build and verify**

Run: `cd /Users/markus/Developer/toolprime && pnpm build 2>&1 | tail -5`

Expected: Build succeeds with 150 new pages (total ~962).

- [ ] **Step 3: Spot-check a page**

Run: `cd /Users/markus/Developer/toolprime && pnpm preview &` then check `http://localhost:4321/hashes/md5-hello` in browser.

- [ ] **Step 4: Commit**

```bash
git add src/pages/hashes/
git commit -m "feat: add hash lookup pages (150 pages)"
```

---

## Task 4: Reverse Percentage — Data + SEO

**Files:**
- Modify: `src/data/percentages.ts`
- Modify: `src/lib/seo.ts`
- Modify: `src/lib/schema.ts`

- [ ] **Step 1: Extend `src/data/percentages.ts`**

Add the following at the end of the file:

```ts
export interface ReversePercentageEntry {
  x: number
  y: number
  result: number
  slug: string
}

export const reversePercentageEntries: ReversePercentageEntry[] = bases.flatMap((y) =>
  bases
    .filter((x) => x <= y && x !== y)
    .map((x) => ({
      x,
      y,
      result: formatResult((x / y) * 100),
      slug: `what-percent-is-${x}-of-${y}`,
    }))
)

export function getReverseRelatedByY(y: number, excludeX: number): ReversePercentageEntry[] {
  return reversePercentageEntries
    .filter((e) => e.y === y && e.x !== excludeX)
    .slice(0, 8)
}

export function getReverseRelatedByX(x: number, excludeY: number): ReversePercentageEntry[] {
  return reversePercentageEntries
    .filter((e) => e.x === x && e.y !== excludeY)
    .slice(0, 8)
}
```

- [ ] **Step 2: Verify entry count**

Run: `cd /Users/markus/Developer/toolprime && npx tsx -e "const p = require('./src/data/percentages.ts'); console.log(p.reversePercentageEntries.length, 'reverse entries'); console.log(p.reversePercentageEntries[0])"`

Expected: A number of entries (will be less than 648 since we filter x < y and x !== y from the bases array) and a valid entry.

- [ ] **Step 3: Add `getReversePercentageMeta` to `src/lib/seo.ts`**

Add at the end of the file:

```ts
export function getReversePercentageMeta(x: number, y: number, result: number): MetaTags {
  return {
    title: `What Percent is ${x} of ${y}? Answer: ${result}% | ${SITE_NAME}`,
    description: `${x} is ${result}% of ${y}. Calculate what percent one number is of another with our free online percentage calculator.`,
    canonical: `${SITE_URL}/calculators/what-percent-is-${x}-of-${y}`,
    ogTitle: `What Percent is ${x} of ${y}? Answer: ${result}%`,
    ogDescription: `${x} is ${result}% of ${y}. Free online percentage calculator.`,
    ogType: 'website',
  }
}
```

- [ ] **Step 4: Add `reversePercentageFaqSchema` to `src/lib/schema.ts`**

Add at the end of the file:

```ts
export function reversePercentageFaqSchema(x: number, y: number, result: number): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What percent is ${x} of ${y}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${x} is ${result}% of ${y}. To calculate, divide ${x} by ${y} and multiply by 100: (${x} ÷ ${y}) × 100 = ${result}%.`,
        },
      },
    ],
  })
}
```

- [ ] **Step 5: Verify build**

Run: `cd /Users/markus/Developer/toolprime && pnpm build 2>&1 | tail -5`

Expected: Build succeeds (no new pages yet, just data + helpers).

- [ ] **Step 6: Commit**

```bash
git add src/data/percentages.ts src/lib/seo.ts src/lib/schema.ts
git commit -m "feat: add reverse percentage data + SEO helpers"
```

---

## Task 5: Reverse Percentage — Page Template

**Files:**
- Modify: `src/pages/calculators/[...slug].astro`

- [ ] **Step 1: Extend `src/pages/calculators/[...slug].astro`**

Replace the entire file with:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro'
import Breadcrumbs from '@/components/seo/Breadcrumbs.astro'
import SchemaMarkup from '@/components/seo/SchemaMarkup.astro'
import { percentageEntries, getRelatedByBase, getRelatedByPercentage, reversePercentageEntries, getReverseRelatedByY, getReverseRelatedByX } from '@/data/percentages'
import { getPercentageMeta, getReversePercentageMeta } from '@/lib/seo'
import { percentageFaqSchema, reversePercentageFaqSchema } from '@/lib/schema'

export function getStaticPaths() {
  const forwardPaths = percentageEntries.map((entry) => ({
    params: { slug: entry.slug },
    props: { type: 'forward' as const, entry, reverseEntry: null },
  }))
  const reversePaths = reversePercentageEntries.map((entry) => ({
    params: { slug: entry.slug },
    props: { type: 'reverse' as const, entry: null, reverseEntry: entry },
  }))
  return [...forwardPaths, ...reversePaths]
}

const { type, entry, reverseEntry } = Astro.props

// Forward percentage page
if (type === 'forward' && entry) {
  var { percentage, base, result } = entry
  var meta = getPercentageMeta(percentage, base, result)
  var schemaJson = percentageFaqSchema(percentage, base, result)
  var relatedByBase = getRelatedByBase(base, percentage)
  var relatedByPercentage = getRelatedByPercentage(percentage, base)
}

// Reverse percentage page
if (type === 'reverse' && reverseEntry) {
  var { x, y, result: reverseResult } = reverseEntry
  var reverseMeta = getReversePercentageMeta(x, y, reverseResult)
  var reverseSchemaJson = reversePercentageFaqSchema(x, y, reverseResult)
  var relatedByY = getReverseRelatedByY(y, x)
  var relatedByX = getReverseRelatedByX(x, y)
}
---

{type === 'forward' && entry && (
<BaseLayout {...meta!}>
  <SchemaMarkup json={schemaJson!} />
  <Breadcrumbs items={[
    { name: 'Percentage Calculator', url: 'https://toolprime.dev/calculators' },
    { name: `${percentage!}% of ${base!}`, url: meta!.canonical },
  ]} />

  <h1 class="text-3xl font-bold mb-2">What is {percentage!}% of {base!}?</h1>

  <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 mb-8">
    <p class="text-lg text-[var(--color-text-muted)] mb-1">Answer</p>
    <p class="text-4xl font-bold text-[var(--color-primary-text)]">
      {percentage!}% of {base!} = {result!}
    </p>
  </div>

  <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 mb-8">
    <h2 class="text-lg font-semibold mb-4">Interactive Calculator</h2>
    <div class="flex flex-col sm:flex-row items-center gap-4">
      <div class="flex-1 w-full">
        <label class="block text-sm font-medium mb-1" for="pct-input">Percentage (%)</label>
        <input type="number" id="pct-input" value={percentage!}
          class="w-full p-3 rounded-lg border border-[var(--color-border)] text-lg font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
      </div>
      <span class="text-xl text-[var(--color-text-muted)]">of</span>
      <div class="flex-1 w-full">
        <label class="block text-sm font-medium mb-1" for="base-input">Number</label>
        <input type="number" id="base-input" value={base!}
          class="w-full p-3 rounded-lg border border-[var(--color-border)] text-lg font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
      </div>
      <span class="text-xl text-[var(--color-text-muted)]">=</span>
      <div class="flex-1 w-full">
        <label class="block text-sm font-medium mb-1">Result</label>
        <input type="text" id="calc-result" value={result!} readonly
          class="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-lg font-mono" />
      </div>
    </div>
  </div>

  <script>
    const pctInput = document.getElementById('pct-input') as HTMLInputElement
    const baseInput = document.getElementById('base-input') as HTMLInputElement
    const calcResult = document.getElementById('calc-result') as HTMLInputElement
    function update() {
      const p = parseFloat(pctInput.value)
      const b = parseFloat(baseInput.value)
      if (isNaN(p) || isNaN(b)) { calcResult.value = ''; return }
      const r = (b * p) / 100
      calcResult.value = parseFloat(r.toPrecision(10)).toString()
    }
    pctInput.addEventListener('input', update)
    baseInput.addEventListener('input', update)
  </script>

  <div class="prose prose-slate max-w-none mb-8">
    <h2>How to Calculate {percentage!}% of {base!}</h2>
    <p>
      To find {percentage!}% of {base!}, multiply {base!} by {percentage! / 100}:
    </p>
    <p class="font-mono bg-[var(--color-surface-alt)] p-3 rounded-lg">
      {base!} &times; {percentage!} / 100 = {base!} &times; {percentage! / 100} = {result!}
    </p>
  </div>

  {relatedByBase!.length > 0 && (
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Other Percentages of {base!}</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {relatedByBase!.map((e) => (
          <a href={`/calculators/${e.slug}`}
            class="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] hover:border-[var(--color-primary)] transition-colors text-center">
            <span class="text-sm font-medium">{e.percentage}% of {e.base}</span>
            <span class="block text-xs text-[var(--color-text-muted)]">= {e.result}</span>
          </a>
        ))}
      </div>
    </div>
  )}

  {relatedByPercentage!.length > 0 && (
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">{percentage!}% of Other Numbers</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {relatedByPercentage!.map((e) => (
          <a href={`/calculators/${e.slug}`}
            class="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] hover:border-[var(--color-primary)] transition-colors text-center">
            <span class="text-sm font-medium">{e.percentage}% of {e.base}</span>
            <span class="block text-xs text-[var(--color-text-muted)]">= {e.result}</span>
          </a>
        ))}
      </div>
    </div>
  )}
</BaseLayout>
)}

{type === 'reverse' && reverseEntry && (
<BaseLayout {...reverseMeta!}>
  <SchemaMarkup json={reverseSchemaJson!} />
  <Breadcrumbs items={[
    { name: 'Percentage Calculator', url: 'https://toolprime.dev/calculators' },
    { name: `${x!} of ${y!}`, url: reverseMeta!.canonical },
  ]} />

  <h1 class="text-3xl font-bold mb-2">What Percent is {x!} of {y!}?</h1>

  <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 mb-8">
    <p class="text-lg text-[var(--color-text-muted)] mb-1">Answer</p>
    <p class="text-4xl font-bold text-[var(--color-primary-text)]">
      {x!} is {reverseResult!}% of {y!}
    </p>
  </div>

  <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 mb-8">
    <h2 class="text-lg font-semibold mb-4">Interactive Calculator</h2>
    <div class="flex flex-col sm:flex-row items-center gap-4">
      <div class="flex-1 w-full">
        <label class="block text-sm font-medium mb-1" for="x-input">Number</label>
        <input type="number" id="x-input" value={x!}
          class="w-full p-3 rounded-lg border border-[var(--color-border)] text-lg font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
      </div>
      <span class="text-xl text-[var(--color-text-muted)]">of</span>
      <div class="flex-1 w-full">
        <label class="block text-sm font-medium mb-1" for="y-input">Total</label>
        <input type="number" id="y-input" value={y!}
          class="w-full p-3 rounded-lg border border-[var(--color-border)] text-lg font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
      </div>
      <span class="text-xl text-[var(--color-text-muted)]">=</span>
      <div class="flex-1 w-full">
        <label class="block text-sm font-medium mb-1">Percent</label>
        <input type="text" id="rev-result" value={`${reverseResult!}%`} readonly
          class="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-lg font-mono" />
      </div>
    </div>
  </div>

  <script>
    const xInput = document.getElementById('x-input') as HTMLInputElement
    const yInput = document.getElementById('y-input') as HTMLInputElement
    const revResult = document.getElementById('rev-result') as HTMLInputElement
    function updateReverse() {
      const xVal = parseFloat(xInput.value)
      const yVal = parseFloat(yInput.value)
      if (isNaN(xVal) || isNaN(yVal) || yVal === 0) { revResult.value = ''; return }
      const r = (xVal / yVal) * 100
      revResult.value = parseFloat(r.toPrecision(10)).toString() + '%'
    }
    xInput.addEventListener('input', updateReverse)
    yInput.addEventListener('input', updateReverse)
  </script>

  <div class="prose prose-slate max-w-none mb-8">
    <h2>How to Calculate What Percent {x!} is of {y!}</h2>
    <p>
      To find what percent {x!} is of {y!}, divide {x!} by {y!} and multiply by 100:
    </p>
    <p class="font-mono bg-[var(--color-surface-alt)] p-3 rounded-lg">
      ({x!} &divide; {y!}) &times; 100 = {reverseResult!}%
    </p>
  </div>

  {relatedByY!.length > 0 && (
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Other Percentages of {y!}</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {relatedByY!.map((e) => (
          <a href={`/calculators/${e.slug}`}
            class="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] hover:border-[var(--color-primary)] transition-colors text-center">
            <span class="text-sm font-medium">{e.x} of {e.y}</span>
            <span class="block text-xs text-[var(--color-text-muted)]">= {e.result}%</span>
          </a>
        ))}
      </div>
    </div>
  )}

  {relatedByX!.length > 0 && (
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">{x!} as a Percentage of Other Numbers</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {relatedByX!.map((e) => (
          <a href={`/calculators/${e.slug}`}
            class="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] hover:border-[var(--color-primary)] transition-colors text-center">
            <span class="text-sm font-medium">{e.x} of {e.y}</span>
            <span class="block text-xs text-[var(--color-text-muted)]">= {e.result}%</span>
          </a>
        ))}
      </div>
    </div>
  )}
</BaseLayout>
)}
```

- [ ] **Step 2: Build and verify**

Run: `cd /Users/markus/Developer/toolprime && pnpm build 2>&1 | tail -5`

Expected: Build succeeds. Check total page count includes both forward and reverse percentage pages.

- [ ] **Step 3: Spot-check pages**

Preview the site and check:
- `http://localhost:4321/calculators/what-is-5-percent-of-100` (forward, should still work)
- `http://localhost:4321/calculators/what-percent-is-10-of-100` (reverse, new)

- [ ] **Step 4: Commit**

```bash
git add src/pages/calculators/
git commit -m "feat: add reverse percentage pages"
```

---

## Task 6: Regex Patterns — Data File

**Files:**
- Create: `src/data/regexPatterns.ts`

- [ ] **Step 1: Create `src/data/regexPatterns.ts`**

```ts
export interface RegexPattern {
  name: string
  slug: string
  pattern: string
  flags: string
  description: string
  examples: {
    match: string[]
    noMatch: string[]
  }
  explanation: string[]
  codeSnippets: {
    javascript: string
    python: string
    php: string
  }
  tags: string[]
}

export const regexPatterns: RegexPattern[] = [
  {
    name: 'Email Address',
    slug: 'email-validation',
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    flags: 'i',
    description: 'Validates email addresses following the standard format: local-part@domain.tld.',
    examples: {
      match: ['user@example.com', 'john.doe+tag@company.co.uk', 'info@test.org'],
      noMatch: ['@example.com', 'user@', 'user@.com'],
    },
    explanation: [
      '^[a-zA-Z0-9._%+-]+ — starts with one or more alphanumeric characters or ._%+-',
      '@ — literal @ symbol',
      '[a-zA-Z0-9.-]+ — domain name with alphanumeric characters, dots, or hyphens',
      '\\.[a-zA-Z]{2,}$ — dot followed by a TLD of at least 2 letters',
    ],
    codeSnippets: {
      javascript: 'const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/i;\nregex.test("user@example.com"); // true',
      python: 'import re\npattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"\nbool(re.match(pattern, "user@example.com", re.IGNORECASE))  # True',
      php: '$pattern = \'/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/i\';\npreg_match($pattern, "user@example.com"); // 1',
    },
    tags: ['validation', 'web'],
  },
  {
    name: 'URL',
    slug: 'url-validation',
    pattern: '^https?:\\/\\/(www\\.)?[a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([a-zA-Z0-9()@:%_+.~#?&/=-]*)$',
    flags: 'i',
    description: 'Validates HTTP and HTTPS URLs with optional www prefix, domain, and path.',
    examples: {
      match: ['https://example.com', 'http://www.test.org/path?q=1', 'https://sub.domain.co.uk/page'],
      noMatch: ['ftp://example.com', 'example.com', 'http://'],
    },
    explanation: [
      '^https?:\\/\\/ — starts with http:// or https://',
      '(www\\.)? — optional www. prefix',
      '[a-zA-Z0-9@:%._+~#=]{1,256} — domain name characters',
      '\\.[a-zA-Z0-9()]{1,6} — dot followed by TLD',
      '\\b([...]*) $ — optional path, query string, and fragment',
    ],
    codeSnippets: {
      javascript: 'const regex = /^https?:\\/\\/(www\\.)?[a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([a-zA-Z0-9()@:%_+.~#?&/=-]*)$/i;\nregex.test("https://example.com"); // true',
      python: 'import re\npattern = r"^https?://(www\\.)?[a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([a-zA-Z0-9()@:%_+.~#?&/=-]*)$"\nbool(re.match(pattern, "https://example.com", re.IGNORECASE))  # True',
      php: '$pattern = \'/^https?:\\/\\/(www\\.)?[a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([a-zA-Z0-9()@:%_+.~#?&\\/=-]*)$/i\';\npreg_match($pattern, "https://example.com"); // 1',
    },
    tags: ['validation', 'web'],
  },
  {
    name: 'Phone Number (International)',
    slug: 'phone-number-international',
    pattern: '^\\+?[1-9]\\d{1,14}$',
    flags: '',
    description: 'Validates international phone numbers in E.164 format (up to 15 digits with optional + prefix).',
    examples: {
      match: ['+14155552671', '+442071838750', '491711234567'],
      noMatch: ['+0123456789', '123', '+1234567890123456'],
    },
    explanation: [
      '^\\+? — optional leading plus sign',
      '[1-9] — first digit must be 1-9 (no leading zero)',
      '\\d{1,14}$ — followed by 1 to 14 more digits (total max 15)',
    ],
    codeSnippets: {
      javascript: 'const regex = /^\\+?[1-9]\\d{1,14}$/;\nregex.test("+14155552671"); // true',
      python: 'import re\npattern = r"^\\+?[1-9]\\d{1,14}$"\nbool(re.match(pattern, "+14155552671"))  # True',
      php: '$pattern = \'/^\\+?[1-9]\\d{1,14}$/\';\npreg_match($pattern, "+14155552671"); // 1',
    },
    tags: ['validation', 'phone'],
  },
  {
    name: 'Phone Number (US)',
    slug: 'phone-number-us',
    pattern: '^\\(?[2-9]\\d{2}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$',
    flags: '',
    description: 'Validates US phone numbers in various formats: (555) 123-4567, 555-123-4567, 5551234567.',
    examples: {
      match: ['(555) 123-4567', '555-123-4567', '5551234567'],
      noMatch: ['(055) 123-4567', '123-4567', '555-1234-567'],
    },
    explanation: [
      '^\\(?[2-9]\\d{2}\\)? — area code (3 digits starting with 2-9) with optional parentheses',
      '[-.\\s]? — optional separator (dash, dot, or space)',
      '\\d{3} — exchange code (3 digits)',
      '[-.\\s]?\\d{4}$ — separator + subscriber number (4 digits)',
    ],
    codeSnippets: {
      javascript: 'const regex = /^\\(?[2-9]\\d{2}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$/;\nregex.test("(555) 123-4567"); // true',
      python: 'import re\npattern = r"^\\(?[2-9]\\d{2}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$"\nbool(re.match(pattern, "(555) 123-4567"))  # True',
      php: '$pattern = \'/^\\(?[2-9]\\d{2}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$/\';\npreg_match($pattern, "(555) 123-4567"); // 1',
    },
    tags: ['validation', 'phone'],
  },
  {
    name: 'IPv4 Address',
    slug: 'ipv4-address',
    pattern: '^((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$',
    flags: '',
    description: 'Validates IPv4 addresses (four octets from 0-255 separated by dots).',
    examples: {
      match: ['192.168.1.1', '10.0.0.0', '255.255.255.255'],
      noMatch: ['256.1.1.1', '192.168.1', '192.168.1.1.1'],
    },
    explanation: [
      '(25[0-5]|2[0-4]\\d|[01]?\\d\\d?) — matches 0-255',
      '\\. — literal dot separator',
      '{3} — first three octets with dots',
      'final octet without trailing dot',
    ],
    codeSnippets: {
      javascript: 'const regex = /^((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$/;\nregex.test("192.168.1.1"); // true',
      python: 'import re\npattern = r"^((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$"\nbool(re.match(pattern, "192.168.1.1"))  # True',
      php: '$pattern = \'/^((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$/\';\npreg_match($pattern, "192.168.1.1"); // 1',
    },
    tags: ['validation', 'network'],
  },
  {
    name: 'IPv6 Address',
    slug: 'ipv6-address',
    pattern: '^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$',
    flags: 'i',
    description: 'Validates full IPv6 addresses (eight groups of four hexadecimal digits separated by colons).',
    examples: {
      match: ['2001:0db8:85a3:0000:0000:8a2e:0370:7334', 'fe80:0000:0000:0000:0000:0000:0000:0001'],
      noMatch: ['2001:db8::1', '192.168.1.1', '2001:db8:85a3:0000:0000:8a2e:0370'],
    },
    explanation: [
      '([0-9a-fA-F]{1,4}:){7} — seven groups of 1-4 hex digits followed by colon',
      '[0-9a-fA-F]{1,4}$ — final group without trailing colon',
    ],
    codeSnippets: {
      javascript: 'const regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/i;\nregex.test("2001:0db8:85a3:0000:0000:8a2e:0370:7334"); // true',
      python: 'import re\npattern = r"^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$"\nbool(re.match(pattern, "2001:0db8:85a3:0000:0000:8a2e:0370:7334", re.IGNORECASE))  # True',
      php: '$pattern = \'/^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/i\';\npreg_match($pattern, "2001:0db8:85a3:0000:0000:8a2e:0370:7334"); // 1',
    },
    tags: ['validation', 'network'],
  },
  {
    name: 'Date (YYYY-MM-DD)',
    slug: 'date-yyyy-mm-dd',
    pattern: '^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$',
    flags: '',
    description: 'Validates dates in ISO 8601 format (YYYY-MM-DD) with basic month/day range checking.',
    examples: {
      match: ['2024-01-15', '2023-12-31', '2000-06-01'],
      noMatch: ['2024-13-01', '2024-00-15', '24-01-15'],
    },
    explanation: [
      '^\\d{4} — four-digit year',
      '(0[1-9]|1[0-2]) — month 01-12',
      '(0[1-9]|[12]\\d|3[01])$ — day 01-31',
    ],
    codeSnippets: {
      javascript: 'const regex = /^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$/;\nregex.test("2024-01-15"); // true',
      python: 'import re\npattern = r"^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$"\nbool(re.match(pattern, "2024-01-15"))  # True',
      php: '$pattern = \'/^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$/\';\npreg_match($pattern, "2024-01-15"); // 1',
    },
    tags: ['validation', 'date'],
  },
  {
    name: 'Date (DD/MM/YYYY)',
    slug: 'date-dd-mm-yyyy',
    pattern: '^(0[1-9]|[12]\\d|3[01])\\/(0[1-9]|1[0-2])\\/\\d{4}$',
    flags: '',
    description: 'Validates dates in DD/MM/YYYY format with basic day/month range checking.',
    examples: {
      match: ['15/01/2024', '31/12/2023', '01/06/2000'],
      noMatch: ['32/01/2024', '15/13/2024', '1/6/2000'],
    },
    explanation: [
      '^(0[1-9]|[12]\\d|3[01]) — day 01-31',
      '\\/ — literal forward slash',
      '(0[1-9]|1[0-2]) — month 01-12',
      '\\/\\d{4}$ — slash followed by four-digit year',
    ],
    codeSnippets: {
      javascript: 'const regex = /^(0[1-9]|[12]\\d|3[01])\\/(0[1-9]|1[0-2])\\/\\d{4}$/;\nregex.test("15/01/2024"); // true',
      python: 'import re\npattern = r"^(0[1-9]|[12]\\d|3[01])/(0[1-9]|1[0-2])/\\d{4}$"\nbool(re.match(pattern, "15/01/2024"))  # True',
      php: '$pattern = \'/^(0[1-9]|[12]\\d|3[01])\\/(0[1-9]|1[0-2])\\/\\d{4}$/\';\npreg_match($pattern, "15/01/2024"); // 1',
    },
    tags: ['validation', 'date'],
  },
  {
    name: 'Time (HH:MM:SS)',
    slug: 'time-hh-mm-ss',
    pattern: '^([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d$',
    flags: '',
    description: 'Validates 24-hour time format (HH:MM:SS) with valid hour, minute, and second ranges.',
    examples: {
      match: ['00:00:00', '12:30:45', '23:59:59'],
      noMatch: ['24:00:00', '12:60:00', '1:30:00'],
    },
    explanation: [
      '^([01]\\d|2[0-3]) — hour 00-23',
      ':[0-5]\\d — colon + minutes 00-59',
      ':[0-5]\\d$ — colon + seconds 00-59',
    ],
    codeSnippets: {
      javascript: 'const regex = /^([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d$/;\nregex.test("12:30:45"); // true',
      python: 'import re\npattern = r"^([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d$"\nbool(re.match(pattern, "12:30:45"))  # True',
      php: '$pattern = \'/^([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d$/\';\npreg_match($pattern, "12:30:45"); // 1',
    },
    tags: ['validation', 'date'],
  },
  {
    name: 'Hex Color Code',
    slug: 'hex-color-code',
    pattern: '^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$',
    flags: 'i',
    description: 'Validates CSS hex color codes in 3-digit (#RGB) or 6-digit (#RRGGBB) format.',
    examples: {
      match: ['#fff', '#FF5733', '#000000'],
      noMatch: ['#gg0000', 'FF5733', '#12345'],
    },
    explanation: [
      '^# — starts with hash symbol',
      '([0-9a-fA-F]{3} — 3 hex digits (shorthand)',
      '|[0-9a-fA-F]{6})$ — or 6 hex digits (full)',
    ],
    codeSnippets: {
      javascript: 'const regex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/i;\nregex.test("#FF5733"); // true',
      python: 'import re\npattern = r"^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$"\nbool(re.match(pattern, "#FF5733", re.IGNORECASE))  # True',
      php: '$pattern = \'/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/i\';\npreg_match($pattern, "#FF5733"); // 1',
    },
    tags: ['validation', 'design'],
  },
  {
    name: 'Credit Card Number',
    slug: 'credit-card-number',
    pattern: '^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$',
    flags: '',
    description: 'Validates major credit card numbers (Visa, Mastercard, Amex, Discover) by format.',
    examples: {
      match: ['4111111111111111', '5500000000000004', '378282246310005'],
      noMatch: ['1234567890123456', '411111111111', '0000000000000000'],
    },
    explanation: [
      '4[0-9]{12}(?:[0-9]{3})? — Visa (starts with 4, 13 or 16 digits)',
      '5[1-5][0-9]{14} — Mastercard (starts with 51-55, 16 digits)',
      '3[47][0-9]{13} — Amex (starts with 34 or 37, 15 digits)',
      '6(?:011|5[0-9]{2})[0-9]{12} — Discover (starts with 6011 or 65, 16 digits)',
    ],
    codeSnippets: {
      javascript: 'const regex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$/;\nregex.test("4111111111111111"); // true',
      python: 'import re\npattern = r"^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$"\nbool(re.match(pattern, "4111111111111111"))  # True',
      php: '$pattern = \'/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$/\';\npreg_match($pattern, "4111111111111111"); // 1',
    },
    tags: ['validation', 'finance'],
  },
  {
    name: 'US ZIP Code',
    slug: 'us-zip-code',
    pattern: '^\\d{5}(-\\d{4})?$',
    flags: '',
    description: 'Validates US ZIP codes in 5-digit (12345) or ZIP+4 (12345-6789) format.',
    examples: {
      match: ['10001', '90210', '12345-6789'],
      noMatch: ['1234', '123456', 'ABCDE'],
    },
    explanation: [
      '^\\d{5} — five digits',
      '(-\\d{4})?$ — optional dash followed by four more digits',
    ],
    codeSnippets: {
      javascript: 'const regex = /^\\d{5}(-\\d{4})?$/;\nregex.test("90210"); // true',
      python: 'import re\npattern = r"^\\d{5}(-\\d{4})?$"\nbool(re.match(pattern, "90210"))  # True',
      php: '$pattern = \'/^\\d{5}(-\\d{4})?$/\';\npreg_match($pattern, "90210"); // 1',
    },
    tags: ['validation', 'address'],
  },
  {
    name: 'Username',
    slug: 'username-validation',
    pattern: '^[a-zA-Z][a-zA-Z0-9_-]{2,19}$',
    flags: '',
    description: 'Validates usernames: starts with a letter, 3-20 characters, allows letters, digits, underscores, and hyphens.',
    examples: {
      match: ['john_doe', 'User123', 'my-name'],
      noMatch: ['1user', 'ab', 'user name', 'a'.repeat(21)],
    },
    explanation: [
      '^[a-zA-Z] — must start with a letter',
      '[a-zA-Z0-9_-]{2,19}$ — followed by 2-19 alphanumeric, underscore, or hyphen characters',
    ],
    codeSnippets: {
      javascript: 'const regex = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/;\nregex.test("john_doe"); // true',
      python: 'import re\npattern = r"^[a-zA-Z][a-zA-Z0-9_-]{2,19}$"\nbool(re.match(pattern, "john_doe"))  # True',
      php: '$pattern = \'/^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/\';\npreg_match($pattern, "john_doe"); // 1',
    },
    tags: ['validation', 'web'],
  },
  {
    name: 'Strong Password',
    slug: 'strong-password',
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
    flags: '',
    description: 'Validates strong passwords: minimum 8 characters, at least one uppercase, one lowercase, one digit, and one special character.',
    examples: {
      match: ['MyP@ss1word', 'Str0ng!Pass', 'Ab1!defgh'],
      noMatch: ['password', 'PASSWORD1!', 'Short1!'],
    },
    explanation: [
      '(?=.*[a-z]) — at least one lowercase letter',
      '(?=.*[A-Z]) — at least one uppercase letter',
      '(?=.*\\d) — at least one digit',
      '(?=.*[@$!%*?&]) — at least one special character',
      '[A-Za-z\\d@$!%*?&]{8,}$ — minimum 8 characters from allowed set',
    ],
    codeSnippets: {
      javascript: 'const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/;\nregex.test("MyP@ss1word"); // true',
      python: 'import re\npattern = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"\nbool(re.match(pattern, "MyP@ss1word"))  # True',
      php: '$pattern = \'/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/\';\npreg_match($pattern, "MyP@ss1word"); // 1',
    },
    tags: ['validation', 'security'],
  },
  {
    name: 'URL Slug',
    slug: 'url-slug',
    pattern: '^[a-z0-9]+(-[a-z0-9]+)*$',
    flags: '',
    description: 'Validates URL-friendly slugs: lowercase letters, digits, and hyphens (no leading/trailing/consecutive hyphens).',
    examples: {
      match: ['my-blog-post', 'hello-world', 'page1'],
      noMatch: ['-starts-with', 'ends-with-', 'has--double', 'UPPERCASE'],
    },
    explanation: [
      '^[a-z0-9]+ — starts with one or more lowercase alphanumeric characters',
      '(-[a-z0-9]+)* — optionally followed by groups of hyphen + alphanumeric',
      '$ — ensures no trailing hyphen',
    ],
    codeSnippets: {
      javascript: 'const regex = /^[a-z0-9]+(-[a-z0-9]+)*$/;\nregex.test("my-blog-post"); // true',
      python: 'import re\npattern = r"^[a-z0-9]+(-[a-z0-9]+)*$"\nbool(re.match(pattern, "my-blog-post"))  # True',
      php: '$pattern = \'/^[a-z0-9]+(-[a-z0-9]+)*$/\';\npreg_match($pattern, "my-blog-post"); // 1',
    },
    tags: ['validation', 'web'],
  },
  {
    name: 'HTML Tag',
    slug: 'html-tag',
    pattern: '<\\/?[a-zA-Z][a-zA-Z0-9]*(?:\\s[^>]*)?\\/?>',
    flags: 'g',
    description: 'Matches HTML tags including opening, closing, and self-closing tags with optional attributes.',
    examples: {
      match: ['<div>', '</p>', '<img src="test.jpg" />'],
      noMatch: ['< div>', 'plain text', '<<invalid>>'],
    },
    explanation: [
      '< — opening angle bracket',
      '\\/? — optional forward slash (closing tags)',
      '[a-zA-Z][a-zA-Z0-9]* — tag name',
      '(?:\\s[^>]*)? — optional attributes',
      '\\/?>  — optional self-closing slash + closing bracket',
    ],
    codeSnippets: {
      javascript: 'const regex = /<\\/?[a-zA-Z][a-zA-Z0-9]*(?:\\s[^>]*)?\\/??>/g;\n"<div class=\\"test\\">text</div>".match(regex); // ["<div class=\\"test\\">", "</div>"]',
      python: 'import re\npattern = r"</?[a-zA-Z][a-zA-Z0-9]*(?:\\s[^>]*)?\\/?>"\nre.findall(pattern, "<div>text</div>")  # [\'<div>\', \'</div>\']',
      php: '$pattern = \'/<\\/?[a-zA-Z][a-zA-Z0-9]*(?:\\s[^>]*)?\\/??>/\';\npreg_match_all($pattern, "<div>text</div>", $matches);',
    },
    tags: ['extraction', 'web'],
  },
  {
    name: 'Whitespace Trim',
    slug: 'whitespace-trim',
    pattern: '^\\s+|\\s+$',
    flags: 'g',
    description: 'Matches leading and trailing whitespace for trimming strings.',
    examples: {
      match: ['  hello  ', '\\thello', 'hello  '],
      noMatch: ['hello', 'no-whitespace'],
    },
    explanation: [
      '^\\s+ — one or more whitespace characters at the start',
      '| — or',
      '\\s+$ — one or more whitespace characters at the end',
    ],
    codeSnippets: {
      javascript: 'const regex = /^\\s+|\\s+$/g;\n"  hello  ".replace(regex, ""); // "hello"',
      python: 'import re\npattern = r"^\\s+|\\s+$"\nre.sub(pattern, "", "  hello  ")  # "hello"',
      php: '$pattern = \'/^\\s+|\\s+$/\';\npreg_replace($pattern, "", "  hello  "); // "hello"',
    },
    tags: ['formatting', 'text'],
  },
  {
    name: 'Digits Only',
    slug: 'digits-only',
    pattern: '^\\d+$',
    flags: '',
    description: 'Validates that a string contains only numeric digits (0-9).',
    examples: {
      match: ['12345', '0', '9876543210'],
      noMatch: ['12.34', '-5', '12 34', 'abc'],
    },
    explanation: [
      '^\\d+ — one or more digits from start',
      '$ — to end of string (nothing else allowed)',
    ],
    codeSnippets: {
      javascript: 'const regex = /^\\d+$/;\nregex.test("12345"); // true',
      python: 'import re\npattern = r"^\\d+$"\nbool(re.match(pattern, "12345"))  # True',
      php: '$pattern = \'/^\\d+$/\';\npreg_match($pattern, "12345"); // 1',
    },
    tags: ['validation', 'text'],
  },
  {
    name: 'Alphanumeric Only',
    slug: 'alphanumeric-only',
    pattern: '^[a-zA-Z0-9]+$',
    flags: '',
    description: 'Validates that a string contains only letters and numbers (no spaces or special characters).',
    examples: {
      match: ['Hello123', 'abc', '456'],
      noMatch: ['hello world', 'test!', 'a-b'],
    },
    explanation: [
      '^[a-zA-Z0-9]+ — one or more alphanumeric characters from start',
      '$ — to end of string',
    ],
    codeSnippets: {
      javascript: 'const regex = /^[a-zA-Z0-9]+$/;\nregex.test("Hello123"); // true',
      python: 'import re\npattern = r"^[a-zA-Z0-9]+$"\nbool(re.match(pattern, "Hello123"))  # True',
      php: '$pattern = \'/^[a-zA-Z0-9]+$/\';\npreg_match($pattern, "Hello123"); // 1',
    },
    tags: ['validation', 'text'],
  },
  {
    name: 'File Extension',
    slug: 'file-extension',
    pattern: '\\.[a-zA-Z0-9]{1,10}$',
    flags: 'i',
    description: 'Extracts or validates file extensions (1-10 character extension after the last dot).',
    examples: {
      match: ['document.pdf', 'image.png', 'archive.tar.gz'],
      noMatch: ['noextension', 'file.', '.'],
    },
    explanation: [
      '\\. — literal dot',
      '[a-zA-Z0-9]{1,10}$ — 1 to 10 alphanumeric characters at end of string',
    ],
    codeSnippets: {
      javascript: 'const regex = /\\.[a-zA-Z0-9]{1,10}$/i;\n"document.pdf".match(regex)?.[0]; // ".pdf"',
      python: 'import re\npattern = r"\\.[a-zA-Z0-9]{1,10}$"\nre.search(pattern, "document.pdf").group()  # ".pdf"',
      php: '$pattern = \'/\\.[a-zA-Z0-9]{1,10}$/i\';\npreg_match($pattern, "document.pdf", $m); // $m[0] = ".pdf"',
    },
    tags: ['extraction', 'file'],
  },
  {
    name: 'Domain Name',
    slug: 'domain-name',
    pattern: '^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,}$',
    flags: 'i',
    description: 'Validates domain names with proper label format and TLD.',
    examples: {
      match: ['example.com', 'sub.domain.co.uk', 'my-site.org'],
      noMatch: ['-example.com', 'example-.com', '.com'],
    },
    explanation: [
      '([a-zA-Z0-9]...[a-zA-Z0-9])? — label: starts/ends with alphanumeric, allows hyphens in between',
      '\\. — dot separator',
      '+ — one or more labels',
      '[a-zA-Z]{2,}$ — TLD of at least 2 letters',
    ],
    codeSnippets: {
      javascript: 'const regex = /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,}$/i;\nregex.test("example.com"); // true',
      python: 'import re\npattern = r"^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,}$"\nbool(re.match(pattern, "example.com", re.IGNORECASE))  # True',
      php: '$pattern = \'/^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,}$/i\';\npreg_match($pattern, "example.com"); // 1',
    },
    tags: ['validation', 'web'],
  },
  {
    name: 'MAC Address',
    slug: 'mac-address',
    pattern: '^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$',
    flags: 'i',
    description: 'Validates MAC addresses in colon or hyphen-separated format (e.g., 00:1A:2B:3C:4D:5E).',
    examples: {
      match: ['00:1A:2B:3C:4D:5E', 'AA-BB-CC-DD-EE-FF', '01:23:45:67:89:ab'],
      noMatch: ['00:1A:2B:3C:4D', 'GG:HH:II:JJ:KK:LL', '001A2B3C4D5E'],
    },
    explanation: [
      '([0-9A-Fa-f]{2}[:-]){5} — five pairs of hex digits followed by colon or hyphen',
      '([0-9A-Fa-f]{2})$ — final pair without separator',
    ],
    codeSnippets: {
      javascript: 'const regex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/i;\nregex.test("00:1A:2B:3C:4D:5E"); // true',
      python: 'import re\npattern = r"^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$"\nbool(re.match(pattern, "00:1A:2B:3C:4D:5E", re.IGNORECASE))  # True',
      php: '$pattern = \'/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/i\';\npreg_match($pattern, "00:1A:2B:3C:4D:5E"); // 1',
    },
    tags: ['validation', 'network'],
  },
  {
    name: 'UUID',
    slug: 'uuid',
    pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$',
    flags: 'i',
    description: 'Validates UUIDs (versions 1-5) in standard 8-4-4-4-12 hexadecimal format.',
    examples: {
      match: ['550e8400-e29b-41d4-a716-446655440000', '6ba7b810-9dad-11d1-80b4-00c04fd430c8'],
      noMatch: ['550e8400-e29b-61d4-a716-446655440000', 'not-a-uuid', '550e8400e29b41d4a716446655440000'],
    },
    explanation: [
      '[0-9a-f]{8} — 8 hex characters (time-low)',
      '[0-9a-f]{4} — 4 hex characters (time-mid)',
      '[1-5][0-9a-f]{3} — version digit (1-5) + 3 hex chars',
      '[89ab][0-9a-f]{3} — variant digit (8,9,a,b) + 3 hex chars',
      '[0-9a-f]{12} — 12 hex characters (node)',
    ],
    codeSnippets: {
      javascript: 'const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;\nregex.test("550e8400-e29b-41d4-a716-446655440000"); // true',
      python: 'import re\npattern = r"^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$"\nbool(re.match(pattern, "550e8400-e29b-41d4-a716-446655440000", re.IGNORECASE))  # True',
      php: '$pattern = \'/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i\';\npreg_match($pattern, "550e8400-e29b-41d4-a716-446655440000"); // 1',
    },
    tags: ['validation', 'developer'],
  },
  {
    name: 'Markdown Link',
    slug: 'markdown-link',
    pattern: '\\[([^\\]]+)\\]\\(([^)]+)\\)',
    flags: 'g',
    description: 'Matches Markdown links in [text](url) format, capturing the link text and URL.',
    examples: {
      match: ['[Google](https://google.com)', '[click here](page.html)', '[img](/path/to/img.png)'],
      noMatch: ['[incomplete](', '(no brackets)', '[empty]()'],
    },
    explanation: [
      '\\[ — opening square bracket',
      '([^\\]]+) — capture group: link text (any chars except ])',
      '\\]\\( — closing bracket + opening parenthesis',
      '([^)]+) — capture group: URL (any chars except ))',
      '\\) — closing parenthesis',
    ],
    codeSnippets: {
      javascript: 'const regex = /\\[([^\\]]+)\\]\\(([^)]+)\\)/g;\nconst match = regex.exec("[Google](https://google.com)");\n// match[1] = "Google", match[2] = "https://google.com"',
      python: 'import re\npattern = r"\\[([^\\]]+)\\]\\(([^)]+)\\)"\nm = re.search(pattern, "[Google](https://google.com)")\n# m.group(1) = "Google", m.group(2) = "https://google.com"',
      php: '$pattern = \'/\\[([^\\]]+)\\]\\(([^)]+)\\)/\';\npreg_match($pattern, "[Google](https://google.com)", $m);\n// $m[1] = "Google", $m[2] = "https://google.com"',
    },
    tags: ['extraction', 'text'],
  },
]

export function getRelatedPatterns(slug: string, tags: string[]): RegexPattern[] {
  return regexPatterns
    .filter((p) => p.slug !== slug && p.tags.some((t) => tags.includes(t)))
    .slice(0, 6)
}
```

- [ ] **Step 2: Verify the data compiles**

Run: `cd /Users/markus/Developer/toolprime && npx tsx -e "const r = require('./src/data/regexPatterns.ts'); console.log(r.regexPatterns.length, 'patterns'); console.log(r.regexPatterns.map(p => p.slug).join(', '))"`

Expected: `25 patterns` and all slugs listed.

- [ ] **Step 3: Commit**

```bash
git add src/data/regexPatterns.ts
git commit -m "feat: add regex patterns data (25 curated patterns)"
```

---

## Task 7: Regex Patterns — SEO + Page Template

**Files:**
- Modify: `src/lib/seo.ts`
- Modify: `src/lib/schema.ts`
- Create: `src/pages/regex/[...slug].astro`

- [ ] **Step 1: Add `getRegexMeta` to `src/lib/seo.ts`**

Add at the end of the file:

```ts
export function getRegexMeta(name: string, slug: string, pattern: string): MetaTags {
  return {
    title: `Regex for ${name} — Pattern & Examples | ${SITE_NAME}`,
    description: `Regular expression for ${name}: /${pattern}/. Includes live tester, examples, breakdown, and code snippets for JavaScript, Python, and PHP.`,
    canonical: `${SITE_URL}/regex/${slug}`,
    ogTitle: `Regex for ${name}`,
    ogDescription: `Regex pattern for ${name} with live tester and code snippets.`,
    ogType: 'website',
  }
}
```

- [ ] **Step 2: Add `regexFaqSchema` to `src/lib/schema.ts`**

Add at the end of the file:

```ts
export function regexFaqSchema(name: string, pattern: string, description: string): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the regex for ${name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The regex pattern for ${name} is: /${pattern}/. ${description}`,
        },
      },
    ],
  })
}
```

- [ ] **Step 3: Create `src/pages/regex/[...slug].astro`**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro'
import Breadcrumbs from '@/components/seo/Breadcrumbs.astro'
import SchemaMarkup from '@/components/seo/SchemaMarkup.astro'
import { regexPatterns, getRelatedPatterns } from '@/data/regexPatterns'
import { getRegexMeta } from '@/lib/seo'
import { regexFaqSchema } from '@/lib/schema'

export function getStaticPaths() {
  return regexPatterns.map((pattern) => ({
    params: { slug: pattern.slug },
    props: { pattern },
  }))
}

const { pattern } = Astro.props
const meta = getRegexMeta(pattern.name, pattern.slug, pattern.pattern)
const related = getRelatedPatterns(pattern.slug, pattern.tags)
---

<BaseLayout {...meta}>
  <SchemaMarkup json={regexFaqSchema(pattern.name, pattern.pattern, pattern.description)} />
  <Breadcrumbs items={[
    { name: 'Regex Tester', url: 'https://toolprime.dev/regex-tester' },
    { name: pattern.name, url: meta.canonical },
  ]} />

  <h1 class="text-3xl font-bold mb-2">Regex for {pattern.name}</h1>
  <p class="text-[var(--color-text-muted)] mb-6">{pattern.description}</p>

  <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 mb-8">
    <p class="text-sm text-[var(--color-text-muted)] mb-1">Pattern</p>
    <div class="flex items-center gap-3">
      <code id="pattern-value" class="flex-1 text-lg font-mono break-all text-[var(--color-primary-text)]">/{pattern.pattern}/{pattern.flags}</code>
      <button id="copy-pattern" class="shrink-0 px-3 py-1.5 text-sm rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-surface-alt)] transition-colors">
        Copy
      </button>
    </div>
  </div>

  <script define:vars={{ regexPattern: pattern.pattern, regexFlags: pattern.flags }}>
    // Copy button
    document.getElementById('copy-pattern').addEventListener('click', function() {
      navigator.clipboard.writeText('/' + regexPattern + '/' + regexFlags)
      this.textContent = 'Copied!'
      setTimeout(() => { this.textContent = 'Copy' }, 2000)
    })

    // Live tester
    const testInput = document.getElementById('test-input')
    const testResult = document.getElementById('test-result')
    if (testInput && testResult) {
      testInput.addEventListener('input', function() {
        const value = this.value
        if (!value) { testResult.textContent = 'Enter a string to test'; testResult.className = 'text-sm text-[var(--color-text-muted)]'; return }
        try {
          const regex = new RegExp(regexPattern, regexFlags)
          if (regex.test(value)) {
            testResult.textContent = 'Match!'
            testResult.className = 'text-sm font-medium text-green-600 dark:text-green-400'
          } else {
            testResult.textContent = 'No match'
            testResult.className = 'text-sm font-medium text-red-600 dark:text-red-400'
          }
        } catch {
          testResult.textContent = 'Invalid regex'
          testResult.className = 'text-sm text-red-600 dark:text-red-400'
        }
      })
    }
  </script>

  <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 mb-8">
    <h2 class="text-lg font-semibold mb-4">Live Tester</h2>
    <input type="text" id="test-input" placeholder="Enter a string to test..."
      class="w-full p-3 rounded-lg border border-[var(--color-border)] text-lg font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] mb-2" />
    <p id="test-result" class="text-sm text-[var(--color-text-muted)]">Enter a string to test</p>
  </div>

  <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 mb-8">
    <h2 class="text-lg font-semibold mb-4">Examples</h2>
    <div class="grid gap-2">
      {pattern.examples.match.map((ex) => (
        <div class="flex items-center gap-2 font-mono text-sm">
          <span class="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center text-xs">✓</span>
          <span>{ex}</span>
        </div>
      ))}
      {pattern.examples.noMatch.map((ex) => (
        <div class="flex items-center gap-2 font-mono text-sm">
          <span class="w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center text-xs">✗</span>
          <span>{ex}</span>
        </div>
      ))}
    </div>
  </div>

  <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 mb-8">
    <h2 class="text-lg font-semibold mb-4">Pattern Breakdown</h2>
    <div class="space-y-2">
      {pattern.explanation.map((part) => (
        <p class="text-sm"><code class="bg-[var(--color-surface-alt)] px-1.5 py-0.5 rounded font-mono">{part.split(' — ')[0]}</code> <span class="text-[var(--color-text-muted)]">— {part.split(' — ')[1]}</span></p>
      ))}
    </div>
  </div>

  <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 mb-8">
    <h2 class="text-lg font-semibold mb-4">Code Snippets</h2>
    <div class="space-y-4">
      <div>
        <h3 class="text-sm font-semibold mb-2">JavaScript</h3>
        <pre class="bg-[var(--color-surface-alt)] p-3 rounded-lg text-sm font-mono overflow-x-auto"><code>{pattern.codeSnippets.javascript}</code></pre>
      </div>
      <div>
        <h3 class="text-sm font-semibold mb-2">Python</h3>
        <pre class="bg-[var(--color-surface-alt)] p-3 rounded-lg text-sm font-mono overflow-x-auto"><code>{pattern.codeSnippets.python}</code></pre>
      </div>
      <div>
        <h3 class="text-sm font-semibold mb-2">PHP</h3>
        <pre class="bg-[var(--color-surface-alt)] p-3 rounded-lg text-sm font-mono overflow-x-auto"><code>{pattern.codeSnippets.php}</code></pre>
      </div>
    </div>
  </div>

  {related.length > 0 && (
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Related Patterns</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {related.map((r) => (
          <a href={`/regex/${r.slug}`}
            class="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] hover:border-[var(--color-primary)] transition-colors">
            <span class="text-sm font-medium">{r.name}</span>
            <span class="block text-xs text-[var(--color-text-muted)] font-mono truncate">/{r.pattern}/</span>
          </a>
        ))}
      </div>
    </div>
  )}
</BaseLayout>
```

- [ ] **Step 4: Build and verify**

Run: `cd /Users/markus/Developer/toolprime && pnpm build 2>&1 | tail -5`

Expected: Build succeeds with 25 new regex pages.

- [ ] **Step 5: Spot-check a page**

Preview the site and check `http://localhost:4321/regex/email-validation`.

- [ ] **Step 6: Commit**

```bash
git add src/lib/seo.ts src/lib/schema.ts src/pages/regex/
git commit -m "feat: add regex pattern pages (25 curated patterns)"
```

---

## Task 8: Gradient Presets — Data File

**Files:**
- Create: `src/data/gradients.ts`

- [ ] **Step 1: Create `src/data/gradients.ts`**

```ts
export interface GradientPreset {
  name: string
  slug: string
  colors: string[]
  direction: number
  category: 'warm' | 'cool' | 'dark' | 'pastel' | 'vibrant'
}

export const gradientPresets: GradientPreset[] = [
  // Warm
  { name: 'Sunset Orange', slug: 'sunset-orange', colors: ['#FF512F', '#F09819'], direction: 135, category: 'warm' },
  { name: 'Warm Flame', slug: 'warm-flame', colors: ['#ff9a9e', '#fad0c4'], direction: 45, category: 'warm' },
  { name: 'Juicy Peach', slug: 'juicy-peach', colors: ['#ffecd2', '#fcb69f'], direction: 135, category: 'warm' },
  { name: 'Mango Pulp', slug: 'mango-pulp', colors: ['#F7971E', '#FFD200'], direction: 90, category: 'warm' },
  { name: 'Autumn Leaves', slug: 'autumn-leaves', colors: ['#D4145A', '#FBB03B'], direction: 135, category: 'warm' },
  { name: 'Golden Hour', slug: 'golden-hour', colors: ['#F2994A', '#F2C94C'], direction: 90, category: 'warm' },

  // Cool
  { name: 'Ocean Blue', slug: 'ocean-blue', colors: ['#2E3192', '#1BFFFF'], direction: 135, category: 'cool' },
  { name: 'Arctic Ice', slug: 'arctic-ice', colors: ['#E0EAFC', '#CFDEF3'], direction: 135, category: 'cool' },
  { name: 'Winter Breeze', slug: 'winter-breeze', colors: ['#89F7FE', '#66A6FF'], direction: 135, category: 'cool' },
  { name: 'Aqua Marine', slug: 'aqua-marine', colors: ['#1A2980', '#26D0CE'], direction: 135, category: 'cool' },
  { name: 'Cool Sky', slug: 'cool-sky', colors: ['#2BC0E4', '#EAECC6'], direction: 135, category: 'cool' },
  { name: 'Pacific Dream', slug: 'pacific-dream', colors: ['#34e89e', '#0f3443'], direction: 135, category: 'cool' },

  // Dark
  { name: 'Midnight Purple', slug: 'midnight-purple', colors: ['#0F0C29', '#302B63', '#24243E'], direction: 135, category: 'dark' },
  { name: 'Deep Space', slug: 'deep-space', colors: ['#000000', '#434343'], direction: 135, category: 'dark' },
  { name: 'Dark Knight', slug: 'dark-knight', colors: ['#BA8B02', '#181818'], direction: 135, category: 'dark' },
  { name: 'Obsidian', slug: 'obsidian', colors: ['#44A08D', '#093637'], direction: 135, category: 'dark' },
  { name: 'Charcoal Mist', slug: 'charcoal-mist', colors: ['#3E5151', '#DECBA4'], direction: 135, category: 'dark' },
  { name: 'Eclipse', slug: 'eclipse', colors: ['#FC5C7D', '#6A82FB'], direction: 135, category: 'dark' },

  // Pastel
  { name: 'Cotton Candy', slug: 'cotton-candy', colors: ['#fbc2eb', '#a6c1ee'], direction: 135, category: 'pastel' },
  { name: 'Lavender Dream', slug: 'lavender-dream', colors: ['#C9D6FF', '#E2E2E2'], direction: 135, category: 'pastel' },
  { name: 'Mint Fresh', slug: 'mint-fresh', colors: ['#00B09B', '#96C93D'], direction: 135, category: 'pastel' },
  { name: 'Peach Blush', slug: 'peach-blush', colors: ['#ffecd2', '#fcb69f'], direction: 90, category: 'pastel' },
  { name: 'Baby Blue', slug: 'baby-blue', colors: ['#E0C3FC', '#8EC5FC'], direction: 135, category: 'pastel' },
  { name: 'Rose Quartz', slug: 'rose-quartz', colors: ['#ffecd2', '#ee9ca7'], direction: 135, category: 'pastel' },

  // Vibrant
  { name: 'Neon Glow', slug: 'neon-glow', colors: ['#00F260', '#0575E6'], direction: 135, category: 'vibrant' },
  { name: 'Electric Purple', slug: 'electric-purple', colors: ['#8E2DE2', '#4A00E0'], direction: 135, category: 'vibrant' },
  { name: 'Cyber Punk', slug: 'cyber-punk', colors: ['#f953c6', '#b91d73'], direction: 135, category: 'vibrant' },
  { name: 'Lime Burst', slug: 'lime-burst', colors: ['#56ab2f', '#a8e063'], direction: 135, category: 'vibrant' },
  { name: 'Hot Pink', slug: 'hot-pink', colors: ['#FF0099', '#493240'], direction: 135, category: 'vibrant' },
  { name: 'Tropical Punch', slug: 'tropical-punch', colors: ['#fc4a1a', '#f7b733'], direction: 135, category: 'vibrant' },
]

export const gradientCategoryLabels: Record<GradientPreset['category'], string> = {
  warm: 'Warm',
  cool: 'Cool',
  dark: 'Dark',
  pastel: 'Pastel',
  vibrant: 'Vibrant',
}

export function getRelatedGradients(slug: string, category: string): GradientPreset[] {
  return gradientPresets
    .filter((g) => g.slug !== slug && g.category === category)
    .slice(0, 6)
}

export function getCssGradient(colors: string[], direction: number): string {
  return `linear-gradient(${direction}deg, ${colors.join(', ')})`
}

export function getTailwindGradient(colors: string[]): string {
  if (colors.length === 2) {
    return `bg-gradient-to-r from-[${colors[0]}] to-[${colors[1]}]`
  }
  if (colors.length === 3) {
    return `bg-gradient-to-r from-[${colors[0]}] via-[${colors[1]}] to-[${colors[2]}]`
  }
  return `bg-gradient-to-r from-[${colors[0]}] to-[${colors[colors.length - 1]}]`
}
```

- [ ] **Step 2: Verify the data compiles**

Run: `cd /Users/markus/Developer/toolprime && npx tsx -e "const g = require('./src/data/gradients.ts'); console.log(g.gradientPresets.length, 'gradients'); console.log(g.getCssGradient(g.gradientPresets[0].colors, g.gradientPresets[0].direction))"`

Expected: `30 gradients` and a valid CSS gradient string.

- [ ] **Step 3: Commit**

```bash
git add src/data/gradients.ts
git commit -m "feat: add gradient preset data (30 curated gradients)"
```

---

## Task 9: Gradient Presets — SEO + Page Template

**Files:**
- Modify: `src/lib/seo.ts`
- Modify: `src/lib/schema.ts`
- Create: `src/pages/gradients/[...slug].astro`

- [ ] **Step 1: Add `getGradientMeta` to `src/lib/seo.ts`**

Add at the end of the file:

```ts
export function getGradientMeta(name: string, slug: string, colors: string[]): MetaTags {
  return {
    title: `${name} Gradient — CSS Code & Preview | ${SITE_NAME}`,
    description: `${name} gradient: ${colors.join(' → ')}. Copy the CSS code, preview with adjustable direction, and get Tailwind classes. Free gradient preset.`,
    canonical: `${SITE_URL}/gradients/${slug}`,
    ogTitle: `${name} Gradient`,
    ogDescription: `CSS gradient: ${colors.join(' → ')}. Copy code instantly.`,
    ogType: 'website',
  }
}
```

- [ ] **Step 2: Add `gradientFaqSchema` to `src/lib/schema.ts`**

Add at the end of the file:

```ts
export function gradientFaqSchema(name: string, cssCode: string): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the CSS code for the ${name} gradient?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The CSS code for the ${name} gradient is: background: ${cssCode};`,
        },
      },
    ],
  })
}
```

- [ ] **Step 3: Create `src/pages/gradients/[...slug].astro`**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro'
import Breadcrumbs from '@/components/seo/Breadcrumbs.astro'
import SchemaMarkup from '@/components/seo/SchemaMarkup.astro'
import { gradientPresets, getRelatedGradients, getCssGradient, getTailwindGradient, gradientCategoryLabels } from '@/data/gradients'
import { getGradientMeta } from '@/lib/seo'
import { gradientFaqSchema } from '@/lib/schema'

export function getStaticPaths() {
  return gradientPresets.map((preset) => ({
    params: { slug: preset.slug },
    props: { preset },
  }))
}

const { preset } = Astro.props
const meta = getGradientMeta(preset.name, preset.slug, preset.colors)
const cssCode = getCssGradient(preset.colors, preset.direction)
const tailwindCode = getTailwindGradient(preset.colors)
const related = getRelatedGradients(preset.slug, preset.category)
const categoryLabel = gradientCategoryLabels[preset.category]
---

<BaseLayout {...meta}>
  <SchemaMarkup json={gradientFaqSchema(preset.name, cssCode)} />
  <Breadcrumbs items={[
    { name: 'CSS Gradient Generator', url: 'https://toolprime.dev/css-gradient-generator' },
    { name: preset.name, url: meta.canonical },
  ]} />

  <h1 class="text-3xl font-bold mb-2">{preset.name} Gradient</h1>
  <p class="text-[var(--color-text-muted)] mb-6">A {categoryLabel.toLowerCase()} gradient from {preset.colors[0]} to {preset.colors[preset.colors.length - 1]}.</p>

  <div id="gradient-preview" class="w-full h-48 rounded-xl mb-8 border border-[var(--color-border)]"
    style={`background: ${cssCode}`}>
  </div>

  <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 mb-8">
    <h2 class="text-lg font-semibold mb-4">CSS Code</h2>
    <div class="flex items-start gap-3">
      <pre id="css-code" class="flex-1 bg-[var(--color-surface-alt)] p-3 rounded-lg text-sm font-mono overflow-x-auto"><code>background: {cssCode};</code></pre>
      <button id="copy-css" class="shrink-0 px-3 py-1.5 text-sm rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-surface-alt)] transition-colors">
        Copy
      </button>
    </div>
  </div>

  <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 mb-8">
    <h2 class="text-lg font-semibold mb-4">Tailwind CSS</h2>
    <pre class="bg-[var(--color-surface-alt)] p-3 rounded-lg text-sm font-mono overflow-x-auto"><code>{tailwindCode}</code></pre>
  </div>

  <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 mb-8">
    <h2 class="text-lg font-semibold mb-4">Adjust Direction</h2>
    <div class="flex items-center gap-4">
      <input type="range" id="direction-slider" min="0" max="360" value={preset.direction}
        class="flex-1" />
      <span id="direction-label" class="text-sm font-mono w-12 text-right">{preset.direction}°</span>
    </div>
  </div>

  <script define:vars={{ colors: preset.colors }}>
    const preview = document.getElementById('gradient-preview')
    const slider = document.getElementById('direction-slider')
    const label = document.getElementById('direction-label')
    const cssCodeEl = document.getElementById('css-code')
    const copyBtn = document.getElementById('copy-css')
    const colorStr = colors.join(', ')

    slider.addEventListener('input', function() {
      const deg = this.value
      const gradient = `linear-gradient(${deg}deg, ${colorStr})`
      preview.style.background = gradient
      label.textContent = deg + '°'
      cssCodeEl.querySelector('code').textContent = `background: ${gradient};`
    })

    copyBtn.addEventListener('click', function() {
      const code = cssCodeEl.querySelector('code').textContent
      navigator.clipboard.writeText(code)
      this.textContent = 'Copied!'
      setTimeout(() => { this.textContent = 'Copy' }, 2000)
    })
  </script>

  <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 mb-8">
    <h2 class="text-lg font-semibold mb-4">Color Stops</h2>
    <div class="flex flex-wrap gap-4">
      {preset.colors.map((color) => (
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 rounded-lg border border-[var(--color-border)]" style={`background: ${color}`}></div>
          <code class="text-sm font-mono">{color}</code>
        </div>
      ))}
    </div>
  </div>

  {related.length > 0 && (
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">More {categoryLabel} Gradients</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {related.map((g) => (
          <a href={`/gradients/${g.slug}`}
            class="rounded-lg border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-primary)] transition-colors">
            <div class="h-20" style={`background: ${getCssGradient(g.colors, g.direction)}`}></div>
            <div class="p-3">
              <span class="text-sm font-medium">{g.name}</span>
              <span class="block text-xs text-[var(--color-text-muted)]">{g.colors.join(' → ')}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )}
</BaseLayout>
```

- [ ] **Step 4: Build and verify**

Run: `cd /Users/markus/Developer/toolprime && pnpm build 2>&1 | tail -5`

Expected: Build succeeds with 30 new gradient pages.

- [ ] **Step 5: Spot-check a page**

Preview the site and check `http://localhost:4321/gradients/sunset-orange`.

- [ ] **Step 6: Commit**

```bash
git add src/lib/seo.ts src/lib/schema.ts src/pages/gradients/
git commit -m "feat: add gradient preset pages (30 curated gradients)"
```

---

## Task 10: Cross-linking — Tool Pages to Programmatic Pages

**Files:**
- Modify: `src/pages/hash-generator.astro`
- Modify: `src/pages/regex-tester.astro`
- Modify: `src/pages/css-gradient-generator.astro`
- Modify: `src/pages/calculators/index.astro`

- [ ] **Step 1: Add hash lookup links to `src/pages/hash-generator.astro`**

After the closing `</section>` tag (line 33), add:

```astro
  <section slot="content" class="mt-8">
    <h2 class="text-xl font-semibold mb-4">Popular Hash Lookups</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
      {['hello', 'password', 'admin', 'test', '123456', 'world', 'example', 'user'].map((word) => (
        <a href={`/hashes/md5-${word}`}
          class="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] hover:border-[var(--color-primary)] transition-colors text-center">
          <span class="text-sm font-medium">MD5 of "{word}"</span>
        </a>
      ))}
    </div>
  </section>
```

- [ ] **Step 2: Add regex pattern links to `src/pages/regex-tester.astro`**

After the closing `</section>` tag (line 35), add:

```astro
  <section slot="content" class="mt-8">
    <h2 class="text-xl font-semibold mb-4">Common Regex Patterns</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {[
        { slug: 'email-validation', name: 'Email' },
        { slug: 'url-validation', name: 'URL' },
        { slug: 'phone-number-us', name: 'Phone (US)' },
        { slug: 'ipv4-address', name: 'IPv4 Address' },
        { slug: 'date-yyyy-mm-dd', name: 'Date (YYYY-MM-DD)' },
        { slug: 'uuid', name: 'UUID' },
      ].map((p) => (
        <a href={`/regex/${p.slug}`}
          class="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] hover:border-[var(--color-primary)] transition-colors">
          <span class="text-sm font-medium">Regex for {p.name}</span>
        </a>
      ))}
    </div>
  </section>
```

- [ ] **Step 3: Add gradient preset links to `src/pages/css-gradient-generator.astro`**

After the closing `</section>` tag (line 29), add:

```astro
  <section slot="content" class="mt-8">
    <h2 class="text-xl font-semibold mb-4">Popular Gradient Presets</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {[
        { slug: 'sunset-orange', name: 'Sunset Orange', colors: ['#FF512F', '#F09819'] },
        { slug: 'ocean-blue', name: 'Ocean Blue', colors: ['#2E3192', '#1BFFFF'] },
        { slug: 'midnight-purple', name: 'Midnight Purple', colors: ['#0F0C29', '#302B63', '#24243E'] },
        { slug: 'cotton-candy', name: 'Cotton Candy', colors: ['#fbc2eb', '#a6c1ee'] },
        { slug: 'neon-glow', name: 'Neon Glow', colors: ['#00F260', '#0575E6'] },
        { slug: 'electric-purple', name: 'Electric Purple', colors: ['#8E2DE2', '#4A00E0'] },
      ].map((g) => (
        <a href={`/gradients/${g.slug}`}
          class="rounded-lg border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-primary)] transition-colors">
          <div class="h-16" style={`background: linear-gradient(135deg, ${g.colors.join(', ')})`}></div>
          <div class="p-2 text-center">
            <span class="text-sm font-medium">{g.name}</span>
          </div>
        </a>
      ))}
    </div>
  </section>
```

- [ ] **Step 4: Add reverse percentage section to `src/pages/calculators/index.astro`**

At the end of the file, before the closing `</BaseLayout>`, add a section for reverse percentages. Import `reversePercentageEntries` from the data file and render a sample grid:

After the existing `{bases.map(...)}` section (line 73), add:

```astro
  <h2 class="text-2xl font-bold mt-12 mb-2">What Percent is X of Y?</h2>
  <p class="text-[var(--color-text-muted)] mb-6">
    Find what percentage one number is of another. Choose a calculation below.
  </p>

  {[100, 200, 500, 1000].map((y) => {
    const entries = reversePercentageEntries.filter((e) => e.y === y).slice(0, 12)
    return entries.length > 0 ? (
      <section class="mb-8">
        <h3 class="text-lg font-semibold mb-3">Percentages of {y}</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
          {entries.map((e) => (
            <a href={`/calculators/${e.slug}`}
              class="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] hover:border-[var(--color-primary)] transition-colors text-center">
              <span class="text-sm font-medium">{e.x} of {e.y}</span>
              <span class="block text-xs text-[var(--color-text-muted)]">= {e.result}%</span>
            </a>
          ))}
        </div>
      </section>
    ) : null
  })}
```

Also update the import line at the top to include `reversePercentageEntries`:

```ts
import { percentages, bases, percentageEntries, reversePercentageEntries } from '@/data/percentages'
```

- [ ] **Step 5: Build and verify**

Run: `cd /Users/markus/Developer/toolprime && pnpm build 2>&1 | tail -5`

Expected: Build succeeds. All tool pages render with their new linking sections.

- [ ] **Step 6: Commit**

```bash
git add src/pages/hash-generator.astro src/pages/regex-tester.astro src/pages/css-gradient-generator.astro src/pages/calculators/index.astro
git commit -m "feat: add cross-links from tool pages to programmatic pages"
```

---

## Task 11: Final Build + Page Count Verification

**Files:** None (verification only)

- [ ] **Step 1: Full build**

Run: `cd /Users/markus/Developer/toolprime && pnpm build`

Expected: Build succeeds with 0 errors. Note total page count from build output.

- [ ] **Step 2: Verify page count**

The total should be approximately:
- 812 (existing) + 150 (hashes) + reverse percentages + 25 (regex) + 30 (gradients) ≈ 1400-1700 pages

- [ ] **Step 3: Spot-check sitemap**

Run: `grep -o '<loc>' dist/sitemap-0.xml | wc -l`

Expected: Count matches total page count from build.

- [ ] **Step 4: Verify no TypeScript errors**

Run: `cd /Users/markus/Developer/toolprime && npx tsc --noEmit`

Expected: No errors.
