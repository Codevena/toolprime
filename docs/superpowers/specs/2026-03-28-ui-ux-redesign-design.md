# ToolPrime UI/UX Redesign — Design Spec

**Date:** 2026-03-28
**Status:** Approved
**Style:** Modern & Bold

## Summary

Redesign ToolPrime from generic Tailwind defaults to a distinctive "Modern & Bold" design system. Dark/light mode via system preference, Geist font family, gradient-based category identity, and improved layout/navigation for 700+ pages.

## Design Decisions

| Decision | Choice |
|---|---|
| Design direction | Modern & Bold (Linear/Raycast-inspired) |
| Color mode | System preference (`prefers-color-scheme`), both modes fully designed |
| Search | Prominent in hero section |
| Mobile navigation | Hamburger menu + sticky search bar |
| Max width | `max-w-6xl` (1152px), up from 1024px |
| Typography | Geist (UI) + Geist Mono (code) |
| Footer | Multi-column (Tools, Categories, Resources, Legal) |

## 1. Color System

Replace all existing CSS custom properties in `src/styles/global.css`.

### Dark Mode (default for `prefers-color-scheme: dark`)

| Token | Value | Usage |
|---|---|---|
| `--color-surface` | `#0c0e14` | Page background |
| `--color-surface-alt` | `#131620` | Cards, elevated surfaces |
| `--color-primary` | `#818cf8` | Primary actions, links, active states |
| `--color-primary-hover` | `#6366f1` | Darker primary for hover |
| `--color-accent` | `#c084fc` | Secondary accent, gradient endpoint |
| `--color-text` | `#f1f5f9` | Primary text |
| `--color-text-muted` | `#64748b` | Secondary text, descriptions |
| `--color-text-subtle` | `#475569` | Tertiary text, placeholders |
| `--color-border` | `rgba(255,255,255,0.07)` | Card/component borders |
| `--color-border-subtle` | `rgba(255,255,255,0.04)` | Dividers, footer separators |
| `--color-success` | `#34d399` | Success states |
| `--color-error` | `#f87171` | Error states |

### Light Mode (default for `prefers-color-scheme: light`)

| Token | Value | Usage |
|---|---|---|
| `--color-surface` | `#fafafa` | Page background |
| `--color-surface-alt` | `#ffffff` | Cards, elevated surfaces |
| `--color-primary` | `#6366f1` | Primary actions, links |
| `--color-primary-hover` | `#4f46e5` | Darker primary for hover |
| `--color-accent` | `#a855f7` | Secondary accent |
| `--color-text` | `#0f172a` | Primary text |
| `--color-text-muted` | `#64748b` | Secondary text |
| `--color-text-subtle` | `#94a3b8` | Tertiary text |
| `--color-border` | `#e2e8f0` | Card/component borders |
| `--color-border-subtle` | `#f1f5f9` | Dividers |
| `--color-success` | `#16a34a` | Success states |
| `--color-error` | `#dc2626` | Error states |

## 2. Category Gradient System

Each tool category gets a unique gradient used for tool icons and category labels.

| Category | Gradient | CSS |
|---|---|---|
| Developer | Indigo | `linear-gradient(135deg, #818cf8, #6366f1)` / `linear-gradient(135deg, #6366f1, #4f46e5)` (light) |
| Text | Pink | `linear-gradient(135deg, #f472b6, #ec4899)` |
| Image | Sky | `linear-gradient(135deg, #38bdf8, #0ea5e9)` |
| Math | Emerald | `linear-gradient(135deg, #34d399, #10b981)` |
| Design | Orange | `linear-gradient(135deg, #fb923c, #f97316)` |
| Business | Purple | `linear-gradient(135deg, #c084fc, #a855f7)` |

Implementation: Add a `gradient` field to each category in `src/data/tools.ts`. Tool icons render with their category's gradient as background.

## 3. Typography

### Font Loading

Self-host Geist and Geist Mono via `@fontsource/geist` and `@fontsource/geist-mono` npm packages (avoids Google Fonts external request, better for performance).

Weights to include:
- Geist: 400 (body), 500 (labels), 600 (subheadings), 700 (nav), 800 (headlines)
- Geist Mono: 400 (code blocks), 500 (code emphasis)

### Font Stack

