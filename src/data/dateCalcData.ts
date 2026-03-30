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

// "X days from today" pages: 1-730 + popular values
const daysValues = [
  ...Array.from({ length: 730 }, (_, i) => i + 1),
  1000, 1095, 1460, 1825,
]

export const daysFromTodayEntries: DaysFromTodayEntry[] = daysValues.map((d) => ({
  slug: `${d}-days-from-today`,
  days: d,
}))

// Holiday countdowns — fixed-date holidays only.
// Moveable holidays (Mother's Day, Thanksgiving, etc.) and lunar/religious holidays
// (Chinese New Year, Diwali, Ramadan, etc.) are excluded because they require
// complex calendar calculations that cannot be done with fixed month/day values.
export const holidays: HolidayCountdownEntry[] = [
  { slug: 'days-until-new-years-day', name: "New Year's Day", month: 1, day: 1 },
  { slug: 'days-until-valentines-day', name: "Valentine's Day", month: 2, day: 14 },
  { slug: 'days-until-international-womens-day', name: "International Women's Day", month: 3, day: 8 },
  { slug: 'days-until-st-patricks-day', name: "St. Patrick's Day", month: 3, day: 17 },
  { slug: 'days-until-april-fools-day', name: "April Fools' Day", month: 4, day: 1 },
  { slug: 'days-until-earth-day', name: 'Earth Day', month: 4, day: 22 },
  { slug: 'days-until-world-environment-day', name: 'World Environment Day', month: 6, day: 5 },
  { slug: 'days-until-independence-day', name: 'Independence Day (US)', month: 7, day: 4 },
  { slug: 'days-until-halloween', name: 'Halloween', month: 10, day: 31 },
  { slug: 'days-until-veterans-day', name: 'Veterans Day', month: 11, day: 11 },
  { slug: 'days-until-christmas-eve', name: 'Christmas Eve', month: 12, day: 24 },
  { slug: 'days-until-christmas', name: 'Christmas Day', month: 12, day: 25 },
  { slug: 'days-until-new-years-eve', name: "New Year's Eve", month: 12, day: 31 },
  { slug: 'days-until-groundhog-day', name: 'Groundhog Day', month: 2, day: 2 },
  { slug: 'days-until-pi-day', name: 'Pi Day', month: 3, day: 14 },
  { slug: 'days-until-star-wars-day', name: 'Star Wars Day', month: 5, day: 4 },
  { slug: 'days-until-juneteenth', name: 'Juneteenth', month: 6, day: 19 },
  { slug: 'days-until-bastille-day', name: 'Bastille Day', month: 7, day: 14 },
  { slug: 'days-until-canada-day', name: 'Canada Day', month: 7, day: 1 },
  { slug: 'days-until-day-of-the-dead', name: 'Day of the Dead', month: 11, day: 1 },
  { slug: 'days-until-boxing-day', name: 'Boxing Day', month: 12, day: 26 },
  { slug: 'days-until-german-unity-day', name: 'German Unity Day', month: 10, day: 3 },
  { slug: 'days-until-australia-day', name: 'Australia Day', month: 1, day: 26 },
  { slug: 'days-until-world-health-day', name: 'World Health Day', month: 4, day: 7 },
  { slug: 'days-until-international-workers-day', name: "International Workers' Day", month: 5, day: 1 },
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

export interface WeekNumberEntry {
  slug: string
  week: number
}

export const weekNumberEntries: WeekNumberEntry[] = Array.from({ length: 53 }, (_, i) => ({
  slug: `week-${i + 1}`,
  week: i + 1,
}))

export interface WeeksFromTodayEntry {
  slug: string
  weeks: number
}

export const weeksFromTodayEntries: WeeksFromTodayEntry[] = Array.from({ length: 156 }, (_, i) => ({
  slug: `${i + 1}-weeks-from-today`,
  weeks: i + 1,
}))

export interface MonthsFromTodayEntry {
  slug: string
  months: number
}

export const monthsFromTodayEntries: MonthsFromTodayEntry[] = Array.from({ length: 120 }, (_, i) => ({
  slug: `${i + 1}-months-from-today`,
  months: i + 1,
}))

export interface DaysAgoEntry {
  slug: string
  days: number
}

const daysAgoValues = Array.from({ length: 730 }, (_, i) => i + 1)

export const daysAgoEntries: DaysAgoEntry[] = daysAgoValues.map((d) => ({
  slug: `${d}-days-ago`,
  days: d,
}))

// Extended days-between: every 15th and last day of each month vs Jan 1
const extendedDateRanges: [number, number, number, number][] = []
for (let m = 1; m <= 12; m++) {
  extendedDateRanges.push([1, 1, m, 15])
  const lastDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1] as number
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

// Month-end to month-end pairs
const monthEndDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const monthEndPairs: [number, number, number, number][] = []
for (let from = 0; from < 12; from++) {
  for (let to = from + 1; to < 12; to++) {
    monthEndPairs.push([from + 1, monthEndDays[from], to + 1, monthEndDays[to]])
  }
}

export const monthEndDaysBetweenEntries: DaysBetweenEntry[] = monthEndPairs
  .filter(([fm, fd, tm, td]) => {
    const slug = `days-between-${monthNames[fm - 1]}-${fd}-and-${monthNames[tm - 1]}-${td}`
    return !daysBetweenEntries.some((e) => e.slug === slug) &&
      !extendedDaysBetweenEntries.some((e) => e.slug === slug)
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
  ...monthEndDaysBetweenEntries.map((e) => e.slug),
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
