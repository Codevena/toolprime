# Phase 2 Code Review — Codex Review Agent 1

**Date:** 2026-03-28
**Scope:** 10 new React tool components, 10 Astro pages, updated data files, 5 new deps

## Critical (2)
1. **HashGenerator.tsx line 3:** `import md5 from 'js-md5'` should be `import { md5 } from 'js-md5'` (named export)
2. **Missing `@types/diff`** devDependency — diff v8 doesn't bundle TS declarations

## Important (3)
3. **FaviconGenerator:** Object URL leak on error paths (image load failure, mid-loop resize failure)
4. **InvoiceGenerator:** Silent PDF failure — only `console.error`, no user-visible error state
5. **RegexTester:** `m.index!` non-null assertion bypasses TypeScript safety

## Medium (2)
6. **SqlFormatter:** Two `<select>` elements have no accessible labels (aria-label)
7. **DiffChecker/RegexTester:** Hard-coded Tailwind colors (`bg-green-100`, etc.) break in dark mode

## Low (3)
8. **CaseConverter:** Title Case capitalizes after apostrophes ("it's" → "It'S")
9. **InvoiceGenerator:** Long descriptions overflow PDF table columns
10. **InvoiceGenerator:** No page-break logic for 15+ line items
