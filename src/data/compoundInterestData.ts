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
