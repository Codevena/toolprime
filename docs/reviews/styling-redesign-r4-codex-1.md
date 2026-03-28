# Styling Redesign R4 — Code Review (Codex-1)

Scope: all files changed since the previous commit (styling redesign round 4).
Fixed in R3: step badge CSS variables, breadcrumb aria-current, PercentageCalculator label htmlFor/id, section aria-labelledby on all 20 pages.

---

## Finding 1 — Accessibility violation: `<ol class="step-list">` missing `role="list"` on all 20 pages

**Severity:** Accessibility bug (WCAG 1.3.1 — Info and Relationships)

**Affected files (all 20 tool pages):**

- `/Users/markus/Developer/toolprime/src/pages/base64-encode-decode.astro`
- `/Users/markus/Developer/toolprime/src/pages/case-converter.astro`
- `/Users/markus/Developer/toolprime/src/pages/color-picker.astro`
- `/Users/markus/Developer/toolprime/src/pages/css-gradient-generator.astro`
- `/Users/markus/Developer/toolprime/src/pages/diff-checker.astro`
- `/Users/markus/Developer/toolprime/src/pages/favicon-generator.astro`
- `/Users/markus/Developer/toolprime/src/pages/hash-generator.astro`
- `/Users/markus/Developer/toolprime/src/pages/image-compressor.astro`
- `/Users/markus/Developer/toolprime/src/pages/invoice-generator.astro`
- `/Users/markus/Developer/toolprime/src/pages/json-formatter.astro`
- `/Users/markus/Developer/toolprime/src/pages/lorem-ipsum-generator.astro`
- `/Users/markus/Developer/toolprime/src/pages/password-generator.astro`
- `/Users/markus/Developer/toolprime/src/pages/percentage-calculator.astro`
- `/Users/markus/Developer/toolprime/src/pages/qr-code-generator.astro`
- `/Users/markus/Developer/toolprime/src/pages/regex-tester.astro`
- `/Users/markus/Developer/toolprime/src/pages/sql-formatter.astro`
- `/Users/markus/Developer/toolprime/src/pages/timestamp-converter.astro`
- `/Users/markus/Developer/toolprime/src/pages/unit-converter.astro`
- `/Users/markus/Developer/toolprime/src/pages/url-encode-decode.astro`
- `/Users/markus/Developer/toolprime/src/pages/word-counter.astro`

**Description:**

The global CSS in `/Users/markus/Developer/toolprime/src/styles/global.css` sets `list-style: none` on `.step-list`. Safari's VoiceOver (and other WebKit-based AT) removes the list role from `<ol>` and `<ul>` elements whenever `list-style: none` is applied via CSS. This is a long-standing, well-documented WebKit behaviour. As a result, on Safari/iOS — which represents a significant share of mobile screen reader users — the ordered list is not announced as a list at all. Users will not hear "list, N items" and will not have the structural context that these are sequential numbered steps.

**Fix:**

Add `role="list"` explicitly to every `<ol class="step-list">` element. This overrides the WebKit heuristic and restores list semantics on Safari without affecting any other browser.

```astro
<ol class="step-list" role="list">
```

This change must be applied to all 20 pages listed above.

---

## Summary

One genuine accessibility violation found. No bugs, security issues, or other accessibility problems were identified in the remaining changes:

- `src/styles/global.css`: CSS variable additions and `.step-list` component styles are correct. Both light and dark mode define `--step-badge-start`/`--step-badge-end`. Colour contrast for white text on the badge gradient passes WCAG AA in both modes.
- `src/layouts/ToolLayout.astro`: Restructured content sections are semantically sound. The `<aside role="note" aria-label="Privacy notice">` is valid ARIA (WAI-ARIA 1.2 role="note" is a document structure role). The privacy banner SVG icon has `aria-hidden="true"` correctly.
- `src/components/seo/Breadcrumbs.astro`: `aria-current="page"` is correctly applied to the last breadcrumb item.
- `src/components/tools/PercentageCalculator.tsx`: Both inputs have matching `htmlFor`/`id` pairs (`calc-x`, `calc-y`).
- All 20 page sections: `aria-labelledby` references a co-located `id` on the `<h2>`, which is correct.
