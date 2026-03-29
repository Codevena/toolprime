# Phase 5a: Audience-Split Navigation + 4 New Tools Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add audience-split navigation (3 hub pages), 4 new interactive tools (Currency Converter, Age Calculator, Fraction Calculator, Number Base Converter), and ~31,000 programmatic SEO pages, growing the site from ~4,320 to ~35,000+ pages.

**Architecture:** Each tool follows the established pattern: data file → React component → Astro page → pSEO template via `getStaticPaths()`. The existing `/convert/[...slug].astro` route is extended to handle currency and number-base pSEO pages alongside format conversions using a discriminated union. A new `/calculate/[...slug].astro` route handles age and fraction pSEO pages. Hub landing pages (`/everyday`, `/developer`, `/design`) are additive — existing tool URLs remain unchanged.

**Tech Stack:** Astro 6, React 19, TypeScript 5.9, Tailwind CSS 4, Lucide React, Satori + Sharp (OG images)

**Routing decisions:**
- `/convert/[...slug].astro` — extended with currency + number-base entries (discriminated union on props)
- `/calculate/[...slug].astro` — new file for age + fraction entries
- `/currency/[...slug].astro` — new file for currency hub pages (50 pages, one per currency)
- `/everyday.astro`, `/developer.astro`, `/design.astro` — new hub landing pages

**Parallelization:** Tasks 3–6 are fully independent and should be dispatched to parallel subagents. Tasks 1–2 must complete first (shared infrastructure). Tasks 7–9 run after tools are built.

---

## File Structure

### New Files

```
src/data/currencyData.ts              — Currency definitions, amounts, rate types, pSEO entry generation
src/data/ageData.ts                   — Birth year/month ranges, generation definitions, pSEO entries
src/data/fractionData.ts              — Fraction definitions, operation combos, decimal/percent entries
src/data/numberBaseData.ts            — Number ranges, base definitions, ASCII table, pSEO entries
src/data/audienceHubs.ts              — Hub definitions mapping tools to audiences

src/components/tools/CurrencyConverter.tsx   — Interactive currency converter with amount/currency selectors
src/components/tools/AgeCalculator.tsx       — Interactive age calculator with date picker
src/components/tools/FractionCalculator.tsx  — Interactive fraction calculator with operation selector
src/components/tools/NumberBaseConverter.tsx  — Interactive number base converter

src/components/pseo/CurrencyConversionPage.astro   — pSEO template for /convert/100-usd-to-eur pages
src/components/pseo/CurrencyHubPage.astro           — pSEO template for /currency/usd pages
src/components/pseo/AgeCalculationPage.astro         — pSEO template for /calculate/age-born-1990 pages
src/components/pseo/FractionCalculationPage.astro    — pSEO template for /calculate/1-2-plus-1-3 pages
src/components/pseo/NumberBaseConversionPage.astro   — pSEO template for /convert/255-to-binary pages

src/pages/currency-converter.astro    — Currency Converter tool page
src/pages/age-calculator.astro        — Age Calculator tool page
src/pages/fraction-calculator.astro   — Fraction Calculator tool page
src/pages/number-base-converter.astro — Number Base Converter tool page

src/pages/currency/[...slug].astro    — Currency hub pSEO pages (50 pages)
src/pages/everyday.astro              — Everyday Tools hub landing page
src/pages/developer.astro             — Developer Tools hub landing page
src/pages/design.astro                — Design Tools hub landing page
```

### Modified Files

```
src/data/tools.ts                     — Add 4 new tools + audience mapping type/data
src/data/faqs.ts                      — Add FAQs for 4 new tools
src/data/tool-content.ts              — Import new tool content file
src/data/tool-content-12.ts (new)     — SEO content for 4 new tools
src/lib/seo.ts                        — Add meta functions for currency, age, fraction, number-base pages
src/lib/schema.ts                     — Add schema functions for new page types
src/lib/og-image.ts                   — Add icon abbreviations for 4 new tools
src/pages/convert/[...slug].astro     — Extend getStaticPaths with currency + number-base entries
src/pages/calculate/[...slug].astro   — New file: age + fraction pSEO entries
src/layouts/BaseLayout.astro          — Update header nav with hub links
src/components/MobileNav.tsx          — Update mobile nav with hub links
src/pages/og/[id].png.ts              — Auto-picks up new tools (no change needed if tools array is used)
src/pages/index.astro                 — Update hero badge count, add hub CTA links
```

---

## Task 1: Tool Registry + Audience Mapping Infrastructure

**Files:**
- Modify: `src/data/tools.ts`
- Create: `src/data/audienceHubs.ts`

**Why first:** All other tasks depend on tools being registered and the audience type existing.

- [ ] **Step 1: Add audience type and mapping to `src/data/tools.ts`**

Add a new `ToolAudience` type and audience mapping after the existing category types. Do NOT change the existing `ToolCategory` type — audience is orthogonal to category.

```typescript
// Add after line 1 (after the import)
export type ToolAudience = 'everyday' | 'developer' | 'design'

// Add after categoryColors (line ~43)
export const audienceLabels: Record<ToolAudience, string> = {
  everyday: 'Everyday Tools',
  developer: 'Developer Tools',
  design: 'Design Tools',
}

export const audienceGradients: Record<ToolAudience, string> = {
  everyday: 'linear-gradient(135deg, #34d399, #06b6d4)',
  developer: 'linear-gradient(135deg, #818cf8, #6366f1)',
  design: 'linear-gradient(135deg, #fb923c, #f97316)',
}

export const toolAudienceMap: Record<string, ToolAudience> = {
  // Everyday Tools
  'word-counter': 'everyday',
  'case-converter': 'everyday',
  'unit-converter': 'everyday',
  'percentage-calculator': 'everyday',
  'qr-code-generator': 'everyday',
  'bmi-calculator': 'everyday',
  'tip-calculator': 'everyday',
  'mortgage-calculator': 'everyday',
  'invoice-generator': 'everyday',
  'currency-converter': 'everyday',
  'age-calculator': 'everyday',
  'fraction-calculator': 'everyday',
  // Developer Tools
  'json-formatter': 'developer',
  'base64-encoder': 'developer',
  'url-encoder': 'developer',
  'password-generator': 'developer',
  'hash-generator': 'developer',
  'timestamp-converter': 'developer',
  'regex-tester': 'developer',
  'sql-formatter': 'developer',
  'diff-checker': 'developer',
  'markdown-editor': 'developer',
  'markdown-to-pdf': 'developer',
  'json-to-csv': 'developer',
  'image-to-base64': 'developer',
  'meta-tag-generator': 'developer',
  'robots-txt-generator': 'developer',
  'cron-expression-generator': 'developer',
  'number-base-converter': 'developer',
  // Design Tools
  'image-compressor': 'design',
  'css-gradient-generator': 'design',
  'favicon-generator': 'design',
  'color-palette-generator': 'design',
}

export function getToolsByAudience(audience: ToolAudience): Tool[] {
  return tools.filter((t) => toolAudienceMap[t.id] === audience)
}
```

- [ ] **Step 2: Register 4 new tools in the `tools` array**

Add these 4 entries to the `tools` array in `src/data/tools.ts`:

```typescript
  {
    id: 'currency-converter',
    name: 'Currency Converter',
    description: 'Convert between 50+ world currencies and crypto with live exchange rates. Free, instant, no signup.',
    longDescription: 'Convert any amount between 50+ fiat currencies and popular cryptocurrencies. See exchange rates, conversion tables, and historical context.',
    category: 'math',
    path: '/currency-converter',
    icon: 'DollarSign',
    keywords: ['currency', 'exchange rate', 'usd', 'eur', 'bitcoin', 'crypto', 'forex', 'money'],
    relatedTools: ['unit-converter', 'percentage-calculator', 'tip-calculator'],
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate your exact age in years, months, and days from any birth date. Free online age calculator.',
    longDescription: 'Enter your date of birth to instantly see your exact age broken down into years, months, days, hours, and minutes. Includes zodiac sign and generation info.',
    category: 'math',
    path: '/age-calculator',
    icon: 'Calendar',
    keywords: ['age', 'birthday', 'birth date', 'how old', 'years old', 'date of birth'],
    relatedTools: ['percentage-calculator', 'bmi-calculator', 'fraction-calculator'],
  },
  {
    id: 'fraction-calculator',
    name: 'Fraction Calculator',
    description: 'Add, subtract, multiply, and divide fractions. Convert decimals to fractions and vice versa.',
    longDescription: 'Perform arithmetic operations on fractions with step-by-step solutions. Convert between fractions, decimals, and percentages instantly.',
    category: 'math',
    path: '/fraction-calculator',
    icon: 'Divide',
    keywords: ['fraction', 'numerator', 'denominator', 'simplify', 'mixed number', 'decimal to fraction'],
    relatedTools: ['percentage-calculator', 'number-base-converter', 'age-calculator'],
  },
  {
    id: 'number-base-converter',
    name: 'Number Base Converter',
    description: 'Convert numbers between binary, octal, decimal, and hexadecimal. Includes ASCII table lookup.',
    longDescription: 'Convert numbers between base 2 (binary), base 8 (octal), base 10 (decimal), base 16 (hexadecimal), and base 32. Includes an interactive ASCII reference table.',
    category: 'developer',
    path: '/number-base-converter',
    icon: 'Binary',
    keywords: ['binary', 'hexadecimal', 'octal', 'decimal', 'base converter', 'ascii', 'hex'],
    relatedTools: ['hash-generator', 'base64-encoder', 'json-formatter'],
  },
```

- [ ] **Step 3: Create `src/data/audienceHubs.ts`**

```typescript
import type { ToolAudience } from './tools'

export interface AudienceHub {
  audience: ToolAudience
  title: string
  description: string
  heading: string
  subheading: string
  gradient: string
  subcategories: {
    name: string
    toolIds: string[]
  }[]
}

export const audienceHubs: AudienceHub[] = [
  {
    audience: 'everyday',
    title: 'Free Everyday Tools — Calculators, Converters & More | ToolPrime',
    description: 'Free online calculators, converters, and everyday tools. Currency converter, age calculator, percentage calculator, BMI calculator, and more. No signup required.',
    heading: 'Everyday Tools',
    subheading: 'Calculators, converters, and utilities for daily life — all free, all private.',
    gradient: 'linear-gradient(135deg, #34d399, #06b6d4)',
    subcategories: [
      {
        name: 'Calculators',
        toolIds: ['age-calculator', 'fraction-calculator', 'percentage-calculator', 'bmi-calculator', 'tip-calculator', 'mortgage-calculator'],
      },
      {
        name: 'Converters',
        toolIds: ['currency-converter', 'unit-converter'],
      },
      {
        name: 'Text Tools',
        toolIds: ['word-counter', 'case-converter'],
      },
      {
        name: 'File & Business Tools',
        toolIds: ['qr-code-generator', 'invoice-generator'],
      },
    ],
  },
  {
    audience: 'developer',
    title: 'Free Developer Tools — Formatters, Generators & Converters | ToolPrime',
    description: 'Free online developer tools. JSON formatter, regex tester, hash generator, cron expression builder, Base64 encoder, and more. All processing in your browser.',
    heading: 'Developer Tools',
    subheading: 'Formatters, generators, and converters built for developers — fast and private.',
    gradient: 'linear-gradient(135deg, #818cf8, #6366f1)',
    subcategories: [
      {
        name: 'Formatters',
        toolIds: ['json-formatter', 'sql-formatter', 'markdown-editor', 'markdown-to-pdf'],
      },
      {
        name: 'Generators',
        toolIds: ['password-generator', 'hash-generator', 'cron-expression-generator', 'regex-tester', 'robots-txt-generator', 'meta-tag-generator'],
      },
      {
        name: 'Converters',
        toolIds: ['base64-encoder', 'url-encoder', 'timestamp-converter', 'json-to-csv', 'image-to-base64', 'number-base-converter'],
      },
    ],
  },
  {
    audience: 'design',
    title: 'Free Design Tools — Colors, Images & Gradients | ToolPrime',
    description: 'Free online design tools. Color palette generator, CSS gradient builder, image compressor, and favicon generator. No signup, runs in your browser.',
    heading: 'Design Tools',
    subheading: 'Color, image, and layout tools for designers — instant results, zero uploads.',
    gradient: 'linear-gradient(135deg, #fb923c, #f97316)',
    subcategories: [
      {
        name: 'Colors',
        toolIds: ['color-palette-generator', 'css-gradient-generator'],
      },
      {
        name: 'Images',
        toolIds: ['image-compressor', 'favicon-generator', 'image-to-base64'],
      },
    ],
  },
]
```

