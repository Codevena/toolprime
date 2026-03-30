# Phase 5b — 5 New Tools + ~18,000 pSEO Pages

> **STATUS: COMPLETED (2026-03-30)**
> Implemented all 9 tasks via subagent-driven development (Session 9).
> Result: 53,969 total pages (+4,471 from Phase 5b), 40 tools, 0 TypeScript errors.
> Actual pSEO counts lower than estimates due to timezone pair deduplication and conservative entry generation.
> Commits: 8f1f74c through 75c062b (8 commits).
> Note: Used vanilla Canvas API for charts instead of Chart.js (no new dependency needed).

**Goal:** Add 5 new tools (Time Zone Converter, Date Calculator, Compound Interest Calculator, Loan/EMI Calculator, Aspect Ratio Calculator) with ~18,000 programmatic SEO pages, growing the site from ~49,500 to ~67,500 pages.

**Architecture:** Each tool follows the established pattern: React component (`src/components/tools/`), Astro tool page (`src/pages/`), data file (`src/data/`), pSEO Astro template (`src/components/pseo/`), pSEO page route, SEO meta functions, schema markup, FAQs, SEO content, and registration in tools.ts / audienceHubs.ts / faqs.ts. All tools are client-side only (no server APIs). pSEO pages are generated at build time via `getStaticPaths()`.

**Tech Stack:** Astro 6, React 19, TypeScript 5.9, Tailwind 4, Intl API (time zones), Chart.js (compound interest charts — lazy loaded via CDN). No new npm dependencies required except chart.js for compound interest visualization.

---

## File Structure

### New Files to Create

```
src/components/tools/
├── TimezoneConverter.tsx          — Interactive timezone converter (Intl API)
├── DateCalculator.tsx             — Days between dates, X days from today
├── CompoundInterestCalculator.tsx — Amount/rate/period inputs + Chart.js chart
├── LoanCalculator.tsx             — Loan amount/rate/term + amortization table
└── AspectRatioCalculator.tsx      — Width/height inputs, ratio detection

src/data/
├── timezoneData.ts                — City/timezone definitions + pSEO entry generation
├── dateCalcData.ts                — Holiday list + "X days from today" entries
├── compoundInterestData.ts        — Amount/rate/period combos for pSEO
├── loanData.ts                    — Loan amount/rate/term combos for pSEO
└── aspectRatioData.ts             — Resolution/device combos for pSEO

src/components/pseo/
├── TimezoneConversionPage.astro   — pSEO template for timezone pair pages
├── CityTimePage.astro             — pSEO template for "time in city" pages
├── DateCalcPage.astro             — pSEO template for date calculation pages
├── CompoundInterestPage.astro     — pSEO template for interest calculation pages
├── LoanCalcPage.astro             — pSEO template for loan calculation pages
└── AspectRatioPage.astro          — pSEO template for resolution/device pages

src/pages/
├── timezone-converter.astro       — Tool page
├── date-calculator.astro          — Tool page
├── compound-interest-calculator.astro — Tool page
├── loan-calculator.astro          — Tool page
├── aspect-ratio-calculator.astro  — Tool page
└── time/
    └── [...slug].astro            — pSEO route for city time + timezone pair pages

src/data/
└── tool-content-13.ts             — SEO content for all 5 new tools
```

### Files to Modify

```
src/data/tools.ts                  — Add 5 tool entries + audience map entries
src/data/tool-content.ts           — Import tool-content-13
src/data/faqs.ts                   — Add FAQ entries for 5 tools
src/data/audienceHubs.ts           — Add tools to everyday/design subcategories
src/pages/calculate/[...slug].astro — Add date calc, compound interest, loan pSEO routes
src/pages/og/[id].png.ts           — No change needed (auto-generates from tools array)
src/lib/seo.ts                     — Add meta functions for new pSEO page types
src/lib/schema.ts                  — Add schema functions for new pSEO page types
```

---

## Task 1: Time Zone Converter — Data + React Component

**Files:**
- Create: `src/data/timezoneData.ts`
- Create: `src/components/tools/TimezoneConverter.tsx`

- [x] **Step 1: Create timezone data file**

Create `src/data/timezoneData.ts`:

