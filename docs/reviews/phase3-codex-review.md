# Phase 3 — Programmatic SEO Review
**Diff reviewed:** `52d7afa..HEAD`
**Commits reviewed:** 6 commits (8bfeedc through ad92dcd)
**Build result:** 799 pages, 0 errors

---

## Scope

Changes reviewed:
- `src/data/percentages.ts` — new file, percentage entry generator (648 entries)
- `src/data/conversions.ts` — 92 new conversion entries across 3 new categories + additional entries for 5 existing categories
- `src/lib/seo.ts` — `getPercentageMeta()` and `getPercentageIndexMeta()` helpers
- `src/lib/schema.ts` — `percentageFaqSchema()` helper
- `src/pages/calculators/[...slug].astro` — programmatic page template
- `src/pages/calculators/index.astro` — calculator index page
- `src/pages/unit-converter.astro` — content update for new categories
- `src/layouts/BaseLayout.astro` — footer link addition
- `src/components/MobileNav.tsx` — null guard fix

---

## 1. Build Integrity

Pass. The build completes cleanly at 799 pages with zero errors and zero TypeScript diagnostics. The sitemap is generated. Page counts are arithmetically consistent: 24 percentages × 27 bases = 648 programmatic pages, plus 1 index page = 649 new calculator pages.

---

## 2. Percentage Calculations

Pass. All 648 computed results are correct. The `formatResult` utility using `toPrecision(10)` correctly suppresses floating-point noise (e.g., `0.30000000000000004` becomes `0.3`) without introducing rounding errors at the precision level used. Spot-checked values across edge cases (1% of 10 = 0.1, 33% of 100 = 33, 25% of 1000 = 250, 100% of 10000 = 10000) are all exact.

Slug uniqueness: 648 slugs generated from `what-is-{p}-percent-of-{b}`. All are unique because the `(percentage, base)` pairs are unique by construction. No collisions.

---

## 3. Conversion Factor Accuracy

### 3.1 Energy Category

**FINDING — Medium: Mixed calorie definitions in the energy category.**

The energy entries use two incompatible calorie definitions without documentation:

- `kcal -> J` uses the thermochemical kilocalorie: **4184 J/kcal**
- `BTU -> kcal` factor `0.251996` implies: 1055.06 / 0.251996 = **4186.8 J/kcal** (the IT kilocalorie)
- `kWh -> kcal` factor `860.421` is consistent with thermochemical kcal (3,600,000 / 4184 = 860.4207), so this one is correct

The BTU->kcal factor is off by 0.067% from the value implied by the `kcal->J` and `BTU->J` entries. Specifically:

```
BTU->J = 1055.06
kcal->J = 4184
Implied BTU->kcal = 1055.06 / 4184 = 0.25216 (thermochemical)
Given BTU->kcal = 0.251996 (~IT calorie definition)
```

This creates internal inconsistency: converting BTU->J->kcal gives a different result than converting BTU->kcal directly. The error is small (0.067%) but it is a factual inaccuracy. The fix is to use `0.25216` (thermochemical) to match the `kcal->J = 4184` entry, or to document that the category uses IT calories throughout and update `kcal->J` to `4186.8`.

All other energy factors verified as correct: joule/kilojoule/kilocalorie/kilojoule chain, watt-hour, kWh, electronvolt, therm.

### 3.2 Pressure Category

Pass. All 14 pressure factors verified against SI definitions. pascal/bar/psi/atmosphere/mmHg/torr/kilopascal all check out within 0.001% of exact values. The rounded approximations used (e.g., `atm->psi = 14.696`) match the standard engineering reference values.

### 3.3 Fuel Economy Category

Pass. All factors and formulas are correct:
- `km/L <-> L/100km`: formula `100 / x` is the standard reciprocal relationship and is self-inverse (correct use of `reverseFormula`)
- `L/100km <-> mpg (US)`: formula `235.215 / x` — verified: 1 mpg (US) = 1.60934 km / 3.78541 L = 0.42514 km/L, and 100/0.42514 = 235.21 L/100km (matches constant)
- `km/L <-> mpg (US)`: factor `2.35215` — verified as `235.215/100`
- `mpg (US) <-> mpg (UK)`: factors `1.20095` and `0.832674` — verified using US gallon (3.78541 L) and imperial gallon (4.54609 L)

