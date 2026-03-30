# Phase 5c — Code Review #1

**Scope:** Changes in commits 8536db5..284a573 (Phase 5c pSEO data expansion)
**Files reviewed:** `src/data/timezoneData.ts`, `src/data/dateCalcData.ts`, `src/data/compoundInterestData.ts`, `src/data/loanCalcData.ts`, `src/data/percentages.ts`, `src/data/hashes.ts`, `src/data/bmiData.ts`, `src/data/mortgageData.ts`, `src/pages/mortgage-calculator.astro`, `src/pages/calculate/[...slug].astro`

---

## CRITICAL: TypeScript Build Error

### TS2322 — `number | undefined` in dateCalcData.ts (line 167)

`pnpm tsc --noEmit` fails with two errors on the same line:

```
src/data/dateCalcData.ts(167,35): error TS2322: Type 'number | undefined' is not assignable to type 'number'.
src/data/dateCalcData.ts(167,63): error TS2322: Type 'number | undefined' is not assignable to type 'number'.
```

**Root cause:** `noUncheckedIndexedAccess` is enabled via `astro/tsconfigs/strictest`. The `monthEndDays` array is declared as a plain `number[]`, so array index access returns `number | undefined`. The existing code already handles this pattern correctly on line 141 (`as number` cast on an inline array access). The new `monthEndPairs` push at line 167 omits that cast.

**Current code (line 167):**
```typescript
monthEndPairs.push([from + 1, monthEndDays[from], to + 1, monthEndDays[to]])
```

**Fix — add `as number` casts:**
```typescript
monthEndPairs.push([from + 1, monthEndDays[from] as number, to + 1, monthEndDays[to] as number])
```

This is the only TypeScript error in the entire project. It will cause the build to fail.

---

## HIGH: Decimal Point in Loan URL Slugs

### `src/data/loanCalcData.ts` — line 32

The loan slug template does not sanitize decimal rates for URL safety:

```typescript
const slug = `loan-${amount}-at-${rate}-percent-${years}-years`
```

The updated `rates` array now includes half-point values: `[3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 9, 10]`. This produces slugs with literal decimal points in the URL, for example:

```
loan-50000-at-3.5-percent-5-years
loan-100000-at-6.5-percent-30-years
```

URLs containing `.` mid-segment are valid per RFC 3986 but are non-standard for slug patterns and inconsistent with how `mortgageData.ts` handles the identical problem. The mortgage file (added in the same phase) correctly uses:

```typescript
const rateStr = String(rate).replace('.', '-')
return `mortgage-${amount}-at-${rateStr}-percent-${term}yr`
```

The loan file was not updated with the same sanitization when half-point rates were added.

**Fix — update line 32 of `src/data/loanCalcData.ts`:**
```typescript
const rateStr = String(rate).replace('.', '-')
const slug = `loan-${amount}-at-${rateStr}-percent-${years}-years`
```

**Impact:** All 5 decimal rates (3.5, 4.5, 5.5, 6.5, 7.5) across 18 amounts × 6 terms = 540 slugs with dots. These pages will be served (Astro will generate them) but the slug format is inconsistent and may cause issues with link matching elsewhere in the codebase.

---

## MEDIUM: Minor Data Accuracy Notes

### `src/data/timezoneData.ts`

All 128 city timezone identifiers were verified against the IANA database. All are valid. The following notes are informational, not blocking:

**Quito → `America/Guayaquil`**
`America/Quito` does not exist as a valid IANA identifier; `America/Guayaquil` is the correct canonical zone for Ecuador (UTC-5). The current assignment is correct. No action needed.

**Montreal → `America/Toronto`**
`America/Montreal` exists in the IANA database as a deprecated alias for `America/Toronto`. The assignment `America/Toronto` is the modern correct choice. No action needed.

**Calgary → `America/Edmonton`**
`America/Calgary` does not exist as a standalone IANA zone. `America/Edmonton` covers all of Alberta. The current assignment is correct. No action needed.

**Redundant anchors sharing the same timezone**
Four groups of anchors share a timezone zone identifier:
- `America/Los_Angeles`: los-angeles, seattle, san-francisco (3 anchors)
- `America/New_York`: new-york, miami (2 anchors)
- `Asia/Kolkata`: mumbai, delhi, bangalore (3 anchors)
- `Africa/Johannesburg`: johannesburg, cape-town (2 anchors)

