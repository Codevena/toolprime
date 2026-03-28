# Phase 3: Programmatic SEO Expansion — Design Spec

**Date:** 2026-03-28
**Goal:** Expand from 62 to ~710+ pages via programmatic generation targeting long-tail search queries.
**Scope:** Percentage Calculator pages + expanded Unit Conversions only. Hash Lookup, Gradient Presets, and Regex Patterns deferred to a future session.

---

## 1. Percentage Calculator Pages (~648 pages)

### URL Pattern

`/calculators/what-is-X-percent-of-Y`

Examples:
- `/calculators/what-is-15-percent-of-200`
- `/calculators/what-is-5-percent-of-1000`
- `/calculators/what-is-50-percent-of-300`

### Data Source

**File:** `src/data/percentages.ts`

**Percentages (24 values):**
1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 30, 33, 40, 50, 60, 70, 75, 80, 90, 100

**Base numbers (27 values):**
10, 20, 25, 30, 40, 50, 60, 75, 80, 100, 120, 150, 200, 250, 300, 400, 500, 600, 750, 800, 1000, 1500, 2000, 2500, 3000, 5000, 10000

**Total combinations:** 24 × 27 = 648

Each entry is generated programmatically (not hand-written):

```ts
export interface PercentageEntry {
  percentage: number
  base: number
  result: number  // precomputed: base * percentage / 100
  slug: string    // e.g. "what-is-15-percent-of-200"
}

export const percentages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 30, 33, 40, 50, 60, 70, 75, 80, 90, 100]
export const bases = [10, 20, 25, 30, 40, 50, 60, 75, 80, 100, 120, 150, 200, 250, 300, 400, 500, 600, 750, 800, 1000, 1500, 2000, 2500, 3000, 5000, 10000]

export const percentageEntries: PercentageEntry[] = percentages.flatMap(p =>
  bases.map(b => ({
    percentage: p,
    base: b,
    result: b * p / 100,
    slug: `what-is-${p}-percent-of-${b}`,
  }))
)
```

### Page Template

**File:** `src/pages/calculators/[...slug].astro`

Uses `getStaticPaths()` to generate all 648 pages from `percentageEntries`.

**Page structure:**

1. **Breadcrumbs:** Home → Percentage Calculator → "15% of 200"
2. **H1:** "What is 15% of 200?"
3. **Answer box:** Large, prominent display: **"15% of 200 = 30"**
4. **Interactive calculator:** User can change percentage and base values, result updates live via client-side JS (no React needed — vanilla `<script>` like converters)
5. **Explanation section:** "How to calculate 15% of 200" — shows formula: `200 × 15/100 = 200 × 0.15 = 30`
6. **Related calculations table:** "Other percentages of 200" (5%, 10%, 20%, 25%, 50% of 200) + "15% of other numbers" (15% of 100, 150, 250, 300, 500)
7. **SEO content:** Short paragraph explaining percentage calculation concept

### Index Page

**File:** `src/pages/calculators/index.astro`

Hub page listing all percentage calculations grouped by base number. Links to all 648 sub-pages. Acts as a crawl entry point.

- H1: "Percentage Calculator — What is X% of Y?"
- Interactive calculator (same as the one on tool pages)
- Grouped links: "Percentages of 100", "Percentages of 200", etc.

### SEO

**Title:** `What is 15% of 200? Answer: 30 | ToolPrime`
**Description:** `15% of 200 = 30. Calculate percentages instantly with our free online percentage calculator. No signup required.`
**Canonical:** `https://toolprime.dev/calculators/what-is-15-percent-of-200`

**Structured Data:** FAQPage schema with Q: "What is 15% of 200?" A: "15% of 200 is 30. To calculate, multiply 200 by 0.15."

**Internal linking:**
- Each page links to ~10 related calculation pages
- Index page links to all pages
- Percentage Calculator tool page links to index
- Footer "Resources" links to `/calculators`

### SEO Helper

Add to `src/lib/seo.ts`:

