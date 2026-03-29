import type { Tool } from '@/data/tools'
import { getSlug } from '@/data/conversions'
import type { Conversion } from '@/data/conversions'

export interface MetaTags {
  title: string
  description: string
  canonical: string
  ogTitle: string
  ogDescription: string
  ogType: string
  ogImage?: string
}

const SITE_NAME = 'ToolPrime'
const SITE_URL = 'https://toolprime.dev'

export function getToolMeta(tool: Tool): MetaTags {
  return {
    title: `${tool.name} — Free Online Tool | ${SITE_NAME}`,
    description: tool.description,
    canonical: `${SITE_URL}${tool.path}`,
    ogTitle: `${tool.name} — Free Online Tool`,
    ogDescription: tool.description,
    ogType: 'website',
    ogImage: `${SITE_URL}/og/${tool.id}.png`,
  }
}

export function getConversionMeta(from: string, fromAbbr: string, to: string, toAbbr: string): MetaTags {
  const title = `Convert ${from} (${fromAbbr}) to ${to} (${toAbbr}) — Free Online Converter | ${SITE_NAME}`
  const description = `Instantly convert ${from} to ${to} with our free online converter. Includes a conversion table and formula. No signup required.`
  // Use shared getSlug logic via a temporary partial Conversion object
  const slug = getSlug({ fromAbbr, toAbbr } as Conversion)

  return {
    title: title.length > 60 ? `${from} to ${to} Converter | ${SITE_NAME}` : title,
    description,
    canonical: `${SITE_URL}/converters/${slug}`,
    ogTitle: `${from} to ${to} Converter`,
    ogDescription: description,
    ogType: 'website',
  }
}

export function getPercentageMeta(percentage: number, base: number, result: number): MetaTags {
  return {
    title: `What is ${percentage}% of ${base}? Answer: ${result} | ${SITE_NAME}`,
    description: `${percentage}% of ${base} = ${result}. Calculate percentages instantly with our free online percentage calculator. No signup required.`,
    canonical: `${SITE_URL}/calculators/what-is-${percentage}-percent-of-${base}`,
    ogTitle: `What is ${percentage}% of ${base}? Answer: ${result}`,
    ogDescription: `${percentage}% of ${base} = ${result}. Free online percentage calculator.`,
    ogType: 'website',
  }
}

export function getPercentageIndexMeta(): MetaTags {
  return {
    title: `Percentage Calculator — What is X% of Y? | ${SITE_NAME}`,
    description: 'Calculate any percentage instantly. What is X% of Y? Free online percentage calculator with step-by-step explanations. No signup required.',
    canonical: `${SITE_URL}/calculators`,
    ogTitle: `Percentage Calculator — What is X% of Y?`,
    ogDescription: 'Calculate any percentage instantly. Free online calculator.',
    ogType: 'website',
  }
}

export function getHomeMeta(): MetaTags {
  return {
    title: `Free Online Tools for Developers & Creators | ${SITE_NAME}`,
    description: 'Free online tools: JSON formatter, word counter, image compressor, unit converter, password generator, and more. No signup required.',
    canonical: SITE_URL,
    ogTitle: 'ToolPrime — Free Online Tools',
    ogDescription: 'Free online tools for developers, writers, designers, and everyone. No signup, no server uploads, just instant results.',
    ogType: 'website',
    ogImage: `${SITE_URL}/og/json-formatter.png`,
  }
}

export function getHashMeta(algorithm: string, algorithmLabel: string, word: string, hash: string): MetaTags {
  return {
    title: `${algorithmLabel} Hash of "${word}" — ${hash.slice(0, 8)}... | ${SITE_NAME}`,
    description: `${algorithmLabel} hash of "${word}": ${hash.slice(0, 20)}... Free online hash generator.`,
    canonical: `${SITE_URL}/hashes/${algorithm}-${word}`,
    ogTitle: `${algorithmLabel} Hash of "${word}"`,
    ogDescription: `${algorithmLabel} hash: ${hash}`,
    ogType: 'website',
  }
}

export function getReversePercentageMeta(x: number, y: number, result: number): MetaTags {
  return {
    title: `What Percent is ${x} of ${y}? Answer: ${result}% | ${SITE_NAME}`,
    description: `${x} is ${result}% of ${y}. Calculate what percent one number is of another with our free online percentage calculator.`,
    canonical: `${SITE_URL}/calculators/what-percent-is-${x}-of-${y}`,
    ogTitle: `What Percent is ${x} of ${y}? Answer: ${result}%`,
    ogDescription: `${x} is ${result}% of ${y}. Free online percentage calculator.`,
    ogType: 'website',
  }
}

