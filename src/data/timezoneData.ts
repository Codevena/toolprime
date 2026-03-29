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
  { name: 'New York', slug: 'new-york', timezone: 'America/New_York', country: 'US', flag: '🇺🇸' },
  { name: 'Los Angeles', slug: 'los-angeles', timezone: 'America/Los_Angeles', country: 'US', flag: '🇺🇸' },
  { name: 'Chicago', slug: 'chicago', timezone: 'America/Chicago', country: 'US', flag: '🇺🇸' },
  { name: 'Houston', slug: 'houston', timezone: 'America/Chicago', country: 'US', flag: '🇺🇸' },
  { name: 'Phoenix', slug: 'phoenix', timezone: 'America/Phoenix', country: 'US', flag: '🇺🇸' },
  { name: 'Denver', slug: 'denver', timezone: 'America/Denver', country: 'US', flag: '🇺🇸' },
  { name: 'San Francisco', slug: 'san-francisco', timezone: 'America/Los_Angeles', country: 'US', flag: '🇺🇸' },
  { name: 'Seattle', slug: 'seattle', timezone: 'America/Los_Angeles', country: 'US', flag: '🇺🇸' },
  { name: 'Miami', slug: 'miami', timezone: 'America/New_York', country: 'US', flag: '🇺🇸' },
  { name: 'Toronto', slug: 'toronto', timezone: 'America/Toronto', country: 'CA', flag: '🇨🇦' },
  { name: 'Vancouver', slug: 'vancouver', timezone: 'America/Vancouver', country: 'CA', flag: '🇨🇦' },
  { name: 'Mexico City', slug: 'mexico-city', timezone: 'America/Mexico_City', country: 'MX', flag: '🇲🇽' },
  { name: 'Honolulu', slug: 'honolulu', timezone: 'Pacific/Honolulu', country: 'US', flag: '🇺🇸' },
  { name: 'Anchorage', slug: 'anchorage', timezone: 'America/Anchorage', country: 'US', flag: '🇺🇸' },
  // South America (6)
  { name: 'São Paulo', slug: 'sao-paulo', timezone: 'America/Sao_Paulo', country: 'BR', flag: '🇧🇷' },
  { name: 'Buenos Aires', slug: 'buenos-aires', timezone: 'America/Argentina/Buenos_Aires', country: 'AR', flag: '🇦🇷' },
  { name: 'Bogotá', slug: 'bogota', timezone: 'America/Bogota', country: 'CO', flag: '🇨🇴' },
  { name: 'Lima', slug: 'lima', timezone: 'America/Lima', country: 'PE', flag: '🇵🇪' },
  { name: 'Santiago', slug: 'santiago', timezone: 'America/Santiago', country: 'CL', flag: '🇨🇱' },
  { name: 'Rio de Janeiro', slug: 'rio-de-janeiro', timezone: 'America/Sao_Paulo', country: 'BR', flag: '🇧🇷' },
  // Europe (20)
  { name: 'London', slug: 'london', timezone: 'Europe/London', country: 'GB', flag: '🇬🇧' },
  { name: 'Paris', slug: 'paris', timezone: 'Europe/Paris', country: 'FR', flag: '🇫🇷' },
  { name: 'Berlin', slug: 'berlin', timezone: 'Europe/Berlin', country: 'DE', flag: '🇩🇪' },
  { name: 'Madrid', slug: 'madrid', timezone: 'Europe/Madrid', country: 'ES', flag: '🇪🇸' },
  { name: 'Rome', slug: 'rome', timezone: 'Europe/Rome', country: 'IT', flag: '🇮🇹' },
  { name: 'Amsterdam', slug: 'amsterdam', timezone: 'Europe/Amsterdam', country: 'NL', flag: '🇳🇱' },
  { name: 'Zurich', slug: 'zurich', timezone: 'Europe/Zurich', country: 'CH', flag: '🇨🇭' },
  { name: 'Stockholm', slug: 'stockholm', timezone: 'Europe/Stockholm', country: 'SE', flag: '🇸🇪' },
  { name: 'Oslo', slug: 'oslo', timezone: 'Europe/Oslo', country: 'NO', flag: '🇳🇴' },
  { name: 'Copenhagen', slug: 'copenhagen', timezone: 'Europe/Copenhagen', country: 'DK', flag: '🇩🇰' },
  { name: 'Helsinki', slug: 'helsinki', timezone: 'Europe/Helsinki', country: 'FI', flag: '🇫🇮' },
  { name: 'Warsaw', slug: 'warsaw', timezone: 'Europe/Warsaw', country: 'PL', flag: '🇵🇱' },
  { name: 'Prague', slug: 'prague', timezone: 'Europe/Prague', country: 'CZ', flag: '🇨🇿' },
  { name: 'Vienna', slug: 'vienna', timezone: 'Europe/Vienna', country: 'AT', flag: '🇦🇹' },
  { name: 'Lisbon', slug: 'lisbon', timezone: 'Europe/Lisbon', country: 'PT', flag: '🇵🇹' },
  { name: 'Athens', slug: 'athens', timezone: 'Europe/Athens', country: 'GR', flag: '🇬🇷' },
  { name: 'Moscow', slug: 'moscow', timezone: 'Europe/Moscow', country: 'RU', flag: '🇷🇺' },
  { name: 'Istanbul', slug: 'istanbul', timezone: 'Europe/Istanbul', country: 'TR', flag: '🇹🇷' },
  { name: 'Bucharest', slug: 'bucharest', timezone: 'Europe/Bucharest', country: 'RO', flag: '🇷🇴' },
  { name: 'Dublin', slug: 'dublin', timezone: 'Europe/Dublin', country: 'IE', flag: '🇮🇪' },
  // Asia (25)
  { name: 'Tokyo', slug: 'tokyo', timezone: 'Asia/Tokyo', country: 'JP', flag: '🇯🇵' },
  { name: 'Shanghai', slug: 'shanghai', timezone: 'Asia/Shanghai', country: 'CN', flag: '🇨🇳' },
  { name: 'Beijing', slug: 'beijing', timezone: 'Asia/Shanghai', country: 'CN', flag: '🇨🇳' },
  { name: 'Hong Kong', slug: 'hong-kong', timezone: 'Asia/Hong_Kong', country: 'HK', flag: '🇭🇰' },
  { name: 'Singapore', slug: 'singapore', timezone: 'Asia/Singapore', country: 'SG', flag: '🇸🇬' },
  { name: 'Dubai', slug: 'dubai', timezone: 'Asia/Dubai', country: 'AE', flag: '🇦🇪' },
  { name: 'Mumbai', slug: 'mumbai', timezone: 'Asia/Kolkata', country: 'IN', flag: '🇮🇳' },
  { name: 'Delhi', slug: 'delhi', timezone: 'Asia/Kolkata', country: 'IN', flag: '🇮🇳' },
  { name: 'Bangalore', slug: 'bangalore', timezone: 'Asia/Kolkata', country: 'IN', flag: '🇮🇳' },
  { name: 'Seoul', slug: 'seoul', timezone: 'Asia/Seoul', country: 'KR', flag: '🇰🇷' },
  { name: 'Bangkok', slug: 'bangkok', timezone: 'Asia/Bangkok', country: 'TH', flag: '🇹🇭' },
  { name: 'Jakarta', slug: 'jakarta', timezone: 'Asia/Jakarta', country: 'ID', flag: '🇮🇩' },
  { name: 'Taipei', slug: 'taipei', timezone: 'Asia/Taipei', country: 'TW', flag: '🇹🇼' },
  { name: 'Kuala Lumpur', slug: 'kuala-lumpur', timezone: 'Asia/Kuala_Lumpur', country: 'MY', flag: '🇲🇾' },
  { name: 'Manila', slug: 'manila', timezone: 'Asia/Manila', country: 'PH', flag: '🇵🇭' },
  { name: 'Karachi', slug: 'karachi', timezone: 'Asia/Karachi', country: 'PK', flag: '🇵🇰' },
  { name: 'Dhaka', slug: 'dhaka', timezone: 'Asia/Dhaka', country: 'BD', flag: '🇧🇩' },
  { name: 'Riyadh', slug: 'riyadh', timezone: 'Asia/Riyadh', country: 'SA', flag: '🇸🇦' },
  { name: 'Tel Aviv', slug: 'tel-aviv', timezone: 'Asia/Jerusalem', country: 'IL', flag: '🇮🇱' },
  { name: 'Ho Chi Minh City', slug: 'ho-chi-minh-city', timezone: 'Asia/Ho_Chi_Minh', country: 'VN', flag: '🇻🇳' },
  { name: 'Kolkata', slug: 'kolkata', timezone: 'Asia/Kolkata', country: 'IN', flag: '🇮🇳' },
  { name: 'Osaka', slug: 'osaka', timezone: 'Asia/Tokyo', country: 'JP', flag: '🇯🇵' },
  { name: 'Hanoi', slug: 'hanoi', timezone: 'Asia/Ho_Chi_Minh', country: 'VN', flag: '🇻🇳' },
  { name: 'Doha', slug: 'doha', timezone: 'Asia/Qatar', country: 'QA', flag: '🇶🇦' },
  { name: 'Colombo', slug: 'colombo', timezone: 'Asia/Colombo', country: 'LK', flag: '🇱🇰' },
  // Africa (8)
  { name: 'Cairo', slug: 'cairo', timezone: 'Africa/Cairo', country: 'EG', flag: '🇪🇬' },
  { name: 'Lagos', slug: 'lagos', timezone: 'Africa/Lagos', country: 'NG', flag: '🇳🇬' },
  { name: 'Nairobi', slug: 'nairobi', timezone: 'Africa/Nairobi', country: 'KE', flag: '🇰🇪' },
  { name: 'Johannesburg', slug: 'johannesburg', timezone: 'Africa/Johannesburg', country: 'ZA', flag: '🇿🇦' },
  { name: 'Cape Town', slug: 'cape-town', timezone: 'Africa/Johannesburg', country: 'ZA', flag: '🇿🇦' },
  { name: 'Accra', slug: 'accra', timezone: 'Africa/Accra', country: 'GH', flag: '🇬🇭' },
  { name: 'Casablanca', slug: 'casablanca', timezone: 'Africa/Casablanca', country: 'MA', flag: '🇲🇦' },
  { name: 'Addis Ababa', slug: 'addis-ababa', timezone: 'Africa/Addis_Ababa', country: 'ET', flag: '🇪🇹' },
  // Oceania (5)
  { name: 'Sydney', slug: 'sydney', timezone: 'Australia/Sydney', country: 'AU', flag: '🇦🇺' },
  { name: 'Melbourne', slug: 'melbourne', timezone: 'Australia/Melbourne', country: 'AU', flag: '🇦🇺' },
  { name: 'Brisbane', slug: 'brisbane', timezone: 'Australia/Brisbane', country: 'AU', flag: '🇦🇺' },
  { name: 'Perth', slug: 'perth', timezone: 'Australia/Perth', country: 'AU', flag: '🇦🇺' },
  { name: 'Auckland', slug: 'auckland', timezone: 'Pacific/Auckland', country: 'NZ', flag: '🇳🇿' },
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
