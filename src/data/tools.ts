export type ToolCategory = 'text' | 'developer' | 'image' | 'math' | 'design' | 'business'

export interface Tool {
  id: string
  name: string
  description: string
  longDescription: string
  category: ToolCategory
  path: string
  icon: string
  keywords: string[]
  relatedTools: string[]
}

export const categoryLabels: Record<ToolCategory, string> = {
  text: 'Text Tools',
  developer: 'Developer Tools',
  image: 'Image Tools',
  math: 'Math & Calculators',
  design: 'Design Tools',
  business: 'Business Tools',
}

export const tools: Tool[] = [
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, sentences, and paragraphs instantly. Free online tool, no signup required.',
    longDescription: 'Paste or type your text to instantly see word count, character count (with and without spaces), sentence count, paragraph count, and estimated reading time. Perfect for essays, blog posts, social media, and SEO.',
    category: 'text',
    path: '/word-counter',
    icon: 'Type',
    keywords: ['word counter', 'character counter', 'word count online', 'letter counter'],
    relatedTools: ['lorem-ipsum-generator', 'json-formatter'],
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter & Validator',
    description: 'Format, validate, and beautify JSON data instantly in your browser. Free online JSON tool.',
    longDescription: 'Paste your JSON to format it with proper indentation, validate its syntax, minify it, or copy the beautified output. Supports large files, syntax highlighting, and error reporting with line numbers.',
    category: 'developer',
    path: '/json-formatter',
    icon: 'Braces',
    keywords: ['json formatter', 'json validator', 'json beautifier', 'json online'],
    relatedTools: ['base64-encode-decode', 'password-generator'],
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate strong, random passwords with customizable length and character types. Free and secure.',
    longDescription: 'Create secure passwords with your choice of uppercase, lowercase, numbers, and symbols. All generation happens in your browser — no data is sent to any server. Includes a password strength meter.',
    category: 'text',
    path: '/password-generator',
    icon: 'KeyRound',
    keywords: ['password generator', 'random password', 'strong password generator', 'secure password'],
    relatedTools: ['word-counter', 'base64-encode-decode'],
  },
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    description: 'Create QR codes for URLs, text, WiFi, and more. Download as PNG or SVG. Free online tool.',
    longDescription: 'Generate QR codes instantly for any text, URL, email, phone number, or WiFi credentials. Download in PNG or SVG format. Customize size and error correction level. All processing in your browser.',
    category: 'business',
    path: '/qr-code-generator',
    icon: 'QrCode',
    keywords: ['qr code generator', 'qr code maker', 'create qr code', 'qr code online'],
    relatedTools: ['color-picker', 'image-compressor'],
  },
  {
    id: 'color-picker',
    name: 'Color Picker & Converter',
    description: 'Pick colors and convert between HEX, RGB, and HSL formats. Free online color tool.',
    longDescription: 'Click to pick any color or enter values in HEX, RGB, or HSL format. Instant conversion between all formats. Copy any value with one click. Visual color preview and contrast checker.',
    category: 'design',
    path: '/color-picker',
    icon: 'Palette',
    keywords: ['color picker', 'hex to rgb', 'color converter', 'rgb to hex'],
    relatedTools: ['qr-code-generator', 'image-compressor'],
  },
  {
    id: 'base64-encode-decode',
    name: 'Base64 Encode & Decode',
    description: 'Encode text to Base64 or decode Base64 to text instantly. Free online encoder/decoder.',
    longDescription: 'Convert any text to Base64 encoding or decode Base64 strings back to readable text. Supports UTF-8 characters. All processing happens locally in your browser for maximum privacy.',
    category: 'developer',
    path: '/base64-encode-decode',
    icon: 'Binary',
    keywords: ['base64 encode', 'base64 decode', 'base64 converter', 'base64 online'],
    relatedTools: ['json-formatter', 'password-generator'],
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Compress JPEG and PNG images in your browser. Reduce file size without losing quality. Free.',
    longDescription: 'Upload images to compress them instantly in your browser. No server upload needed — your images never leave your device. Supports JPEG and PNG with adjustable quality. Compare before and after file sizes.',
    category: 'image',
    path: '/image-compressor',
    icon: 'ImageDown',
    keywords: ['image compressor', 'compress image online', 'reduce image size', 'compress png', 'compress jpeg'],
    relatedTools: ['qr-code-generator', 'color-picker'],
  },
  {
    id: 'lorem-ipsum-generator',
    name: 'Lorem Ipsum Generator',
    description: 'Generate lorem ipsum placeholder text. Choose paragraphs, sentences, or words. Free online tool.',
    longDescription: 'Generate customizable lorem ipsum placeholder text for your designs, mockups, and prototypes. Choose between paragraphs, sentences, or words. Copy to clipboard with one click.',
    category: 'text',
    path: '/lorem-ipsum-generator',
    icon: 'FileText',
    keywords: ['lorem ipsum', 'lorem ipsum generator', 'placeholder text', 'dummy text generator'],
    relatedTools: ['word-counter', 'json-formatter'],
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert between units of length, weight, temperature, volume, and more. Free online converter.',
    longDescription: 'Convert between hundreds of units across categories: length, weight, temperature, volume, area, speed, time, and digital storage. Instant results with conversion tables.',
    category: 'math',
    path: '/unit-converter',
    icon: 'ArrowLeftRight',
    keywords: ['unit converter', 'convert units', 'metric converter', 'unit conversion online'],
    relatedTools: ['percentage-calculator'],
  },
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    description: 'Calculate percentages instantly. What is X% of Y? Free online percentage tool.',
    longDescription: 'Calculate any percentage: what is X% of Y, X is what percent of Y, percent increase/decrease, and more. Instant results with step-by-step explanations.',
    category: 'math',
    path: '/percentage-calculator',
    icon: 'Percent',
    keywords: ['percentage calculator', 'percent calculator', 'calculate percentage', 'what is percent of'],
    relatedTools: ['unit-converter'],
  },
]

export function getToolById(id: string): Tool | undefined {
  return tools.find(t => t.id === id)
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return tools.filter(t => t.category === category)
}

export function getRelatedTools(toolId: string): Tool[] {
  const tool = getToolById(toolId)
  if (!tool) return []
  return tool.relatedTools.map(id => getToolById(id)).filter((t): t is Tool => t !== undefined)
}
