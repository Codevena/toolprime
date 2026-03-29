# Phase 5a — Codex Review 1 (Code Quality)

## Findings

---

### 1. Logic Bug — `fractionFaqSchema` uses wrong character for minus comparison

**File:** `src/lib/schema.ts`, lines 264–277
**Severity:** Important

`fractionFaqSchema` receives `opSymbol` which is sourced from `opSymbols[op]` in `FractionCalculationPage.astro`. The minus symbol in `opSymbols` is `'\u2212'` (U+2212, MINUS SIGN), not `'-'` (U+002D, HYPHEN-MINUS).

The schema function checks:

```ts
opSymbol === '-' ? 'subtract' : ...
opSymbol === '+' || opSymbol === '-'
```

Since `opSymbols.minus` is `'−'` (U+2212), not `'-'`, both conditions are always false for subtraction operations. A minus-operation FAQ will render the question verb as `'divide'` and the answer as the divide-fractions explanation. Every fraction subtraction pSEO page has wrong FAQ schema markup.

**Fix:** Replace `'-'` with `'\u2212'` (or `opSymbol === opSymbols.minus`) in the two comparison branches, and ensure `opSymbol === '×'` uses `'\u00d7'` consistently (it does, but add a note).

---

### 2. Logic Bug — `parseInput` rejects all-zero strings like `"0000"` in number base converter

**File:** `src/components/tools/NumberBaseConverter.tsx`, lines 17–27
**Severity:** Important

The validation logic:

```ts
const valid = num.toString(radix).toUpperCase() === clean.toUpperCase().replace(/^0+/, '') || clean === '0'
```

When `clean` is `'0000'`, `clean.replace(/^0+/, '')` evaluates to `''` (empty string), and `num.toString(radix)` is `'0'`. The condition `'0' === ''` is false, and `clean === '0'` is also false for `'0000'`. Result: `parseInput('0000', 'binary')` returns `null`, and the UI shows "Invalid binary number" instead of converting `0000` to `0`.

Leading-zero binary strings like `0000 0001` (common in teaching contexts) are incorrectly rejected. Fix: add `|| clean.replace(/^0+/, '') === ''` to the condition, treating all-zero strings as valid.

---

### 3. Logic Bug — `AgeCalculator` allows future dates in current year, producing negative age output

**File:** `src/components/tools/AgeCalculator.tsx`, lines 44–48
**Severity:** Important

The year validation upper bound is `y <= currentYear` (2026). A user entering March 30, 2026 (tomorrow) passes validation. `calculateAge` is called, produces `totalDays = -1`, and the age math yields `years: -1, months: 11, days: 27`. The result card renders this without any guard, displaying a negative age. The `"Calculate Age"` button should reject dates after today. The fix is to check `new Date(y, m - 1, d) <= new Date()` as part of `hasValidInput`.

---

### 4. Logic Bug — `AgeCalculator` accepts invalid calendar dates (day-month mismatch)

**File:** `src/components/tools/AgeCalculator.tsx`, line 47
**Severity:** Important

Day validation only checks `d >= 1 && d <= 31`. It does not cross-reference the selected month. A user entering February 31 or April 31 passes validation. JavaScript's `Date` constructor silently rolls these over (Feb 31 becomes Mar 3, Apr 31 becomes May 1), so `calculateAge` returns results for the wrong date with no warning. The fix is to validate the day against the actual month's maximum: `new Date(y, m, 0).getDate()`.

---

### 5. SEO/Content Bug — Hex-to-decimal pSEO pages have inverted framing

**File:** `src/pages/convert/[...slug].astro`, lines 171–180
**Severity:** Important

The `hexToDec` page type is rendered using a synthetic `NumberBaseEntry`:

```ts
const syntheticEntry = {
  slug: entry.slug,    // e.g. 'dead-hex-to-decimal'
  value: entry.decimal, // 57005
  toBase: 'hexadecimal',
  result: entry.hex,  // 'DEAD'
}
```

`NumberBaseConversionPage` renders the h1 as "57005 in Hexadecimal = DEAD" and the "How to Convert" section explains how to convert 57005 to hexadecimal. But the URL is `/convert/dead-hex-to-decimal`, which a user interprets as "convert the hex value DEAD to decimal". The page intent is reversed relative to its URL and the FAQ schema (`numberBaseFaqSchema(57005, 'hexadecimal', 'DEAD')`) asks "What is 57005 in hexadecimal?" rather than "What is DEAD in decimal?". These pages will not satisfy the search intent that would generate traffic to them.

