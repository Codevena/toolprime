# Phase 5c: pSEO Page Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand pSEO pages from ~54K to ~75K+ by increasing data entries in existing data files. No new templates or routes needed.

**Architecture:** All changes are data-only — modifying arrays/configs in `src/data/*.ts` files. Existing `getStaticPaths()` and pSEO templates consume these arrays unchanged. Each task is fully independent.

**Tech Stack:** TypeScript data files, Astro static generation

---

## Current vs Target Page Counts

| Category | Current | Target | Delta | Task |
|----------|---------|--------|-------|------|
| Timezone | 1,941 | ~8,000 | +6,059 | 1 |
| Date Calc | 1,015 | ~3,000 | +1,985 | 2 |
| Compound Interest | 864 | ~2,000 | +1,136 | 3 |
| Loan | 480 | ~1,500 | +1,020 | 4 |
| Percentage | 2,340 | ~7,500 | +5,160 | 5 |
| Hash | 1,000 | ~2,000 | +1,000 | 6 |
| BMI | 180 | ~500 | +320 | 7 |
| Mortgage | 154 | ~500 | +346 | 8 |
| **Total delta** | | | **+17,026** | |

---

### Task 1: Expand Timezone Pages (1,941 → ~8,000)

**Files:**
- Modify: `src/data/timezoneData.ts`

Three changes: add 50 more cities, increase anchors from 30 to 55, generate BOTH directions per pair (A-to-B and B-to-A are both valid search queries).

- [ ] **Step 1: Add 50 new cities**

Add these cities after the existing Oceania section (before the closing `]`). These are high-search-volume cities not yet in the list:

