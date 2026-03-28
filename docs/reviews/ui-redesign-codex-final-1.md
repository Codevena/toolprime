# UI/UX Redesign — Final Code Review (Round 3)
**Branch:** feat/ui-ux-redesign
**Base:** main
**Date:** 2026-03-28
**Reviewer:** Claude Sonnet 4.6 (Codex-style final review)
**Build status:** PASS (`pnpm build` — 62 pages, zero errors)

---

## Verdict

Two **Important** issues remain. No **Critical** issues found.

---

## Important Finding 1 — `--color-text-muted` fails WCAG AA contrast in dark mode

**File:** `/Users/markus/Developer/toolprime/src/styles/global.css`
**Lines:** 52 (dark mode block)

The dark mode media query overrides many tokens but intentionally keeps `--color-text-muted` at `#64748b` — the same value as light mode. Against the new dark backgrounds this fails WCAG 2.1 AA (4.5:1) for all normal-sized text.

Measured contrast ratios:

| Foreground | Background | Ratio | Required | Result |
|---|---|---|---|---|
| `#64748b` (text-muted) | `#131620` (surface-alt dark) | 3.79:1 | 4.5:1 | FAIL |
| `#64748b` (text-muted) | `#0c0e14` (surface dark) | 4.05:1 | 4.5:1 | FAIL |

Affected elements:
- Tool card descriptions (`text-xs`, `#131620` background) — most visible failure
- Hero subtitle paragraph (`text-base`, page background `#0c0e14`)
- Footer nav links (`text-sm`, `surface-alt`)
- Header nav links (`text-sm`, `surface`)

`#94a3b8` passes comfortably on both dark surfaces (7.52:1 and 7.04:1 respectively) and is already defined as the light-mode `--color-text-subtle` token. The fix is a one-line addition to the existing dark mode block:

```css
/* inside @media (prefers-color-scheme: dark) :root block */
--color-text-muted: #94a3b8;
```

---

## Important Finding 2 — `--color-primary` (#6366f1) used as body text falls below 4.5:1 in light mode

**Files:**
- `/Users/markus/Developer/toolprime/src/components/seo/Breadcrumbs.astro` (line 26 — active breadcrumb item)
- `/Users/markus/Developer/toolprime/src/pages/index.astro` (line 9 — hero badge text)

Measured contrast ratios in light mode:

| Foreground | Background | Ratio | Required | Result |
|---|---|---|---|---|
| `#6366f1` (primary) | `#fafafa` (surface) | 4.28:1 | 4.5:1 | FAIL |
| `#6366f1` (primary) | `#ffffff` (surface-alt) | 4.47:1 | 4.5:1 | FAIL |
| `#6366f1` (primary) | hero-badge-bg composite | 3.87:1 | 4.5:1 | FAIL |

The active breadcrumb item renders as `text-[var(--color-primary)] font-medium` at 14px (normal text, not large text). The hero badge text uses the same token on a near-white tinted background.

`--color-primary-hover` (`#4f46e5`) already exists in the token set and passes: 6.02:1 on `#fafafa` and 6.29:1 on `#ffffff`.

The simplest fix is to introduce a `--color-primary-text` token for use where primary color appears as readable text:

```css
/* in :root */
--color-primary-text: #4f46e5;
```

Then use `--color-primary-text` in `Breadcrumbs.astro` (active item span) and in the hero badge `text-[var(--color-primary)]` class in `index.astro`. The dark mode primary `#818cf8` already passes on dark surfaces so no dark mode override is needed.

---

## Previously Reported Issues — Confirmed Resolved

- Wildcard imports: resolved, explicit named imports in GradientIcon.tsx
- TypeScript errors: build passes cleanly
- Missing search bar: hero search present, sticky search functional
- Inline keyframes: moved to global.css
- A11y labels on icon buttons: all interactive icons carry `aria-label`
- `prefers-reduced-motion`: global override present in global.css
- Search filter fragility: debounced with null-safe dataset access
- `client:load` on GradientIcon in ToolLayout: removed, component renders statically at build time (confirmed in dist output)
- Focus trap in MobileNav: implemented with Escape key, Tab cycling, and return-focus on close
- `--color-text-subtle` contrast: `#94a3b8` in light mode is used only for placeholder text and decorative icons (UI component threshold 3:1), which it meets
- `--color-warning` token: defined in both light and dark modes
- `aria-modal="true"` and `role="dialog"` on MobileNav drawer: present and correct
- Z-index layering (StickySearch z-30, backdrop z-40, drawer z-50): correct, no occlusion issues
- GradientIcon renders in static HTML at build time: confirmed in dist output, no hydration overhead

---

## Additional Observation (Not a Blocker)

The category section heading labels in `index.astro` use inline `style={color: categoryColors[category]}` which maps to colors such as `#818cf8` (developer), `#f472b6` (text), `#38bdf8` (image), `#34d399` (math), `#fb923c` (design), `#c084fc` (business). On the light-mode page background (`#fafafa`) these range from 1.84:1 to 2.86:1 — all below the 4.5:1 threshold for the `text-xs font-semibold uppercase` size.

However, these labels function as section dividers with a purely decorative horizontal rule. Per WCAG 1.4.3, the exception for "incidental" text does not apply here since they are `h2` elements with semantic value. This is flagged for awareness but is being left out of the Important tier in this round given it is a design system color choice that requires deliberate token changes across the category palette rather than a targeted fix. It should be addressed in a follow-up pass.

---

## Summary

| # | Severity | File | Issue |
|---|---|---|---|
| 1 | Important | `src/styles/global.css` | `--color-text-muted` not overridden in dark mode; 3.79:1 on surface-alt, 4.05:1 on surface — both fail WCAG AA 4.5:1 |
| 2 | Important | `src/components/seo/Breadcrumbs.astro`, `src/pages/index.astro` | `--color-primary` (#6366f1) as normal text fails WCAG AA in light mode (4.28:1 and 4.47:1) |