---

### 6. Data Accuracy — Deprecated currency (HRK) included in currency list

**File:** `src/data/currencyData.ts`, line 48; `src/components/tools/CurrencyConverter.tsx` (excluded)
**Severity:** Important

Croatian Kuna (HRK) was replaced by the Euro (EUR) on January 1, 2023. It is no longer a valid currency. Including it in `currencyData.ts` with a fallback rate of 6.93 means pSEO pages for HRK conversions exist and present rates for a defunct currency with no disclaimer. The Frankfurter API no longer returns HRK, so its conversion always uses the stale fallback. Either remove HRK or add a prominent "This currency is no longer in use" note on hub pages.

---

### 7. Data Accuracy — `faqs.ts` states Number Base Converter supports base 32, but it does not

**File:** `src/data/faqs.ts`, line 198; `src/data/tool-content-12.ts`, line 175
**Severity:** Important

The FAQ answer reads: "The converter supports binary (base 2), octal (base 8), decimal (base 10), hexadecimal (base 16), and base 32." The `NumberBaseConverter` component's `BASE_OPTIONS` only defines four bases: binary, octal, decimal, hexadecimal. Base 32 is not implemented. The `tool-content-12.ts` body also mentions "base 32 representations". Both must be corrected to match what the tool actually supports.

---

### 8. DRY Violation — Currency list and fallback rates duplicated between component and data file

**File:** `src/components/tools/CurrencyConverter.tsx` lines 13–58; `src/data/currencyData.ts` lines 28–136
**Severity:** Important

`CurrencyConverter.tsx` contains its own `CURRENCIES` array (35 entries) and `FALLBACK_RATES` (35 entries) that are a partial duplicate of `currencyData.ts` (51 currencies, 51 rates). Sixteen currencies present in `currencyData.ts` (RON, BGN, HRK, RUB, ARS, CLP, COP, PEN, NGN, EGP, KES, GHS, VND, PKR, BDT, UAH) are absent from the component. This means:

1. Users on currency pSEO pages for those 16 currencies (e.g. `/convert/100-usd-to-ngn`) will see the static result correctly, but the embedded `CurrencyConverter` component won't have NGN in its dropdown — they cannot interactively adjust the amount.
2. Any future currency additions require edits in two places.

The component should import from `currencyData.ts` rather than maintaining its own copy.

---

### 9. SEO Bug — `getDecimalToFractionMeta` generates canonical pointing to `/convert/` but pages live at `/calculate/`

**File:** `src/lib/seo.ts`, lines 383–391; `src/pages/calculate/[...slug].astro`, lines 49–52
**Severity:** Important

`getDecimalToFractionMeta` produces a canonical URL of `https://toolprime.dev/convert/0-5-to-fraction`. The actual page is generated at `/calculate/0-5-to-fraction`. The page-level code in `[...slug].astro` manually patches this:

