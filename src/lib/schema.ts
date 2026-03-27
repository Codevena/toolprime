import type { Tool } from '@/data/tools'
import type { Faq } from '@/data/faqs'

export function webApplicationSchema(tool: Tool): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.description,
    url: `https://toolprime.dev${tool.path}`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
  })
}

export function faqPageSchema(faqs: Faq[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  })
}

export function breadcrumbSchema(items: { name: string; url: string }[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  })
}
