# ToolPrime Handoff Prompt

Use this prompt at the start of the next run to restore context quickly:

---

You are continuing work in `/Users/markus/Developer/toolprime`.

Read these files first:

- `analysis.md`
- `roadmap.md`
- `todo.md`

Current strategy state:

- The top-5 priority pages have already been upgraded:
  - `src/pages/mortgage-calculator.astro`
  - `src/components/tools/MortgageCalculator.tsx`
  - `src/pages/currency-converter.astro`
  - `src/components/tools/CurrencyConverter.tsx`
  - `src/pages/image-compressor.astro`
  - `src/components/tools/ImageCompressor.tsx`
  - `src/pages/json-formatter.astro`
  - `src/components/tools/JsonFormatter.tsx`
  - `src/pages/qr-code-generator.astro`
  - `src/components/tools/QrCodeGenerator.tsx`

- The 3 hub pages have already been upgraded:
  - `src/pages/developer.astro`
  - `src/pages/everyday.astro`
  - `src/pages/design.astro`

- The SEO cluster has partially been upgraded:
  - `src/pages/meta-tag-generator.astro`
  - `src/components/tools/MetaTagGenerator.tsx`
  - `src/pages/robots-txt-generator.astro`
  - `src/components/tools/RobotsTxtGenerator.tsx`

Important repo state:

- There are unrelated existing changes in:
  - `src/data/timezoneData.ts`
- Do not overwrite or revert unrelated work.

Known build context:

- `npm run build` previously showed no obvious new errors from the upgraded pages.
- The project has existing long-running static generation and existing warnings around `/convert/*` route conflicts.
- Do not waste the next run chasing those warnings unless explicitly asked.

Next highest-priority tasks:

1. Upgrade `regex-tester`
2. Upgrade `timestamp-converter`
3. Upgrade `css-gradient-generator`
4. Then update internal linking and monetization mapping
5. Then capture KPI/baseline tasks from `todo.md`

Execution guidance:

- Keep following the existing pattern used on the upgraded pages:
  - stronger intro/above-the-fold guidance
  - examples or presets
  - clearer workflow context
  - stronger internal linking to adjacent tools/content
  - practical best-practice sections

- For the next run, start with:
  - `src/pages/regex-tester.astro`
  - `src/components/tools/RegexTester.tsx`

After finishing a block:

- update `todo.md`
- update `roadmap.md` if milestone status changed
- keep a concise progress snapshot in the docs

---