```ts
export function getPercentageMeta(percentage: number, base: number, result: number): MetaTags {
  const title = `What is ${percentage}% of ${base}? Answer: ${result} | ToolPrime`
  const description = `${percentage}% of ${base} = ${result}. Calculate percentages instantly with our free online percentage calculator. No signup required.`
  return {
    title,
    description,
    canonical: `https://toolprime.dev/calculators/what-is-${percentage}-percent-of-${base}`,
    ogTitle: `What is ${percentage}% of ${base}?`,
    ogDescription: description,
    ogType: 'website',
  }
}
```

---

## 2. Expanded Unit Conversions (~160 new entries, ~200 total)

### Approach

Add entries to existing `src/data/conversions.ts`. No structural changes needed — the existing `[...slug].astro` page, `getSlug()`, `convert()`, and SEO helpers all work as-is.

### New Categories

Add to `ConversionCategory` type and `conversionCategoryLabels`:

- **energy:** `'Energy'`
- **pressure:** `'Pressure'`
- **fuel:** `'Fuel Economy'`

### New Entries

**Length (add ~8):**
- nautical mile ↔ kilometer, mile ↔ nautical mile
- micrometer ↔ millimeter, micrometer ↔ inch
- league ↔ kilometer, league ↔ mile
- fathom ↔ meter, fathom ↔ foot

**Weight (add ~10):**
- milligram ↔ gram, microgram ↔ milligram
- carat ↔ gram, carat ↔ ounce
- short ton ↔ kilogram, short ton ↔ metric ton
- long ton ↔ kilogram, long ton ↔ metric ton
- stone ↔ pound, grain ↔ gram

**Volume (add ~14):**
- pint (US) ↔ liter, quart (US) ↔ liter
- cubic meter ↔ liter, cubic foot ↔ liter
- cubic inch ↔ milliliter, cubic centimeter ↔ milliliter
- teaspoon ↔ milliliter, imperial gallon ↔ liter
- imperial pint ↔ milliliter, imperial fluid ounce ↔ milliliter
- barrel (oil) ↔ liter, bushel ↔ liter
- cup (US) ↔ fluid ounce, tablespoon ↔ teaspoon

**Area (add ~8):**
- square inch ↔ square centimeter, square yard ↔ square meter
- acre ↔ hectare, acre ↔ square meter
- square foot ↔ square meter (reverse of existing)
- square mile ↔ square kilometer (reverse), square mile ↔ acre
- are ↔ square meter

**Speed (add ~6):**
- ft/s ↔ m/s, ft/s ↔ mph
- cm/s ↔ m/s, mach ↔ km/h
- mach ↔ mph, knot ↔ mph

**Temperature (add ~2):**
- fahrenheit ↔ kelvin (formula), kelvin ↔ celsius (reverse of existing)

**Digital (add ~8):**
- bit ↔ byte, byte ↔ kilobyte
- petabyte ↔ terabyte, exabyte ↔ petabyte
- mebibyte ↔ megabyte, gibibyte ↔ gigabyte
- tebibyte ↔ terabyte, kibibyte ↔ kilobyte

**Time (add ~8):**
- second ↔ millisecond, minute ↔ second
- month ↔ day, month ↔ week
- decade ↔ year, century ↔ year
- microsecond ↔ millisecond, nanosecond ↔ microsecond

**Energy (new, ~12):**
- joule ↔ calorie, joule ↔ kilojoule
- calorie ↔ kilocalorie, kilocalorie ↔ joule
- kWh ↔ joule, kWh ↔ kilocalorie
- BTU ↔ joule, BTU ↔ kilocalorie
- watt-hour ↔ joule, watt-hour ↔ kWh
- electronvolt ↔ joule, therm ↔ BTU

**Pressure (new, ~10):**
- pascal ↔ bar, pascal ↔ psi
- bar ↔ psi, bar ↔ atm
- atm ↔ pascal, atm ↔ psi
- mmHg ↔ pascal, mmHg ↔ atm
- torr ↔ pascal, kPa ↔ psi

**Fuel Economy (new, ~6):**
- km/L ↔ L/100km (formula), km/L ↔ mpg (US)
- L/100km ↔ mpg (US) (formula), mpg (US) ↔ mpg (UK)
- mpg (UK) ↔ L/100km (formula), mpg (US) ↔ km/L

**Estimated total new entries: ~92 entries (each generates 1 page)**
**Total conversions: ~132 pages** (40 existing + 92 new)

Note: Some conversions use formulas (fuel economy, temperature). These need entries in `formulaFunctions`.

### Category Colors

New categories need gradient colors in the category system (for GradientIcon on the Unit Converter page if categories are displayed). Follow existing pattern in the design system.

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/data/percentages.ts` | Percentage entries data (generated) |
| `src/pages/calculators/[...slug].astro` | Percentage calculator page template |
| `src/pages/calculators/index.astro` | Percentage calculator index/hub page |

## Files to Modify

| File | Change |
|------|--------|
| `src/data/conversions.ts` | Add ~92 new conversion entries + 3 new categories |
| `src/lib/seo.ts` | Add `getPercentageMeta()` function |
| `src/lib/schema.ts` | Add percentage FAQPage schema helper |
| `src/layouts/BaseLayout.astro` | Update footer "Resources" to link to `/calculators` |
| `src/data/tools.ts` | Add Percentage Calculator index to tools if needed for homepage |

## Build Impact

- Current: 62 pages in ~4.3s
- Expected: ~710+ pages in ~15-25s
- All pages are static HTML — no runtime cost

## Out of Scope

- Hash Lookup pages (future session)
- Gradient Preset pages (future session)
- Regex Pattern pages (future session)
- "X is what percent of Y" variant
- "Percent change from X to Y" variant
- Blog/article content