```typescript
export interface City {
  name: string
  slug: string
  timezone: string
  country: string
  flag: string
}

export interface TimezonePairEntry {
  slug: string
  from: City
  to: City
}

export interface CityTimeEntry {
  slug: string
  city: City
}

// 100 cities covering major world cities across all continents
export const cities: City[] = [
  // North America (20)
  { name: 'New York', slug: 'new-york', timezone: 'America/New_York', country: 'US', flag: '\u{1F1FA}\u{1F1F8}' },
  { name: 'Los Angeles', slug: 'los-angeles', timezone: 'America/Los_Angeles', country: 'US', flag: '\u{1F1FA}\u{1F1F8}' },
  { name: 'Chicago', slug: 'chicago', timezone: 'America/Chicago', country: 'US', flag: '\u{1F1FA}\u{1F1F8}' },
  { name: 'Houston', slug: 'houston', timezone: 'America/Chicago', country: 'US', flag: '\u{1F1FA}\u{1F1F8}' },
  { name: 'Phoenix', slug: 'phoenix', timezone: 'America/Phoenix', country: 'US', flag: '\u{1F1FA}\u{1F1F8}' },
  { name: 'Denver', slug: 'denver', timezone: 'America/Denver', country: 'US', flag: '\u{1F1FA}\u{1F1F8}' },
  { name: 'San Francisco', slug: 'san-francisco', timezone: 'America/Los_Angeles', country: 'US', flag: '\u{1F1FA}\u{1F1F8}' },
  { name: 'Seattle', slug: 'seattle', timezone: 'America/Los_Angeles', country: 'US', flag: '\u{1F1FA}\u{1F1F8}' },
  { name: 'Miami', slug: 'miami', timezone: 'America/New_York', country: 'US', flag: '\u{1F1FA}\u{1F1F8}' },
  { name: 'Toronto', slug: 'toronto', timezone: 'America/Toronto', country: 'CA', flag: '\u{1F1E8}\u{1F1E6}' },
  { name: 'Vancouver', slug: 'vancouver', timezone: 'America/Vancouver', country: 'CA', flag: '\u{1F1E8}\u{1F1E6}' },
  { name: 'Mexico City', slug: 'mexico-city', timezone: 'America/Mexico_City', country: 'MX', flag: '\u{1F1F2}\u{1F1FD}' },
  { name: 'Honolulu', slug: 'honolulu', timezone: 'Pacific/Honolulu', country: 'US', flag: '\u{1F1FA}\u{1F1F8}' },
  { name: 'Anchorage', slug: 'anchorage', timezone: 'America/Anchorage', country: 'US', flag: '\u{1F1FA}\u{1F1F8}' },
  // South America (6)
  { name: 'S\u00e3o Paulo', slug: 'sao-paulo', timezone: 'America/Sao_Paulo', country: 'BR', flag: '\u{1F1E7}\u{1F1F7}' },
  { name: 'Buenos Aires', slug: 'buenos-aires', timezone: 'America/Argentina/Buenos_Aires', country: 'AR', flag: '\u{1F1E6}\u{1F1F7}' },
  { name: 'Bogot\u00e1', slug: 'bogota', timezone: 'America/Bogota', country: 'CO', flag: '\u{1F1E8}\u{1F1F4}' },
  { name: 'Lima', slug: 'lima', timezone: 'America/Lima', country: 'PE', flag: '\u{1F1F5}\u{1F1EA}' },
  { name: 'Santiago', slug: 'santiago', timezone: 'America/Santiago', country: 'CL', flag: '\u{1F1E8}\u{1F1F1}' },
  { name: 'Rio de Janeiro', slug: 'rio-de-janeiro', timezone: 'America/Sao_Paulo', country: 'BR', flag: '\u{1F1E7}\u{1F1F7}' },
  // Europe (20)
  { name: 'London', slug: 'london', timezone: 'Europe/London', country: 'GB', flag: '\u{1F1EC}\u{1F1E7}' },
  { name: 'Paris', slug: 'paris', timezone: 'Europe/Paris', country: 'FR', flag: '\u{1F1EB}\u{1F1F7}' },
  { name: 'Berlin', slug: 'berlin', timezone: 'Europe/Berlin', country: 'DE', flag: '\u{1F1E9}\u{1F1EA}' },
  { name: 'Madrid', slug: 'madrid', timezone: 'Europe/Madrid', country: 'ES', flag: '\u{1F1EA}\u{1F1F8}' },
  { name: 'Rome', slug: 'rome', timezone: 'Europe/Rome', country: 'IT', flag: '\u{1F1EE}\u{1F1F9}' },
  { name: 'Amsterdam', slug: 'amsterdam', timezone: 'Europe/Amsterdam', country: 'NL', flag: '\u{1F1F3}\u{1F1F1}' },
  { name: 'Zurich', slug: 'zurich', timezone: 'Europe/Zurich', country: 'CH', flag: '\u{1F1E8}\u{1F1ED}' },
  { name: 'Stockholm', slug: 'stockholm', timezone: 'Europe/Stockholm', country: 'SE', flag: '\u{1F1F8}\u{1F1EA}' },
  { name: 'Oslo', slug: 'oslo', timezone: 'Europe/Oslo', country: 'NO', flag: '\u{1F1F3}\u{1F1F4}' },
  { name: 'Copenhagen', slug: 'copenhagen', timezone: 'Europe/Copenhagen', country: 'DK', flag: '\u{1F1E9}\u{1F1F0}' },
  { name: 'Helsinki', slug: 'helsinki', timezone: 'Europe/Helsinki', country: 'FI', flag: '\u{1F1EB}\u{1F1EE}' },
  { name: 'Warsaw', slug: 'warsaw', timezone: 'Europe/Warsaw', country: 'PL', flag: '\u{1F1F5}\u{1F1F1}' },
  { name: 'Prague', slug: 'prague', timezone: 'Europe/Prague', country: 'CZ', flag: '\u{1F1E8}\u{1F1FF}' },
  { name: 'Vienna', slug: 'vienna', timezone: 'Europe/Vienna', country: 'AT', flag: '\u{1F1E6}\u{1F1F9}' },
  { name: 'Lisbon', slug: 'lisbon', timezone: 'Europe/Lisbon', country: 'PT', flag: '\u{1F1F5}\u{1F1F9}' },
  { name: 'Athens', slug: 'athens', timezone: 'Europe/Athens', country: 'GR', flag: '\u{1F1EC}\u{1F1F7}' },
  { name: 'Moscow', slug: 'moscow', timezone: 'Europe/Moscow', country: 'RU', flag: '\u{1F1F7}\u{1F1FA}' },
  { name: 'Istanbul', slug: 'istanbul', timezone: 'Europe/Istanbul', country: 'TR', flag: '\u{1F1F9}\u{1F1F7}' },
  { name: 'Bucharest', slug: 'bucharest', timezone: 'Europe/Bucharest', country: 'RO', flag: '\u{1F1F7}\u{1F1F4}' },
  { name: 'Dublin', slug: 'dublin', timezone: 'Europe/Dublin', country: 'IE', flag: '\u{1F1EE}\u{1F1EA}' },
  // Asia (25)
  { name: 'Tokyo', slug: 'tokyo', timezone: 'Asia/Tokyo', country: 'JP', flag: '\u{1F1EF}\u{1F1F5}' },
  { name: 'Shanghai', slug: 'shanghai', timezone: 'Asia/Shanghai', country: 'CN', flag: '\u{1F1E8}\u{1F1F3}' },
  { name: 'Beijing', slug: 'beijing', timezone: 'Asia/Shanghai', country: 'CN', flag: '\u{1F1E8}\u{1F1F3}' },
  { name: 'Hong Kong', slug: 'hong-kong', timezone: 'Asia/Hong_Kong', country: 'HK', flag: '\u{1F1ED}\u{1F1F0}' },
  { name: 'Singapore', slug: 'singapore', timezone: 'Asia/Singapore', country: 'SG', flag: '\u{1F1F8}\u{1F1EC}' },
  { name: 'Dubai', slug: 'dubai', timezone: 'Asia/Dubai', country: 'AE', flag: '\u{1F1E6}\u{1F1EA}' },
  { name: 'Mumbai', slug: 'mumbai', timezone: 'Asia/Kolkata', country: 'IN', flag: '\u{1F1EE}\u{1F1F3}' },
  { name: 'Delhi', slug: 'delhi', timezone: 'Asia/Kolkata', country: 'IN', flag: '\u{1F1EE}\u{1F1F3}' },
  { name: 'Bangalore', slug: 'bangalore', timezone: 'Asia/Kolkata', country: 'IN', flag: '\u{1F1EE}\u{1F1F3}' },
  { name: 'Seoul', slug: 'seoul', timezone: 'Asia/Seoul', country: 'KR', flag: '\u{1F1F0}\u{1F1F7}' },
  { name: 'Bangkok', slug: 'bangkok', timezone: 'Asia/Bangkok', country: 'TH', flag: '\u{1F1F9}\u{1F1ED}' },
  { name: 'Jakarta', slug: 'jakarta', timezone: 'Asia/Jakarta', country: 'ID', flag: '\u{1F1EE}\u{1F1E9}' },
  { name: 'Taipei', slug: 'taipei', timezone: 'Asia/Taipei', country: 'TW', flag: '\u{1F1F9}\u{1F1FC}' },
  { name: 'Kuala Lumpur', slug: 'kuala-lumpur', timezone: 'Asia/Kuala_Lumpur', country: 'MY', flag: '\u{1F1F2}\u{1F1FE}' },
  { name: 'Manila', slug: 'manila', timezone: 'Asia/Manila', country: 'PH', flag: '\u{1F1F5}\u{1F1ED}' },
  { name: 'Karachi', slug: 'karachi', timezone: 'Asia/Karachi', country: 'PK', flag: '\u{1F1F5}\u{1F1F0}' },
  { name: 'Dhaka', slug: 'dhaka', timezone: 'Asia/Dhaka', country: 'BD', flag: '\u{1F1E7}\u{1F1E9}' },
  { name: 'Riyadh', slug: 'riyadh', timezone: 'Asia/Riyadh', country: 'SA', flag: '\u{1F1F8}\u{1F1E6}' },
  { name: 'Tel Aviv', slug: 'tel-aviv', timezone: 'Asia/Jerusalem', country: 'IL', flag: '\u{1F1EE}\u{1F1F1}' },
  { name: 'Ho Chi Minh City', slug: 'ho-chi-minh-city', timezone: 'Asia/Ho_Chi_Minh', country: 'VN', flag: '\u{1F1FB}\u{1F1F3}' },
  { name: 'Kolkata', slug: 'kolkata', timezone: 'Asia/Kolkata', country: 'IN', flag: '\u{1F1EE}\u{1F1F3}' },
  { name: 'Osaka', slug: 'osaka', timezone: 'Asia/Tokyo', country: 'JP', flag: '\u{1F1EF}\u{1F1F5}' },
  { name: 'Hanoi', slug: 'hanoi', timezone: 'Asia/Ho_Chi_Minh', country: 'VN', flag: '\u{1F1FB}\u{1F1F3}' },
  { name: 'Doha', slug: 'doha', timezone: 'Asia/Qatar', country: 'QA', flag: '\u{1F1F6}\u{1F1E6}' },
  { name: 'Colombo', slug: 'colombo', timezone: 'Asia/Colombo', country: 'LK', flag: '\u{1F1F1}\u{1F1F0}' },
  // Africa (8)
  { name: 'Cairo', slug: 'cairo', timezone: 'Africa/Cairo', country: 'EG', flag: '\u{1F1EA}\u{1F1EC}' },
  { name: 'Lagos', slug: 'lagos', timezone: 'Africa/Lagos', country: 'NG', flag: '\u{1F1F3}\u{1F1EC}' },
  { name: 'Nairobi', slug: 'nairobi', timezone: 'Africa/Nairobi', country: 'KE', flag: '\u{1F1F0}\u{1F1EA}' },
  { name: 'Johannesburg', slug: 'johannesburg', timezone: 'Africa/Johannesburg', country: 'ZA', flag: '\u{1F1FF}\u{1F1E6}' },
  { name: 'Cape Town', slug: 'cape-town', timezone: 'Africa/Johannesburg', country: 'ZA', flag: '\u{1F1FF}\u{1F1E6}' },
  { name: 'Accra', slug: 'accra', timezone: 'Africa/Accra', country: 'GH', flag: '\u{1F1EC}\u{1F1ED}' },
  { name: 'Casablanca', slug: 'casablanca', timezone: 'Africa/Casablanca', country: 'MA', flag: '\u{1F1F2}\u{1F1E6}' },
  { name: 'Addis Ababa', slug: 'addis-ababa', timezone: 'Africa/Addis_Ababa', country: 'ET', flag: '\u{1F1EA}\u{1F1F9}' },
  // Oceania (5)
  { name: 'Sydney', slug: 'sydney', timezone: 'Australia/Sydney', country: 'AU', flag: '\u{1F1E6}\u{1F1FA}' },
  { name: 'Melbourne', slug: 'melbourne', timezone: 'Australia/Melbourne', country: 'AU', flag: '\u{1F1E6}\u{1F1FA}' },
  { name: 'Brisbane', slug: 'brisbane', timezone: 'Australia/Brisbane', country: 'AU', flag: '\u{1F1E6}\u{1F1FA}' },
  { name: 'Perth', slug: 'perth', timezone: 'Australia/Perth', country: 'AU', flag: '\u{1F1E6}\u{1F1FA}' },
  { name: 'Auckland', slug: 'auckland', timezone: 'Pacific/Auckland', country: 'NZ', flag: '\u{1F1F3}\u{1F1FF}' },
]

// 30 "anchor" cities for cross-pair generation (most searched timezone conversions)
const anchorSlugs = [
  'new-york', 'los-angeles', 'chicago', 'london', 'paris', 'berlin',
  'tokyo', 'shanghai', 'singapore', 'dubai', 'mumbai', 'sydney',
  'toronto', 'hong-kong', 'seoul', 'sao-paulo', 'moscow', 'istanbul',
  'bangkok', 'jakarta', 'cairo', 'lagos', 'nairobi', 'auckland',
  'mexico-city', 'buenos-aires', 'denver', 'miami', 'seattle', 'johannesburg',
]

function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug)
}

/** Generate timezone pair pSEO entries: anchor cities × all other cities */
function generateTimezonePairEntries(): TimezonePairEntry[] {
  const entries: TimezonePairEntry[] = []
  const seen = new Set<string>()

  for (const anchorSlug of anchorSlugs) {
    const from = getCityBySlug(anchorSlug)
    if (!from) continue

    for (const to of cities) {
      if (from.slug === to.slug) continue
      // Skip pairs in same timezone
      if (from.timezone === to.timezone) continue

      const slug = `${from.slug}-to-${to.slug}`
      const reverseSlug = `${to.slug}-to-${from.slug}`
      // Only generate one direction per pair
      if (seen.has(slug) || seen.has(reverseSlug)) continue
      seen.add(slug)

      entries.push({ slug, from, to })
    }
  }

  return entries
}

/** Generate city time pSEO entries: one per city */
function generateCityTimeEntries(): CityTimeEntry[] {
  return cities.map((city) => ({
    slug: city.slug,
    city,
  }))
}

export const timezonePairEntries = generateTimezonePairEntries()
export const cityTimeEntries = generateCityTimeEntries()

/** Get UTC offset string for a timezone (e.g., "UTC+5:30") */
export function getUtcOffset(timezone: string, date: Date = new Date()): string {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    timeZoneName: 'shortOffset',
  })
  const parts = formatter.formatToParts(date)
  const tzPart = parts.find((p) => p.type === 'timeZoneName')
  return tzPart?.value ?? 'UTC'
}

/** Format time in a given timezone */
export function formatTimeInZone(timezone: string, date: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(date)
}

/** Format date in a given timezone */
export function formatDateInZone(timezone: string, date: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

/** Get the hour difference between two timezones */
export function getHourDifference(from: string, to: string, date: Date = new Date()): number {
  const fromOffset = getOffsetMinutes(from, date)
  const toOffset = getOffsetMinutes(to, date)
  return (toOffset - fromOffset) / 60
}

function getOffsetMinutes(timezone: string, date: Date): number {
  const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }))
  const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }))
  return (tzDate.getTime() - utcDate.getTime()) / 60000
}

export function getRelatedCityEntries(currentSlug: string, limit = 8): CityTimeEntry[] {
  return cityTimeEntries.filter((e) => e.slug !== currentSlug).slice(0, limit)
}

export function getRelatedPairEntries(fromSlug: string, toSlug: string, limit = 8): TimezonePairEntry[] {
  return timezonePairEntries
    .filter((e) => e.from.slug !== fromSlug || e.to.slug !== toSlug)
    .filter((e) => e.from.slug === fromSlug || e.to.slug === toSlug)
    .slice(0, limit)
}
```

- [x] **Step 2: Create TimezoneConverter React component**

Create `src/components/tools/TimezoneConverter.tsx`:

