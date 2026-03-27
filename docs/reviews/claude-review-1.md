# ToolPrime Code Review

**Reviewer:** Senior Code Review Agent
**Date:** 2026-03-27
**Scope:** All files under `src/` -- full codebase review
**Overall verdict:** Solid, well-structured codebase with a few security concerns and several minor issues worth addressing.

---

## Critical

### 1. `new Function()` used for temperature conversions -- code injection vector

**Files:**
- `/Users/markus/Developer/toolprime/src/data/conversions.ts` (line 91)
- `/Users/markus/Developer/toolprime/src/components/tools/UnitConverter.tsx` (line 34)
- `/Users/markus/Developer/toolprime/src/pages/converters/[...slug].astro` (line 75)

**Details:** The `convert()` function and `doConvert()` function both use `new Function('x', ...)` to evaluate formula strings. While the formula strings are currently hardcoded in the `conversions` array and not derived from user input, this pattern is dangerous for two reasons:

1. In `[...slug].astro` (line 75), the formula string is passed via `define:vars` into a client-side `<script>` block and then fed to `new Function()`. If the conversions data were ever sourced from a CMS, database, or API in the future, this becomes a direct code injection vulnerability.
2. `new Function()` is equivalent to `eval()` and will be blocked by any reasonable Content-Security-Policy (CSP) that disallows `unsafe-eval`. Deploying a CSP -- which you should -- will break temperature conversions.

**Recommendation:** Replace `new Function()` with a simple formula evaluator. There are only 3 temperature formulas. Use a lookup map or a dedicated function:

```typescript
const formulaFns: Record<string, (x: number) => number> = {
  '(x * 9/5) + 32': (x) => (x * 9/5) + 32,
  'x + 273.15': (x) => x + 273.15,
  '(x - 32) * 5/9': (x) => (x - 32) * 5/9,
  'x - 273.15': (x) => x - 273.15,
  '(x * 9/5) + 32': (x) => (x * 9/5) + 32,  // reverseFormula for F->C
}
```

Or better yet, replace the `formula`/`reverseFormula` string fields with actual function fields (`convert: (x: number) => number`).

---

### 2. PasswordGenerator `handleOptionChange` uses stale state

**File:** `/Users/markus/Developer/toolprime/src/components/tools/PasswordGenerator.tsx` (line 56)

**Details:** The `handleOptionChange` function calls `setPassword(generatePassword(length, useUpper, useLower, useNumbers, useSymbols))` but this reads the **current** state values, not the updated ones. The `setter(value)` call on line 55 enqueues a state update, but React has not yet re-rendered, so `useUpper`, `useLower`, etc. still hold their old values at the time `generatePassword` is called on line 56.

**Example:** If uppercase is currently ON and the user unchecks it, `setter(false)` sets it to false, but `generatePassword` still sees `useUpper=true` because the state has not updated yet. The password regenerated on this click will still include uppercase characters.

**Recommendation:** Compute the updated values inline:

```typescript
const handleOptionChange = (field: 'upper' | 'lower' | 'numbers' | 'symbols', newValue: boolean) => {
  const opts = { upper: useUpper, lower: useLower, numbers: useNumbers, symbols: useSymbols }
  opts[field] = newValue
  // prevent disabling all
  if (!Object.values(opts).some(Boolean)) return
  setUseUpper(opts.upper); setUseLower(opts.lower); /* etc */
  setPassword(generatePassword(length, opts.upper, opts.lower, opts.numbers, opts.symbols))
}
```

---

## Important

### 3. Word counter sentence counting is inaccurate for common edge cases

**File:** `/Users/markus/Developer/toolprime/src/components/tools/WordCounter.tsx` (line 20)

**Details:** The sentence counter uses `text.split(/[.!?]+/).filter(s => s.trim()).length`. This overcounts for:
- Abbreviations: "Dr. Smith went to Washington D.C. today." counts as 4 sentences instead of 1.
- Ellipses: "Wait... what?" counts as 2, which is arguably correct, but "Mr. Jones..." counts as 3.
- Decimal numbers: "The price is $3.99." counts as 2 sentences.

And undercounts for:
- Sentences ending with other punctuation or no punctuation at all (common in casual text).

This is a known-hard problem, but users of a "word counter" tool expect reasonable accuracy. At minimum, the FAQ claims it "instantly counts ... sentences" with no caveats.

**Recommendation:** Consider a more robust regex that handles abbreviations and decimals, e.g.:
```typescript
const sentences = (text.match(/[^.!?]*[.!?]+(\s|$)/g) || []).length
```
Or add a disclaimer that sentence counting is approximate.

