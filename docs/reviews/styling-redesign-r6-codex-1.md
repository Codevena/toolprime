# Styling Redesign R6 — Code Review (codex-1)

**Date:** 2026-03-28
**Scope:** 24 uncommitted files — ToolLayout.astro, global.css, Breadcrumbs.astro, PercentageCalculator.tsx, 20 tool pages.
**Focus:** Genuine bugs, security violations, and accessibility violations only. R1–R5 findings are confirmed resolved and are not re-reported.

---

## R5 Finding Resolution

### R5 Codex-1 Finding 1 (WCAG 1.4.11): Dark-mode step badge contrast below 3:1

**FIXED.** `global.css` lines 86-87 now set:

```css
--step-badge-start: #5b5fc7;
--step-badge-end:   #4338ca;
```

Contrast of `#5b5fc7` against `--color-surface-alt` (`#131620`) = 3.36:1 — passes WCAG 1.4.11 (3:1 threshold).
White text on `#5b5fc7` = 5.38:1 — passes WCAG 1.4.3 normal text (4.5:1 threshold).

---

## Full Verification Pass

| Check | Result |
|-------|--------|
| Dark-mode badge start (`#5b5fc7`) contrast vs `#131620` | 3.36:1 — PASS (1.4.11) |
| White text on `#5b5fc7` | 5.38:1 — PASS (1.4.3) |
| Light-mode badge start (`#4f46e5`) contrast vs white | 6.29:1 — PASS |
| `role="list"` on all 20 `<ol class="step-list">` | 20/20 — PASS |
| `role="status" aria-live="polite"` on PercentageCalculator result | Present — PASS |
| `aria-current="page"` on active breadcrumb | Present — PASS |
| SVG lock icon in privacy aside carries `aria-hidden="true"` | Present — PASS |
| `<aside role="note" aria-label="Privacy notice">` | Valid — PASS |
| Privacy content absent from all 20 tool pages | Confirmed — PASS |
| `prefers-reduced-motion: reduce` media query | Present and correct — PASS |
| TypeScript (`tsc --noEmit`) | Zero errors — PASS |

---

No findings.
