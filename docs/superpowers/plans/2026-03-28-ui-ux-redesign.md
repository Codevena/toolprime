# UI/UX Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform ToolPrime from generic Tailwind defaults to a distinctive "Modern & Bold" design system with Geist fonts, gradient category identity, and improved navigation.

**Architecture:** CSS-variable-driven theming in `global.css`, self-hosted Geist fonts via @fontsource, new React island components for search and mobile nav. All existing tool components get CSS variable migration. No new dependencies beyond fonts.

**Tech Stack:** Astro 6, React 19, Tailwind CSS 4, Geist + Geist Mono fonts, Lucide React icons

**Design Spec:** `docs/superpowers/specs/2026-03-28-ui-ux-redesign-design.md`

**Verification:** This is a static site with no test framework. Verification = `pnpm build` succeeds with 0 errors + visual check via `pnpm preview`.

---

## File Map

### New Files
| File | Purpose |
|---|---|
| `src/components/MobileNav.tsx` | Hamburger drawer navigation |
| `src/components/StickySearch.tsx` | Sticky search on scroll |
| `src/components/ui/GradientIcon.tsx` | Reusable gradient icon box for tool cards/headers |

### Modified Files
| File | Changes |
|---|---|
| `package.json` | Add `@fontsource-variable/geist`, `@fontsource-variable/geist-mono` |
| `src/styles/global.css` | Complete rewrite: new color tokens, font-face imports, font stacks, new variables |
| `src/data/tools.ts` | Add `categoryGradients` map and `categoryColors` map |
| `src/layouts/BaseLayout.astro` | New header with logo mark, max-w-6xl, multi-column footer, MobileNav island |
| `src/layouts/ToolLayout.astro` | Tool header with gradient icon, updated card styling |
| `src/pages/index.astro` | Hero with search, category labels with lines, gradient icons on cards |
| `src/components/seo/Breadcrumbs.astro` | Color updates, active breadcrumb in primary |
| `src/components/seo/RelatedTools.astro` | Chip/pill layout instead of cards |
| `src/components/seo/FaqSection.astro` | Updated styling, subtle background on open |
| `src/components/ui/CopyButton.tsx` | Button styling to match new design |
| `src/components/tools/*.tsx` (20 files) | CSS variable migration, button/input styling |

---

## Task 1: Install Fonts & Update Global CSS

**Files:**
- Modify: `package.json`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Install font packages**

```bash
cd /Users/markus/Developer/toolprime && pnpm add @fontsource-variable/geist @fontsource-variable/geist-mono
```

- [ ] **Step 2: Rewrite `src/styles/global.css`**

Replace the entire file with:

```css
@import 'tailwindcss';
@import '@fontsource-variable/geist';
@import '@fontsource-variable/geist-mono';

:root {
  /* Typography */
  --font-sans: 'Geist Variable', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'Geist Mono Variable', 'SF Mono', 'Cascadia Code', monospace;

  /* Light mode (default) */
  --color-surface: #fafafa;
  --color-surface-alt: #ffffff;
  --color-primary: #6366f1;
  --color-primary-hover: #4f46e5;
  --color-accent: #a855f7;
  --color-text: #0f172a;
  --color-text-muted: #64748b;
  --color-text-subtle: #94a3b8;
  --color-border: #e2e8f0;
  --color-border-subtle: #f1f5f9;
  --color-success: #16a34a;
  --color-success-bg: #f0fdf4;
  --color-success-text: #15803d;
  --color-error: #dc2626;
  --color-error-bg: #fef2f2;
  --color-error-border: #fca5a5;
  --color-error-text: #b91c1c;
  --color-warning-bg: #fefce8;
  --color-warning-border: #fde047;
  --color-warning-text: #854d0e;

  /* Hero glow */
  --hero-glow: rgba(99, 102, 241, 0.08);
  --hero-badge-bg: rgba(99, 102, 241, 0.08);
  --hero-badge-border: rgba(99, 102, 241, 0.15);

  /* Card hover */
  --card-shadow-hover: 0 4px 12px rgba(99, 102, 241, 0.08);

  /* Output panel tint */
  --color-output-bg: #f5f3ff;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-surface: #0c0e14;
    --color-surface-alt: #131620;
    --color-primary: #818cf8;
    --color-primary-hover: #6366f1;
    --color-accent: #c084fc;
    --color-text: #f1f5f9;
    --color-text-muted: #64748b;
    --color-text-subtle: #475569;
    --color-border: rgba(255, 255, 255, 0.07);
    --color-border-subtle: rgba(255, 255, 255, 0.04);
    --color-success: #34d399;
    --color-success-bg: #052e16;
    --color-success-text: #34d399;
    --color-error: #f87171;
    --color-error-bg: #450a0a;
    --color-error-border: #7f1d1d;
    --color-error-text: #f87171;
    --color-warning-bg: #422006;
    --color-warning-border: #854d0e;
    --color-warning-text: #fde047;

    --hero-glow: rgba(129, 140, 248, 0.15);
    --hero-badge-bg: rgba(129, 140, 248, 0.1);
    --hero-badge-border: rgba(129, 140, 248, 0.2);

    --card-shadow-hover: 0 4px 12px rgba(129, 140, 248, 0.1);

    --color-output-bg: rgba(129, 140, 248, 0.03);
  }
}

body {
  font-family: var(--font-sans);
  background-color: var(--color-surface);
  color: var(--color-text);
}

code, pre, .font-mono {
  font-family: var(--font-mono);
}
```

