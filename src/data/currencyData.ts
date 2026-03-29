export interface Currency {
  code: string
  name: string
  symbol: string
  flag: string
  isCrypto?: boolean
}

export interface CurrencyEntry {
  slug: string
  amount: number
  fromCode: string
  toCode: string
}

export type RateMap = Record<string, number>

// ─── Currency definitions ───────────────────────────────────────────────────

const majorCodes = ['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'CAD', 'AUD', 'CNY', 'INR', 'KRW'] as const
const anchorCodes = ['USD', 'EUR', 'GBP'] as const

export const currencies: Currency[] = [
  // Major (10)
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '\u{1F1FA}\u{1F1F8}' },
  { code: 'EUR', name: 'Euro', symbol: '\u20AC', flag: '\u{1F1EA}\u{1F1FA}' },
  { code: 'GBP', name: 'British Pound', symbol: '\u00A3', flag: '\u{1F1EC}\u{1F1E7}' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '\u00A5', flag: '\u{1F1EF}\u{1F1F5}' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '\u{1F1E8}\u{1F1ED}' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', flag: '\u{1F1E8}\u{1F1E6}' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '\u{1F1E6}\u{1F1FA}' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '\u00A5', flag: '\u{1F1E8}\u{1F1F3}' },
  { code: 'INR', name: 'Indian Rupee', symbol: '\u20B9', flag: '\u{1F1EE}\u{1F1F3}' },
  { code: 'KRW', name: 'South Korean Won', symbol: '\u20A9', flag: '\u{1F1F0}\u{1F1F7}' },
  // Other fiat (37)
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '\u{1F1F3}\u{1F1FF}' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '\u{1F1F8}\u{1F1EC}' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '\u{1F1ED}\u{1F1F0}' },
  { code: 'TWD', name: 'Taiwan Dollar', symbol: 'NT$', flag: '\u{1F1F9}\u{1F1FC}' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '\u{1F1F8}\u{1F1EA}' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '\u{1F1F3}\u{1F1F4}' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '\u{1F1E9}\u{1F1F0}' },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'z\u0142', flag: '\u{1F1F5}\u{1F1F1}' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'K\u010D', flag: '\u{1F1E8}\u{1F1FF}' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', flag: '\u{1F1ED}\u{1F1FA}' },
  { code: 'RON', name: 'Romanian Leu', symbol: 'lei', flag: '\u{1F1F7}\u{1F1F4}' },
  { code: 'BGN', name: 'Bulgarian Lev', symbol: '\u043B\u0432', flag: '\u{1F1E7}\u{1F1EC}' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '\u20BA', flag: '\u{1F1F9}\u{1F1F7}' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '\u20BD', flag: '\u{1F1F7}\u{1F1FA}' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '\u{1F1E7}\u{1F1F7}' },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'MX$', flag: '\u{1F1F2}\u{1F1FD}' },
  { code: 'ARS', name: 'Argentine Peso', symbol: 'AR$', flag: '\u{1F1E6}\u{1F1F7}' },
  { code: 'CLP', name: 'Chilean Peso', symbol: 'CL$', flag: '\u{1F1E8}\u{1F1F1}' },
  { code: 'COP', name: 'Colombian Peso', symbol: 'CO$', flag: '\u{1F1E8}\u{1F1F4}' },
  { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/', flag: '\u{1F1F5}\u{1F1EA}' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '\u{1F1FF}\u{1F1E6}' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '\u20A6', flag: '\u{1F1F3}\u{1F1EC}' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: 'E\u00A3', flag: '\u{1F1EA}\u{1F1EC}' },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', flag: '\u{1F1F0}\u{1F1EA}' },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: 'GH\u20B5', flag: '\u{1F1EC}\u{1F1ED}' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'AED', flag: '\u{1F1E6}\u{1F1EA}' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'SAR', flag: '\u{1F1F8}\u{1F1E6}' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '\u20AA', flag: '\u{1F1EE}\u{1F1F1}' },
  { code: 'THB', name: 'Thai Baht', symbol: '\u0E3F', flag: '\u{1F1F9}\u{1F1ED}' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '\u{1F1F2}\u{1F1FE}' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '\u{1F1EE}\u{1F1E9}' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '\u20B1', flag: '\u{1F1F5}\u{1F1ED}' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '\u20AB', flag: '\u{1F1FB}\u{1F1F3}' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '\u20A8', flag: '\u{1F1F5}\u{1F1F0}' },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '\u09F3', flag: '\u{1F1E7}\u{1F1E9}' },
  { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '\u20B4', flag: '\u{1F1FA}\u{1F1E6}' },
  // Crypto (4)
  { code: 'BTC', name: 'Bitcoin', symbol: '\u20BF', flag: '\u{1FA99}', isCrypto: true },
  { code: 'ETH', name: 'Ethereum', symbol: '\u039E', flag: '\u{1FA99}', isCrypto: true },
  { code: 'SOL', name: 'Solana', symbol: 'SOL', flag: '\u{1FA99}', isCrypto: true },
  { code: 'DOGE', name: 'Dogecoin', symbol: '\u0110', flag: '\u{1FA99}', isCrypto: true },
]

