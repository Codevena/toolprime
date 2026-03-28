# Phase 3: Programmatic SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand ToolPrime from 62 to ~710+ static pages by adding percentage calculator pages (~648) and expanding unit conversions (~92 new entries).

**Architecture:** Two data-driven page generators following the existing converter pattern — data files define entries, Astro `getStaticPaths()` generates static pages at build time. SEO helpers produce meta tags and structured data. No new dependencies needed.

**Tech Stack:** Astro 6, TypeScript, vanilla JS (client-side calculators), existing CSS variables/design system.

**Spec:** `docs/superpowers/specs/2026-03-28-phase3-programmatic-seo-design.md`

---

## File Map

### Create
| File | Responsibility |
|------|---------------|
| `src/data/percentages.ts` | Percentage/base arrays + generated PercentageEntry list |
| `src/pages/calculators/[...slug].astro` | Individual percentage calculator page template |
| `src/pages/calculators/index.astro` | Percentage calculator index/hub page |

### Modify
| File | Change |
|------|--------|
| `src/data/conversions.ts` | Add ~92 new entries + 3 new categories (energy, pressure, fuel) + new formula functions |
| `src/lib/seo.ts` | Add `getPercentageMeta()` and `getPercentageIndexMeta()` |
| `src/lib/schema.ts` | Add `percentageFaqSchema()` |
| `src/layouts/BaseLayout.astro` | Add `/calculators` link in footer Resources |
| `src/pages/unit-converter.astro` | May need update if it displays category list (new categories) |

---

## Task 1: Percentage Data File

**Files:**
- Create: `src/data/percentages.ts`

- [ ] **Step 1: Create the data file**

```ts
// src/data/percentages.ts
export interface PercentageEntry {
  percentage: number
  base: number
  result: number
  slug: string
}

export const percentages = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 30, 33, 40, 50, 60, 70, 75, 80, 90, 100,
]

export const bases = [
  10, 20, 25, 30, 40, 50, 60, 75, 80, 100, 120, 150, 200, 250, 300, 400, 500, 600, 750, 800,
  1000, 1500, 2000, 2500, 3000, 5000, 10000,
]

function formatResult(value: number): number {
  // Remove floating point noise: 0.30000000000000004 → 0.3
  return parseFloat(value.toPrecision(10))
}

export const percentageEntries: PercentageEntry[] = percentages.flatMap((p) =>
  bases.map((b) => ({
    percentage: p,
    base: b,
    result: formatResult((b * p) / 100),
    slug: `what-is-${p}-percent-of-${b}`,
  }))
)

export function getRelatedByBase(base: number, excludePercentage: number): PercentageEntry[] {
  return percentageEntries
    .filter((e) => e.base === base && e.percentage !== excludePercentage)
    .slice(0, 8)
}

export function getRelatedByPercentage(percentage: number, excludeBase: number): PercentageEntry[] {
  return percentageEntries
    .filter((e) => e.percentage === percentage && e.base !== excludeBase)
    .slice(0, 8)
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `pnpm exec tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/data/percentages.ts
git commit -m "feat: add percentage calculator data file (648 entries)"
```

---

## Task 2: Percentage SEO + Schema Helpers

**Files:**
- Modify: `src/lib/seo.ts`
- Modify: `src/lib/schema.ts`

- [ ] **Step 1: Add percentage meta helper to `src/lib/seo.ts`**

Add after `getConversionMeta()`:

```ts
export function getPercentageMeta(percentage: number, base: number, result: number): MetaTags {
  return {
    title: `What is ${percentage}% of ${base}? Answer: ${result} | ${SITE_NAME}`,
    description: `${percentage}% of ${base} = ${result}. Calculate percentages instantly with our free online percentage calculator. No signup required.`,
    canonical: `${SITE_URL}/calculators/what-is-${percentage}-percent-of-${base}`,
    ogTitle: `What is ${percentage}% of ${base}? Answer: ${result}`,
    ogDescription: `${percentage}% of ${base} = ${result}. Free online percentage calculator.`,
    ogType: 'website',
  }
}

