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

// Currency conversion FAQ schema
export function currencyFaqSchema(
  amount: number,
  fromCode: string,
  toCode: string,
  result: number,
  rate: number,
): string {
  return faqPageSchema([
    {
      question: `How much is ${amount} ${fromCode} in ${toCode}?`,
      answer: `${amount} ${fromCode} equals approximately ${result.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${toCode} at the current exchange rate of 1 ${fromCode} = ${rate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })} ${toCode}.`,
    },
    {
      question: `What is the ${fromCode} to ${toCode} exchange rate?`,
      answer: `The current exchange rate is 1 ${fromCode} = ${rate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })} ${toCode}. Rates are updated daily.`,
    },
    {
      question: `Is this currency converter free?`,
      answer: `Yes, ToolPrime's currency converter is 100% free with no signup required. It supports 50+ currencies including cryptocurrencies.`,
    },
  ])
}

// Age calculator FAQ schema
export function ageFaqSchema(birthYear: number, ageYears: number, birthMonth?: string): string {
  const monthPart = birthMonth ? ` ${birthMonth}` : ''
  return faqPageSchema([
    {
      question: `How old am I if I was born in${monthPart} ${birthYear}?`,
      answer: `If you were born in${monthPart} ${birthYear}, you are approximately ${ageYears} years old as of ${new Date().getFullYear()}.`,
    },
    {
      question: `What generation is someone born in ${birthYear}?`,
      answer: getGenerationAnswer(birthYear),
    },
    {
      question: `How do I calculate my exact age?`,
      answer: `Subtract your birth date from today's date. Our age calculator handles this automatically, giving you your exact age in years, months, and days.`,
    },
  ])
}

function getGenerationAnswer(year: number): string {
  if (year >= 2013) return `Someone born in ${year} belongs to Generation Alpha (born 2013+).`
  if (year >= 1997) return `Someone born in ${year} belongs to Generation Z, born between 1997 and 2012.`
  if (year >= 1981) return `Someone born in ${year} is a Millennial (Generation Y), born between 1981 and 1996.`
  if (year >= 1965) return `Someone born in ${year} belongs to Generation X, born between 1965 and 1980.`
  if (year >= 1946) return `Someone born in ${year} is a Baby Boomer, born between 1946 and 1964.`
  return `Someone born in ${year} belongs to the Silent Generation (born 1928–1945) or earlier.`
}

// Fraction calculator FAQ schema
export function fractionFaqSchema(
  n1: number, d1: number,
  opSymbol: string,
  n2: number, d2: number,
  resultN: number, resultD: number,
): string {
  return faqPageSchema([
    {
      question: `What is ${n1}/${d1} ${opSymbol} ${n2}/${d2}?`,
      answer: `${n1}/${d1} ${opSymbol} ${n2}/${d2} = ${resultN === 0 ? '0' : `${resultN}/${resultD}`}.`,
    },
    {
      question: `How do you ${opSymbol === '+' ? 'add' : opSymbol === '\u2212' ? 'subtract' : opSymbol === '\u00D7' ? 'multiply' : 'divide'} fractions?`,
      answer: opSymbol === '+' || opSymbol === '\u2212'
        ? `To ${opSymbol === '+' ? 'add' : 'subtract'} fractions, find a common denominator, then ${opSymbol === '+' ? 'add' : 'subtract'} the numerators.`
        : opSymbol === '\u00D7'
          ? `To multiply fractions, multiply the numerators together and the denominators together, then simplify.`
          : `To divide fractions, multiply the first fraction by the reciprocal of the second.`,
    },
  ])
}

// Number base conversion FAQ schema
export function numberBaseFaqSchema(value: number, toBase: string, result: string): string {
  return faqPageSchema([
    {
      question: `What is ${value} in ${toBase}?`,
      answer: `${value} in ${toBase} is ${result}.`,
    },
    {
      question: `How do you convert decimal to ${toBase}?`,
      answer: toBase === 'binary'
        ? `Divide the number by 2 repeatedly, recording remainders. Read the remainders bottom-to-top.`
        : toBase === 'hexadecimal'
          ? `Divide the number by 16 repeatedly, recording remainders (using A-F for 10-15). Read bottom-to-top.`
          : `Divide the number by ${toBase === 'octal' ? '8' : 'the base'} repeatedly, recording remainders. Read bottom-to-top.`,
    },
  ])
}