- [ ] **Step 3: Verify build**

```bash
cd /Users/markus/Developer/toolprime && pnpm build
```

Expected: Build succeeds. Pages may look different due to new colors but no errors.

- [ ] **Step 4: Commit**

```bash
cd /Users/markus/Developer/toolprime
git add package.json pnpm-lock.yaml src/styles/global.css
git commit -m "feat: install Geist fonts and rewrite color system"
```

---

## Task 2: Add Category Gradients to Tools Data

**Files:**
- Modify: `src/data/tools.ts`

- [ ] **Step 1: Add gradient and color maps**

Add these exports after `categoryLabels` in `src/data/tools.ts`:

```typescript
export const categoryGradients: Record<ToolCategory, string> = {
  developer: 'linear-gradient(135deg, #818cf8, #6366f1)',
  text: 'linear-gradient(135deg, #f472b6, #ec4899)',
  image: 'linear-gradient(135deg, #38bdf8, #0ea5e9)',
  math: 'linear-gradient(135deg, #34d399, #10b981)',
  design: 'linear-gradient(135deg, #fb923c, #f97316)',
  business: 'linear-gradient(135deg, #c084fc, #a855f7)',
}

export const categoryColors: Record<ToolCategory, string> = {
  developer: '#818cf8',
  text: '#f472b6',
  image: '#38bdf8',
  math: '#34d399',
  design: '#fb923c',
  business: '#c084fc',
}
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/markus/Developer/toolprime && pnpm build
```

- [ ] **Step 3: Commit**

```bash
cd /Users/markus/Developer/toolprime
git add src/data/tools.ts
git commit -m "feat: add category gradient and color maps"
```

---

## Task 3: Create GradientIcon Component

**Files:**
- Create: `src/components/ui/GradientIcon.tsx`

- [ ] **Step 1: Create the component**

```tsx
import * as LucideIcons from 'lucide-react'
import { categoryGradients, type ToolCategory } from '@/data/tools'

interface GradientIconProps {
  icon: string
  category: ToolCategory
  size?: number
}

export function GradientIcon({ icon, category, size = 32 }: GradientIconProps) {
  const IconComponent = (LucideIcons as Record<string, React.ComponentType<{ size: number; color: string }>>)[icon]
  const iconSize = Math.round(size * 0.5)

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.25,
        background: categoryGradients[category],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {IconComponent ? (
        <IconComponent size={iconSize} color="white" />
      ) : (
        <span style={{ color: 'white', fontSize: iconSize, fontWeight: 700 }}>?</span>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/markus/Developer/toolprime && pnpm build
```

- [ ] **Step 3: Commit**

