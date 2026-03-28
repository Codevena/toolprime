# Code Review: Extended Tool Content + OG Image Generation

**Reviewed files:**
- `src/data/tools.ts`
- `src/data/tool-content.ts`
- `src/data/tool-content-1.ts` through `tool-content-4.ts`
- `src/lib/og-image.ts`
- `src/pages/og/[id].png.ts`
- `src/layouts/ToolLayout.astro`
- `src/layouts/BaseLayout.astro`
- `src/lib/seo.ts`
- `package.json`

---

## Findings

### 1. TypeScript Error — `Buffer` Not Assignable to `BodyInit`

**File:** `src/pages/og/[id].png.ts`, line 14
**Severity:** Critical
**Description:** `tsc --noEmit` reports a hard type error:

```
error TS2345: Argument of type 'Buffer<ArrayBufferLike>' is not assignable to parameter
of type 'BodyInit | null | undefined'.
```

`generateOgImage` returns `Buffer` (Node.js type). Passing it directly to `new Response()` fails TypeScript's `BodyInit` constraint. The fix is to convert to a `Uint8Array` or use `.buffer` before passing to `Response`:

```ts
return new Response(new Uint8Array(png), {
  headers: { 'Content-Type': 'image/png' },
})
```

This is a real type safety gap even though the build currently succeeds at runtime (Astro's SSG path bypasses the type check at build execution).

---

### 2. `React.ReactNode` Cast Without React Import

**File:** `src/lib/og-image.ts`, line 223
**Severity:** Major
**Description:** The satori call uses `markup as React.ReactNode` but `React` is never imported in this file. Under the `"jsx": "react-jsx"` transform, `React` is not automatically in scope for `.ts` files (only for `.tsx`). This succeeds at runtime because `@types/react` is installed and Satori accepts the plain object, but it is an unsound cast. Either add `import type { ReactNode } from 'react'` and cast to `ReactNode`, or remove the cast entirely since Satori accepts a plain JSX-compatible object literal.

---

### 3. Duplicate Content — Slot Content and `tool.content` Overlap on the Same Page

**File:** `src/layouts/ToolLayout.astro`, lines 43–90; all `src/pages/*.astro` tool pages
**Severity:** Major (SEO)
**Description:** Every tool page uses `slot="content"` to render manually written H2 sections (e.g. "How to Use", "What is JSON?", "Privacy"). The new `tool.content` block is now rendered unconditionally in addition to — not instead of — that slot content. The result is visible in the built HTML:

- `dist/word-counter/index.html` has both "How to Use the Word Counter / Use Cases / Privacy" (from slot) **and** "What Is a Word Counter? / Popular Use Cases / Tips for Better Writing" (from `tool.content`).
- `dist/json-formatter/index.html` has "What is JSON?" (slot, lowercase) and "What Is JSON?" (tool.content, title case) covering the same topic.

This creates duplicate topical content on each page, which search engines may penalise. The intent should be to either replace the existing slot sections with `tool.content` or merge them. At minimum, topics should not be repeated.

---

### 4. Heading Hierarchy Issue — No `<h3>` Level Below `tool.content` `<h2>`s

**File:** `src/layouts/ToolLayout.astro`, lines 46–90
**Severity:** Minor (SEO / Accessibility)
**Description:** The `tool.content` section uses `<h2>` for the What Is, Use Cases, Tips, and Comparison headings. The individual list items (`<li><strong>Title:</strong> …</li>`) are presented as bold text inside list items rather than as `<h3>` subheadings. While this is an acceptable pattern for short lists, it means the heading outline jumps from `<h2>` directly to no heading at all for the sub-topics, which reduces crawlability of individual use cases and tips in structured content.

---

### 5. Table `<th>` Elements Missing `scope` Attribute

**File:** `src/layouts/ToolLayout.astro`, line 75
**Severity:** Minor (Accessibility — WCAG 1.3.1)
**Description:** The comparison table headers are rendered as `<th>{h}</th>` without a `scope="col"` attribute. Screen readers require `scope` on `<th>` elements to correctly associate headers with data cells. The fix is:

```astro
{tool.content.comparison.headers.map((h: string) => <th scope="col">{h}</th>)}
```

---

### 6. Only One Font Weight Registered for OG Image, Two Weights Used in Markup

**File:** `src/lib/og-image.ts`, lines 226–233 (satori `fonts` array) and lines 128–129, 157 (markup uses `fontWeight: 700`)
**Severity:** Minor (Visual Quality)
**Description:** The satori `fonts` array registers the Inter font with `weight: 400` only. The OG image markup uses `fontWeight: 700` for the tool name and icon text. Satori will fall back to the nearest available weight (400), so bold text will render at normal weight. To get actual bold rendering, a separate Inter Bold (700) font file must be fetched and registered alongside the 400 weight entry.

---

### 7. OG Image Font Fetched From External CDN at Build Time — No Timeout

**File:** `src/lib/og-image.ts`, lines 11–17
**Severity:** Minor
**Description:** `loadFont()` fetches the Inter font from `fonts.gstatic.com` at build time with no timeout. If Google's CDN is slow or unreachable, the build will hang indefinitely. Consider bundling the font file locally (e.g. `public/fonts/inter-regular.ttf`) and reading it with `fs.readFile` to eliminate the network dependency and improve build reliability. A local file also removes the implicit build-time internet requirement.

---

### 8. Duplicate Interface Declarations Across Content Files

**File:** `src/data/tool-content-2.ts` lines 1–26; `src/data/tool-content-3.ts` lines 1–26; `src/data/tool-content-4.ts` lines 1–26
**Severity:** Minor (Code Quality)
**Description:** `ToolContentSection`, `ToolComparison`, and `ToolContent` are declared as local `interface` blocks in `tool-content-2.ts`, `tool-content-3.ts`, and `tool-content-4.ts` — all three files. These same interfaces are already exported from `tool-content.ts` (which imports from `tool-content-1.ts`, which also exports them). The three files should instead `import type { ToolContent, ToolContentSection, ToolComparison } from './tool-content'` to eliminate the duplication and ensure a single source of truth. Currently any type change requires updating four places.

---

### 9. `og:image:alt` Meta Tag Missing

**File:** `src/layouts/BaseLayout.astro`, lines 32–34
**Severity:** Minor (Accessibility / SEO)
**Description:** The Open Graph and Twitter card specifications both support `og:image:alt` (and `twitter:image:alt`) which provides alt text for the OG image. This is used by screen readers accessing social media and is required for full WCAG 2.1 compliance for shared content. The `ogImage` prop is available at the `BaseLayout` level and a corresponding `ogImageAlt` prop can be threaded through from `MetaTags`.

---

### 10. Homepage OG Image Points to a Tool-Specific PNG

**File:** `src/lib/seo.ts`, line 76
**Severity:** Minor (SEO / Branding)
**Description:** `getHomeMeta()` hardcodes `ogImage: \`${SITE_URL}/og/json-formatter.png\`` as the homepage Open Graph image. When the homepage is shared on social media it will display the JSON Formatter card instead of a ToolPrime-branded image. This will look inconsistent on link previews. Consider generating a dedicated homepage OG image (e.g. `public/og-home.png`) that shows the ToolPrime brand and a general description.

---

### 11. `tool.content` Section Wrapped in `<div>` Without Semantic Landmark

**File:** `src/layouts/ToolLayout.astro`, line 46
**Severity:** Minor (Accessibility)
**Description:** The `tool.content` content block is wrapped in a plain `<div class="mt-8 prose ...">`. For landmark navigation (used by screen reader users), this section should be a `<section>` or `<article>` element with an `aria-label` or `aria-labelledby` pointing to its first heading. The existing `slot="content"` sections in the individual page files correctly use `<section>` elements.

---

## Summary Table

| # | File | Line | Severity | Category |
|---|------|------|----------|----------|
| 1 | `src/pages/og/[id].png.ts` | 14 | Critical | TypeScript |
| 2 | `src/lib/og-image.ts` | 223 | Major | TypeScript |
| 3 | `src/layouts/ToolLayout.astro` + all tool pages | 43, 45 | Major | SEO |
| 4 | `src/layouts/ToolLayout.astro` | 46–90 | Minor | SEO / Accessibility |
| 5 | `src/layouts/ToolLayout.astro` | 75 | Minor | Accessibility |
| 6 | `src/lib/og-image.ts` | 226–233 | Minor | Visual Quality |
| 7 | `src/lib/og-image.ts` | 11–17 | Minor | Build Reliability |
| 8 | `src/data/tool-content-2.ts`, `tool-content-3.ts`, `tool-content-4.ts` | 1–26 | Minor | Code Quality |
| 9 | `src/layouts/BaseLayout.astro` | 32–34 | Minor | Accessibility / SEO |
| 10 | `src/lib/seo.ts` | 76 | Minor | SEO / Branding |
| 11 | `src/layouts/ToolLayout.astro` | 46 | Minor | Accessibility |
