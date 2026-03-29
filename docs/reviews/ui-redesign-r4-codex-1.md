# UI Redesign Round 4 Review — Codex-1

Branch: `feat/ui-ux-redesign`
Base: `main`
Scope: `git diff main...HEAD`

---

## Previously Fixed (Confirmed Resolved)

- `--color-text-muted` dark mode contrast: now `#94a3b8` on `#0c0e14` = 7.52:1. Pass.
- `--color-primary` as text: `--color-primary-text` token introduced (`#4f46e5` light / `#818cf8` dark). Both pass AA. Pass.

---

## Findings

### IMPORTANT — Breadcrumb Intermediate Links: Contrast Fails WCAG AA

**File:** `src/components/seo/Breadcrumbs.astro`, line 19 and 25

The `<nav>` element sets `text-[var(--color-text-subtle)]` as the base color, which all `<a>` elements within inherit. Intermediate links (e.g. "Home") render in `--color-text-subtle` (`#94a3b8` light mode) on `--color-surface` (`#fafafa`).

Measured contrast: **2.46:1** (light mode) — WCAG 2.1 SC 1.4.3 requires **4.5:1** for normal-weight text at 14px/sm.

The final breadcrumb item correctly overrides to `--color-primary-text` (6.02:1), but anchor links do not inherit that override.

**Fix:** Change the nav base color from `--color-text-subtle` to `--color-text-muted` (`#64748b` on `#fafafa` = 4.56:1, passes). The subtle token is appropriate only for decorative or non-text uses.

```diff
- <nav aria-label="Breadcrumb" class="text-sm text-[var(--color-text-subtle)] mb-4">
+ <nav aria-label="Breadcrumb" class="text-sm text-[var(--color-text-muted)] mb-4">
```

---

### IMPORTANT — Category Section Labels (h2): All Six Colors Fail AA

**File:** `src/pages/index.astro`, line 49; `src/data/tools.ts`, `categoryColors` map

The homepage category section headings are rendered as `text-xs` (`12px`) with `font-semibold` using `categoryColors[category]` as an inline color style on `--color-surface` (`#fafafa`). Bold text at 12px does not qualify as "large text" under WCAG (large text requires 18px normal or 14px bold, i.e. ~18.67px; 12px bold falls below that). The 4.5:1 AA threshold therefore applies.

All six category colors fail:

| Category | Color | Contrast on #fafafa | Result |
|----------|-------|---------------------|--------|
| developer | `#818cf8` | 2.86:1 | Fail |
| text | `#f472b6` | 2.54:1 | Fail |
| image | `#38bdf8` | 2.05:1 | Fail |
| math | `#34d399` | 1.84:1 | Fail |
| design | `#fb923c` | 2.17:1 | Fail |
| business | `#c084fc` | 2.53:1 | Fail |

**Fix:** Replace the inline `color:` style on the category `<h2>` with `--color-text-muted` for the label text. The color dot / gradient line beside it can retain the category color (non-text elements used as decoration are exempt). This preserves the visual category identity through the colored line accent while keeping label text accessible.

---

### IMPORTANT — MobileNav Tool Count Badge: Contrast Fails AA

**File:** `src/components/MobileNav.tsx`, line 135

```tsx
<span className="text-xs text-[var(--color-text-subtle)]">{count}</span>
```

This renders a numeric count (informational text) in `--color-text-subtle` inside the drawer whose background is `--color-surface-alt` (`#ffffff` light / `#131620` dark).

- Light: `#94a3b8` on `#ffffff` = **2.56:1** — Fails AA (requires 4.5:1 at 12px)
- Dark: `#6b7280` on `#131620` = **3.73:1** — Fails AA

The count is informational (it communicates how many tools exist per category) and is not covered by the inactive UI component or decorative exemptions.

**Fix:** Use `--color-text-muted` for the count badge, or render it as a small pill with sufficient background contrast (e.g. surface border background).

---

## Summary

| # | Severity | Location | Issue |
|---|----------|----------|-------|
| 1 | Important | `Breadcrumbs.astro:19,25` | Breadcrumb link text at 2.46:1 — WCAG SC 1.4.3 fail |
| 2 | Important | `index.astro:49`, `tools.ts:categoryColors` | All 6 category h2 labels below 4.5:1 at 12px |
| 3 | Important | `MobileNav.tsx:135` | Tool count badge text at 2.56:1 light / 3.73:1 dark |

Three Important findings. Not approved.