// ─── Fallback rates (vs USD) ───────────────────────────────────────────────

export const fallbackRates: RateMap = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.5,
  CHF: 0.88,
  CAD: 1.36,
  AUD: 1.53,
  CNY: 7.24,
  INR: 83.1,
  KRW: 1330,
  NZD: 1.64,
  SGD: 1.34,
  HKD: 7.82,
  TWD: 31.5,
  SEK: 10.4,
  NOK: 10.6,
  DKK: 6.87,
  PLN: 3.98,
  CZK: 23.2,
  HUF: 362,
  RON: 4.58,
  BGN: 1.8,
  TRY: 32.5,
  RUB: 92,
  BRL: 4.97,
  MXN: 17.1,
  ARS: 870,
  CLP: 930,
  COP: 3950,
  PEN: 3.72,
  ZAR: 18.6,
  NGN: 1550,
  EGP: 30.9,
  KES: 156,
  GHS: 12.5,
  AED: 3.67,
  SAR: 3.75,
  ILS: 3.64,
  THB: 35.2,
  MYR: 4.72,
  IDR: 15650,
  PHP: 55.8,
  VND: 24500,
  PKR: 278,
  BDT: 110,
  UAH: 38.5,
  BTC: 0.0000148,
  ETH: 0.000285,
  SOL: 0.0053,
  DOGE: 5.88,
}

// ─── Rate fetching ──────────────────────────────────────────────────────────

let cachedRates: RateMap | null = null

export async function fetchRates(): Promise<RateMap> {
  if (cachedRates) return cachedRates

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10_000)
    const res = await fetch('https://api.frankfurter.dev/v1/latest?base=USD', {
      signal: controller.signal,
    })
    clearTimeout(timeout)

    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = (await res.json()) as { rates: Record<string, number> }

    const rates: RateMap = { USD: 1, ...data.rates }
    // API doesn't support crypto — use fallback for those
    for (const c of currencies) {
      if (c.isCrypto) {
        const fallback = fallbackRates[c.code]
        if (fallback !== undefined) rates[c.code] = fallback
      }
    }
    cachedRates = rates
    return rates
  } catch {
    console.warn('Currency API fetch failed, using fallback rates')
    cachedRates = { ...fallbackRates }
    return cachedRates
  }
}

// ─── Conversion ─────────────────────────────────────────────────────────────

export function convertCurrency(amount: number, from: string, to: string, rates: RateMap): number {
  const fromRate = rates[from]
  const toRate = rates[to]
  if (!fromRate || !toRate) return 0
  // Convert via USD: amount / fromRate * toRate
  return (amount / fromRate) * toRate
}

// ─── Helpers ────────────────────────────────────────────────────────────────

export function getCurrencyByCode(code: string): Currency | undefined {
  return currencies.find((c) => c.code === code)
}

export function getRelatedCurrencyEntries(
  fromCode: string,
  toCode: string,
  excludeAmount?: number,
): CurrencyEntry[] {
  return currencyEntries.filter(
    (e) =>
      e.fromCode === fromCode &&
      e.toCode === toCode &&
      e.amount !== excludeAmount,
  )
}

// ─── pSEO entry generation ──────────────────────────────────────────────────

const allAmounts = [1, 5, 10, 50, 100, 500, 1000, 5000, 10000]
const cryptoAmounts = [1, 5, 10, 50, 100, 500, 1000]

function isMajor(code: string): boolean {
  return (majorCodes as readonly string[]).includes(code)
}

function generateEntries(): CurrencyEntry[] {
  const entries: CurrencyEntry[] = []
  const seen = new Set<string>()

  function add(amount: number, from: string, to: string) {
    const slug = `${amount}-${from.toLowerCase()}-to-${to.toLowerCase()}`
    if (seen.has(slug)) return
    seen.add(slug)
    entries.push({ slug, amount, fromCode: from, toCode: to })
  }

  const fiatCurrencies = currencies.filter((c) => !c.isCrypto)
  const cryptoCurrencies = currencies.filter((c) => c.isCrypto)

  // Top 10 major currencies: cross-pairs vs ALL other currencies
  for (const from of fiatCurrencies.filter((c) => isMajor(c.code))) {
    for (const to of fiatCurrencies) {
      if (from.code === to.code) continue
      const amounts = allAmounts
      for (const amt of amounts) {
        add(amt, from.code, to.code)
      }
    }
  }

  // Other fiat: only vs anchor currencies (USD, EUR, GBP)
  for (const from of fiatCurrencies.filter((c) => !isMajor(c.code))) {
    for (const anchorCode of anchorCodes) {
      for (const amt of allAmounts) {
        add(amt, from.code, anchorCode)
        add(amt, anchorCode, from.code)
      }
    }
  }

  // Crypto: vs anchor currencies only
  for (const crypto of cryptoCurrencies) {
    for (const anchorCode of anchorCodes) {
      for (const amt of cryptoAmounts) {
        add(amt, crypto.code, anchorCode)
        add(amt, anchorCode, crypto.code)
      }
    }
  }

  return entries
}

export const currencyEntries: CurrencyEntry[] = generateEntries()