```tsx
import { useState, useMemo, useEffect } from 'react'

// Inline a compact subset for the interactive tool
const popularCities = [
  { name: 'New York', timezone: 'America/New_York' },
  { name: 'Los Angeles', timezone: 'America/Los_Angeles' },
  { name: 'Chicago', timezone: 'America/Chicago' },
  { name: 'Denver', timezone: 'America/Denver' },
  { name: 'London', timezone: 'Europe/London' },
  { name: 'Paris', timezone: 'Europe/Paris' },
  { name: 'Berlin', timezone: 'Europe/Berlin' },
  { name: 'Moscow', timezone: 'Europe/Moscow' },
  { name: 'Istanbul', timezone: 'Europe/Istanbul' },
  { name: 'Dubai', timezone: 'Asia/Dubai' },
  { name: 'Mumbai', timezone: 'Asia/Kolkata' },
  { name: 'Singapore', timezone: 'Asia/Singapore' },
  { name: 'Hong Kong', timezone: 'Asia/Hong_Kong' },
  { name: 'Shanghai', timezone: 'Asia/Shanghai' },
  { name: 'Tokyo', timezone: 'Asia/Tokyo' },
  { name: 'Seoul', timezone: 'Asia/Seoul' },
  { name: 'Sydney', timezone: 'Australia/Sydney' },
  { name: 'Auckland', timezone: 'Pacific/Auckland' },
  { name: 'S\u00e3o Paulo', timezone: 'America/Sao_Paulo' },
  { name: 'Toronto', timezone: 'America/Toronto' },
  { name: 'Mexico City', timezone: 'America/Mexico_City' },
  { name: 'Cairo', timezone: 'Africa/Cairo' },
  { name: 'Lagos', timezone: 'Africa/Lagos' },
  { name: 'Nairobi', timezone: 'Africa/Nairobi' },
  { name: 'Johannesburg', timezone: 'Africa/Johannesburg' },
]

interface TimezoneConverterProps {
  defaultFrom?: string
  defaultTo?: string
}

export function TimezoneConverter({ defaultFrom, defaultTo }: TimezoneConverterProps) {
  const [fromTz, setFromTz] = useState(defaultFrom ?? 'America/New_York')
  const [toTz, setToTz] = useState(defaultTo ?? 'Europe/London')
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const fromTime = useMemo(() => formatTime(fromTz, now), [fromTz, now])
  const toTime = useMemo(() => formatTime(toTz, now), [toTz, now])
  const fromDate = useMemo(() => formatDate(fromTz, now), [fromTz, now])
  const toDate = useMemo(() => formatDate(toTz, now), [toTz, now])
  const fromOffset = useMemo(() => getOffset(fromTz, now), [fromTz, now])
  const toOffset = useMemo(() => getOffset(toTz, now), [toTz, now])

  const hourTable = useMemo(() => {
    const rows: { fromHour: string; toHour: string }[] = []
    for (let h = 0; h < 24; h++) {
      const base = new Date(now)
      base.setHours(h, 0, 0, 0)
      // Adjust: pretend "fromTz" is at hour h
      const fromStr = new Intl.DateTimeFormat('en-US', {
        timeZone: fromTz, hour: '2-digit', minute: '2-digit', hour12: true,
      }).format(base)
      const toStr = new Intl.DateTimeFormat('en-US', {
        timeZone: toTz, hour: '2-digit', minute: '2-digit', hour12: true,
      }).format(base)
      rows.push({ fromHour: fromStr, toHour: toStr })
    }
    return rows
  }, [fromTz, toTz, now])

  function swap() {
    setFromTz(toTz)
    setToTz(fromTz)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-end">
        <div>
          <label htmlFor="from-tz" className="block text-sm font-medium mb-1">From</label>
          <select
            id="from-tz"
            value={fromTz}
            onChange={(e) => setFromTz(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-3 py-2 text-[var(--color-text)]"
          >
            {popularCities.map((c) => (
              <option key={c.timezone + c.name} value={c.timezone}>{c.name}</option>
            ))}
          </select>
        </div>

        <button
          onClick={swap}
          className="self-end rounded-lg border border-[var(--color-border)] px-3 py-2 hover:bg-[var(--color-surface-alt)] transition-colors"
          aria-label="Swap timezones"
        >
          \u21C4
        </button>

        <div>
          <label htmlFor="to-tz" className="block text-sm font-medium mb-1">To</label>
          <select
            id="to-tz"
            value={toTz}
            onChange={(e) => setToTz(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-3 py-2 text-[var(--color-text)]"
          >
            {popularCities.map((c) => (
              <option key={c.timezone + c.name} value={c.timezone}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Live clocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4 text-center" role="status" aria-live="polite">
          <p className="text-3xl font-bold font-mono">{fromTime}</p>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">{fromDate}</p>
          <p className="text-xs text-[var(--color-text-muted)]">{fromOffset}</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4 text-center" role="status" aria-live="polite">
          <p className="text-3xl font-bold font-mono">{toTime}</p>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">{toDate}</p>
          <p className="text-xs text-[var(--color-text-muted)]">{toOffset}</p>
        </div>
      </div>

      {/* Hour-by-hour table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <caption className="sr-only">Hour-by-hour time comparison</caption>
          <thead>
            <tr className="border-b border-[var(--color-border)]">
              <th scope="col" className="text-left py-2 px-3 font-medium">
                {popularCities.find((c) => c.timezone === fromTz)?.name ?? fromTz}
              </th>
              <th scope="col" className="text-left py-2 px-3 font-medium">
                {popularCities.find((c) => c.timezone === toTz)?.name ?? toTz}
              </th>
            </tr>
          </thead>
          <tbody>
            {hourTable.map((row, i) => (
              <tr key={i} className="border-b border-[var(--color-border)] last:border-0">
                <td className="py-1.5 px-3 font-mono">{row.fromHour}</td>
                <td className="py-1.5 px-3 font-mono">{row.toHour}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function formatTime(tz: string, date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
  }).format(date)
}

function formatDate(tz: string, date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: tz, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  }).format(date)
}

function getOffset(tz: string, date: Date): string {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: tz, timeZoneName: 'shortOffset',
  })
  const parts = formatter.formatToParts(date)
  return parts.find((p) => p.type === 'timeZoneName')?.value ?? 'UTC'
}
```

- [x] **Step 3: Build and verify no TypeScript errors**

```bash
npx tsc --noEmit
```

Expected: 0 errors.

- [x] **Step 4: Commit**

```bash
git add src/data/timezoneData.ts src/components/tools/TimezoneConverter.tsx
git commit -m "feat(timezone): add timezone data and converter component"
```

---

## Task 2: Time Zone Converter — pSEO Templates + Page Routes

**Files:**
- Create: `src/components/pseo/TimezoneConversionPage.astro`
- Create: `src/components/pseo/CityTimePage.astro`
- Create: `src/pages/time/[...slug].astro`
- Modify: `src/lib/seo.ts` — add `getTimezonePairMeta`, `getCityTimeMeta`
- Modify: `src/lib/schema.ts` — add `timezoneFaqSchema`

- [x] **Step 1: Add SEO meta functions**

Add to `src/lib/seo.ts`:

```typescript
export function getTimezonePairMeta(fromName: string, toName: string, fromSlug: string, toSlug: string): MetaTags {
  return {
    title: `${fromName} to ${toName} — Time Zone Converter | ${SITE_NAME}`,
    description: `Convert time between ${fromName} and ${toName}. See current time, hour-by-hour comparison, and UTC offset difference.`,
    canonical: `${SITE_URL}/time/${fromSlug}-to-${toSlug}`,
    ogTitle: `${fromName} to ${toName} Time Converter`,
    ogDescription: `Convert time between ${fromName} and ${toName} instantly.`,
    ogType: 'website',
  }
}

export function getCityTimeMeta(cityName: string, citySlug: string): MetaTags {
  return {
    title: `Current Time in ${cityName} — Live Clock | ${SITE_NAME}`,
    description: `What time is it in ${cityName} right now? See the current local time, date, UTC offset, and timezone info for ${cityName}.`,
    canonical: `${SITE_URL}/time/${citySlug}`,
    ogTitle: `Current Time in ${cityName}`,
    ogDescription: `Live clock showing the current time in ${cityName}.`,
    ogType: 'website',
  }
}
```

- [x] **Step 2: Add schema function**

Add to `src/lib/schema.ts`:

```typescript
export function timezoneFaqSchema(fromName: string, toName: string, hourDiff: number): string {
  const ahead = hourDiff >= 0 ? 'ahead of' : 'behind'
  const diff = Math.abs(hourDiff)
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the time difference between ${fromName} and ${toName}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${toName} is ${diff} hour${diff !== 1 ? 's' : ''} ${ahead} ${fromName}.`,
        },
      },
      {
        '@type': 'Question',
        name: `When it is 9 AM in ${fromName}, what time is it in ${toName}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `When it is 9:00 AM in ${fromName}, it is ${formatHourOffset(9, hourDiff)} in ${toName}.`,
        },
      },
    ],
  })
}

function formatHourOffset(hour: number, diff: number): string {
  let h = (hour + diff) % 24
  if (h < 0) h += 24
  const period = h >= 12 ? 'PM' : 'AM'
  const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h
  return `${displayHour}:00 ${period}`
}
```

- [x] **Step 3: Create TimezoneConversionPage.astro**

Create `src/components/pseo/TimezoneConversionPage.astro`:

```astro
---
import Breadcrumbs from '@/components/seo/Breadcrumbs.astro'
import SchemaMarkup from '@/components/seo/SchemaMarkup.astro'
import AdSlot from '@/components/ads/AdSlot.astro'
import { TimezoneConverter } from '@/components/tools/TimezoneConverter'
import {
  getUtcOffset,
  formatTimeInZone,
  formatDateInZone,
  getHourDifference,
  getRelatedPairEntries,
  type City,
} from '@/data/timezoneData'
import { timezoneFaqSchema } from '@/lib/schema'

interface Props {
  from: City
  to: City
}

const { from, to } = Astro.props
const now = new Date()
const hourDiff = getHourDifference(from.timezone, to.timezone, now)
const fromOffset = getUtcOffset(from.timezone, now)
const toOffset = getUtcOffset(to.timezone, now)
const related = getRelatedPairEntries(from.slug, to.slug, 8)
const ahead = hourDiff >= 0 ? 'ahead of' : 'behind'
const diff = Math.abs(hourDiff)
---

<SchemaMarkup json={timezoneFaqSchema(from.name, to.name, hourDiff)} />

<Breadcrumbs items={[
  { name: 'Time Zone Converter', url: 'https://toolprime.dev/timezone-converter' },
  { name: `${from.name} to ${to.name}`, url: `https://toolprime.dev/time/${from.slug}-to-${to.slug}` },
]} />

<h1 class="text-3xl font-bold mb-2">
  {from.flag} {from.name} to {to.flag} {to.name} — Time Difference
</h1>

<p class="text-[var(--color-text-muted)] mb-6">
  {to.name} is <strong>{diff} hour{diff !== 1 ? 's' : ''} {ahead} {from.name}</strong>.
  {from.name} is {fromOffset}, {to.name} is {toOffset}.
</p>

<AdSlot position="top" />

<div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4 sm:p-6 mb-8">
  <h2 class="text-lg font-semibold mb-4">Convert a Different Time</h2>
  <TimezoneConverter client:load defaultFrom={from.timezone} defaultTo={to.timezone} />
</div>

