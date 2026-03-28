# Code Review: Extended Tool Content, OG Image Generation, Meta Tags Update

**Reviewer:** Claude Review Agent
**Date:** 2026-03-28
**Scope:** tool content data, OG image generation, meta tag updates, ToolLayout rendering

---

## Summary

The implementation is solid overall. All 20 tools have content, OG images build correctly at 1200x630, meta tags are properly wired, and the build passes cleanly. The code integrates well with existing patterns. Below are the findings.

---

## Findings

### 1. [Major] Duplicate interface declarations across tool-content files
**Files:** `src/data/tool-content-1.ts` (lines 1-26), `src/data/tool-content-2.ts` (lines 1-26), `src/data/tool-content-3.ts` (lines 1-26), `src/data/tool-content-4.ts` (lines 1-26)

Each of the four content files re-declares `ToolContentSection`, `ToolComparison`, and `ToolContent` as local (non-exported) interfaces instead of importing them from `src/data/tool-content.ts` where they are already defined and exported. If the shape ever changes, you must update five files in sync. The content files should `import type { ToolContent } from './tool-content'` and remove the local declarations.

---

### 2. [Major] OG image only registers one font weight (400) but uses weight 700 in markup
**File:** `src/lib/og-image.ts`, lines 126-131 (fontWeight: 700 used), line 226-233 (only weight 400 registered)

The Satori font configuration registers only `weight: 400`, but the markup uses `fontWeight: 700` for the tool name (line 158), icon text (line 129), and branding text (line 211). Satori cannot synthesize bold from a regular-weight font file -- it will render weight-700 text using the weight-400 glyphs, so the "bold" appearance is a no-op. To fix, either load the Inter Bold TTF as an additional font entry, or change the markup to use `fontWeight: 400` throughout (the visual impact at OG image scale may be acceptable).

---

### 3. [Minor] Remote font fetch during build with no timeout or retry
**File:** `src/lib/og-image.ts`, lines 11-17

The `loadFont()` function fetches a Google Fonts TTF from `fonts.gstatic.com` at build time. If the network is unavailable or slow, the entire build hangs or fails with an opaque error. Consider bundling the font file locally in the repo (it is a static asset, ~100KB) to eliminate the external dependency during builds. At minimum, add a timeout via `AbortSignal.timeout()`.

---

### 4. [Minor] `categoryLabelMap` in og-image.ts duplicates `categoryLabels` from tools.ts
**File:** `src/lib/og-image.ts`, lines 60-68

The `categoryLabelMap` object is a manual copy of `categoryLabels` already exported from `src/data/tools.ts`. Import and reuse it instead to avoid drift.

---

### 5. [Minor] Comparison table rows lack `scope` attribute on `<th>` elements
**File:** `src/layouts/ToolLayout.astro`, line 75

The `<th>` elements in comparison tables lack `scope="col"`, which is recommended for accessibility so screen readers correctly associate header cells with their columns.

```astro
{tool.content.comparison.headers.map((h: string) => <th scope="col">{h}</th>)}
```

---

### 6. [Minor] No `<caption>` on comparison tables
**File:** `src/layouts/ToolLayout.astro`, lines 72-87

Comparison tables have no `<caption>` element. Adding one (e.g., using `tool.content.comparison.heading`) helps screen readers describe the table purpose before reading cells.

---

### 7. [Minor] Content paragraphs in "What Is" section lack unique keys
**File:** `src/layouts/ToolLayout.astro`, line 49

`tool.content.whatIs.body.split('\n\n').map((p: string) => <p>{p}</p>)` produces multiple `<p>` elements without keys. In Astro's static build this is harmless, but adding an index-based key is a minor improvement for consistency and future-proofing if this code is ever moved to a client-side framework.

---

### 8. [Minor] Home page ogImage points to a specific tool's OG image
**File:** `src/lib/seo.ts`, line 77

`getHomeMeta()` sets `ogImage` to `/og/json-formatter.png` as the home page's social preview. This is a reasonable placeholder but may be confusing when shared -- it shows the JSON Formatter branding rather than a generic ToolPrime image. Consider generating a dedicated home-page OG image.

---

## Verified -- No Issues

- **TypeScript type safety:** Build passes with zero errors. `ToolContent` is properly optional on `Tool`. Null checks on `tool.content` and `tool.content.comparison` are correct.
- **Comparison table consistency:** All comparison tables have matching header/row column counts (programmatically verified).
- **Content coverage:** All 20 tool IDs have matching content entries (programmatically verified, zero missing, zero extra).
- **OG image dimensions:** Built images are 1200x630 PNG, ~38KB each -- well within platform requirements.
- **SEO meta tags:** `og:image`, `og:image:width`, `og:image:height`, and `twitter:card` with `summary_large_image` are correctly emitted for tool pages. Pages without ogImage correctly fall back to `twitter:card="summary"`.
- **XSS / injection:** Content is static data rendered by Astro's template engine, which auto-escapes. No `set:html` or `innerHTML` is used. No risk.
- **Build performance:** 20 OG images add ~1-2s to a 4s build. Acceptable.
- **Structured data consistency:** The `WebApplication` schema in `SchemaMarkup` still uses `tool.description`, matching the `og:description`. No drift.
