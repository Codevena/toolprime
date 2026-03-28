# Round 3 Code Review — Content, SEO, OG Image

**Scope:** `src/data/tools.ts`, `tool-content.ts`, `tool-content-1.ts` through `tool-content-4.ts`, `src/lib/og-image.ts`, `src/pages/og/[id].png.ts`, `src/layouts/ToolLayout.astro`, `src/layouts/BaseLayout.astro`, `src/lib/seo.ts`, all 20 `src/pages/*.astro` tool pages.

Build status at time of review: clean (`pnpm build` and `tsc --noEmit` both pass with zero errors).

---

## Findings

### 1. Privacy policy names wrong analytics provider (HIGH — Legal/Accuracy)

**File:** `src/pages/datenschutz.astro` line 19

`datenschutz.astro` states: *"We use Plausible Analytics, a privacy-friendly analytics service..."*

However, `BaseLayout.astro` line 38 loads:

```
https://analytics.codevena.dev/script.js
```

This is a self-hosted instance (likely Umami), not Plausible. A privacy policy that misidentifies the analytics provider is inaccurate and potentially non-compliant with GDPR transparency requirements (Art. 13/14). The policy must name the actual provider and service in use.

**Fix:** Update `datenschutz.astro` to accurately describe the analytics provider being used.

---

### 2. Missing `dark:prose-invert` on legal pages (MEDIUM — Dark Mode / Visual)

**Files:** `src/pages/datenschutz.astro` line 16, `src/pages/impressum.astro` line 11

Both legal pages use `class="prose prose-slate max-w-none"` without `dark:prose-invert`. Every tool page and ToolLayout correctly apply `dark:prose-invert`. The legal pages will display dark-on-dark text in dark mode.

**Fix:** Add `dark:prose-invert` to the `prose` container in both files.

```html
<!-- datenschutz.astro and impressum.astro -->
<div class="prose prose-slate max-w-none dark:prose-invert">
```

---

### 3. Missing Twitter/X Card image and description tags (MEDIUM — SEO / Social)

**File:** `src/layouts/BaseLayout.astro`

The layout sets `twitter:card` but does not set `twitter:image`, `twitter:title`, or `twitter:description`. While Twitter/X currently falls back to Open Graph tags for these, explicitly setting them is required per Twitter Card documentation and prevents breakage if fallback behaviour changes.

**Fix:** Add to `<head>` in `BaseLayout.astro`:

```html
{ogImage && <meta name="twitter:image" content={ogImage} />}
<meta name="twitter:title" content={ogTitle ?? title} />
<meta name="twitter:description" content={ogDescription ?? description} />
```

---

### 4. Missing `og:site_name` meta tag (LOW — SEO / Social)

**File:** `src/layouts/BaseLayout.astro`

The Open Graph spec recommends `og:site_name` for all pages. Facebook, LinkedIn, and other scrapers use it to display the site name separately from the page title. It is absent from the layout entirely.

**Fix:** Add inside `<head>`:

```html
<meta property="og:site_name" content="ToolPrime" />
```

---

### 5. Decorative search icon SVG missing `aria-hidden="true"` (LOW — Accessibility)

**File:** `src/pages/index.astro` line 29

The magnifying glass SVG preceding the search input is purely decorative. The adjacent `<input>` already has `aria-label="Search tools"`. Without `aria-hidden="true"` on the SVG, some screen readers announce an unlabelled graphic alongside the labelled input, adding redundant noise.

**Fix:**

```html
<svg aria-hidden="true" ...>
```

---

### 6. Search input uses `type="text"` instead of `type="search"` (LOW — Semantics / UX)

**File:** `src/pages/index.astro` line 31

`type="search"` is semantically correct for a search field. It enables browser-native clear buttons on some platforms, improves accessibility semantics, and is recognised correctly by voice input software. Using `type="text"` is not wrong but misses this semantic signal.

**Fix:** Change `type="text"` to `type="search"` on the tool-search input.

---

### 7. `loadFonts` singleton promise not reset on rejection (LOW — Build Reliability)

**File:** `src/lib/og-image.ts` lines 22–35

The `fontsPromise` module-level singleton is set once and never cleared on failure. If the font fetch fails at build time (network timeout, DNS issue, Google Fonts outage), the rejected promise persists for the lifetime of the Node process. Every subsequent `generateOgImage` call—all remaining 19 tools—receives the same rejected promise immediately with no chance of retry.

For a static site this means a transient font CDN failure at build time causes all 20 OG images to fail rather than just the first.

**Fix:** Reset `fontsPromise` to `null` when the inner promise rejects:

```ts
function loadFonts(): Promise<{ regular: ArrayBuffer; bold: ArrayBuffer }> {
  if (!fontsPromise) {
    fontsPromise = (async () => {
      const [regular, bold] = await Promise.all([
        fetchFont(FONT_URL, 'Inter Regular'),
        fetchFont(FONT_BOLD_URL, 'Inter Bold'),
      ])
      return { regular, bold }
    })().catch((err) => {
      fontsPromise = null  // allow retry on next call
      throw err
    })
  }
  return fontsPromise
}
```

---

### 8. `satori` call uses `as any` type suppression (LOW — Maintainability)

**File:** `src/lib/og-image.ts` line 232

```ts
const svg = await satori(markup as any, { ... })
```

The cast suppresses TypeScript's ability to catch breaking API changes in satori. If the VNode shape changes in a future satori update, the compiler will not catch it. Consider importing `satori`'s `ReactNode` or `VNode` type and casting to that instead of `any`.

---

## Non-issues Verified

The following were checked and found to be correct:

- All 20 tool IDs in `tools.ts` have corresponding entries in the four `tool-content-*` files. No tool is missing content.
- All comparison table row cell counts match their header counts for every comparison table (base64: 4 cols/3 rows, image-compressor: 5 cols/3 rows, case-converter: 4 cols/5 rows, hash-generator: 5 cols/4 rows, css-gradient: 5 cols/3 rows).
- `relatedTools` arrays reference only valid tool IDs that exist in the tools array.
- Comparison tables use `scope="col"` on header cells and `scope="row"` on first-column cells. `<caption>` is present and `sr-only`.
- ToolLayout renders slot `content` before the `tool.content` auto-generated sections, giving a logical heading sequence: h1 → h2 "How to Use" → h2 "What Is" → h2 "Use Cases/Tips".
- `og:image:alt` is set to the OG title. `og:image:width` (1200) and `og:image:height` (630) are present.
- `getStaticPaths` in `[id].png.ts` correctly maps all 20 tools.
- `new Uint8Array(png)` wrapping a `Buffer` is correct; `Buffer` is a `Uint8Array` subclass.
- `getConversionMeta` has a title-length guard for long conversion titles. Other meta functions produce titles well within 60 characters.
- JSX-style `{/* comments */}` in ToolLayout are valid Astro template syntax.
- `getHomeMeta` OG image points to `/og/json-formatter.png` — a valid, always-generated path.
- `404.astro` correctly uses `<meta name="robots" content="noindex">`.
- Build and type check both pass clean.
