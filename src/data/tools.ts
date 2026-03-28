import { allToolContent, type ToolContent } from './tool-content'

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
  content?: ToolContent
}

export const categoryLabels: Record<ToolCategory, string> = {
  text: 'Text Tools',
  developer: 'Developer Tools',
  image: 'Image Tools',
  math: 'Math & Calculators',
  design: 'Design Tools',
  business: 'Business Tools',
}

export const categoryGradients: Record<ToolCategory, string> = {
  developer: 'linear-gradient(135deg, #818cf8, #6366f1)',
  text: 'linear-gradient(135deg, #f472b6, #ec4899)',
  image: 'linear-gradient(135deg, #38bdf8, #0ea5e9)',
  math: 'linear-gradient(135deg, #34d399, #10b981)',
  design: 'linear-gradient(135deg, #fb923c, #f97316)',
  business: 'linear-gradient(135deg, #c084fc, #a855f7)',
}

export const categoryColors: Record<ToolCategory, string> = {
  developer: '#818cf8',
  text: '#f472b6',
  image: '#38bdf8',
  math: '#34d399',
  design: '#fb923c',
  business: '#c084fc',
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
    relatedTools: ['lorem-ipsum-generator', 'json-formatter', 'case-converter'],
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
    relatedTools: ['base64-encode-decode', 'password-generator', 'sql-formatter'],
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
    relatedTools: ['word-counter', 'base64-encode-decode', 'hash-generator'],
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
    relatedTools: ['qr-code-generator', 'image-compressor', 'css-gradient-generator'],
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
    relatedTools: ['json-formatter', 'password-generator', 'url-encode-decode'],
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
    relatedTools: ['qr-code-generator', 'color-picker', 'favicon-generator'],
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
  {
    id: 'url-encode-decode',
    name: 'URL Encode & Decode',
    description: 'Encode text to URL format or decode URL-encoded strings instantly. Free online URL encoder/decoder.',
    longDescription: 'Convert text to URL-safe percent-encoded format or decode URL-encoded strings back to plain text. Supports both encodeURIComponent and encodeURI modes. All processing happens locally in your browser.',
    category: 'developer',
    path: '/url-encode-decode',
    icon: 'Link',
    keywords: ['url encode', 'url decode', 'percent encoding', 'urlencode online'],
    relatedTools: ['base64-encode-decode', 'hash-generator', 'json-formatter'],
  },
  {
    id: 'case-converter',
    name: 'Case Converter',
    description: 'Convert text between UPPER, lower, Title, camelCase, snake_case, and more. Free online tool.',
    longDescription: 'Transform text between 8 case formats: UPPER CASE, lower case, Title Case, Sentence case, camelCase, PascalCase, snake_case, and kebab-case. Instant conversion with smart word boundary detection.',
    category: 'text',
    path: '/case-converter',
    icon: 'CaseSensitive',
    keywords: ['case converter', 'text case', 'uppercase', 'lowercase', 'camelcase converter', 'snake case'],
    relatedTools: ['word-counter', 'lorem-ipsum-generator', 'url-encode-decode'],
  },
  {
    id: 'timestamp-converter',
    name: 'Timestamp Converter',
    description: 'Convert Unix timestamps to dates and dates to Unix timestamps. Free online epoch converter.',
    longDescription: 'Convert between Unix timestamps and human-readable dates. Live current timestamp display, bidirectional conversion, UTC and local time output, ISO 8601 format. Supports both seconds and milliseconds.',
    category: 'developer',
    path: '/timestamp-converter',
    icon: 'Clock',
    keywords: ['unix timestamp', 'epoch converter', 'timestamp to date', 'date to timestamp'],
    relatedTools: ['unit-converter', 'base64-encode-decode', 'hash-generator'],
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text instantly. Free online hash tool.',
    longDescription: 'Enter any text to compute MD5, SHA-1, SHA-256, and SHA-512 hashes simultaneously. Uses the Web Crypto API for SHA hashes. All processing happens in your browser — no data is sent to a server.',
    category: 'developer',
    path: '/hash-generator',
    icon: 'Fingerprint',
    keywords: ['hash generator', 'md5 hash', 'sha256 hash', 'sha512 online', 'checksum generator'],
    relatedTools: ['base64-encode-decode', 'password-generator', 'url-encode-decode'],
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test regular expressions with real-time match highlighting. Free online regex tool.',
    longDescription: 'Write and test regex patterns with instant match highlighting, flag toggles (global, case-insensitive, multiline, dotall), capture group display, and match index tracking. All processing in your browser.',
    category: 'developer',
    path: '/regex-tester',
    icon: 'Regex',
    keywords: ['regex tester', 'regex online', 'regular expression tester', 'regex debugger'],
    relatedTools: ['json-formatter', 'sql-formatter', 'diff-checker'],
  },
  {
    id: 'sql-formatter',
    name: 'SQL Formatter',
    description: 'Format and beautify SQL queries with support for multiple dialects. Free online SQL tool.',
    longDescription: 'Paste messy SQL and get clean, properly indented output. Supports Standard SQL, MySQL, PostgreSQL, T-SQL, and PL/SQL. Configurable indentation and uppercase keywords.',
    category: 'developer',
    path: '/sql-formatter',
    icon: 'Database',
    keywords: ['sql formatter', 'sql beautifier', 'format sql online', 'sql pretty print'],
    relatedTools: ['json-formatter', 'regex-tester', 'diff-checker'],
  },
  {
    id: 'diff-checker',
    name: 'Diff Checker',
    description: 'Compare two text blocks and see additions and deletions highlighted. Free online diff tool.',
    longDescription: 'Paste two versions of text to instantly see what changed. Line-level and word-level diff modes with colored highlights for additions and deletions. Copy the diff output with one click.',
    category: 'developer',
    path: '/diff-checker',
    icon: 'GitCompare',
    keywords: ['diff checker', 'text compare', 'diff online', 'compare text'],
    relatedTools: ['json-formatter', 'sql-formatter', 'regex-tester'],
  },
  {
    id: 'css-gradient-generator',
    name: 'CSS Gradient Generator',
    description: 'Create beautiful CSS gradients with a visual editor. Linear, radial, and conic gradients. Free.',
    longDescription: 'Build CSS gradients visually with a live preview. Choose between linear, radial, and conic gradient types. Add unlimited color stops, adjust angles, and copy the CSS code. Includes preset gradients for quick inspiration.',
    category: 'design',
    path: '/css-gradient-generator',
    icon: 'Blend',
    keywords: ['css gradient generator', 'gradient maker', 'css gradient', 'linear gradient'],
    relatedTools: ['color-picker', 'favicon-generator', 'qr-code-generator'],
  },
  {
    id: 'favicon-generator',
    name: 'Favicon Generator',
    description: 'Generate favicons in all standard sizes from a single image. Download as ZIP. Free online tool.',
    longDescription: 'Upload an image to generate favicons for browsers (16x16, 32x32, 48x48), Apple Touch Icons (180x180), and Android devices (192x192, 512x512). Download all sizes as a ZIP with ready-to-use HTML link tags.',
    category: 'image',
    path: '/favicon-generator',
    icon: 'Image',
    keywords: ['favicon generator', 'favicon maker', 'favicon creator', 'generate favicon online'],
    relatedTools: ['image-compressor', 'css-gradient-generator', 'color-picker'],
  },
  {
    id: 'invoice-generator',
    name: 'Invoice Generator',
    description: 'Create professional PDF invoices in your browser. Free online invoice maker, no signup required.',
    longDescription: 'Fill in company and client details, add line items, set tax rates, and download a professional PDF invoice. Supports multiple currencies. All processing happens in your browser — no data is sent anywhere.',
    category: 'business',
    path: '/invoice-generator',
    icon: 'Receipt',
    keywords: ['invoice generator', 'invoice maker', 'create invoice online', 'free invoice template'],
    relatedTools: ['qr-code-generator', 'percentage-calculator', 'word-counter'],
  },
]

// Attach content data to tools
for (const tool of tools) {
  const content = allToolContent[tool.id]
  if (content) {
    tool.content = content
  }
}

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
