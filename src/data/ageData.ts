export interface AgeEntry {
  slug: string
  birthYear: number
  birthMonth?: string
  birthMonthNum?: number
}

export interface Generation {
  name: string
  startYear: number
  endYear: number
}

export const generations: Generation[] = [
  { name: 'Silent Generation', startYear: 1928, endYear: 1945 },
  { name: 'Baby Boomers', startYear: 1946, endYear: 1964 },
  { name: 'Generation X', startYear: 1965, endYear: 1980 },
  { name: 'Millennials', startYear: 1981, endYear: 1996 },
  { name: 'Generation Z', startYear: 1997, endYear: 2012 },
  { name: 'Generation Alpha', startYear: 2013, endYear: 2025 },
]

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const

const START_YEAR = 1930
const END_YEAR = 2025

export function getGeneration(birthYear: number): Generation | null {
  return generations.find((g) => birthYear >= g.startYear && birthYear <= g.endYear) ?? null
}

export function getZodiacSign(month: number, day: number): string {
  const signs: [string, number, number][] = [
    ['Capricorn', 1, 19],
    ['Aquarius', 2, 18],
    ['Pisces', 3, 20],
    ['Aries', 4, 19],
    ['Taurus', 5, 20],
    ['Gemini', 6, 20],
    ['Cancer', 7, 22],
    ['Leo', 8, 22],
    ['Virgo', 9, 22],
    ['Libra', 10, 22],
    ['Scorpio', 11, 21],
    ['Sagittarius', 12, 21],
    ['Capricorn', 12, 31],
  ]
  for (const [sign, m, d] of signs) {
    if (month < m || (month === m && day <= d)) return sign
  }
  return 'Capricorn'
}

export function calculateAge(
  birthYear: number,
  birthMonth?: number,
  birthDay?: number,
): { years: number; months: number; days: number; totalDays: number } {
  const now = new Date()
  const bMonth = birthMonth ?? 1
  const bDay = birthDay ?? 1
  const birth = new Date(birthYear, bMonth - 1, bDay)

  let years = now.getFullYear() - birth.getFullYear()
  let months = now.getMonth() - birth.getMonth()
  let days = now.getDate() - birth.getDate()

  if (days < 0) {
    months -= 1
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    days += prevMonth.getDate()
  }
  if (months < 0) {
    years -= 1
    months += 12
  }

  const totalDays = Math.floor(
    (now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24),
  )

  return { years, months, days, totalDays }
}

export function getRelatedAgeEntries(
  birthYear: number,
  excludeSlug?: string,
): AgeEntry[] {
  const nearby: AgeEntry[] = []
  for (let y = birthYear - 3; y <= birthYear + 3; y++) {
    if (y < START_YEAR || y > END_YEAR || y === birthYear) continue
    const slug = `age-born-${y}`
    if (slug === excludeSlug) continue
    nearby.push({ slug, birthYear: y })
  }
  return nearby
}

function generateEntries(): AgeEntry[] {
  const entries: AgeEntry[] = []

  // Year-only entries: 1930-2025
  for (let y = START_YEAR; y <= END_YEAR; y++) {
    entries.push({ slug: `age-born-${y}`, birthYear: y })
  }

  // Month+year entries: 1930-2025 x 12 months
  for (let y = START_YEAR; y <= END_YEAR; y++) {
    for (let m = 0; m < 12; m++) {
      const monthName = MONTHS[m]!
      entries.push({
        slug: `age-born-${monthName.toLowerCase()}-${y}`,
        birthYear: y,
        birthMonth: monthName,
        birthMonthNum: m + 1,
      })
    }
  }

  return entries
}

export const ageEntries: AgeEntry[] = generateEntries()
