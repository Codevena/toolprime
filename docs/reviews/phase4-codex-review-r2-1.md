# Phase 4 Code Review — Round 2 (post-fix)

Reviewed commits: a87f8dd..HEAD (after 28c6940 fixes)
Reviewer: Claude Sonnet 4.6
Date: 2026-03-29

---

## Finding 1 — Critical: BMI canonical URL does not match the actual page URL

**File:** `src/lib/seo.ts`, function `getBmiMeta`

**Problem:** `getBmiMeta` constructs the canonical as:
```
https://toolprime.dev/calculators/bmi-${heightCm}cm-${weightKg}kg
```
The actual built page lives at `/calculators/bmi/bmi-150cm-50kg` (under the `src/pages/calculators/bmi/[slug].astro` route). The canonical is missing the `/bmi/` directory segment, so every BMI detail page tells search engines the authoritative URL is a non-existent path.

Confirmed in the built output:
```html
<link rel="canonical" href="https://toolprime.dev/calculators/bmi-150cm-50kg">
```
while the real URL is `/calculators/bmi/bmi-150cm-50kg`.

**Fix:** Change the canonical in `getBmiMeta`:
```ts
canonical: `${SITE_URL}/calculators/bmi/${heightCm}cm-${weightKg}kg`,
```
or, if the full slug is preferred:
```ts
canonical: `${SITE_URL}/calculators/bmi/bmi-${heightCm}cm-${weightKg}kg`,
```
(The latter matches the slug format used by `buildSlug` in `bmiData.ts`.)

---

## Finding 2 — High: JSON-LD structured data rendered in `<body>`, not `<head>`

**Files:**
- `src/pages/cron/[slug].astro`
- `src/pages/calculators/mortgage-[slug].astro`
- `src/pages/calculators/bmi/[slug].astro`
- `src/pages/calculators/tip-on-[slug].astro`
- `src/pages/meta-tags/[slug].astro`
- `src/pages/robots-txt/[slug].astro`

**Problem:** All six pages use `<SchemaMarkup>` without `slot="head"`. `BaseLayout.astro` exposes a `<slot name="head" />` inside `<head>`. Without the slot attribute, the `<script type="application/ld+json">` tag is injected into `<body>`. The built HTML for `/calculators/bmi/bmi-150cm-50kg` and `/cron/every-minute` confirms the schemas appear inside `<main>`.

While Google does index body-placed JSON-LD, it is non-standard and can be misread by other crawlers (Bing, Pinterest rich pins). The `palettes/[slug].astro` and `BlogLayout.astro` pages correctly use `slot="head"` — these six pages should match.

**Fix:** Add `slot="head"` to each `<SchemaMarkup>` call in those six files, e.g.:
```astro
<SchemaMarkup json={cronFaqSchema(expr.faqs)} slot="head" />
<SchemaMarkup json={cronHowToSchema(expr.name, expr.expression)} slot="head" />
```

---

## Finding 3 — Medium: Hardcoded category colors in `BmiCalculator.tsx` do not respect design tokens

**File:** `src/components/tools/BmiCalculator.tsx` lines 15–18, 315–330

**Problem:** The BMI category colors (`#38bdf8`, `#22c55e`, `#f59e0b`, `#ef4444`) are hardcoded in the `BMI_CATEGORIES` constant and duplicated in inline `style={{ color: ... }}` props. These values will not adapt to theme changes. The same colors appear in `src/data/bmiData.ts` (`getCategoryColor`) and `src/pages/calculators/bmi/[slug].astro`, so four files carry the same magic color values.

These are semantic category indicators, not data/palette colors (where hardcoding is expected and appropriate). They should be CSS custom properties so the design system can control them.

**Fix:** Define CSS variables (e.g. `--color-bmi-underweight`, `--color-bmi-normal`, `--color-bmi-overweight`, `--color-bmi-obese`) in the global stylesheet and reference them. If defining global variables is out of scope, at minimum extract the four values into a single shared constant imported by all four locations.

---

## Finding 4 — Medium: Redundant conditional in blog index `href`

**File:** `src/pages/blog/index.astro`, line 81

**Problem:** The `href` attribute uses a ternary that produces the same value in both branches:
```astro
href={article.isProgrammatic ? `/blog/${article.slug}` : `/blog/${article.slug}`}
```
Both branches are identical — the conditional is dead code and signals incomplete implementation (the programmatic articles were presumably meant to route differently at some point).

**Fix:** Simplify to:
```astro
href={`/blog/${article.slug}`}
```

---

## Finding 5 — Low: Hardcoded date in `how-to-[slug].astro`

**File:** `src/pages/blog/how-to-[slug].astro`, line 27 and line 45

**Problem:**
```ts
const dateStr = '2026-03-29'
```
and
```astro
<time datetime={dateStr}>March 29, 2026</time>
```
The date is hardcoded as a string literal. This means all 50 programmatic how-to articles will always display "March 29, 2026" regardless of when they are actually published, and the Google-visible `datePublished` in the JSON-LD schema will be the same static string forever.

This is a minor SEO/freshness signal issue. The date should be derived from `article.date` (which is already defined in the `HowToArticle` interface structure, though the data currently does not include a `date` field) or at minimum from the `blogTemplates` export. An alternative is using the build timestamp.

**Note:** The content collection blog posts (`[...slug].astro`) do correctly derive the date from `post.data.date` via `BlogLayout`. Only the programmatic route is affected.

---

## Summary

| # | Severity | File(s) | Issue |
|---|----------|---------|-------|
| 1 | Critical | `src/lib/seo.ts` | BMI canonical URL missing `/bmi/` path segment |
| 2 | High | 6 `[slug].astro` pages | `<SchemaMarkup>` missing `slot="head"` — renders JSON-LD in `<body>` |
| 3 | Medium | `BmiCalculator.tsx`, `bmiData.ts`, `bmi/[slug].astro` | Hardcoded category hex colors duplicated across 3+ files |
| 4 | Medium | `src/pages/blog/index.astro` | Dead ternary — both branches of `isProgrammatic` href are identical |
| 5 | Low | `src/pages/blog/how-to-[slug].astro` | Hardcoded date literal `'2026-03-29'` in schema and display |

No TypeScript errors (build passes clean). No XSS vulnerabilities (DOMPurify is applied correctly in both `MarkdownEditor.tsx` and `MarkdownToPdf.tsx`). No route conflicts (Astro correctly resolves `how-to-[slug].astro` before `[...slug].astro`). No `console.log` calls found in new code.