export function getRegexMeta(name: string, slug: string, _pattern: string): MetaTags {
  return {
    title: `Regex for ${name} — Pattern & Examples | ${SITE_NAME}`,
    description: `Regex for ${name} with live tester, examples, and code snippets for JS, Python, PHP. Free online tool.`,
    canonical: `${SITE_URL}/regex/${slug}`,
    ogTitle: `Regex for ${name}`,
    ogDescription: `Regex pattern for ${name} with live tester and code snippets.`,
    ogType: 'website',
  }
}

export function getFormatConversionMeta(conv: { slug: string; title: string; description: string }): MetaTags {
  return {
    title: `${conv.title} — Free Online Tool | ${SITE_NAME}`,
    description: conv.description,
    canonical: `${SITE_URL}/convert/${conv.slug}`,
    ogTitle: conv.title,
    ogDescription: conv.description,
    ogType: 'website',
  }
}

export function getConvertIndexMeta(): MetaTags {
  return {
    title: `Free Online Converters & Format Tools | ${SITE_NAME}`,
    description: 'Convert between formats, encode, decode, and transform data with free online tools. JSON, Base64, URL encoding, hashes, and more.',
    canonical: `${SITE_URL}/convert`,
    ogTitle: 'Free Online Converters & Format Tools',
    ogDescription: 'Convert between formats with free online tools. No signup required.',
    ogType: 'website',
  }
}

export function getBlogMeta(title: string, slug: string, description: string): MetaTags {
  return {
    title: `${title} | ${SITE_NAME} Blog`,
    description,
    canonical: `${SITE_URL}/blog/${slug}`,
    ogTitle: title,
    ogDescription: description,
    ogType: 'article',
  }
}

export function getBlogIndexMeta(): MetaTags {
  return {
    title: `Blog — Tips, Tutorials & Tool Guides | ${SITE_NAME}`,
    description: 'Tutorials, tips, and guides for developers, designers, and creators. Learn how to use free online tools and improve your workflow.',
    canonical: `${SITE_URL}/blog`,
    ogTitle: `${SITE_NAME} Blog`,
    ogDescription: 'Tutorials, tips, and guides for developers, designers, and creators.',
    ogType: 'website',
  }
}

export function getBlogTagMeta(tag: string): MetaTags {
  const label = tag.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  return {
    title: `Articles tagged "${label}" | ${SITE_NAME} Blog`,
    description: `Browse articles about ${label}. Tutorials, tips, and guides from the ToolPrime team.`,
    canonical: `${SITE_URL}/blog/tag/${tag}`,
    ogTitle: `Articles tagged "${label}"`,
    ogDescription: `Browse articles about ${label} on the ToolPrime blog.`,
    ogType: 'website',
  }
}

export function getGradientMeta(name: string, slug: string, colors: string[]): MetaTags {
  return {
    title: `${name} Gradient — CSS Code & Preview | ${SITE_NAME}`,
    description: `${name} gradient: ${colors.join(' → ')}. Copy the CSS code, preview with adjustable direction, and get Tailwind classes. Free gradient preset.`,
    canonical: `${SITE_URL}/gradients/${slug}`,
    ogTitle: `${name} Gradient`,
    ogDescription: `CSS gradient: ${colors.join(' → ')}. Copy code instantly.`,
    ogType: 'website',
  }
}

export function getMetaTagTemplateMeta(name: string, slug: string): MetaTags {
  return {
    title: `${name} — Free Template & Tips | ${SITE_NAME}`,
    description: `Optimized meta tag template for ${name.toLowerCase()} pages. Copy-ready title, description, Open Graph, and Twitter Card tags with SEO tips.`,
    canonical: `${SITE_URL}/meta-tags/${slug}`,
    ogTitle: `${name} Meta Tag Template`,
    ogDescription: `Ready-to-use meta tag template for ${name.toLowerCase()} with SEO tips and FAQs.`,
    ogType: 'website',
  }
}

