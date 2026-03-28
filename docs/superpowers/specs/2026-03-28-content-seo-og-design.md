# Content & SEO + OG Images — Design Spec

**Date:** 2026-03-28
**Scope:** Expand tool page content to 500+ words, generate dynamic OG images per tool

## Goals

1. Expand each of the 20 tool pages from ~150-300 words to 500+ words with SEO-optimized, high-value content
2. Generate dynamic OG images (1200×630px) per tool for social sharing
3. All content in English

## Non-Goals

- No blog section (deferred to future)
- No OG images for programmatic pages (calculators, hashes, regex, gradients)
- No i18n (English only for now)

---

## Part 1: Extended Tool Content

### Data Structure

Extend the `Tool` interface in `src/data/tools.ts` with a `content` field:

```typescript
interface ToolContentSection {
  title: string
  description: string
}

interface ToolComparison {
  heading: string
  headers: string[]
  rows: string[][]
}

interface ToolContent {
  whatIs: {
    heading: string   // e.g. "What Is JSON?"
    body: string      // 2-3 paragraphs, 80-120 words
  }
  useCases: {
    heading: string   // e.g. "Common Use Cases"
    items: ToolContentSection[]  // 3-5 items
  }
  tips: {
    heading: string   // e.g. "Tips & Best Practices"
    items: ToolContentSection[]  // 3-5 items
  }
  comparison?: ToolComparison   // Optional, only where it adds value
}

interface Tool {
  // ... existing fields
  content: ToolContent
}
```

### Content Sections

Each tool page gets these sections rendered by `ToolLayout.astro`, inserted between the existing "How to Use" content slot and the FAQ section:

1. **What Is [Concept]** — 2-3 paragraphs explaining the concept (80-120 words)
2. **Common Use Cases** — 3-5 items with title + short description (60-100 words total)
3. **Tips & Best Practices** — 3-5 items with title + short description (60-100 words total)
4. **Comparison Table** (optional) — Only for tools where comparison adds value

### Tools Getting Comparison Tables (5 of 20)

| Tool | Comparison Topic |
|------|-----------------|
| Hash Generator | MD5 vs SHA-1 vs SHA-256 vs SHA-512 (output length, security, speed) |
| Base64 Encode/Decode | Base64 vs URL Encoding vs Hex Encoding |
| Case Converter | camelCase vs snake_case vs PascalCase vs kebab-case (when to use which) |
| CSS Gradient Generator | Linear vs Radial vs Conic gradients |
| Image Compressor | JPEG vs PNG vs WebP (quality, size, transparency) |

### Rendering in ToolLayout.astro

```
[Tool Header - name, longDescription, icon]
[Interactive Tool Component]
[Existing "How to Use" content slot]    ← stays in .astro files
[What Is section]                       ← NEW, from tools.ts
[Common Use Cases]                      ← NEW, from tools.ts
[Tips & Best Practices]                 ← NEW, from tools.ts
[Comparison Table]                      ← NEW, optional, from tools.ts
[Privacy & Security]                    ← stays in template
[FAQ Section]                           ← existing, from faqs.ts
[Related Tools]                         ← existing
```

The new sections use the same `prose prose-slate max-w-none` styling as existing content.

### Existing Content

- "How to Use" content stays in individual `.astro` files (too varied per tool for data-driven approach)
- Privacy section stays as template content in ToolLayout.astro (identical for all tools)
- FAQ section continues to render from `src/data/faqs.ts`

---

## Part 2: Dynamic OG Images

### Technology

- **Satori** — converts JSX/HTML to SVG
- **Sharp** — converts SVG to PNG
- **Geist font** — .woff files loaded as buffers for Satori

### New Dependencies

- `satori` — HTML/CSS to SVG rendering
- `sharp` — SVG to PNG conversion (check if already available)

### OG Image Template

1200×630px, dark branded card design:

```
┌──────────────────────────────────────┐
│ gradient accent bar (4px)            │
│ (blue-500 → violet-500 → pink-500)  │
│                                      │
│  [Gradient Icon Box]  Tool Name      │
│                       Category       │
│                                      │
│  Tool description text that          │
│  explains what the tool does.        │
│  Free, fast, no sign-up.            │
│                                      │
│  [◆ gradient] toolprime.dev          │
└──────────────────────────────────────┘
```

**Design Tokens:**
- Background: `#0f172a` (slate-900)
- Gradient accent: `#3b82f6` → `#8b5cf6` → `#ec4899`
- Tool name: white, Geist Bold, ~32px
- Category: `#64748b` (slate-500), Geist Regular, ~14px
- Description: `#94a3b8` (slate-400), Geist Regular, ~18px
- Domain: `#475569` (slate-600), Geist Semi-Bold, ~14px
- Icon box: 48×48px, rounded-lg, gradient background, white icon initial

### Icon Representation

Since Satori cannot render Lucide SVG icons directly, use a text character or abbreviation per tool inside the gradient icon box. Examples:
- JSON Formatter → `{ }`
- Word Counter → `Aa`
- Password Generator → `●●`
- Hash Generator → `#`

Map defined in the OG image generator.

### Build Integration

- New file: `src/lib/og-image.ts` — Satori template + generation logic
- New Astro endpoint: `src/pages/og/[id].png.ts` — generates OG images at build time using `getStaticPaths()` for all 20 tools
- Output: `/og/json-formatter.png`, `/og/word-counter.png`, etc.

### Meta Tag Updates

In `BaseLayout.astro`:
- Add `<meta property="og:image" content="{SITE_URL}/og/{tool-id}.png" />`
- Change twitter card from `summary` to `summary_large_image`

In `src/lib/seo.ts`:
- Extend `MetaTags` interface with optional `ogImage` field
- Update `getToolMeta()` to include `ogImage: /og/${tool.id}.png`

### What Doesn't Get OG Images

Programmatic pages (calculators, hashes, regex, gradients) do not get OG images. They can optionally fall back to a generic ToolPrime OG image in the future.

---

## Summary

| Component | Files Modified | Files Created |
|-----------|---------------|---------------|
| Tool content data | `src/data/tools.ts` | — |
| Content rendering | `src/layouts/ToolLayout.astro` | — |
| OG image generator | — | `src/lib/og-image.ts` |
| OG image endpoint | — | `src/pages/og/[id].png.ts` |
| Meta tags | `src/layouts/BaseLayout.astro`, `src/lib/seo.ts` | — |

**New dependencies:** `satori`, `sharp` (if not present)
**New content:** ~6000 words across 20 tools
**New assets:** 20 OG images (generated at build time)