### 4. `CopyButton` does not handle clipboard API unavailability

**File:** `/Users/markus/Developer/toolprime/src/components/ui/CopyButton.tsx` (line 13)

**Details:** `navigator.clipboard.writeText()` throws in non-secure contexts (HTTP, not HTTPS) and in some browsers when the page is in an iframe. The `await` will reject with an uncaught promise error. There is no try/catch.

**Recommendation:** Wrap in try/catch and show a fallback message:
```typescript
const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(text)
    setCopied(true)
  } catch {
    // fallback: select text for manual copy, or show error
  }
  setTimeout(() => setCopied(false), 2000)
}
```

### 5. `ImageCompressor` leaks object URLs

**File:** `/Users/markus/Developer/toolprime/src/components/tools/ImageCompressor.tsx` (lines 63, 85)

**Details:**
- In `handleFile` (line 63), a new `originalUrl` is created via `URL.createObjectURL(file)`, but if the user selects a new file, the previous `originalUrl` is never revoked. The `compress` callback (line 45) only revokes `compressedUrl`, not `originalUrl`.
- In `handleDownload` (line 85), `URL.createObjectURL(fileInfo.compressedBlob)` creates a new object URL that is never revoked. Each download click leaks a blob URL.

**Recommendation:** Track and revoke `originalUrl` when a new file is selected. Revoke the download URL after the click:
```typescript
const handleDownload = () => {
  if (!fileInfo?.compressedBlob) return
  const url = URL.createObjectURL(fileInfo.compressedBlob)
  const link = document.createElement('a')
  link.download = `compressed-${fileInfo.name}`
  link.href = url
  link.click()
  URL.revokeObjectURL(url)
}
```

### 6. `ImageCompressor` quality slider does not re-compress

**File:** `/Users/markus/Developer/toolprime/src/components/tools/ImageCompressor.tsx` (line 130)

**Details:** Changing the quality slider updates the `quality` state, but does not trigger re-compression of the currently loaded image. The user has no way to re-compress at a different quality level without re-selecting the file. The page content text claims "You can adjust the quality slider after uploading to re-compress with different settings without re-uploading the file" (image-compressor.astro line 21), but the code does not implement this behavior.

**Recommendation:** Store the original `File` object in state and add a `useEffect` or button that re-compresses when quality changes.

### 7. Conversion pages: `<tr>` elements missing `key` prop

**File:** `/Users/markus/Developer/toolprime/src/pages/converters/[...slug].astro` (line 91)

**Details:** The `tableRows.map()` does not provide a `key` prop on the `<tr>` elements. While Astro templates are server-rendered and React key rules do not strictly apply, this is a best practice warning that some linting tools will flag.

### 8. `JsonFormatter` error display uses hardcoded light-mode colors

**File:** `/Users/markus/Developer/toolprime/src/components/tools/JsonFormatter.tsx` (line 81)

**Details:** `border-red-300 bg-red-50 text-red-700` are hardcoded Tailwind classes that look correct in light mode but will look wrong in dark mode (bright red on a very light pink background against a dark page). The same issue exists in:
- `QrCodeGenerator.tsx` line 79
- `ImageCompressor.tsx` line 140
- `UnitConverter.tsx` line 141
- `PercentageCalculator.tsx` line 129

Similarly, success/savings colors like `text-green-600`, `text-green-700`, `bg-green-50` in `ImageCompressor.tsx` (lines 159, 167) will clash in dark mode.

**Recommendation:** Use CSS custom properties for error/success states like you do for everything else, or use Tailwind dark mode variants (`dark:bg-red-900/20 dark:text-red-400 dark:border-red-800`).

### 9. QR code generator missing SVG download despite claims

**File:** `/Users/markus/Developer/toolprime/src/components/tools/QrCodeGenerator.tsx`

**Details:** The tool data in `tools.ts` (line 62) says "Download as PNG or SVG" and the FAQ says "You can download your QR code as PNG ... or SVG (vector, best for print)." However, the component only implements PNG download. There is no SVG download option.

**Recommendation:** Either implement SVG download using `QRCode.toString()` with `type: 'svg'`, or correct the marketing copy.

---

## Minor

### 10. `WordCounter` textarea missing `aria-label` or associated `<label>`

**File:** `/Users/markus/Developer/toolprime/src/components/tools/WordCounter.tsx` (line 34)

**Details:** The textarea has a `placeholder` but no `<label>` element or `aria-label`. Screen readers will announce it as an unlabeled text area. All other tool components have labels on their inputs.