- [ ] **Step 4: Verify build**

Run: `pnpm build 2>&1 | tail -20`
Expected: Build completes with 0 errors. Page count stays at ~4320 (no new pages yet).

- [ ] **Step 5: Commit**

```bash
git add src/data/tools.ts src/data/audienceHubs.ts
git commit -m "feat: register 4 new tools + audience mapping infrastructure"
```

---

## Task 2: SEO & Schema Utilities for All New Page Types

**Files:**
- Modify: `src/lib/seo.ts`
- Modify: `src/lib/schema.ts`

**Why second:** All pSEO page tasks (3–6) depend on these utility functions existing.

- [ ] **Step 1: Add meta functions to `src/lib/seo.ts`**

Add these functions at the end of the file:

```typescript
// Currency conversion pSEO pages
export function getCurrencyConversionMeta(
  amount: number,
  fromCode: string,
  fromName: string,
  toCode: string,
  toName: string,
  result: number,
): MetaTags {
  const title = `${amount} ${fromCode} to ${toCode} — ${result.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${toCode} | ${SITE_NAME}`
  const desc = `Convert ${amount} ${fromName} (${fromCode}) to ${toName} (${toCode}). ${amount} ${fromCode} = ${result.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${toCode}. Free currency converter.`
  return {
    title: title.length > 60 ? `${amount} ${fromCode} to ${toCode} | ${SITE_NAME}` : title,
    description: desc.length > 160 ? desc.slice(0, 157) + '...' : desc,
    canonical: `${SITE_URL}/convert/${amount}-${fromCode.toLowerCase()}-to-${toCode.toLowerCase()}`,
    ogTitle: `${amount} ${fromCode} to ${toCode}`,
    ogDescription: desc,
    ogType: 'website',
  }
}

// Currency hub pages (/currency/usd)
export function getCurrencyHubMeta(code: string, name: string): MetaTags {
  return {
    title: `${name} (${code}) — Exchange Rates & Converter | ${SITE_NAME}`,
    description: `${name} (${code}) exchange rates against 50+ currencies. Convert ${code} to USD, EUR, GBP, and more. Free online currency converter.`,
    canonical: `${SITE_URL}/currency/${code.toLowerCase()}`,
    ogTitle: `${name} (${code}) — Exchange Rates`,
    ogDescription: `Current ${name} exchange rates and converter.`,
    ogType: 'website',
  }
}

// Age calculator pSEO pages
export function getAgeMeta(birthYear: number, birthMonth?: string): MetaTags {
  const now = new Date()
  const currentYear = now.getFullYear()
  const ageApprox = currentYear - birthYear
  const monthPart = birthMonth ? ` ${birthMonth}` : ''
  const slug = birthMonth
    ? `age-born-${birthMonth.toLowerCase()}-${birthYear}`
    : `age-born-${birthYear}`
  return {
    title: `How Old Am I If Born in${monthPart} ${birthYear}? — ${ageApprox} Years | ${SITE_NAME}`,
    description: `If you were born in${monthPart} ${birthYear}, you are approximately ${ageApprox} years old. Calculate your exact age in years, months, and days.`,
    canonical: `${SITE_URL}/calculate/${slug}`,
    ogTitle: `Age Calculator — Born${monthPart} ${birthYear}`,
    ogDescription: `Born in${monthPart} ${birthYear}? You're about ${ageApprox} years old.`,
    ogType: 'website',
  }
}

// Fraction calculator pSEO pages
export function getFractionMeta(
  n1: number, d1: number,
  op: string, opSymbol: string,
  n2: number, d2: number,
  resultN: number, resultD: number,
): MetaTags {
  const expr = `${n1}/${d1} ${opSymbol} ${n2}/${d2}`
  const result = `${resultN}/${resultD}`
  const slug = `${n1}-${d1}-${op}-${n2}-${d2}`
  return {
    title: `${expr} = ${result} — Fraction Calculator | ${SITE_NAME}`,
    description: `Calculate ${expr}. The answer is ${result}. Step-by-step solution with our free fraction calculator.`,
    canonical: `${SITE_URL}/calculate/${slug}`,
    ogTitle: `${expr} = ?`,
    ogDescription: `${expr} = ${result}. Step-by-step fraction calculation.`,
    ogType: 'website',
  }
}

// Decimal-to-fraction pSEO pages
export function getDecimalToFractionMeta(decimal: number, n: number, d: number): MetaTags {
  return {
    title: `${decimal} as a Fraction — ${n}/${d} | ${SITE_NAME}`,
    description: `${decimal} as a fraction is ${n}/${d}. Convert decimals to fractions instantly with our free calculator.`,
    canonical: `${SITE_URL}/convert/${String(decimal).replace('.', '-')}-to-fraction`,
    ogTitle: `${decimal} as a Fraction`,
    ogDescription: `${decimal} = ${n}/${d}`,
    ogType: 'website',
  }
}

// Number base conversion pSEO pages
export function getNumberBaseMeta(
  value: number,
  fromBase: string,
  toBase: string,
  result: string,
): MetaTags {
  const slug = `${value}-to-${toBase}`
  return {
    title: `${value} in ${toBase.charAt(0).toUpperCase() + toBase.slice(1)} — ${result} | ${SITE_NAME}`,
    description: `${value} (decimal) converted to ${toBase} is ${result}. Free number base converter for binary, octal, hex, and more.`,
    canonical: `${SITE_URL}/convert/${slug}`,
    ogTitle: `${value} in ${toBase}`,
    ogDescription: `${value} = ${result} (${toBase})`,
    ogType: 'website',
  }
}

// ASCII lookup pSEO pages
export function getAsciiMeta(code: number, char: string): MetaTags {
  const displayChar = code >= 33 && code <= 126 ? char : `(${char})`
  return {
    title: `ASCII ${code} — ${displayChar} | ASCII Table | ${SITE_NAME}`,
    description: `ASCII code ${code} represents the character "${char}". Binary: ${code.toString(2)}, Hex: ${code.toString(16).toUpperCase()}, Octal: ${code.toString(8)}.`,
    canonical: `${SITE_URL}/convert/ascii-${code}`,
    ogTitle: `ASCII ${code} = ${displayChar}`,
    ogDescription: `ASCII ${code} character lookup with binary, hex, and octal values.`,
    ogType: 'website',
  }
}

// Hub pages
export function getHubMeta(title: string, description: string, path: string): MetaTags {
  return {
    title,
    description,
    canonical: `${SITE_URL}${path}`,
    ogTitle: title.split('|')[0].trim(),
    ogDescription: description,
    ogType: 'website',
  }
}
```

- [ ] **Step 2: Add schema functions to `src/lib/schema.ts`**

Add these functions at the end of the file:

```typescript
// Currency conversion FAQ schema
export function currencyFaqSchema(
  amount: number,
  fromCode: string,
  toCode: string,
  result: number,
  rate: number,
): string {
  return faqPageSchema([
    {
      question: `How much is ${amount} ${fromCode} in ${toCode}?`,
      answer: `${amount} ${fromCode} equals approximately ${result.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${toCode} at the current exchange rate of 1 ${fromCode} = ${rate} ${toCode}.`,
    },
    {
      question: `What is the ${fromCode} to ${toCode} exchange rate?`,
      answer: `The current exchange rate is 1 ${fromCode} = ${rate} ${toCode}. Rates are updated daily.`,
    },
    {
      question: `Is this currency converter free?`,
      answer: `Yes, ToolPrime's currency converter is 100% free with no signup required. It supports 50+ currencies including cryptocurrencies.`,
    },
  ])
}

// Age calculator FAQ schema
export function ageFaqSchema(birthYear: number, ageYears: number, birthMonth?: string): string {
  const monthPart = birthMonth ? ` ${birthMonth}` : ''
  return faqPageSchema([
    {
      question: `How old am I if I was born in${monthPart} ${birthYear}?`,
      answer: `If you were born in${monthPart} ${birthYear}, you are approximately ${ageYears} years old as of ${new Date().getFullYear()}.`,
    },
    {
      question: `What generation is someone born in ${birthYear}?`,
      answer: getGenerationAnswer(birthYear),
    },
    {
      question: `How do I calculate my exact age?`,
      answer: `Subtract your birth date from today's date. Our age calculator handles this automatically, giving you your exact age in years, months, and days.`,
    },
  ])
}

function getGenerationAnswer(year: number): string {
  if (year >= 1997) return `Someone born in ${year} belongs to Generation Z (born 1997–2012) or Generation Alpha (born 2013+).`
  if (year >= 1981) return `Someone born in ${year} is a Millennial (Generation Y), born between 1981 and 1996.`
  if (year >= 1965) return `Someone born in ${year} belongs to Generation X, born between 1965 and 1980.`
  if (year >= 1946) return `Someone born in ${year} is a Baby Boomer, born between 1946 and 1964.`
  return `Someone born in ${year} belongs to the Silent Generation (born 1928–1945) or earlier.`
}

// Fraction calculator FAQ schema
export function fractionFaqSchema(
  n1: number, d1: number,
  opSymbol: string,
  n2: number, d2: number,
  resultN: number, resultD: number,
): string {
  return faqPageSchema([
    {
      question: `What is ${n1}/${d1} ${opSymbol} ${n2}/${d2}?`,
      answer: `${n1}/${d1} ${opSymbol} ${n2}/${d2} = ${resultN}/${resultD}.`,
    },
    {
      question: `How do you ${opSymbol === '+' ? 'add' : opSymbol === '-' ? 'subtract' : opSymbol === '×' ? 'multiply' : 'divide'} fractions?`,
      answer: opSymbol === '+' || opSymbol === '-'
        ? `To ${opSymbol === '+' ? 'add' : 'subtract'} fractions, find a common denominator, then ${opSymbol === '+' ? 'add' : 'subtract'} the numerators.`
        : opSymbol === '×'
          ? `To multiply fractions, multiply the numerators together and the denominators together, then simplify.`
          : `To divide fractions, multiply the first fraction by the reciprocal of the second.`,
    },
  ])
}

// Number base conversion FAQ schema
export function numberBaseFaqSchema(value: number, toBase: string, result: string): string {
  return faqPageSchema([
    {
      question: `What is ${value} in ${toBase}?`,
      answer: `${value} in ${toBase} is ${result}.`,
    },
    {
      question: `How do you convert decimal to ${toBase}?`,
      answer: toBase === 'binary'
        ? `Divide the number by 2 repeatedly, recording remainders. Read the remainders bottom-to-top.`
        : toBase === 'hexadecimal'
          ? `Divide the number by 16 repeatedly, recording remainders (using A-F for 10-15). Read bottom-to-top.`
          : `Divide the number by ${toBase === 'octal' ? '8' : 'the base'} repeatedly, recording remainders. Read bottom-to-top.`,
    },
  ])
}
```

- [ ] **Step 3: Verify build**

Run: `pnpm build 2>&1 | tail -20`
Expected: Build completes with 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/lib/seo.ts src/lib/schema.ts
git commit -m "feat: add SEO meta + schema utilities for phase 5a page types"
```

---

## Task 3: Currency Converter (Hero Tool)

**Files:**
- Create: `src/data/currencyData.ts`
- Create: `src/components/tools/CurrencyConverter.tsx`
- Create: `src/pages/currency-converter.astro`
- Create: `src/components/pseo/CurrencyConversionPage.astro`
- Create: `src/components/pseo/CurrencyHubPage.astro`
- Create: `src/pages/currency/[...slug].astro`
- Modify: `src/pages/convert/[...slug].astro`

**Parallelizable:** Yes — independent of Tasks 4, 5, 6.

### Step-by-step

- [ ] **Step 1: Create `src/data/currencyData.ts`**

This file defines currencies, amounts, and generates all pSEO entries at build time.