export function getPercentageIndexMeta(): MetaTags {
  return {
    title: `Percentage Calculator — What is X% of Y? | ${SITE_NAME}`,
    description: 'Calculate any percentage instantly. What is X% of Y? Free online percentage calculator with step-by-step explanations. No signup required.',
    canonical: `${SITE_URL}/calculators`,
    ogTitle: `Percentage Calculator — What is X% of Y?`,
    ogDescription: 'Calculate any percentage instantly. Free online calculator.',
    ogType: 'website',
  }
}
```

- [ ] **Step 2: Add percentage FAQ schema to `src/lib/schema.ts`**

Add after `breadcrumbSchema()`:

```ts
export function percentageFaqSchema(percentage: number, base: number, result: number): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is ${percentage}% of ${base}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${percentage}% of ${base} is ${result}. To calculate, multiply ${base} by ${percentage}/100 = ${base} × ${percentage / 100} = ${result}.`,
        },
      },
    ],
  })
}
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `pnpm exec tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/lib/seo.ts src/lib/schema.ts
git commit -m "feat: add percentage SEO meta and FAQ schema helpers"
```

---

## Task 3: Percentage Calculator Page Template

**Files:**
- Create: `src/pages/calculators/[...slug].astro`

- [ ] **Step 1: Create the page template**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro'
import Breadcrumbs from '@/components/seo/Breadcrumbs.astro'
import SchemaMarkup from '@/components/seo/SchemaMarkup.astro'
import { percentageEntries, getRelatedByBase, getRelatedByPercentage } from '@/data/percentages'
import { getPercentageMeta } from '@/lib/seo'
import { percentageFaqSchema } from '@/lib/schema'

export function getStaticPaths() {
  return percentageEntries.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry },
  }))
}

const { entry } = Astro.props
const { percentage, base, result } = entry
const meta = getPercentageMeta(percentage, base, result)
const relatedByBase = getRelatedByBase(base, percentage)
const relatedByPercentage = getRelatedByPercentage(percentage, base)
---

<BaseLayout {...meta}>
  <SchemaMarkup json={percentageFaqSchema(percentage, base, result)} />
  <Breadcrumbs items={[
    { name: 'Percentage Calculator', url: 'https://toolprime.dev/calculators' },
    { name: `${percentage}% of ${base}`, url: meta.canonical },
  ]} />

  <h1 class="text-3xl font-bold mb-2">What is {percentage}% of {base}?</h1>

  <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 mb-8">
    <p class="text-lg text-[var(--color-text-muted)] mb-1">Answer</p>
    <p class="text-4xl font-bold text-[var(--color-primary-text)]">
      {percentage}% of {base} = <span id="answer">{result}</span>
    </p>
  </div>

  <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 mb-8">
    <h2 class="text-lg font-semibold mb-4">Interactive Calculator</h2>
    <div class="flex flex-col sm:flex-row items-center gap-4">
      <div class="flex-1 w-full">
        <label class="block text-sm font-medium mb-1" for="pct-input">Percentage (%)</label>
        <input type="number" id="pct-input" value={percentage}
          class="w-full p-3 rounded-lg border border-[var(--color-border)] text-lg font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
      </div>
      <span class="text-xl text-[var(--color-text-muted)]">of</span>
      <div class="flex-1 w-full">
        <label class="block text-sm font-medium mb-1" for="base-input">Number</label>
        <input type="number" id="base-input" value={base}
          class="w-full p-3 rounded-lg border border-[var(--color-border)] text-lg font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
      </div>
      <span class="text-xl text-[var(--color-text-muted)]">=</span>
      <div class="flex-1 w-full">
        <label class="block text-sm font-medium mb-1">Result</label>
        <input type="text" id="calc-result" value={result} readonly
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
    <h2>How to Calculate {percentage}% of {base}</h2>
    <p>
      To find {percentage}% of {base}, multiply {base} by {percentage / 100}:
    </p>
    <p class="font-mono bg-[var(--color-surface-alt)] p-3 rounded-lg">
      {base} &times; {percentage} / 100 = {base} &times; {percentage / 100} = {result}
    </p>
  </div>

  {relatedByBase.length > 0 && (
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Other Percentages of {base}</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {relatedByBase.map((e) => (
          <a href={`/calculators/${e.slug}`}
            class="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] hover:border-[var(--color-primary)] transition-colors text-center">
            <span class="text-sm font-medium">{e.percentage}% of {e.base}</span>
            <span class="block text-xs text-[var(--color-text-muted)]">= {e.result}</span>
          </a>
        ))}
      </div>
    </div>
  )}

  {relatedByPercentage.length > 0 && (
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">{percentage}% of Other Numbers</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {relatedByPercentage.map((e) => (
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
```