export function getMetaTagIndexMeta(): MetaTags {
  return {
    title: `Meta Tag Templates for Every Page Type | ${SITE_NAME}`,
    description: 'Browse 20+ optimized meta tag templates for blogs, e-commerce, SaaS, restaurants, and more. Copy-ready SEO tags with tips and FAQs.',
    canonical: `${SITE_URL}/meta-tags`,
    ogTitle: 'Meta Tag Templates for Every Page Type',
    ogDescription: 'Ready-to-use meta tag templates with SEO tips. Free online tool.',
    ogType: 'website',
  }
}

export function getRobotsTxtTemplateMeta(name: string, slug: string): MetaTags {
  return {
    title: `robots.txt for ${name} — Template & Guide | ${SITE_NAME}`,
    description: `Production-ready robots.txt template for ${name}. Copy the code, understand each directive, and follow best practices for optimal crawling.`,
    canonical: `${SITE_URL}/robots-txt/${slug}`,
    ogTitle: `robots.txt for ${name}`,
    ogDescription: `Ready-to-use robots.txt template for ${name} with line-by-line explanation.`,
    ogType: 'website',
  }
}

export function getRobotsTxtIndexMeta(): MetaTags {
  return {
    title: `robots.txt Templates for Every Framework | ${SITE_NAME}`,
    description: 'Browse 15+ robots.txt templates for WordPress, Next.js, Shopify, Django, and more. Copy-ready with explanations and best practices.',
    canonical: `${SITE_URL}/robots-txt`,
    ogTitle: 'robots.txt Templates for Every Framework',
    ogDescription: 'Ready-to-use robots.txt templates with explanations. Free online tool.',
    ogType: 'website',
  }
}

export function getCronMeta(name: string, slug: string, expression: string): MetaTags {
  return {
    title: `Cron Expression: ${name} (${expression}) | ${SITE_NAME}`,
    description: `Cron expression for ${name}: ${expression}. See next run times, use cases, and code examples for crontab, GitHub Actions, and systemd.`,
    canonical: `${SITE_URL}/cron/${slug}`,
    ogTitle: `Cron: ${name} (${expression})`,
    ogDescription: `${name} cron expression with next run times and code examples.`,
    ogType: 'website',
  }
}

export function getCronIndexMeta(): MetaTags {
  return {
    title: `Common Cron Expressions — Schedule Reference | ${SITE_NAME}`,
    description: 'Browse 40+ common cron expressions with human-readable explanations, next run times, and ready-to-use code for crontab, GitHub Actions, and Kubernetes.',
    canonical: `${SITE_URL}/cron`,
    ogTitle: 'Common Cron Expressions — Schedule Reference',
    ogDescription: 'Browse 40+ common cron expressions with explanations and code examples.',
    ogType: 'website',
  }
}

export function getPaletteMeta(name: string, slug: string, description: string): MetaTags {
  return {
    title: `${name} Color Palette — HEX, RGB, HSL & CSS | ${SITE_NAME}`,
    description,
    canonical: `${SITE_URL}/palettes/${slug}`,
    ogTitle: `${name} Color Palette`,
    ogDescription: description,
    ogType: 'website',
  }
}

export function getPaletteIndexMeta(): MetaTags {
  return {
    title: `Color Palettes — 50 Curated Palettes with CSS & Tailwind | ${SITE_NAME}`,
    description: 'Browse 50 curated color palettes across nature, vibrant, pastel, earth, and corporate categories. Copy HEX, RGB, HSL values, CSS variables, and Tailwind config.',
    canonical: `${SITE_URL}/palettes`,
    ogTitle: 'Curated Color Palettes',
    ogDescription: 'Browse 50 curated color palettes with CSS and Tailwind snippets. Free.',
    ogType: 'website',
  }
}

export function getMortgageMeta(preset: { slug: string; title: string; description: string }): MetaTags {
  return {
    title: `${preset.title} | ${SITE_NAME}`,
    description: preset.description,
    canonical: `${SITE_URL}/calculators/${preset.slug}`,
    ogTitle: preset.title,
    ogDescription: preset.description,
    ogType: 'website',
  }
}

export function getTipMeta(preset: { slug: string; title: string; description: string }): MetaTags {
  return {
    title: `${preset.title} | ${SITE_NAME}`,
    description: preset.description,
    canonical: `${SITE_URL}/calculators/${preset.slug}`,
    ogTitle: preset.title,
    ogDescription: preset.description,
    ogType: 'website',
  }
}

