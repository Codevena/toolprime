# ToolPrime Roadmap

## Goal

Turn ToolPrime from a promising utility site into a durable SEO and monetization asset by focusing on:

- flagship page quality
- cluster authority
- monetization depth
- internal linking and workflows
- selective expansion instead of blind page growth

This roadmap is the strategic view. `todo.md` is the execution board. They must be updated together.

## Guiding Principles

- improve winners before adding more pages
- treat pages differently based on role
- use pSEO with discipline
- build clusters, not disconnected tools
- prioritize monetization where intent is strongest
- improve repeat value, not just acquisition
- keep strategy docs synchronized with actual shipped work

## Page Roles

Use these categories when prioritizing work:

- money pages: directly monetizable or high-RPM candidates
- authority pages: brand, trust, links, recurring usage
- support pages: long-tail entry pages feeding stronger assets
- hub pages: category and audience pages distributing authority

## Current Status

Completed:

- Priority 1: top-5 page upgrades
- Priority 2: hub upgrades for `/developer`, `/everyday`, and `/design`
- Priority 3: cluster upgrades for `meta-tag-generator`, `robots-txt-generator`, `regex-tester`, `timestamp-converter`, and `css-gradient-generator`
- build verification after the latest page-upgrade pass

Current execution focus:

- KPI baseline definition for post-upgrade measurement
- FAQ and quality cleanup where still incomplete
- monetization readiness documentation, not live rollout yet

Next recommended sequence:

1. capture actual KPI baselines from analytics and search tools
2. close remaining FAQ and page-quality gaps on upgraded priority pages
3. revisit monetization experiments only after enough launch-period data exists

## Progress Snapshot

- `regex-tester`, `timestamp-converter`, and `css-gradient-generator` now match the stronger page pattern used on the top-5 and SEO workflow pages.
- Priority 3 cluster reinforcement is complete.
- Strategy now shifts from page-copy expansion to systems work: links, monetization, and measurement.
- A first workflow-link implementation pass has already been applied to `mortgage-calculator`, `currency-converter`, `image-compressor`, `qr-code-generator`, and `robots-txt-generator`.
- The workflow-link system is now in place across the top-10 priority pages and has been re-verified with a successful build.
- Monetization planning has been converted into concrete page-level implementation guidance in `monetization-notes.md`.
- Because the site is newly live, monetization rollout should wait until there is enough baseline traffic and engagement signal to judge impact.

## Strategic Priorities

## Priority 1

Upgrade the top 5 strategic pages:

- `mortgage-calculator`
- `currency-converter`
- `image-compressor`
- `json-formatter`
- `qr-code-generator`

Status:

- complete

## Priority 2

Turn hub pages into stronger editorial and SEO assets:

- `/developer`
- `/everyday`
- `/design`

Status:

- complete

## Priority 3

Strengthen high-potential cluster pages:

- `meta-tag-generator`
- `robots-txt-generator`
- `regex-tester`
- `timestamp-converter`
- `css-gradient-generator`

Status:

- complete

## Priority 4

Build monetization deliberately into high-intent pages:

- finance
- SEO/webmaster
- image/design

Status:

- planning defined
- implementation notes defined
- rollout intentionally deferred pending baseline data
- implementation and measurement pending after the first data window

## Priority 5

Improve retention and habit signals:

- workflows
- presets
- recent tools
- tool bundles

Status:

- partially advanced via page presets and workflow sections
- product/system work still pending

## Top-10 Role View

- `mortgage-calculator`: primary `money`, secondary `authority`
- `currency-converter`: primary `money`, secondary `support`
- `image-compressor`: primary `money`, secondary `authority`
- `json-formatter`: primary `authority`, secondary `support`
- `qr-code-generator`: primary `money`, secondary `authority`
- `meta-tag-generator`: primary `money`, secondary `authority`
- `robots-txt-generator`: primary `authority`, secondary `support`
- `regex-tester`: primary `authority`, secondary `support`
- `timestamp-converter`: primary `authority`, secondary `support`
- `css-gradient-generator`: primary `money`, secondary `authority`

Implication:

- do not monetize developer authority pages too aggressively
- monetize finance, SEO, image, and design pages more deliberately
- use support pages to feed stronger pages through workflow links

## Workflow-Link Strategy