All four new formula keys (`100 / x`, `235.215 / x`, `(x - 32) * 5/9 + 273.15`, `(x - 273.15) * 9/5 + 32`) are present in the `formulaFunctions` lookup table.

### 3.4 Additional Entries for Existing Categories

Pass. All additional length, weight, volume, area, speed, time, and digital storage factors verified. Notable:
- GiB->GB factor `1.073742` is truncated from the exact `1.073741824` (error: 0.000016%). Functionally negligible but could be made exact.
- League->km factor `4.828` matches 3 statute miles (3 × 1.609344 = 4.828032), within 0.001%
- Knot->mph factor `1.15078` verified exact from `1.852/1.609344`
- Mach->km/h `1234.8` and mach->mph `767.269` are internally consistent

---

## 4. Conversion Slug Collisions

Pass. All 34 new conversion slugs are unique. Cross-checked against the slug generation function (`fromAbbr.toLowerCase().replace(/[^a-z0-9]/g, '') + '-to-' + toAbbr.toLowerCase().replace(/[^a-z0-9]/g, '')`). The fuel economy abbreviations that contain slashes and spaces (e.g., `km/L`, `L/100km`, `mpg UK`) all produce distinct slugs (`kml-to-l100km`, `l100km-to-mpg`, `mpg-to-mpguk`). No collisions with existing slugs detected.

---

## 5. SEO and Metadata

### 5.1 Meta Tags

Pass for titles. Maximum title length across all 648 pages is 48 characters (`What is 100% of 10000? Answer: 10000 | ToolPrime`), well within the 60-character guideline. All meta descriptions are under 120 characters, within the 160-character recommendation.

Canonical URLs are dynamically constructed from `SITE_URL` constant in `seo.ts`. No hardcoded domains in SEO helpers.

Minor: The Breadcrumbs component in `src/pages/calculators/[...slug].astro` line 26 uses a hardcoded `https://toolprime.dev/calculators` URL rather than `meta.canonical` from the already-imported `getPercentageIndexMeta()`. This is inconsistent with the pattern — the URL is correct but not DRY. The existing converter pages in `src/pages/converters/[...slug].astro` follow the same hardcoded breadcrumb pattern so this is consistent with project conventions, not an introduced regression.

### 5.2 Structured Data

**FINDING — Low: Single Q&A per FAQPage schema.**

The `percentageFaqSchema()` function generates a `FAQPage` schema with exactly one `Question` entity. Google's rich results documentation does not specify a minimum, but the practical eligibility threshold for rich snippets is generally 2-3 Q&As. A single-question FAQPage is valid JSON-LD and will not cause errors, but it reduces the chances of rich result display. Adding 2 additional questions (e.g., "How do I calculate percentages?" and "What is {percentage}% as a decimal?") would improve rich result eligibility at low cost.

The schema content itself is factually correct: the formula description `{base} × {percentage / 100} = {result}` is accurate and the computed values are correct.

### 5.3 Heading Hierarchy

Pass. Each calculator page has one `<h1>` and two `<h2>` elements (plus conditional related-links sections with additional `<h2>`). The index page has one `<h1>` and 27 `<h2>` headings (one per base value). The high `<h2>` count on the index is a consequence of the content structure, not a hierarchy violation.

---

## 6. Edge Cases and Robustness

### 6.1 Divide-by-Zero in Fuel Formulas

**FINDING — Low: No zero-input guard for reciprocal fuel formulas.**

The formulas `100 / x` and `235.215 / x` produce `Infinity` when the user enters `0` in the UnitConverter. JavaScript does not throw — it returns `Infinity` silently, and the converter will display `Infinity` as the result. The existing `doConvert` function in `UnitConverter.tsx` has no guard for `Infinity` or `NaN` output from formula-based conversions.

The same code path that handles temperature formula errors (`if (!fn) return null`) does not guard against formula output being non-finite.

Suggested fix in `doConvert`:
```ts
const result = fn(value)
return isFinite(result) ? result : null
```

This would display an empty result rather than `Infinity` when the user enters 0 for a fuel conversion.

### 6.2 Static Answer Span Redundancy

**INFO: `<span id="answer">` is never updated by the client-side calculator script.**

