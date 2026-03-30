// src/data/percentages.ts
export interface PercentageEntry {
  percentage: number
  base: number
  result: number
  slug: string
}

export const percentages = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 33, 35, 40, 45, 50, 55, 60, 65,
  70, 75, 80, 85, 90, 95, 100, 110, 120, 125, 150, 200, 250, 300, 500,
]

export const bases = [
  5, 8, 10, 12, 15, 16, 18, 20, 22, 24, 25, 28, 30, 32, 35, 36, 40, 42, 45,
  48, 50, 55, 60, 64, 65, 70, 72, 75, 80, 84, 90, 96, 100, 110, 120, 125,
  128, 140, 150, 160, 175, 180, 200, 220, 225, 240, 250, 256, 280, 300,
  320, 350, 360, 400, 450, 480, 500, 512, 600, 700, 750, 800, 900, 1000,
  1200, 1500, 1800, 2000, 2400, 2500, 3000, 3500, 4000, 5000, 6000, 7500,
  8000, 10000, 12000, 15000, 20000, 25000, 50000, 100000,
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

export interface ReversePercentageEntry {
  x: number
  y: number
  result: number
  slug: string
}

export const reversePercentageEntries: ReversePercentageEntry[] = bases.flatMap((y) =>
  bases
    .filter((x) => x <= y)
    .map((x) => ({
      x,
      y,
      result: formatResult((x / y) * 100),
      slug: `what-percent-is-${x}-of-${y}`,
    }))
)

export function getReverseRelatedByY(y: number, excludeX: number): ReversePercentageEntry[] {
  return reversePercentageEntries
    .filter((e) => e.y === y && e.x !== excludeX)
    .slice(0, 8)
}

export function getReverseRelatedByX(x: number, excludeY: number): ReversePercentageEntry[] {
  return reversePercentageEntries
    .filter((e) => e.x === x && e.y !== excludeY)
    .slice(0, 8)
}
