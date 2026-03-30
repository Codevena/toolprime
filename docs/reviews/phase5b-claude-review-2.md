# Phase 5b -- Claude Review 2 (Second Round)

**Reviewer:** Claude Code Review Agent
**Date:** 2026-03-30
**Scope:** All changes from commit 8b949e6 to HEAD (commits 8f1f74c through a4e2149)
**Purpose:** Verify all 8 round-1 findings have been fixed; check for remaining issues.

---

## Round 1 Fix Verification

### 1. Fractional hourDiff in TimezoneConversionPage.astro -- FIXED
The `formatHourRow()` function (line 32-40) now uses minute-based math:
`totalMinutes = h * 60 + Math.round(offsetHours * 60)`, with proper modular wrapping.
Verified: India (+5:30), Nepal (+5:45), and negative offsets all produce correct results.

### 2. schema.ts formatHourOffset -- FIXED
`formatHourOffset()` (line 317-325) uses identical minute-based math. Both the page
template and schema function are now consistent in their approach.

### 3. Device aspect ratios -- FIXED
- iPhone 16: 1179x2556 -> 131:284 (mathematically verified via GCD)
- iPad Pro 13": 2064x2752 -> 3:4 (verified)
- MacBook Air 13": 2560x1664 -> 20:13 (verified)

### 4. Compound interest quarterly value -- FIXED
The `CompoundInterestCalculator` uses `P * (1 + r/n)^(n*t)` which is the standard
formula. $10,000 at 8% for 10 years quarterly = $22,080 (verified).

### 5. AspectRatioCalculator htmlFor/id on inputs -- FIXED
All inputs in both calculate and resize modes have matching htmlFor/id pairs:
`calc-width`, `calc-height`, `ratio-w`, `ratio-h`, `resize-width`, `resize-height`.

### 6. Moveable holidays removed from dateCalcData.ts -- FIXED
The holidays array (line 45-59) contains only fixed-date holidays. A clear comment
(lines 42-44) explains why moveable/lunar holidays are excluded.

### 7. `as any` casts removed, proper type union used -- FIXED
The `[...slug].astro` route page uses a well-defined `PageProps` discriminated union
(lines 35-44) with string literal types for discrimination. No `as any` in phase 5b files.

### 8. hourTable memo optimized with dateKey -- FIXED
`TimezoneConverter.tsx` line 55: `dateKey` is computed from year/month/day, and the
`hourTable` useMemo depends on `[fromTz, toTz, dateKey]` instead of `now`, preventing
re-renders every second.

### Additional round-1 fixes also verified:
- Loan comparison rounding: `formatMoneyExact` uses 2 decimal places for payment/principal/interest.
- Canvas charts: both CompoundInterest and Loan canvases have `role="img"` + `aria-label`.
- CityTimePage: no `aria-live` attribute present (confirmed removed).
- DateCalculator mode buttons: all three have `type="button"`.

---

## New Issue Scan

### Code Quality
- All React components use proper TypeScript interfaces for props.
- State management uses controlled inputs with string state for numeric inputs (prevents NaN display issues).
- Canvas drawing functions properly handle DPI scaling via `devicePixelRatio`.
- ResizeObserver cleanup is handled via effect return functions.

### Accessibility
- All tables have `<caption class="sr-only">` elements.
- Table headers use `scope="col"`.
- Result regions use `aria-live="polite"` where appropriate.
- Sections use `aria-labelledby` with corresponding heading IDs.

### SEO
- Breadcrumbs, canonical URLs, and structured data (FAQ schema) are present on all pSEO pages.
- Meta tags follow established patterns via dedicated functions in `seo.ts`.

### Architecture
- Data generation follows established patterns (entries arrays with pure functions).
- Route files use discriminated unions consistently.
- No circular dependencies detected.

### Build
- `pnpm build` completes successfully: 53,957 pages built in 93s.
- No TypeScript errors, no warnings.

---

## Findings

**Zero findings.** All 8 round-1 issues have been correctly fixed. The code is clean,
well-structured, and follows established project patterns. Build passes without errors.