export function getBmiMeta(heightCm: number, weightKg: number, bmi: number, category: string): MetaTags {
  return {
    title: `BMI for ${heightCm} cm & ${weightKg} kg — ${bmi} (${category}) | ${SITE_NAME}`,
    description: `BMI for ${heightCm} cm and ${weightKg} kg is ${bmi} (${category}). Free BMI calculator with healthy weight range and WHO categories.`,
    canonical: `${SITE_URL}/calculators/bmi/bmi-${heightCm}cm-${weightKg}kg`,
    ogTitle: `BMI for ${heightCm} cm & ${weightKg} kg — ${bmi} (${category})`,
    ogDescription: `BMI is ${bmi} (${category}). Free online BMI calculator.`,
    ogType: 'website',
  }
}

export function getBmiIndexMeta(): MetaTags {
  return {
    title: `BMI Calculator — Pre-Calculated BMI for 200+ Height & Weight Combinations | ${SITE_NAME}`,
    description: 'Browse pre-calculated BMI results for 200+ height and weight combinations. Find your BMI category, healthy weight range, and WHO classification instantly.',
    canonical: `${SITE_URL}/calculators/bmi`,
    ogTitle: 'BMI Calculator — Pre-Calculated BMI Tables',
    ogDescription: 'Pre-calculated BMI for 200+ height and weight combinations. Free online tool.',
    ogType: 'website',
  }
}

// Currency conversion pSEO pages
export function getCurrencyConversionMeta(
  amount: number,
  fromCode: string,
  fromName: string,
  toCode: string,
  toName: string,
  result: number,
): MetaTags {
  const title = `${amount} ${fromCode} to ${toCode} — ${result.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${toCode} | ${SITE_NAME}`
  const desc = `Convert ${amount} ${fromName} (${fromCode}) to ${toName} (${toCode}). ${amount} ${fromCode} = ${result.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${toCode}. Free currency converter.`
  return {
    title: title.length > 60 ? `${amount} ${fromCode} to ${toCode} | ${SITE_NAME}` : title,
    description: desc.length > 160 ? desc.slice(0, 157) + '...' : desc,
    canonical: `${SITE_URL}/convert/${amount}-${fromCode.toLowerCase()}-to-${toCode.toLowerCase()}`,
    ogTitle: `${amount} ${fromCode} to ${toCode}`,
    ogDescription: desc,
    ogType: 'website',
  }
}

// Currency hub pages (/currency/usd)
export function getCurrencyHubMeta(code: string, name: string): MetaTags {
  return {
    title: `${name} (${code}) — Exchange Rates & Converter | ${SITE_NAME}`,
    description: `${name} (${code}) exchange rates against 50+ currencies. Convert ${code} to USD, EUR, GBP, and more. Free online currency converter.`,
    canonical: `${SITE_URL}/currency/${code.toLowerCase()}`,
    ogTitle: `${name} (${code}) — Exchange Rates`,
    ogDescription: `Current ${name} exchange rates and converter.`,
    ogType: 'website',
  }
}

// Age calculator pSEO pages
export function getAgeMeta(birthYear: number, birthMonth?: string): MetaTags {
  const now = new Date()
  const currentYear = now.getFullYear()
  const ageApprox = currentYear - birthYear
  const monthPart = birthMonth ? ` ${birthMonth}` : ''
  const slug = birthMonth
    ? `age-born-${birthMonth.toLowerCase()}-${birthYear}`
    : `age-born-${birthYear}`
  return {
    title: `How Old Am I If Born in${monthPart} ${birthYear}? — ${ageApprox} Years | ${SITE_NAME}`,
    description: `If you were born in${monthPart} ${birthYear}, you are approximately ${ageApprox} years old. Calculate your exact age in years, months, and days.`,
    canonical: `${SITE_URL}/calculate/${slug}`,
    ogTitle: `Age Calculator — Born${monthPart} ${birthYear}`,
    ogDescription: `Born in${monthPart} ${birthYear}? You're about ${ageApprox} years old.`,
    ogType: 'website',
  }
}

// Fraction calculator pSEO pages
export function getFractionMeta(
  n1: number, d1: number,
  op: string, opSymbol: string,
  n2: number, d2: number,
  resultN: number, resultD: number,
): MetaTags {
  const expr = `${n1}/${d1} ${opSymbol} ${n2}/${d2}`
  const result = `${resultN}/${resultD}`
  const slug = `${n1}-${d1}-${op}-${n2}-${d2}`
  return {
    title: `${expr} = ${result} — Fraction Calculator | ${SITE_NAME}`,
    description: `Calculate ${expr}. The answer is ${result}. Step-by-step solution with our free fraction calculator.`,
    canonical: `${SITE_URL}/calculate/${slug}`,
    ogTitle: `${expr} = ?`,
    ogDescription: `${expr} = ${result}. Step-by-step fraction calculation.`,
    ogType: 'website',
  }
}

