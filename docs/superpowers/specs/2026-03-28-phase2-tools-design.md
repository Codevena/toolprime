# Phase 2 Design Spec — 10 New Tools

## Context

ToolPrime Phase 1 shipped 10 interactive browser tools with 52 static pages, full SEO (schema markup, FAQs, breadcrumbs), and passed 4-agent code review. Phase 2 doubles the tool count to 20, increasing keyword coverage and internal cross-linking for organic traffic growth. The goal is to reach 50K monthly sessions for Mediavine ad eligibility.

## Tools Overview

### 1. URL Encode/Decode
- **Category:** `developer` | **Icon:** `Link` | **Slug:** `/url-encode-decode`
- **Dependencies:** None (native `encodeURIComponent`/`decodeURIComponent`)
- **UI:** Two-column input/output with Encode/Decode tabs. Toggle for `encodeURI` vs `encodeURIComponent`.
- **Pattern:** Clone of Base64EncodeDecode component.

### 2. Case Converter
- **Category:** `text` | **Icon:** `CaseSensitive` | **Slug:** `/case-converter`
- **Dependencies:** None (native string methods)
- **UI:** Two-column. Button row above columns for 8 modes: UPPER, lower, Title Case, Sentence case, camelCase, snake_case, kebab-case, PascalCase.
- **Implementation:** Pure string functions, instant conversion on input change or button click.

### 3. Timestamp Converter
- **Category:** `developer` | **Icon:** `Clock` | **Slug:** `/timestamp-converter`
- **Dependencies:** None (native `Date` + `Intl.DateTimeFormat`)
- **UI:** Live current timestamp display at top. Two conversion boxes below: Unix→Date (left), Date→Unix (right). Each with CopyButton.
- **Features:** UTC + local time, ISO 8601 output, seconds/milliseconds toggle.

### 4. Hash Generator
- **Category:** `developer` | **Icon:** `Fingerprint` | **Slug:** `/hash-generator`
- **Dependencies:** `js-md5` (~5KB gzipped, zero deps)
- **UI:** Input textarea at top. Grid of 4 output fields below (MD5, SHA-1, SHA-256, SHA-512), each with CopyButton.
- **Implementation:** SHA variants via `crypto.subtle.digest()`, MD5 via `js-md5`. All compute simultaneously on input change.

### 5. Regex Tester
- **Category:** `developer` | **Icon:** `Regex` | **Slug:** `/regex-tester`
- **Dependencies:** None (native `RegExp` + `matchAll`)
- **UI:** Pattern input + flag checkboxes (g/i/m/s) at top. Two-column below: test string textarea (left), match results with highlighted matches (right).
- **Safety:** Try/catch for invalid patterns. Consider input length cap to prevent catastrophic backtracking.

### 6. SQL Formatter
- **Category:** `developer` | **Icon:** `Database` | **Slug:** `/sql-formatter`
- **Dependencies:** `sql-formatter` (~30KB gzipped, zero deps)
- **UI:** Two-column input/output (clone of JsonFormatter). Dialect dropdown (Standard SQL, MySQL, PostgreSQL, T-SQL, PL/SQL), indent size selector, uppercase keywords toggle.

### 7. Diff Checker
- **Category:** `developer` | **Icon:** `GitCompare` | **Slug:** `/diff-checker`
- **Dependencies:** `diff` (~15KB gzipped, zero deps)
- **UI:** Two textareas side-by-side (Original/Modified) at top. Compare button. Diff output below with green (added) / red (removed) highlighting.
- **Features:** Line-level and word-level diff toggle. Unified vs side-by-side view. Debounce for large inputs.

### 8. CSS Gradient Generator
- **Category:** `design` | **Icon:** `Blend` | **Slug:** `/css-gradient-generator`
- **Dependencies:** None (native CSS + color inputs)
- **UI:** Large gradient preview (200px, full width) at top. Controls: gradient type (linear/radial/conic), angle slider, color stops (color picker + position + remove), "Add Stop" button. CSS output box with CopyButton at bottom.
- **Features:** Live preview, unlimited color stops, preset gallery.

### 9. Favicon Generator
- **Category:** `image` | **Icon:** `Image` | **Slug:** `/favicon-generator`
- **Dependencies:** `jszip` (~45KB gzipped, zero deps)
- **UI:** Upload zone (drag-and-drop, reuse ImageCompressor pattern). Preview grid of all sizes (16, 32, 48, 64, 128, 180, 192, 512). Download All as ZIP + individual downloads. HTML `<link>` tags snippet with CopyButton.
- **Implementation:** Canvas API for resize at each size, export as PNG. Bundle with JSZip.