```css
--font-sans: 'Geist', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'Geist Mono', 'SF Mono', 'Cascadia Code', monospace;
```

### Type Scale

| Element | Size | Weight | Letter-spacing |
|---|---|---|---|
| Hero H1 | `text-4xl` (36px) | 800 | `-0.03em` |
| Page H1 (tool) | `text-2xl` (24px) | 800 | `-0.02em` |
| Category label | `text-xs` (12px) | 600 | `0.1em`, uppercase |
| Card title | `text-sm` (14px) | 600 | normal |
| Body text | `text-sm` (14px) | 400 | normal |
| Code | `text-sm` (14px) | 400 (mono) | normal |
| Muted/description | `text-xs` (12px) | 400 | normal |
| Button | `text-sm` (14px) | 500 | normal |

## 4. Layout Changes

### Global

- Max width: `max-w-6xl` (1152px), was `max-w-5xl` (1024px)
- Page padding stays `px-4 py-8` on main

### Header

- Left: Logo mark (24px rounded square with gradient + "T") + "ToolPrime" text with gradient on "Prime"
- Right (desktop): Text nav links "Tools", "Categories"
- Right (mobile): Hamburger icon (3 lines)
- Border bottom: `--color-border-subtle`

### Footer (new multi-column)

4 columns on desktop, 2 on tablet, stacked on mobile:
1. **Popular Tools** — top 4-6 tools by category
2. **Categories** — all 6 categories with dot indicators
3. **Resources** — Converters, Calculators, Cheat Sheets (links to programmatic sections)
4. **Legal** — Impressum, Privacy Policy, About

Below: copyright line, centered.

## 5. Homepage

### Hero Section

- Background: `radial-gradient(ellipse at 50% 0%, rgba(primary, 0.15) 0%, transparent 60%)` — subtle glow
- Badge pill: "20+ Free Tools — No Sign-Up" in primary color with tinted background
- H1: Two lines — "Free Online Tools" in white/dark, "That Just Work" in gradient text (`primary → accent → pink`). Generic headline, not category-specific.
- Subtitle: One line muted text
- Search bar: Full-width (max-w ~400px), rounded-lg, surface-alt background with border. Placeholder "Search tools..."
- Search implementation: Client-side fuzzy search over tool names, descriptions, and category names. Filter homepage cards live.

### Category Sections

- Category label: Uppercase, category-colored, with horizontal rule extending to the right
- Tool cards: 3-column grid (desktop), 2-column (mobile)
- Card structure:
  - Gradient icon (32px rounded square with category gradient + Lucide icon rendered in white)
  - Tool name (font-weight 600)
  - Short description (muted)
  - Hover: `border-color` transitions to primary, subtle shadow lift
- Gap between category sections: `mb-12`

## 6. Tool Page

### Tool Header

- Breadcrumb: Home › Category › Tool Name (category name links to homepage section)
- Icon + title row: 40px gradient icon (category gradient) + H1 + description
- No changes to ToolLayout.astro structure, just styling updates

### Tool Container Card

- Background: `surface-alt` with `border`
- Border radius: `rounded-xl` (12px)
- Tab bar (where applicable): Bottom-border style tabs, active tab gets primary color + 2px bottom border
- Input/output split: Grid 2-column on desktop, stacked on mobile
- Output panel: Subtle tinted background (`rgba(primary, 0.03)` dark / `#f5f3ff` light)
- Action buttons: Right-aligned. Primary button gets gradient background. Secondary buttons get border style.
- Code blocks: Geist Mono with syntax-colored tokens

### Related Tools

- Horizontal chip/pill layout (not cards)
- Each chip shows tool name, links to tool page
- Wraps on mobile

### FAQ Accordion

- Keep existing `<details>/<summary>` approach
- Update styling: remove borders between items, use subtle background on open state

## 7. Mobile Navigation

### Hamburger Menu (Drawer)

- Trigger: Hamburger icon in header (3 lines, staggered width for visual interest)
- Overlay: Dark semi-transparent backdrop (`rgba(0,0,0,0.6)`)
- Drawer: Slides in from right, 280px wide, surface-alt background
- Content:
  1. Close button (top right)
  2. Search bar
  3. Categories list with colored dot indicators + tool counts
  4. Footer links (About, Impressum, Privacy)