// Decimal-to-fraction pSEO pages
export function getDecimalToFractionMeta(decimal: number, n: number, d: number): MetaTags {
  return {
    title: `${decimal} as a Fraction — ${n}/${d} | ${SITE_NAME}`,
    description: `${decimal} as a fraction is ${n}/${d}. Convert decimals to fractions instantly with our free calculator.`,
    canonical: `${SITE_URL}/calculate/${String(decimal).replace('.', '-')}-to-fraction`,
    ogTitle: `${decimal} as a Fraction`,
    ogDescription: `${decimal} = ${n}/${d}`,
    ogType: 'website',
  }
}

// Number base conversion pSEO pages
export function getNumberBaseMeta(
  value: number,
  _fromBase: string,
  toBase: string,
  result: string,
): MetaTags {
  const slug = `${value}-to-${toBase}`
  return {
    title: `${value} in ${toBase.charAt(0).toUpperCase() + toBase.slice(1)} — ${result} | ${SITE_NAME}`,
    description: `${value} (decimal) converted to ${toBase} is ${result}. Free number base converter for binary, octal, hex, and more.`,
    canonical: `${SITE_URL}/convert/${slug}`,
    ogTitle: `${value} in ${toBase}`,
    ogDescription: `${value} = ${result} (${toBase})`,
    ogType: 'website',
  }
}

// Hex-to-decimal pSEO pages
export function getHexToDecimalMeta(hex: string, decimal: number): MetaTags {
  return {
    title: `${hex} Hex to Decimal — ${decimal} | ${SITE_NAME}`,
    description: `Hexadecimal ${hex} converted to decimal is ${decimal}. Free hex to decimal converter.`,
    canonical: `${SITE_URL}/convert/${hex.toLowerCase()}-hex-to-decimal`,
    ogTitle: `${hex} Hex to Decimal`,
    ogDescription: `0x${hex} = ${decimal}`,
    ogType: 'website',
  }
}

// ASCII lookup pSEO pages
export function getAsciiMeta(code: number, char: string): MetaTags {
  const displayChar = code >= 33 && code <= 126 ? char : `(${char})`
  return {
    title: `ASCII ${code} — ${displayChar} | ASCII Table | ${SITE_NAME}`,
    description: `ASCII code ${code} represents the character "${char}". Binary: ${code.toString(2)}, Hex: ${code.toString(16).toUpperCase()}, Octal: ${code.toString(8)}.`,
    canonical: `${SITE_URL}/convert/ascii-${code}`,
    ogTitle: `ASCII ${code} = ${displayChar}`,
    ogDescription: `ASCII ${code} character lookup with binary, hex, and octal values.`,
    ogType: 'website',
  }
}

export function getTimezonePairMeta(fromName: string, toName: string, fromSlug: string, toSlug: string): MetaTags {
  return {
    title: `${fromName} to ${toName} — Time Zone Converter | ${SITE_NAME}`,
    description: `Convert time between ${fromName} and ${toName}. See current time, hour-by-hour comparison, and UTC offset difference.`,
    canonical: `${SITE_URL}/time/${fromSlug}-to-${toSlug}`,
    ogTitle: `${fromName} to ${toName} Time Converter`,
    ogDescription: `Convert time between ${fromName} and ${toName} instantly.`,
    ogType: 'website',
  }
}

export function getCityTimeMeta(cityName: string, citySlug: string): MetaTags {
  return {
    title: `Current Time in ${cityName} — Live Clock | ${SITE_NAME}`,
    description: `What time is it in ${cityName} right now? See the current local time, date, UTC offset, and timezone info for ${cityName}.`,
    canonical: `${SITE_URL}/time/${citySlug}`,
    ogTitle: `Current Time in ${cityName}`,
    ogDescription: `Live clock showing the current time in ${cityName}.`,
    ogType: 'website',
  }
}

// Hub pages
export function getHubMeta(title: string, description: string, path: string): MetaTags {
  return {
    title,
    description,
    canonical: `${SITE_URL}${path}`,
    ogTitle: (title.split('|')[0] ?? title).trim(),
    ogDescription: description,
    ogType: 'website',
  }
}
