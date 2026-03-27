export interface Conversion {
  from: string
  fromAbbr: string
  to: string
  toAbbr: string
  factor?: number
  formula?: string
  reverseFormula?: string
  category: ConversionCategory
}

export type ConversionCategory = 'length' | 'weight' | 'temperature' | 'volume' | 'area' | 'speed' | 'time' | 'digital'

export const conversionCategoryLabels: Record<ConversionCategory, string> = {
  length: 'Length',
  weight: 'Weight & Mass',
  temperature: 'Temperature',
  volume: 'Volume',
  area: 'Area',
  speed: 'Speed',
  time: 'Time',
  digital: 'Digital Storage',
}

export const conversions: Conversion[] = [
  // Length
  { from: 'kilometer', fromAbbr: 'km', to: 'mile', toAbbr: 'mi', factor: 0.621371, category: 'length' },
  { from: 'meter', fromAbbr: 'm', to: 'foot', toAbbr: 'ft', factor: 3.28084, category: 'length' },
  { from: 'centimeter', fromAbbr: 'cm', to: 'inch', toAbbr: 'in', factor: 0.393701, category: 'length' },
  { from: 'millimeter', fromAbbr: 'mm', to: 'inch', toAbbr: 'in', factor: 0.0393701, category: 'length' },
  { from: 'meter', fromAbbr: 'm', to: 'yard', toAbbr: 'yd', factor: 1.09361, category: 'length' },
  { from: 'inch', fromAbbr: 'in', to: 'centimeter', toAbbr: 'cm', factor: 2.54, category: 'length' },
  { from: 'foot', fromAbbr: 'ft', to: 'meter', toAbbr: 'm', factor: 0.3048, category: 'length' },
  { from: 'mile', fromAbbr: 'mi', to: 'kilometer', toAbbr: 'km', factor: 1.60934, category: 'length' },
  { from: 'yard', fromAbbr: 'yd', to: 'meter', toAbbr: 'm', factor: 0.9144, category: 'length' },

  // Weight
  { from: 'kilogram', fromAbbr: 'kg', to: 'pound', toAbbr: 'lbs', factor: 2.20462, category: 'weight' },
  { from: 'pound', fromAbbr: 'lbs', to: 'kilogram', toAbbr: 'kg', factor: 0.453592, category: 'weight' },
  { from: 'gram', fromAbbr: 'g', to: 'ounce', toAbbr: 'oz', factor: 0.035274, category: 'weight' },
  { from: 'ounce', fromAbbr: 'oz', to: 'gram', toAbbr: 'g', factor: 28.3495, category: 'weight' },
  { from: 'kilogram', fromAbbr: 'kg', to: 'stone', toAbbr: 'st', factor: 0.157473, category: 'weight' },
  { from: 'metric ton', fromAbbr: 't', to: 'pound', toAbbr: 'lbs', factor: 2204.62, category: 'weight' },

  // Temperature (formulas instead of factors)
  { from: 'celsius', fromAbbr: '°C', to: 'fahrenheit', toAbbr: '°F', formula: '(x * 9/5) + 32', reverseFormula: '(x - 32) * 5/9', category: 'temperature' },
  { from: 'celsius', fromAbbr: '°C', to: 'kelvin', toAbbr: 'K', formula: 'x + 273.15', reverseFormula: 'x - 273.15', category: 'temperature' },
  { from: 'fahrenheit', fromAbbr: '°F', to: 'celsius', toAbbr: '°C', formula: '(x - 32) * 5/9', reverseFormula: '(x * 9/5) + 32', category: 'temperature' },

  // Volume
  { from: 'liter', fromAbbr: 'L', to: 'gallon (US)', toAbbr: 'gal', factor: 0.264172, category: 'volume' },
  { from: 'gallon (US)', fromAbbr: 'gal', to: 'liter', toAbbr: 'L', factor: 3.78541, category: 'volume' },
  { from: 'milliliter', fromAbbr: 'mL', to: 'fluid ounce', toAbbr: 'fl oz', factor: 0.033814, category: 'volume' },
  { from: 'cup (US)', fromAbbr: 'cup', to: 'milliliter', toAbbr: 'mL', factor: 236.588, category: 'volume' },
  { from: 'tablespoon', fromAbbr: 'tbsp', to: 'milliliter', toAbbr: 'mL', factor: 14.7868, category: 'volume' },

  // Area
  { from: 'square meter', fromAbbr: 'sq m', to: 'square foot', toAbbr: 'sq ft', factor: 10.7639, category: 'area' },
  { from: 'hectare', fromAbbr: 'ha', to: 'acre', toAbbr: 'ac', factor: 2.47105, category: 'area' },
  { from: 'square kilometer', fromAbbr: 'sq km', to: 'square mile', toAbbr: 'sq mi', factor: 0.386102, category: 'area' },

  // Speed
  { from: 'km/h', fromAbbr: 'km/h', to: 'mph', toAbbr: 'mph', factor: 0.621371, category: 'speed' },
  { from: 'mph', fromAbbr: 'mph', to: 'km/h', toAbbr: 'km/h', factor: 1.60934, category: 'speed' },
  { from: 'm/s', fromAbbr: 'm/s', to: 'km/h', toAbbr: 'km/h', factor: 3.6, category: 'speed' },
  { from: 'knot', fromAbbr: 'kn', to: 'km/h', toAbbr: 'km/h', factor: 1.852, category: 'speed' },

  // Time
  { from: 'hour', fromAbbr: 'hr', to: 'minute', toAbbr: 'min', factor: 60, category: 'time' },
  { from: 'day', fromAbbr: 'd', to: 'hour', toAbbr: 'hr', factor: 24, category: 'time' },
  { from: 'week', fromAbbr: 'wk', to: 'day', toAbbr: 'd', factor: 7, category: 'time' },
  { from: 'year', fromAbbr: 'yr', to: 'day', toAbbr: 'd', factor: 365.25, category: 'time' },

  // Digital Storage (SI decimal convention: 1 GB = 1000 MB, 1 MB = 1000 KB)
  { from: 'megabyte (decimal)', fromAbbr: 'MB', to: 'gigabyte (decimal)', toAbbr: 'GB', factor: 0.001, category: 'digital' },
  { from: 'gigabyte (decimal)', fromAbbr: 'GB', to: 'terabyte (decimal)', toAbbr: 'TB', factor: 0.001, category: 'digital' },
  { from: 'kilobyte (decimal)', fromAbbr: 'KB', to: 'megabyte (decimal)', toAbbr: 'MB', factor: 0.001, category: 'digital' },
  { from: 'megabit', fromAbbr: 'Mbit', to: 'megabyte (decimal)', toAbbr: 'MB', factor: 0.125, category: 'digital' },
]

export function getSlug(conversion: Conversion): string {
  return `${conversion.fromAbbr.toLowerCase().replace(/[^a-z0-9]/g, '')}-to-${conversion.toAbbr.toLowerCase().replace(/[^a-z0-9]/g, '')}`
}

// Safe lookup table for temperature formula strings — avoids new Function() / eval()
export const formulaFunctions: Record<string, (x: number) => number> = {
  '(x * 9/5) + 32': (x) => (x * 9 / 5) + 32,
  '(x - 32) * 5/9': (x) => (x - 32) * 5 / 9,
  'x + 273.15': (x) => x + 273.15,
  'x - 273.15': (x) => x - 273.15,
}

export function convert(conversion: Conversion, value: number): number {
  if (conversion.factor !== undefined) {
    return value * conversion.factor
  }
  if (conversion.formula) {
    const fn = formulaFunctions[conversion.formula]
    if (!fn) throw new Error(`Unknown formula: ${conversion.formula}`)
    return fn(value)
  }
  return value
}

export function getConversionsByCategory(category: ConversionCategory): Conversion[] {
  return conversions.filter(c => c.category === category)
}
