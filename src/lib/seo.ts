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
    title: `Free Online Tools — Developer, Text, Image, Math Tools | ${SITE_NAME}`,
    description: 'Collection of free online tools: JSON formatter, word counter, image compressor, unit converter, password generator, and more. No signup required. All processing in your browser.',
    canonical: SITE_URL,
    ogTitle: 'ToolPrime — Free Online Tools',
    ogDescription: 'Free online tools for developers, writers, designers, and everyone. No signup, no server uploads, just instant results.',
    ogType: 'website',
  }
}

export function getHashMeta(algorithm: string, algorithmLabel: string, word: string, hash: string): MetaTags {
  return {
    title: `${algorithmLabel} Hash of "${word}" — ${hash.slice(0, 8)}... | ${SITE_NAME}`,
    description: `The ${algorithmLabel} hash of "${word}" is ${hash}. Generate ${algorithmLabel} hashes instantly with our free online hash generator.`,
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
