import type { ToolAudience } from './tools'

export interface AudienceHub {
  audience: ToolAudience
  title: string
  description: string
  heading: string
  subheading: string
  gradient: string
  subcategories: {
    name: string
    toolIds: string[]
  }[]
}

export const audienceHubs: AudienceHub[] = [
  {
    audience: 'everyday',
    title: 'Free Everyday Tools — Calculators, Converters & More | ToolPrime',
    description: 'Free online calculators, converters, and everyday tools. Currency converter, age calculator, percentage calculator, BMI calculator, and more. No signup required.',
    heading: 'Everyday Tools',
    subheading: 'Calculators, converters, and utilities for daily life — all free, all private.',
    gradient: 'linear-gradient(135deg, #34d399, #06b6d4)',
    subcategories: [
      {
        name: 'Calculators',
        toolIds: ['age-calculator', 'fraction-calculator', 'percentage-calculator', 'bmi-calculator', 'tip-calculator', 'mortgage-calculator'],
      },
      {
        name: 'Converters',
        toolIds: ['currency-converter', 'unit-converter', 'timezone-converter'],
      },
      {
        name: 'Text Tools',
        toolIds: ['word-counter', 'case-converter', 'lorem-ipsum-generator'],
      },
      {
        name: 'File & Business Tools',
        toolIds: ['qr-code-generator', 'invoice-generator'],
      },
    ],
  },
  {
    audience: 'developer',
    title: 'Free Developer Tools — Formatters, Generators & Converters | ToolPrime',
    description: 'Free online developer tools. JSON formatter, regex tester, hash generator, cron expression builder, Base64 encoder, and more. All processing in your browser.',
    heading: 'Developer Tools',
    subheading: 'Formatters, generators, and converters built for developers — fast and private.',
    gradient: 'linear-gradient(135deg, #818cf8, #6366f1)',
    subcategories: [
      {
        name: 'Formatters',
        toolIds: ['json-formatter', 'sql-formatter', 'markdown-editor', 'markdown-to-pdf', 'diff-checker'],
      },
      {
        name: 'Generators',
        toolIds: ['password-generator', 'hash-generator', 'cron-expression-generator', 'regex-tester', 'robots-txt-generator', 'meta-tag-generator'],
      },
      {
        name: 'Converters',
        toolIds: ['base64-encode-decode', 'url-encode-decode', 'timestamp-converter', 'json-to-csv', 'image-to-base64', 'number-base-converter'],
      },
    ],
  },
  {
    audience: 'design',
    title: 'Free Design Tools — Colors, Images & Gradients | ToolPrime',
    description: 'Free online design tools. Color palette generator, CSS gradient builder, image compressor, and favicon generator. No signup, runs in your browser.',
    heading: 'Design Tools',
    subheading: 'Color, image, and layout tools for designers — instant results, zero uploads.',
    gradient: 'linear-gradient(135deg, #fb923c, #f97316)',
    subcategories: [
      {
        name: 'Colors',
        toolIds: ['color-palette-generator', 'css-gradient-generator', 'color-picker'],
      },
      {
        name: 'Images',
        toolIds: ['image-compressor', 'favicon-generator', 'image-to-base64'],
      },
    ],
  },
]
