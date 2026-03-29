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

export function percentageFaqSchema(percentage: number, base: number, result: number): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is ${percentage}% of ${base}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${percentage}% of ${base} is ${result}. To calculate, multiply ${base} by ${percentage}/100 = ${base} × ${percentage / 100} = ${result}.`,
        },
      },
    ],
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

export function hashFaqSchema(algorithmLabel: string, word: string, hash: string): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the ${algorithmLabel} hash of "${word}"?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The ${algorithmLabel} hash of "${word}" is ${hash}.`,
        },
      },
    ],
  })
}

export function reversePercentageFaqSchema(x: number, y: number, result: number): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What percent is ${x} of ${y}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${x} is ${result}% of ${y}. To calculate, divide ${x} by ${y} and multiply by 100: (${x} ÷ ${y}) × 100 = ${result}%.`,
        },
      },
    ],
  })
}

export function regexFaqSchema(name: string, pattern: string, description: string): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the regex for ${name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The regex pattern for ${name} is: /${pattern}/. ${description}`,
        },
      },
    ],
  })
}

export function regexHowToSchema(name: string, _pattern: string, explanation: string[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to use regex for ${name}`,
    step: explanation.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      text: step,
    })),
  })
}

export function formatConversionHowToSchema(title: string, steps: string[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to ${title}`,
    step: steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      text: step,
    })),
  })
}

export function articleSchema(title: string, description: string, slug: string, date: string): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `https://toolprime.dev/blog/${slug}`,
    datePublished: date,
    dateModified: date,
    author: {
      '@type': 'Organization',
      name: 'ToolPrime Team',
      url: 'https://toolprime.dev',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ToolPrime',
      url: 'https://toolprime.dev',
    },
  })
}

export function gradientFaqSchema(name: string, cssCode: string): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the CSS code for the ${name} gradient?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The CSS code for the ${name} gradient is: background: ${cssCode};`,
        },
      },
    ],
  })
}

export function cronFaqSchema(faqs: Array<{ question: string; answer: string }>): string {
  return faqPageSchema(faqs)
}

export function cronHowToSchema(name: string, expression: string): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to use the cron expression for ${name}`,
    step: [
      { '@type': 'HowToStep', position: 1, text: `Open your crontab with crontab -e or your scheduler configuration` },
      { '@type': 'HowToStep', position: 2, text: `Add the expression: ${expression} /path/to/your/command` },
      { '@type': 'HowToStep', position: 3, text: `Save and verify the schedule with crontab -l` },
    ],
  })
}

export function paletteFaqSchema(faqs: Array<{ question: string; answer: string }>): string {
  return faqPageSchema(faqs)
}

export function mortgageFaqSchema(faqs: Array<{ question: string; answer: string }>): string {
  return faqPageSchema(faqs)
}

export function tipFaqSchema(faqs: Array<{ question: string; answer: string }>): string {
  return faqPageSchema(faqs)
}

export function bmiFaqSchema(faqs: Array<{ question: string; answer: string }>): string {
  return faqPageSchema(faqs)
}
