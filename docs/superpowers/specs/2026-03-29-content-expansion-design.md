# Priority 4 — Content Expansion: Blog + Cooking + Hashes

## Overview

Three independent expansions to boost organic traffic:
1. Blog section (10 handwritten + ~50 programmatic articles)
2. Cooking conversions (7 → 35 pairs)
3. Hash words (100 → 250 words)

Target: ~726 new pages → from 3,813 to ~4,539 total.

## 1. Blog Section

### Architecture

**Content Collections (Astro-native):**
- `src/content/config.ts` — Blog collection schema (title, description, date, category, tags, relatedTools, readingTime)
- `src/content/blog/*.md` — 10 handwritten Markdown articles with frontmatter
- `src/layouts/BlogLayout.astro` — Article layout with reading time, table of contents, related tools sidebar
- `src/pages/blog/index.astro` — Blog index listing all articles (handwritten + programmatic), sorted by date
- `src/pages/blog/[slug].astro` — Dynamic page for Content Collection articles
- `src/pages/blog/tag/[tag].astro` — Tag index pages

**Programmatic "How To" Articles:**
- `src/data/blogTemplates.ts` — Templates and data for auto-generated articles
- `src/pages/blog/how-to-[slug].astro` — ~50 auto-generated articles from tools + conversions
- Each article: 300-500 words unique content, step-by-step instructions, related tools, FAQ

### 10 Handwritten Articles

**5 Pillar Articles (1500+ words):**

| # | Slug | Title | Category |
|---|------|-------|----------|
| 1 | best-free-online-developer-tools-2026 | Best Free Online Developer Tools in 2026 | roundup |
| 2 | json-formatting-guide | JSON Formatting Guide: Validate, Beautify & Debug | tutorial |
| 3 | complete-guide-to-regular-expressions | Complete Guide to Regular Expressions | tutorial |
| 4 | how-to-optimize-images-for-the-web | How to Optimize Images for the Web | tutorial |
| 5 | understanding-color-theory-for-web-design | Understanding Color Theory for Web Design | tutorial |

**5 Supporting Posts (800+ words):**

| # | Slug | Title | Category |
|---|------|-------|----------|
| 6 | base64-encoding-explained | Base64 Encoding Explained: When and Why to Use It | explainer |
| 7 | cron-jobs-explained | Cron Jobs Explained: Syntax, Examples & Best Practices | tutorial |
| 8 | meta-tags-that-matter-for-seo-2026 | Meta Tags That Actually Matter for SEO in 2026 | tutorial |
| 9 | how-to-create-a-strong-password | How to Create a Strong Password (And Remember It) | tips |
| 10 | unit-conversion-cheat-sheet | Unit Conversion Cheat Sheet for Developers | reference |

### Programmatic Articles (~50)

- "How to Use [Tool Name]" for all 31 tools
- "How to Convert [X] to [Y]" for ~20 key conversions (json-to-csv, image-to-base64, markdown-to-pdf, etc.)

### SEO Per Blog Article

- schema.org/Article structured data
- Breadcrumbs (Home → Blog → Article)
- Unique title (under 60 chars) + meta description (under 160 chars)
- OG tags (og:type = article, og:article:published_time)
- Internal links to tools and programmatic pages
- Tag pages for keyword clustering

### Blog Layout Features

- Reading time estimate
- Auto-generated table of contents from headings
- "Related Tools" sidebar linking to tool pages
- "Related Articles" section at bottom
- Author: "ToolPrime Team"
- Responsive design following existing Design C patterns

## 2. Cooking Conversions Expansion

### Current: 7 pairs
### Target: 35 pairs (+28 new)

New conversion pairs to add to `src/data/conversions.ts` under "Cooking & Kitchen" category:

**Volume:**
- cups ↔ milliliters (236.588)
- cups ↔ tablespoons (16)
- cups ↔ fluid ounces (8)
- tablespoons ↔ teaspoons (3)
- tablespoons ↔ milliliters (14.787)
- teaspoons ↔ milliliters (4.929)
- pints ↔ cups (2)
- pints ↔ milliliters (473.176)
- quarts ↔ liters (0.946353)
- quarts ↔ cups (4)
- gallons ↔ liters (3.78541)
- fluid ounces ↔ milliliters (29.5735)

**Weight (cooking-specific):**
- cups flour ↔ grams (120)
- cups sugar ↔ grams (200)
- cups butter ↔ grams (227)
- cups rice ↔ grams (185)
- sticks butter ↔ grams (113)
- sticks butter ↔ tablespoons (8)
- ounces ↔ grams (28.3495) — cooking context

**Temperature (already exists but verify):**
- Fahrenheit ↔ Celsius (cooking-specific variants like gas marks)

Each pair generates 1 programmatic conversion page (2-way) = ~56 new pages total (28 × 2 directions).

## 3. Hash Words Expansion

### Current: 100 words × 4 algorithms = 400 pages
### Target: 250 words × 4 algorithms = 1,000 pages (+600 new)

New word categories (150 new words):

**Tech Terms (~40):**
api, docker, kubernetes, nginx, webpack, typescript, react, python, linux, ubuntu, github, npm, node, express, django, flask, spring, redis, postgres, mongodb, graphql, terraform, ansible, jenkins, ci, cd, devops, microservice, serverless, lambda, cloud, aws, azure, gcp, rust, golang, swift, kotlin, flutter, svelte

**Common Names (~30):**
john, maria, david, sarah, michael, emma, james, anna, robert, lisa, william, laura, thomas, jennifer, daniel, jessica, andrew, sophia, matthew, olivia, chris, alex, max, julia, mark, peter, paul, george, sam, kate

**Common Passwords / Security Test Words (~30):**
password, password123, admin, root, qwerty, letmein, welcome, monkey, dragon, master, login, abc123, trustno1, iloveyou, sunshine, princess, football, charlie, shadow, access, hello123, test123, guest, default, pass123, secret123, changeme, temp, user, backup

**Everyday Words (~50):**
hello, world, test, example, secret, welcome, goodbye, please, thanks, love, peace, happy, freedom, music, coffee, pizza, ocean, mountain, sunset, summer, winter, spring, garden, forest, river, bridge, castle, dragon, knight, magic, silver, golden, crystal, diamond, thunder, lightning, storm, rainbow, phoenix, falcon, eagle, tiger, wolf, bear, lion, panther, cobra, viper, hawk, raven

Add to `src/data/hashes.ts` words array.

## New Files Summary

### Blog
- `src/content/config.ts` — Collection schema
- `src/content/blog/*.md` — 10 articles
- `src/layouts/BlogLayout.astro`
- `src/pages/blog/index.astro`
- `src/pages/blog/[slug].astro`
- `src/pages/blog/tag/[tag].astro`
- `src/pages/blog/how-to-[slug].astro`
- `src/data/blogTemplates.ts`
- `src/lib/seo.ts` — add getBlogMeta, getBlogIndexMeta, getBlogTagMeta

### Cooking Conversions
- Modify `src/data/conversions.ts` — add 28 new pairs

### Hash Words
- Modify `src/data/hashes.ts` — add 150 new words

## Build Target

- ~4,539 pages total
- Build time: ~10-12 seconds estimated
- 0 TypeScript errors
