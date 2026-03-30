# ToolPrime TODO

## Current Focus

This file is the working execution board. Keep it aligned with actual repo state after every completed block.

Current priority:

- document KPI baseline requirements before more expansion
- wait for early traffic and usage signal before monetization tests
- close remaining FAQ and page-quality gaps on upgraded pages

## Rules

- do not add random new tools
- do not publish filler content
- do not expand pSEO before improving key pages and documenting why
- do not let `roadmap.md` and `todo.md` drift from actual completion state
- do not overwrite unrelated changes such as `src/data/timezoneData.ts`

## Current State

Completed:

- [x] top-5 page upgrades
- [x] hub upgrades for `/developer`, `/everyday`, and `/design`
- [x] cluster upgrades for `meta-tag-generator`, `robots-txt-generator`, `regex-tester`, `timestamp-converter`, and `css-gradient-generator`
- [x] build verification after the latest page-upgrade pass

In progress:

- [x] internal linking system definition
- [x] top-10 monetization mapping
- [ ] KPI baseline definition

Next execution sequence:

1. capture actual KPI baselines from analytics/search tools
2. review FAQ quality on upgraded pages where still incomplete
3. wait for enough traffic signal before shipping monetization experiments

## Top 10 Strategic Pages

- [x] `mortgage-calculator`
- [x] `currency-converter`
- [x] `image-compressor`
- [x] `json-formatter`
- [x] `qr-code-generator`
- [x] `meta-tag-generator`
- [x] `robots-txt-generator`
- [x] `regex-tester`
- [x] `timestamp-converter`
- [x] `css-gradient-generator`

## Page Role Matrix

- [x] `mortgage-calculator` primary role: `money`
- [x] `mortgage-calculator` secondary role: `authority`
- [x] `currency-converter` primary role: `money`
- [x] `currency-converter` secondary role: `support`
- [x] `image-compressor` primary role: `money`
- [x] `image-compressor` secondary role: `authority`
- [x] `json-formatter` primary role: `authority`
- [x] `json-formatter` secondary role: `support`
- [x] `qr-code-generator` primary role: `money`
- [x] `qr-code-generator` secondary role: `authority`
- [x] `meta-tag-generator` primary role: `money`
- [x] `meta-tag-generator` secondary role: `authority`
- [x] `robots-txt-generator` primary role: `authority`
- [x] `robots-txt-generator` secondary role: `support`
- [x] `regex-tester` primary role: `authority`
- [x] `regex-tester` secondary role: `support`
- [x] `timestamp-converter` primary role: `authority`
- [x] `timestamp-converter` secondary role: `support`
- [x] `css-gradient-generator` primary role: `money`
- [x] `css-gradient-generator` secondary role: `authority`

Page role notes:

- `money` means strongest near-term monetization potential or RPM fit
- `authority` means best-in-class trust and recurring usage signal
- `support` means strong acquisition and handoff into higher-value pages
- `hub` remains reserved for `/developer`, `/everyday`, and `/design`

## Workflow Link System

### Finance

- [x] define workflow links for finance pages
- [x] confirm finance priority pages expose these paths clearly

Recommended paths:

- `mortgage-calculator` -> `loan-calculator` -> `compound-interest-calculator`
- `mortgage-calculator` -> `currency-converter` for cross-border budgeting context where relevant
- `currency-converter` -> `percentage-calculator` for fee/spread checks
- `currency-converter` -> `mortgage-calculator` for relocation or property-planning journeys

### Developer

- [x] define workflow links for developer pages
- [x] confirm developer priority pages expose these paths clearly

Recommended paths:

- `json-formatter` -> `diff-checker` -> `regex-tester`
- `json-formatter` -> `base64-encode-decode` for encoded payload inspection
- `regex-tester` -> `json-formatter` for payload cleanup before extraction
- `regex-tester` -> `timestamp-converter` for log/event parsing workflows
- `timestamp-converter` -> `regex-tester` for timestamp extraction from logs
- `timestamp-converter` -> `json-formatter` for event-payload debugging

### SEO / Webmaster

- [x] define workflow links for SEO/webmaster pages
- [x] confirm SEO priority pages expose these paths clearly

Recommended paths:

- `meta-tag-generator` -> `robots-txt-generator` -> `favicon-generator`
- `robots-txt-generator` -> `meta-tag-generator` for launch/audit flows
- `meta-tag-generator` -> relevant `/meta-tags/*` pages as supporting templates
- `robots-txt-generator` -> relevant `/robots-txt/*` pages as supporting examples

### Design / Image

- [x] define workflow links for design/image pages
- [x] confirm design/image priority pages expose these paths clearly

Recommended paths:

- `css-gradient-generator` -> `color-palette-generator` -> `color-converter`
- `css-gradient-generator` -> `favicon-generator` for brand-asset continuation
- `image-compressor` -> `css-gradient-generator` for performance plus presentation workflows
- `image-compressor` -> `favicon-generator` for asset-prep workflows
- `qr-code-generator` -> `image-compressor` for exported asset handling

