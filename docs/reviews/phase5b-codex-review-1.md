# Phase 5b Code Review -- Codex Review Agent 1

**Scope:** All changes from commit `8b949e6..HEAD` (9 commits, 32 files, +3,388/-47 lines)
**Date:** 2026-03-30
**Verdict:** FINDINGS (9 findings, 3 high severity)

---

## HIGH SEVERITY

### Finding 1: Fractional hour differences break the hour-by-hour table in TimezoneConversionPage.astro

**File:** `src/components/pseo/TimezoneConversionPage.astro` (lines ~56-68)

The static pSEO template manually computes AM/PM formatting:
```js
let toH = (h + hourDiff) % 24
if (toH < 0) toH += 24
const toHour = toH === 0 ? '12:00 AM' : toH < 12 ? `${toH}:00 AM` : toH === 12 ? '12:00 PM' : `${toH - 12}:00 PM`
```

`getHourDifference()` returns fractional values for half-hour and 45-minute offset timezones (India is +5:30, Nepal is +5:45, Iran is +3:30, etc.). When `hourDiff` is e.g. `5.5`, `toH` becomes `5.5`, and the output becomes `"5.5:00 AM"` -- broken formatting.

**Fix:** Either round `hourDiff` to the nearest integer (losing accuracy), or use `Intl.DateTimeFormat` for each hour row (like the interactive `TimezoneConverter.tsx` does correctly), or format minutes properly when fractional.

---

### Finding 2: Compound interest comparison table has wrong "Quarterly" value

**File:** `src/data/tool-content-13.ts` (compound-interest-calculator comparison table)

The static comparison table states:
```
Quarterly | 4 | $21,911 | $11,911
```

Correct calculation: $10,000 at 8% compounded quarterly for 10 years = $22,080 (interest: $12,080).

The annual row ($21,589) is correct. Monthly ($22,196) and daily ($22,253) are correct. Only the quarterly row is wrong -- off by $169.

**Fix:** Change `$21,911` to `$22,080` and `$11,911` to `$12,080`.

---

### Finding 3: Moveable holidays are hardcoded to wrong fixed dates

**File:** `src/data/dateCalcData.ts` (holidays array, ~lines 63-90)

Several holidays have fixed month/day values that are incorrect for 2026 and vary by year:

| Holiday | Code Says | Correct for 2026 | Issue |
|---------|-----------|-------------------|-------|
| Mother's Day (US) | May 11 | May 10 | 2nd Sunday of May |
| Father's Day (US) | June 15 | June 21 | 3rd Sunday of June |
| Thanksgiving (US) | Nov 27 | Nov 26 | 4th Thursday of Nov |
| Black Friday | Nov 28 | Nov 27 | Day after Thanksgiving |
| Chinese New Year | Jan 29 | Feb 17, 2026 | Lunar calendar |
| Diwali | Oct 20 | Oct 13, 2026 | Hindu calendar |
| Hanukkah | Dec 14 | Dec 4, 2026 | Hebrew calendar |
| Ramadan | Feb 28 | ~Feb 17, 2026 | Islamic calendar |
| Eid al-Fitr | Mar 30 | ~Mar 19, 2026 | Islamic calendar |

The fixed-date holidays (New Year's, Valentine's, Independence Day, Halloween, etc.) are fine. But moveable feasts tied to lunar/religious calendars or "Nth weekday of month" patterns cannot use fixed dates.

**Fix options:**
1. For US holidays with "Nth weekday" rules (Mother's Day, Father's Day, Thanksgiving, Black Friday): compute the date dynamically using a date calculation function.
2. For religious/lunar holidays (Chinese New Year, Diwali, Hanukkah, Ramadan, Eid): either remove them, use 2026-specific dates with a comment noting they change yearly, or link to a general "days until X" page without a countdown.

---

## MEDIUM SEVERITY

### Finding 4: Aspect ratio not fully reduced for MacBook Air 13"

**File:** `src/data/aspectRatioData.ts` (line 75)

```ts
{ slug: 'macbook-air-13-resolution', name: 'MacBook Air 13"', width: 2560, height: 1664, ratio: '160:104', ... }
```

