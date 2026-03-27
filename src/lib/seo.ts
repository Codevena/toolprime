import type { Tool } from '@/data/tools'

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
  const slug = `${fromAbbr.toLowerCase().replace(/[^a-z0-9]/g, '')}-to-${toAbbr.toLowerCase().replace(/[^a-z0-9]/g, '')}`

  return {
    title: title.length > 60 ? `${from} to ${to} Converter | ${SITE_NAME}` : title,
    description,
    canonical: `${SITE_URL}/converters/${slug}`,
    ogTitle: `${from} to ${to} Converter`,
    ogDescription: description,
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
