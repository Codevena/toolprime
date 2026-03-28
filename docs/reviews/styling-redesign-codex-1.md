# Review: Design C Styling Redesign — Visual Steps + Grid Cards

Reviewed by: Claude (code review agent)
Date: 2026-03-28
Scope: `src/layouts/ToolLayout.astro`, `src/styles/global.css`, all 20 `src/pages/*.astro` tool pages

---

## Summary

The build passes cleanly (3,076 pages). The overall approach is sound and the consistency across all 20 pages is good. However there are four findings that need to be addressed before this work is considered done.

---

## Finding 1 — CRITICAL: Privacy Banner Text Fails WCAG AA Contrast in Light Mode

**File:** `src/layouts/ToolLayout.astro` line 114

The privacy banner uses a hardcoded inline style:

```
style="background: rgba(52, 211, 153, 0.06); border: 1px solid rgba(52, 211, 153, 0.12); color: #34d399;"
```

The text color `#34d399` on the effective blended background (near-white at approximately `rgb(243, 252, 249)`) produces a contrast ratio of **1.84:1**, far below the WCAG AA requirement of 4.5:1 for normal-size text (14px).

This affects every tool page in light mode. Dark mode is fine at 8.52:1.

The design system already has a correct contrast-adjusted token for this:
- Light mode `--color-success-text: #15803d` (dark green, high contrast on white)
- Dark mode `--color-success-text: #34d399` (bright green, high contrast on dark)

**Fix:** Use CSS custom properties instead of hardcoded values so the color adapts between modes:

```html
<div class="mt-8 flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm"
     style="background: var(--color-success-bg); border: 1px solid var(--color-success); color: var(--color-success-text);">
```

Additionally, the decorative lock SVG inside the banner is missing `aria-hidden="true"`. Since the adjacent text fully describes the message, the SVG is purely decorative and should be hidden from assistive technology:

```html
<svg aria-hidden="true" ...>
```

---

## Finding 2 — HIGH: Step Badge Number Fails WCAG AA Contrast

**File:** `src/styles/global.css` lines 135–148

The `.step-list li::before` pseudo-element renders the step number (e.g. "1", "2") in white (`color: white`) over a diagonal gradient from `#818cf8` to `#6366f1`. The contrast ratios are:

- `#818cf8` end: **2.98:1** (fails AA — requires 4.5:1)
- `#6366f1` end: **4.47:1** (just below the 4.5:1 threshold — fails AA)
- Gradient midpoint: **3.66:1** (fails AA)

The number text is 12px / 0.75rem bold — this is 9pt and does not qualify as "large text" under WCAG (which requires 18pt regular or 14pt bold). WCAG 1.4.3 applies.

Note: screen readers announce the ordered list item number semantically from the `<ol>`, so the visible badge number is effectively redundant for AT users. This reduces the practical impact but does not eliminate the technical WCAG violation.

**Fix option A (preferred):** Use a darker gradient that achieves 4.5:1 with white. For example `#4f46e5` → `#3730a3` achieves sufficient contrast.

**Fix option B:** Increase the badge font size to 14px bold (≥14pt bold = large text, requiring only 3:1), which the midpoint at 3.66:1 passes.

---

## Finding 3 — MEDIUM: `align-items: center` Causes Badge Misalignment on Multi-Line Step Items

**File:** `src/styles/global.css` line 126

```css
.step-list li {
  align-items: center;
  ...
}
```

The gradient number badge vertically centers against the full height of the list item. For step items that wrap to two or more lines, the badge floats to the middle of the text block rather than aligning with the first line. This is visually awkward and inconsistent with standard step/instruction UI patterns.

The longest step items (word-counter, json-formatter) already contain enough markup to wrap on typical mobile viewports (320–375px).

**Fix:** Change to `align-items: flex-start` so the badge aligns with the top of the text:

```css
.step-list li {
  align-items: flex-start;
  ...
}
```

---

## Finding 4 — MEDIUM: Redundant `mt-8` on H2 Heading Elements Inside `<section class="mt-8">`

**Files:**
- `src/pages/hash-generator.astro` line 24
- `src/pages/percentage-calculator.astro` line 22
- `src/pages/regex-tester.astro` line 25

These three pages place a second `<h2>` inside the same `<section slot="content" class="mt-8">` block and apply `mt-8` directly to the heading:

```html
<h2 class="text-xl font-bold text-[var(--color-text)] mb-3 mt-8">Popular Hash Lookups</h2>
```

The `mt-8` on the heading is appropriate spacing here, but the pattern is inconsistent with the layout approach used everywhere else (which separates content into distinct `<section>` elements). Having two `<h2>` headings under a single unlabeled `<section>` also reduces document outline clarity.

This is lower priority than the contrast issues but is a maintainability and structural consistency concern.

**Fix:** Move the second heading into its own `<section slot="content" class="mt-8">` block, consistent with how `css-gradient-generator.astro` and `regex-tester.astro` handle their second content sections. Remove the redundant `mt-8` from the `<h2>`.

---

## Non-Issues (Confirmed Acceptable)

- **Build:** Clean, 3,076 pages, no errors or warnings.
- **`<ol>` element with `list-style: none`:** Unlike `<ul>`, the `<ol>` element retains its ordered list semantics in VoiceOver/Safari even with `list-style: none`. No `role="list"` is needed.
- **`display: flex` on `::before` pseudo-element:** Valid and widely supported CSS. The counter text centers correctly within the fixed 28×28px badge.
- **Heading hierarchy:** All "How to Use" sections use `<h2>` which is correct under the `<h1>` in the layout. Grid card titles use `<h3>` inside `<h2>` sections — correct nesting. No skipped levels.
- **Gradient badge colors in dark mode:** The gradient `#818cf8 → #6366f1` uses the dark-mode primary values. They display identically in both modes, which is visually coherent.
- **`section` without `aria-label`:** The "How to Use" sections in page files have no `aria-label`. This is acceptable — without an accessible name a `<section>` falls back to a generic grouping container, which is not a violation. The `<h2>` inside communicates the section purpose to users.
- **Privacy banner placement:** Correctly sits outside the `tool.content` conditional, so it renders on all tool pages regardless of whether structured content data exists.
- **Removal of per-page Privacy prose sections:** The consolidated privacy banner in the layout is a correct architectural improvement — DRY, consistent, and still fulfills GDPR/user-trust communication requirements.
- **Step content accuracy and tone:** All 20 tools have appropriately concise 4–5 step instructions. No steps are missing critical actions or misleading.
- **Responsive grid (use cases/tips cards):** `grid-cols-1 sm:grid-cols-2` is appropriate. Cards on mobile stack correctly.
- **Table accessibility:** The comparison table uses `<caption class="sr-only">`, `scope="col"` on header cells, and `scope="row"` on first-column row headers. This is correct.

---

## Action Checklist

| # | Severity | File | Action |
|---|----------|------|--------|
| 1 | CRITICAL | `ToolLayout.astro:114` | Replace hardcoded `color: #34d399` with `color: var(--color-success-text)` and background/border with corresponding tokens. Add `aria-hidden="true"` to lock SVG. |
| 2 | HIGH | `global.css:140` | Change gradient to darker values that achieve ≥4.5:1 with white, OR increase badge font-size to 14px bold. |
| 3 | MEDIUM | `global.css:126` | Change `align-items: center` to `align-items: flex-start` on `.step-list li`. |
| 4 | MEDIUM | `hash-generator.astro:24`, `percentage-calculator.astro:22`, `regex-tester.astro:25` | Move second `<h2>` blocks into their own `<section slot="content">` rather than sitting inside the same section as the step list. |
