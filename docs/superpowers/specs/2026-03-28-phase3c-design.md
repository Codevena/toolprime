# Phase 3c — Programmatic Page Expansion Design Spec

**Date:** 2026-03-28
**Goal:** Expand from ~1395 pages to 2000+ pages
**Strategy:** 70% expand existing types, 30% new "Convert X to Y" page type

---

## Part 1: Expand Existing Page Types

### 1.1 Percentages (+350 pages)

**New percentage values (14 additional):** 11, 13, 14, 16, 17, 18, 19, 22, 35, 45, 55, 65, 85, 95
Total: 38 percentages (was 24)

**New base values (13 additional):** 35, 45, 55, 65, 70, 90, 125, 175, 225, 350, 450, 700, 7500
Total: 40 bases (was 27)

**Forward pages:** Add new percentage × existing bases (14 × 27 = 378) + existing percentages × new bases (24 × 13 = 312). Minus overlap with reverse, targeting ~350 net new forward pages.

**Reverse pages:** Proportional increase from new combinations.

**Target: ~350 new percentage pages total (forward + reverse)**

Files modified: `src/data/percentages.ts`

### 1.2 Hashes (+250 pages)

**New algorithm:** SHA-512 for existing 50 words = +50 pages

**50 new words** across all 4 algorithms = +200 pages:
email, domain, api, token, session, cookie, nginx, apache, mysql, postgres, redis, mongodb, aws, azure, firebase, angular, vue, svelte, tailwind, bootstrap, webpack, vite, npm, yarn, pnpm, typescript, golang, rust, swift, kotlin, flutter, django, flask, express, fastapi, graphql, rest, oauth, jwt, ssl, https, http, tcp, dns, ssh, git, json, xml, yaml, csv

Files modified: `src/data/hashes.ts`

### 1.3 Unit Conversions (+50 pages)

**New category: Cooking (~15 pairs)**
- cups ↔ ml, tbsp ↔ ml, tsp ↔ ml, oz ↔ g (kitchen), lb ↔ kg (kitchen)
- cups ↔ liters, cups ↔ fl oz, tbsp ↔ tsp, tbsp ↔ fl oz
- g ↔ oz (kitchen), ml ↔ fl oz, liters ↔ quarts, liters ↔ gallons

**Additional pairs in existing categories (~35 pairs):**
- Length: nautical miles ↔ km, nautical miles ↔ miles, light-years ↔ km
- Weight: stones ↔ kg, stones ↔ lb, troy oz ↔ g
- Volume: pints ↔ liters, bushels ↔ liters
- Area: hectares ↔ acres (if not present), sq yards ↔ sq meters
- Speed: mach ↔ km/h, mach ↔ mph
- Digital: PB ↔ TB, PB ↔ GB
- Plus fill in missing reverse pairs and additional useful combinations

Files modified: `src/data/conversions.ts`

### 1.4 Regex Patterns (+15 pages)

New patterns:
1. iban-number
2. us-ssn
3. date-mm-dd-yyyy
4. iso-8601-datetime
5. semantic-version
6. jwt-token
7. base64-string
8. css-color-value
9. json-string-literal
10. html-entity
11. cron-expression
12. docker-image-tag
13. s3-bucket-name
14. aws-arn
15. env-variable-name

Each with: pattern, description, explanation, test examples, code snippets (JS, Python, PHP)

Files modified: `src/data/regexPatterns.ts`

### 1.5 Gradients (+20 pages)

**2 new categories:**
- neon (6 presets): electric blue, hot pink, cyber green, neon orange, laser purple, acid yellow
- earth (6 presets): forest, desert, ocean, mountain, sunset, volcanic

**8 additional presets** across existing categories (warm, cool, dark, pastel, vibrant): +1-2 each

Files modified: `src/data/gradients.ts`

---

## Part 2: New Page Type — "Convert X to Y"

### Route

`/convert/[slug]` (e.g., `/convert/json-to-csv`)

### Data Structure