{/* Hour comparison table */}
<section class="mb-8" aria-labelledby="hour-table">
  <h2 id="hour-table" class="text-xl font-bold mb-4">Hour-by-Hour Comparison</h2>
  <div class="overflow-x-auto">
    <table class="w-full border-collapse text-sm">
      <caption class="sr-only">{from.name} to {to.name} hourly time comparison</caption>
      <thead>
        <tr class="border-b border-[var(--color-border)]">
          <th scope="col" class="text-left py-2 px-3 font-medium">{from.name}</th>
          <th scope="col" class="text-left py-2 px-3 font-medium">{to.name}</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 24 }, (_, h) => {
          const fromHour = h === 0 ? '12:00 AM' : h < 12 ? `${h}:00 AM` : h === 12 ? '12:00 PM' : `${h - 12}:00 PM`
          let toH = (h + hourDiff) % 24
          if (toH < 0) toH += 24
          const toHour = toH === 0 ? '12:00 AM' : toH < 12 ? `${toH}:00 AM` : toH === 12 ? '12:00 PM' : `${toH - 12}:00 PM`
          return (
            <tr class="border-b border-[var(--color-border)] last:border-0">
              <td class="py-1.5 px-3 font-mono">{fromHour}</td>
              <td class="py-1.5 px-3 font-mono">{toHour}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
</section>

<AdSlot position="bottom" />

{related.length > 0 && (
  <section aria-labelledby="related-tz">
    <h2 id="related-tz" class="text-xl font-bold mb-4">Related Time Zone Conversions</h2>
    <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {related.map((r) => (
        <li>
          <a href={`/time/${r.slug}`} class="text-[var(--color-primary)] hover:underline">
            {r.from.flag} {r.from.name} to {r.to.flag} {r.to.name}
          </a>
        </li>
      ))}
    </ul>
  </section>
)}
```

- [x] **Step 4: Create CityTimePage.astro**

Create `src/components/pseo/CityTimePage.astro`:

```astro
---
import Breadcrumbs from '@/components/seo/Breadcrumbs.astro'
import AdSlot from '@/components/ads/AdSlot.astro'
import { TimezoneConverter } from '@/components/tools/TimezoneConverter'
import {
  getUtcOffset,
  formatTimeInZone,
  formatDateInZone,
  getRelatedCityEntries,
  type City,
} from '@/data/timezoneData'

interface Props {
  city: City
}

const { city } = Astro.props
const now = new Date()
const offset = getUtcOffset(city.timezone, now)
const time = formatTimeInZone(city.timezone, now)
const date = formatDateInZone(city.timezone, now)
const related = getRelatedCityEntries(city.slug, 12)
---

<Breadcrumbs items={[
  { name: 'Time Zone Converter', url: 'https://toolprime.dev/timezone-converter' },
  { name: `Time in ${city.name}`, url: `https://toolprime.dev/time/${city.slug}` },
]} />

<h1 class="text-3xl font-bold mb-2">
  {city.flag} Current Time in {city.name}
</h1>

<div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-6 mb-6 text-center">
  <p class="text-4xl font-bold font-mono" role="status" aria-live="polite">{time}</p>
  <p class="text-[var(--color-text-muted)] mt-2">{date}</p>
  <p class="text-sm text-[var(--color-text-muted)]">{city.timezone} ({offset})</p>
</div>

<AdSlot position="top" />

<div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4 sm:p-6 mb-8">
  <h2 class="text-lg font-semibold mb-4">Convert to Another Time Zone</h2>
  <TimezoneConverter client:load defaultFrom={city.timezone} defaultTo="America/New_York" />
</div>

<section aria-labelledby="other-cities">
  <h2 id="other-cities" class="text-xl font-bold mb-4">Time in Other Cities</h2>
  <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
    {related.map((r) => (
      <li>
        <a href={`/time/${r.slug}`} class="text-[var(--color-primary)] hover:underline">
          {r.city.flag} {r.city.name}
        </a>
      </li>
    ))}
  </ul>
</section>
```

- [x] **Step 5: Create pSEO page route**

Create `src/pages/time/[...slug].astro`:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro'
import TimezoneConversionPage from '@/components/pseo/TimezoneConversionPage.astro'
import CityTimePage from '@/components/pseo/CityTimePage.astro'
import {
  timezonePairEntries,
  cityTimeEntries,
  type TimezonePairEntry,
  type CityTimeEntry,
} from '@/data/timezoneData'
import { getTimezonePairMeta, getCityTimeMeta, type MetaTags } from '@/lib/seo'

type PageProps =
  | { type: 'pair'; pair: TimezonePairEntry; cityTime: null }
  | { type: 'cityTime'; pair: null; cityTime: CityTimeEntry }

export function getStaticPaths() {
  const pairPaths = timezonePairEntries.map((entry) => ({
    params: { slug: entry.slug },
    props: { type: 'pair' as const, pair: entry, cityTime: null },
  }))

  const cityPaths = cityTimeEntries.map((entry) => ({
    params: { slug: entry.slug },
    props: { type: 'cityTime' as const, pair: null, cityTime: entry },
  }))

  return [...pairPaths, ...cityPaths]
}

const props = Astro.props as PageProps

let meta: MetaTags
if (props.type === 'pair') {
  meta = getTimezonePairMeta(props.pair.from.name, props.pair.to.name, props.pair.from.slug, props.pair.to.slug)
} else {
  meta = getCityTimeMeta(props.cityTime.city.name, props.cityTime.city.slug)
}
---

<BaseLayout {...meta}>
  {props.type === 'pair' && <TimezoneConversionPage from={props.pair.from} to={props.pair.to} />}
  {props.type === 'cityTime' && <CityTimePage city={props.cityTime.city} />}
</BaseLayout>
```

- [x] **Step 6: Build and verify**

```bash
rm -rf dist .astro && pnpm build
```

Expected: Build succeeds, new `/time/*` pages generated.

- [x] **Step 7: Commit**

```bash
git add src/components/pseo/TimezoneConversionPage.astro src/components/pseo/CityTimePage.astro \
  src/pages/time/ src/lib/seo.ts src/lib/schema.ts
git commit -m "feat(timezone): add pSEO page templates and routes"
```

---

## Task 3: Time Zone Converter — Tool Page + Registration

**Files:**
- Create: `src/pages/timezone-converter.astro`
- Modify: `src/data/tools.ts` — add tool entry + audience map
- Modify: `src/data/faqs.ts` — add FAQ entries
- Modify: `src/data/audienceHubs.ts` — add to everyday hub

- [x] **Step 1: Create tool page**

Create `src/pages/timezone-converter.astro`:

```astro
---
import ToolLayout from '@/layouts/ToolLayout.astro'
import { TimezoneConverter } from '@/components/tools/TimezoneConverter'
import { getToolById } from '@/data/tools'

const tool = getToolById('timezone-converter')
if (!tool) throw new Error('Tool not found: timezone-converter')
---

<ToolLayout tool={tool}>
  <TimezoneConverter client:load />

  <section slot="content" class="mt-8" aria-labelledby="how-to-use">
    <h2 id="how-to-use" class="text-xl font-bold mb-4">How to Use</h2>
    <ol class="step-list">
      <li>Select the city or timezone you want to convert from</li>
      <li>Select the destination city or timezone</li>
      <li>View the live clock comparison and hour-by-hour table</li>
      <li>Use the swap button to reverse the conversion</li>
    </ol>
  </section>
</ToolLayout>
```

- [x] **Step 2: Register tool in tools.ts**

Add to the `tools` array in `src/data/tools.ts` (before the closing `]`):

```typescript
  {
    id: 'timezone-converter',
    name: 'Time Zone Converter',
    description: 'Convert time between cities and time zones worldwide. Live clocks, hour-by-hour comparison table.',
    longDescription: 'Convert time between 100+ cities across all time zones. See live clocks, UTC offsets, and a full hour-by-hour comparison table. Uses the Intl API — no external dependencies.',
    category: 'math',
    path: '/timezone-converter',
    icon: 'Globe',
    keywords: ['timezone', 'time zone', 'world clock', 'time converter', 'city time'],
    relatedTools: ['date-calculator', 'currency-converter', 'unit-converter'],
  },
```

Add to `toolAudienceMap`:

```typescript
  'timezone-converter': 'everyday',
```

- [x] **Step 3: Add FAQ entries**

Add to `src/data/faqs.ts`:

```typescript
  'timezone-converter': [
    { question: 'How does the time zone converter work?', answer: 'The converter uses the built-in Intl API and the IANA timezone database to calculate exact time differences between cities. It accounts for daylight saving time changes automatically.' },
    { question: 'Does it handle daylight saving time?', answer: 'Yes. The converter uses real timezone rules from the IANA database, which includes all historical and current DST transitions. The hour difference may change when a region enters or exits DST.' },
    { question: 'Is my data safe?', answer: 'Yes. All time calculations happen locally in your browser using built-in JavaScript APIs. No data is sent to any server.' },
  ],
```

- [x] **Step 4: Add to audience hub**

In `src/data/audienceHubs.ts`, add `'timezone-converter'` to the everyday hub's "Converters" subcategory `toolIds` array:

```typescript
toolIds: ['currency-converter', 'unit-converter', 'timezone-converter'],
```

- [x] **Step 5: Build and verify**

```bash
npx tsc --noEmit && rm -rf dist .astro && pnpm build
```

- [x] **Step 6: Commit**

```bash
git add src/pages/timezone-converter.astro src/data/tools.ts src/data/faqs.ts src/data/audienceHubs.ts
git commit -m "feat(timezone): add tool page and register in navigation"
```

---

## Task 4: Date Calculator — Data + Component + Page

**Files:**
- Create: `src/data/dateCalcData.ts`
- Create: `src/components/tools/DateCalculator.tsx`
- Create: `src/pages/date-calculator.astro`
- Create: `src/components/pseo/DateCalcPage.astro`
- Modify: `src/pages/calculate/[...slug].astro` — add date calc entries
- Modify: `src/lib/seo.ts` — add `getDateCalcMeta`
- Modify: `src/lib/schema.ts` — add `dateCalcFaqSchema`
- Modify: `src/data/tools.ts` — add tool entry
- Modify: `src/data/faqs.ts` — add FAQs
- Modify: `src/data/audienceHubs.ts` — add to everyday hub

- [x] **Step 1: Create date calculator data**

Create `src/data/dateCalcData.ts`:

```typescript
export interface DaysFromTodayEntry {
  slug: string
  days: number
}

export interface HolidayCountdownEntry {
  slug: string
  name: string
  month: number  // 1-12
  day: number
  year?: number  // fixed year for specific dates, omit for annual
}

export interface DaysBetweenEntry {
  slug: string
  fromMonth: number
  fromDay: number
  toMonth: number
  toDay: number
}

const monthNames = ['january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december']

const monthLabels = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']

export { monthLabels }

// "X days from today" pages: 1-365 + popular values
const daysValues = [
  ...Array.from({ length: 365 }, (_, i) => i + 1),
  400, 500, 730, 1000, 1095, 1460, 1825,
]

export const daysFromTodayEntries: DaysFromTodayEntry[] = daysValues.map((d) => ({
  slug: `${d}-days-from-today`,
  days: d,
}))

// Holiday countdowns (annual)
export const holidays: HolidayCountdownEntry[] = [
  { slug: 'days-until-new-years-day', name: "New Year's Day", month: 1, day: 1 },
  { slug: 'days-until-valentines-day', name: "Valentine's Day", month: 2, day: 14 },
  { slug: 'days-until-st-patricks-day', name: "St. Patrick's Day", month: 3, day: 17 },
  { slug: 'days-until-april-fools-day', name: "April Fools' Day", month: 4, day: 1 },
  { slug: 'days-until-earth-day', name: 'Earth Day', month: 4, day: 22 },
  { slug: 'days-until-mothers-day', name: "Mother's Day (US)", month: 5, day: 11 },
  { slug: 'days-until-fathers-day', name: "Father's Day (US)", month: 6, day: 15 },
  { slug: 'days-until-independence-day', name: 'Independence Day (US)', month: 7, day: 4 },
  { slug: 'days-until-labor-day', name: 'Labor Day (US)', month: 9, day: 1 },
  { slug: 'days-until-halloween', name: 'Halloween', month: 10, day: 31 },
  { slug: 'days-until-veterans-day', name: 'Veterans Day', month: 11, day: 11 },
  { slug: 'days-until-thanksgiving', name: 'Thanksgiving (US)', month: 11, day: 27 },
  { slug: 'days-until-christmas-eve', name: 'Christmas Eve', month: 12, day: 24 },
  { slug: 'days-until-christmas', name: 'Christmas Day', month: 12, day: 25 },
  { slug: 'days-until-new-years-eve', name: "New Year's Eve", month: 12, day: 31 },
  { slug: 'days-until-black-friday', name: 'Black Friday', month: 11, day: 28 },
  { slug: 'days-until-cyber-monday', name: 'Cyber Monday', month: 12, day: 1 },
  // International
  { slug: 'days-until-chinese-new-year', name: 'Chinese New Year', month: 1, day: 29 },
  { slug: 'days-until-international-womens-day', name: "International Women's Day", month: 3, day: 8 },
  { slug: 'days-until-world-environment-day', name: 'World Environment Day', month: 6, day: 5 },
  { slug: 'days-until-oktoberfest', name: 'Oktoberfest', month: 9, day: 20 },
  { slug: 'days-until-diwali', name: 'Diwali', month: 10, day: 20 },
  { slug: 'days-until-hanukkah', name: 'Hanukkah', month: 12, day: 14 },
  { slug: 'days-until-ramadan', name: 'Ramadan', month: 2, day: 28 },
  { slug: 'days-until-eid-al-fitr', name: 'Eid al-Fitr', month: 3, day: 30 },
]

// Days between two dates (popular date ranges)
const dateRangePairs: [number, number, number, number][] = []
// Generate month-to-month for same year: jan 1 to each month 1
for (let m = 2; m <= 12; m++) {
  dateRangePairs.push([1, 1, m, 1])
}
// Quarter boundaries
dateRangePairs.push([1, 1, 3, 31], [4, 1, 6, 30], [7, 1, 9, 30], [10, 1, 12, 31])
// Common ranges
dateRangePairs.push(
  [1, 1, 6, 30], [1, 1, 12, 31], [6, 1, 12, 31],
  [1, 1, 7, 4], [1, 1, 10, 31], [1, 1, 2, 14],
)

export const daysBetweenEntries: DaysBetweenEntry[] = dateRangePairs.map(([fm, fd, tm, td]) => ({
  slug: `days-between-${monthNames[fm - 1]}-${fd}-and-${monthNames[tm - 1]}-${td}`,
  fromMonth: fm,
  fromDay: fd,
  toMonth: tm,
  toDay: td,
}))

// Total: ~372 days-from-today + 25 holidays + ~21 days-between = ~418 pages
// Additional: week number pages
export interface WeekNumberEntry {
  slug: string
  week: number
}

export const weekNumberEntries: WeekNumberEntry[] = Array.from({ length: 53 }, (_, i) => ({
  slug: `week-${i + 1}`,
  week: i + 1,
}))

// Grand total: ~418 + 53 = ~471 date calc pages
// To reach 5,000+ we also generate "X weeks from today" and "X months from today"
export interface WeeksFromTodayEntry {
  slug: string
  weeks: number
}

export const weeksFromTodayEntries: WeeksFromTodayEntry[] = Array.from({ length: 104 }, (_, i) => ({
  slug: `${i + 1}-weeks-from-today`,
  weeks: i + 1,
}))

export interface MonthsFromTodayEntry {
  slug: string
  months: number
}

export const monthsFromTodayEntries: MonthsFromTodayEntry[] = Array.from({ length: 60 }, (_, i) => ({
  slug: `${i + 1}-months-from-today`,
  months: i + 1,
}))

// X days ago
export interface DaysAgoEntry {
  slug: string
  days: number
}

const daysAgoValues = Array.from({ length: 365 }, (_, i) => i + 1)

export const daysAgoEntries: DaysAgoEntry[] = daysAgoValues.map((d) => ({
  slug: `${d}-days-ago`,
  days: d,
}))

// Grand total: 372 + 25 + 21 + 53 + 104 + 60 + 365 = ~1,000 date calc pages
// Plus days-between for more month/day combos below

// Extended days-between: every 15th and last day of each month vs Jan 1
const extendedDateRanges: [number, number, number, number][] = []
for (let m = 1; m <= 12; m++) {
  extendedDateRanges.push([1, 1, m, 15])
  const lastDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1]
  if (m > 1) extendedDateRanges.push([1, 1, m, lastDay])
}
// Each month start to year end
for (let m = 1; m <= 11; m++) {
  extendedDateRanges.push([m, 1, 12, 31])
}

export const extendedDaysBetweenEntries: DaysBetweenEntry[] = extendedDateRanges
  .filter(([fm, fd, tm, td]) => {
    const slug = `days-between-${monthNames[fm - 1]}-${fd}-and-${monthNames[tm - 1]}-${td}`
    return !daysBetweenEntries.some((e) => e.slug === slug)
  })
  .map(([fm, fd, tm, td]) => ({
    slug: `days-between-${monthNames[fm - 1]}-${fd}-and-${monthNames[tm - 1]}-${td}`,
    fromMonth: fm,
    fromDay: fd,
    toMonth: tm,
    toDay: td,
  }))

// All date calc entries combined
export const allDateCalcSlugs = [
  ...daysFromTodayEntries.map((e) => e.slug),
  ...holidays.map((e) => e.slug),
  ...daysBetweenEntries.map((e) => e.slug),
  ...extendedDaysBetweenEntries.map((e) => e.slug),
  ...weekNumberEntries.map((e) => e.slug),
  ...weeksFromTodayEntries.map((e) => e.slug),
  ...monthsFromTodayEntries.map((e) => e.slug),
  ...daysAgoEntries.map((e) => e.slug),
]

/** Calculate date X days from a reference date */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

/** Calculate days between two dates */
export function daysBetween(a: Date, b: Date): number {
  const diff = Math.abs(b.getTime() - a.getTime())
  return Math.round(diff / (1000 * 60 * 60 * 24))
}

/** Calculate days until a holiday this year or next */
export function daysUntilHoliday(month: number, day: number): { days: number; date: Date } {
  const now = new Date()
  const thisYear = new Date(now.getFullYear(), month - 1, day)
  if (thisYear > now) {
    return { days: daysBetween(now, thisYear), date: thisYear }
  }
  const nextYear = new Date(now.getFullYear() + 1, month - 1, day)
  return { days: daysBetween(now, nextYear), date: nextYear }
}

/** Format a date as "January 1, 2026" */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}
```

- [x] **Step 2: Create DateCalculator React component**

Create `src/components/tools/DateCalculator.tsx`:

```tsx
import { useState, useMemo } from 'react'

export function DateCalculator() {
  const [mode, setMode] = useState<'between' | 'add' | 'subtract'>('between')
  const [date1, setDate1] = useState(toInputDate(new Date()))
  const [date2, setDate2] = useState(toInputDate(addDaysLocal(new Date(), 30)))
  const [daysToAdd, setDaysToAdd] = useState(30)

  const result = useMemo(() => {
    if (mode === 'between') {
      const d1 = new Date(date1)
      const d2 = new Date(date2)
      const diffMs = Math.abs(d2.getTime() - d1.getTime())
      const days = Math.round(diffMs / (1000 * 60 * 60 * 24))
      const weeks = Math.floor(days / 7)
      const remainingDays = days % 7
      return { days, weeks, remainingDays, resultDate: null }
    }

    const base = new Date(date1)
    const offset = mode === 'add' ? daysToAdd : -daysToAdd
    const resultDate = addDaysLocal(base, offset)
    const days = Math.abs(offset)
    return { days, weeks: Math.floor(days / 7), remainingDays: days % 7, resultDate }
  }, [mode, date1, date2, daysToAdd])

  return (
    <div className="space-y-6">
      {/* Mode selector */}
      <div className="flex gap-2 flex-wrap">
        {(['between', 'add', 'subtract'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-lg border transition-colors text-sm font-medium ${
              mode === m
                ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                : 'border-[var(--color-border)] hover:bg-[var(--color-surface-alt)]'
            }`}
          >
            {m === 'between' ? 'Days Between' : m === 'add' ? 'Add Days' : 'Subtract Days'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date1" className="block text-sm font-medium mb-1">
            {mode === 'between' ? 'Start Date' : 'Date'}
          </label>
          <input
            type="date"
            id="date1"
            value={date1}
            onChange={(e) => setDate1(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-3 py-2 text-[var(--color-text)]"
          />
        </div>

        {mode === 'between' ? (
          <div>
            <label htmlFor="date2" className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              id="date2"
              value={date2}
              onChange={(e) => setDate2(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-3 py-2 text-[var(--color-text)]"
            />
          </div>
        ) : (
          <div>
            <label htmlFor="days-input" className="block text-sm font-medium mb-1">Number of Days</label>
            <input
              type="number"
              id="days-input"
              value={daysToAdd}
              min={1}
              onChange={(e) => setDaysToAdd(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-3 py-2 text-[var(--color-text)]"
            />
          </div>
        )}
      </div>

      {/* Result */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-6 text-center" role="status" aria-live="polite">
        {mode === 'between' ? (
          <>
            <p className="text-3xl font-bold">{result.days.toLocaleString()} days</p>
            <p className="text-[var(--color-text-muted)] mt-2">
              {result.weeks} week{result.weeks !== 1 ? 's' : ''} and {result.remainingDays} day{result.remainingDays !== 1 ? 's' : ''}
            </p>
          </>
        ) : (
          <>
            <p className="text-lg text-[var(--color-text-muted)]">
              {result.days} days {mode === 'add' ? 'from' : 'before'} {formatDateDisplay(new Date(date1))}
            </p>
            <p className="text-3xl font-bold mt-1">
              {result.resultDate ? formatDateDisplay(result.resultDate) : ''}
            </p>
          </>
        )}
      </div>
    </div>
  )
}

function toInputDate(d: Date): string {
  return d.toISOString().slice(0, 10)
}

function addDaysLocal(d: Date, days: number): Date {
  const result = new Date(d)
  result.setDate(result.getDate() + days)
  return result
}

function formatDateDisplay(d: Date): string {
  return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}
```

- [x] **Step 3: Create DateCalcPage.astro pSEO template**

Create `src/components/pseo/DateCalcPage.astro`:

```astro
---
import Breadcrumbs from '@/components/seo/Breadcrumbs.astro'
import AdSlot from '@/components/ads/AdSlot.astro'
import { DateCalculator } from '@/components/tools/DateCalculator'
import { addDays, daysBetween, daysUntilHoliday, formatDate, monthLabels } from '@/data/dateCalcData'

interface Props {
  type: 'daysFromToday' | 'daysAgo' | 'weeksFromToday' | 'monthsFromToday' | 'holiday' | 'daysBetween' | 'weekNumber'
  days?: number
  weeks?: number
  months?: number
  holidayName?: string
  holidayMonth?: number
  holidayDay?: number
  fromMonth?: number
  fromDay?: number
  toMonth?: number
  toDay?: number
  weekNum?: number
  slug: string
}

const props = Astro.props
const now = new Date()

let heading = ''
let description = ''

if (props.type === 'daysFromToday' && props.days !== undefined) {
  const target = addDays(now, props.days)
  heading = `${props.days} Days From Today — ${formatDate(target)}`
  description = `${props.days} days from today is ${formatDate(target)}.`
} else if (props.type === 'daysAgo' && props.days !== undefined) {
  const target = addDays(now, -props.days)
  heading = `${props.days} Days Ago — ${formatDate(target)}`
  description = `${props.days} days ago was ${formatDate(target)}.`
} else if (props.type === 'weeksFromToday' && props.weeks !== undefined) {
  const target = addDays(now, props.weeks * 7)
  heading = `${props.weeks} Weeks From Today — ${formatDate(target)}`
  description = `${props.weeks} weeks (${props.weeks * 7} days) from today is ${formatDate(target)}.`
} else if (props.type === 'monthsFromToday' && props.months !== undefined) {
  const target = new Date(now)
  target.setMonth(target.getMonth() + props.months)
  heading = `${props.months} Months From Today — ${formatDate(target)}`
  description = `${props.months} months from today is ${formatDate(target)}.`
} else if (props.type === 'holiday' && props.holidayName && props.holidayMonth && props.holidayDay) {
  const { days, date } = daysUntilHoliday(props.holidayMonth, props.holidayDay)
  heading = `Days Until ${props.holidayName} — ${days} Days`
  description = `There are ${days} days until ${props.holidayName} on ${formatDate(date)}.`
} else if (props.type === 'daysBetween' && props.fromMonth && props.fromDay && props.toMonth && props.toDay) {
  const d1 = new Date(now.getFullYear(), props.fromMonth - 1, props.fromDay)
  const d2 = new Date(now.getFullYear(), props.toMonth - 1, props.toDay)
  const days = daysBetween(d1, d2)
  heading = `Days Between ${monthLabels[props.fromMonth - 1]} ${props.fromDay} and ${monthLabels[props.toMonth - 1]} ${props.toDay} — ${days} Days`
  description = `There are ${days} days between ${monthLabels[props.fromMonth - 1]} ${props.fromDay} and ${monthLabels[props.toMonth - 1]} ${props.toDay}.`
} else if (props.type === 'weekNumber' && props.weekNum) {
  heading = `Week ${props.weekNum} — Dates and Calendar`
  description = `Week ${props.weekNum} of the year: dates, start day, and days remaining.`
}
---

<Breadcrumbs items={[
  { name: 'Date Calculator', url: 'https://toolprime.dev/date-calculator' },
  { name: heading.split(' \u2014 ')[0], url: `https://toolprime.dev/calculate/${props.slug}` },
]} />

<h1 class="text-3xl font-bold mb-2">{heading}</h1>
<p class="text-[var(--color-text-muted)] mb-6">{description}</p>

<AdSlot position="top" />

<div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4 sm:p-6 mb-8">
  <h2 class="text-lg font-semibold mb-4">Try a Different Calculation</h2>
  <DateCalculator client:load />
</div>

<AdSlot position="bottom" />
```

- [x] **Step 4: Modify calculate/[...slug].astro to include date calc entries**

Add date calc imports and paths to `src/pages/calculate/[...slug].astro`. The `PageProps` union gets new variants for each date calc type, and `getStaticPaths` gets new path arrays from the date calc data. Follow the exact same pattern as the existing age/fraction entries — import all entry arrays from `dateCalcData.ts`, map them to paths with the correct `type` prop, and add the new pSEO component renders in the template section.

The key additions:
- Import all entry arrays and types from `@/data/dateCalcData`
- Import `DateCalcPage` from `@/components/pseo/DateCalcPage.astro`
- Import `getDateCalcMeta` from `@/lib/seo`
- Add `getDateCalcMeta` to `src/lib/seo.ts` — a single function that takes a slug and heading and returns standard meta tags with canonical at `/calculate/{slug}`
- Extend the `PageProps` union with date calc variants
- Map each entry array to paths in `getStaticPaths`
- Add rendering branch for date calc pages

- [x] **Step 5: Add SEO meta function**

Add to `src/lib/seo.ts`:

```typescript
export function getDateCalcMeta(slug: string, heading: string, description: string): MetaTags {
  return {
    title: `${heading} | ${SITE_NAME}`,
    description,
    canonical: `${SITE_URL}/calculate/${slug}`,
    ogTitle: heading,
    ogDescription: description,
    ogType: 'website',
  }
}
```

- [x] **Step 6: Create tool page and register**

Create `src/pages/date-calculator.astro` (same pattern as timezone-converter.astro).

Add tool entry to `src/data/tools.ts`:
```typescript
  {
    id: 'date-calculator',
    name: 'Date Calculator',
    description: 'Calculate days between dates, add or subtract days, weeks, and months. Holiday countdowns.',
    longDescription: 'Calculate the number of days between two dates, find the date X days from today, or count down to holidays and events. Includes week numbers and month calculations.',
    category: 'math',
    path: '/date-calculator',
    icon: 'CalendarDays',
    keywords: ['date calculator', 'days between dates', 'days from today', 'countdown', 'week number'],
    relatedTools: ['timezone-converter', 'age-calculator', 'percentage-calculator'],
  },
```

Add `'date-calculator': 'everyday'` to `toolAudienceMap`.

Add to everyday hub's "Calculators" subcategory in `audienceHubs.ts`.

Add FAQs to `faqs.ts`:
```typescript
  'date-calculator': [
    { question: 'How does the date calculator work?', answer: 'Enter two dates to find the difference in days, weeks, and months. Or enter a start date and number of days to add or subtract to find the resulting date. All calculations use standard calendar rules.' },
    { question: 'Does it account for leap years?', answer: 'Yes. The calculator uses JavaScript\'s built-in Date object which correctly handles leap years, including the 100-year and 400-year rules.' },
    { question: 'Is my data safe?', answer: 'Yes. All date calculations happen locally in your browser. No data is sent to any server.' },
  ],
```

- [x] **Step 7: Build and verify**

```bash
npx tsc --noEmit && rm -rf dist .astro && pnpm build
```

- [x] **Step 8: Commit**

```bash
git add src/data/dateCalcData.ts src/components/tools/DateCalculator.tsx \
  src/components/pseo/DateCalcPage.astro src/pages/date-calculator.astro \
  src/pages/calculate/ src/lib/seo.ts src/data/tools.ts src/data/faqs.ts src/data/audienceHubs.ts
git commit -m "feat(date-calc): add date calculator with pSEO pages"
```

---

## Task 5: Compound Interest Calculator — Data + Component + Page

**Files:**
- Create: `src/data/compoundInterestData.ts`
- Create: `src/components/tools/CompoundInterestCalculator.tsx`
- Create: `src/pages/compound-interest-calculator.astro`
- Create: `src/components/pseo/CompoundInterestPage.astro`
- Modify: `src/pages/calculate/[...slug].astro` — add compound interest entries
- Modify: `src/lib/seo.ts`
- Modify: `src/data/tools.ts`
- Modify: `src/data/faqs.ts`
- Modify: `src/data/audienceHubs.ts`

- [x] **Step 1: Create compound interest data**

Create `src/data/compoundInterestData.ts`:

```typescript
export interface CompoundInterestEntry {
  slug: string
  principal: number
  rate: number      // percentage (e.g., 7 for 7%)
  years: number
  result: number
}

const principals = [1000, 5000, 10000, 25000, 50000, 100000, 250000, 500000]
const rates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15]
const periods = [1, 2, 3, 5, 10, 15, 20, 25, 30]

function compoundInterest(principal: number, rate: number, years: number): number {
  return principal * Math.pow(1 + rate / 100, years)
}

function generateEntries(): CompoundInterestEntry[] {
  const entries: CompoundInterestEntry[] = []

  for (const p of principals) {
    for (const r of rates) {
      for (const y of periods) {
        const result = compoundInterest(p, r, y)
        const slug = `compound-interest-${p}-at-${r}-percent-for-${y}-years`
        entries.push({ slug, principal: p, rate: r, years: y, result })
      }
    }
  }

  return entries
}

export const compoundInterestEntries = generateEntries()
// 8 principals × 12 rates × 9 periods = 864 entries

export { compoundInterest }

export function formatMoney(v: number): string {
  return v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

export function getRelatedCompoundEntries(currentSlug: string, principal: number, rate: number): CompoundInterestEntry[] {
  return compoundInterestEntries
    .filter((e) => e.slug !== currentSlug && (e.principal === principal || e.rate === rate))
    .slice(0, 8)
}
```

- [x] **Step 2: Create CompoundInterestCalculator React component**

Create `src/components/tools/CompoundInterestCalculator.tsx`:

The component should have:
- Inputs: principal ($), annual rate (%), years, compounding frequency dropdown (annually/monthly/quarterly)
- Output: final amount, total interest earned, growth chart
- Chart: Use a canvas element and draw a simple bar chart with vanilla Canvas API (no external dependency needed — keeps bundle small). Show year-by-year growth with principal vs interest portions.
- Styling: Use CSS variables, Tailwind classes, same patterns as existing tools.
- Props: `defaultPrincipal?: number`, `defaultRate?: number`, `defaultYears?: number`

Key implementation notes:
- Use `useMemo` for all calculations
- Compounding formula: `A = P × (1 + r/n)^(n×t)` where n = compounding frequency
- Draw chart on a `<canvas>` element using `useEffect` + `useRef`
- Canvas should be responsive (use `ResizeObserver`)
- Show a summary table: Year | Balance | Interest Earned | Total Interest
- Accessible: `aria-live` on result, proper labels

- [x] **Step 3: Create CompoundInterestPage.astro pSEO template**

Create `src/components/pseo/CompoundInterestPage.astro`:

Pattern matches CurrencyConversionPage.astro — breadcrumbs, H1 with result, interactive tool pre-filled with entry values, growth table, related entries. The H1 shows e.g. "$10,000 at 7% for 10 Years = $19,672".

- [x] **Step 4: Add to calculate/[...slug].astro, seo.ts, tools.ts, faqs.ts, audienceHubs.ts**

Same registration pattern as date calculator. Add SEO meta function:

```typescript
export function getCompoundInterestMeta(principal: number, rate: number, years: number, result: number): MetaTags {
  const p = principal.toLocaleString('en-US')
  const r = result.toLocaleString('en-US', { maximumFractionDigits: 0 })
  return {
    title: `$${p} at ${rate}% for ${years} Years = $${r} | ${SITE_NAME}`,
    description: `$${p} invested at ${rate}% annual interest for ${years} years grows to $${r} with compound interest. Free calculator with growth chart.`,
    canonical: `${SITE_URL}/calculate/compound-interest-${principal}-at-${rate}-percent-for-${years}-years`,
    ogTitle: `Compound Interest: $${p} at ${rate}% for ${years} Years`,
    ogDescription: `$${p} grows to $${r} with compound interest.`,
    ogType: 'website',
  }
}
```

Tool entry:
```typescript
  {
    id: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    description: 'Calculate compound interest with visual growth chart. See how your investments grow over time.',
    longDescription: 'Calculate compound interest for any principal, rate, and time period. Includes a visual growth chart, year-by-year breakdown table, and support for different compounding frequencies.',
    category: 'math',
    path: '/compound-interest-calculator',
    icon: 'TrendingUp',
    keywords: ['compound interest', 'investment calculator', 'interest rate', 'savings growth'],
    relatedTools: ['loan-calculator', 'mortgage-calculator', 'percentage-calculator'],
  },
```

Audience: `'compound-interest-calculator': 'everyday'`. Hub: everyday > Calculators.

FAQs:
```typescript
  'compound-interest-calculator': [
    { question: 'What is compound interest?', answer: 'Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. This "interest on interest" effect causes wealth to grow exponentially over time, making it a powerful concept for long-term investing.' },
    { question: 'How is compound interest calculated?', answer: 'The formula is A = P(1 + r/n)^(nt), where P is the principal, r is the annual rate (as a decimal), n is the number of times interest compounds per year, and t is the number of years. Our calculator handles all of this automatically.' },
    { question: 'Is my data safe?', answer: 'Yes. All calculations happen locally in your browser. No financial data is sent to any server.' },
  ],
```

- [x] **Step 5: Build and verify**

```bash
npx tsc --noEmit && rm -rf dist .astro && pnpm build
```

- [x] **Step 6: Commit**

```bash
git add src/data/compoundInterestData.ts src/components/tools/CompoundInterestCalculator.tsx \
  src/components/pseo/CompoundInterestPage.astro src/pages/compound-interest-calculator.astro \
  src/pages/calculate/ src/lib/seo.ts src/data/tools.ts src/data/faqs.ts src/data/audienceHubs.ts
git commit -m "feat(compound-interest): add calculator with growth chart and pSEO"
```

---

## Task 6: Loan/EMI Calculator — Data + Component + Page

**Files:**
- Create: `src/data/loanCalcData.ts`
- Create: `src/components/tools/LoanCalculator.tsx`
- Create: `src/pages/loan-calculator.astro`
- Create: `src/components/pseo/LoanCalcPage.astro`
- Modify: `src/pages/calculate/[...slug].astro`
- Modify: `src/lib/seo.ts`
- Modify: `src/data/tools.ts`
- Modify: `src/data/faqs.ts`
- Modify: `src/data/audienceHubs.ts`

- [x] **Step 1: Create loan calculator data**

Create `src/data/loanCalcData.ts`:

```typescript
export interface LoanEntry {
  slug: string
  amount: number
  rate: number       // annual percentage
  years: number
  monthlyPayment: number
  totalPaid: number
  totalInterest: number
}

const amounts = [10000, 25000, 50000, 100000, 150000, 200000, 250000, 300000, 400000, 500000]
const rates = [3, 4, 5, 6, 7, 8, 9, 10]
const terms = [5, 10, 15, 20, 25, 30]

function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12
  const numPayments = years * 12
  if (monthlyRate === 0) return principal / numPayments
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)
}

function generateEntries(): LoanEntry[] {
  const entries: LoanEntry[] = []

  for (const amount of amounts) {
    for (const rate of rates) {
      for (const years of terms) {
        const monthlyPayment = calculateMonthlyPayment(amount, rate, years)
        const totalPaid = monthlyPayment * years * 12
        const totalInterest = totalPaid - amount
        const slug = `loan-${amount}-at-${rate}-percent-${years}-years`
        entries.push({ slug, amount, rate, years, monthlyPayment, totalPaid, totalInterest })
      }
    }
  }

  return entries
}

export const loanEntries = generateEntries()
// 10 amounts × 8 rates × 6 terms = 480 entries

export { calculateMonthlyPayment }

export function formatMoney(v: number): string {
  return v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

export function formatMoneyExact(v: number): string {
  return v.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export interface AmortizationRow {
  month: number
  payment: number
  principal: number
  interest: number
  balance: number
}

export function generateAmortization(amount: number, annualRate: number, years: number): AmortizationRow[] {
  const monthlyRate = annualRate / 100 / 12
  const numPayments = years * 12
  const payment = calculateMonthlyPayment(amount, annualRate, years)
  const rows: AmortizationRow[] = []
  let balance = amount

  for (let m = 1; m <= numPayments; m++) {
    const interest = balance * monthlyRate
    const principal = payment - interest
    balance -= principal
    rows.push({
      month: m,
      payment,
      principal,
      interest,
      balance: Math.max(0, balance),
    })
  }

  return rows
}

export function getRelatedLoanEntries(currentSlug: string, amount: number, rate: number): LoanEntry[] {
  return loanEntries
    .filter((e) => e.slug !== currentSlug && (e.amount === amount || e.rate === rate))
    .slice(0, 8)
}
```

- [x] **Step 2: Create LoanCalculator React component**

Create `src/components/tools/LoanCalculator.tsx`:

The component should have:
- Inputs: loan amount ($), annual interest rate (%), loan term (years), with number inputs
- Output: monthly payment, total payment, total interest
- Amortization table: collapsible, showing monthly breakdown (month, payment, principal, interest, remaining balance) — show first 12 months by default with "Show all" button
- Summary: pie chart (canvas) showing principal vs interest split
- Props: `defaultAmount?: number`, `defaultRate?: number`, `defaultYears?: number`
- Styling: CSS variables + Tailwind, matching existing tools

- [x] **Step 3: Create LoanCalcPage.astro pSEO template**

Similar to CompoundInterestPage. H1 shows e.g. "$300,000 Loan at 6% for 30 Years — $1,799/mo". Includes interactive tool pre-filled, yearly amortization summary table (not full monthly — too many rows for static), related entries.

- [x] **Step 4: Add to calculate/[...slug].astro, seo.ts, tools.ts, faqs.ts, audienceHubs.ts**

SEO meta function:
```typescript
export function getLoanCalcMeta(amount: number, rate: number, years: number, monthly: number): MetaTags {
  const a = amount.toLocaleString('en-US')
  const m = monthly.toLocaleString('en-US', { maximumFractionDigits: 0 })
  return {
    title: `$${a} Loan at ${rate}% for ${years} Years \u2014 $${m}/mo | ${SITE_NAME}`,
    description: `$${a} loan at ${rate}% interest for ${years} years: monthly payment $${m}. Free loan calculator with amortization schedule.`,
    canonical: `${SITE_URL}/calculate/loan-${amount}-at-${rate}-percent-${years}-years`,
    ogTitle: `$${a} Loan at ${rate}% for ${years} Years`,
    ogDescription: `Monthly payment: $${m}. Free loan calculator.`,
    ogType: 'website',
  }
}
```

Tool entry:
```typescript
  {
    id: 'loan-calculator',
    name: 'Loan Calculator',
    description: 'Calculate monthly loan payments and total interest. Full amortization schedule included.',
    longDescription: 'Calculate monthly payments for any loan amount, interest rate, and term. See total interest paid, view a complete amortization schedule, and compare different loan scenarios.',
    category: 'math',
    path: '/loan-calculator',
    icon: 'Landmark',
    keywords: ['loan calculator', 'EMI calculator', 'amortization', 'monthly payment', 'interest rate'],
    relatedTools: ['compound-interest-calculator', 'mortgage-calculator', 'percentage-calculator'],
  },
```

Audience: `'loan-calculator': 'everyday'`. Hub: everyday > Calculators.

FAQs:
```typescript
  'loan-calculator': [
    { question: 'How is the monthly payment calculated?', answer: 'Monthly payments are calculated using the standard amortization formula: M = P[r(1+r)^n]/[(1+r)^n-1], where P is the principal, r is the monthly interest rate, and n is the total number of payments. This ensures equal monthly payments over the loan term.' },
    { question: 'What is an amortization schedule?', answer: 'An amortization schedule shows how each monthly payment is split between principal and interest over the life of the loan. Early payments go mostly to interest, while later payments go mostly to principal.' },
    { question: 'Is my financial data safe?', answer: 'Yes. All calculations happen locally in your browser. No financial information is sent to any server or stored anywhere.' },
  ],
```

- [x] **Step 5: Build and verify**

```bash
npx tsc --noEmit && rm -rf dist .astro && pnpm build
```

- [x] **Step 6: Commit**

```bash
git add src/data/loanCalcData.ts src/components/tools/LoanCalculator.tsx \
  src/components/pseo/LoanCalcPage.astro src/pages/loan-calculator.astro \
  src/pages/calculate/ src/lib/seo.ts src/data/tools.ts src/data/faqs.ts src/data/audienceHubs.ts
git commit -m "feat(loan-calc): add loan calculator with amortization and pSEO"
```

---

## Task 7: Aspect Ratio Calculator — Data + Component + Page

**Files:**
- Create: `src/data/aspectRatioData.ts`
- Create: `src/components/tools/AspectRatioCalculator.tsx`
- Create: `src/pages/aspect-ratio-calculator.astro`
- Create: `src/components/pseo/AspectRatioPage.astro`
- Modify: `src/pages/calculate/[...slug].astro`
- Modify: `src/lib/seo.ts`
- Modify: `src/data/tools.ts`
- Modify: `src/data/faqs.ts`
- Modify: `src/data/audienceHubs.ts`

- [x] **Step 1: Create aspect ratio data**

Create `src/data/aspectRatioData.ts`:

```typescript
export interface AspectRatioEntry {
  slug: string
  width: number
  height: number
  ratio: string       // e.g., "16:9"
  ratioDecimal: number // e.g., 1.778
}

export interface DeviceEntry {
  slug: string
  name: string
  width: number
  height: number
  ratio: string
  ppi?: number
  category: string
}

function gcd(a: number, b: number): number {
  while (b) { [a, b] = [b, a % b] }
  return a
}

export function calculateRatio(w: number, h: number): string {
  const g = gcd(w, h)
  return `${w / g}:${h / g}`
}

// Common resolutions
const resolutions: [number, number][] = [
  // Standard displays
  [640, 480], [800, 600], [1024, 768], [1280, 720], [1280, 800],
  [1280, 1024], [1366, 768], [1440, 900], [1600, 900], [1680, 1050],
  [1920, 1080], [1920, 1200], [2048, 1080], [2560, 1080], [2560, 1440],
  [2560, 1600], [3440, 1440], [3840, 2160], [5120, 2880], [7680, 4320],
  // Social media & video
  [1080, 1080], [1080, 1350], [1080, 1920], [1200, 628], [1200, 630],
  [1920, 1080], [3840, 2160], [1280, 720],
  // Common aspect ratios with base widths
  [640, 360], [854, 480], [960, 540], [1024, 576],
  [320, 480], [375, 667], [390, 844], [414, 896], [430, 932],
]

// Deduplicate
const seenResolutions = new Set<string>()

export const aspectRatioEntries: AspectRatioEntry[] = resolutions
  .filter(([w, h]) => {
    const key = `${w}x${h}`
    if (seenResolutions.has(key)) return false
    seenResolutions.add(key)
    return true
  })
  .map(([w, h]) => ({
    slug: `aspect-ratio-${w}x${h}`,
    width: w,
    height: h,
    ratio: calculateRatio(w, h),
    ratioDecimal: w / h,
  }))

// Device pages
export const deviceEntries: DeviceEntry[] = [
  // iPhones
  { slug: 'iphone-16-pro-max-resolution', name: 'iPhone 16 Pro Max', width: 1320, height: 2868, ratio: '110:239', ppi: 460, category: 'Phone' },
  { slug: 'iphone-16-pro-resolution', name: 'iPhone 16 Pro', width: 1206, height: 2622, ratio: '201:437', ppi: 460, category: 'Phone' },
  { slug: 'iphone-16-resolution', name: 'iPhone 16', width: 1179, height: 2556, ratio: '393:852', ppi: 460, category: 'Phone' },
  { slug: 'iphone-15-pro-max-resolution', name: 'iPhone 15 Pro Max', width: 1290, height: 2796, ratio: '215:466', ppi: 460, category: 'Phone' },
  { slug: 'iphone-15-pro-resolution', name: 'iPhone 15 Pro', width: 1179, height: 2556, ratio: '393:852', ppi: 460, category: 'Phone' },
  { slug: 'iphone-15-resolution', name: 'iPhone 15', width: 1179, height: 2556, ratio: '393:852', ppi: 460, category: 'Phone' },
  { slug: 'iphone-14-resolution', name: 'iPhone 14', width: 1170, height: 2532, ratio: '195:422', ppi: 460, category: 'Phone' },
  { slug: 'iphone-se-resolution', name: 'iPhone SE', width: 750, height: 1334, ratio: '375:667', ppi: 326, category: 'Phone' },
  // Samsung
  { slug: 'samsung-galaxy-s24-ultra-resolution', name: 'Samsung Galaxy S24 Ultra', width: 1440, height: 3120, ratio: '6:13', ppi: 505, category: 'Phone' },
  { slug: 'samsung-galaxy-s24-resolution', name: 'Samsung Galaxy S24', width: 1080, height: 2340, ratio: '6:13', ppi: 416, category: 'Phone' },
  // iPads
  { slug: 'ipad-pro-13-resolution', name: 'iPad Pro 13"', width: 2064, height: 2752, ratio: '129:172', ppi: 264, category: 'Tablet' },
  { slug: 'ipad-pro-11-resolution', name: 'iPad Pro 11"', width: 1668, height: 2388, ratio: '139:199', ppi: 264, category: 'Tablet' },
  { slug: 'ipad-air-resolution', name: 'iPad Air', width: 1640, height: 2360, ratio: '41:59', ppi: 264, category: 'Tablet' },
  { slug: 'ipad-mini-resolution', name: 'iPad Mini', width: 1488, height: 2266, ratio: '744:1133', ppi: 326, category: 'Tablet' },
  // Monitors
  { slug: 'macbook-pro-16-resolution', name: 'MacBook Pro 16"', width: 3456, height: 2234, ratio: '1728:1117', ppi: 254, category: 'Laptop' },
  { slug: 'macbook-pro-14-resolution', name: 'MacBook Pro 14"', width: 3024, height: 1964, ratio: '756:491', ppi: 254, category: 'Laptop' },
  { slug: 'macbook-air-15-resolution', name: 'MacBook Air 15"', width: 2880, height: 1864, ratio: '360:233', ppi: 224, category: 'Laptop' },
  { slug: 'macbook-air-13-resolution', name: 'MacBook Air 13"', width: 2560, height: 1664, ratio: '160:104', ppi: 224, category: 'Laptop' },
  // Monitors
  { slug: '4k-monitor-resolution', name: '4K UHD Monitor', width: 3840, height: 2160, ratio: '16:9', ppi: 163, category: 'Monitor' },
  { slug: '1440p-monitor-resolution', name: 'QHD Monitor', width: 2560, height: 1440, ratio: '16:9', ppi: 109, category: 'Monitor' },
  { slug: '1080p-monitor-resolution', name: 'Full HD Monitor', width: 1920, height: 1080, ratio: '16:9', ppi: 92, category: 'Monitor' },
  { slug: 'ultrawide-monitor-resolution', name: 'Ultrawide Monitor', width: 3440, height: 1440, ratio: '43:18', ppi: 109, category: 'Monitor' },
  { slug: '5k-monitor-resolution', name: '5K Monitor', width: 5120, height: 2880, ratio: '16:9', ppi: 218, category: 'Monitor' },
  { slug: '8k-monitor-resolution', name: '8K Monitor', width: 7680, height: 4320, ratio: '16:9', ppi: 326, category: 'Monitor' },
]

// Total: ~35 resolution entries + ~24 device entries = ~59 pages
// Expand with common video/social media format pages

export interface VideoFormatEntry {
  slug: string
  name: string
  width: number
  height: number
  ratio: string
  platform: string
}

export const videoFormatEntries: VideoFormatEntry[] = [
  { slug: 'youtube-video-resolution', name: 'YouTube Video', width: 1920, height: 1080, ratio: '16:9', platform: 'YouTube' },
  { slug: 'youtube-shorts-resolution', name: 'YouTube Shorts', width: 1080, height: 1920, ratio: '9:16', platform: 'YouTube' },
  { slug: 'youtube-thumbnail-resolution', name: 'YouTube Thumbnail', width: 1280, height: 720, ratio: '16:9', platform: 'YouTube' },
  { slug: 'instagram-post-resolution', name: 'Instagram Post', width: 1080, height: 1080, ratio: '1:1', platform: 'Instagram' },
  { slug: 'instagram-story-resolution', name: 'Instagram Story', width: 1080, height: 1920, ratio: '9:16', platform: 'Instagram' },
  { slug: 'instagram-reel-resolution', name: 'Instagram Reel', width: 1080, height: 1920, ratio: '9:16', platform: 'Instagram' },
  { slug: 'tiktok-video-resolution', name: 'TikTok Video', width: 1080, height: 1920, ratio: '9:16', platform: 'TikTok' },
  { slug: 'facebook-post-resolution', name: 'Facebook Post', width: 1200, height: 630, ratio: '40:21', platform: 'Facebook' },
  { slug: 'facebook-cover-resolution', name: 'Facebook Cover', width: 820, height: 312, ratio: '205:78', platform: 'Facebook' },
  { slug: 'twitter-post-resolution', name: 'Twitter/X Post', width: 1600, height: 900, ratio: '16:9', platform: 'Twitter/X' },
  { slug: 'twitter-header-resolution', name: 'Twitter/X Header', width: 1500, height: 500, ratio: '3:1', platform: 'Twitter/X' },
  { slug: 'linkedin-post-resolution', name: 'LinkedIn Post', width: 1200, height: 627, ratio: '400:209', platform: 'LinkedIn' },
  { slug: 'linkedin-banner-resolution', name: 'LinkedIn Banner', width: 1584, height: 396, ratio: '4:1', platform: 'LinkedIn' },
  { slug: 'twitch-overlay-resolution', name: 'Twitch Overlay', width: 1920, height: 1080, ratio: '16:9', platform: 'Twitch' },
  { slug: 'og-image-resolution', name: 'OG Image', width: 1200, height: 630, ratio: '40:21', platform: 'Open Graph' },
  { slug: 'a4-paper-resolution', name: 'A4 Paper (300 DPI)', width: 2480, height: 3508, ratio: '620:877', platform: 'Print' },
  { slug: 'us-letter-resolution', name: 'US Letter (300 DPI)', width: 2550, height: 3300, ratio: '17:22', platform: 'Print' },
]

// Grand total: ~35 + 24 + 17 = ~76 aspect ratio pSEO pages
// To reach 1,000+, expand resolution entries with more combinations

const extraWidths = [320, 480, 720, 960, 1024, 1152, 1280, 1440, 1600, 1920, 2048, 2560, 3840]
const commonRatios: [number, number][] = [[16, 9], [4, 3], [21, 9], [1, 1], [3, 2], [16, 10], [9, 16]]

const extraResolutions: AspectRatioEntry[] = []
const extraSeen = new Set(aspectRatioEntries.map((e) => e.slug))

for (const w of extraWidths) {
  for (const [rw, rh] of commonRatios) {
    const h = Math.round((w * rh) / rw)
    const slug = `aspect-ratio-${w}x${h}`
    if (extraSeen.has(slug)) continue
    extraSeen.add(slug)
    extraResolutions.push({
      slug,
      width: w,
      height: h,
      ratio: `${rw}:${rh}`,
      ratioDecimal: w / h,
    })
  }
}

export const allAspectRatioEntries = [...aspectRatioEntries, ...extraResolutions]
// ~35 + ~80 extra = ~115 resolution entries + 24 devices + 17 video = ~156 pages

export function getRelatedAspectEntries(currentSlug: string, ratio: string): AspectRatioEntry[] {
  return allAspectRatioEntries
    .filter((e) => e.slug !== currentSlug && e.ratio === ratio)
    .slice(0, 8)
}
```

- [x] **Step 2: Create AspectRatioCalculator React component**

Create `src/components/tools/AspectRatioCalculator.tsx`:

The component should have:
- Two modes: "Calculate Ratio" (enter width + height → shows ratio) and "Resize" (enter width + ratio → calculates height, or height + ratio → calculates width)
- Visual preview: a bordered rectangle that scales to show the aspect ratio visually
- Quick-select buttons for common ratios (16:9, 4:3, 1:1, 21:9, 9:16)
- Output: ratio (e.g., "16:9"), decimal (1.778), megapixels
- Props: `defaultWidth?: number`, `defaultHeight?: number`

- [x] **Step 3: Create AspectRatioPage.astro pSEO template**

Two variants in the template: resolution pages (H1: "1920x1080 — 16:9 Aspect Ratio") and device pages (H1: "iPhone 15 Pro Max — Screen Resolution 1290x2796"). Both include the interactive calculator pre-filled and related entries.

- [x] **Step 4: Add to calculate/[...slug].astro, seo.ts, tools.ts, faqs.ts, audienceHubs.ts**

SEO meta:
```typescript
export function getAspectRatioMeta(width: number, height: number, ratio: string): MetaTags {
  return {
    title: `${width}x${height} Aspect Ratio \u2014 ${ratio} | ${SITE_NAME}`,
    description: `${width}x${height} has an aspect ratio of ${ratio}. Calculate aspect ratios, resize proportionally, and find equivalent resolutions.`,
    canonical: `${SITE_URL}/calculate/aspect-ratio-${width}x${height}`,
    ogTitle: `${width}x${height} Aspect Ratio \u2014 ${ratio}`,
    ogDescription: `Aspect ratio: ${ratio}. Free calculator.`,
    ogType: 'website',
  }
}

export function getDeviceResolutionMeta(name: string, slug: string, width: number, height: number): MetaTags {
  return {
    title: `${name} Screen Resolution \u2014 ${width}x${height} | ${SITE_NAME}`,
    description: `${name} screen resolution is ${width}x${height} pixels. See aspect ratio, PPI, and compare with other devices.`,
    canonical: `${SITE_URL}/calculate/${slug}`,
    ogTitle: `${name} Screen Resolution`,
    ogDescription: `${width}x${height} pixels. Free resolution calculator.`,
    ogType: 'website',
  }
}

export function getVideoFormatMeta(name: string, slug: string, width: number, height: number, platform: string): MetaTags {
  return {
    title: `${name} Resolution \u2014 ${width}x${height} | ${SITE_NAME}`,
    description: `${name} recommended resolution is ${width}x${height} (${platform}). See aspect ratio and sizing guide.`,
    canonical: `${SITE_URL}/calculate/${slug}`,
    ogTitle: `${name} Resolution \u2014 ${width}x${height}`,
    ogDescription: `${platform} optimal size: ${width}x${height}.`,
    ogType: 'website',
  }
}
```

Tool entry:
```typescript
  {
    id: 'aspect-ratio-calculator',
    name: 'Aspect Ratio Calculator',
    description: 'Calculate aspect ratios, resize proportionally, and find device screen resolutions.',
    longDescription: 'Calculate the aspect ratio of any resolution, resize images proportionally, and look up screen resolutions for popular devices. Includes social media and video format guides.',
    category: 'design',
    path: '/aspect-ratio-calculator',
    icon: 'Monitor',
    keywords: ['aspect ratio', 'resolution', 'screen size', 'resize', 'proportion', 'device resolution'],
    relatedTools: ['image-compressor', 'css-gradient-generator', 'favicon-generator'],
  },
```

Audience: `'aspect-ratio-calculator': 'design'`. Hub: design > add new "Layout" subcategory:
```typescript
{
  name: 'Layout',
  toolIds: ['aspect-ratio-calculator'],
},
```

FAQs:
```typescript
  'aspect-ratio-calculator': [
    { question: 'What is an aspect ratio?', answer: 'An aspect ratio describes the proportional relationship between width and height. For example, 16:9 means for every 16 units of width, there are 9 units of height. This ratio stays constant when you scale an image up or down proportionally.' },
    { question: 'What aspect ratio is 1920x1080?', answer: '1920x1080 has an aspect ratio of 16:9, the most common widescreen ratio used for monitors, TVs, and video content including YouTube and streaming services.' },
    { question: 'Is my data safe?', answer: 'Yes. All calculations happen locally in your browser. No data is sent to any server.' },
  ],
```

- [x] **Step 5: Build and verify**

```bash
npx tsc --noEmit && rm -rf dist .astro && pnpm build
```

- [x] **Step 6: Commit**

```bash
git add src/data/aspectRatioData.ts src/components/tools/AspectRatioCalculator.tsx \
  src/components/pseo/AspectRatioPage.astro src/pages/aspect-ratio-calculator.astro \
  src/pages/calculate/ src/lib/seo.ts src/data/tools.ts src/data/faqs.ts src/data/audienceHubs.ts
git commit -m "feat(aspect-ratio): add calculator with device/video format pSEO"
```

---

## Task 8: SEO Content + OG Images + Cross-Links

**Files:**
- Create: `src/data/tool-content-13.ts`
- Modify: `src/data/tool-content.ts` — import tool-content-13
- Modify: `src/data/tools.ts` — update relatedTools for existing tools to cross-link with new ones

- [x] **Step 1: Create SEO content for all 5 tools**

Create `src/data/tool-content-13.ts` with `ToolContent` entries for all 5 tools (`timezone-converter`, `date-calculator`, `compound-interest-calculator`, `loan-calculator`, `aspect-ratio-calculator`). Each entry must include:
- `whatIs`: 2 paragraphs separated by `\n\n`, ~150 words total
- `useCases`: 4 items with title + description
- `tips`: 4 items with title + description
- Optional `comparison` table where relevant (e.g., aspect ratio could compare common ratios)

Export as `export const toolContent13: Record<string, ToolContent> = { ... }`.

- [x] **Step 2: Import in tool-content.ts**

Add to `src/data/tool-content.ts`:

```typescript
import { toolContent13 } from './tool-content-13'
```

And add `...toolContent13,` to the `allToolContent` object.

- [x] **Step 3: Update cross-links in existing tools**

Update `relatedTools` arrays for existing tools that should link to new tools:
- `currency-converter`: add `'timezone-converter'`
- `age-calculator`: add `'date-calculator'`
- `mortgage-calculator`: add `'loan-calculator'`, `'compound-interest-calculator'`
- `percentage-calculator`: add `'compound-interest-calculator'`
- `image-compressor`: add `'aspect-ratio-calculator'`

- [x] **Step 4: Build and verify**

```bash
npx tsc --noEmit && rm -rf dist .astro && pnpm build
```

Expected: All 5 tool pages now show SEO content sections (What Is, Use Cases, Tips), OG images auto-generate.

- [x] **Step 5: Commit**

```bash
git add src/data/tool-content-13.ts src/data/tool-content.ts src/data/tools.ts
git commit -m "feat: add SEO content, OG images, and cross-links for phase 5b tools"
```

---

## Task 9: Update NEXT_SESSION.md + Final Build Verification

**Files:**
- Modify: `NEXT_SESSION.md`

- [x] **Step 1: Full clean build**

```bash
rm -rf dist .astro && pnpm build
```

Verify:
- Page count increased from ~49,500 to ~67,000+
- 0 errors
- 40 tools total

- [x] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: 0 errors.

- [x] **Step 3: Spot-check pSEO pages**

Run dev server and verify:
- `/timezone-converter` — tool page renders
- `/time/new-york-to-london` — timezone pair page
- `/time/tokyo` — city time page
- `/date-calculator` — tool page renders
- `/calculate/30-days-from-today` — date calc page
- `/calculate/days-until-christmas` — holiday countdown
- `/compound-interest-calculator` — tool page with chart
- `/calculate/compound-interest-10000-at-7-percent-for-10-years` — pSEO page
- `/loan-calculator` — tool page with amortization
- `/calculate/loan-300000-at-6-percent-30-years` — pSEO page
- `/aspect-ratio-calculator` — tool page
- `/calculate/aspect-ratio-1920x1080` — resolution page
- `/calculate/iphone-16-pro-max-resolution` — device page

- [x] **Step 4: Update NEXT_SESSION.md**

Update session history, current state (page count, tool count), and next priorities (Phase 5c, deploy, SEO resubmission).

- [x] **Step 5: Commit**

```bash
git add NEXT_SESSION.md
git commit -m "docs: update session notes for phase 5b completion"
```