- [ ] **Step 2: Build and verify pages generate**

Run: `pnpm build 2>&1 | tail -5`
Expected: 710 page(s) built (62 existing + 648 new)

- [ ] **Step 3: Commit**

```bash
git add src/pages/calculators/[...slug].astro
git commit -m "feat: add percentage calculator page template (648 pages)"
```

---

## Task 4: Percentage Calculator Index Page

**Files:**
- Create: `src/pages/calculators/index.astro`
- Modify: `src/layouts/BaseLayout.astro` (footer link)

- [ ] **Step 1: Create the index page**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro'
import Breadcrumbs from '@/components/seo/Breadcrumbs.astro'
import { percentages, bases, percentageEntries } from '@/data/percentages'
import { getPercentageIndexMeta } from '@/lib/seo'

const meta = getPercentageIndexMeta()
---

<BaseLayout {...meta}>
  <Breadcrumbs items={[
    { name: 'Percentage Calculator', url: meta.canonical },
  ]} />

  <h1 class="text-3xl font-bold mb-2">Percentage Calculator</h1>
  <p class="text-[var(--color-text-muted)] mb-6">
    What is X% of Y? Find any percentage instantly. Choose a calculation below or use the calculator.
  </p>

  <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 mb-8">
    <h2 class="text-lg font-semibold mb-4">Quick Calculator</h2>
    <div class="flex flex-col sm:flex-row items-center gap-4">
      <div class="flex-1 w-full">
        <label class="block text-sm font-medium mb-1" for="idx-pct">Percentage (%)</label>
        <input type="number" id="idx-pct" value="10"
          class="w-full p-3 rounded-lg border border-[var(--color-border)] text-lg font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
      </div>
      <span class="text-xl text-[var(--color-text-muted)]">of</span>
      <div class="flex-1 w-full">
        <label class="block text-sm font-medium mb-1" for="idx-base">Number</label>
        <input type="number" id="idx-base" value="100"
          class="w-full p-3 rounded-lg border border-[var(--color-border)] text-lg font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
      </div>
      <span class="text-xl text-[var(--color-text-muted)]">=</span>
      <div class="flex-1 w-full">
        <label class="block text-sm font-medium mb-1">Result</label>
        <input type="text" id="idx-result" value="10" readonly
          class="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-lg font-mono" />
      </div>
    </div>
  </div>

  <script>
    const pctInput = document.getElementById('idx-pct') as HTMLInputElement
    const baseInput = document.getElementById('idx-base') as HTMLInputElement
    const resultInput = document.getElementById('idx-result') as HTMLInputElement
    function update() {
      const p = parseFloat(pctInput.value)
      const b = parseFloat(baseInput.value)
      if (isNaN(p) || isNaN(b)) { resultInput.value = ''; return }
      resultInput.value = parseFloat(((b * p) / 100).toPrecision(10)).toString()
    }
    pctInput.addEventListener('input', update)
    baseInput.addEventListener('input', update)
  </script>

  {bases.map((base) => {
    const entries = percentageEntries.filter((e) => e.base === base)
    return (
      <section class="mb-8">
        <h2 class="text-lg font-semibold mb-3">Percentages of {base}</h2>
        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
          {entries.map((e) => (
            <a href={`/calculators/${e.slug}`}
              class="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] hover:border-[var(--color-primary)] transition-colors text-center">
              <span class="text-sm font-medium">{e.percentage}%</span>
              <span class="block text-xs text-[var(--color-text-muted)]">= {e.result}</span>
            </a>
          ))}
        </div>
      </section>
    )
  })}