```bash
cd /Users/markus/Developer/toolprime
git add src/components/ui/GradientIcon.tsx
git commit -m "feat: add GradientIcon reusable component"
```

---

## Task 4: Redesign BaseLayout — Header

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Update the header section**

Replace the entire `<header>` block in `BaseLayout.astro` with:

```astro
<header class="border-b border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
  <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
    <a href="/" class="flex items-center gap-2">
      <div class="w-7 h-7 rounded-lg flex items-center justify-center text-white font-extrabold text-sm"
           style="background: linear-gradient(135deg, #818cf8, #c084fc);">T</div>
      <span class="text-base font-bold text-[var(--color-text)]">Tool<span class="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Prime</span></span>
    </a>
    <nav class="hidden sm:flex gap-5 text-sm font-medium text-[var(--color-text-muted)]">
      <a href="/#developer" class="hover:text-[var(--color-text)] transition-colors">Tools</a>
      <a href="/#text" class="hover:text-[var(--color-text)] transition-colors">Categories</a>
    </nav>
    <div class="sm:hidden">
      <MobileNav client:load />
    </div>
  </div>
</header>
```

- [ ] **Step 2: Update max-width on `<main>`**

Change `max-w-5xl` to `max-w-6xl` on the `<main>` element.

- [ ] **Step 3: Add MobileNav import**

Add this import at the top of the frontmatter (we'll create MobileNav in Task 7 — for now add the import and it will error, but we'll create the file before building):

```astro
import { MobileNav } from '@/components/MobileNav'
```

Note: Do NOT run `pnpm build` yet — MobileNav doesn't exist. We'll verify after Task 6.

- [ ] **Step 4: Commit (partial — will complete after MobileNav)**

Hold this commit — combine with Task 5 footer.

---

## Task 5: Redesign BaseLayout — Footer

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Replace the footer**

Replace the entire `<footer>` block with:

```astro
<footer class="border-t border-[var(--color-border-subtle)] bg-[var(--color-surface-alt)] text-sm">
  <div class="max-w-6xl mx-auto px-4 py-10">
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
      <div>
        <h3 class="font-semibold text-[var(--color-text)] mb-3">Popular Tools</h3>
        <ul class="space-y-2 text-[var(--color-text-muted)]">
          <li><a href="/json-formatter" class="hover:text-[var(--color-text)] transition-colors">JSON Formatter</a></li>
          <li><a href="/base64-encode-decode" class="hover:text-[var(--color-text)] transition-colors">Base64 Encode</a></li>
          <li><a href="/word-counter" class="hover:text-[var(--color-text)] transition-colors">Word Counter</a></li>
          <li><a href="/hash-generator" class="hover:text-[var(--color-text)] transition-colors">Hash Generator</a></li>
          <li><a href="/password-generator" class="hover:text-[var(--color-text)] transition-colors">Password Generator</a></li>
        </ul>
      </div>
      <div>
        <h3 class="font-semibold text-[var(--color-text)] mb-3">Categories</h3>
        <ul class="space-y-2 text-[var(--color-text-muted)]">
          <li><a href="/#developer" class="hover:text-[var(--color-text)] transition-colors">Developer</a></li>
          <li><a href="/#text" class="hover:text-[var(--color-text)] transition-colors">Text</a></li>
          <li><a href="/#image" class="hover:text-[var(--color-text)] transition-colors">Image</a></li>
          <li><a href="/#math" class="hover:text-[var(--color-text)] transition-colors">Math</a></li>
          <li><a href="/#design" class="hover:text-[var(--color-text)] transition-colors">Design</a></li>
          <li><a href="/#business" class="hover:text-[var(--color-text)] transition-colors">Business</a></li>
        </ul>
      </div>
      <div>
        <h3 class="font-semibold text-[var(--color-text)] mb-3">Resources</h3>
        <ul class="space-y-2 text-[var(--color-text-muted)]">
          <li><a href="/converters/kilometers-to-miles" class="hover:text-[var(--color-text)] transition-colors">Converters</a></li>
          <li><a href="/percentage-calculator" class="hover:text-[var(--color-text)] transition-colors">Calculators</a></li>
          <li><a href="/regex-tester" class="hover:text-[var(--color-text)] transition-colors">Regex Tester</a></li>
        </ul>
      </div>
      <div>
        <h3 class="font-semibold text-[var(--color-text)] mb-3">Legal</h3>
        <ul class="space-y-2 text-[var(--color-text-muted)]">
          <li><a href="/impressum" class="hover:text-[var(--color-text)] transition-colors">Impressum</a></li>
          <li><a href="/datenschutz" class="hover:text-[var(--color-text)] transition-colors">Privacy Policy</a></li>
        </ul>
      </div>
    </div>
    <div class="border-t border-[var(--color-border-subtle)] pt-6 text-center text-[var(--color-text-muted)]">
      <p>© {new Date().getFullYear()} ToolPrime. All tools are free and process data locally in your browser.</p>
    </div>
  </div>
</footer>
```

