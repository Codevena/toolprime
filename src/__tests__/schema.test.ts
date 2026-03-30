import { describe, it, expect } from 'vitest'
import { webApplicationSchema, faqPageSchema, breadcrumbSchema, percentageFaqSchema } from '../lib/schema'
import type { Tool } from '../data/tools'
import type { Faq } from '../data/faqs'

function parseSchema(json: string) {
  return JSON.parse(json)
}

describe('schema output is valid JSON', () => {
  it('webApplicationSchema produces valid JSON-LD', () => {
    const tool = {
      id: 'test-tool',
      name: 'Test Tool',
      description: 'A test tool',
      path: '/test-tool',
      category: 'text',
      icon: 'Wrench',
    } as Tool
    const json = webApplicationSchema(tool)
    const parsed = parseSchema(json)
    expect(parsed['@context']).toBe('https://schema.org')
    expect(parsed['@type']).toBe('WebApplication')
    expect(parsed.name).toBe('Test Tool')
    expect(parsed.url).toBe('https://toolprime.dev/test-tool')
  })

  it('faqPageSchema produces valid JSON-LD', () => {
    const faqs: Faq[] = [
      { question: 'What is this?', answer: 'A tool.' },
      { question: 'Is it free?', answer: 'Yes, it\'s free.' },
    ]
    const json = faqPageSchema(faqs)
    const parsed = parseSchema(json)
    expect(parsed['@type']).toBe('FAQPage')
    expect(parsed.mainEntity).toHaveLength(2)
    expect(parsed.mainEntity[0]['@type']).toBe('Question')
    expect(parsed.mainEntity[0].acceptedAnswer['@type']).toBe('Answer')
  })

  it('faqPageSchema handles quotes in answers', () => {
    const faqs: Faq[] = [
      { question: 'What about "special" chars?', answer: 'Use "quotes" and <tags> safely.' },
    ]
    const json = faqPageSchema(faqs)
    expect(() => JSON.parse(json)).not.toThrow()
  })

  it('breadcrumbSchema produces valid JSON-LD', () => {
    const items = [
      { name: 'Home', url: 'https://toolprime.dev/' },
      { name: 'Tools', url: 'https://toolprime.dev/tools' },
    ]
    const json = breadcrumbSchema(items)
    const parsed = parseSchema(json)
    expect(parsed['@type']).toBe('BreadcrumbList')
    expect(parsed.itemListElement).toHaveLength(2)
    expect(parsed.itemListElement[0].position).toBe(1)
    expect(parsed.itemListElement[1].position).toBe(2)
  })

  it('percentageFaqSchema produces valid JSON-LD', () => {
    const json = percentageFaqSchema(25, 200, 50)
    const parsed = parseSchema(json)
    expect(parsed['@type']).toBe('FAQPage')
    expect(parsed.mainEntity[0].name).toBe('What is 25% of 200?')
    expect(parsed.mainEntity[0].acceptedAnswer.text).toContain('50')
  })
})