</BaseLayout>
```

- [ ] **Step 2: Update footer in `src/layouts/BaseLayout.astro`**

In the Resources column, add a link to `/calculators` before the existing Regex Tester link:

```html
<li><a href="/calculators" class="hover:text-[var(--color-text)] transition-colors">Percentage Calculator</a></li>
```

- [ ] **Step 3: Build and verify**

Run: `pnpm build 2>&1 | tail -5`
Expected: 711 page(s) built (62 + 648 + 1 index)

- [ ] **Step 4: Commit**

```bash
git add src/pages/calculators/index.astro src/layouts/BaseLayout.astro
git commit -m "feat: add percentage calculator index page + footer link"
```

---

## Task 5: Expand Unit Conversions — New Categories

**Files:**
- Modify: `src/data/conversions.ts`

This task adds the 3 new categories (energy, pressure, fuel) and their conversion entries. Task 6 expands existing categories.

- [ ] **Step 1: Add new category types and labels**

In `src/data/conversions.ts`, update the `ConversionCategory` type:

```ts
export type ConversionCategory = 'length' | 'weight' | 'temperature' | 'volume' | 'area' | 'speed' | 'time' | 'digital' | 'energy' | 'pressure' | 'fuel'
```

Add to `conversionCategoryLabels`:

```ts
export const conversionCategoryLabels: Record<ConversionCategory, string> = {
  length: 'Length',
  weight: 'Weight & Mass',
  temperature: 'Temperature',
  volume: 'Volume',
  area: 'Area',
  speed: 'Speed',
  time: 'Time',
  digital: 'Digital Storage',
  energy: 'Energy',
  pressure: 'Pressure',
  fuel: 'Fuel Economy',
}
```

- [ ] **Step 2: Add fuel economy formula functions**

Add to `formulaFunctions`:

```ts
export const formulaFunctions: Record<string, (x: number) => number> = {
  '(x * 9/5) + 32': (x) => (x * 9 / 5) + 32,
  '(x - 32) * 5/9': (x) => (x - 32) * 5 / 9,
  'x + 273.15': (x) => x + 273.15,
  'x - 273.15': (x) => x - 273.15,
  '(x - 32) * 5/9 + 273.15': (x) => (x - 32) * 5 / 9 + 273.15,
  '(x - 273.15) * 9/5 + 32': (x) => (x - 273.15) * 9 / 5 + 32,
  '100 / x': (x) => 100 / x,
  '235.215 / x': (x) => 235.215 / x,
}
```

- [ ] **Step 3: Add energy conversions**

Append to the `conversions` array:

```ts
  // Energy
  { from: 'joule', fromAbbr: 'J', to: 'calorie', toAbbr: 'cal', factor: 0.239006, category: 'energy' },
  { from: 'calorie', fromAbbr: 'cal', to: 'joule', toAbbr: 'J', factor: 4.184, category: 'energy' },
  { from: 'kilocalorie', fromAbbr: 'kcal', to: 'joule', toAbbr: 'J', factor: 4184, category: 'energy' },
  { from: 'joule', fromAbbr: 'J', to: 'kilojoule', toAbbr: 'kJ', factor: 0.001, category: 'energy' },
  { from: 'kilojoule', fromAbbr: 'kJ', to: 'kilocalorie', toAbbr: 'kcal', factor: 0.239006, category: 'energy' },
  { from: 'kilocalorie', fromAbbr: 'kcal', to: 'kilojoule', toAbbr: 'kJ', factor: 4.184, category: 'energy' },
  { from: 'kilowatt-hour', fromAbbr: 'kWh', to: 'joule', toAbbr: 'J', factor: 3600000, category: 'energy' },
  { from: 'kilowatt-hour', fromAbbr: 'kWh', to: 'kilocalorie', toAbbr: 'kcal', factor: 860.421, category: 'energy' },
  { from: 'BTU', fromAbbr: 'BTU', to: 'joule', toAbbr: 'J', factor: 1055.06, category: 'energy' },
  { from: 'BTU', fromAbbr: 'BTU', to: 'kilocalorie', toAbbr: 'kcal', factor: 0.251996, category: 'energy' },
  { from: 'watt-hour', fromAbbr: 'Wh', to: 'joule', toAbbr: 'J', factor: 3600, category: 'energy' },
  { from: 'watt-hour', fromAbbr: 'Wh', to: 'kilowatt-hour', toAbbr: 'kWh', factor: 0.001, category: 'energy' },
  { from: 'electronvolt', fromAbbr: 'eV', to: 'joule', toAbbr: 'J', factor: 1.602176634e-19, category: 'energy' },
  { from: 'therm', fromAbbr: 'thm', to: 'BTU', toAbbr: 'BTU', factor: 100000, category: 'energy' },
