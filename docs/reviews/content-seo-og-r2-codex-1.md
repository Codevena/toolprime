# Code Review: Content, SEO & OG Image Changes — Round 2

**Reviewer:** Claude (Sonnet 4.6)
**Date:** 2026-03-28
**Scope:** src/data/tools.ts, src/data/tool-content.ts + tool-content-1..4.ts, src/lib/og-image.ts, src/pages/og/[id].png.ts, src/layouts/ToolLayout.astro, src/layouts/BaseLayout.astro, src/lib/seo.ts, all 20 src/pages/*.astro tool pages

---

## Finding 1 — HIGH: Missing `dark:prose-invert` on all 20 tool page prose sections

**Files:** All 20 `src/pages/*.astro` tool pages

**Description:**
Every tool page renders a `slot="content"` section with the class `"prose prose-slate max-w-none"`. The `dark:prose-invert` modifier is absent. Without it, dark mode will render black prose text on a dark background, making the "How to Use" and "Privacy" sections unreadable.

The `ToolLayout.astro` content section (the dynamically generated whatIs/useCases/tips section) correctly uses `"prose prose-slate max-w-none dark:prose-invert"`, but the page-level slot content does not.

**Affected pages:** base64-encode-decode.astro, case-converter.astro, color-picker.astro, css-gradient-generator.astro, diff-checker.astro, favicon-generator.astro, hash-generator.astro, image-compressor.astro, invoice-generator.astro, json-formatter.astro, lorem-ipsum-generator.astro, password-generator.astro, percentage-calculator.astro, qr-code-generator.astro, regex-tester.astro, sql-formatter.astro, timestamp-converter.astro, unit-converter.astro, url-encode-decode.astro, word-counter.astro

**Fix:** Add `dark:prose-invert` to every `slot="content"` section element in all 20 pages.

---

## Finding 2 — MEDIUM: Comparison table first-column cells use `<td>` instead of `<th scope="row">`

**File:** `src/layouts/ToolLayout.astro`, lines 80–84

**Description:**
The comparison tables (present for base64, image-compressor, case-converter, hash-generator, css-gradient-generator) render all `<tbody>` cells as `<td>`. The first column in each row is a row header — for example "Base64", "URL Encoding", "Hex Encoding" in the base64 table, or "MD5", "SHA-1", "SHA-256", "SHA-512" in the hash table. Per WCAG 1.3.1 (Info and Relationships), these cells should be `<th scope="row">` to correctly express the table structure to screen readers.

The current code maps all cells uniformly:
```
{row.map((cell: string) => <td>{cell}</td>)}
```

**Fix:** Render the first cell in each row as `<th scope="row">` and the remaining cells as `<td>`.

---

## Finding 3 — MEDIUM: WCAG contrast failure in `diff-checker.astro` inline color spans

**File:** `src/pages/diff-checker.astro`, line 16

**Description:**
The "How to Use" paragraph uses `<span style="color: red;">red</span>` to illustrate deletion color. The CSS named color `red` (#FF0000) has a contrast ratio of approximately 4.00:1 against white — below the WCAG AA threshold of 4.5:1 for normal-sized text. In dark mode this drops further to approximately 3.66:1.

The `green` (#008000) span passes on white (5.14:1) but fails in dark mode on a typical dark surface (approximately 2.85:1).

These spans are inside a prose section that does not carry `dark:prose-invert` (see Finding 1), compounding the problem.

**Fix:** Replace the raw color names with design-token-aware classes. For example: `<span class="text-green-600 dark:text-green-400">green</span>` and `<span class="text-red-600 dark:text-red-400">red</span>`.

---

## Finding 4 — LOW: Font loading race condition in `og-image.ts`

**File:** `src/lib/og-image.ts`, lines 11–33

**Description:**
The module-level variables `fontData` and `fontBoldData` are used to cache fetched fonts across calls. The `loadFonts` function checks `if (fontData && fontBoldData)` before fetching, but does not hold a lock between the check and the assignment. In SSG mode, Astro builds pages in parallel (20 OG images), so multiple concurrent calls can each observe `fontData === null` before any single call completes, causing up to 20 redundant font fetches from Google's CDN.

This does not produce incorrect output — each call will independently succeed and write the same data to the cache variables — but it wastes network requests at build time and could theoretically fail if the CDN rate-limits the build host.

**Fix:** Cache a single `Promise` instead of the resolved values, so all concurrent callers await the same in-flight request:

```typescript
let fontLoadPromise: Promise<{ regular: ArrayBuffer; bold: ArrayBuffer }> | null = null

async function loadFonts(): Promise<{ regular: ArrayBuffer; bold: ArrayBuffer }> {
  if (!fontLoadPromise) {
    fontLoadPromise = Promise.all([
      fetchFont(FONT_URL, 'Inter Regular'),
      fetchFont(FONT_BOLD_URL, 'Inter Bold'),
    ]).then(([regular, bold]) => ({ regular, bold }))
  }
  return fontLoadPromise
}
```

---

## Finding 5 — LOW: OG image category label and domain text have low contrast

**File:** `src/lib/og-image.ts`, lines 148–221

**Description:**
The generated OG images are raster images used in social sharing previews, so WCAG interactive contrast rules do not apply. However, two text elements are difficult to read visually:

- Category label (`#64748b` on `#0f172a`): contrast ratio 3.75:1 — below AA normal text threshold
- Domain branding text (`#475569` on `#0f172a`): contrast ratio 2.36:1 — very low

These affect the polish of the social sharing card when viewed on platforms with image previews.

**Fix:** Lighten the category label to `#94a3b8` (matches the description text color, 6.96:1) and the domain text to `#64748b` (3.75:1, better than current 2.36:1). Using `#8b9bb4` for the domain text gives approximately 4.1:1.

---

## Finding 6 — INFORMATIONAL: Home OG image hardcoded to `json-formatter.png`

**File:** `src/lib/seo.ts`, line 76

**Description:**
The home page OG image is hardcoded to `/og/json-formatter.png`:

```typescript
ogImage: `${SITE_URL}/og/json-formatter.png`,
```

This image exists and is generated correctly. However, the home page represents all tools, not just the JSON formatter. While not a bug, a dedicated home OG image (with a different design showing multiple tools or just the logo) would be more representative. This is purely informational and requires no code fix if the current approach is intentional.

---

## Summary

| # | Severity | File(s) | Issue |
|---|----------|---------|-------|
| 1 | HIGH | All 20 tool .astro pages | Missing `dark:prose-invert` causes unreadable prose in dark mode |
| 2 | MEDIUM | ToolLayout.astro | Comparison table first-column cells should be `<th scope="row">` |
| 3 | MEDIUM | diff-checker.astro | Inline `color: red` fails WCAG AA contrast; breaks worse in dark mode |
| 4 | LOW | og-image.ts | Font loading race condition — redundant fetches under parallel SSG builds |
| 5 | LOW | og-image.ts | Category label and domain text low contrast in generated OG images |
| 6 | INFO | seo.ts | Home OG image hardcoded to json-formatter asset |

The build passes cleanly, TypeScript is correct, all 20 tools have content entries, OG images generate and validate as proper 1200x630 PNG files, and there are no injection or XSS risks. The issues above are the complete set of findings.