- Animation: Slide-in from right, 200ms ease-out

### Sticky Search

- When user scrolls past the hero search bar, a compact search bar appears sticky at the top of the viewport
- Same styling as hero search but smaller padding
- Smooth opacity transition on appear/disappear
- Implementation: Intersection Observer on hero search bar

## 8. Micro-Interactions

- Card hover: `border-color` transition to primary + `translateY(-1px)` + subtle `shadow-lg` with primary tint
- Button hover: `opacity-90` on primary buttons, `background` change on secondary
- Tab switch: No animation needed, instant state change
- FAQ chevron: Existing `rotate-180` animation on open (keep)
- Search: Debounced input, cards filter with CSS opacity transition
- Mobile drawer: CSS transform slide + backdrop fade

## 9. Existing Component Updates

### CopyButton (`src/components/ui/CopyButton.tsx`)

- Update border/background to use CSS variables
- Keep existing 3-state logic (idle/copied/failed)

### All Tool Components (`src/components/tools/*.tsx`)

- Replace hardcoded Tailwind color classes with CSS variable references
- Update input styling: `bg-[--color-surface-alt] border-[--color-border] rounded-lg focus:ring-2 focus:ring-[--color-primary]`
- Update button styling: Primary gets gradient, secondary gets border
- Password strength meter: Replace raw `bg-red-500` etc. with CSS variable system

### Breadcrumbs (`src/components/Breadcrumbs.astro`)

- Update text colors to use variables
- Active (last) breadcrumb in primary color

## 10. New Components

### SearchBar (`src/components/SearchBar.tsx`)

- React component with `useState` for query
- Filters `tools` array by name/description/category
- Dispatches custom event or uses callback to filter homepage
- Debounced input (200ms)

### MobileNav (`src/components/MobileNav.tsx`)

- React component: hamburger trigger + drawer overlay
- State: `isOpen` boolean
- Categories with gradient dots and counts from `tools.ts` data
- Click outside or close button to dismiss
- Body scroll lock when open

### StickySearch (`src/components/StickySearch.tsx`)

- Uses Intersection Observer on hero search element
- Shows compact search bar when hero search is out of viewport
- Fixed position, top: 0, full width, z-index above content

## 11. Performance Considerations

- Geist fonts self-hosted (~40KB for both, woff2): Loaded with `font-display: swap`
- No new JS dependencies — search, mobile nav, sticky search are vanilla React
- Gradient backgrounds are CSS-only, no runtime cost
- Lucide icons already in bundle — just need to render them (currently defined but unused)

## 12. Files to Modify

| File | Changes |
|---|---|
| `src/styles/global.css` | New color tokens, font-face declarations, font stacks |
| `src/layouts/BaseLayout.astro` | New header with logo, max-w-6xl, multi-column footer, font loading |
| `src/layouts/ToolLayout.astro` | Updated card styling, tool header with icon |
| `src/pages/index.astro` | Hero with search, category sections with labels, gradient icons on cards |
| `src/components/tools/*.tsx` (20 files) | CSS variable migration, button/input styling updates |
| `src/components/ui/CopyButton.tsx` | CSS variable migration |
| `src/components/Breadcrumbs.astro` | Color updates |
| `src/data/tools.ts` | Add `gradient` field per category |
| `package.json` | Add `@fontsource/geist`, `@fontsource/geist-mono` |

## 13. New Files

| File | Purpose |
|---|---|
| `src/components/SearchBar.tsx` | Homepage search with live filtering |
| `src/components/MobileNav.tsx` | Hamburger drawer navigation |
| `src/components/StickySearch.tsx` | Sticky search bar on scroll |

## 14. Out of Scope

- Dark/light mode toggle button (using system preference only, no manual toggle)
- Logo redesign beyond the gradient "T" mark
- Animation library (no Framer Motion, CSS transitions only)
- Component library (no shadcn/ui, staying with custom components)

## Mockups

Visual mockups are available in `.superpowers/brainstorm/86351-1774690036/content/`:
- `design-directions.html` — Initial 4 direction options
- `design-b-vs-c-detailed.html` — B vs C detailed comparison
- `fonts-inter-vs-geist.html` — Font comparison
- `full-design-presentation.html` — Final approved design with all views