```

- [ ] **Step 4: Add pressure conversions**

```ts
  // Pressure
  { from: 'pascal', fromAbbr: 'Pa', to: 'bar', toAbbr: 'bar', factor: 0.00001, category: 'pressure' },
  { from: 'bar', fromAbbr: 'bar', to: 'pascal', toAbbr: 'Pa', factor: 100000, category: 'pressure' },
  { from: 'pascal', fromAbbr: 'Pa', to: 'psi', toAbbr: 'psi', factor: 0.000145038, category: 'pressure' },
  { from: 'psi', fromAbbr: 'psi', to: 'pascal', toAbbr: 'Pa', factor: 6894.76, category: 'pressure' },
  { from: 'bar', fromAbbr: 'bar', to: 'psi', toAbbr: 'psi', factor: 14.5038, category: 'pressure' },
  { from: 'psi', fromAbbr: 'psi', to: 'bar', toAbbr: 'bar', factor: 0.0689476, category: 'pressure' },
  { from: 'bar', fromAbbr: 'bar', to: 'atmosphere', toAbbr: 'atm', factor: 0.986923, category: 'pressure' },
  { from: 'atmosphere', fromAbbr: 'atm', to: 'bar', toAbbr: 'bar', factor: 1.01325, category: 'pressure' },
  { from: 'atmosphere', fromAbbr: 'atm', to: 'pascal', toAbbr: 'Pa', factor: 101325, category: 'pressure' },
  { from: 'atmosphere', fromAbbr: 'atm', to: 'psi', toAbbr: 'psi', factor: 14.696, category: 'pressure' },
  { from: 'mmHg', fromAbbr: 'mmHg', to: 'pascal', toAbbr: 'Pa', factor: 133.322, category: 'pressure' },
  { from: 'mmHg', fromAbbr: 'mmHg', to: 'atmosphere', toAbbr: 'atm', factor: 0.00131579, category: 'pressure' },
  { from: 'torr', fromAbbr: 'Torr', to: 'pascal', toAbbr: 'Pa', factor: 133.322, category: 'pressure' },
  { from: 'kilopascal', fromAbbr: 'kPa', to: 'psi', toAbbr: 'psi', factor: 0.145038, category: 'pressure' },
```

- [ ] **Step 5: Add fuel economy conversions**

```ts
  // Fuel Economy
  { from: 'km/L', fromAbbr: 'km/L', to: 'L/100km', toAbbr: 'L/100km', formula: '100 / x', reverseFormula: '100 / x', category: 'fuel' },
  { from: 'km/L', fromAbbr: 'km/L', to: 'mpg (US)', toAbbr: 'mpg', factor: 2.35215, category: 'fuel' },
  { from: 'mpg (US)', fromAbbr: 'mpg', to: 'km/L', toAbbr: 'km/L', factor: 0.425144, category: 'fuel' },
  { from: 'L/100km', fromAbbr: 'L/100km', to: 'mpg (US)', toAbbr: 'mpg', formula: '235.215 / x', reverseFormula: '235.215 / x', category: 'fuel' },
  { from: 'mpg (US)', fromAbbr: 'mpg', to: 'mpg (UK)', toAbbr: 'mpg UK', factor: 1.20095, category: 'fuel' },
  { from: 'mpg (UK)', fromAbbr: 'mpg UK', to: 'mpg (US)', toAbbr: 'mpg', factor: 0.832674, category: 'fuel' },