- [ ] **Step 2: Hold commit — will build and commit after MobileNav (Task 6)**

---

## Task 6: Create MobileNav Component

(Search is handled inline in Task 7 via Astro `<script>` — no React component needed)

**Files:**
- Create: `src/components/MobileNav.tsx`

- [ ] **Step 1: Create the component**

```tsx
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { categoryLabels, categoryColors, tools, type ToolCategory } from '@/data/tools'

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const categories = Object.entries(categoryLabels) as [ToolCategory, string][]

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed top-0 right-0 h-full w-[280px] bg-[var(--color-surface-alt)] border-l border-[var(--color-border)] z-50 overflow-y-auto"
               style={{ animation: 'slideIn 200ms ease-out' }}>
            <div className="p-4">
              {/* Close */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-4">
                <div className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">Categories</div>
                <ul className="space-y-1">
                  {categories.map(([category, label]) => {
                    const count = tools.filter(t => t.category === category).length
                    return (
                      <li key={category}>
                        <a
                          href={`/#${category}`}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors"
                        >
                          <span
                            className="w-2 h-2 rounded-sm flex-shrink-0"
                            style={{ backgroundColor: categoryColors[category] }}
                          />
                          <span className="flex-1 font-medium">{label}</span>
                          <span className="text-xs text-[var(--color-text-subtle)]">{count}</span>
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* Links */}
              <div className="border-t border-[var(--color-border-subtle)] pt-4">
                <ul className="space-y-1">
                  <li><a href="/impressum" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">Impressum</a></li>
                  <li><a href="/datenschutz" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">Privacy</a></li>
                </ul>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes slideIn {
              from { transform: translateX(100%); }
              to { transform: translateX(0); }
            }
          `}</style>
        </>
      )}
    </>
  )
}
```

- [ ] **Step 2: Verify build (validates Tasks 4, 5, and 6)**

```bash
cd /Users/markus/Developer/toolprime && pnpm build
```

Expected: Build succeeds with 0 errors.

- [ ] **Step 3: Commit header + footer + MobileNav together**

```bash
cd /Users/markus/Developer/toolprime
git add src/layouts/BaseLayout.astro src/components/MobileNav.tsx
git commit -m "feat: redesign header with logo, add multi-column footer and mobile nav drawer"
```

---

## Task 7: Redesign Homepage

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Rewrite `index.astro`**

Replace the entire file content:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro'
import { tools, categoryLabels, categoryGradients, categoryColors, type ToolCategory } from '@/data/tools'
import { getHomeMeta } from '@/lib/seo'
import { GradientIcon } from '@/components/ui/GradientIcon'

const meta = getHomeMeta()
const categories = Object.entries(categoryLabels) as [ToolCategory, string][]
---

