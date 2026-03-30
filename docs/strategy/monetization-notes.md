# ToolPrime Monetization Notes

This file turns the top-10 monetization map into implementation guidance. It is intentionally pragmatic and should stay aligned with `roadmap.md` and `todo.md`.

Current rollout stance:

- do not ship new monetization experiments immediately after launch
- wait for early baseline traffic and engagement data first
- use this file as readiness guidance, not as a signal that monetization should go live now

## Guardrails

- protect trust on developer authority pages
- prefer below-tool or below-results monetization before above-the-fold clutter
- use contextual modules instead of generic sales copy where possible
- do not interrupt the primary action on any tool page
- measure page-level impact before expanding placements

## Placement Rules

### Ads

- allowed by default on `money` pages
- prefer top and bottom layout slots already available in `ToolLayout.astro`
- if a page is trust-sensitive, do not add extra in-content ad blocks until metrics justify it

### Affiliate / Lead-Gen Modules

- place after the tool and after the first explanatory/help block
- keep copy task-aligned, not generic
- only use offers that match the user job on the page

### Delay / Minimize Monetization

- `json-formatter`
- `robots-txt-generator`
- `regex-tester`
- `timestamp-converter`

Reason:

- these pages function as trust and authority builders; aggressive monetization risks reducing repeat use and brand quality

## Top-10 Implementation Notes

## `mortgage-calculator`

- role: `money`
- ad posture: allowed
- affiliate posture: strong
- recommended placement:
  below tool results
  below "Important Mortgage Notes"
- contextual offer ideas:
  mortgage marketplace
  refinance comparison
  first-time buyer education lead-gen
- guardrail:
  do not insert monetization between input controls and calculation output
- primary KPI:
  affiliate CTR
- secondary KPI:
  pages per session into related finance tools

## `currency-converter`

- role: `money`
- ad posture: allowed
- affiliate posture: strong
- recommended placement:
  below converter
  below "Related Tools for International Planning"
- contextual offer ideas:
  remittance providers
  travel cards
  international banking tools
- guardrail:
  no monetization inside the converter panel or around popular pair shortcuts
- primary KPI:
  contextual module CTR
- secondary KPI:
  conversion-page depth and related-tool clicks

## `image-compressor`

- role: `money`
- ad posture: allowed
- affiliate posture: strong
- recommended placement:
  below compression result area
  below "Related Design and Web Tools"
- contextual offer ideas:
  image CDN
  hosting/CDN
  website performance tooling
- guardrail:
  keep result preview and download flow visually dominant
- primary KPI:
  affiliate CTR
- secondary KPI:
  tool completion rate

## `json-formatter`

- role: `authority`
- ad posture: delayed
- affiliate posture: minimal
- recommended placement:
  none for now beyond existing layout behavior if later allowed by policy
- contextual offer ideas:
  none until stronger need is proven
- guardrail:
  do not clutter the page while it is being used as a flagship developer-trust page
- primary KPI:
  engagement depth
- secondary KPI:
  related developer-tool clicks

## `qr-code-generator`

- role: `money`
- ad posture: allowed
- affiliate posture: low to medium
- recommended placement:
  below generator/export area
  below best-practice section
- contextual offer ideas:
  future premium export features
  print/design workflow offers if later available
- guardrail:
  keep creation, preview, and download flow uninterrupted
- primary KPI:
  RPM
- secondary KPI:
  export completion rate

## `meta-tag-generator`

- role: `money`
- ad posture: allowed
- affiliate posture: strong
- recommended placement:
  below generated output
  below "Related SEO Workflows"
- contextual offer ideas:
  SEO software
  site audit tools
  webmaster tooling
- guardrail:
  do not interfere with form completion or copy output flow
- primary KPI:
  affiliate CTR
- secondary KPI:
  related SEO workflow clicks

## `robots-txt-generator`

- role: `authority`
- ad posture: minimal
- affiliate posture: low to medium
- recommended placement:
  below "Related SEO Setup Tools" only if contextual
- contextual offer ideas:
  technical SEO suite
  site auditing tools
- guardrail:
  keep this page trust-first; avoid turning it into a generic ad surface
- primary KPI:
  related SEO cluster clicks
- secondary KPI:
  monetization CTR only if a highly relevant module is added

## `regex-tester`

- role: `authority`
- ad posture: delayed
- affiliate posture: none for now
- recommended placement:
  none
- contextual offer ideas:
  none for now
- guardrail:
  preserve fast, distraction-free debugging workflow
- primary KPI:
  repeat engagement and workflow clicks
- secondary KPI:
  session depth inside developer cluster

## `timestamp-converter`

- role: `authority`
- ad posture: delayed
- affiliate posture: none for now
- recommended placement:
  none
- contextual offer ideas:
  none for now
- guardrail:
  preserve clarity and trust for debugging and ops workflows
- primary KPI:
  engagement depth
- secondary KPI:
  related developer-tool clicks

## `css-gradient-generator`

- role: `money`
- ad posture: allowed
- affiliate posture: strong
- recommended placement:
  below CSS output
  below preset/design workflow sections
- contextual offer ideas:
  design tools
  hosting/site builder offers
  asset workflow tools
- guardrail:
  preview and copy flow must stay visually primary
- primary KPI:
  affiliate CTR
- secondary KPI:
  related design-tool clicks

## Cluster-Level Experiment Order

1. finance
2. SEO/webmaster
3. image/design
4. delay developer authority-page monetization until stronger baseline data exists

## Measurement Checklist

- page-level CTR on monetization module
- page-level RPM where ads exist
- tool completion rate before vs after monetization
- related-tool click-through rate
- engagement depth on trust-sensitive pages

## Implementation Readiness

- ad slot infrastructure already exists in `src/layouts/ToolLayout.astro`
- affiliate or lead-gen modules are not yet implemented as reusable components
- immediate next step should not be rollout
- first collect baseline data on traffic, engagement, and top landing pages
- after that, decide whether to:
  create a lightweight contextual monetization module
  or keep monetization delayed on trust-sensitive pages longer