```

- [ ] **Step 6: Verify TypeScript compiles**

Run: `pnpm exec tsc --noEmit`
Expected: No errors

- [ ] **Step 7: Build and verify new pages**

Run: `pnpm build 2>&1 | tail -5`
Expected: Page count increases (711 + ~34 new conversion pages)

- [ ] **Step 8: Commit**

```bash
git add src/data/conversions.ts
git commit -m "feat: add energy, pressure, fuel economy conversion categories"
```

---

## Task 6: Expand Existing Conversion Categories

**Files:**
- Modify: `src/data/conversions.ts`

- [ ] **Step 1: Add new temperature formula functions**

Add to `formulaFunctions` (if not already added in Task 5):

The formulas `'(x - 32) * 5/9 + 273.15'` and `'(x - 273.15) * 9/5 + 32'` should already be present from Task 5 Step 2.

- [ ] **Step 2: Add new length entries**

Append after existing length entries:

```ts
  { from: 'nautical mile', fromAbbr: 'nmi', to: 'kilometer', toAbbr: 'km', factor: 1.852, category: 'length' },
  { from: 'kilometer', fromAbbr: 'km', to: 'nautical mile', toAbbr: 'nmi', factor: 0.539957, category: 'length' },
  { from: 'mile', fromAbbr: 'mi', to: 'nautical mile', toAbbr: 'nmi', factor: 0.868976, category: 'length' },
  { from: 'micrometer', fromAbbr: 'um', to: 'millimeter', toAbbr: 'mm', factor: 0.001, category: 'length' },
  { from: 'micrometer', fromAbbr: 'um', to: 'inch', toAbbr: 'in', factor: 0.0000393701, category: 'length' },
  { from: 'fathom', fromAbbr: 'ftm', to: 'meter', toAbbr: 'm', factor: 1.8288, category: 'length' },
  { from: 'fathom', fromAbbr: 'ftm', to: 'foot', toAbbr: 'ft', factor: 6, category: 'length' },
  { from: 'league', fromAbbr: 'lea', to: 'kilometer', toAbbr: 'km', factor: 4.828, category: 'length' },
```

- [ ] **Step 3: Add new weight entries**

```ts
  { from: 'milligram', fromAbbr: 'mg', to: 'gram', toAbbr: 'g', factor: 0.001, category: 'weight' },
  { from: 'gram', fromAbbr: 'g', to: 'milligram', toAbbr: 'mg', factor: 1000, category: 'weight' },
  { from: 'microgram', fromAbbr: 'ug', to: 'milligram', toAbbr: 'mg', factor: 0.001, category: 'weight' },
  { from: 'carat', fromAbbr: 'ct', to: 'gram', toAbbr: 'g', factor: 0.2, category: 'weight' },
  { from: 'carat', fromAbbr: 'ct', to: 'ounce', toAbbr: 'oz', factor: 0.00705479, category: 'weight' },
  { from: 'short ton', fromAbbr: 'US t', to: 'kilogram', toAbbr: 'kg', factor: 907.185, category: 'weight' },
  { from: 'short ton', fromAbbr: 'US t', to: 'metric ton', toAbbr: 't', factor: 0.907185, category: 'weight' },
  { from: 'long ton', fromAbbr: 'UK t', to: 'kilogram', toAbbr: 'kg', factor: 1016.05, category: 'weight' },
  { from: 'long ton', fromAbbr: 'UK t', to: 'metric ton', toAbbr: 't', factor: 1.01605, category: 'weight' },
  { from: 'stone', fromAbbr: 'st', to: 'pound', toAbbr: 'lbs', factor: 14, category: 'weight' },
