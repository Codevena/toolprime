export interface NumberBaseEntry {
  slug: string
  value: number
  toBase: string
  result: string
}

export interface AsciiEntry {
  slug: string
  code: number
  char: string
  description: string
}

/** Convert a decimal number to the given base string */
export function convertBase(value: number, toBase: 'binary' | 'octal' | 'hexadecimal'): string {
  const radix = toBase === 'binary' ? 2 : toBase === 'octal' ? 8 : 16
  return value.toString(radix).toUpperCase()
}

// ---------------------------------------------------------------------------
// Number base entries
// ---------------------------------------------------------------------------

const bases = ['binary', 'octal', 'hexadecimal'] as const

function makeEntry(value: number, toBase: (typeof bases)[number]): NumberBaseEntry {
  const result = convertBase(value, toBase)
  return {
    slug: `${value}-to-${toBase}`,
    value,
    toBase,
    result,
  }
}

// 0-1023 x 3 bases = 3072
const byteRange: NumberBaseEntry[] = []
for (let i = 0; i <= 1023; i++) {
  for (const b of bases) {
    byteRange.push(makeEntry(i, b))
  }
}

// Additional important numbers
const extraNumbers = [
  256, 512, 1024, 2048, 4096, 8080, 8443, 65535,
  500, 1000, 5000, 10000,
]
const extraEntries: NumberBaseEntry[] = []
for (const n of extraNumbers) {
  for (const b of bases) {
    extraEntries.push(makeEntry(n, b))
  }
}

// Hex-to-decimal pages
const hexValues = [
  'A', 'B', 'C', 'D', 'E', 'F', 'FF', '0A', '1F', '7F', '80',
  '100', 'FFFF', 'DEAD', 'BEEF', 'CAFE', 'BABE',
]

export interface HexToDecimalEntry {
  slug: string
  hex: string
  decimal: number
}

export const hexToDecimalEntries: HexToDecimalEntry[] = hexValues.map((hex) => ({
  slug: `${hex.toLowerCase()}-hex-to-decimal`,
  hex: hex.toUpperCase(),
  decimal: parseInt(hex, 16),
}))

export const numberBaseEntries: NumberBaseEntry[] = [...byteRange, ...extraEntries]

// ---------------------------------------------------------------------------
// ASCII entries (0-127)
// ---------------------------------------------------------------------------

const controlCharNames: Record<number, string> = {
  0: 'NUL', 1: 'SOH', 2: 'STX', 3: 'ETX', 4: 'EOT', 5: 'ENQ',
  6: 'ACK', 7: 'BEL', 8: 'BS', 9: 'TAB', 10: 'LF', 11: 'VT',
  12: 'FF', 13: 'CR', 14: 'SO', 15: 'SI', 16: 'DLE', 17: 'DC1',
  18: 'DC2', 19: 'DC3', 20: 'DC4', 21: 'NAK', 22: 'SYN', 23: 'ETB',
  24: 'CAN', 25: 'EM', 26: 'SUB', 27: 'ESC', 28: 'FS', 29: 'GS',
  30: 'RS', 31: 'US', 127: 'DEL',
}

const controlCharDescriptions: Record<number, string> = {
  0: 'Null character', 1: 'Start of Heading', 2: 'Start of Text',
  3: 'End of Text', 4: 'End of Transmission', 5: 'Enquiry',
  6: 'Acknowledge', 7: 'Bell', 8: 'Backspace', 9: 'Horizontal Tab',
  10: 'Line Feed (newline)', 11: 'Vertical Tab', 12: 'Form Feed',
  13: 'Carriage Return', 14: 'Shift Out', 15: 'Shift In',
  16: 'Data Link Escape', 17: 'Device Control 1 (XON)',
  18: 'Device Control 2', 19: 'Device Control 3 (XOFF)',
  20: 'Device Control 4', 21: 'Negative Acknowledge',
  22: 'Synchronous Idle', 23: 'End of Transmission Block',
  24: 'Cancel', 25: 'End of Medium', 26: 'Substitute',
  27: 'Escape', 28: 'File Separator', 29: 'Group Separator',
  30: 'Record Separator', 31: 'Unit Separator', 127: 'Delete',
}

export const asciiEntries: AsciiEntry[] = []
for (let code = 0; code <= 127; code++) {
  const isControl = code <= 31 || code === 127
  const char = isControl ? (controlCharNames[code] ?? `CTRL-${code}`) : String.fromCharCode(code)
  const description = isControl
    ? (controlCharDescriptions[code] ?? `Control character ${code}`)
    : code === 32
      ? 'Space character'
      : `Printable character "${char}"`

  asciiEntries.push({
    slug: `ascii-${code}`,
    code,
    char,
    description,
  })
}

// ---------------------------------------------------------------------------
// Related entries helper
// ---------------------------------------------------------------------------

export function getRelatedNumberBaseEntries(
  currentSlug: string,
  currentValue: number,
): NumberBaseEntry[] {
  // Return the same number in other bases, plus nearby numbers in same base
  return numberBaseEntries
    .filter((e) => e.slug !== currentSlug && (e.value === currentValue || Math.abs(e.value - currentValue) <= 5))
    .slice(0, 12)
}