<BaseLayout {...meta}>
  {/* Hero */}
  <section class="text-center pt-8 pb-12" style={`background: radial-gradient(ellipse at 50% 0%, var(--hero-glow) 0%, transparent 60%);`}>
    <div class="inline-block rounded-full px-4 py-1 text-xs font-medium text-[var(--color-primary)] mb-4"
         style="background: var(--hero-badge-bg); border: 1px solid var(--hero-badge-border);">
      20+ Free Tools — No Sign-Up
    </div>
    <h1 class="text-4xl sm:text-5xl font-extrabold mb-3 tracking-tight" style="letter-spacing: -0.03em;">
      Free Online Tools<br />
      <span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        That Just Work
      </span>
    </h1>
    <p class="text-[var(--color-text-muted)] text-base mb-8 max-w-lg mx-auto">
      Fast, private, runs in your browser. No signup required.
    </p>
    <div id="hero-search" class="max-w-md mx-auto">
      <div class="relative">
        <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-subtle)]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input
          type="text"
          id="tool-search"
          placeholder="Search tools..."
          class="w-full pl-10 pr-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-colors"
        />
      </div>
    </div>
  </section>

  {/* Category Sections */}
  {categories.map(([category, label]) => {
    const categoryTools = tools.filter(t => t.category === category)
    if (categoryTools.length === 0) return null
    return (
      <section id={category} class="mb-12" data-category={category}>
        <div class="flex items-center gap-3 mb-4">
          <h2 class="text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
              style={`color: ${categoryColors[category]};`}>
            {label}
          </h2>
          <div class="flex-1 h-px" style={`background: ${categoryColors[category]}20;`} />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categoryTools.map((tool) => (
            <a
              href={tool.path}
              class="group flex items-start gap-3 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] hover:border-[var(--color-primary)] transition-all"
              data-tool-name={tool.name.toLowerCase()}
              data-tool-desc={tool.description.toLowerCase()}
              style="transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;"
              onmouseover="this.style.boxShadow='var(--card-shadow-hover)'; this.style.transform='translateY(-1px)';"
              onmouseout="this.style.boxShadow='none'; this.style.transform='translateY(0)';"
            >
              <GradientIcon icon={tool.icon} category={tool.category} size={36} client:load />
              <div class="min-w-0">
                <h3 class="text-sm font-semibold text-[var(--color-text)] mb-0.5">{tool.name}</h3>
                <p class="text-xs text-[var(--color-text-muted)] line-clamp-2">{tool.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    )
  })}

  {/* Client-side search filtering */}
  <script>
    const searchInput = document.getElementById('tool-search') as HTMLInputElement
    if (searchInput) {
      let debounceTimer: ReturnType<typeof setTimeout>
      searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => {
          const query = searchInput.value.toLowerCase().trim()
          const cards = document.querySelectorAll<HTMLAnchorElement>('[data-tool-name]')
          const sections = document.querySelectorAll<HTMLElement>('[data-category]')

          cards.forEach(card => {
            const name = card.dataset.toolName ?? ''
            const desc = card.dataset.toolDesc ?? ''
            const match = !query || name.includes(query) || desc.includes(query)
            card.style.display = match ? '' : 'none'
          })

          // Hide empty category sections
          sections.forEach(section => {
            const visibleCards = section.querySelectorAll<HTMLAnchorElement>('[data-tool-name]:not([style*="display: none"])')
            section.style.display = visibleCards.length > 0 ? '' : 'none'
          })
        }, 150)
      })
    }
  </script>
</BaseLayout>
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/markus/Developer/toolprime && pnpm build
```

- [ ] **Step 3: Commit**

```bash
cd /Users/markus/Developer/toolprime
git add src/pages/index.astro
git commit -m "feat: redesign homepage with hero, search, category labels and gradient icons"
```

---

## Task 8: Redesign ToolLayout

**Files:**
- Modify: `src/layouts/ToolLayout.astro`

- [ ] **Step 1: Rewrite `ToolLayout.astro`**

Replace the entire file:

```astro
---
import BaseLayout from './BaseLayout.astro'
import Breadcrumbs from '@/components/seo/Breadcrumbs.astro'
import RelatedTools from '@/components/seo/RelatedTools.astro'
import FaqSection from '@/components/seo/FaqSection.astro'
import SchemaMarkup from '@/components/seo/SchemaMarkup.astro'
import { GradientIcon } from '@/components/ui/GradientIcon'
import { webApplicationSchema } from '@/lib/schema'
import { getToolMeta } from '@/lib/seo'
import { categoryLabels, type Tool } from '@/data/tools'
import { faqs as allFaqs } from '@/data/faqs'