```ts
meta = { ...dm, canonical: `https://toolprime.dev/calculate/${props.decimal.slug}` }
```

This is a workaround that hardcodes the domain string a second time rather than fixing `getDecimalToFractionMeta`. The underlying function should accept a `basePath` parameter or be corrected to generate the `/calculate/` canonical. The current workaround also means if `getDecimalToFractionMeta` is called elsewhere, it will emit the wrong canonical.

---

### 10. Inconsistent Schema Placement — `slot="head"` used by some components, omitted by others

**File:** `src/components/pseo/AgeCalculationPage.astro` line 21; `src/components/pseo/CurrencyConversionPage.astro` line 39; `src/components/pseo/FractionCalculationPage.astro` line 63 (missing slot); vs `src/components/pseo/AsciiPage.astro` line 44; `src/components/pseo/NumberBaseConversionPage.astro` line 29 (has slot)
**Severity:** Minor

`AsciiPage` and `NumberBaseConversionPage` use `<SchemaMarkup ... slot="head" />`, correctly placing the JSON-LD `<script>` inside `<head>`. The three other new components (`AgeCalculationPage`, `CurrencyConversionPage`, `FractionCalculationPage`) omit `slot="head"`, placing the schema script in the body. While technically valid (Google accepts body-placed schema), this is inconsistent within the same commit and with the pattern established by `AsciiPage`. Note: this matches the pre-existing codebase pattern in `src/pages/calculators/[...slug].astro`, so it may be an intentional convention — but the mixed pattern within a single batch of commits is confusing.

---

### 11. Redundant Conditional — `AsciiPage` renders `char` in both branches of a ternary

**File:** `src/components/pseo/AsciiPage.astro`, line 58
**Severity:** Minor

```astro
{isControl ? char : char}
```

Both branches return the same variable `char`. The intent appears to have been to show the formatted `displayChar` (with quotes) for printable characters, but `displayChar` was not used. The h1 on line 51 correctly uses `{isControl ? char : displayChar}`. Line 58 inside the main info card should also use `{isControl ? char : displayChar}` (or simply `{char}` if the card intentionally shows the raw character). As written, the visual display of printable characters in the info card (e.g. for ASCII 65) shows `A` not `"A"` — inconsistent with the h1 which shows `"A"`.

---

### 12. UX Issue — No homepage / "All Tools" link in the desktop navigation bar

**File:** `src/layouts/BaseLayout.astro`, lines 54–58
**Severity:** Minor

The desktop navigation was changed from `Tools | Categories | Blog` to `Everyday | Developer | Design | Blog`. There is no longer a link to the homepage (`/`) in the nav — it is only reachable by clicking the logo. Users who want to browse all tools without an audience filter have no affordance. A "Tools" or "All Tools" link pointing to `/` (or a dedicated all-tools page) should be added.

---

### 13. Minor — `currentYear` computed at module load (build time) in AgeCalculator causes stale generation table

**File:** `src/components/tools/AgeCalculator.tsx`, line 10
**Severity:** Minor

`const currentYear = new Date().getFullYear()` runs at module evaluation time. For a statically-built site this means the generation table age ranges (e.g. "Generation Z: 14–29") are baked in at build time. If the site isn't rebuilt annually, the "Age Range" column will show incorrect ages. Since this is a client-rendered React component (`client:load`), the module evaluates in the browser — this is actually fine at runtime. However, the concern remains for the age range column: it shows `currentYear - gen.end` to `currentYear - gen.start` which will be stale if the user's system clock differs from the server build year. Low risk, but worth noting.

---

### 14. Minor — `getGenerationAnswer` in `schema.ts` conflates Gen Z and Gen Alpha in a single answer

**File:** `src/lib/schema.ts`, lines 283–285
**Severity:** Minor

```ts
if (year >= 1997) return `Someone born in ${year} belongs to Generation Z (born 1997–2012) or Generation Alpha (born 2013+).`
```

This answer is returned for any year >= 1997, including 2020. A child born in 2020 is unambiguously Generation Alpha, not "Generation Z or Alpha". The condition should be split:

```ts
if (year >= 2013) return `... Generation Alpha (born 2013+).`
if (year >= 1997) return `... Generation Z (born 1997–2012).`
```

---

### 15. Minor — Stale fallback rate for Argentine Peso (ARS)

**File:** `src/data/currencyData.ts`, line 104
**Severity:** Minor

`ARS: 870` (pesos per USD). Argentina experienced a sharp devaluation in 2023–2024; the official rate exceeded 1,000 per USD by late 2023 and reached ~900–1,200 through 2024. At today's date (March 2026), the official rate is significantly higher. Since the Frankfurter API does not include ARS, the fallback is always used. The displayed rate on pSEO pages for ARS conversions will be materially wrong. Update the fallback to a more current value, or add a disclaimer on ARS pages that rates may be outdated.

---

## Summary

**Total findings: 15**

| Severity | Count |
|----------|-------|
| Important | 9 |
| Minor | 6 |

**Overall assessment:** The four new tools are architecturally sound, TypeScript compiles cleanly, and the calculation logic for currency, age, fractions, and number base conversion is correct for the happy path. However, there are two FAQ/SEO logic bugs that produce wrong structured data (fraction subtraction FAQ and hex-to-decimal page inversion), two user-input validation gaps in `AgeCalculator` (future dates and invalid calendar dates), a significant DRY violation causing 16 currencies to be unselectable in the interactive converter, and a factually incorrect FAQ claiming base 32 support. These should all be fixed before considering the phase complete.