```

- [ ] **Step 4: Add new volume entries**

```ts
  { from: 'pint (US)', fromAbbr: 'pt', to: 'liter', toAbbr: 'L', factor: 0.473176, category: 'volume' },
  { from: 'quart (US)', fromAbbr: 'qt', to: 'liter', toAbbr: 'L', factor: 0.946353, category: 'volume' },
  { from: 'cubic meter', fromAbbr: 'cu m', to: 'liter', toAbbr: 'L', factor: 1000, category: 'volume' },
  { from: 'cubic foot', fromAbbr: 'cu ft', to: 'liter', toAbbr: 'L', factor: 28.3168, category: 'volume' },
  { from: 'cubic inch', fromAbbr: 'cu in', to: 'milliliter', toAbbr: 'mL', factor: 16.3871, category: 'volume' },
  { from: 'teaspoon', fromAbbr: 'tsp', to: 'milliliter', toAbbr: 'mL', factor: 4.92892, category: 'volume' },
  { from: 'imperial gallon', fromAbbr: 'imp gal', to: 'liter', toAbbr: 'L', factor: 4.54609, category: 'volume' },
  { from: 'imperial pint', fromAbbr: 'imp pt', to: 'milliliter', toAbbr: 'mL', factor: 568.261, category: 'volume' },
  { from: 'barrel (oil)', fromAbbr: 'bbl', to: 'liter', toAbbr: 'L', factor: 158.987, category: 'volume' },
```

- [ ] **Step 5: Add new area entries**

```ts
  { from: 'square inch', fromAbbr: 'sq in', to: 'square centimeter', toAbbr: 'sq cm', factor: 6.4516, category: 'area' },
  { from: 'square yard', fromAbbr: 'sq yd', to: 'square meter', toAbbr: 'sq m', factor: 0.836127, category: 'area' },
  { from: 'acre', fromAbbr: 'ac', to: 'hectare', toAbbr: 'ha', factor: 0.404686, category: 'area' },
  { from: 'acre', fromAbbr: 'ac', to: 'square meter', toAbbr: 'sq m', factor: 4046.86, category: 'area' },
  { from: 'square foot', fromAbbr: 'sq ft', to: 'square meter', toAbbr: 'sq m', factor: 0.092903, category: 'area' },
  { from: 'square mile', fromAbbr: 'sq mi', to: 'acre', toAbbr: 'ac', factor: 640, category: 'area' },
