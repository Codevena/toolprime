# R4 Code Review — Round 4 (Codex-1 slot)

Reviewed files: src/data/tools.ts, tool-content.ts, tool-content-1.ts through 4.ts,
src/lib/og-image.ts, src/pages/og/[id].png.ts, src/layouts/ToolLayout.astro,
src/layouts/BaseLayout.astro, src/lib/seo.ts, all 20 src/pages/*.astro tool pages,
src/pages/datenschutz.astro, impressum.astro, index.astro, src/lib/schema.ts,
src/components/seo/Breadcrumbs.astro, FaqSection.astro, SchemaMarkup.astro.

TypeScript: `pnpm tsc --noEmit` exits 0 — no type errors.

---

## Findings

### 1. Placeholder email in datenschutz.astro — MEDIUM

**File:** `/Users/markus/Developer/toolprime/src/pages/datenschutz.astro`, line 33

```
<p>For privacy-related inquiries: [email@example.com]</p>
```

The contact email is still a literal placeholder `[email@example.com]`. This is live on the
site at `toolprime.dev/datenschutz`. A GDPR-compliant privacy policy must have a real,
reachable contact address. The Impressum already lists `info@codevena.dev` — that same
address should be used here.

**Fix:** Replace `[email@example.com]` with `info@codevena.dev` (matching Impressum), or
whichever address the owner wants to receive privacy inquiries at.

---

### 2. Home page meta description exceeds 155 characters — LOW

**File:** `/Users/markus/Developer/toolprime/src/lib/seo.ts`, line 71 (`getHomeMeta`)

The home description is 178 characters. Google truncates meta descriptions at approximately
155 characters in SERPs, cutting the sentence off mid-word ("All proc..."). The truncated
text ends at "No signup required. All proc..." which is a poor user-facing snippet.

**Fix:** Trim to under 155 characters. A suitable replacement:

```
Collection of free online tools: JSON formatter, word counter, image compressor,
unit converter, password generator, and more. No signup required.
```
(147 characters — clean sentence boundary)

---

### 3. twitter:image:alt meta tag absent — LOW

**File:** `/Users/markus/Developer/toolprime/src/layouts/BaseLayout.astro`, lines 37–40

The Twitter Card block includes `twitter:image` but not `twitter:image:alt`. The `og:image:alt`
tag is present and correct. Twitter uses `twitter:image:alt` separately (it does not fall back
to the OG value in all clients/validators).

**Fix:** Add alongside the existing twitter:image tag:

```astro
{ogImage && <meta name="twitter:image:alt" content={ogTitle ?? title} />}
```

---

### 4. Home page title is 66 characters — LOW / informational

**File:** `/Users/markus/Developer/toolprime/src/lib/seo.ts`, line 70

```
Free Online Tools — Developer, Text, Image, Math Tools | ToolPrime
```

Google typically displays up to 60 characters in desktop SERPs (roughly 600 px pixel-width).
At 66 characters this title will be truncated in most SERPs. The truncation point falls at
"Free Online Tools — Developer, Text, Image, Math T..." losing the brand name.

**Fix:** Shorten. For example:

```
Free Online Tools for Developers & Writers | ToolPrime
```
(55 characters — fits cleanly)

---

### 5. Impressum missing street address — LOW / informational

**File:** `/Users/markus/Developer/toolprime/src/pages/impressum.astro`

German TMG § 5 requires a full postal address (street, house number, city, postcode).
The current Impressum lists only "Deutschland" with no street. For a solo operator
a PO box or registered business address is acceptable, but something more specific than
"Deutschland" is required to be legally compliant.

This is not a code defect but a legal gap that should be addressed before search engines
or German regulators inspect the page.

---

## Non-findings (confirmed clean)

- All 20 tool IDs in `tools.ts` have exactly one matching entry in `allToolContent` (no gaps, no duplicates).
- All prose `slot="content"` sections include `dark:prose-invert` on all 20 tool pages.
- `ToolLayout.astro` prose section also carries `dark:prose-invert`.
- `datenschutz.astro` and `impressum.astro` both carry `dark:prose-invert`.
- All comparison tables have `<caption class="sr-only">` and `scope="col"` / `scope="row"` on header cells.
- `og:image:alt`, `og:image:width`, `og:image:height`, and `og:site_name` are all present and correct in BaseLayout.
- `twitter:card` is correctly set to `summary_large_image` when an OG image is present, `summary` otherwise.
- `og:type` is consistently `website` across all pages (acceptable for tool pages; `WebApplication` schema covers the richer typing).
- OG images use absolute URLs (`https://toolprime.dev/og/{id}.png`) — correct.
- The home OG image falls back to the `json-formatter.png` endpoint which is a valid static route.
- `<html lang="en">` is present.
- `robots.txt` is valid and references the sitemap correctly.
- `@astrojs/sitemap` integration is configured in `astro.config.mjs`.
- `<meta name="robots" content="noindex">` is correctly set on the 404 page only.
- Breadcrumb schema uses `BreadcrumbList` with correct `ListItem` structure.
- `webApplicationSchema` correctly sets `price: '0'` with `priceCurrency: 'EUR'`.
- Font loading in `og-image.ts` uses a promise-caching singleton with proper error reset on failure.
- `React.ReactNode` cast in `og-image.ts` is safe — `@types/react` is installed and `tsconfig` has `"jsx": "react-jsx"`.
- `<Buffer>` type resolved correctly (sharp `.toBuffer()` returns Node.js `Buffer` which extends `Uint8Array`).
- No duplicate tool content keys across the four `tool-content-*.ts` files.
- All tool page titles are under 60 characters.
- All tool `description` fields in `tools.ts` are under 100 characters — well within SERP limits.
- Heading hierarchy is correct on all pages: one `h1` per page, `h2` sections beneath, `h3` for tool cards on home.
- `aria-label="Breadcrumb"` present on breadcrumb `<nav>`.
- `aria-label="About this tool"` present on the tool-content prose section in ToolLayout.
- Search inputs have `aria-label="Search tools"` and `type="search"`.
- Schema markup is injected via `<slot name="head">` — correctly placed in `<head>`.
- `<FaqSection>` renders schema only when `faqs.length > 0` — no empty schema blocks.