```typescript
export interface Currency {
  code: string
  name: string
  symbol: string
  flag: string // emoji flag
  isCrypto?: boolean
}

export const currencies: Currency[] = [
  // Major fiat currencies (50)
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰' },
  { code: 'TWD', name: 'New Taiwan Dollar', symbol: 'NT$', flag: '🇹🇼' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰' },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', flag: '🇵🇱' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', flag: '🇨🇿' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', flag: '🇭🇺' },
  { code: 'RON', name: 'Romanian Leu', symbol: 'lei', flag: '🇷🇴' },
  { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв', flag: '🇧🇬' },
  { code: 'HRK', name: 'Croatian Kuna', symbol: 'kn', flag: '🇭🇷' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'Mex$', flag: '🇲🇽' },
  { code: 'ARS', name: 'Argentine Peso', symbol: 'AR$', flag: '🇦🇷' },
  { code: 'CLP', name: 'Chilean Peso', symbol: 'CL$', flag: '🇨🇱' },
  { code: 'COP', name: 'Colombian Peso', symbol: 'COL$', flag: '🇨🇴' },
  { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/.', flag: '🇵🇪' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', flag: '🇳🇬' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£', flag: '🇪🇬' },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', flag: '🇰🇪' },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: 'GH₵', flag: '🇬🇭' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', flag: '🇮🇱' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', flag: '🇵🇭' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', flag: '🇻🇳' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', flag: '🇵🇰' },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', flag: '🇧🇩' },
  { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '₴', flag: '🇺🇦' },
  // Crypto (4)
  { code: 'BTC', name: 'Bitcoin', symbol: '₿', flag: '🪙', isCrypto: true },
  { code: 'ETH', name: 'Ethereum', symbol: 'Ξ', flag: '🪙', isCrypto: true },
  { code: 'SOL', name: 'Solana', symbol: 'SOL', flag: '🪙', isCrypto: true },
  { code: 'DOGE', name: 'Dogecoin', symbol: 'Ð', flag: '🪙', isCrypto: true },
]

export const pSeoAmounts = [1, 5, 10, 50, 100, 500, 1000, 5000, 10000]

// Top 10 fiat currencies generate pages against ALL other currencies.
// Remaining currencies generate pages only against USD, EUR, GBP.
const topCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'CAD', 'AUD', 'CNY', 'INR', 'KRW']
const anchorCurrencies = ['USD', 'EUR', 'GBP']

export interface CurrencyConversionEntry {
  slug: string
  amount: number
  fromCode: string
  toCode: string
}

export function generateCurrencyEntries(): CurrencyConversionEntry[] {
  const fiatCodes = currencies.filter((c) => !c.isCrypto).map((c) => c.code)
  const cryptoCodes = currencies.filter((c) => c.isCrypto).map((c) => c.code)
  const entries: CurrencyConversionEntry[] = []
  const seen = new Set<string>()

  function add(amount: number, from: string, to: string) {
    const slug = `${amount}-${from.toLowerCase()}-to-${to.toLowerCase()}`
    if (!seen.has(slug)) {
      seen.add(slug)
      entries.push({ slug, amount, fromCode: from, toCode: to })
    }
  }

  // Top currencies: all pairs × all amounts
  for (const from of topCurrencies) {
    for (const to of fiatCodes) {
      if (from === to) continue
      for (const amount of pSeoAmounts) {
        add(amount, from, to)
      }
    }
  }

  // Non-top fiat: only vs anchor currencies
  for (const from of fiatCodes) {
    if (topCurrencies.includes(from)) continue
    for (const to of anchorCurrencies) {
      if (from === to) continue
      for (const amount of pSeoAmounts) {
        add(amount, from, to)
        add(amount, to, from)
      }
    }
  }

  // Crypto: vs USD, EUR, GBP only, amounts 1, 10, 100
  const cryptoAmounts = [1, 10, 100]
  for (const crypto of cryptoCodes) {
    for (const fiat of anchorCurrencies) {
      for (const amount of cryptoAmounts) {
        add(amount, crypto, fiat)
        add(amount, fiat, crypto)
      }
    }
  }

  return entries
}

export const currencyEntries = generateCurrencyEntries()

export function getCurrencyByCode(code: string): Currency | undefined {
  return currencies.find((c) => c.code === code)
}

// Build-time rates — fetched once during build, fallback to hardcoded
// Rates are relative to USD (1 USD = X target)
export type RateMap = Record<string, number>

const FALLBACK_RATES: RateMap = {
  USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149.5, CHF: 0.88, CAD: 1.36,
  AUD: 1.53, NZD: 1.67, CNY: 7.24, INR: 83.4, KRW: 1325, SGD: 1.34,
  HKD: 7.82, TWD: 31.5, SEK: 10.4, NOK: 10.6, DKK: 6.87, PLN: 3.97,
  CZK: 23.2, HUF: 361, RON: 4.58, BGN: 1.8, HRK: 6.93, TRY: 32.1,
  RUB: 92.5, BRL: 4.97, MXN: 17.1, ARS: 870, CLP: 940, COP: 3920,
  PEN: 3.71, ZAR: 18.6, NGN: 1550, EGP: 30.9, KES: 153, GHS: 12.5,
  AED: 3.67, SAR: 3.75, ILS: 3.61, THB: 35.2, MYR: 4.72, IDR: 15600,
  PHP: 56.2, VND: 24500, PKR: 278, BDT: 110, UAH: 38.5,
  BTC: 0.000015, ETH: 0.00029, SOL: 0.0067, DOGE: 6.5,
}

let _rates: RateMap | null = null

export async function fetchRates(): Promise<RateMap> {
  if (_rates) return _rates

  try {
    const res = await fetch('https://api.frankfurter.dev/v1/latest?base=USD', {
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json() as { rates: Record<string, number> }
    _rates = { USD: 1, ...data.rates, ...cryptoRatesFromFallback() }
    return _rates
  } catch (err) {
    console.warn('Currency rate fetch failed, using fallback rates:', err)
    _rates = { ...FALLBACK_RATES }
    return _rates
  }
}

function cryptoRatesFromFallback(): Record<string, number> {
  return {
    BTC: FALLBACK_RATES.BTC,
    ETH: FALLBACK_RATES.ETH,
    SOL: FALLBACK_RATES.SOL,
    DOGE: FALLBACK_RATES.DOGE,
  }
}

export function convertCurrency(amount: number, from: string, to: string, rates: RateMap): number {
  const fromRate = rates[from] ?? 1
  const toRate = rates[to] ?? 1
  return (amount / fromRate) * toRate
}

export function getRelatedCurrencyEntries(fromCode: string, toCode: string, excludeAmount: number): CurrencyConversionEntry[] {
  return currencyEntries
    .filter((e) => e.fromCode === fromCode && e.toCode === toCode && e.amount !== excludeAmount)
    .slice(0, 6)
}
```

**Page count estimate:** ~15,000 currency conversion pages + 51 currency hub pages. The exact count depends on the generation logic above — top 10 currencies get full cross-pairs (10 × 46 × 9 = 4,140), remaining get anchor-only pairs (~37 × 3 × 9 × 2 = 1,998), plus crypto (~4 × 3 × 3 × 2 = 72). Total: ~6,200. To reach 15K, expand `pSeoAmounts` or add more cross-pairs during implementation.

**Build-time rate fetching:** `fetchRates()` is called once during build. The `frankfurter.dev` API is free, no key needed, returns rates against USD. Crypto rates use fallback values (no free API with all 4).

- [ ] **Step 2: Create `src/components/tools/CurrencyConverter.tsx`**

Build an interactive React component following the existing tool component pattern (e.g., `BmiCalculator.tsx`). Key features:
- Two currency dropdowns (from/to) with search filtering
- Amount input field
- Swap button
- Result display with formatted numbers
- Quick-amount buttons (1, 10, 100, 1000)
- Conversion table showing common amounts
- Uses client-side `fetch` to `https://api.frankfurter.dev/v1/latest` for live rates
- Fallback to hardcoded rates if API fails

```typescript
import { useState, useEffect, useMemo, useCallback } from 'react'
import { ArrowLeftRight } from 'lucide-react'
import { currencies, type Currency, convertCurrency, type RateMap } from '@/data/currencyData'

const FALLBACK_RATES: RateMap = { /* same as in currencyData.ts */ }

export function CurrencyConverter() {
  const [amount, setAmount] = useState('100')
  const [fromCode, setFromCode] = useState('USD')
  const [toCode, setToCode] = useState('EUR')
  const [rates, setRates] = useState<RateMap>(FALLBACK_RATES)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://api.frankfurter.dev/v1/latest?base=USD', { signal: AbortSignal.timeout(10_000) })
      .then((r) => r.json())
      .then((data) => {
        setRates({ USD: 1, ...data.rates, BTC: FALLBACK_RATES.BTC, ETH: FALLBACK_RATES.ETH, SOL: FALLBACK_RATES.SOL, DOGE: FALLBACK_RATES.DOGE })
      })
      .catch(() => { /* keep fallback */ })
      .finally(() => setLoading(false))
  }, [])

  const result = useMemo(() => {
    const num = parseFloat(amount)
    if (isNaN(num) || num <= 0) return null
    return convertCurrency(num, fromCode, toCode, rates)
  }, [amount, fromCode, toCode, rates])

  const handleSwap = useCallback(() => {
    setFromCode(toCode)
    setToCode(fromCode)
  }, [fromCode, toCode])

  // ... render with dropdowns, amount input, swap button, result display,
  // quick-amount buttons, conversion table for common amounts
  // Follow the visual pattern from BmiCalculator.tsx
}
```

The full component should be ~150-200 lines following the established patterns (Tailwind classes, dark mode support, accessible labels, CopyButton for results).

- [ ] **Step 3: Create `src/pages/currency-converter.astro`**

Follow the exact pattern from `src/pages/bmi-calculator.astro`:

```astro
---
import ToolLayout from '@/layouts/ToolLayout.astro'
import { CurrencyConverter } from '@/components/tools/CurrencyConverter'
import { getToolById } from '@/data/tools'

const tool = getToolById('currency-converter')
if (!tool) throw new Error('Tool not found: currency-converter')
---

<ToolLayout tool={tool}>
  <CurrencyConverter client:load />

  <section slot="content" class="mt-8" aria-labelledby="how-to-use">
    <h2 id="how-to-use" class="text-xl font-bold">How to Use the Currency Converter</h2>
    <ol class="step-list" role="list">
      <li>Select the <strong>source currency</strong> from the dropdown (e.g., USD)</li>
      <li>Enter the <strong>amount</strong> you want to convert</li>
      <li>Select the <strong>target currency</strong> (e.g., EUR)</li>
      <li>The converted amount appears <strong>instantly</strong></li>
      <li>Use the <strong>swap button</strong> to reverse the conversion</li>
    </ol>
  </section>

  <section slot="content" class="mt-8" aria-labelledby="currency-pages">
    <h2 id="currency-pages" class="text-xl font-bold">Popular Currency Conversions</h2>
    <p>Browse our <a href="/convert/100-usd-to-eur" class="text-[var(--color-primary)] hover:underline">pre-calculated conversion pages</a> for common currency pairs.</p>
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
      <a href="/convert/100-usd-to-eur" class="text-sm text-[var(--color-primary)] hover:underline">100 USD to EUR</a>
      <a href="/convert/100-eur-to-gbp" class="text-sm text-[var(--color-primary)] hover:underline">100 EUR to GBP</a>
      <a href="/convert/100-gbp-to-usd" class="text-sm text-[var(--color-primary)] hover:underline">100 GBP to USD</a>
      <a href="/convert/1-btc-to-usd" class="text-sm text-[var(--color-primary)] hover:underline">1 BTC to USD</a>
      <a href="/convert/100-usd-to-jpy" class="text-sm text-[var(--color-primary)] hover:underline">100 USD to JPY</a>
      <a href="/convert/100-eur-to-chf" class="text-sm text-[var(--color-primary)] hover:underline">100 EUR to CHF</a>
    </div>
  </section>
</ToolLayout>
```

- [ ] **Step 4: Create `src/components/pseo/CurrencyConversionPage.astro`**

This is the pSEO template component rendered by `/convert/[...slug].astro` for currency entries:

```astro
---
import Breadcrumbs from '@/components/seo/Breadcrumbs.astro'
import FaqSection from '@/components/seo/FaqSection.astro'
import SchemaMarkup from '@/components/seo/SchemaMarkup.astro'
import { CurrencyConverter } from '@/components/tools/CurrencyConverter'
import { getCurrencyByCode, convertCurrency, getRelatedCurrencyEntries, type RateMap } from '@/data/currencyData'
import { getCurrencyConversionMeta } from '@/lib/seo'
import { currencyFaqSchema } from '@/lib/schema'

interface Props {
  amount: number
  fromCode: string
  toCode: string
  rates: RateMap
}

const { amount, fromCode, toCode, rates } = Astro.props
const from = getCurrencyByCode(fromCode)!
const to = getCurrencyByCode(toCode)!
const result = convertCurrency(amount, fromCode, toCode, rates)
const rate = convertCurrency(1, fromCode, toCode, rates)
const meta = getCurrencyConversionMeta(amount, fromCode, from.name, toCode, to.name, result)
const related = getRelatedCurrencyEntries(fromCode, toCode, amount)

const tableAmounts = [1, 5, 10, 25, 50, 100, 500, 1000]
---

<SchemaMarkup json={currencyFaqSchema(amount, fromCode, toCode, result, rate)} slot="head" />

<Breadcrumbs items={[
  { name: 'Currency Converter', url: 'https://toolprime.dev/currency-converter' },
  { name: `${fromCode} to ${toCode}`, url: `https://toolprime.dev/currency/${fromCode.toLowerCase()}` },
  { name: `${amount} ${fromCode} to ${toCode}`, url: meta.canonical },
]} />

