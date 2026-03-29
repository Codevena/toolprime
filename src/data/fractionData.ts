export interface Fraction {
  n: number // numerator
  d: number // denominator
}

export type FractionOp = 'plus' | 'minus' | 'times' | 'dividedby'

export const opSymbols: Record<FractionOp, string> = {
  plus: '+',
  minus: '\u2212',
  times: '\u00d7',
  dividedby: '\u00f7',
}

export const opLabels: Record<FractionOp, string> = {
  plus: 'plus',
  minus: 'minus',
  times: 'times',
  dividedby: 'divided by',
}

export interface FractionEntry {
  slug: string
  f1: Fraction
  f2: Fraction
  op: FractionOp
  result: Fraction
}

export interface DecimalToFractionEntry {
  slug: string
  decimal: number
  fraction: Fraction
}

/** Greatest common divisor (Euclidean algorithm) */
export function gcd(a: number, b: number): number {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b) {
    ;[a, b] = [b, a % b]
  }
  return a
}

/** Reduce a fraction to lowest terms. Keeps sign in numerator. */
export function simplify(n: number, d: number): Fraction {
  if (d === 0) return { n: 0, d: 1 }
  const sign = d < 0 ? -1 : 1
  const g = gcd(Math.abs(n), Math.abs(d))
  return { n: (sign * n) / g, d: (sign * d) / g }
}

/** Perform a fraction operation and return a simplified result. */
export function computeFraction(f1: Fraction, f2: Fraction, op: FractionOp): Fraction {
  let n: number
  let d: number

  switch (op) {
    case 'plus':
      n = f1.n * f2.d + f2.n * f1.d
      d = f1.d * f2.d
      break
    case 'minus':
      n = f1.n * f2.d - f2.n * f1.d
      d = f1.d * f2.d
      break
    case 'times':
      n = f1.n * f2.n
      d = f1.d * f2.d
      break
    case 'dividedby':
      if (f2.n === 0) return { n: 0, d: 1 }
      n = f1.n * f2.d
      d = f1.d * f2.n
      break
  }

  return simplify(n, d)
}

/** Format a fraction for display (e.g. "3/4" or "1" or "-1/2"). */
export function formatFraction(f: Fraction): string {
  if (f.d === 1) return String(f.n)
  return `${f.n}/${f.d}`
}

/** Generate unique reduced proper fractions with denominator 2-12 */
function generateFractions(): Fraction[] {
  const seen = new Set<string>()
  const fractions: Fraction[] = []

  for (let d = 2; d <= 12; d++) {
    for (let n = 1; n < d; n++) {
      const reduced = simplify(n, d)
      const key = `${reduced.n}/${reduced.d}`
      if (!seen.has(key)) {
        seen.add(key)
        fractions.push(reduced)
      }
    }
  }

  return fractions
}

export const commonFractions: Fraction[] = generateFractions()

const allOps: FractionOp[] = ['plus', 'minus', 'times', 'dividedby']

function buildSlug(f1: Fraction, op: FractionOp, f2: Fraction): string {
  return `${f1.n}-${f1.d}-${op}-${f2.n}-${f2.d}`
}

/** Generate all fraction entries: every pair of common fractions x 4 operations */
function generateFractionEntries(): FractionEntry[] {
  const entries: FractionEntry[] = []
  const seen = new Set<string>()

  for (const f1 of commonFractions) {
    for (const f2 of commonFractions) {
      // Skip division by zero (f2.n is always > 0 for proper fractions)
      for (const op of allOps) {
        const slug = buildSlug(f1, op, f2)
        if (seen.has(slug)) continue
        seen.add(slug)

        const result = computeFraction(f1, f2, op)
        entries.push({ slug, f1, f2, op, result })
      }
    }
  }

  return entries
}

export const fractionEntries: FractionEntry[] = generateFractionEntries()

/** Common decimals with known fraction equivalents */
function generateDecimalEntries(): DecimalToFractionEntry[] {
  const decimals: [number, number, number][] = [
    [0.1, 1, 10], [0.125, 1, 8], [0.15, 3, 20], [0.2, 1, 5], [0.25, 1, 4],
    [0.3, 3, 10], [0.333, 1, 3], [0.375, 3, 8], [0.4, 2, 5], [0.45, 9, 20],
    [0.5, 1, 2], [0.55, 11, 20], [0.6, 3, 5], [0.625, 5, 8], [0.666, 2, 3],
    [0.7, 7, 10], [0.75, 3, 4], [0.8, 4, 5], [0.833, 5, 6], [0.85, 17, 20],
    [0.875, 7, 8], [0.9, 9, 10], [0.95, 19, 20], [1.5, 3, 2], [2.5, 5, 2],
  ]

  return decimals.map(([decimal, n, d]) => ({
    slug: `${String(decimal).replace('.', '-')}-to-fraction`,
    decimal,
    fraction: { n, d },
  }))
}

export const decimalEntries: DecimalToFractionEntry[] = generateDecimalEntries()

/** Get related fraction entries: same operation with the same first fraction */
export function getRelatedFractionEntries(
  f1: Fraction,
  op: FractionOp,
  excludeSlug: string,
  limit = 6,
): FractionEntry[] {
  return fractionEntries
    .filter((e) => e.op === op && e.f1.n === f1.n && e.f1.d === f1.d && e.slug !== excludeSlug)
    .slice(0, limit)
}

/** Least common denominator */
export function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b)
}