The internal-link system should be based on user jobs, not superficial tool similarity.

Cluster paths:

- Finance:
  `mortgage-calculator` -> `loan-calculator` -> `compound-interest-calculator`
  `currency-converter` -> `percentage-calculator` -> finance/planning tools

- Developer:
  `json-formatter` -> `diff-checker` -> `regex-tester`
  `regex-tester` -> `timestamp-converter` -> `json-formatter`
  `json-formatter` -> `base64-encode-decode` for payload-debug flows

- SEO / Webmaster:
  `meta-tag-generator` -> `robots-txt-generator` -> `favicon-generator`
  `robots-txt-generator` -> `meta-tag-generator`
  priority pages should also feed relevant pSEO children

- Design / Image:
  `css-gradient-generator` -> `color-palette-generator` -> `color-converter`
  `image-compressor` -> `css-gradient-generator` -> `favicon-generator`
  `qr-code-generator` -> `image-compressor` for exported asset handling

Execution rule:

- every priority page should surface at least one "used with" path and one "next step" path

Current implementation status:

- workflow links are now in place across finance, developer, SEO, and design/image priority pages
- the next focus is monetization implementation planning and KPI capture, not more link rewrites

## Monetization Strategy

### Ad-first candidates

- `mortgage-calculator`
- `currency-converter`
- `image-compressor`
- `qr-code-generator`
- `meta-tag-generator`
- `css-gradient-generator`

### Affiliate-first candidates

- `mortgage-calculator`
- `currency-converter`
- `image-compressor`
- `meta-tag-generator`
- `css-gradient-generator`

### Trust-first / delayed monetization

- `json-formatter`
- `robots-txt-generator`
- `regex-tester`
- `timestamp-converter`

Reason:

- these pages have strong authority value and can lose trust quickly if monetization gets in the way of fast utility use

### Page-level logic

- `mortgage-calculator`: finance lead-gen or lender/refinance tests
- `currency-converter`: travel, remittance, or card affiliate tests
- `image-compressor`: hosting, CDN, or performance-tool tests
- `json-formatter`: protect authority first
- `qr-code-generator`: ad-supported with later premium/export opportunities
- `meta-tag-generator`: SEO SaaS or webmaster affiliate tests
- `robots-txt-generator`: support-page monetization only if tightly contextual
- `regex-tester`: delay monetization
- `timestamp-converter`: delay monetization
- `css-gradient-generator`: design-tool, hosting, or asset-workflow tests

## KPI Framework

Track by cluster and page role, not just sitewide totals.

Core KPIs:

- organic sessions by cluster
- organic sessions landing on top-10 pages
- engagement depth on top-10 pages
- pages per session from priority landing pages
- internal click-through from hubs and related-workflow sections
- monetization CTR by page and cluster
- RPM / revenue contribution by page role

Required baseline capture:

- per-page sessions
- per-page organic sessions
- per-page engagement metric
- internal next-step CTR
- monetization module CTR where present
- page role
- cluster

Current status:

- framework defined
- actual baseline numbers still need to be collected from analytics/search tooling

## 90-Day Plan

## Phase 1: Foundation and Focus

Status:

- complete

Deliverables completed:

- top-10 strategic pages defined
- flagship-page checklist established
- priority framework documented

## Phase 2: Top-5 Page Upgrades

Status:

- complete

## Phase 3: Hub Strengthening

Status:

- complete

## Phase 4: Cluster Reinforcement

Status:

- complete

## Phase 5: Content Engine Alignment

Status:

- not started

Next deliverables:

- define 3 content clusters tied to money or authority pages
- publish only support content that feeds tools and hubs
- avoid generic filler posts

## Phase 6: Monetization Optimization

Status:

- planning defined
- implementation not started

Next deliverables:

- evaluate ad placement by page type
- add contextual affiliate modules where relevant
- define page-level monetization logic in shipped UI
- measure revenue by cluster and page role

Success criteria:

- monetization strategy exists for top 10 pages
- at least one monetization experiment per main cluster
- no obvious UX damage from monetization

## Guardrails

- do not over-monetize developer pages too early
- do not expand pSEO faster than you can maintain page quality
- do not let docs imply work is done when the repo or measurement layer says otherwise
- prefer systems that compound: internal links, hubs, workflows, monetization logic, measurement