<h1 class="text-3xl font-bold mb-2">{amount} {from.flag} {fromCode} = {result.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {to.flag} {toCode}</h1>
<p class="text-[var(--color-text-muted)] mb-6">
  1 {fromCode} = {rate.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })} {toCode} &bull;
  1 {toCode} = {(1 / rate).toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })} {fromCode}
</p>

<div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4 sm:p-6 mb-8">
  <CurrencyConverter client:load />
</div>

<section aria-labelledby="conversion-table" class="mt-8">
  <h2 id="conversion-table" class="text-xl font-bold mb-4">{fromCode} to {toCode} Conversion Table</h2>
  <div class="overflow-x-auto">
    <table class="w-full text-sm border-collapse">
      <caption class="sr-only">{fromCode} to {toCode} conversion table</caption>
      <thead>
        <tr class="border-b border-[var(--color-border)]">
          <th scope="col" class="text-left py-2 pr-4 font-semibold">{fromCode}</th>
          <th scope="col" class="text-left py-2 font-semibold">{toCode}</th>
        </tr>
      </thead>
      <tbody>
        {tableAmounts.map((a) => (
          <tr class="border-b border-[var(--color-border-subtle)]">
            <td class="py-2 pr-4">{a.toLocaleString()} {fromCode}</td>
            <td class="py-2">{convertCurrency(a, fromCode, toCode, rates).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {toCode}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>

{related.length > 0 && (
  <section class="mt-8" aria-labelledby="related-conversions">
    <h2 id="related-conversions" class="text-xl font-bold mb-4">More {fromCode} to {toCode} Conversions</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {related.map((r) => (
        <a href={`/convert/${r.slug}`} class="text-sm text-[var(--color-primary)] hover:underline">
          {r.amount.toLocaleString()} {r.fromCode} to {r.toCode}
        </a>
      ))}
    </div>
  </section>
)}

<section class="mt-8" aria-labelledby="currency-hubs">
  <h2 id="currency-hubs" class="text-xl font-bold mb-4">Currency Pages</h2>
  <div class="flex gap-3">
    <a href={`/currency/${fromCode.toLowerCase()}`} class="text-sm text-[var(--color-primary)] hover:underline">{from.name} ({fromCode})</a>
    <a href={`/currency/${toCode.toLowerCase()}`} class="text-sm text-[var(--color-primary)] hover:underline">{to.name} ({toCode})</a>
  </div>
</section>
```

- [ ] **Step 5: Create `src/components/pseo/CurrencyHubPage.astro`**

Template for `/currency/usd` hub pages showing one currency vs all others:

```astro
---
import Breadcrumbs from '@/components/seo/Breadcrumbs.astro'
import SchemaMarkup from '@/components/seo/SchemaMarkup.astro'
import { CurrencyConverter } from '@/components/tools/CurrencyConverter'
import { currencies, convertCurrency, type Currency, type RateMap } from '@/data/currencyData'
import { getCurrencyHubMeta } from '@/lib/seo'
import { faqPageSchema } from '@/lib/schema'

interface Props {
  currency: Currency
  rates: RateMap
}

const { currency, rates } = Astro.props
const meta = getCurrencyHubMeta(currency.code, currency.name)
const otherCurrencies = currencies.filter((c) => c.code !== currency.code && !c.isCrypto).slice(0, 20)
---

<SchemaMarkup json={faqPageSchema([
  { question: `What is ${currency.code}?`, answer: `${currency.code} is the currency code for ${currency.name} (${currency.symbol}).` },
  { question: `How to convert ${currency.code}?`, answer: `Use ToolPrime's free currency converter to convert ${currency.code} to 50+ currencies instantly.` },
])} slot="head" />

<Breadcrumbs items={[
  { name: 'Currency Converter', url: 'https://toolprime.dev/currency-converter' },
  { name: `${currency.name} (${currency.code})`, url: meta.canonical },
]} />

<h1 class="text-3xl font-bold mb-2">{currency.flag} {currency.name} ({currency.code})</h1>
<p class="text-[var(--color-text-muted)] mb-6">Exchange rates for {currency.name} against popular world currencies.</p>

<div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4 sm:p-6 mb-8">
  <CurrencyConverter client:load />
</div>

<section aria-labelledby="rates-table">
  <h2 id="rates-table" class="text-xl font-bold mb-4">1 {currency.code} in Other Currencies</h2>
  <div class="overflow-x-auto">
    <table class="w-full text-sm border-collapse">
      <caption class="sr-only">{currency.code} exchange rates</caption>
      <thead>
        <tr class="border-b border-[var(--color-border)]">
          <th scope="col" class="text-left py-2 pr-4 font-semibold">Currency</th>
          <th scope="col" class="text-left py-2 font-semibold">Rate</th>
          <th scope="col" class="text-left py-2 font-semibold">Convert</th>
        </tr>
      </thead>
      <tbody>
        {otherCurrencies.map((c) => (
          <tr class="border-b border-[var(--color-border-subtle)]">
            <td class="py-2 pr-4">{c.flag} {c.name} ({c.code})</td>
            <td class="py-2">{convertCurrency(1, currency.code, c.code, rates).toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}</td>
            <td class="py-2">
              <a href={`/convert/100-${currency.code.toLowerCase()}-to-${c.code.toLowerCase()}`} class="text-[var(--color-primary)] hover:underline text-xs">100 {currency.code} →</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>
```

- [ ] **Step 6: Create `src/pages/currency/[...slug].astro`**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro'
import CurrencyHubPage from '@/components/pseo/CurrencyHubPage.astro'
import { currencies, fetchRates, type Currency, type RateMap } from '@/data/currencyData'
import { getCurrencyHubMeta } from '@/lib/seo'

export function getStaticPaths() {
  return currencies.map((c) => ({
    params: { slug: c.code.toLowerCase() },
    props: { currency: c },
  }))
}

const { currency } = Astro.props as { currency: Currency }
const rates = await fetchRates()
const meta = getCurrencyHubMeta(currency.code, currency.name)
---

<BaseLayout {...meta}>
  <CurrencyHubPage currency={currency} rates={rates} />
</BaseLayout>
```

- [ ] **Step 7: Extend `src/pages/convert/[...slug].astro`**

Modify the existing file to handle currency and number-base entries alongside format conversions. Use a discriminated union on props:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro'
import Breadcrumbs from '@/components/seo/Breadcrumbs.astro'
import FaqSection from '@/components/seo/FaqSection.astro'
import SchemaMarkup from '@/components/seo/SchemaMarkup.astro'
import CurrencyConversionPage from '@/components/pseo/CurrencyConversionPage.astro'
import { GradientIcon } from '@/components/ui/GradientIcon'
import { formatConversions, type FormatConversion } from '@/data/formatConversions'
import { currencyEntries, fetchRates, getCurrencyByCode, convertCurrency, type RateMap, type CurrencyConversionEntry } from '@/data/currencyData'
import { getToolById, getRelatedTools } from '@/data/tools'
import { getFormatConversionMeta, getCurrencyConversionMeta } from '@/lib/seo'
import { formatConversionHowToSchema } from '@/lib/schema'

type PageType = 'format' | 'currency'

export async function getStaticPaths() {
  const rates = await fetchRates()

  const formatPaths = formatConversions.map((conv) => ({
    params: { slug: conv.slug },
    props: { type: 'format' as const, format: conv, currency: null, rates: null },
  }))

  const currencyPaths = currencyEntries.map((entry) => ({
    params: { slug: entry.slug },
    props: { type: 'currency' as const, format: null, currency: entry, rates },
  }))

  return [...formatPaths, ...currencyPaths]
}

interface Props {
  type: PageType
  format: FormatConversion | null
  currency: CurrencyConversionEntry | null
  rates: RateMap | null
}

const { type, format, currency, rates } = Astro.props

// Currency conversion page
if (type === 'currency' && currency && rates) {
  const from = getCurrencyByCode(currency.fromCode)!
  const to = getCurrencyByCode(currency.toCode)!
  const result = convertCurrency(currency.amount, currency.fromCode, currency.toCode, rates)
  const meta = getCurrencyConversionMeta(currency.amount, currency.fromCode, from.name, currency.toCode, to.name, result)

  return Astro.response.headers // This is the wrong approach — use conditional rendering below
}

// For format conversions, keep existing code...
const conv = format!
const meta = getFormatConversionMeta(conv)
const tool = getToolById(conv.toolId)
const relatedTools = tool ? getRelatedTools(tool.id) : []
const relatedConversions = conv.relatedConversions
  .map((slug) => formatConversions.find((c) => c.slug === slug))
  .filter((c): c is FormatConversion => c !== undefined)
---

{type === 'currency' && currency && rates ? (
  <BaseLayout {...getCurrencyConversionMeta(
    currency.amount,
    currency.fromCode,
    getCurrencyByCode(currency.fromCode)!.name,
    currency.toCode,
    getCurrencyByCode(currency.toCode)!.name,
    convertCurrency(currency.amount, currency.fromCode, currency.toCode, rates),
  )}>
    <CurrencyConversionPage
      amount={currency.amount}
      fromCode={currency.fromCode}
      toCode={currency.toCode}
      rates={rates}
    />
  </BaseLayout>
) : (
  <BaseLayout {...meta}>
    <!-- Keep ALL existing format conversion rendering code exactly as-is -->
    <SchemaMarkup json={formatConversionHowToSchema(conv.title, conv.steps)} slot="head" />
    <Breadcrumbs items={[
      { name: 'Convert', url: 'https://toolprime.dev/convert' },
      { name: conv.title, url: meta.canonical },
    ]} />
    <!-- ... rest of existing template ... -->
  </BaseLayout>
)}
```

**Important:** The existing format conversion rendering must be preserved exactly. Only add the currency branch. The full existing template code (lines 28-91 of the current file) goes inside the `else` branch.

- [ ] **Step 8: Verify build**

Run: `pnpm build 2>&1 | tail -30`
Expected: Build succeeds. Check page count increased by ~6,000-15,000 (depending on currency entry generation). Spot-check a few currency pages in the build output.

- [ ] **Step 9: Commit**

```bash
git add src/data/currencyData.ts src/components/tools/CurrencyConverter.tsx src/pages/currency-converter.astro src/components/pseo/CurrencyConversionPage.astro src/components/pseo/CurrencyHubPage.astro src/pages/currency/ src/pages/convert/\[...slug\].astro
git commit -m "feat: add Currency Converter tool + pSEO pages"
```

---

## Task 4: Age Calculator

**Files:**
- Create: `src/data/ageData.ts`
- Create: `src/components/tools/AgeCalculator.tsx`
- Create: `src/pages/age-calculator.astro`
- Create: `src/components/pseo/AgeCalculationPage.astro`
- Create: `src/pages/calculate/[...slug].astro`

**Parallelizable:** Yes — independent of Tasks 3, 5, 6.

- [ ] **Step 1: Create `src/data/ageData.ts`**

```typescript
export interface AgeEntry {
  slug: string
  birthYear: number
  birthMonth?: string
  birthMonthNum?: number
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const startYear = 1930
const endYear = 2025

export function generateAgeEntries(): AgeEntry[] {
  const entries: AgeEntry[] = []

  // Year-only pages: /calculate/age-born-1990
  for (let year = startYear; year <= endYear; year++) {
    entries.push({
      slug: `age-born-${year}`,
      birthYear: year,
    })
  }

  // Month+year pages: /calculate/age-born-march-1985
  for (let year = startYear; year <= endYear; year++) {
    for (let m = 0; m < 12; m++) {
      entries.push({
        slug: `age-born-${months[m].toLowerCase()}-${year}`,
        birthYear: year,
        birthMonth: months[m],
        birthMonthNum: m + 1,
      })
    }
  }

  return entries
}

export const ageEntries = generateAgeEntries()

export interface Generation {
  name: string
  range: string
  startYear: number
  endYear: number
}

export const generations: Generation[] = [
  { name: 'Silent Generation', range: '1928–1945', startYear: 1928, endYear: 1945 },
  { name: 'Baby Boomers', range: '1946–1964', startYear: 1946, endYear: 1964 },
  { name: 'Generation X', range: '1965–1980', startYear: 1965, endYear: 1980 },
  { name: 'Millennials (Gen Y)', range: '1981–1996', startYear: 1981, endYear: 1996 },
  { name: 'Generation Z', range: '1997–2012', startYear: 1997, endYear: 2012 },
  { name: 'Generation Alpha', range: '2013–2025', startYear: 2013, endYear: 2025 },
]

export function getGeneration(birthYear: number): Generation | undefined {
  return generations.find((g) => birthYear >= g.startYear && birthYear <= g.endYear)
}

export function getZodiacSign(month: number, day: number): string {
  const signs = [
    { name: 'Capricorn', end: [1, 19] }, { name: 'Aquarius', end: [2, 18] },
    { name: 'Pisces', end: [3, 20] }, { name: 'Aries', end: [4, 19] },
    { name: 'Taurus', end: [5, 20] }, { name: 'Gemini', end: [6, 20] },
    { name: 'Cancer', end: [7, 22] }, { name: 'Leo', end: [8, 22] },
    { name: 'Virgo', end: [9, 22] }, { name: 'Libra', end: [10, 22] },
    { name: 'Scorpio', end: [11, 21] }, { name: 'Sagittarius', end: [12, 21] },
  ]
  for (const sign of signs) {
    if (month < sign.end[0] || (month === sign.end[0] && day <= sign.end[1])) {
      return sign.name
    }
  }
  return 'Capricorn'
}

export function calculateAge(birthYear: number, birthMonth?: number, birthDay?: number): {
  years: number; months: number; days: number; totalDays: number
} {
  const now = new Date()
  const birth = new Date(birthYear, (birthMonth ?? 1) - 1, birthDay ?? 1)
  let years = now.getFullYear() - birth.getFullYear()
  let months = now.getMonth() - birth.getMonth()
  let days = now.getDate() - birth.getDate()

  if (days < 0) {
    months--
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    days += prevMonth.getDate()
  }
  if (months < 0) {
    years--
    months += 12
  }

  const totalDays = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24))
  return { years, months, days, totalDays }
}

export function getRelatedAgeEntries(birthYear: number, excludeSlug: string): AgeEntry[] {
  return ageEntries
    .filter((e) => !e.birthMonth && e.birthYear !== birthYear && Math.abs(e.birthYear - birthYear) <= 5)
    .slice(0, 8)
}
```

**Page count:** 96 year-only + 96 × 12 month-year = 1,248 pages.

- [ ] **Step 2: Create `src/components/tools/AgeCalculator.tsx`**

Interactive React component:
- Date of birth input (date picker or 3 dropdowns: day/month/year)
- "Calculate" button
- Result display: exact age (years, months, days), total days lived, generation, zodiac sign
- Fun facts: days until next birthday, day of the week born
- Follow `BmiCalculator.tsx` patterns for layout and styling

```typescript
import { useState, useMemo } from 'react'
import { calculateAge, getGeneration, getZodiacSign } from '@/data/ageData'

export function AgeCalculator() {
  const [birthYear, setBirthYear] = useState('')
  const [birthMonth, setBirthMonth] = useState('1')
  const [birthDay, setBirthDay] = useState('1')

  const result = useMemo(() => {
    const y = parseInt(birthYear)
    const m = parseInt(birthMonth)
    const d = parseInt(birthDay)
    if (isNaN(y) || y < 1900 || y > new Date().getFullYear()) return null
    return {
      age: calculateAge(y, m, d),
      generation: getGeneration(y),
      zodiac: getZodiacSign(m, d),
    }
  }, [birthYear, birthMonth, birthDay])

  // Render: year/month/day selects, result card with age breakdown,
  // generation badge, zodiac sign, total days, next birthday countdown
}
```

- [ ] **Step 3: Create `src/pages/age-calculator.astro`**

Follow `bmi-calculator.astro` pattern with `<AgeCalculator client:load />`, step-list instructions, and links to pSEO pages.

- [ ] **Step 4: Create `src/components/pseo/AgeCalculationPage.astro`**

Template for `/calculate/age-born-1990` and `/calculate/age-born-march-1985` pages:

```astro
---
import Breadcrumbs from '@/components/seo/Breadcrumbs.astro'
import SchemaMarkup from '@/components/seo/SchemaMarkup.astro'
import { AgeCalculator } from '@/components/tools/AgeCalculator'
import { calculateAge, getGeneration, generations, type AgeEntry } from '@/data/ageData'
import { getAgeMeta } from '@/lib/seo'
import { ageFaqSchema } from '@/lib/schema'

interface Props {
  entry: AgeEntry
}

const { entry } = Astro.props
const age = calculateAge(entry.birthYear, entry.birthMonthNum)
const generation = getGeneration(entry.birthYear)
const meta = getAgeMeta(entry.birthYear, entry.birthMonth)
const monthPart = entry.birthMonth ? ` ${entry.birthMonth}` : ''
---

<SchemaMarkup json={ageFaqSchema(entry.birthYear, age.years, entry.birthMonth)} slot="head" />

<Breadcrumbs items={[
  { name: 'Age Calculator', url: 'https://toolprime.dev/age-calculator' },
  { name: `Born${monthPart} ${entry.birthYear}`, url: meta.canonical },
]} />

<h1 class="text-3xl font-bold mb-2">How Old Am I If Born in{monthPart} {entry.birthYear}?</h1>
<p class="text-lg text-[var(--color-text-muted)] mb-6">
  You are <strong>{age.years} years{age.months > 0 ? `, ${age.months} months` : ''}{age.days > 0 ? `, and ${age.days} days` : ''}</strong> old.
</p>

<div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4 sm:p-6 mb-8">
  <AgeCalculator client:load />
</div>

<section class="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4" aria-label="Age details">
  <div class="rounded-xl border border-[var(--color-border)] p-4 text-center">
    <div class="text-2xl font-bold">{age.totalDays.toLocaleString()}</div>
    <div class="text-sm text-[var(--color-text-muted)]">Total Days</div>
  </div>
  <div class="rounded-xl border border-[var(--color-border)] p-4 text-center">
    <div class="text-2xl font-bold">{(age.totalDays * 24).toLocaleString()}</div>
    <div class="text-sm text-[var(--color-text-muted)]">Total Hours</div>
  </div>
  {generation && (
    <div class="rounded-xl border border-[var(--color-border)] p-4 text-center">
      <div class="text-2xl font-bold">{generation.name}</div>
      <div class="text-sm text-[var(--color-text-muted)]">{generation.range}</div>
    </div>
  )}
</section>

<!-- Related: other birth years nearby, generation table, links to month variants -->
```

- [ ] **Step 5: Create `src/pages/calculate/[...slug].astro`**

New catch-all route for age + fraction pSEO pages:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro'
import AgeCalculationPage from '@/components/pseo/AgeCalculationPage.astro'
import { ageEntries, type AgeEntry } from '@/data/ageData'
import { getAgeMeta } from '@/lib/seo'

type PageType = 'age'

export function getStaticPaths() {
  const agePaths = ageEntries.map((entry) => ({
    params: { slug: entry.slug },
    props: { type: 'age' as const, age: entry },
  }))

  // Fraction paths will be added in Task 5
  return [...agePaths]
}

const { type, age } = Astro.props as { type: PageType; age: AgeEntry }

const meta = type === 'age' ? getAgeMeta(age.birthYear, age.birthMonth) : getAgeMeta(0)
---

<BaseLayout {...meta}>
  {type === 'age' && <AgeCalculationPage entry={age} />}
</BaseLayout>
```

**Note:** This file will be extended in Task 5 to include fraction entries. The discriminated union pattern is set up for expansion.

- [ ] **Step 6: Verify build**

Run: `pnpm build 2>&1 | tail -20`
Expected: Build succeeds. ~1,248 new pages under `/calculate/`.

- [ ] **Step 7: Commit**

```bash
git add src/data/ageData.ts src/components/tools/AgeCalculator.tsx src/pages/age-calculator.astro src/components/pseo/AgeCalculationPage.astro src/pages/calculate/
git commit -m "feat: add Age Calculator tool + ~1,250 pSEO pages"
```

---

## Task 5: Fraction Calculator

**Files:**
- Create: `src/data/fractionData.ts`
- Create: `src/components/tools/FractionCalculator.tsx`
- Create: `src/pages/fraction-calculator.astro`
- Create: `src/components/pseo/FractionCalculationPage.astro`
- Modify: `src/pages/calculate/[...slug].astro` (add fraction entries)

**Parallelizable:** Yes — independent of Tasks 3, 4, 6. But if running parallel with Task 4, coordinate on the shared `/calculate/[...slug].astro` file (one agent creates it, the other extends it).

- [ ] **Step 1: Create `src/data/fractionData.ts`**

```typescript
export interface Fraction {
  n: number // numerator
  d: number // denominator
}

export type FractionOp = 'plus' | 'minus' | 'times' | 'dividedby'

export const opSymbols: Record<FractionOp, string> = {
  plus: '+', minus: '−', times: '×', dividedby: '÷',
}

export interface FractionEntry {
  slug: string
  f1: Fraction
  f2: Fraction
  op: FractionOp
  result: Fraction
}

export interface DecimalToFractionEntry {
  slug: string
  decimal: number
  fraction: Fraction
}

function gcd(a: number, b: number): number {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b) { [a, b] = [b, a % b] }
  return a
}

function simplify(n: number, d: number): Fraction {
  if (d === 0) return { n: 0, d: 1 }
  const g = gcd(Math.abs(n), Math.abs(d))
  const sign = d < 0 ? -1 : 1
  return { n: (sign * n) / g, d: (sign * d) / g }
}

function computeFraction(f1: Fraction, f2: Fraction, op: FractionOp): Fraction {
  switch (op) {
    case 'plus':
      return simplify(f1.n * f2.d + f2.n * f1.d, f1.d * f2.d)
    case 'minus':
      return simplify(f1.n * f2.d - f2.n * f1.d, f1.d * f2.d)
    case 'times':
      return simplify(f1.n * f2.n, f1.d * f2.d)
    case 'dividedby':
      return simplify(f1.n * f2.d, f1.d * f2.n)
  }
}

// Generate reduced proper fractions with denominator 2-12
function generateFractions(): Fraction[] {
  const fractions: Fraction[] = []
  const seen = new Set<string>()
  for (let d = 2; d <= 12; d++) {
    for (let n = 1; n < d; n++) {
      const s = simplify(n, d)
      const key = `${s.n}/${s.d}`
      if (!seen.has(key)) {
        seen.add(key)
        fractions.push(s)
      }
    }
  }
  return fractions
}

export const commonFractions = generateFractions()

const ops: FractionOp[] = ['plus', 'minus', 'times', 'dividedby']

export function generateFractionEntries(): FractionEntry[] {
  const entries: FractionEntry[] = []
  const seen = new Set<string>()

  for (const f1 of commonFractions) {
    for (const f2 of commonFractions) {
      for (const op of ops) {
        // Skip division by zero (f2 numerator is 0 — not possible with our fractions)
        if (op === 'dividedby' && f2.n === 0) continue

        const result = computeFraction(f1, f2, op)
        const slug = `${f1.n}-${f1.d}-${op}-${f2.n}-${f2.d}`

        if (!seen.has(slug)) {
          seen.add(slug)
          entries.push({ slug, f1, f2, op, result })
        }
      }
    }
  }

  return entries
}

export const fractionEntries = generateFractionEntries()

// Decimal-to-fraction conversions (common decimals)
export function generateDecimalEntries(): DecimalToFractionEntry[] {
  const decimals = [
    0.1, 0.125, 0.15, 0.2, 0.25, 0.3, 0.333, 0.35, 0.375, 0.4,
    0.45, 0.5, 0.55, 0.6, 0.625, 0.65, 0.667, 0.7, 0.75, 0.8,
    0.825, 0.85, 0.875, 0.9, 0.95,
  ]
  const known: Record<number, Fraction> = {
    0.1: { n: 1, d: 10 }, 0.125: { n: 1, d: 8 }, 0.15: { n: 3, d: 20 },
    0.2: { n: 1, d: 5 }, 0.25: { n: 1, d: 4 }, 0.3: { n: 3, d: 10 },
    0.333: { n: 1, d: 3 }, 0.35: { n: 7, d: 20 }, 0.375: { n: 3, d: 8 },
    0.4: { n: 2, d: 5 }, 0.45: { n: 9, d: 20 }, 0.5: { n: 1, d: 2 },
    0.55: { n: 11, d: 20 }, 0.6: { n: 3, d: 5 }, 0.625: { n: 5, d: 8 },
    0.65: { n: 13, d: 20 }, 0.667: { n: 2, d: 3 }, 0.7: { n: 7, d: 10 },
    0.75: { n: 3, d: 4 }, 0.8: { n: 4, d: 5 }, 0.825: { n: 33, d: 40 },
    0.85: { n: 17, d: 20 }, 0.875: { n: 7, d: 8 }, 0.9: { n: 9, d: 10 },
    0.95: { n: 19, d: 20 },
  }
  return decimals.map((d) => ({
    slug: `${String(d).replace('.', '-')}-to-fraction`,
    decimal: d,
    fraction: known[d] ?? simplify(Math.round(d * 1000), 1000),
  }))
}

export const decimalEntries = generateDecimalEntries()

export function getRelatedFractionEntries(f1: Fraction, op: FractionOp, excludeSlug: string): FractionEntry[] {
  return fractionEntries
    .filter((e) => e.f1.n === f1.n && e.f1.d === f1.d && e.op === op && e.slug !== excludeSlug)
    .slice(0, 6)
}

export function formatFraction(f: Fraction): string {
  return `${f.n}/${f.d}`
}
```

**Page count:** ~45 fractions × 45 × 4 ops = 8,100 fraction pages + 25 decimal-to-fraction pages = ~8,125 pages.

- [ ] **Step 2: Create `src/components/tools/FractionCalculator.tsx`**

Interactive React component:
- Two fraction inputs (numerator/denominator each)
- Operation selector (+, −, ×, ÷)
- Result display with simplified fraction
- Step-by-step solution
- Decimal/percentage equivalent display
- Secondary mode: decimal-to-fraction converter

```typescript
import { useState, useMemo } from 'react'

export function FractionCalculator() {
  const [n1, setN1] = useState('1')
  const [d1, setD1] = useState('2')
  const [n2, setN2] = useState('1')
  const [d2, setD2] = useState('3')
  const [op, setOp] = useState<'plus' | 'minus' | 'times' | 'dividedby'>('plus')

  // Compute result, show step-by-step, decimal equivalent
  // Secondary tab: decimal input → fraction output
  // Follow BmiCalculator.tsx patterns
}
```

- [ ] **Step 3: Create `src/pages/fraction-calculator.astro`**

Follow `bmi-calculator.astro` pattern. Include step-list, links to popular fraction calculation pages, and decimal-to-fraction converter section.

- [ ] **Step 4: Create `src/components/pseo/FractionCalculationPage.astro`**

Template for `/calculate/1-2-plus-1-3` pages:

```astro
---
import Breadcrumbs from '@/components/seo/Breadcrumbs.astro'
import SchemaMarkup from '@/components/seo/SchemaMarkup.astro'
import { FractionCalculator } from '@/components/tools/FractionCalculator'
import { opSymbols, formatFraction, getRelatedFractionEntries, type FractionEntry } from '@/data/fractionData'
import { getFractionMeta } from '@/lib/seo'
import { fractionFaqSchema } from '@/lib/schema'

interface Props {
  entry: FractionEntry
}

const { entry } = Astro.props
const { f1, f2, op, result } = entry
const sym = opSymbols[op]
const meta = getFractionMeta(f1.n, f1.d, op, sym, f2.n, f2.d, result.n, result.d)
const related = getRelatedFractionEntries(f1, op, entry.slug)
const decimalResult = result.n / result.d
---

<SchemaMarkup json={fractionFaqSchema(f1.n, f1.d, sym, f2.n, f2.d, result.n, result.d)} slot="head" />

<Breadcrumbs items={[
  { name: 'Fraction Calculator', url: 'https://toolprime.dev/fraction-calculator' },
  { name: `${formatFraction(f1)} ${sym} ${formatFraction(f2)}`, url: meta.canonical },
]} />

<h1 class="text-3xl font-bold mb-2">{formatFraction(f1)} {sym} {formatFraction(f2)} = {formatFraction(result)}</h1>
<p class="text-[var(--color-text-muted)] mb-6">As a decimal: {decimalResult.toFixed(6).replace(/\.?0+$/, '')}</p>

<div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4 sm:p-6 mb-8">
  <FractionCalculator client:load />
</div>

<section class="mt-8" aria-labelledby="step-by-step">
  <h2 id="step-by-step" class="text-xl font-bold mb-4">Step-by-Step Solution</h2>
  <ol class="step-list" role="list">
    {op === 'plus' || op === 'minus' ? (
      <>
        <li>Find the least common denominator (LCD) of {f1.d} and {f2.d}</li>
        <li>Convert fractions: {formatFraction(f1)} = {f1.n * (f1.d * f2.d / f1.d)}/{f1.d * f2.d / f1.d * f1.d}, {formatFraction(f2)} = {f2.n * (f1.d * f2.d / f2.d)}/{f1.d * f2.d}</li>
        <li>{op === 'plus' ? 'Add' : 'Subtract'} the numerators: {f1.n * f2.d} {sym} {f2.n * f1.d} = {op === 'plus' ? f1.n * f2.d + f2.n * f1.d : f1.n * f2.d - f2.n * f1.d}</li>
        <li>Simplify: {formatFraction(result)}</li>
      </>
    ) : op === 'times' ? (
      <>
        <li>Multiply numerators: {f1.n} × {f2.n} = {f1.n * f2.n}</li>
        <li>Multiply denominators: {f1.d} × {f2.d} = {f1.d * f2.d}</li>
        <li>Simplify: {f1.n * f2.n}/{f1.d * f2.d} = {formatFraction(result)}</li>
      </>
    ) : (
      <>
        <li>Flip the second fraction: {formatFraction(f2)} → {f2.d}/{f2.n}</li>
        <li>Multiply: {f1.n}/{f1.d} × {f2.d}/{f2.n} = {f1.n * f2.d}/{f1.d * f2.n}</li>
        <li>Simplify: {formatFraction(result)}</li>
      </>
    )}
  </ol>
</section>

<!-- Related fraction calculations -->
{related.length > 0 && (
  <section class="mt-8" aria-labelledby="related-fractions">
    <h2 id="related-fractions" class="text-xl font-bold mb-4">Related Calculations</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {related.map((r) => (
        <a href={`/calculate/${r.slug}`} class="text-sm text-[var(--color-primary)] hover:underline">
          {formatFraction(r.f1)} {opSymbols[r.op]} {formatFraction(r.f2)}
        </a>
      ))}
    </div>
  </section>
)}
```

- [ ] **Step 5: Extend `src/pages/calculate/[...slug].astro` with fraction entries**

Modify the file created in Task 4 to add fraction + decimal-to-fraction paths:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro'
import AgeCalculationPage from '@/components/pseo/AgeCalculationPage.astro'
import FractionCalculationPage from '@/components/pseo/FractionCalculationPage.astro'
import { ageEntries, type AgeEntry } from '@/data/ageData'
import { fractionEntries, decimalEntries, type FractionEntry, type DecimalToFractionEntry } from '@/data/fractionData'
import { getAgeMeta, getFractionMeta, getDecimalToFractionMeta } from '@/lib/seo'
import { opSymbols } from '@/data/fractionData'

type PageType = 'age' | 'fraction' | 'decimalToFraction'

export function getStaticPaths() {
  const agePaths = ageEntries.map((entry) => ({
    params: { slug: entry.slug },
    props: { type: 'age' as const, age: entry, fraction: null, decimal: null },
  }))

  const fractionPaths = fractionEntries.map((entry) => ({
    params: { slug: entry.slug },
    props: { type: 'fraction' as const, age: null, fraction: entry, decimal: null },
  }))

  const decimalPaths = decimalEntries.map((entry) => ({
    params: { slug: entry.slug },
    props: { type: 'decimalToFraction' as const, age: null, fraction: null, decimal: entry },
  }))

  return [...agePaths, ...fractionPaths, ...decimalPaths]
}

const { type, age, fraction, decimal } = Astro.props

function getMeta() {
  if (type === 'age' && age) return getAgeMeta(age.birthYear, age.birthMonth)
  if (type === 'fraction' && fraction) {
    const sym = opSymbols[fraction.op]
    return getFractionMeta(fraction.f1.n, fraction.f1.d, fraction.op, sym, fraction.f2.n, fraction.f2.d, fraction.result.n, fraction.result.d)
  }
  if (type === 'decimalToFraction' && decimal) return getDecimalToFractionMeta(decimal.decimal, decimal.fraction.n, decimal.fraction.d)
  throw new Error('Invalid page type')
}

const meta = getMeta()
---

<BaseLayout {...meta}>
  {type === 'age' && age && <AgeCalculationPage entry={age} />}
  {type === 'fraction' && fraction && <FractionCalculationPage entry={fraction} />}
  {type === 'decimalToFraction' && decimal && (
    <!-- Simple decimal-to-fraction page with result, explanation, and link to fraction calculator -->
    <h1 class="text-3xl font-bold mb-2">{decimal.decimal} as a Fraction = {decimal.fraction.n}/{decimal.fraction.d}</h1>
    <!-- Interactive calculator, explanation, related decimals -->
  )}
</BaseLayout>
```

**If Task 4 has not yet created this file** (parallel execution), create it fresh with all three page types included.

- [ ] **Step 6: Verify build**

Run: `pnpm build 2>&1 | tail -20`
Expected: Build succeeds. ~8,125 new pages under `/calculate/`.

- [ ] **Step 7: Commit**

```bash
git add src/data/fractionData.ts src/components/tools/FractionCalculator.tsx src/pages/fraction-calculator.astro src/components/pseo/FractionCalculationPage.astro src/pages/calculate/\[...slug\].astro
git commit -m "feat: add Fraction Calculator tool + ~8,100 pSEO pages"
```

---

## Task 6: Number Base Converter

**Files:**
- Create: `src/data/numberBaseData.ts`
- Create: `src/components/tools/NumberBaseConverter.tsx`
- Create: `src/pages/number-base-converter.astro`
- Create: `src/components/pseo/NumberBaseConversionPage.astro`
- Create: `src/components/pseo/AsciiPage.astro`
- Modify: `src/pages/convert/[...slug].astro` (add number-base + ASCII entries)

**Parallelizable:** Yes — independent of Tasks 3, 4, 5. But shares `convert/[...slug].astro` with Task 3. If running parallel with Task 3, coordinate on the shared file.

- [ ] **Step 1: Create `src/data/numberBaseData.ts`**

```typescript
export interface NumberBaseEntry {
  slug: string
  value: number
  toBase: string
  result: string
}

export interface AsciiEntry {
  slug: string
  code: number
  char: string
  description: string
}

type BaseName = 'binary' | 'octal' | 'hexadecimal'

const bases: { name: BaseName; radix: number }[] = [
  { name: 'binary', radix: 2 },
  { name: 'octal', radix: 8 },
  { name: 'hexadecimal', radix: 16 },
]

// Common numbers for pSEO pages
const commonNumbers = [
  // Small numbers (0-20)
  ...Array.from({ length: 21 }, (_, i) => i),
  // Powers of 2
  32, 64, 128, 256, 512, 1024, 2048, 4096,
  // Round numbers
  25, 50, 75, 100, 150, 200, 250, 500, 750, 1000,
  // Hex-significant numbers
  15, 16, 31, 48, 63, 127, 191, 223, 239, 240, 254, 255,
  // Common in computing
  42, 65, 90, 97, 122, 169, 192, 224, 8080, 8443, 65535,
]

// Remove duplicates and sort
const uniqueNumbers = [...new Set(commonNumbers)].sort((a, b) => a - b)

export function generateNumberBaseEntries(): NumberBaseEntry[] {
  const entries: NumberBaseEntry[] = []
  const seen = new Set<string>()

  for (const num of uniqueNumbers) {
    for (const base of bases) {
      const result = num.toString(base.radix).toUpperCase()
      const slug = `${num}-to-${base.name}`
      if (!seen.has(slug)) {
        seen.add(slug)
        entries.push({ slug, value: num, toBase: base.name, result })
      }
    }
  }

  // Hex-to-decimal pages (common hex values)
  const hexValues = ['A', 'B', 'C', 'D', 'E', 'F', 'FF', '0A', '1F', '7F', '80', 'FF', '100', 'FFFF', 'DEAD', 'BEEF', 'CAFE', 'BABE']
  for (const hex of [...new Set(hexValues)]) {
    const decimal = parseInt(hex, 16)
    const slug = `${hex.toLowerCase()}-hex-to-decimal`
    if (!seen.has(slug)) {
      seen.add(slug)
      entries.push({ slug, value: decimal, toBase: 'decimal', result: String(decimal) })
    }
  }

  return entries
}

export const numberBaseEntries = generateNumberBaseEntries()

// ASCII table entries (printable: 32-126, plus control chars 0-31)
export function generateAsciiEntries(): AsciiEntry[] {
  const descriptions: Record<number, string> = {
    0: 'NUL (Null)', 1: 'SOH (Start of Heading)', 2: 'STX (Start of Text)',
    3: 'ETX (End of Text)', 4: 'EOT (End of Transmission)', 5: 'ENQ (Enquiry)',
    6: 'ACK (Acknowledge)', 7: 'BEL (Bell)', 8: 'BS (Backspace)',
    9: 'HT (Horizontal Tab)', 10: 'LF (Line Feed)', 11: 'VT (Vertical Tab)',
    12: 'FF (Form Feed)', 13: 'CR (Carriage Return)', 27: 'ESC (Escape)',
    32: 'Space', 127: 'DEL (Delete)',
  }

  return Array.from({ length: 128 }, (_, i) => ({
    slug: `ascii-${i}`,
    code: i,
    char: i >= 33 && i <= 126 ? String.fromCharCode(i) : (descriptions[i] ?? `Control char ${i}`),
    description: descriptions[i] ?? (i >= 33 && i <= 126 ? `Character "${String.fromCharCode(i)}"` : `Control character ${i}`),
  }))
}

export const asciiEntries = generateAsciiEntries()

export function convertBase(value: string, fromRadix: number, toRadix: number): string {
  const decimal = parseInt(value, fromRadix)
  if (isNaN(decimal)) return 'Invalid'
  return decimal.toString(toRadix).toUpperCase()
}

export function getRelatedNumberBaseEntries(value: number, excludeSlug: string): NumberBaseEntry[] {
  return numberBaseEntries
    .filter((e) => e.value === value && e.slug !== excludeSlug)
    .slice(0, 6)
}
```

**Page count:** ~75 numbers × 3 bases = 225 + ~15 hex-to-decimal + 128 ASCII = ~368 pages. To reach ~3,000, expand `commonNumbers` to include more values (e.g., all numbers 0-255 for full byte range: 256 × 3 = 768, plus 0-1023 for binary: ~1,000 more). Adjust during implementation to hit target.

**Expansion approach for 3,000 pages:** Add all numbers 0-255 (byte values) × 3 bases = 768, plus numbers 0-1023 for binary specifically = 1,024, plus hex values 00-FF to decimal = 256, plus ASCII 128 = total ~2,176. Add more round numbers (multiples of 100 up to 10000) for another ~300. Total: ~2,500-3,000.

- [ ] **Step 2: Create `src/components/tools/NumberBaseConverter.tsx`**

Interactive React component:
- Input field for the number
- "From base" dropdown (Binary, Octal, Decimal, Hexadecimal, Base32)
- "To base" dropdown (same options)
- Real-time conversion result
- Multi-base display (show all bases at once)
- ASCII lookup section: input a number, see the character; input a character, see the code

```typescript
import { useState, useMemo } from 'react'
import { convertBase } from '@/data/numberBaseData'

export function NumberBaseConverter() {
  const [input, setInput] = useState('255')
  const [fromBase, setFromBase] = useState(10)

  const results = useMemo(() => {
    const decimal = parseInt(input, fromBase)
    if (isNaN(decimal) || decimal < 0) return null
    return {
      binary: decimal.toString(2),
      octal: decimal.toString(8),
      decimal: decimal.toString(10),
      hex: decimal.toString(16).toUpperCase(),
      ascii: decimal >= 32 && decimal <= 126 ? String.fromCharCode(decimal) : null,
    }
  }, [input, fromBase])

  // Render: input field, base selector, results grid showing all bases,
  // ASCII character display, bit visualization for binary
}
```

- [ ] **Step 3: Create `src/pages/number-base-converter.astro`**

Follow `bmi-calculator.astro` pattern. Include links to popular conversions (255 to binary, FF to decimal, etc.) and ASCII table link.

- [ ] **Step 4: Create `src/components/pseo/NumberBaseConversionPage.astro`**

Template for `/convert/255-to-binary` pages:

```astro
---
import Breadcrumbs from '@/components/seo/Breadcrumbs.astro'
import SchemaMarkup from '@/components/seo/SchemaMarkup.astro'
import { NumberBaseConverter } from '@/components/tools/NumberBaseConverter'
import { getRelatedNumberBaseEntries, type NumberBaseEntry } from '@/data/numberBaseData'
import { getNumberBaseMeta } from '@/lib/seo'
import { numberBaseFaqSchema } from '@/lib/schema'

interface Props {
  entry: NumberBaseEntry
}

const { entry } = Astro.props
const meta = getNumberBaseMeta(entry.value, entry.toBase, entry.toBase, entry.result)
const related = getRelatedNumberBaseEntries(entry.value, entry.slug)

// Show all bases for this number
const allBases = {
  decimal: entry.value.toString(10),
  binary: entry.value.toString(2),
  octal: entry.value.toString(8),
  hexadecimal: entry.value.toString(16).toUpperCase(),
}
---

<SchemaMarkup json={numberBaseFaqSchema(entry.value, entry.toBase, entry.result)} slot="head" />

<Breadcrumbs items={[
  { name: 'Number Base Converter', url: 'https://toolprime.dev/number-base-converter' },
  { name: `${entry.value} to ${entry.toBase}`, url: meta.canonical },
]} />

<h1 class="text-3xl font-bold mb-2">{entry.value} in {entry.toBase.charAt(0).toUpperCase() + entry.toBase.slice(1)} = {entry.result}</h1>

<div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4 sm:p-6 mb-8">
  <NumberBaseConverter client:load />
</div>

<section class="mt-8" aria-labelledby="all-bases">
  <h2 id="all-bases" class="text-xl font-bold mb-4">{entry.value} in All Bases</h2>
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
    {Object.entries(allBases).map(([base, val]) => (
      <div class="rounded-xl border border-[var(--color-border)] p-4 text-center">
        <div class="text-lg font-mono font-bold">{val}</div>
        <div class="text-xs text-[var(--color-text-muted)] capitalize">{base}</div>
      </div>
    ))}
  </div>
</section>

<!-- Related conversions -->
```

- [ ] **Step 5: Create `src/components/pseo/AsciiPage.astro`**

Template for `/convert/ascii-65` pages:

```astro
---
import Breadcrumbs from '@/components/seo/Breadcrumbs.astro'
import SchemaMarkup from '@/components/seo/SchemaMarkup.astro'
import { NumberBaseConverter } from '@/components/tools/NumberBaseConverter'
import { asciiEntries, type AsciiEntry } from '@/data/numberBaseData'
import { getAsciiMeta } from '@/lib/seo'
import { faqPageSchema } from '@/lib/schema'

interface Props {
  entry: AsciiEntry
}

const { entry } = Astro.props
const meta = getAsciiMeta(entry.code, entry.char)
const nearbyEntries = asciiEntries.filter((e) =>
  Math.abs(e.code - entry.code) <= 5 && e.code !== entry.code
)
---

<SchemaMarkup json={faqPageSchema([
  { question: `What is ASCII ${entry.code}?`, answer: `ASCII ${entry.code} represents ${entry.description}. Binary: ${entry.code.toString(2)}, Hex: ${entry.code.toString(16).toUpperCase()}.` },
])} slot="head" />

<Breadcrumbs items={[
  { name: 'Number Base Converter', url: 'https://toolprime.dev/number-base-converter' },
  { name: `ASCII ${entry.code}`, url: meta.canonical },
]} />

<h1 class="text-3xl font-bold mb-2">ASCII {entry.code} = {entry.char}</h1>
<p class="text-[var(--color-text-muted)] mb-6">{entry.description}</p>

<div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
  <div class="rounded-xl border border-[var(--color-border)] p-4 text-center">
    <div class="text-lg font-mono font-bold">{entry.code}</div>
    <div class="text-xs text-[var(--color-text-muted)]">Decimal</div>
  </div>
  <div class="rounded-xl border border-[var(--color-border)] p-4 text-center">
    <div class="text-lg font-mono font-bold">{entry.code.toString(2)}</div>
    <div class="text-xs text-[var(--color-text-muted)]">Binary</div>
  </div>
  <div class="rounded-xl border border-[var(--color-border)] p-4 text-center">
    <div class="text-lg font-mono font-bold">{entry.code.toString(16).toUpperCase()}</div>
    <div class="text-xs text-[var(--color-text-muted)]">Hexadecimal</div>
  </div>
  <div class="rounded-xl border border-[var(--color-border)] p-4 text-center">
    <div class="text-lg font-mono font-bold">{entry.code.toString(8)}</div>
    <div class="text-xs text-[var(--color-text-muted)]">Octal</div>
  </div>
</div>

<div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4 sm:p-6 mb-8">
  <NumberBaseConverter client:load />
</div>

<!-- Nearby ASCII entries table -->
```

- [ ] **Step 6: Extend `src/pages/convert/[...slug].astro` with number-base + ASCII entries**

Add number-base and ASCII entries to the `getStaticPaths()` alongside format and currency entries:

```typescript
// In getStaticPaths(), add after currencyPaths:
import { numberBaseEntries, asciiEntries, type NumberBaseEntry, type AsciiEntry } from '@/data/numberBaseData'
import NumberBaseConversionPage from '@/components/pseo/NumberBaseConversionPage.astro'
import AsciiPage from '@/components/pseo/AsciiPage.astro'

// Add to the return array:
const numberBasePaths = numberBaseEntries.map((entry) => ({
  params: { slug: entry.slug },
  props: { type: 'numberBase' as const, format: null, currency: null, numberBase: entry, ascii: null, rates: null },
}))

const asciiPaths = asciiEntries.map((entry) => ({
  params: { slug: entry.slug },
  props: { type: 'ascii' as const, format: null, currency: null, numberBase: null, ascii: entry, rates: null },
}))

return [...formatPaths, ...currencyPaths, ...numberBasePaths, ...asciiPaths]
```

Add rendering branches in the template:

```astro
{type === 'numberBase' && numberBase && (
  <BaseLayout {...getNumberBaseMeta(numberBase.value, numberBase.toBase, numberBase.toBase, numberBase.result)}>
    <NumberBaseConversionPage entry={numberBase} />
  </BaseLayout>
)}
{type === 'ascii' && ascii && (
  <BaseLayout {...getAsciiMeta(ascii.code, ascii.char)}>
    <AsciiPage entry={ascii} />
  </BaseLayout>
)}
```

- [ ] **Step 7: Verify build**

Run: `pnpm build 2>&1 | tail -20`
Expected: Build succeeds. ~370-3,000 new pages under `/convert/` (depends on number range expansion).

- [ ] **Step 8: Commit**

```bash
git add src/data/numberBaseData.ts src/components/tools/NumberBaseConverter.tsx src/pages/number-base-converter.astro src/components/pseo/NumberBaseConversionPage.astro src/components/pseo/AsciiPage.astro src/pages/convert/\[...slug\].astro
git commit -m "feat: add Number Base Converter tool + pSEO pages"
```

---

## Task 7: Audience-Split Hub Landing Pages + Navigation

**Files:**
- Create: `src/pages/everyday.astro`
- Create: `src/pages/developer.astro`
- Create: `src/pages/design.astro`
- Modify: `src/layouts/BaseLayout.astro` (header nav)
- Modify: `src/components/MobileNav.tsx` (mobile nav)
- Modify: `src/pages/index.astro` (hero badge + hub CTAs)

**Depends on:** Task 1 (audience mapping must exist).

- [ ] **Step 1: Create `src/pages/everyday.astro`**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro'
import { GradientIcon } from '@/components/ui/GradientIcon'
import SchemaMarkup from '@/components/seo/SchemaMarkup.astro'
import { getToolById } from '@/data/tools'
import { audienceHubs } from '@/data/audienceHubs'
import { getHubMeta } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'

const hub = audienceHubs.find((h) => h.audience === 'everyday')!
const meta = getHubMeta(hub.title, hub.description, '/everyday')
---

<BaseLayout {...meta}>
  <SchemaMarkup json={breadcrumbSchema([
    { name: 'Home', url: 'https://toolprime.dev/' },
    { name: 'Everyday Tools', url: 'https://toolprime.dev/everyday' },
  ])} slot="head" />

  <section class="text-center pt-8 pb-12">
    <h1 class="text-4xl sm:text-5xl font-extrabold mb-3">
      <span class="bg-clip-text text-transparent" style={`background: ${hub.gradient}`}>
        {hub.heading}
      </span>
    </h1>
    <p class="text-[var(--color-text-muted)] text-base max-w-lg mx-auto">{hub.subheading}</p>
  </section>

  {hub.subcategories.map((sub) => {
    const subTools = sub.toolIds.map((id) => getToolById(id)).filter((t): t is NonNullable<typeof t> => t !== undefined)
    if (subTools.length === 0) return null
    return (
      <section class="mb-12">
        <h2 class="text-xs font-semibold uppercase tracking-wider mb-4 text-[var(--color-text-muted)]">{sub.name}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {subTools.map((tool) => (
            <a href={tool.path} class="group flex items-start gap-3 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] hover:border-[var(--color-primary)] hover:shadow-lg hover:-translate-y-px transition-all">
              <GradientIcon icon={tool.icon} category={tool.category} size={36} />
              <div class="min-w-0">
                <h3 class="text-sm font-semibold">{tool.name}</h3>
                <p class="text-xs text-[var(--color-text-muted)] line-clamp-2">{tool.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    )
  })}

  <section class="mt-8" aria-labelledby="browse-hubs">
    <h2 id="browse-hubs" class="text-lg font-bold mb-4">Browse Other Categories</h2>
    <div class="flex gap-3">
      <a href="/developer" class="text-sm text-[var(--color-primary)] hover:underline">Developer Tools →</a>
      <a href="/design" class="text-sm text-[var(--color-primary)] hover:underline">Design Tools →</a>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Create `src/pages/developer.astro` and `src/pages/design.astro`**

Follow the exact same pattern as `everyday.astro` but with `audience === 'developer'` and `audience === 'design'` respectively. Change the "Browse Other Categories" links to point to the other two hubs.

- [ ] **Step 3: Update header nav in `src/layouts/BaseLayout.astro`**

Replace the existing desktop nav links:

```astro
<!-- Replace the desktop nav section -->
<nav class="hidden sm:flex gap-5 text-sm font-medium text-[var(--color-text-muted)]" aria-label="Main navigation">
  <a href="/everyday" class="hover:text-[var(--color-text)] transition-colors">Everyday</a>
  <a href="/developer" class="hover:text-[var(--color-text)] transition-colors">Developer</a>
  <a href="/design" class="hover:text-[var(--color-text)] transition-colors">Design</a>
  <a href="/blog" class="hover:text-[var(--color-text)] transition-colors">Blog</a>
</nav>
```

- [ ] **Step 4: Update mobile nav in `src/components/MobileNav.tsx`**

Add hub links to the mobile drawer. Replace the category-based navigation with audience hub links at the top:

```typescript
// Add hub links before the category list:
const hubLinks = [
  { href: '/everyday', label: 'Everyday Tools', gradient: 'linear-gradient(135deg, #34d399, #06b6d4)' },
  { href: '/developer', label: 'Developer Tools', gradient: 'linear-gradient(135deg, #818cf8, #6366f1)' },
  { href: '/design', label: 'Design Tools', gradient: 'linear-gradient(135deg, #fb923c, #f97316)' },
]

// Render in the drawer:
<div className="px-4 py-2">
  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">Browse by Audience</p>
  {hubLinks.map((hub) => (
    <a key={hub.href} href={hub.href} onClick={close}
      className="block py-2 text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors">
      {hub.label}
    </a>
  ))}
</div>
```

- [ ] **Step 5: Update hero badge on `src/pages/index.astro`**

Change "30+ Free Tools" to "35+ Free Tools" (or dynamically use `tools.length`).

- [ ] **Step 6: Verify build**

Run: `pnpm build 2>&1 | tail -20`
Expected: Build succeeds. 3 new hub pages. Navigation links work in dev server.

- [ ] **Step 7: Commit**

```bash
git add src/pages/everyday.astro src/pages/developer.astro src/pages/design.astro src/layouts/BaseLayout.astro src/components/MobileNav.tsx src/pages/index.astro
git commit -m "feat: add audience-split hub pages + update navigation"
```

---

## Task 8: FAQs, Tool Content, and OG Images

**Files:**
- Modify: `src/data/faqs.ts`
- Create: `src/data/tool-content-12.ts`
- Modify: `src/data/tool-content.ts` (import new file)
- Modify: `src/lib/og-image.ts` (add icon abbreviations)

**Depends on:** Tasks 1-6 complete.

- [ ] **Step 1: Add FAQs for 4 new tools to `src/data/faqs.ts`**

```typescript
  'currency-converter': [
    { question: 'How accurate are the exchange rates?', answer: 'Rates are fetched from the European Central Bank via the Frankfurter API and updated daily. For precise trading rates, consult your bank or broker.' },
    { question: 'Does the converter support cryptocurrency?', answer: 'Yes, we support Bitcoin (BTC), Ethereum (ETH), Solana (SOL), and Dogecoin (DOGE) conversions against major fiat currencies.' },
    { question: 'Is my conversion data saved?', answer: 'No. All conversions happen locally in your browser. No data is sent to any server.' },
  ],
  'age-calculator': [
    { question: 'How does the age calculator work?', answer: 'Enter your date of birth and the calculator instantly computes your exact age in years, months, and days by comparing your birth date to today\'s date.' },
    { question: 'Can I calculate age for a future date?', answer: 'The calculator is designed for past birth dates. For future date calculations, use our Date Calculator tool.' },
    { question: 'What generation am I?', answer: 'The calculator automatically shows your generation (Baby Boomer, Gen X, Millennial, Gen Z, or Gen Alpha) based on your birth year.' },
  ],
  'fraction-calculator': [
    { question: 'How do I add fractions with different denominators?', answer: 'Find the least common denominator (LCD), convert both fractions to use it, then add the numerators. Our calculator does this automatically and shows each step.' },
    { question: 'Can I convert decimals to fractions?', answer: 'Yes! Enter a decimal number in the conversion tab and the calculator will show the equivalent fraction in its simplest form.' },
    { question: 'Does it simplify fractions automatically?', answer: 'Yes, all results are automatically reduced to their simplest form using the greatest common divisor (GCD).' },
  ],
  'number-base-converter': [
    { question: 'What number bases are supported?', answer: 'The converter supports binary (base 2), octal (base 8), decimal (base 10), hexadecimal (base 16), and base 32.' },
    { question: 'What is the ASCII table?', answer: 'ASCII (American Standard Code for Information Interchange) maps numbers 0-127 to characters. For example, ASCII 65 = A, ASCII 97 = a.' },
    { question: 'How do I convert hex to decimal?', answer: 'Each hex digit represents a power of 16. For example, FF = 15×16 + 15 = 255. Our converter handles this instantly.' },
  ],
```

- [ ] **Step 2: Create `src/data/tool-content-12.ts`**

Write ~500 words of SEO content per tool following the `ToolContent` interface pattern (whatIs, useCases, tips). This is content that goes below the interactive tool.

```typescript
import type { ToolContent } from './tool-content'

export const toolContent12: Record<string, ToolContent> = {
  'currency-converter': {
    whatIs: {
      heading: 'What Is a Currency Converter?',
      body: 'A currency converter is a tool that calculates the equivalent value of one currency in terms of another...',
      // ~200 words covering what it does, who uses it, why ToolPrime's is special
    },
    useCases: {
      heading: 'Popular Use Cases',
      items: [
        { title: 'International Travel', description: 'Check exchange rates before traveling to know your spending power in the destination currency.' },
        { title: 'Online Shopping', description: 'Convert prices when buying from international stores to compare costs in your home currency.' },
        { title: 'Freelancing & Remote Work', description: 'Calculate invoice amounts when working with clients in different currencies.' },
        { title: 'Investment Research', description: 'Compare cryptocurrency values against fiat currencies for investment decisions.' },
      ],
    },
    tips: {
      heading: 'Currency Conversion Tips',
      items: [
        { title: 'Watch for Hidden Fees', description: 'Banks and payment processors often add 1-3% markup on top of the mid-market rate.' },
        { title: 'Convert During Business Hours', description: 'Currency markets are most active during overlapping business hours of major financial centers.' },
        { title: 'Use Mid-Market Rate as Benchmark', description: 'The mid-market rate (what you see here) is the fairest rate. Compare it with what your bank offers.' },
        { title: 'Consider Transfer Services', description: 'Services like Wise or Revolut typically offer rates closer to mid-market than traditional banks.' },
      ],
    },
  },
  'age-calculator': { /* Similar structure with ~500 words */ },
  'fraction-calculator': { /* Similar structure with ~500 words */ },
  'number-base-converter': { /* Similar structure with ~500 words */ },
}
```

- [ ] **Step 3: Import new content in `src/data/tool-content.ts`**

Add to the imports and merge:

```typescript
import { toolContent12 } from './tool-content-12'

export const allToolContent: Record<string, ToolContent> = {
  ...toolContent1,
  // ... existing imports ...
  ...toolContent12,
}
```

- [ ] **Step 4: Add icon abbreviations to `src/lib/og-image.ts`**

Add to the `iconAbbreviations` record:

```typescript
  'currency-converter': '$€',
  'age-calculator': '🎂',
  'fraction-calculator': '½',
  'number-base-converter': '01',
```

- [ ] **Step 5: Verify build**

Run: `pnpm build 2>&1 | tail -20`
Expected: Build succeeds. 4 new OG images generated. Tool pages show FAQs and content sections.

- [ ] **Step 6: Commit**

```bash
git add src/data/faqs.ts src/data/tool-content-12.ts src/data/tool-content.ts src/lib/og-image.ts
git commit -m "feat: add FAQs, SEO content, and OG images for phase 5a tools"
```

---

## Task 9: Integration Verification + NEXT_SESSION Update

**Files:**
- Modify: `NEXT_SESSION.md`

**Depends on:** All previous tasks complete.

- [ ] **Step 1: Full build verification**

Run: `pnpm build 2>&1 | tail -40`

Expected:
- 0 errors, 0 TypeScript errors
- Page count: ~15,000-35,000 (depending on currency/number-base entry counts)
- Build time: under 20 minutes (Cloudflare Pages limit)

- [ ] **Step 2: Spot-check pages**

Verify these pages exist in the build output and have correct content:
- `/currency-converter` (tool page)
- `/convert/100-usd-to-eur` (currency pSEO)
- `/currency/usd` (currency hub)
- `/age-calculator` (tool page)
- `/calculate/age-born-1990` (age pSEO)
- `/calculate/age-born-march-1985` (age+month pSEO)
- `/fraction-calculator` (tool page)
- `/calculate/1-2-plus-1-3` (fraction pSEO)
- `/convert/0-75-to-fraction` (decimal-to-fraction)
- `/number-base-converter` (tool page)
- `/convert/255-to-binary` (number base pSEO)
- `/convert/ascii-65` (ASCII pSEO)
- `/everyday` (hub page)
- `/developer` (hub page)
- `/design` (hub page)

Run: `ls dist/convert/100-usd-to-eur/index.html dist/calculate/age-born-1990/index.html dist/calculate/1-2-plus-1-3/index.html dist/convert/255-to-binary/index.html dist/everyday/index.html 2>&1`
Expected: All files exist.

- [ ] **Step 3: TypeScript check**

Run: `pnpm build` (already does type checking) or `npx tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 4: Update NEXT_SESSION.md**

Update with session 8 summary, new page counts, and Phase 5b priorities.

- [ ] **Step 5: Commit**

```bash
git add NEXT_SESSION.md
git commit -m "docs: update NEXT_SESSION.md for session 8 — phase 5a complete"
```

---

## Execution Dependencies

```
Task 1 (Registry) ──────┬──► Task 3 (Currency) ────────┐
                         ├──► Task 4 (Age)      ────────┤
Task 2 (SEO/Schema) ────┤                              ├──► Task 8 (Content/OG) ──► Task 9 (Verify)
                         ├──► Task 5 (Fractions) ───────┤
                         └──► Task 6 (Number Base) ─────┘
                                                        │
                         Task 7 (Hubs/Nav) ─────────────┘
```

Tasks 3, 4, 5, 6 are fully parallelizable after Tasks 1-2 complete.

**Shared file coordination (if parallel):**
- `src/pages/convert/[...slug].astro`: Tasks 3 and 6 both modify this. If parallel, one creates the discriminated union pattern, the other extends it. Recommendation: Task 3 goes first on this file.
- `src/pages/calculate/[...slug].astro`: Tasks 4 and 5 both need this. If parallel, Task 4 creates it, Task 5 extends it. Or merge both into one agent.

## Page Count Summary

| Source | Pages |
|--------|-------|
| Existing pages | ~4,320 |
| Currency conversions | ~6,200-15,000 |
| Currency hub pages | 51 |
| Age calculator pages | ~1,250 |
| Fraction calculator pages | ~8,125 |
| Decimal-to-fraction pages | 25 |
| Number base conversions | ~370-3,000 |
| ASCII table pages | 128 |
| Hub landing pages | 3 |
| Tool pages | 4 |
| **Estimated total** | **~20,500-32,000** |

Exact count depends on currency pair generation logic and number-base range expansion. Tune during implementation to hit the ~31,000 target.