```typescript
interface FormatConversion {
  slug: string              // "json-to-csv"
  from: string              // "JSON"
  to: string                // "CSV"
  title: string             // "Convert JSON to CSV"
  description: string       // SEO meta description
  intro: string             // 2-3 sentences explaining the conversion
  steps: string[]           // 3-5 steps using the linked tool
  toolId: string            // links to existing tool
  useCases: string[]        // 3-4 practical use cases
  faqs: Array<{question: string; answer: string}>
  relatedConversions: string[]  // slugs of related conversions
}
```

### Conversion Pages (~65 pages)

| Tool | Count | Examples |
|------|-------|---------|
| JSON Formatter | 8 | json-to-csv, json-to-xml, json-to-yaml, csv-to-json, xml-to-json, json-to-text, json-to-html-table, minify-json |
| Base64 | 6 | text-to-base64, base64-to-text, image-to-base64, base64-to-image, file-to-base64, base64-to-hex |
| URL Encode/Decode | 4 | text-to-url-encoded, url-encoded-to-text, encode-url-params, decode-query-string |
| Hash Generator | 6 | text-to-md5, text-to-sha256, text-to-sha512, text-to-sha1, md5-checksum, sha256-checksum |
| Case Converter | 6 | text-to-camelcase, text-to-snake-case, text-to-kebab-case, text-to-pascal-case, uppercase-to-lowercase, lowercase-to-uppercase |
| Image Compressor | 6 | compress-png, compress-jpeg, reduce-image-size, optimize-images-for-web, png-to-compressed-png, jpeg-quality-reducer |
| CSS Gradient | 4 | css-gradient-to-tailwind, create-linear-gradient, create-radial-gradient, create-conic-gradient |
| Color Picker | 6 | hex-to-rgb, rgb-to-hex, hex-to-hsl, hsl-to-hex, rgb-to-hsl, hsl-to-rgb |
| QR Code | 4 | url-to-qr-code, text-to-qr-code, wifi-to-qr-code, email-to-qr-code |
| Diff Checker | 3 | compare-two-texts, compare-two-files, find-text-differences |
| SQL Formatter | 3 | format-sql-query, minify-sql, beautify-sql |
| Regex Tester | 3 | test-regex-pattern, validate-regex, regex-to-javascript |
| Word Counter | 2 | count-words-in-text, character-count-online |
| Timestamp | 4 | unix-to-date, date-to-unix, timestamp-to-iso, epoch-to-human-readable |

### Page Template

```
[Breadcrumbs: Home → Convert → {title}]
[H1: {title} — Free Online Tool]
[Intro paragraph]
[CTA Button → Link to tool]
[H2: How to {title}]
  [Numbered steps list]
[H2: Common Use Cases]
  [Bullet list]
[H2: FAQ]
  [FAQPage schema markup]
[Related Conversions grid]
[Related Tools section]
```

### SEO for Convert Pages

- New `getFormatConversionMeta()` function in `src/lib/seo.ts`
- FAQPage structured data
- BreadcrumbList structured data
- HowTo structured data (for the steps)
- Internal linking: each page links to its tool + 3-4 related conversions

### Files Created

| File | Purpose |
|------|---------|
| `src/data/formatConversions.ts` | Conversion data for all ~65 pages |
| `src/pages/convert/[slug].astro` | Dynamic route template |

### Files Modified

| File | Change |
|------|--------|
| `src/lib/seo.ts` | Add `getFormatConversionMeta()` |
| `src/lib/schema.ts` | Add HowTo schema for convert pages |

---

## Summary

| Type | Current | New | Total |
|------|---------|-----|-------|
| Percentage (forward + reverse + index) | 1027 | +350 | ~1377 |
| Hashes | 150 | +250 | 400 |
| Conversions | 139 | +50 | ~189 |
| Regex Patterns | 27 | +15 | 42 |
| Gradients | 30 | +20 | 50 |
| Convert X to Y | 0 | +65 | 65 |
| Tools | 20 | 0 | 20 |
| OG Images | 20 | 0 | 20 |
| Static | 3 | 0 | 3 |
| **Total** | **~1416** | **~750** | **~2166** |

**New dependencies:** None
**Build time impact:** Estimated <20s for ~2166 pages
