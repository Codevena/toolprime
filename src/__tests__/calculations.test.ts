import { describe, it, expect } from 'vitest'
import { compoundInterest } from '../data/compoundInterestData'
import { calculateMonthlyPayment } from '../data/loanCalcData'
import { computeFraction, gcd, simplify, formatFraction } from '../data/fractionData'
import { calculateRatio } from '../data/aspectRatioData'

describe('compoundInterest', () => {
  it('calculates 10000 at 7% for 10 years', () => {
    const result = compoundInterest(10000, 7, 10)
    expect(Math.round(result)).toBe(19672)
  })

  it('calculates 1000 at 5% for 1 year', () => {
    const result = compoundInterest(1000, 5, 1)
    expect(result).toBeCloseTo(1050, 2)
  })

  it('returns principal at 0% rate', () => {
    expect(compoundInterest(5000, 0, 30)).toBe(5000)
  })

  it('doubles at ~72/rate years (rule of 72)', () => {
    // At 8%, should roughly double in 9 years
    const result = compoundInterest(10000, 8, 9)
    expect(result).toBeGreaterThan(19000)
    expect(result).toBeLessThan(21000)
  })
})

describe('calculateMonthlyPayment', () => {
  it('calculates 200000 at 5% for 30 years', () => {
    const payment = calculateMonthlyPayment(200000, 5, 30)
    expect(Math.round(payment * 100) / 100).toBe(1073.64)
  })

  it('calculates 100000 at 3% for 15 years', () => {
    const payment = calculateMonthlyPayment(100000, 3, 15)
    expect(Math.round(payment * 100) / 100).toBe(690.58)
  })

  it('handles 0% interest rate', () => {
    const payment = calculateMonthlyPayment(12000, 0, 1)
    expect(payment).toBe(1000)
  })

  it('higher rate means higher payment', () => {
    const low = calculateMonthlyPayment(200000, 3, 30)
    const high = calculateMonthlyPayment(200000, 7, 30)
    expect(high).toBeGreaterThan(low)
  })

  it('shorter term means higher payment but less total interest', () => {
    const short = calculateMonthlyPayment(200000, 5, 15)
    const long = calculateMonthlyPayment(200000, 5, 30)
    expect(short).toBeGreaterThan(long) // higher monthly
    expect(short * 15 * 12).toBeLessThan(long * 30 * 12) // less total paid
  })
})

describe('gcd', () => {
  it('gcd(12, 8) = 4', () => {
    expect(gcd(12, 8)).toBe(4)
  })

  it('gcd(7, 3) = 1 (coprime)', () => {
    expect(gcd(7, 3)).toBe(1)
  })

  it('gcd(0, 5) = 5', () => {
    expect(gcd(0, 5)).toBe(5)
  })
})

describe('simplify', () => {
  it('simplifies 4/8 to 1/2', () => {
    expect(simplify(4, 8)).toEqual({ n: 1, d: 2 })
  })

  it('simplifies 6/4 to 3/2', () => {
    expect(simplify(6, 4)).toEqual({ n: 3, d: 2 })
  })

  it('handles negative numerator', () => {
    const result = simplify(-3, 6)
    expect(result.n).toBeLessThan(0)
    expect(result.d).toBeGreaterThan(0)
  })
})

describe('computeFraction', () => {
  it('1/2 + 1/3 = 5/6', () => {
    const result = computeFraction({ n: 1, d: 2 }, { n: 1, d: 3 }, 'plus')
    expect(result).toEqual({ n: 5, d: 6 })
  })

  it('3/4 - 1/4 = 1/2', () => {
    const result = computeFraction({ n: 3, d: 4 }, { n: 1, d: 4 }, 'minus')
    expect(result).toEqual({ n: 1, d: 2 })
  })

  it('2/3 * 3/4 = 1/2', () => {
    const result = computeFraction({ n: 2, d: 3 }, { n: 3, d: 4 }, 'times')
    expect(result).toEqual({ n: 1, d: 2 })
  })

  it('1/2 / 1/3 = 3/2', () => {
    const result = computeFraction({ n: 1, d: 2 }, { n: 1, d: 3 }, 'dividedby')
    expect(result).toEqual({ n: 3, d: 2 })
  })

  it('division by zero returns 0/1', () => {
    const result = computeFraction({ n: 1, d: 2 }, { n: 0, d: 1 }, 'dividedby')
    expect(result).toEqual({ n: 0, d: 1 })
  })
})

describe('formatFraction', () => {
  it('formats 3/4', () => {
    expect(formatFraction({ n: 3, d: 4 })).toBe('3/4')
  })

  it('formats whole number', () => {
    expect(formatFraction({ n: 5, d: 1 })).toBe('5')
  })

  it('formats negative', () => {
    expect(formatFraction({ n: -1, d: 2 })).toBe('-1/2')
  })
})

describe('calculateRatio', () => {
  it('1920x1080 = 16:9', () => {
    expect(calculateRatio(1920, 1080)).toBe('16:9')
  })

  it('1024x768 = 4:3', () => {
    expect(calculateRatio(1024, 768)).toBe('4:3')
  })

  it('1080x1080 = 1:1', () => {
    expect(calculateRatio(1080, 1080)).toBe('1:1')
  })

  it('3440x1440 = 43:18 (ultrawide)', () => {
    expect(calculateRatio(3440, 1440)).toBe('43:18')
  })
})