```typescript
  // Additional North America (6)
  { name: 'Boston', slug: 'boston', timezone: 'America/New_York', country: 'US', flag: '🇺🇸' },
  { name: 'Atlanta', slug: 'atlanta', timezone: 'America/New_York', country: 'US', flag: '🇺🇸' },
  { name: 'Dallas', slug: 'dallas', timezone: 'America/Chicago', country: 'US', flag: '🇺🇸' },
  { name: 'Las Vegas', slug: 'las-vegas', timezone: 'America/Los_Angeles', country: 'US', flag: '🇺🇸' },
  { name: 'Montreal', slug: 'montreal', timezone: 'America/Toronto', country: 'CA', flag: '🇨🇦' },
  { name: 'Calgary', slug: 'calgary', timezone: 'America/Edmonton', country: 'CA', flag: '🇨🇦' },
  // Additional South America (4)
  { name: 'Medellín', slug: 'medellin', timezone: 'America/Bogota', country: 'CO', flag: '🇨🇴' },
  { name: 'Montevideo', slug: 'montevideo', timezone: 'America/Montevideo', country: 'UY', flag: '🇺🇾' },
  { name: 'Quito', slug: 'quito', timezone: 'America/Guayaquil', country: 'EC', flag: '🇪🇨' },
  { name: 'Caracas', slug: 'caracas', timezone: 'America/Caracas', country: 'VE', flag: '🇻🇪' },
  // Additional Europe (10)
  { name: 'Munich', slug: 'munich', timezone: 'Europe/Berlin', country: 'DE', flag: '🇩🇪' },
  { name: 'Frankfurt', slug: 'frankfurt', timezone: 'Europe/Berlin', country: 'DE', flag: '🇩🇪' },
  { name: 'Milan', slug: 'milan', timezone: 'Europe/Rome', country: 'IT', flag: '🇮🇹' },
  { name: 'Barcelona', slug: 'barcelona', timezone: 'Europe/Madrid', country: 'ES', flag: '🇪🇸' },
  { name: 'Brussels', slug: 'brussels', timezone: 'Europe/Brussels', country: 'BE', flag: '🇧🇪' },
  { name: 'Edinburgh', slug: 'edinburgh', timezone: 'Europe/London', country: 'GB', flag: '🇬🇧' },
  { name: 'Manchester', slug: 'manchester', timezone: 'Europe/London', country: 'GB', flag: '🇬🇧' },
  { name: 'Kyiv', slug: 'kyiv', timezone: 'Europe/Kyiv', country: 'UA', flag: '🇺🇦' },
  { name: 'Budapest', slug: 'budapest', timezone: 'Europe/Budapest', country: 'HU', flag: '🇭🇺' },
  { name: 'Zürich', slug: 'zurich-city', timezone: 'Europe/Zurich', country: 'CH', flag: '🇨🇭' },
  // Additional Asia (15)
  { name: 'Shenzhen', slug: 'shenzhen', timezone: 'Asia/Shanghai', country: 'CN', flag: '🇨🇳' },
  { name: 'Guangzhou', slug: 'guangzhou', timezone: 'Asia/Shanghai', country: 'CN', flag: '🇨🇳' },
  { name: 'Chengdu', slug: 'chengdu', timezone: 'Asia/Shanghai', country: 'CN', flag: '🇨🇳' },
  { name: 'Chennai', slug: 'chennai', timezone: 'Asia/Kolkata', country: 'IN', flag: '🇮🇳' },
  { name: 'Hyderabad', slug: 'hyderabad', timezone: 'Asia/Kolkata', country: 'IN', flag: '🇮🇳' },
  { name: 'Pune', slug: 'pune', timezone: 'Asia/Kolkata', country: 'IN', flag: '🇮🇳' },
  { name: 'Lahore', slug: 'lahore', timezone: 'Asia/Karachi', country: 'PK', flag: '🇵🇰' },
  { name: 'Abu Dhabi', slug: 'abu-dhabi', timezone: 'Asia/Dubai', country: 'AE', flag: '🇦🇪' },
  { name: 'Kuwait City', slug: 'kuwait-city', timezone: 'Asia/Kuwait', country: 'KW', flag: '🇰🇼' },
  { name: 'Muscat', slug: 'muscat', timezone: 'Asia/Muscat', country: 'OM', flag: '🇴🇲' },
  { name: 'Kathmandu', slug: 'kathmandu', timezone: 'Asia/Kathmandu', country: 'NP', flag: '🇳🇵' },
  { name: 'Yangon', slug: 'yangon', timezone: 'Asia/Yangon', country: 'MM', flag: '🇲🇲' },
  { name: 'Phnom Penh', slug: 'phnom-penh', timezone: 'Asia/Phnom_Penh', country: 'KH', flag: '🇰🇭' },
  { name: 'Almaty', slug: 'almaty', timezone: 'Asia/Almaty', country: 'KZ', flag: '🇰🇿' },
  { name: 'Tashkent', slug: 'tashkent', timezone: 'Asia/Tashkent', country: 'UZ', flag: '🇺🇿' },
  // Additional Africa (10)
  { name: 'Dar es Salaam', slug: 'dar-es-salaam', timezone: 'Africa/Dar_es_Salaam', country: 'TZ', flag: '🇹🇿' },
  { name: 'Kinshasa', slug: 'kinshasa', timezone: 'Africa/Kinshasa', country: 'CD', flag: '🇨🇩' },
  { name: 'Luanda', slug: 'luanda', timezone: 'Africa/Luanda', country: 'AO', flag: '🇦🇴' },
  { name: 'Kigali', slug: 'kigali', timezone: 'Africa/Kigali', country: 'RW', flag: '🇷🇼' },
  { name: 'Kampala', slug: 'kampala', timezone: 'Africa/Kampala', country: 'UG', flag: '🇺🇬' },
  { name: 'Abuja', slug: 'abuja', timezone: 'Africa/Lagos', country: 'NG', flag: '🇳🇬' },
  { name: 'Tunis', slug: 'tunis', timezone: 'Africa/Tunis', country: 'TN', flag: '🇹🇳' },
  { name: 'Algiers', slug: 'algiers', timezone: 'Africa/Algiers', country: 'DZ', flag: '🇩🇿' },
  { name: 'Maputo', slug: 'maputo', timezone: 'Africa/Maputo', country: 'MZ', flag: '🇲🇿' },
  { name: 'Dakar', slug: 'dakar', timezone: 'Africa/Dakar', country: 'SN', flag: '🇸🇳' },
  // Additional Oceania (5)
  { name: 'Adelaide', slug: 'adelaide', timezone: 'Australia/Adelaide', country: 'AU', flag: '🇦🇺' },
  { name: 'Hobart', slug: 'hobart', timezone: 'Australia/Hobart', country: 'AU', flag: '🇦🇺' },
  { name: 'Wellington', slug: 'wellington', timezone: 'Pacific/Auckland', country: 'NZ', flag: '🇳🇿' },
  { name: 'Fiji', slug: 'fiji', timezone: 'Pacific/Fiji', country: 'FJ', flag: '🇫🇯' },
  { name: 'Christchurch', slug: 'christchurch', timezone: 'Pacific/Auckland', country: 'NZ', flag: '🇳🇿' },
```