interface Props {
  tool: Tool
}

const { tool } = Astro.props
const meta = getToolMeta(tool)
const toolFaqs = allFaqs[tool.id] ?? []
const categoryLabel = categoryLabels[tool.category]
---

<BaseLayout {...meta}>
  <SchemaMarkup json={webApplicationSchema(tool)} slot="head" />

  <Breadcrumbs items={[
    { name: categoryLabel, url: `https://toolprime.dev/#${tool.category}` },
    { name: tool.name, url: meta.canonical },
  ]} />

  <div class="flex items-center gap-3 mb-6">
    <GradientIcon icon={tool.icon} category={tool.category} size={40} client:load />
    <div>
      <h1 class="text-2xl font-extrabold tracking-tight" style="letter-spacing: -0.02em;">{tool.name}</h1>
      <p class="text-sm text-[var(--color-text-muted)]">{tool.longDescription}</p>
    </div>
  </div>

  <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4 sm:p-6">
    <slot />
  </div>

  <slot name="content" />

  <FaqSection faqs={toolFaqs} />
  <RelatedTools toolId={tool.id} />
</BaseLayout>
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/markus/Developer/toolprime && pnpm build
```

- [ ] **Step 3: Commit**

```bash
cd /Users/markus/Developer/toolprime
git add src/layouts/ToolLayout.astro
git commit -m "feat: redesign tool page layout with gradient icon header"
```

---

## Task 9: Update Breadcrumbs Styling

**Files:**
- Modify: `src/components/seo/Breadcrumbs.astro`

- [ ] **Step 1: Update the breadcrumb nav**

Replace the `<nav>` element (keep the `<SchemaMarkup>` line above it):

```astro
<nav aria-label="Breadcrumb" class="text-sm text-[var(--color-text-subtle)] mb-4">
  <ol class="flex flex-wrap gap-1">
    {allItems.map((item, i) => (
      <li class="flex items-center gap-1">
        {i > 0 && <span aria-hidden="true" class="text-[var(--color-border)]">›</span>}
        {i < allItems.length - 1 ? (
          <a href={item.url} class="hover:text-[var(--color-text)] transition-colors">{item.name}</a>
        ) : (
          <span class="text-[var(--color-primary)] font-medium">{item.name}</span>
        )}
      </li>
    ))}
  </ol>
</nav>
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/markus/Developer/toolprime && pnpm build
```

- [ ] **Step 3: Commit**

```bash
cd /Users/markus/Developer/toolprime
git add src/components/seo/Breadcrumbs.astro
git commit -m "feat: update breadcrumb styling with primary color active state"
```

---

## Task 10: Update RelatedTools to Chip Layout

**Files:**
- Modify: `src/components/seo/RelatedTools.astro`

- [ ] **Step 1: Read current file to understand structure**

Read `src/components/seo/RelatedTools.astro` before editing.

- [ ] **Step 2: Update to chip/pill layout**

Replace the grid of cards with a horizontal flex wrap of chips. The component should render related tools as small pills:

Change the tool rendering from a grid of full cards to:

```astro
<div class="flex flex-wrap gap-2">
  {relatedTools.map((t) => (
    <a
      href={t.path}
      class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-sm text-[var(--color-text)] hover:border-[var(--color-primary)] transition-colors"
    >
      {t.name}
    </a>
  ))}
