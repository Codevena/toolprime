# Styling Redesign — Round 3 Code Review (Codex Agent 1)

**Scope:** `src/layouts/ToolLayout.astro`, `src/styles/global.css`, `src/pages/percentage-calculator.astro`, all 20 tool pages under `src/pages/*.astro`

**R1 + R2 fixes verified:** unstyled link, dead `tracking-tight`, privacy banner `role="note" aria-label`, gradient uses CSS variable, aside closing tag — all confirmed resolved.

**Build status:** `pnpm build` completes cleanly with 3076 pages. Zero TypeScript or Astro compilation errors.

---

## Findings

### Finding 1 — Medium | `PercentageCalculator.tsx`: `<label>` elements not programmatically associated with their inputs (WCAG 1.3.1)

**File:** `src/components/tools/PercentageCalculator.tsx`, lines 94 and 104

The two `<label>` elements for the X and Y number inputs have no `htmlFor` attribute, and the corresponding `<input>` elements have no `id` attributes. A screen reader will not announce the label when a user focuses an input. WCAG success criterion 1.3.1 (Info and Relationships, Level A) requires that labels be programmatically determined.

**Fix:** Assign stable `id` values to the inputs and matching `htmlFor` values to the labels. Because the mode can change, a suffix on the mode name is sufficient to keep IDs unique within the component (e.g. `calc-x-${mode}` and `calc-y-${mode}`).

```tsx
// label
<label htmlFor={`calc-x-${mode}`} className="block text-sm font-medium mb-1">{labelX}</label>
// input
<input id={`calc-x-${mode}`} type="number" ... />
```

Apply the same pattern to the Y field.

---

### Finding 2 — Low | `src/components/seo/Breadcrumbs.astro`: current-page breadcrumb item missing `aria-current="page"`

**File:** `src/components/seo/Breadcrumbs.astro`, line 27

The last breadcrumb item (the current page) is rendered as a plain `<span>`. ARIA best practice and WCAG technique G128 specify that the current page in a breadcrumb navigation should carry `aria-current="page"` so that assistive technologies can identify it.

```astro
<span aria-current="page" class="text-[var(--color-primary-text)] font-medium">{item.name}</span>
```

---

### Finding 3 — Low | `src/styles/global.css` line 141: `--step-badge-end` CSS variable is declared only as a fallback, never defined

The `.step-list li::before` gradient uses `var(--step-badge-end, #3730a3)` where `--step-badge-end` is never assigned in `:root` or the dark-mode block. The fallback `#3730a3` (indigo-800) fires unconditionally. In dark mode `--color-primary-hover` resolves to `#6366f1`; the gradient then goes from medium indigo to very dark indigo (`#3730a3`), which significantly reduces the visible gradient depth and can make the step number text hard to distinguish from the badge background at small sizes.

Either define `--step-badge-end` in both `:root` and the dark-mode `@media` block with appropriate values, or replace the variable with an explicit value that is correct for both modes (e.g. use `var(--color-accent)` as the end stop, which already has correct light/dark definitions).

---

## Summary

Three findings total. No critical or high-severity issues. The build is clean, all R1/R2 fixes are confirmed applied, and the 20 tool pages follow a consistent structural and styling pattern throughout.

| # | Severity | File | Issue |
|---|----------|------|-------|
| 1 | Medium | `PercentageCalculator.tsx` | Labels not associated with inputs (WCAG 1.3.1) |
| 2 | Low | `Breadcrumbs.astro` | Missing `aria-current="page"` on current item |
| 3 | Low | `global.css` | `--step-badge-end` never defined; fallback always fires |
