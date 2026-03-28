# Phase 4 — 11 New Tools + Programmatic SEO Pages

## Overview

Add 11 new client-side tools to ToolPrime with full SEO optimization and ~509 programmatic landing pages. Target: ~3,585 total pages.

## Tools

| # | Tool | ID | Category | Dependencies (lazy) | Path |
|---|------|----|----------|-------------------|------|
| 1 | Markdown Editor | markdown-editor | developer | marked, highlight.js | /markdown-editor |
| 2 | Markdown to PDF | markdown-to-pdf | developer | marked, html2pdf.js | /markdown-to-pdf |
| 3 | JSON to CSV Converter | json-to-csv | developer | papaparse | /json-to-csv |
| 4 | Image to Base64 | image-to-base64 | developer | — (File API) | /image-to-base64 |
| 5 | Meta Tag Generator | meta-tag-generator | developer | — | /meta-tag-generator |
| 6 | robots.txt Generator | robots-txt-generator | developer | — | /robots-txt-generator |
| 7 | Cron Expression Generator | cron-expression-generator | developer | cronstrue | /cron-expression-generator |
| 8 | Color Palette Generator | color-palette-generator | design | — | /color-palette-generator |
| 9 | Mortgage Calculator | mortgage-calculator | math | — | /mortgage-calculator |
| 10 | BMI Calculator | bmi-calculator | math | — | /bmi-calculator |
| 11 | Tip Calculator | tip-calculator | math | — | /tip-calculator |

## Files Per Tool (Standard Pattern)

1. `src/components/tools/[ToolName].tsx` — React component (client:load)
2. `src/pages/[tool-slug].astro` — Astro page using ToolLayout
3. Entry in `src/data/tools.ts` — Tool definition (id, name, description, category, path, icon, keywords, relatedTools)
4. Entry in `src/data/tool-content.ts` — 500+ words SEO content (whatIs, howToUse, useCases, tips, comparisonTable where applicable)
5. Entry in `src/data/faqs.ts` — 3-5 FAQs with FAQPage schema
6. OG image auto-generated via existing `src/pages/og/[id].png.ts`

## Programmatic SEO Pages

### Cron Expressions (~40 pages)
- **Data:** `src/data/cronExpressions.ts`
- **Page:** `src/pages/cron/[slug].astro`
- **Index:** `src/pages/cron/index.astro`
- **URL:** `/cron/every-5-minutes/`, `/cron/daily-at-midnight/`, etc.
- **Content:** Human-readable explanation, next 5 run times, use cases, related expressions
- **Schema:** FAQPage

### BMI Calculator (~200 pages)
- **Data:** `src/data/bmiData.ts`
- **Page:** `src/pages/calculators/bmi-[slug].astro`
- **URL:** `/calculators/bmi-170cm-70kg/`, etc.
- **Content:** BMI result, category, health info, related heights/weights
- **Schema:** FAQPage
- **Ranges:** Heights 150-200cm (step 5), Weights 40-130kg (step 5)

### Mortgage Calculator (~150 pages)
- **Data:** `src/data/mortgageData.ts`
- **Page:** `src/pages/calculators/mortgage-[slug].astro`
- **URL:** `/calculators/mortgage-200000-at-3-percent/`, etc.
- **Content:** Monthly payment, total interest, amortization summary, related amounts
- **Schema:** FAQPage
- **Ranges:** Amounts 50k-1M (varied steps), Rates 2-8% (step 0.5)

### Tip Calculator (~30 pages)
- **Data:** `src/data/tipData.ts`
- **Page:** `src/pages/calculators/tip-on-[slug].astro`
- **URL:** `/calculators/tip-on-50/`, etc.
- **Content:** Tip amounts at 10/15/18/20/25%, split calculations
- **Schema:** FAQPage

### Meta Tag Templates (~20 pages)
- **Data:** `src/data/metaTagTemplates.ts`
- **Page:** `src/pages/meta-tags/[slug].astro`
- **Index:** `src/pages/meta-tags/index.astro`
- **URL:** `/meta-tags/blog-post/`, `/meta-tags/ecommerce-product/`, etc.
- **Content:** Pre-filled meta tag template, best practices for that page type
- **Schema:** HowTo

### Color Palettes (~50 pages)
- **Data:** `src/data/colorPalettes.ts`
- **Page:** `src/pages/palettes/[slug].astro`
- **Index:** `src/pages/palettes/index.astro`
- **URL:** `/palettes/ocean-blue/`, `/palettes/sunset-orange/`, etc.
- **Content:** Color swatches, hex/RGB/HSL values, usage suggestions, related palettes
- **Schema:** FAQPage

### robots.txt Templates (~15 pages)
- **Data:** `src/data/robotsTxtTemplates.ts`
- **Page:** `src/pages/robots-txt/[slug].astro`
- **Index:** `src/pages/robots-txt/index.astro`
- **URL:** `/robots-txt/wordpress/`, `/robots-txt/nextjs/`, etc.
- **Content:** Ready-to-use robots.txt, explanation of each directive, framework-specific tips
- **Schema:** HowTo

### Convert Landing Pages (~3 pages)
- Added to existing `src/data/formatConversions.ts`
- Uses existing `src/pages/convert/[slug].astro`
- New entries: json-to-csv, markdown-to-pdf, image-to-base64

## SEO Per Page

- Unique `<title>` (under 60 chars) + `<meta description>` (under 160 chars)
- FAQPage or HowTo structured data
- Breadcrumbs (Home → Category/Tool → Page)
- Internal cross-links to main tool + related programmatic pages
- Canonical URLs
- OG image (tool pages only, programmatic pages use default)

## New Dependencies

```
marked          — Markdown parsing
highlight.js    — Syntax highlighting in Markdown preview
html2pdf.js     — HTML to PDF conversion
papaparse       — CSV parsing/generation
cronstrue       — Cron expression to human-readable text
```

All lazy-loaded via dynamic `import()`.

## Updated relatedTools Cross-Links

New tools link to existing tools and vice versa. Key connections:
- markdown-editor ↔ markdown-to-pdf, json-formatter, diff-checker
- json-to-csv ↔ json-formatter, base64-encode-decode
- image-to-base64 ↔ image-compressor, base64-encode-decode, favicon-generator
- meta-tag-generator ↔ robots-txt-generator, json-formatter
- robots-txt-generator ↔ meta-tag-generator
- cron-expression-generator ↔ timestamp-converter, regex-tester
- color-palette-generator ↔ color-picker, css-gradient-generator
- mortgage-calculator ↔ percentage-calculator, tip-calculator
- bmi-calculator ↔ unit-converter, percentage-calculator
- tip-calculator ↔ percentage-calculator, mortgage-calculator

## Build Target

- ~3,585 pages total
- Build time: ~7-8 seconds
- 0 TypeScript errors
- All tools client-side only