```

- [ ] **Step 6: Add new speed, temperature, digital, time entries**

```ts
  // Speed
  { from: 'ft/s', fromAbbr: 'ft/s', to: 'm/s', toAbbr: 'm/s', factor: 0.3048, category: 'speed' },
  { from: 'ft/s', fromAbbr: 'ft/s', to: 'mph', toAbbr: 'mph', factor: 0.681818, category: 'speed' },
  { from: 'mach', fromAbbr: 'Ma', to: 'km/h', toAbbr: 'km/h', factor: 1234.8, category: 'speed' },
  { from: 'mach', fromAbbr: 'Ma', to: 'mph', toAbbr: 'mph', factor: 767.269, category: 'speed' },
  { from: 'knot', fromAbbr: 'kn', to: 'mph', toAbbr: 'mph', factor: 1.15078, category: 'speed' },

  // Temperature
  { from: 'fahrenheit', fromAbbr: '°F', to: 'kelvin', toAbbr: 'K', formula: '(x - 32) * 5/9 + 273.15', reverseFormula: '(x - 273.15) * 9/5 + 32', category: 'temperature' },
  { from: 'kelvin', fromAbbr: 'K', to: 'celsius', toAbbr: '°C', formula: 'x - 273.15', reverseFormula: 'x + 273.15', category: 'temperature' },

  // Digital Storage
  { from: 'bit', fromAbbr: 'bit', to: 'byte', toAbbr: 'B', factor: 0.125, category: 'digital' },
  { from: 'byte', fromAbbr: 'B', to: 'kilobyte (decimal)', toAbbr: 'KB', factor: 0.001, category: 'digital' },
  { from: 'petabyte (decimal)', fromAbbr: 'PB', to: 'terabyte (decimal)', toAbbr: 'TB', factor: 1000, category: 'digital' },
  { from: 'exabyte (decimal)', fromAbbr: 'EB', to: 'petabyte (decimal)', toAbbr: 'PB', factor: 1000, category: 'digital' },
  { from: 'mebibyte', fromAbbr: 'MiB', to: 'megabyte (decimal)', toAbbr: 'MB', factor: 1.048576, category: 'digital' },
  { from: 'gibibyte', fromAbbr: 'GiB', to: 'gigabyte (decimal)', toAbbr: 'GB', factor: 1.073742, category: 'digital' },

  // Time
  { from: 'second', fromAbbr: 's', to: 'millisecond', toAbbr: 'ms', factor: 1000, category: 'time' },
  { from: 'minute', fromAbbr: 'min', to: 'second', toAbbr: 's', factor: 60, category: 'time' },
  { from: 'month', fromAbbr: 'mo', to: 'day', toAbbr: 'd', factor: 30.4375, category: 'time' },
  { from: 'month', fromAbbr: 'mo', to: 'week', toAbbr: 'wk', factor: 4.34821, category: 'time' },
  { from: 'decade', fromAbbr: 'dec', to: 'year', toAbbr: 'yr', factor: 10, category: 'time' },
  { from: 'century', fromAbbr: 'c', to: 'year', toAbbr: 'yr', factor: 100, category: 'time' },
  { from: 'microsecond', fromAbbr: 'us', to: 'millisecond', toAbbr: 'ms', factor: 0.001, category: 'time' },
  { from: 'nanosecond', fromAbbr: 'ns', to: 'microsecond', toAbbr: 'us', factor: 0.001, category: 'time' },
```

- [ ] **Step 7: Verify TypeScript compiles**

Run: `pnpm exec tsc --noEmit`
Expected: No errors

- [ ] **Step 8: Build and count pages**

Run: `pnpm build 2>&1 | tail -5`
Expected: ~800+ pages total

- [ ] **Step 9: Commit**

```bash
git add src/data/conversions.ts
git commit -m "feat: expand unit conversions with ~58 new entries across all categories"
```

---

## Task 7: Update Unit Converter Page for New Categories

**Files:**
- Modify: `src/pages/unit-converter.astro` (if it displays categories)

- [ ] **Step 1: Read the unit converter page and check if it lists categories**

Read `src/pages/unit-converter.astro` to see if the new energy/pressure/fuel categories need to be reflected in the UI.

- [ ] **Step 2: Update if needed**

If the page iterates over `conversionCategoryLabels`, the new categories will appear automatically. Verify this in the dev server or build output.

- [ ] **Step 3: Build and verify**

Run: `pnpm build 2>&1 | tail -5`
Expected: Build succeeds with no errors

- [ ] **Step 4: Commit (if changes needed)**

```bash
git add src/pages/unit-converter.astro
git commit -m "fix: update unit converter page for new categories"
```

---

## Task 8: Final Build Verification + Spot Check

- [ ] **Step 1: Full build**

Run: `pnpm build`
Expected: ~800+ pages, 0 errors

- [ ] **Step 2: Preview and spot-check**

Run: `pnpm preview`

Check in browser:
- `http://localhost:4321/calculators` — index page loads, all links work
- `http://localhost:4321/calculators/what-is-15-percent-of-200` — answer shows 30, calculator works, related links work
- `http://localhost:4321/calculators/what-is-1-percent-of-10000` — edge case, answer 100
- `http://localhost:4321/converters/j-to-cal` — new energy conversion
- `http://localhost:4321/converters/pa-to-bar` — new pressure conversion
- `http://localhost:4321/converters/kml-to-l100km` — new fuel conversion

- [ ] **Step 3: Check sitemap includes new pages**

Run: `ls -la dist/sitemap-*.xml && wc -l dist/sitemap-*.xml`
Expected: Sitemap files exist with hundreds of URL entries

- [ ] **Step 4: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: address issues found during final verification"
```