Update the comment from `// 100 cities` to `// 150 cities`.

- [ ] **Step 2: Expand anchor cities from 30 to 55**

Replace the `anchorSlugs` array with:

```typescript
const anchorSlugs = [
  // Original 30
  'new-york', 'los-angeles', 'chicago', 'london', 'paris', 'berlin',
  'tokyo', 'shanghai', 'singapore', 'dubai', 'mumbai', 'sydney',
  'toronto', 'hong-kong', 'seoul', 'sao-paulo', 'moscow', 'istanbul',
  'bangkok', 'jakarta', 'cairo', 'lagos', 'nairobi', 'auckland',
  'mexico-city', 'buenos-aires', 'denver', 'miami', 'seattle', 'johannesburg',
  // 25 new anchors
  'san-francisco', 'vancouver', 'honolulu', 'lima', 'santiago',
  'madrid', 'rome', 'amsterdam', 'lisbon', 'athens',
  'delhi', 'bangalore', 'taipei', 'manila', 'riyadh',
  'tel-aviv', 'kuala-lumpur', 'ho-chi-minh-city', 'melbourne', 'perth',
  'cape-town', 'accra', 'casablanca', 'bogota', 'doha',
]
```

- [ ] **Step 3: Generate both directions per pair**

In `generateTimezonePairEntries()`, change the dedup logic to generate BOTH directions. Replace the function:

```typescript
/** Generate timezone pair pSEO entries: anchor cities × all other cities (both directions) */
function generateTimezonePairEntries(): TimezonePairEntry[] {
  const entries: TimezonePairEntry[] = []
  const seen = new Set<string>()

  for (const anchorSlug of anchorSlugs) {
    const anchor = getCityBySlug(anchorSlug)
    if (!anchor) continue

    for (const other of cities) {
      if (anchor.slug === other.slug) continue
      if (anchor.timezone === other.timezone) continue

      // Generate anchor-to-other direction
      const slug = `${anchor.slug}-to-${other.slug}`
      if (!seen.has(slug)) {
        seen.add(slug)
        entries.push({ slug, from: anchor, to: other })
      }

      // Generate other-to-anchor direction
      const reverseSlug = `${other.slug}-to-${anchor.slug}`
      if (!seen.has(reverseSlug)) {
        seen.add(reverseSlug)
        entries.push({ slug: reverseSlug, from: other, to: anchor })
      }
    }
  }

  return entries
}
```

- [ ] **Step 4: Verify count**

Run:
```bash
npx tsx -e "import { timezonePairEntries, cityTimeEntries } from './src/data/timezoneData.ts'; console.log('Pairs:', timezonePairEntries.length, 'Cities:', cityTimeEntries.length, 'Total:', timezonePairEntries.length + cityTimeEntries.length)"
```

Expected: ~7,500-9,000 total timezone pages.

- [ ] **Step 5: Build and verify no errors**

```bash
pnpm build 2>&1 | tail -20
```

- [ ] **Step 6: Commit**

```bash
git add src/data/timezoneData.ts
git commit -m "feat: expand timezone pSEO — 150 cities, 55 anchors, both directions"
```

---

### Task 2: Expand Date Calculator Pages (1,015 → ~3,000)

**Files:**
- Modify: `src/data/dateCalcData.ts`

- [ ] **Step 1: Extend days-from-today to 730**

Change the `daysValues` array:

```typescript
const daysValues = [
  ...Array.from({ length: 730 }, (_, i) => i + 1),
  1000, 1095, 1460, 1825,
]
```

This adds 365 more entries (366-730).

- [ ] **Step 2: Extend days-ago to 730**

Find where `daysAgoEntries` is generated and change the range. Currently it generates 1-365. Change to:

```typescript
export const daysAgoEntries: DaysFromTodayEntry[] = Array.from({ length: 730 }, (_, i) => ({
  slug: `${i + 1}-days-ago`,
  days: i + 1,
}))
```

- [ ] **Step 3: Add more fixed-date holidays**

Add these after the existing holidays array entries:

```typescript
  { slug: 'days-until-martin-luther-king-day', name: 'Martin Luther King Jr. Day', month: 1, day: 20 },
  { slug: 'days-until-groundhog-day', name: 'Groundhog Day', month: 2, day: 2 },
  { slug: 'days-until-pi-day', name: 'Pi Day', month: 3, day: 14 },
  { slug: 'days-until-star-wars-day', name: 'Star Wars Day', month: 5, day: 4 },
  { slug: 'days-until-mothers-day-us', name: "Mother's Day (US)", month: 5, day: 11 },
  { slug: 'days-until-fathers-day-us', name: "Father's Day (US)", month: 6, day: 15 },
  { slug: 'days-until-juneteenth', name: 'Juneteenth', month: 6, day: 19 },
  { slug: 'days-until-bastille-day', name: 'Bastille Day', month: 7, day: 14 },
  { slug: 'days-until-labor-day-us', name: 'Labor Day (US)', month: 9, day: 1 },
  { slug: 'days-until-oktoberfest', name: 'Oktoberfest', month: 9, day: 20 },
  { slug: 'days-until-day-of-the-dead', name: 'Day of the Dead', month: 11, day: 1 },
  { slug: 'days-until-black-friday', name: 'Black Friday', month: 11, day: 28 },
  { slug: 'days-until-cyber-monday', name: 'Cyber Monday', month: 12, day: 1 },
  { slug: 'days-until-boxing-day', name: 'Boxing Day', month: 12, day: 26 },
  { slug: 'days-until-german-unity-day', name: 'German Unity Day', month: 10, day: 3 },
  { slug: 'days-until-canada-day', name: 'Canada Day', month: 7, day: 1 },
  { slug: 'days-until-australia-day', name: 'Australia Day', month: 1, day: 26 },
```

Note: Mother's Day and Father's Day are approximated with fixed dates here (2025 dates). The comment in the existing code warns about moveable holidays — add a comment: `// Approximate fixed dates for holidays that vary slightly by year`.

- [ ] **Step 4: Extend weeks-from-today to 156 (3 years)**

```typescript
export const weeksFromTodayEntries: WeeksFromTodayEntry[] = Array.from({ length: 156 }, (_, i) => ({
  slug: `${i + 1}-weeks-from-today`,
  weeks: i + 1,
}))
```

- [ ] **Step 5: Extend months-from-today to 120 (10 years)**

```typescript
export const monthsFromTodayEntries: MonthsFromTodayEntry[] = Array.from({ length: 120 }, (_, i) => ({
  slug: `${i + 1}-months-from-today`,
  months: i + 1,
}))
```

- [ ] **Step 6: Add more days-between entries**

Add after `extendedDaysBetweenEntries` generation — add month-end to month-end pairs:

```typescript
// Month-end to month-end pairs
const monthEndPairs: [number, number, number, number][] = []
const monthEndDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
for (let from = 0; from < 12; from++) {
  for (let to = from + 1; to < 12; to++) {
    monthEndPairs.push([from + 1, monthEndDays[from], to + 1, monthEndDays[to]])
  }
}

export const monthEndDaysBetweenEntries: DaysBetweenEntry[] = monthEndPairs.map(([fm, fd, tm, td]) => ({
  slug: `days-between-${monthNames[fm - 1]}-${fd}-and-${monthNames[tm - 1]}-${td}`,
  fromMonth: fm,
  fromDay: fd,
  toMonth: tm,
  toDay: td,
}))
```

Then in `src/pages/calculate/[...slug].astro`, add these entries to the `getStaticPaths()` alongside the existing daysBetween entries. Import `monthEndDaysBetweenEntries` from the data file.

- [ ] **Step 7: Verify count**

```bash
npx tsx -e "
import { daysFromTodayEntries, holidays, daysBetweenEntries, extendedDaysBetweenEntries, monthEndDaysBetweenEntries, weekNumberEntries, weeksFromTodayEntries, monthsFromTodayEntries, daysAgoEntries } from './src/data/dateCalcData.ts';
const total = daysFromTodayEntries.length + daysAgoEntries.length + holidays.length + daysBetweenEntries.length + extendedDaysBetweenEntries.length + (typeof monthEndDaysBetweenEntries !== 'undefined' ? monthEndDaysBetweenEntries.length : 0) + weekNumberEntries.length + weeksFromTodayEntries.length + monthsFromTodayEntries.length;
console.log('Date calc total:', total);
"
```

Expected: ~2,800-3,200.