Because the pair generator skips same-timezone pairs (`if (anchor.timezone === other.timezone) continue`), these anchors generate zero pairs with each other. They still generate pairs with all other-timezone cities. This is not a bug — it is intentional to avoid pages that show a 0-hour difference. No action needed.

### `src/data/dateCalcData.ts`

**Day of the Dead — month 11, day 1**
Día de los Muertos is traditionally observed November 1-2. November 1 is also All Saints Day in Catholic tradition. Using November 1 as the fixed date is defensible as a single-day anchor but note that the more widely recognized main celebration day (the Day of the Dead altars and visiting cemeteries) is November 2. This is a content judgment call, not an accuracy error.

**February 28 in `monthEndDays`**
The array uses 28 for February (non-leap year). This generates slugs like `days-between-february-28-and-march-31`. These are accurate for a non-leap year. The choice is consistent with the project's existing pattern in `extendedDateRanges`. No action needed.

---

## LOW: Cosmetic / Informational

### `src/data/hashes.ts` — hyphenated words as slugs

Four words contain hyphens: `github-actions`, `nginx-proxy`, `python-snake`, `obsidian-rock`. These were added deliberately to avoid colliding with the pre-existing `python` and `obsidian` entries and to handle multi-word tech names. All 500 words are unique, slug-safe, and correctly deduplicated. No action needed.

### `src/data/mortgageData.ts` — `buildSlug` function declaration order

`buildSlug` is now defined before the combo generation loop, which calls it. The earlier version defined it after the loop but this has been corrected in this phase. The function references `rates`, `terms`, and `amounts` correctly through closure. No issues.

### `src/data/mortgageData.ts` — removed amounts

`50000`, `350000`, `450000`, and `850000` were removed from the amounts array. Old pages at slugs like `mortgage-50000-at-3-percent` (old format without term) would already be broken by the slug format change from `mortgage-{a}-at-{r}-percent` to `mortgage-{a}-at-{r}-percent-{t}yr`. If these old slugs were ever indexed, they will 404. This is expected and acceptable since the slug format changed intentionally.

### `src/pages/mortgage-calculator.astro` — "Nearly 500 combinations" copy

The page states "Nearly 500 combinations are available." The new entry count is 495 (15 × 11 × 3). This is accurate. No action needed.

---

## Verified Correct

The following were checked and found to have no issues:

- All 128 city IANA timezone identifiers are valid and correct
- All 55 anchor slugs resolve to cities in the cities array
- No duplicate city slugs or city names
- `percentages.ts`: 53 values, 84 bases — counts match comments, no duplicates
- `compoundInterestData.ts`: 12 × 14 × 11 = 1,848 entries — matches comment
- `loanCalcData.ts`: 18 × 13 × 6 = 1,404 entries — matches comment (slug format bug aside)
- `mortgageData.ts`: 15 × 11 × 3 = 495 entries, no duplicate slugs, `getRelated` returns only valid slugs
- `bmiData.ts`: 24 × 24 = 576 combinations, all heights/weights in valid range, no duplicates
- `hashes.ts`: 500 words, no duplicates, all slug-safe
- `monthEndDaysBetweenEntries`: 66 pairs generated, no collisions with existing slug sets, correctly exported and imported in `[...slug].astro`
- `daysValues`: 734 total entries (1-730 + 1000/1095/1460/1825), no duplicates
- Compound interest and mortgage math formulas verified against independent calculations

---

## Summary

| Severity | Finding | File | Line |
|---|---|---|---|
| CRITICAL | TypeScript build error — `number \| undefined` not assignable to `number` | `src/data/dateCalcData.ts` | 167 |
| HIGH | Decimal point in loan URL slugs (3.5 → "3.5" not "3-5") | `src/data/loanCalcData.ts` | 32 |
| MEDIUM | Informational: Day of the Dead date (Nov 1 vs Nov 2) | `src/data/dateCalcData.ts` | 65 |
| LOW | Informational: old mortgage slugs now 404 due to format change | `src/data/mortgageData.ts` | — |

**Blocking issues that must be fixed before merge: 2 (CRITICAL + HIGH)**
