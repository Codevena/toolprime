# Phase 5a Round 2 — Codex Review 1

**Base commit:** `edbb3f3`
**HEAD:** current (includes `b0a75ad` round 1 fixes)
**TypeScript:** PASS — 0 errors (`npx tsc --noEmit`)
**Build:** PASS — 19,889 pages built successfully on second run
**Build note:** First run produced an intermittent Astro prerender race condition (`ERR_MODULE_NOT_FOUND` for a `.prerender/chunks/_.._jl_DgDbz.mjs` chunk). Second run succeeded cleanly. This is a known Astro 6 parallel-build race condition, not caused by any code in this diff.

---

## Findings

### Finding 1 — HIGH: `currencyFaqSchema` embeds unformatted raw float in schema answer

**File:** `src/lib/schema.ts` line 227
**File:** `src/components/pseo/CurrencyConversionPage.astro` line 39

The `rate` argument passed to `currencyFaqSchema` is the raw return value of `convertCurrency(1, fromCode, toCode, rates)`, which is an unformatted JavaScript float. The schema function interpolates this directly:

```
answer: `...1 ${fromCode} = ${rate} ${toCode}.`
```

This produces structured data answers like `"1 USD = 0.8586956521739131 GBP"` instead of the human-readable `"1 USD = 0.8587 GBP"`. The `fmt()` helper function exists in `CurrencyConversionPage.astro` and formats correctly, but it is not used when constructing the schema call.

**Fix:** Format `rate` before passing it to `currencyFaqSchema`, or add internal formatting inside the function. Also applies to the `result` parameter — that one is formatted with `toLocaleString` inside the schema function, so it is fine.

---

### Finding 2 — MEDIUM: `fractionFaqSchema` renders zero-result fractions as `0/1` instead of `0`

**File:** `src/lib/schema.ts` line 276

The schema function receives raw numerator and denominator integers and interpolates them directly:

```
answer: `${n1}/${d1} ${opSymbol} ${n2}/${d2} = ${resultN}/${resultD}.`
```

When the result is zero (e.g. `1/2 − 1/2`), `computeFraction` returns `{ n: 0, d: 1 }` after simplification. The schema answer then reads `"1/2 − 1/2 = 0/1."` instead of `"1/2 − 1/2 = 0."`. The `formatFraction()` helper already handles this case by returning `String(n)` when `d === 1`, but it is not used here.

Approximately 21 pSEO pages are affected (all identical-fraction subtraction pairs from `commonFractions`).

**Fix:** Replace `${resultN}/${resultD}` with `${formatFraction({ n: resultN, d: resultD })}` in both the question and answer of `fractionFaqSchema`. Import `formatFraction` into `schema.ts`.

---

### Finding 3 — MEDIUM: `decimalEntries` presents approximations as exact fractions

**File:** `src/data/fractionData.ts` lines 659–672

Three hardcoded entries claim a finite decimal is exactly equal to a repeating-decimal fraction:

| Decimal | Listed as | Correct exact form |
|---------|-----------|-------------------|
| `0.333` | `1/3`     | `333/1000`        |
| `0.666` | `2/3`     | `333/500`         |
| `0.833` | `5/6`     | `833/1000`        |

The SEO page title generated for these becomes `"0.333 as a Fraction = 1/3"` and the body says `"The decimal 0.333 is equivalent to the fraction 1/3"` — both factually incorrect. The interactive `FractionCalculator` tool correctly computes `333/1000` for the same input `0.333`, creating a contradictory user experience on the same site.

**Fix:** Either rename the decimal values to their exact repeating equivalents (`0.3333`, `0.6666`, `0.8333`) with appropriate slug names, or add a note on the SEO page clarifying the entry is the nearest common fraction approximation (e.g. `"0.333 ≈ 1/3"`). The page title and equivalence claim must not assert equality.

---

## Non-Issues Noted (for completeness)

- **Duplicate `convert` function in `CurrencyConverter.tsx`:** A local `convert()` function duplicates the exported `convertCurrency()` from `currencyData.ts`. Logically identical — not a bug, but a maintainability note. Low priority.
- **Day dropdown shows 1–31 for all months:** February can show day 30/31 as selectable. Validation correctly rejects invalid dates and shows an error message. No incorrect computation occurs. UX improvement only.
- **`Generation Alpha` end year hardcoded as 2025:** The current year (2026) means Gen Alpha's age range renders as `1–13`. As the definition is ongoing, this is a data-accuracy trade-off, not a code bug.
- **Step-building logic duplicated between `FractionCalculationPage.astro` and `FractionCalculator.tsx`:** The Astro component reimplements the step builder inline rather than importing `buildSteps` from the React component. Functional duplication only.
- **Intermittent build failure (Astro race condition):** Confirmed not reproducible on second run. Not caused by any code in this diff.

---

## Summary

| # | Severity | Description |
|---|----------|-------------|
| 1 | HIGH     | `currencyFaqSchema` — unformatted float rate in JSON-LD answer text |
| 2 | MEDIUM   | `fractionFaqSchema` — zero result renders as `0/1` instead of `0` |
| 3 | MEDIUM   | `decimalEntries` — `0.333`, `0.666`, `0.833` claimed equal to `1/3`, `2/3`, `5/6` |

TypeScript: clean. Build: passes. 3 findings require fixes before this review can be marked PASS.
