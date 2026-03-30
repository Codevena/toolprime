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

// 128 cities covering major world cities across all continents
export const cities: City[] = [
  // North America (14)
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
  { name: 'Geneva', slug: 'geneva', timezone: 'Europe/Zurich', country: 'CH', flag: '🇨🇭' },
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
]

// 55 "anchor" cities for cross-pair generation (most searched timezone conversions)
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

function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug)
}

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
