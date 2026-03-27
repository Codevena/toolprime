# ToolPrime — Next Session

## What happened

**Session 1 (2026-03-27):**
- Brainstormed product ideas extensively — researched 30+ concepts across SaaS, AI tools, consumer apps, marketplaces, gamification
- Decided on **Free Tool Portfolio + SEO** model — proven by Calculator.net ($5-15M/yr), iLovePDF ($20-50M/yr), Photopea ($1M+/yr solo dev)
- Built the entire Phase 1 in one session:
  - Astro 6 + React 19 + Tailwind CSS 4 project scaffolding
  - 10 interactive tools: Word Counter, JSON Formatter, Password Generator, QR Code Generator, Color Picker, Base64 Encode/Decode, Image Compressor, Lorem Ipsum Generator, Unit Converter, Percentage Calculator
  - 40 programmatic SEO converter pages (/converters/kg-to-lbs, etc.)
  - Homepage with categorized tool directory
  - Full SEO: WebApplication + FAQPage + BreadcrumbList schema, meta tags, sitemap
  - Legal pages: Impressum (placeholder), Datenschutz, 404
  - **52 static pages total, zero build errors**
- Passed full 4-agent review process (Codex x2 + Claude x2) with zero findings
- 20 clean commits, pushed to github.com/Codevena/toolprime (private)

## Current state

- **52 pages** building in ~3 seconds
- **0 errors, 0 warnings**
- **NOT deployed yet** — needs Cloudflare Pages setup + domain
- Domain `toolprime.dev` is available (user checked, not yet purchased)

## What to do next

### Immediate (Deploy — get live ASAP)
1. **Buy domain** `toolprime.dev` (Cloudflare Registrar or Namecheap, ~$12/yr)
2. **Connect Cloudflare Pages** — go to dash.cloudflare.com, create project, connect GitHub repo, deploy
3. **Fill in Impressum** — replace placeholder [Name], [Adresse], [Email] with real data (legally required in DE)
4. **Google Search Console** — verify domain, submit sitemap
5. **Apply for AdSense** — submit site for approval (takes 1-2 weeks)
6. **Setup Plausible Analytics** — $9/mo cloud plan, or self-host

### Phase 2: More Tools (Week 2-4)
Build the Priority 2 tool set (10 more tools):
- Regex Tester
- URL Encode/Decode
- Case Converter (UPPER, lower, Title, camelCase)
- Diff Checker (text comparison)
- Timestamp Converter (Unix ↔ human-readable)
- CSS Gradient Generator
- Invoice Generator (PDF)
- Favicon Generator
- SQL Formatter
- Hash Generator (MD5, SHA-256)

Each follows the exact same pattern: `src/components/tools/[Name].tsx` + `src/pages/[slug].astro`

### Phase 3: Programmatic SEO Expansion (Week 3-5)
- **Percentage Calculator pages** — `/calculators/what-is-X-percent-of-Y` (500+ pages)
- **More unit conversions** — expand from 40 to 200+ entries
- **Expand content** — bring each tool page to 500+ words

### Phase 4: Monetization Optimization (Month 2-3)
- Hit **50K monthly sessions** → apply for **Mediavine** (3-5x RPM increase)
- Add **freemium tier** on high-traffic tools (QR Pro, Image Compressor Pro, Invoice Generator Pro)
- Add **email capture** ("Get results by email" on tool output)

### Phase 5: Content Marketing (Ongoing)
- Blog posts targeting "how to" keywords that link to tools
- Submit to tool directories (Product Hunt, AlternativeTo)
- Hacker News "Show HN" post

## Revenue Milestones

| Milestone | Traffic | Revenue | Timeline |
|-----------|---------|---------|----------|
| AdSense live | 1-10K/mo | €5-50/mo | Month 1-3 |
| Mediavine eligible | 50K sessions/mo | €1-3K/mo | Month 6-9 |
| Mediavine scaling | 200K sessions/mo | €4-8K/mo | Month 9-12 |
| Raptive tier | 500K+ sessions/mo | €15-30K/mo | Month 12-18 |

## Tech stack
Astro 6, React 19, TypeScript, Tailwind CSS 4, Lucide React, Cloudflare Pages

## Key files
- **Spec:** `docs/superpowers/specs/2026-03-27-free-tool-portfolio-design.md` (in gamebrainstorming repo)
- **Plan:** `plan.md`
- **Tools:** `src/components/tools/*.tsx`
- **Pages:** `src/pages/*.astro`
- **Data:** `src/data/tools.ts`, `src/data/faqs.ts`, `src/data/conversions.ts`
- **SEO:** `src/lib/seo.ts`, `src/lib/schema.ts`
- **Reviews:** `docs/reviews/` (5 review reports, all passed)

## Quick commands
```bash
pnpm dev      # Dev server at localhost:4321
pnpm build    # Build all 52 pages
pnpm preview  # Preview production build
```
