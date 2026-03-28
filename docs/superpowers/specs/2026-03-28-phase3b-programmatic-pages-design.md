# Phase 3b — More Programmatic Pages

> Target: ~853 new pages across 4 types → ~1665 total pages

## Overview

Expand programmatic SEO coverage by adding 4 new page types, each targeting different search intents. All follow the established pattern from Phase 3: data file → dynamic Astro route → SEO helpers.

## Architecture

Same pattern as existing programmatic pages:

```
src/data/<type>.ts          → Data definitions + helper functions
src/pages/<type>/[...slug].astro → Dynamic route with SSG
src/lib/seo.ts              → Meta tag generators (extend)
src/lib/schema.ts           → Schema.org markup (extend)
```

No new dependencies required. Hash computation uses existing `js-md5` + Node.js `crypto`.

---

## 1. Hash Lookup Pages

**~150 pages** at `/hashes/[algorithm]-[word]`

### Data (`src/data/hashes.ts`)

- 3 algorithms: `md5`, `sha1`, `sha256`
- 50 common words: `hello`, `password`, `admin`, `test`, `123456`, `world`, `foo`, `bar`, `example`, `user`, `login`, `secret`, `root`, `welcome`, `master`, `qwerty`, `monkey`, `dragon`, `letmein`, `abc123`, `trustno1`, `iloveyou`, `sunshine`, `princess`, `shadow`, `michael`, `jennifer`, `hunter`, `charlie`, `thomas`, `george`, `computer`, `internet`, `server`, `database`, `bitcoin`, `crypto`, `blockchain`, `openai`, `google`, `apple`, `amazon`, `github`, `linux`, `ubuntu`, `docker`, `python`, `javascript`, `react`, `nodejs`
- Hashes computed at build time (static)
- Interface: `HashEntry { algorithm, word, hash, slug }`
- Helper: `getRelatedByWord(word, excludeAlgo)` → same word, different algos
- Helper: `getRelatedByAlgorithm(algo, excludeWord)` → same algo, different words

### Template (`src/pages/hashes/[...slug].astro`)

- H1: "MD5 Hash of 'hello'"
- Large result box with hash value (monospace, copy button)
- Interactive hasher: input field for custom words (client-side, uses Web Crypto API for SHA, js-md5 for MD5)
- Cross-algorithm table: all 3 hashes for the same word
- Related links: hashes of other words
- SEO: `getHashMeta()` in seo.ts, `hashFaqSchema()` in schema.ts

### Linking

- `/hash-generator` tool page links to hash lookup pages
- Each hash page links back to `/hash-generator`

---

## 2. Reverse Percentage Pages

**~648 pages** at `/calculators/what-percent-is-[x]-of-[y]`

### Data (`src/data/percentages.ts` — extend)

- Reuse existing `bases` array as Y-values
- New `numerators` array as X-values (subset of bases where x ≤ y)
- Formula: `(x / y) * 100`
- Interface: `ReversePercentageEntry { x, y, result, slug }`
- Helper: `getReverseRelatedByY(y, excludeX)` → same Y, different X values
- Helper: `getReverseRelatedByX(x, excludeY)` → same X, different Y values
- Generate only combinations where `x <= y` (logically sensible)

### Template (`src/pages/calculators/[...slug].astro` — extend)

- Extend existing `getStaticPaths()` to include reverse entries
- Differentiate by slug prefix: `what-is-` → forward, `what-percent-is-` → reverse
- H1: "What Percent is 5 of 20?"
- Large result: "5 is 25% of 20"
- Interactive calculator: 2 number inputs → percentage output
- Explanation: "Divide 5 by 20, then multiply by 100"
- Related links to other reverse percentage pages
- SEO: `getReversePercentageMeta()` in seo.ts, `reversePercentageFaqSchema()` in schema.ts

### Distinction from existing pages

- Existing: "What is X% of Y?" → input percent + base → output number
- New: "What percent is X of Y?" → input two numbers → output percent
- Different search intent, no duplicate content

---

## 3. Regex Pattern Pages

**~25 pages** at `/regex/[pattern-name]`

### Data (`src/data/regexPatterns.ts`)

- Curated list of ~25 patterns
- Interface:
  ```ts
  interface RegexPattern {
    name: string           // "Email Validation"
    slug: string           // "email-validation"
    pattern: string        // regex string
    flags: string          // "gi", "i", etc.
    description: string    // what it matches
    examples: {
      match: string[]      // 3-4 matching strings
      noMatch: string[]    // 2-3 non-matching strings
    }
    explanation: string[]  // step-by-step breakdown of pattern parts
    codeSnippets: {
      javascript: string
      python: string
      php: string
    }
    tags: string[]         // ["validation", "web"]
  }
  ```