</div>
```

Keep the existing section wrapper, heading, and data-fetching logic.

- [ ] **Step 3: Verify build**

```bash
cd /Users/markus/Developer/toolprime && pnpm build
```

- [ ] **Step 4: Commit**

```bash
cd /Users/markus/Developer/toolprime
git add src/components/seo/RelatedTools.astro
git commit -m "feat: update related tools to chip/pill layout"
```

---

## Task 11: Update FaqSection Styling

**Files:**
- Modify: `src/components/seo/FaqSection.astro`

- [ ] **Step 1: Read current file**

Read `src/components/seo/FaqSection.astro` before editing.

- [ ] **Step 2: Update styling**

Update the `<details>` elements: remove inter-item borders, add subtle background on open state. Replace the existing styling with:

- Container: `space-y-2` (gap between items)
- Each `<details>`: `rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] group`
- `<summary>`: `cursor-pointer list-none px-4 py-3 text-sm font-medium text-[var(--color-text)] flex items-center justify-between`
- Chevron: keep existing rotation animation
- Answer `<div>`: `px-4 pb-3 text-sm text-[var(--color-text-muted)] leading-relaxed`

- [ ] **Step 3: Verify build**

```bash
cd /Users/markus/Developer/toolprime && pnpm build
```

- [ ] **Step 4: Commit**

```bash
cd /Users/markus/Developer/toolprime
git add src/components/seo/FaqSection.astro
git commit -m "feat: update FAQ accordion styling"
```

---

## Task 12: Update CopyButton Styling

**Files:**
- Modify: `src/components/ui/CopyButton.tsx`

- [ ] **Step 1: Update button classes**

In `CopyButton.tsx`, update the `<button>` className to:

```tsx
className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors ${className}`}
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/markus/Developer/toolprime && pnpm build
```

- [ ] **Step 3: Commit**

```bash
cd /Users/markus/Developer/toolprime
git add src/components/ui/CopyButton.tsx
git commit -m "feat: update CopyButton styling to match new design"
```

---

## Task 13: Update Tool Components Styling

**Files:**
- Modify: `src/components/tools/JsonFormatter.tsx`
- Modify: `src/components/tools/Base64EncodeDecode.tsx`
- Modify: `src/components/tools/UrlEncodeDecode.tsx`
- Modify: `src/components/tools/TimestampConverter.tsx`
- Modify: `src/components/tools/HashGenerator.tsx`
- Modify: `src/components/tools/RegexTester.tsx`
- Modify: `src/components/tools/SqlFormatter.tsx`
- Modify: `src/components/tools/DiffChecker.tsx`

The styling migration is the same for all tool components. Apply these replacements across all files:

- [ ] **Step 1: Update active tab/button styling**

In every tool component, find the active button pattern:
```
'bg-[var(--color-primary)] text-white'
```
Replace with:
```
'text-white font-medium' and add style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-hover))' }}
```

