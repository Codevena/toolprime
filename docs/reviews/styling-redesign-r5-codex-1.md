# Styling Redesign R5 — Code Review (codex-1)

**Scope:** Genuine bugs, security violations, and accessibility violations within the R5 change set only.
R1–R4 findings are confirmed resolved and not re-reported.

---

## Finding 1 — ACCESSIBILITY BUG (WCAG 1.4.11 Non-text Contrast)

**File:** `/Users/markus/Developer/toolprime/src/styles/global.css`

**Description:**
The dark-mode CSS custom property `--step-badge-start` is set to the same value as light mode (`#4f46e5`).
In dark mode the `<li>` background is `--color-surface-alt` (`#131620`).
The step number badge (`::before`) uses a gradient from `#4f46e5` to `#3730a3` as its background.

Measured contrast of the badge background (`#4f46e5`) against the card background (`#131620`) in dark mode: **2.87:1**.

WCAG 2.1 SC 1.4.11 (Non-text Contrast, Level AA) requires a minimum **3:1** contrast ratio for UI component boundaries and graphical objects. The numbered step badge is the primary indicator that identifies each step; it is not purely decorative. At 2.87:1 it fails this criterion.

**Verification:**
```
contrast(#4f46e5, #131620) = 2.87   (threshold: 3.0)
```

**Fix:**
Override the badge gradient tokens in dark mode to use a lighter/brighter value.
The existing dark-mode `--color-primary` (`#818cf8`) passes at 6.05:1 against `#131620`, but white text on `#818cf8` is only 2.98:1 which itself would fail WCAG 1.4.3 normal text (4.5:1).
A safe alternative is to use `#6366f1` as the dark badge start color:

```
contrast(#6366f1, #131620) = 4.04   (passes 1.4.11)
contrast(white, #6366f1)   = 4.47   (passes 1.4.3 normal text at the 4.5 threshold — borderline)
```

A more conservative choice with stronger text contrast:

```
--step-badge-start: #5b5fc7   contrast vs #131620 = 3.36, white text = 5.38 (both pass)
--step-badge-end:   #4338ca   (deeper shade for gradient direction)
```

In `/Users/markus/Developer/toolprime/src/styles/global.css`, replace inside `@media (prefers-color-scheme: dark)`:

```css
/* current — both fail 1.4.11 in dark mode */
--step-badge-start: #4f46e5;
--step-badge-end: #3730a3;

/* fix */
--step-badge-start: #5b5fc7;
--step-badge-end: #4338ca;
```

---

## No other findings.

The following were inspected and are clean:

- `aria-current="page"` on the active breadcrumb item — correct ARIA usage (Breadcrumbs.astro).
- `htmlFor` / `id` pairing on `calc-x` and `calc-y` inputs in PercentageCalculator.tsx — correct and stable across mode changes.
- `role="status" aria-live="polite"` on the result container — correct; announces live result to screen readers.
- `<aside role="note" aria-label="Privacy notice">` — `role="note"` is a valid ARIA landmark; `aria-label` correctly names it. SVG icon carries `aria-hidden="true"`.
- `<ol class="step-list" role="list">` — `role="list"` is correct; it restores list semantics in browsers (notably Safari/VoiceOver) that suppress list semantics when `list-style: none` is applied.
- `aria-labelledby` references — all IDs are unique within each rendered page. ToolLayout's `tool.content` section uses no IDs, so no collision with page-level `id="how-to-use"` or `id="related-content"`.
- `::before { display: flex }` on `.step-list li` — valid; CSS Flexbox Layout Module permits pseudo-elements as flex containers.
- Light-mode contrast values all pass: success-text (#15803d) on success-bg (#f0fdf4) = 4.79:1; dark-mode success = 7.75:1.
- Build error (ERR_MODULE_NOT_FOUND for prerender chunks) is pre-existing on the committed HEAD and is not introduced by this change set.