**Recommendation:** Add `aria-label="Text input for word counting"` or wrap with a label.

### 11. Navigation links in header have no accessible indication of current page

**File:** `/Users/markus/Developer/toolprime/src/layouts/BaseLayout.astro` (lines 37-40)

**Details:** The header nav links (Developer, Text, Image, Math) have no `aria-current` attribute and no visual active state. Users cannot tell which section they are in.

### 12. `hexToRgb` does not handle 3-character shorthand hex

**File:** `/Users/markus/Developer/toolprime/src/components/tools/ColorPicker.tsx` (line 7)

**Details:** `hexToRgb` only handles 6-character hex codes. Entering `#f00` (a common shorthand for red) will return `null` and fail silently. Users familiar with CSS shorthand hex will expect this to work.

**Recommendation:** Expand 3-char hex to 6-char:
```typescript
let clean = hex.replace('#', '')
if (clean.length === 3) clean = clean.split('').map(c => c + c).join('')
```

### 13. Password generator has modulo bias in random character selection

**File:** `/Users/markus/Developer/toolprime/src/components/tools/PasswordGenerator.tsx` (line 29)

**Details:** `charset[n % charset.length]` introduces modulo bias because `Uint32Array` values range from 0 to 2^32-1, and charset lengths do not evenly divide 2^32. For a 26-character charset, the first 14 characters have a ~0.000000034% higher probability of being chosen. This is practically negligible for password generation but technically imperfect.

**Recommendation:** For a security-sensitive tool, consider rejection sampling. However, the bias is so small (less than 1 in a billion) that this is arguably not worth fixing. Noting for completeness.

### 14. `LoremIpsumGenerator` pick function can produce repeated sequences

**File:** `/Users/markus/Developer/toolprime/src/components/tools/LoremIpsumGenerator.tsx` (line 38)

**Details:** The `pick` function uses a simple LCG (Linear Congruential Generator) that can produce visibly repeated sentence/word patterns, especially at higher counts. This is a cosmetic issue -- the output sometimes looks repetitive.

### 15. Reading time calculation has off-by-one logic

**File:** `/Users/markus/Developer/toolprime/src/components/tools/WordCounter.tsx` (line 23)

**Details:** `Math.ceil(words / 200)` means any text from 1-200 words shows "1 min". But line 24 says `minutes < 1 ? '< 1 min'` -- this branch is unreachable because `Math.ceil` on any positive number returns at least 1. The `< 1 min` string will never display.

**Recommendation:** Use `Math.floor` or `Math.round` and handle the sub-minute case:
```typescript
const minutes = words / 200
const readingTime = minutes < 1 ? '< 1 min' : `${Math.ceil(minutes)} min`
```

### 16. Digital storage conversions use SI (1000-based) not binary (1024-based)

**File:** `/Users/markus/Developer/toolprime/src/data/conversions.ts` (lines 75-78)

**Details:** The conversion factors use `0.001` for MB-to-GB, GB-to-TB, and KB-to-MB. This is the SI/decimal convention (1 GB = 1000 MB). Most users expect binary convention (1 GB = 1024 MB) when dealing with file sizes and storage. This is not "wrong" per se (both conventions exist), but it could confuse users.

**Recommendation:** At minimum, clarify in the UI or content which convention is used. Consider offering both (IEC binary: KiB, MiB, GiB vs SI decimal: KB, MB, GB).

### 17. `BaseLayout.astro` missing `lang` attribute dynamic support

**File:** `/Users/markus/Developer/toolprime/src/layouts/BaseLayout.astro` (line 17)

**Details:** `<html lang="en">` is hardcoded, but the Impressum and Datenschutz pages contain German text. These pages should ideally have `lang="de"` or at minimum wrap the German content in `<div lang="de">`.

### 18. Missing `robots.txt`

**Details:** No `robots.txt` was found in the `public/` directory. While not strictly required, it is a best practice for SEO. The sitemap integration generates a sitemap but search engines discover it more reliably with a `robots.txt` that references it.

---

## Nitpick

### 19. Inconsistent use of `client:load` vs `client:visible`

**Files:** All tool page `.astro` files use `client:load` for their React components.

**Details:** `client:load` eagerly hydrates the component as soon as the page loads. For tools below the fold (if any), `client:visible` would defer hydration until the component scrolls into view, saving initial JS parse/execute time. Since the tool component is typically the main content of the page and visible on load, `client:load` is correct here. However, if content sections were ever moved above the tool, this would warrant reconsideration.

