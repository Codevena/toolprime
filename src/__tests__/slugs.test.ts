import { describe, it, expect } from 'vitest'
import { compoundInterestEntries } from '../data/compoundInterestData'
import { loanEntries } from '../data/loanCalcData'
import { percentageEntries, reversePercentageEntries } from '../data/percentages'
import { timezonePairEntries, cityTimeEntries } from '../data/timezoneData'
import { fractionEntries } from '../data/fractionData'

function findDuplicates(slugs: string[]): string[] {
  const seen = new Set<string>()
  const dupes: string[] = []
  for (const s of slugs) {
    if (seen.has(s)) dupes.push(s)
    seen.add(s)
  }
  return dupes
}

describe('slug uniqueness', () => {
  it('compound interest has no duplicate slugs', () => {
    const slugs = compoundInterestEntries.map((e) => e.slug)
    expect(findDuplicates(slugs)).toEqual([])
  })

  it('loan entries have no duplicate slugs', () => {
    const slugs = loanEntries.map((e) => e.slug)
    expect(findDuplicates(slugs)).toEqual([])
  })

  it('percentage entries have no duplicate slugs', () => {
    const slugs = percentageEntries.map((e) => e.slug)
    expect(findDuplicates(slugs)).toEqual([])
  })

  it('reverse percentage entries have no duplicate slugs', () => {
    const slugs = reversePercentageEntries.map((e) => e.slug)
    expect(findDuplicates(slugs)).toEqual([])
  })

  it('timezone pair entries have no duplicate slugs', () => {
    const slugs = timezonePairEntries.map((e) => e.slug)
    expect(findDuplicates(slugs)).toEqual([])
  })

  it('fraction entries have no duplicate slugs', () => {
    const slugs = fractionEntries.map((e) => e.slug)
    expect(findDuplicates(slugs)).toEqual([])
  })

  it('timezone city entries have no duplicate slugs', () => {
    const slugs = cityTimeEntries.map((e) => e.slug)
    expect(findDuplicates(slugs)).toEqual([])
  })
})

describe('slug format', () => {
  it('loan slugs do not contain dots', () => {
    const withDots = loanEntries.filter((e) => e.slug.includes('.'))
    expect(withDots).toEqual([])
  })

  it('compound interest slugs are URL-safe', () => {
    const unsafe = compoundInterestEntries.filter((e) => !/^[a-z0-9-]+$/.test(e.slug))
    expect(unsafe).toEqual([])
  })

  it('all timezone slugs are URL-safe', () => {
    const allSlugs = [...timezonePairEntries.map((e) => e.slug), ...cityTimeEntries.map((e) => e.slug)]
    const unsafe = allSlugs.filter((s) => !/^[a-z0-9-]+$/.test(s))
    expect(unsafe).toEqual([])
  })
})

describe('entry counts', () => {
  it('compound interest has 1848 entries (12 × 14 × 11)', () => {
    expect(compoundInterestEntries.length).toBe(1848)
  })

  it('loan has 1404 entries (18 × 13 × 6)', () => {
    expect(loanEntries.length).toBe(1404)
  })

  it('percentage forward entries match 53 × 84', () => {
    expect(percentageEntries.length).toBe(53 * 84)
  })
})
