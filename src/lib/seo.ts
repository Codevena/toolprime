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