The page renders the SSR result in both a `<span id="answer">` inside the answer card and as the pre-filled value of `<input id="calc-result">`. When the user changes the calculator inputs, only `calc-result` updates. The `answer` span retains the original SSR value permanently. This is not a bug (the answer card is intentionally static), but the `id="answer"` attribute implies dynamic usage and could confuse future maintainers. The `id` is unused by JS and can be removed without any functional change.

### 6.3 Percentage Calculator — Negative and Extreme Inputs

Pass. The interactive scripts on both `/calculators` and `/calculators/[...slug]` correctly handle negative inputs (producing negative results, which is mathematically valid) and very large numbers (no overflow at any realistic value). `isNaN` checks prevent display of invalid states.

---

## 7. Footer Navigation

**FINDING — Low: Two footer links with ambiguous labels for calculator pages.**

`BaseLayout.astro` now has two adjacent footer links:
- `/percentage-calculator` labeled "Calculators" (pre-existing tool page)
- `/calculators` labeled "Percentage Calculator" (new Phase 3 index)

The labels are inverted relative to expectation: the page at `/calculators` is the more general index and should be labeled "Calculators", while `/percentage-calculator` is the specific tool and is correctly labeled "Percentage Calculator". The current arrangement is backwards and may confuse users navigating via the footer.

This was not introduced in a single commit — the `/percentage-calculator` link predates Phase 3. However, Phase 3 adds the second link without updating the first, creating the ambiguity.

---

## 8. Code Quality and Consistency

**MobileNav null guard (8bfeedc):** The added `if (!first || !last) return` guard in `MobileNav.tsx` is correct and safe. This prevents a runtime error if the focus trap finds no focusable elements in the nav.

**Pattern consistency:** The new pages follow the existing project patterns precisely — `BaseLayout`, `Breadcrumbs`, `SchemaMarkup`, `getStaticPaths`, design tokens via CSS variables, Tailwind classes. No pattern drift introduced.

**No eval/new Function:** The fuel formulas correctly use the existing `formulaFunctions` lookup table rather than eval. This is the correct pattern.

**TypeScript:** No new `any` types introduced. The `PercentageEntry` interface is properly typed. The `ConversionCategory` union type is correctly extended.

---

## 9. Performance

The `/calculators` index page generates approximately 131 KB of HTML (648 anchor tags in 27 sections). This is statically generated and served as compressed HTML — acceptable for a Jamstack deployment. No JavaScript is required to render the index page beyond the inline quick-calculator script. No issues.

Individual calculator pages are minimal — one FAQ schema JSON blob, two related-links sections of up to 8 items each, and a small inline script. No performance concerns.

---

## Summary of Findings

| Severity | Count | Items |
|----------|-------|-------|
| Critical | 0 | — |
| Medium   | 1 | BTU->kcal mixed calorie definition |
| Low      | 4 | Divide-by-zero in fuel formulas; Footer label ambiguity; Single FAQ Q&A; GiB factor truncated |
| Info     | 2 | Static answer span id; Index page size |

---

## Recommended Fixes (Priority Order)

**1. Fix BTU->kcal factor (Medium)**
Change `factor: 0.251996` to `factor: 0.25216` to align with the thermochemical calorie used by the `kcal->J = 4184` entry. This eliminates the round-trip inconsistency BTU->J->kcal vs BTU->kcal.

**2. Guard against Infinity in doConvert (Low)**
In `src/components/tools/UnitConverter.tsx`, after calling `fn(value)` for formula-based conversions, add `return isFinite(result) ? result : null` to prevent the display of `Infinity` when a user enters 0 in a fuel conversion.

**3. Resolve footer label ambiguity (Low)**
Either swap the two footer labels so `/calculators` reads "Calculators" and `/percentage-calculator` reads "Percentage Calculator", or consolidate to a single footer link if both pages serve similar discovery purposes.

**4. Expand FAQ schema to 3 Q&As (Low)**
Add two additional questions to `percentageFaqSchema()` to improve rich result eligibility. Suggested additions: a general "How do I calculate X% of Y?" with the formula explanation, and "What is {percentage}% as a decimal?" with `{percentage / 100}` as the answer.

**5. Exact GiB factor (Info/Optional)**
Change gibibyte factor from `1.073742` to `1.073741824`. The current value is functionally correct but imprecise.

**6. Remove unused `id="answer"` (Info/Optional)**
The `id` attribute on the static answer span is not referenced by any JavaScript. Remove it to avoid implying dynamic behavior.
