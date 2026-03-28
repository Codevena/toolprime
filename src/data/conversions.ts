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

export type ConversionCategory = 'length' | 'weight' | 'temperature' | 'volume' | 'area' | 'speed' | 'time' | 'digital' | 'energy' | 'pressure' | 'fuel'

export const conversionCategoryLabels: Record<ConversionCategory, string> = {
  length: 'Length',
  weight: 'Weight & Mass',
  temperature: 'Temperature',
  volume: 'Volume',
  area: 'Area',
  speed: 'Speed',
  time: 'Time',
  digital: 'Digital Storage',
  energy: 'Energy',
  pressure: 'Pressure',
  fuel: 'Fuel Economy',
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

  // Energy
  { from: 'joule', fromAbbr: 'J', to: 'calorie', toAbbr: 'cal', factor: 0.239006, category: 'energy' },
  { from: 'calorie', fromAbbr: 'cal', to: 'joule', toAbbr: 'J', factor: 4.184, category: 'energy' },
  { from: 'kilocalorie', fromAbbr: 'kcal', to: 'joule', toAbbr: 'J', factor: 4184, category: 'energy' },
  { from: 'joule', fromAbbr: 'J', to: 'kilojoule', toAbbr: 'kJ', factor: 0.001, category: 'energy' },
  { from: 'kilojoule', fromAbbr: 'kJ', to: 'kilocalorie', toAbbr: 'kcal', factor: 0.239006, category: 'energy' },
  { from: 'kilocalorie', fromAbbr: 'kcal', to: 'kilojoule', toAbbr: 'kJ', factor: 4.184, category: 'energy' },
  { from: 'kilowatt-hour', fromAbbr: 'kWh', to: 'joule', toAbbr: 'J', factor: 3600000, category: 'energy' },
  { from: 'kilowatt-hour', fromAbbr: 'kWh', to: 'kilocalorie', toAbbr: 'kcal', factor: 860.421, category: 'energy' },
  { from: 'BTU', fromAbbr: 'BTU', to: 'joule', toAbbr: 'J', factor: 1055.06, category: 'energy' },
  { from: 'BTU', fromAbbr: 'BTU', to: 'kilocalorie', toAbbr: 'kcal', factor: 0.25216, category: 'energy' },
  { from: 'watt-hour', fromAbbr: 'Wh', to: 'joule', toAbbr: 'J', factor: 3600, category: 'energy' },
  { from: 'watt-hour', fromAbbr: 'Wh', to: 'kilowatt-hour', toAbbr: 'kWh', factor: 0.001, category: 'energy' },
  { from: 'electronvolt', fromAbbr: 'eV', to: 'joule', toAbbr: 'J', factor: 1.602176634e-19, category: 'energy' },
  { from: 'therm', fromAbbr: 'thm', to: 'BTU', toAbbr: 'BTU', factor: 100000, category: 'energy' },

  // Pressure
  { from: 'pascal', fromAbbr: 'Pa', to: 'bar', toAbbr: 'bar', factor: 0.00001, category: 'pressure' },
  { from: 'bar', fromAbbr: 'bar', to: 'pascal', toAbbr: 'Pa', factor: 100000, category: 'pressure' },
  { from: 'pascal', fromAbbr: 'Pa', to: 'psi', toAbbr: 'psi', factor: 0.000145038, category: 'pressure' },
  { from: 'psi', fromAbbr: 'psi', to: 'pascal', toAbbr: 'Pa', factor: 6894.76, category: 'pressure' },
  { from: 'bar', fromAbbr: 'bar', to: 'psi', toAbbr: 'psi', factor: 14.5038, category: 'pressure' },
  { from: 'psi', fromAbbr: 'psi', to: 'bar', toAbbr: 'bar', factor: 0.0689476, category: 'pressure' },
  { from: 'bar', fromAbbr: 'bar', to: 'atmosphere', toAbbr: 'atm', factor: 0.986923, category: 'pressure' },
  { from: 'atmosphere', fromAbbr: 'atm', to: 'bar', toAbbr: 'bar', factor: 1.01325, category: 'pressure' },
  { from: 'atmosphere', fromAbbr: 'atm', to: 'pascal', toAbbr: 'Pa', factor: 101325, category: 'pressure' },
  { from: 'atmosphere', fromAbbr: 'atm', to: 'psi', toAbbr: 'psi', factor: 14.696, category: 'pressure' },
  { from: 'mmHg', fromAbbr: 'mmHg', to: 'pascal', toAbbr: 'Pa', factor: 133.322, category: 'pressure' },
  { from: 'mmHg', fromAbbr: 'mmHg', to: 'atmosphere', toAbbr: 'atm', factor: 0.00131579, category: 'pressure' },
  { from: 'torr', fromAbbr: 'Torr', to: 'pascal', toAbbr: 'Pa', factor: 133.322, category: 'pressure' },
  { from: 'kilopascal', fromAbbr: 'kPa', to: 'psi', toAbbr: 'psi', factor: 0.145038, category: 'pressure' },

  // Fuel Economy
  { from: 'km/L', fromAbbr: 'km/L', to: 'L/100km', toAbbr: 'L/100km', formula: '100 / x', reverseFormula: '100 / x', category: 'fuel' },
  { from: 'km/L', fromAbbr: 'km/L', to: 'mpg (US)', toAbbr: 'mpg', factor: 2.35215, category: 'fuel' },
  { from: 'mpg (US)', fromAbbr: 'mpg', to: 'km/L', toAbbr: 'km/L', factor: 0.425144, category: 'fuel' },
  { from: 'L/100km', fromAbbr: 'L/100km', to: 'mpg (US)', toAbbr: 'mpg', formula: '235.215 / x', reverseFormula: '235.215 / x', category: 'fuel' },
  { from: 'mpg (US)', fromAbbr: 'mpg', to: 'mpg (UK)', toAbbr: 'mpg UK', factor: 1.20095, category: 'fuel' },
  { from: 'mpg (UK)', fromAbbr: 'mpg UK', to: 'mpg (US)', toAbbr: 'mpg', factor: 0.832674, category: 'fuel' },
  { from: 'mpg (UK)', fromAbbr: 'mpg UK', to: 'L/100km', toAbbr: 'L/100km', formula: '282.481 / x', reverseFormula: '282.481 / x', category: 'fuel' },

  // Additional Length
  { from: 'nautical mile', fromAbbr: 'nmi', to: 'kilometer', toAbbr: 'km', factor: 1.852, category: 'length' },
  { from: 'kilometer', fromAbbr: 'km', to: 'nautical mile', toAbbr: 'nmi', factor: 0.539957, category: 'length' },
  { from: 'mile', fromAbbr: 'mi', to: 'nautical mile', toAbbr: 'nmi', factor: 0.868976, category: 'length' },
  { from: 'micrometer', fromAbbr: 'um', to: 'millimeter', toAbbr: 'mm', factor: 0.001, category: 'length' },
  { from: 'micrometer', fromAbbr: 'um', to: 'inch', toAbbr: 'in', factor: 0.0000393701, category: 'length' },
  { from: 'fathom', fromAbbr: 'ftm', to: 'meter', toAbbr: 'm', factor: 1.8288, category: 'length' },
  { from: 'fathom', fromAbbr: 'ftm', to: 'foot', toAbbr: 'ft', factor: 6, category: 'length' },
  { from: 'league', fromAbbr: 'lea', to: 'kilometer', toAbbr: 'km', factor: 4.828, category: 'length' },
  { from: 'league', fromAbbr: 'lea', to: 'mile', toAbbr: 'mi', factor: 3, category: 'length' },

  // Additional Weight
  { from: 'milligram', fromAbbr: 'mg', to: 'gram', toAbbr: 'g', factor: 0.001, category: 'weight' },
  { from: 'gram', fromAbbr: 'g', to: 'milligram', toAbbr: 'mg', factor: 1000, category: 'weight' },
  { from: 'microgram', fromAbbr: 'ug', to: 'milligram', toAbbr: 'mg', factor: 0.001, category: 'weight' },
  { from: 'carat', fromAbbr: 'ct', to: 'gram', toAbbr: 'g', factor: 0.2, category: 'weight' },
  { from: 'carat', fromAbbr: 'ct', to: 'ounce', toAbbr: 'oz', factor: 0.00705479, category: 'weight' },
  { from: 'short ton', fromAbbr: 'US t', to: 'kilogram', toAbbr: 'kg', factor: 907.185, category: 'weight' },
  { from: 'short ton', fromAbbr: 'US t', to: 'metric ton', toAbbr: 't', factor: 0.907185, category: 'weight' },
  { from: 'long ton', fromAbbr: 'UK t', to: 'kilogram', toAbbr: 'kg', factor: 1016.05, category: 'weight' },
  { from: 'long ton', fromAbbr: 'UK t', to: 'metric ton', toAbbr: 't', factor: 1.01605, category: 'weight' },
  { from: 'stone', fromAbbr: 'st', to: 'pound', toAbbr: 'lbs', factor: 14, category: 'weight' },
  { from: 'grain', fromAbbr: 'gr', to: 'gram', toAbbr: 'g', factor: 0.0647989, category: 'weight' },

  // Additional Volume
  { from: 'pint (US)', fromAbbr: 'pt', to: 'liter', toAbbr: 'L', factor: 0.473176, category: 'volume' },
  { from: 'quart (US)', fromAbbr: 'qt', to: 'liter', toAbbr: 'L', factor: 0.946353, category: 'volume' },
  { from: 'cubic meter', fromAbbr: 'cu m', to: 'liter', toAbbr: 'L', factor: 1000, category: 'volume' },
  { from: 'cubic foot', fromAbbr: 'cu ft', to: 'liter', toAbbr: 'L', factor: 28.3168, category: 'volume' },
  { from: 'cubic inch', fromAbbr: 'cu in', to: 'milliliter', toAbbr: 'mL', factor: 16.3871, category: 'volume' },
  { from: 'teaspoon', fromAbbr: 'tsp', to: 'milliliter', toAbbr: 'mL', factor: 4.92892, category: 'volume' },
  { from: 'imperial gallon', fromAbbr: 'imp gal', to: 'liter', toAbbr: 'L', factor: 4.54609, category: 'volume' },
  { from: 'imperial pint', fromAbbr: 'imp pt', to: 'milliliter', toAbbr: 'mL', factor: 568.261, category: 'volume' },
  { from: 'barrel (oil)', fromAbbr: 'bbl', to: 'liter', toAbbr: 'L', factor: 158.987, category: 'volume' },
  { from: 'cubic centimeter', fromAbbr: 'cc', to: 'milliliter', toAbbr: 'mL', factor: 1, category: 'volume' },
  { from: 'imperial fluid ounce', fromAbbr: 'imp fl oz', to: 'milliliter', toAbbr: 'mL', factor: 28.4131, category: 'volume' },
  { from: 'cup (US)', fromAbbr: 'cup', to: 'fluid ounce', toAbbr: 'fl oz', factor: 8, category: 'volume' },
  { from: 'tablespoon', fromAbbr: 'tbsp', to: 'teaspoon', toAbbr: 'tsp', factor: 3, category: 'volume' },
  { from: 'bushel', fromAbbr: 'bu', to: 'liter', toAbbr: 'L', factor: 35.2391, category: 'volume' },

  // Additional Area
  { from: 'square inch', fromAbbr: 'sq in', to: 'square centimeter', toAbbr: 'sq cm', factor: 6.4516, category: 'area' },
  { from: 'square yard', fromAbbr: 'sq yd', to: 'square meter', toAbbr: 'sq m', factor: 0.836127, category: 'area' },
  { from: 'acre', fromAbbr: 'ac', to: 'hectare', toAbbr: 'ha', factor: 0.404686, category: 'area' },
  { from: 'acre', fromAbbr: 'ac', to: 'square meter', toAbbr: 'sq m', factor: 4046.86, category: 'area' },
  { from: 'square foot', fromAbbr: 'sq ft', to: 'square meter', toAbbr: 'sq m', factor: 0.092903, category: 'area' },
  { from: 'square mile', fromAbbr: 'sq mi', to: 'acre', toAbbr: 'ac', factor: 640, category: 'area' },
  { from: 'square mile', fromAbbr: 'sq mi', to: 'square kilometer', toAbbr: 'sq km', factor: 2.58999, category: 'area' },
  { from: 'are', fromAbbr: 'a', to: 'square meter', toAbbr: 'sq m', factor: 100, category: 'area' },

  // Additional Speed
  { from: 'ft/s', fromAbbr: 'ft/s', to: 'm/s', toAbbr: 'm/s', factor: 0.3048, category: 'speed' },
  { from: 'ft/s', fromAbbr: 'ft/s', to: 'mph', toAbbr: 'mph', factor: 0.681818, category: 'speed' },
  { from: 'mach', fromAbbr: 'Ma', to: 'km/h', toAbbr: 'km/h', factor: 1234.8, category: 'speed' },
  { from: 'mach', fromAbbr: 'Ma', to: 'mph', toAbbr: 'mph', factor: 767.269, category: 'speed' },
  { from: 'knot', fromAbbr: 'kn', to: 'mph', toAbbr: 'mph', factor: 1.15078, category: 'speed' },
  { from: 'cm/s', fromAbbr: 'cm/s', to: 'm/s', toAbbr: 'm/s', factor: 0.01, category: 'speed' },

  // Additional Temperature
  { from: 'fahrenheit', fromAbbr: '°F', to: 'kelvin', toAbbr: 'K', formula: '(x - 32) * 5/9 + 273.15', reverseFormula: '(x - 273.15) * 9/5 + 32', category: 'temperature' },
  { from: 'kelvin', fromAbbr: 'K', to: 'celsius', toAbbr: '°C', formula: 'x - 273.15', reverseFormula: 'x + 273.15', category: 'temperature' },

  // Additional Digital Storage
  { from: 'bit', fromAbbr: 'bit', to: 'byte', toAbbr: 'B', factor: 0.125, category: 'digital' },
  { from: 'byte', fromAbbr: 'B', to: 'kilobyte (decimal)', toAbbr: 'KB', factor: 0.001, category: 'digital' },
  { from: 'petabyte (decimal)', fromAbbr: 'PB', to: 'terabyte (decimal)', toAbbr: 'TB', factor: 1000, category: 'digital' },
  { from: 'exabyte (decimal)', fromAbbr: 'EB', to: 'petabyte (decimal)', toAbbr: 'PB', factor: 1000, category: 'digital' },
  { from: 'mebibyte', fromAbbr: 'MiB', to: 'megabyte (decimal)', toAbbr: 'MB', factor: 1.048576, category: 'digital' },
  { from: 'gibibyte', fromAbbr: 'GiB', to: 'gigabyte (decimal)', toAbbr: 'GB', factor: 1.073741824, category: 'digital' },
  { from: 'tebibyte', fromAbbr: 'TiB', to: 'terabyte (decimal)', toAbbr: 'TB', factor: 1.099511628, category: 'digital' },
  { from: 'kibibyte', fromAbbr: 'KiB', to: 'kilobyte (decimal)', toAbbr: 'KB', factor: 1.024, category: 'digital' },

  // Additional Time
  { from: 'second', fromAbbr: 's', to: 'millisecond', toAbbr: 'ms', factor: 1000, category: 'time' },
  { from: 'minute', fromAbbr: 'min', to: 'second', toAbbr: 's', factor: 60, category: 'time' },
  { from: 'month', fromAbbr: 'mo', to: 'day', toAbbr: 'd', factor: 30.4375, category: 'time' },
  { from: 'month', fromAbbr: 'mo', to: 'week', toAbbr: 'wk', factor: 4.34821, category: 'time' },
  { from: 'decade', fromAbbr: 'dec', to: 'year', toAbbr: 'yr', factor: 10, category: 'time' },
  { from: 'century', fromAbbr: 'c', to: 'year', toAbbr: 'yr', factor: 100, category: 'time' },
  { from: 'microsecond', fromAbbr: 'us', to: 'millisecond', toAbbr: 'ms', factor: 0.001, category: 'time' },
  { from: 'nanosecond', fromAbbr: 'ns', to: 'microsecond', toAbbr: 'us', factor: 0.001, category: 'time' },
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
  '(x - 32) * 5/9 + 273.15': (x) => (x - 32) * 5 / 9 + 273.15,
  '(x - 273.15) * 9/5 + 32': (x) => (x - 273.15) * 9 / 5 + 32,
  '100 / x': (x) => x === 0 ? 0 : 100 / x,
  '235.215 / x': (x) => x === 0 ? 0 : 235.215 / x,
  '282.481 / x': (x) => x === 0 ? 0 : 282.481 / x,
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