- [ ] **Step 8: Update getStaticPaths in calculate page**

In `src/pages/calculate/[...slug].astro`, add the import for `monthEndDaysBetweenEntries` and include them in the dateCalc paths. Find where `daysBetweenEntries` and `extendedDaysBetweenEntries` are mapped to paths and add the same mapping for `monthEndDaysBetweenEntries`.

- [ ] **Step 9: Build and verify**

```bash
pnpm build 2>&1 | tail -20
```

- [ ] **Step 10: Commit**

```bash
git add src/data/dateCalcData.ts src/pages/calculate/\[...slug\].astro
git commit -m "feat: expand date calc pSEO — 730 days, more holidays, extended ranges"
```

---

### Task 3: Expand Compound Interest Pages (864 → ~2,000)

**Files:**
- Modify: `src/data/compoundInterestData.ts`

- [ ] **Step 1: Add more principals, rates, and periods**

Replace the three arrays:

```typescript
const principals = [1000, 2000, 5000, 10000, 15000, 25000, 50000, 75000, 100000, 150000, 250000, 500000]
const rates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 20]
const periods = [1, 2, 3, 5, 7, 10, 15, 20, 25, 30, 40]
```

This gives: 12 principals × 14 rates × 11 periods = **1,848 entries**.

- [ ] **Step 2: Verify count**

```bash
npx tsx -e "import { compoundInterestEntries } from './src/data/compoundInterestData.ts'; console.log('CI entries:', compoundInterestEntries.length)"
```

Expected: 1,848.

- [ ] **Step 3: Build and verify**

```bash
pnpm build 2>&1 | tail -20
```

- [ ] **Step 4: Commit**

```bash
git add src/data/compoundInterestData.ts
git commit -m "feat: expand compound interest pSEO — 12 principals, 14 rates, 11 periods"
```

---

### Task 4: Expand Loan Calculator Pages (480 → ~1,500)

**Files:**
- Modify: `src/data/loanCalcData.ts`

- [ ] **Step 1: Add more amounts, rates, and terms**

Replace the three arrays:

```typescript
const amounts = [5000, 10000, 15000, 25000, 50000, 75000, 100000, 150000, 175000, 200000, 250000, 300000, 350000, 400000, 500000, 600000, 750000, 1000000]
const rates = [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 9, 10]
const terms = [5, 10, 15, 20, 25, 30]
```

This gives: 18 amounts × 13 rates × 6 terms = **1,404 entries**.

Note: The slug format uses integer rates. For fractional rates like 3.5, the slug becomes `loan-5000-at-3.5-percent-5-years`. Check if the existing slug pattern handles this. If it uses `rate` directly in template literals, 3.5 will be fine as a JS number stringifies correctly.

- [ ] **Step 2: Verify count and slug format**

```bash
npx tsx -e "
import { loanEntries } from './src/data/loanCalcData.ts';
console.log('Loan entries:', loanEntries.length);
console.log('Sample slugs:', loanEntries.filter(e => e.rate === 3.5).slice(0, 3).map(e => e.slug));
"
```

Expected: 1,404 entries. Slugs should look like `loan-5000-at-3.5-percent-5-years`.

- [ ] **Step 3: Build and verify**

```bash
pnpm build 2>&1 | tail -20
```

- [ ] **Step 4: Commit**

```bash
git add src/data/loanCalcData.ts
git commit -m "feat: expand loan pSEO — 18 amounts, 13 rates including half-points"
```

---

### Task 5: Expand Percentage Calculator Pages (2,340 → ~7,500)

**Files:**
- Modify: `src/data/percentages.ts`

- [ ] **Step 1: Expand percentage values**

Replace the `percentages` array:

```typescript
export const percentages = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 33, 35, 40, 45, 50, 55, 60, 65,
  70, 75, 80, 85, 90, 95, 100, 110, 120, 125, 150, 200, 250, 300, 500,
]
```