### 10. Invoice Generator
- **Category:** `business` | **Icon:** `Receipt` | **Slug:** `/invoice-generator`
- **Dependencies:** `jspdf` (~300KB gzipped, zero deps — lazy-loaded on button click)
- **UI:** Single-column form. Sections: Company Info, Client Info, Invoice Details (number, date, due date, currency), Line Items (dynamic add/remove rows), Notes. Live preview below. Download PDF button.
- **Features:** Auto-calculate subtotal/tax/total, currency selector, PDF generation entirely client-side.
- **Note:** Lazy-load jspdf on "Download PDF" click to avoid loading 300KB on page load.

## New Dependencies

| Package | Tool | Size (gzip) | Weekly Downloads |
|---------|------|-------------|------------------|
| `js-md5` | Hash Generator | ~5KB | 3M+ |
| `sql-formatter` | SQL Formatter | ~30KB | 1.5M+ |
| `diff` | Diff Checker | ~15KB | 40M+ |
| `jspdf` | Invoice Generator | ~300KB | 7M+ |
| `jszip` | Favicon Generator | ~45KB | 10M+ |

All packages: zero runtime dependencies, well-maintained, high download counts. jspdf lazy-loaded to minimize impact.

## Cross-Linking Strategy

### Phase 2 Tools → Related Tools
| Tool | relatedTools |
|------|-------------|
| `url-encode-decode` | `['base64-encode-decode', 'hash-generator', 'json-formatter']` |
| `case-converter` | `['word-counter', 'lorem-ipsum-generator', 'url-encode-decode']` |
| `timestamp-converter` | `['unit-converter', 'base64-encode-decode', 'hash-generator']` |
| `hash-generator` | `['base64-encode-decode', 'password-generator', 'url-encode-decode']` |
| `regex-tester` | `['json-formatter', 'sql-formatter', 'diff-checker']` |
| `sql-formatter` | `['json-formatter', 'regex-tester', 'diff-checker']` |
| `diff-checker` | `['json-formatter', 'sql-formatter', 'regex-tester']` |
| `css-gradient-generator` | `['color-picker', 'favicon-generator', 'qr-code-generator']` |
| `favicon-generator` | `['image-compressor', 'css-gradient-generator', 'color-picker']` |
| `invoice-generator` | `['qr-code-generator', 'percentage-calculator', 'word-counter']` |

### Phase 1 Tools → Add Backlinks
- `json-formatter.relatedTools` += `'sql-formatter'`
- `base64-encode-decode.relatedTools` += `'url-encode-decode'`
- `color-picker.relatedTools` += `'css-gradient-generator'`
- `image-compressor.relatedTools` += `'favicon-generator'`
- `password-generator.relatedTools` += `'hash-generator'`
- `word-counter.relatedTools` += `'case-converter'`

## Build Order

Simple → complex to maintain velocity:

1. URL Encode/Decode (simple, clone of Base64)
2. Case Converter (simple, pure JS)
3. Timestamp Converter (simple, pure JS)
4. Hash Generator (simple, one tiny dep)
5. Regex Tester (medium, match highlighting)
6. SQL Formatter (medium, one dep)
7. Diff Checker (medium, colored diff output)
8. CSS Gradient Generator (medium, interactive controls)
9. Favicon Generator (complex, canvas + ZIP)
10. Invoice Generator (complex, form + PDF)

## Files Per Tool

**New files (2 per tool = 20 total):**
- `src/components/tools/[ComponentName].tsx`
- `src/pages/[slug].astro`

**Modified files (same 2 files for all 10 tools):**
- `src/data/tools.ts` — add Tool entry
- `src/data/faqs.ts` — add 3 FAQs

**Other modifications:**
- `package.json` — add 5 new dependencies
- `src/data/tools.ts` — update 6 Phase 1 relatedTools arrays

## Verification

1. `pnpm build` — should build 72+ pages (52 existing + 10 new tool pages + any new programmatic pages) with zero errors
2. `pnpm dev` — manually test each tool in the browser:
   - Input/output works correctly
   - CopyButton copies to clipboard
   - Mobile responsive (single column on small screens)
   - Error states display properly
   - No console errors
3. Check all 10 new pages have: breadcrumbs, FAQs, related tools, schema markup
4. Verify cross-links: Phase 1 tools link to Phase 2 and vice versa
5. Run `tsc --noEmit` — zero TypeScript errors