`gcd(160, 104) = 8`, so `160:104` simplifies to `20:13`. The ratio should be `'20:13'`. This is a data inconsistency -- the `calculateRatio` function correctly computes reduced ratios via GCD, but the hardcoded `ratio` field in the device entries was set incorrectly.

**Fix:** Change `'160:104'` to `'20:13'`.

---

### Finding 5: Loan comparison table minor rounding discrepancies

**File:** `src/data/tool-content-13.ts` (loan-calculator comparison table)

Two rows have small rounding errors:
- 10 Years: code says `$66,394` total interest, actual is `$66,449` (off by $55)
- 5 Years: code says `$31,990`, actual is `$31,994` (off by $4)

These are in the static SEO content table, not the calculator itself. The calculator uses the correct formula.

**Fix:** Update to `$31,994` and `$66,449`.

---

### Finding 6: AspectRatioCalculator inputs lack htmlFor/id association

**File:** `src/components/tools/AspectRatioCalculator.tsx`

In "calculate" mode, the width and height inputs use `<label className={labelClass}>` without an `htmlFor` attribute, and the `<input>` elements have no `id`. Same issue in "resize" mode for the ratio, width, and height inputs.

This breaks the label-input association for screen readers and also means clicking the label text does not focus the input.

**Fix:** Add `htmlFor` to each `<label>` and matching `id` to each `<input>` (e.g., `id="calc-width"`, `htmlFor="calc-width"`).

---

### Finding 7: DateCalculator mode buttons missing `type="button"`

**File:** `src/components/tools/DateCalculator.tsx` (lines ~30-40)

The mode selector buttons:
```tsx
<button key={m} onClick={() => setMode(m)} className={...}>
```

These lack `type="button"`. If the component is ever rendered inside a `<form>`, the buttons would default to `type="submit"` and cause unintended form submission. While not currently in a form, this is a defensive coding best practice.

**Fix:** Add `type="button"` to each mode selector button.

---

## LOW SEVERITY

### Finding 8: CityTimePage shows build-time clock, not live time

**File:** `src/components/pseo/CityTimePage.astro` (lines ~18-20)

```astro
const now = new Date()
const time = formatTimeInZone(city.timezone, now)
const date = formatDateInZone(city.timezone, now)
```

This renders the build-time date/time into the static HTML. The `role="status" aria-live="polite"` attributes on the time display suggest a live clock, but the value is frozen at build time. The interactive converter below (`client:load`) works correctly, but the hero time display is static.

This is inherent to SSG but the markup is misleading. Either remove the `aria-live="polite"` (since it never updates) or add a small `client:load` script to hydrate the time display.

---

### Finding 9: Canvas charts lack accessible alternatives

**Files:** `src/components/tools/CompoundInterestCalculator.tsx`, `src/components/tools/LoanCalculator.tsx`

Both canvas elements (`<canvas ref={canvasRef} className="w-full h-full" />`) have no `role`, `aria-label`, or fallback text. Screen readers cannot perceive canvas content. The data tables adjacent to the charts serve as partial alternatives, but the canvas itself should be labeled.

**Fix:** Add `role="img"` and an `aria-label` describing the chart purpose, e.g.:
```tsx
<canvas ref={canvasRef} className="w-full h-full" role="img" aria-label="Bar chart showing compound interest growth over time" />
```

---

## Summary

| # | Severity | File | Issue |
|---|----------|------|-------|
| 1 | HIGH | TimezoneConversionPage.astro | Fractional hourDiff breaks AM/PM formatting |
| 2 | HIGH | tool-content-13.ts | Quarterly compound interest value wrong ($21,911 vs $22,080) |
| 3 | HIGH | dateCalcData.ts | 9 moveable holidays hardcoded to wrong fixed dates |
| 4 | MEDIUM | aspectRatioData.ts | MacBook Air 13" ratio not fully reduced (160:104 vs 20:13) |
| 5 | MEDIUM | tool-content-13.ts | Loan comparison table rounding errors |
| 6 | MEDIUM | AspectRatioCalculator.tsx | Inputs missing htmlFor/id label association |
| 7 | MEDIUM | DateCalculator.tsx | Mode buttons missing type="button" |
| 8 | LOW | CityTimePage.astro | Static build-time clock with aria-live="polite" |
| 9 | LOW | CompoundInterestCalculator.tsx, LoanCalculator.tsx | Canvas charts lack aria-label |