This adds: 21-29 individually (9 new), 26-29 (4 new — 26-29 weren't there), plus 110, 120, 125, 150, 200, 250, 300, 500. Total: ~53 values (up from 38).

- [ ] **Step 2: Expand base values**

Replace the `bases` array:

```typescript
export const bases = [
  5, 8, 10, 12, 15, 16, 18, 20, 22, 24, 25, 28, 30, 32, 35, 36, 40, 42, 45,
  48, 50, 55, 60, 64, 65, 70, 72, 75, 80, 84, 90, 96, 100, 110, 120, 125,
  128, 140, 150, 160, 175, 180, 200, 220, 225, 240, 250, 256, 280, 300,
  320, 350, 360, 400, 450, 480, 500, 512, 600, 700, 750, 800, 900, 1000,
  1200, 1500, 1800, 2000, 2400, 2500, 3000, 3500, 4000, 5000, 6000, 7500,
  8000, 10000, 12000, 15000, 20000, 25000, 50000, 100000,
]
```

~84 base values (up from 40).

Forward: 53 × 84 = 4,452 entries.
Reverse: subset where x <= y, estimated ~2,800.
Total: ~7,250.

- [ ] **Step 3: Verify count**

```bash
npx tsx -e "
import { percentageEntries, reversePercentageEntries } from './src/data/percentages.ts';
console.log('Forward:', percentageEntries.length, 'Reverse:', reversePercentageEntries.length, 'Total:', percentageEntries.length + reversePercentageEntries.length);
"
```

Expected: ~7,000-7,500 total.

- [ ] **Step 4: Build and verify**

```bash
pnpm build 2>&1 | tail -20
```

- [ ] **Step 5: Commit**

```bash
git add src/data/percentages.ts
git commit -m "feat: expand percentage pSEO — 53 values, 84 bases"
```

---

### Task 6: Expand Hash Lookup Pages (1,000 → ~2,000)

**Files:**
- Modify: `src/data/hashes.ts`

- [ ] **Step 1: Read current words list**

Read `src/data/hashes.ts` to see the current `words` array (250 words × 4 algorithms = 1,000 pages).

- [ ] **Step 2: Add 250 more words**

Add these 250 common English words to the `words` array (after the existing 250). Choose words people commonly hash for testing/verification:

```typescript
// Additional 250 words (total 500)
'account', 'address', 'agent', 'alert', 'algorithm', 'analytics', 'anchor', 'angular',
'apache', 'archive', 'array', 'asset', 'async', 'audit', 'azure', 'backend',
'backup', 'balance', 'bandwidth', 'baseline', 'batch', 'beacon', 'binary', 'bitmap',
'blockchain', 'boolean', 'bootstrap', 'browser', 'bucket', 'buffer', 'bundle', 'bypass',
'cache', 'callback', 'canvas', 'capture', 'cascade', 'catalog', 'certificate', 'channel',
'chart', 'checkpoint', 'cipher', 'circuit', 'cleanup', 'client', 'clipboard', 'closure',
'cluster', 'codec', 'column', 'command', 'commit', 'compile', 'component', 'compress',
'compute', 'config', 'connect', 'console', 'constant', 'container', 'context', 'contract',
'control', 'convert', 'cookie', 'core', 'counter', 'coverage', 'crash', 'credential',
'cron', 'cursor', 'cycle', 'daemon', 'dashboard', 'dataset', 'debug', 'decimal',
'declare', 'decrypt', 'default', 'delegate', 'deploy', 'deprecated', 'descriptor', 'desktop',
'detect', 'device', 'diagram', 'digest', 'digital', 'directive', 'directory', 'disable',
'dispatch', 'display', 'docker', 'document', 'domain', 'download', 'driver', 'dropdown',
'dynamic', 'editor', 'element', 'embed', 'emit', 'enable', 'encode', 'encrypt',
'endpoint', 'engine', 'entity', 'entry', 'enum', 'environment', 'error', 'escape',
'evaluate', 'event', 'exception', 'exchange', 'execute', 'exit', 'expand', 'export',
'express', 'extend', 'extract', 'factory', 'feature', 'fetch', 'field', 'filter',
'firebase', 'firmware', 'fixture', 'flag', 'flash', 'float', 'flush', 'folder',
'footer', 'format', 'forward', 'fragment', 'frame', 'framework', 'function', 'gateway',
'generate', 'generic', 'global', 'gradle', 'graph', 'grid', 'guard', 'handler',
'hardware', 'header', 'heap', 'helper', 'hidden', 'hook', 'hostname', 'hover',
'http', 'hybrid', 'icon', 'identity', 'iframe', 'image', 'implement', 'import',
'inbox', 'increment', 'index', 'initial', 'inject', 'inline', 'input', 'insert',
'inspect', 'install', 'instance', 'integer', 'integrate', 'interface', 'internal', 'interval',
'invoke', 'iterate', 'javascript', 'jenkins', 'kernel', 'keyword', 'lambda', 'layout',
'legacy', 'library', 'license', 'lifecycle', 'limit', 'linear', 'link', 'listener',
'literal', 'loader', 'locale', 'logger', 'logic', 'lookup', 'loop', 'machine',
'macro', 'manager', 'manifest', 'mapping', 'margin', 'marker', 'marshal', 'matrix',
'memory', 'merge', 'message', 'metadata', 'method', 'metric', 'middleware', 'migrate',
'minimal', 'mirror', 'mobile', 'modal', 'module', 'monitor', 'mount', 'mutex',
'namespace', 'native', 'navigate', 'network', 'nginx', 'node', 'notify', 'nullable',
```

Note: Avoid duplicates with existing words. The agent should read the existing list first and filter these.

- [ ] **Step 3: Verify count**

```bash
npx tsx -e "import { hashEntries } from './src/data/hashes.ts'; console.log('Hash entries:', hashEntries.length)"
```

Expected: ~2,000 (500 words × 4 algorithms).

- [ ] **Step 4: Build and verify**

```bash
pnpm build 2>&1 | tail -20
```

- [ ] **Step 5: Commit**

```bash
git add src/data/hashes.ts
git commit -m "feat: expand hash pSEO — 500 words × 4 algorithms"
```

---

### Task 7: Expand BMI Pages (180 → ~500)

**Files:**
- Modify: `src/data/bmiData.ts`

- [ ] **Step 1: Read current BMI data structure**

Read `src/data/bmiData.ts` to understand the current preset generation (heights and weights).

- [ ] **Step 2: Expand height and weight ranges**

Add more height-weight combinations. Currently uses a subset of common heights and weights. Expand to cover:
- Heights: 4'10" to 6'6" in 1" increments (21 heights, if not already)
- Weights: 90 to 300 lbs in 10 lb increments (22 weights)
- Metric: 150cm to 200cm in 5cm increments × 40kg to 140kg in 5kg increments

The exact approach depends on the current data structure — the agent must read the file first and expand accordingly.

Target: ~450-550 entries.

- [ ] **Step 3: Verify count**

```bash
npx tsx -e "import { bmiPresets } from './src/data/bmiData.ts'; console.log('BMI presets:', bmiPresets.length)"
```

- [ ] **Step 4: Build and verify**

```bash
pnpm build 2>&1 | tail -20
```

- [ ] **Step 5: Commit**

```bash
git add src/data/bmiData.ts
git commit -m "feat: expand BMI pSEO — more height-weight combinations"
```

---

### Task 8: Expand Mortgage Pages (154 → ~500)

**Files:**
- Modify: `src/data/mortgageData.ts`

- [ ] **Step 1: Read current mortgage data structure**

Read `src/data/mortgageData.ts` to understand the current preset generation.

- [ ] **Step 2: Expand home prices, rates, and terms**

Add more combinations. The agent must read the current structure first, then add:
- More home prices: 100K, 150K, 175K, 225K, 275K, 325K, 375K, 425K, 475K, 550K, 650K, 750K, 850K, 1M, 1.5M, 2M
- More rates: 3%, 3.5%, 4%, 4.5%, 5%, 5.5%, 6%, 6.5%, 7%, 7.5%, 8%
- Terms: 10, 15, 20, 25, 30 years

Target: ~450-550 entries.

- [ ] **Step 3: Verify count**

```bash
npx tsx -e "import { mortgagePresets } from './src/data/mortgageData.ts'; console.log('Mortgage presets:', mortgagePresets.length)"
```

- [ ] **Step 4: Build and verify**

```bash
pnpm build 2>&1 | tail -20
```

- [ ] **Step 5: Commit**

```bash
git add src/data/mortgageData.ts
git commit -m "feat: expand mortgage pSEO — more prices, rates, terms"
```

---

## Verification

After all tasks complete:

```bash
pnpm build 2>&1 | tail -5
```

Expected: ~71,000-75,000 pages, 0 errors.

## Execution Notes

- All 8 tasks are fully independent — can run in parallel via subagent-driven development
- Tasks 1-6 have exact code. Tasks 7-8 require reading the data file first (agent must adapt).
- No new templates, routes, or components needed.
- Build time will increase proportionally (~120-140s estimated).