OR simpler: keep `bg-[var(--color-primary)] text-white` and add `font-medium` — the new `--color-primary` values (#6366f1 light / #818cf8 dark) already look correct. The gradient is optional polish.

Decision: Keep the existing `bg-[var(--color-primary)] text-white` pattern for now — the new color tokens make it look good already. Only add `font-medium` to primary buttons.

- [ ] **Step 2: Update inactive button styling**

Find: `'bg-[var(--color-surface-alt)] border border-[var(--color-border)] hover:bg-[var(--color-border)]'`

This pattern is correct and works with the new tokens. No change needed.

- [ ] **Step 3: Update textarea/input styling**

The existing pattern is: `border border-[var(--color-border)] bg-[var(--color-surface-alt)] font-mono text-sm`

This works with new tokens. Add `text-[var(--color-text)]` if not present on inputs/textareas.

- [ ] **Step 4: Fix PasswordGenerator strength meter**

In `src/components/tools/PasswordGenerator.tsx`, find any hardcoded `bg-red-500`, `bg-yellow-500`, `bg-blue-500`, `bg-green-500` classes and replace with CSS variable references:

- Weak: `style={{ backgroundColor: 'var(--color-error)' }}`
- Fair: `style={{ backgroundColor: 'var(--color-warning-text)' }}`
- Good: `style={{ backgroundColor: 'var(--color-primary)' }}`
- Strong: `style={{ backgroundColor: 'var(--color-success)' }}`

- [ ] **Step 5: Verify build**

```bash
cd /Users/markus/Developer/toolprime && pnpm build
```

- [ ] **Step 6: Commit**

```bash
cd /Users/markus/Developer/toolprime
git add src/components/tools/
git commit -m "feat: update tool component styling to new design system"
```

---

## Task 14: Create StickySearch Component

**Files:**
- Create: `src/components/StickySearch.tsx`
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Create the component**

```tsx
import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'

export function StickySearch() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const heroSearch = document.getElementById('hero-search')
    if (!heroSearch) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting)
      },
      { threshold: 0 }
    )

    observer.observe(heroSearch)
    return () => observer.disconnect()
  }, [])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchInput = document.getElementById('tool-search') as HTMLInputElement
    if (searchInput) {
      searchInput.value = e.target.value
      searchInput.dispatchEvent(new Event('input', { bubbles: true }))
    }
  }

  if (!visible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-30 border-b border-[var(--color-border-subtle)] bg-[var(--color-surface)]/95 backdrop-blur-sm"
         style={{ animation: 'fadeIn 150ms ease-out' }}>
      <div className="max-w-6xl mx-auto px-4 py-2">
        <div className="relative max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-subtle)]" />
          <input
            type="text"
            onChange={handleInput}
            placeholder="Search tools..."
            className="w-full pl-8 pr-3 py-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-colors"
          />
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-100%); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
```

- [ ] **Step 2: Add StickySearch to BaseLayout**

In `BaseLayout.astro`, add the import:

```astro
import { StickySearch } from '@/components/StickySearch'
```

Add the component right after the opening `<body>` tag:

```astro
<StickySearch client:load />
```

- [ ] **Step 3: Verify build**

```bash
cd /Users/markus/Developer/toolprime && pnpm build
```

- [ ] **Step 4: Commit**

```bash
cd /Users/markus/Developer/toolprime
git add src/components/StickySearch.tsx src/layouts/BaseLayout.astro
git commit -m "feat: add sticky search bar that appears on scroll"
```

---

## Task 15: Visual Verification & Polish

**Files:**
- No new files — fix any visual issues found during review

- [ ] **Step 1: Start dev server and check all pages**

```bash
cd /Users/markus/Developer/toolprime && pnpm dev
```

Open `http://localhost:4321` and verify:

1. Homepage: Hero with gradient text, search bar, category sections with gradient icons
2. Tool page (e.g., `/json-formatter`): Gradient icon in header, updated card styling
3. Mobile: Hamburger menu works, drawer opens/closes, categories visible
4. Dark mode: Toggle system preference, verify both modes look correct
5. Sticky search: Scroll down on homepage, verify sticky bar appears
6. Search: Type in search bar, verify cards filter correctly
7. Footer: 4-column layout on desktop, 2-column on tablet, stacked on mobile

- [ ] **Step 2: Fix any visual issues found**

Common issues to check:
- Text contrast in dark/light mode
- Gradient text visibility in both modes
- Card hover effects working
- Mobile drawer animation
- Search input focus ring color

- [ ] **Step 3: Final build check**

```bash
cd /Users/markus/Developer/toolprime && pnpm build
```

Expected: 62 pages, 0 errors.

- [ ] **Step 4: Commit any fixes**

```bash
cd /Users/markus/Developer/toolprime
git add -A
git commit -m "fix: visual polish and dark/light mode adjustments"
```

---

## Execution Notes

- **Tasks 1-3** are foundation (CSS, data, reusable component) — must run first
- **Tasks 4-5** (header/footer) depend on Task 6 (MobileNav) before they can build
- **Task 6** (MobileNav) must exist before building Tasks 4-5
- **Tasks 7-8** (homepage, tool layout) use GradientIcon from Task 3
- **Tasks 9-12** (SEO components, CopyButton) are independent of each other
- **Task 13** (tool components) is the bulk update — 20 files, mostly mechanical
- **Task 14** (StickySearch) depends on homepage having `#hero-search` from Task 7
- **Task 15** is the final verification pass

Search is implemented inline in `index.astro` (Task 7) via `<script>` tag — no React component needed, avoids unnecessary hydration.

**Total new files:** 3 (MobileNav, StickySearch, GradientIcon)
**Total modified files:** ~30 (layouts, pages, components, data, styles)
**New dependencies:** 2 (`@fontsource-variable/geist`, `@fontsource-variable/geist-mono`)