## Monetization Map

- [x] define ad-eligible pages
- [x] define affiliate-eligible pages
- [x] map a monetization strategy for each top 10 page
- [x] decide where monetization should be delayed to protect UX
- [x] document test ideas and success metrics
- [x] decide to delay new monetization experiments until post-launch baseline data exists

### Ad-Eligible Pages

- [x] `mortgage-calculator`
- [x] `currency-converter`
- [x] `image-compressor`
- [x] `qr-code-generator`
- [x] `meta-tag-generator`
- [x] `css-gradient-generator`

Delay or minimize ads on:

- [x] `json-formatter`
- [x] `robots-txt-generator`
- [x] `regex-tester`
- [x] `timestamp-converter`

Reason:

- developer utility pages are more sensitive to trust and interruption costs

### Affiliate-Eligible Pages

- [x] `mortgage-calculator`
- [x] `currency-converter`
- [x] `image-compressor`
- [x] `meta-tag-generator`
- [x] `css-gradient-generator`

Low or no affiliate priority:

- [x] `json-formatter`
- [x] `robots-txt-generator`
- [x] `regex-tester`
- [x] `timestamp-converter`
- [x] `qr-code-generator`

### Page-Level Strategy

- [x] `mortgage-calculator`: finance lead-gen and lender/refinance tests; ads acceptable below core results
- [x] `currency-converter`: remittance, card, or travel-money affiliate tests; ads acceptable below core converter and popular pairs
- [x] `image-compressor`: hosting, CDN, performance, or image-optimization affiliate tests; ads acceptable below tool and help sections
- [x] `json-formatter`: no aggressive monetization yet; protect authority and developer trust
- [x] `qr-code-generator`: ad-supported with later premium/export feature mapping; avoid intrusive placement near creation flow
- [x] `meta-tag-generator`: SEO SaaS or webmaster affiliate tests; ads acceptable below primary generator and workflow sections
- [x] `robots-txt-generator`: low-ad, trust-first support page feeding SEO cluster; affiliate use only if tightly relevant
- [x] `regex-tester`: trust-first authority page; monetization delayed
- [x] `timestamp-converter`: trust-first authority page; monetization delayed
- [x] `css-gradient-generator`: design-tool, asset, or hosting affiliate tests; ads acceptable below preview/output

### Test Success Metrics

- [x] RPM by page and cluster
- [x] CTR on contextual monetization modules
- [x] no major drop in tool completion or engagement depth
- [x] no obvious UX damage on authority pages

## KPI Baseline

- [x] define KPI dashboard structure
- [x] define baseline metrics to capture for the top 10
- [ ] capture actual numbers from analytics/search tools

Required baseline by page:

- organic sessions
- total sessions
- engagement rate or comparable interaction metric
- pages per session from entry
- internal click-through to next-step tools
- monetization CTR where modules exist
- RPM or revenue contribution where monetization exists
- primary query/theme cluster

Dashboard cuts:

- by page
- by cluster
- by role (`money`, `authority`, `support`, `hub`)
- by monetization type (ads, affiliate, none)

## Immediate Implementation Tasks

- [x] review top-10 pages against the workflow-link matrix and patch the clearest missing high-value next-step links
- [x] complete a second-pass workflow-link audit across all top-10 pages for remaining major gaps
- [ ] review FAQ quality on upgraded pages where still incomplete
- [ ] convert the monetization map into page-level implementation notes if monetization modules are added
- [x] convert the monetization map into page-level implementation notes
- [x] keep monetization notes as planning guidance for now
- [ ] revisit monetization implementation after baseline traffic and engagement data exists

## Backlog: Content

- [ ] create cluster-specific blog briefs
- [ ] plan 3 finance support articles
- [ ] plan 3 developer support articles
- [ ] plan 2 SEO/webmaster support articles
- [ ] ensure every planned article supports at least 2 tool pages
- [ ] remove or avoid generic filler topics

## Backlog: Standards

- [ ] define pSEO quality standards
- [ ] create a reusable page-audit checklist for future upgrade passes

## Backlog: Product Ideas

- [ ] define `recent tools` feature
- [ ] define `saved presets` feature candidates
- [ ] define tool bundles or workflow pages
- [ ] identify premium candidates for later testing

## Progress Snapshot

- Priority 1, 2, and 3 page-upgrade work is complete.
- Current strategic focus has moved to workflow-link logic, monetization mapping, and KPI baselining.
- `roadmap.md` and `todo.md` were refreshed together after the Priority 3 completion and build verification.
- Added missing high-value workflow links on `mortgage-calculator`, `currency-converter`, `image-compressor`, `qr-code-generator`, and `robots-txt-generator`.
- Workflow-link system is now implemented across the top-10 priority pages and re-verified with a successful build.
- Added `monetization-notes.md` with page-level placement rules, guardrails, experiment order, and KPIs for the top 10.
- Monetization experiments are intentionally deferred because the site is newly live and needs baseline data first.
