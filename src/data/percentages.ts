// src/data/percentages.ts
export interface PercentageEntry {
  percentage: number
  base: number
  result: number
  slug: string
}

export const percentages = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 30, 33, 40, 50, 60, 70, 75, 80, 90, 100,
]

export const bases = [
  10, 20, 25, 30, 40, 50, 60, 75, 80, 100, 120, 150, 200, 250, 300, 400, 500, 600, 750, 800,
  1000, 1500, 2000, 2500, 3000, 5000, 10000,
]

function formatResult(value: number): number {
  // Remove floating point noise: 0.30000000000000004 → 0.3
  return parseFloat(value.toPrecision(10))
}

export const percentageEntries: PercentageEntry[] = percentages.flatMap((p) =>
  bases.map((b) => ({
    percentage: p,
    base: b,
    result: formatResult((b * p) / 100),
    slug: `what-is-${p}-percent-of-${b}`,
  }))
)

export function getRelatedByBase(base: number, excludePercentage: number): PercentageEntry[] {
  return percentageEntries
    .filter((e) => e.base === base && e.percentage !== excludePercentage)
    .slice(0, 8)
}

export function getRelatedByPercentage(percentage: number, excludeBase: number): PercentageEntry[] {
  return percentageEntries
    .filter((e) => e.percentage === percentage && e.base !== excludeBase)
    .slice(0, 8)
}