**Verdict:** Current usage is correct. No change needed.

### 20. `relatedTools` array references non-existent tool IDs

**File:** `/Users/markus/Developer/toolprime/src/data/tools.ts`

**Details:** Several tools reference IDs that do not exist in the `tools` array:
- `case-converter` (referenced by word-counter, lorem-ipsum-generator)
- `diff-checker` (referenced by word-counter)
- `regex-tester` (referenced by json-formatter)
- `sql-formatter` (referenced by json-formatter)
- `url-encode-decode` (referenced by json-formatter, base64-encode-decode)
- `timestamp-converter` (referenced by base64-encode-decode, unit-converter)
- `css-gradient-generator` (referenced by color-picker)
- `favicon-generator` (referenced by qr-code-generator, color-picker, image-compressor)

The `getRelatedTools` function (line 148) safely filters these out with `.filter((t): t is Tool => t !== undefined)`, so this does not cause runtime errors. But it means some tools show fewer related tools than intended.

**Recommendation:** Either add placeholder entries for planned tools or remove the dangling references.

### 21. Title tag length concern

**File:** `/Users/markus/Developer/toolprime/src/lib/seo.ts` (line 16)

**Details:** `getToolMeta` generates titles like `"JSON Formatter & Validator -- Free Online Tool | ToolPrime"` which is 58 characters. Some tool names are longer. There is no length check or truncation for tool page titles (unlike conversion pages which have a length check on line 31). Google typically truncates titles at 50-60 characters.

**Recommendation:** Add a length guard similar to the conversion page logic.

### 22. Schema.org `priceCurrency` should match locale

**File:** `/Users/markus/Developer/toolprime/src/lib/schema.ts` (line 17)

**Details:** `priceCurrency: 'EUR'` is used. If the target audience is global (English-language site), `USD` might be more universally understood for the "free" price signal. This is a minor SEO consideration -- Google does not penalize either way for free tools.

### 23. `ColorPicker` initial HSL computed from wrong RGB values

**File:** `/Users/markus/Developer/toolprime/src/components/tools/ColorPicker.tsx` (line 56)

**Details:** The initial state is `useState(() => rgbToHsl(59, 130, 246))`. The hex `#3b82f6` decodes to RGB `(59, 130, 246)`, so the values are correct. However, this is fragile -- the RGB values are hardcoded separately from the hex string. If someone changes the default hex, they must also update the RGB arguments.

**Recommendation:** Derive from the hex:
```typescript
const [hsl, setHsl] = useState(() => {
  const { r, g, b } = hexToRgb('#3b82f6')!
  return rgbToHsl(r, g, b)
})
```

---

## Positive Observations

1. **Clean architecture.** The separation between data (`tools.ts`, `conversions.ts`, `faqs.ts`), SEO logic (`seo.ts`, `schema.ts`), layouts, components, and pages is excellent. The code is well-organized and easy to navigate.

2. **Consistent styling.** CSS custom properties for theming with automatic dark mode support is a solid approach. The design system is minimal but coherent.

3. **Good SEO foundation.** Unique meta descriptions per page, canonical URLs, Open Graph tags, structured data (WebApplication, FAQPage, BreadcrumbList), breadcrumbs, and sitemap generation are all present and correctly implemented.

4. **Privacy-first design.** All tools genuinely process data client-side. The privacy claims in the content are accurate.

5. **TypeScript usage.** Strict TypeScript config, proper interface definitions, and type narrowing throughout. No `any` types spotted.

6. **Base64 UTF-8 handling.** The `encodeBase64` function correctly uses `TextEncoder` to handle UTF-8 before `btoa()`, avoiding the classic "characters out of range" error. The decode path correctly uses `TextDecoder`. This is a common stumbling block that was handled properly.

7. **Static generation for converter pages.** `getStaticPaths()` correctly generates all 40+ conversion pages at build time. No runtime overhead.

8. **Content quality.** The long-form content on each tool page is genuinely helpful, well-written, and SEO-relevant. It is not just filler text.

---

## Summary

| Severity | Count |
|----------|-------|
| Critical | 2     |
| Important | 7    |
| Minor    | 9     |
| Nitpick  | 5     |

The two critical issues (the `new Function()` usage and the stale-state password generation bug) should be fixed before any production deployment. The important issues are quality-of-life fixes that affect correctness, accessibility, and dark mode support. The minor and nitpick items are refinements.

Overall, this is a well-built project with clean code, good architecture, and thoughtful SEO. The issues identified are typical of a first pass and straightforward to resolve.