### Pattern list (~25)

1. Email Validation
2. URL Validation
3. Phone Number (International)
4. Phone Number (US)
5. Phone Number (EU)
6. IPv4 Address
7. IPv6 Address
8. Date (YYYY-MM-DD)
9. Date (DD/MM/YYYY)
10. Time (HH:MM:SS)
11. Hex Color Code
12. Credit Card Number
13. Postal Code (US ZIP)
14. Username (alphanumeric)
15. Strong Password
16. URL Slug
17. HTML Tag
18. Whitespace Trim
19. Digits Only
20. Alphanumeric Only
21. File Extension
22. Domain Name
23. MAC Address
24. UUID
25. Markdown Link

### Template (`src/pages/regex/[...slug].astro`)

- H1: "Regex for Email Validation"
- Pattern box: large, copyable regex (monospace)
- Live tester: input field to test strings against pattern (client-side `<script>`, no React)
- Match/no-match examples table (green/red indicators)
- Pattern breakdown: each part explained
- Code snippets: JS, Python, PHP (with copy buttons)
- Related: links to patterns with shared tags
- SEO: `getRegexMeta()` in seo.ts, `regexFaqSchema()` in schema.ts (FAQPage + HowTo)

### Linking

- `/regex-tester` tool page links to pattern pages
- Each pattern page links back to `/regex-tester`

---

## 4. Gradient Preset Pages

**~30 pages** at `/gradients/[name]`

### Data (`src/data/gradients.ts`)

- Curated list of ~30 gradients
- Interface:
  ```ts
  interface GradientPreset {
    name: string         // "Sunset Orange"
    slug: string         // "sunset-orange"
    colors: string[]     // ['#FF512F', '#F09819']
    direction: number    // 135 (degrees)
    category: 'warm' | 'cool' | 'dark' | 'pastel' | 'vibrant'
  }
  ```

### Gradient list (~30)

Warm: Sunset Orange, Warm Flame, Juicy Peach, Mango Pulp, Autumn Leaves, Golden Hour
Cool: Ocean Blue, Arctic Ice, Winter Breeze, Aqua Marine, Cool Sky, Pacific Dream
Dark: Midnight Purple, Deep Space, Dark Knight, Obsidian, Charcoal Mist, Eclipse
Pastel: Cotton Candy, Lavender Dream, Mint Fresh, Peach Blush, Baby Blue, Rose Quartz
Vibrant: Neon Glow, Electric Purple, Cyber Punk, Lime Burst, Hot Pink, Tropical Punch

### Template (`src/pages/gradients/[...slug].astro`)

- H1: "Sunset Orange Gradient"
- Large preview: full-width gradient box (~200px height)
- CSS code box: copyable `background: linear-gradient(...)` code
- Tailwind code: `bg-gradient-to-r from-[#FF512F] to-[#F09819]`
- Interactive editor: direction slider (0-360°) with live preview update (plain `<script>`)
- Color details: hex values of each stop with color squares
- Related: links to gradients in same category
- SEO: `getGradientMeta()` in seo.ts, `gradientFaqSchema()` in schema.ts

### Linking

- `/css-gradient-generator` tool page links to gradient presets
- Each gradient page links back to `/css-gradient-generator`

---

## Cross-cutting concerns

### SEO (`src/lib/seo.ts` + `src/lib/schema.ts`)

4 new meta generators + 4 new schema generators, following existing patterns:

- `getHashMeta(algorithm, word, hash)` → title, description, canonical
- `getReversePercentageMeta(x, y, result)` → title, description, canonical
- `getRegexMeta(name, pattern)` → title, description, canonical
- `getGradientMeta(name, colors)` → title, description, canonical

### Internal linking

- Each new page type links to its parent tool page
- Parent tool pages get a "Popular [type]" section linking to programmatic pages
- Footer: no changes needed (tools already linked)

### Build impact

- Current: 812 pages in ~9s
- Expected: ~1665 pages in ~15-20s (linear scaling, all SSG)

### No new dependencies

- MD5: existing `js-md5`
- SHA1/SHA256: Node.js `crypto` (build-time only)
- Regex: native JavaScript
- Gradients: pure CSS, no library needed
