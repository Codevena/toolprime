# ToolPrime — Free Online Tool Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a portfolio of 20+ free online web tools on a single domain, monetized via SEO-driven traffic and display advertising.

**Architecture:** Astro 5 static site with React islands for interactive tools. All processing client-side (no backend). Programmatic SEO generates 700+ pages from unit conversion and calculator data at build time. Cloudflare Pages for free hosting with unlimited bandwidth.

**Tech Stack:** Astro 5, React 19, TypeScript, Tailwind CSS 4, Lucide React icons, Cloudflare Pages, Google AdSense (Phase 1), Mediavine (Phase 2 at 50K sessions/mo).

**Spec:** `docs/superpowers/specs/2026-03-27-free-tool-portfolio-design.md` (in the gamebrainstorming repo)

---

## File Structure

```
toolprime/
├── astro.config.mjs              # Astro config: site URL, integrations (react, tailwind, sitemap)
├── tailwind.config.mjs            # Tailwind config: custom colors, typography
├── tsconfig.json                  # TypeScript config extending Astro's strictest
├── package.json                   # Dependencies and scripts
├── public/
│   ├── favicon.svg                # Simple SVG favicon (wrench icon)
│   └── robots.txt                 # Allow all crawlers, reference sitemap
├── src/
│   ├── styles/
│   │   └── global.css             # Tailwind directives + custom properties
│   ├── data/
│   │   ├── tools.ts               # Central tool registry (all 20 tools)
│   │   ├── conversions.ts         # Unit conversion data (200+ entries)
│   │   └── faqs.ts                # FAQ content keyed by tool ID
│   ├── lib/
│   │   ├── seo.ts                 # Helper: generate meta tags from tool data
│   │   └── schema.ts              # Helper: generate JSON-LD structured data
│   ├── layouts/
│   │   ├── BaseLayout.astro       # HTML shell: head, body, analytics, footer
│   │   └── ToolLayout.astro       # Tool page layout: breadcrumbs, tool slot, content, related tools
│   ├── components/
│   │   ├── ui/
│   │   │   ├── CopyButton.tsx     # Click-to-copy with "Copied!" feedback
│   │   │   ├── FileUpload.tsx     # Drag-and-drop file input
│   │   │   ├── Textarea.tsx       # Auto-resizing textarea
│   │   │   └── DownloadButton.tsx # Trigger file download from blob
│   │   ├── seo/
│   │   │   ├── Breadcrumbs.astro  # Breadcrumb nav with schema markup
│   │   │   ├── RelatedTools.astro # Grid of 4-6 related tool cards
│   │   │   ├── FaqSection.astro   # Accordion FAQ with FAQPage schema
│   │   │   └── SchemaMarkup.astro # Renders JSON-LD script tag
│   │   └── tools/
│   │       ├── WordCounter.tsx
│   │       ├── JsonFormatter.tsx
│   │       ├── PasswordGenerator.tsx
│   │       ├── QrCodeGenerator.tsx
│   │       ├── ColorPicker.tsx
│   │       ├── Base64Codec.tsx
│   │       ├── ImageCompressor.tsx
│   │       ├── LoremIpsum.tsx
│   │       ├── UnitConverter.tsx
│   │       └── PercentageCalculator.tsx
│   └── pages/
│       ├── index.astro            # Homepage: categorized tool directory
│       ├── word-counter.astro
│       ├── json-formatter.astro
│       ├── password-generator.astro
│       ├── qr-code-generator.astro
│       ├── color-picker.astro
│       ├── base64-encode-decode.astro
│       ├── image-compressor.astro
│       ├── lorem-ipsum-generator.astro
│       ├── unit-converter.astro
│       ├── percentage-calculator.astro
│       ├── converters/
│       │   └── [...slug].astro    # Programmatic: /converters/kg-to-lbs (200+ pages)
│       ├── calculators/
│       │   └── [...slug].astro    # Programmatic: /calculators/what-is-X-percent-of-Y
│       ├── impressum.astro
│       ├── datenschutz.astro
│       └── 404.astro
```

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tailwind.config.mjs`
- Create: `tsconfig.json`
- Create: `src/styles/global.css`
- Create: `public/favicon.svg`
- Create: `public/robots.txt`

- [ ] **Step 1: Initialize git repo**

```bash
cd /Users/markus/Developer/toolprime
git init
```

- [ ] **Step 2: Create package.json**

```json
{
  "name": "toolprime",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check"
  }
}
```

- [ ] **Step 3: Install dependencies**

```bash
cd /Users/markus/Developer/toolprime
pnpm add astro @astrojs/react @astrojs/tailwind @astrojs/sitemap react react-dom lucide-react
pnpm add -D typescript @types/react @types/react-dom tailwindcss @tailwindcss/vite
```

- [ ] **Step 4: Create astro.config.mjs**

```javascript
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://toolprime.dev',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
})
```

- [ ] **Step 5: Create tsconfig.json**

```json
{
  "extends": "astro/tsconfigs/strictest",
  "compilerOptions": {
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

- [ ] **Step 6: Create src/styles/global.css**

```css
@import 'tailwindcss';

:root {
  --color-primary: #2563eb;
  --color-surface: #ffffff;
  --color-surface-alt: #f8fafc;
  --color-text: #0f172a;
  --color-text-muted: #64748b;
  --color-border: #e2e8f0;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: #60a5fa;
    --color-surface: #0f172a;
    --color-surface-alt: #1e293b;
    --color-text: #f1f5f9;
    --color-text-muted: #94a3b8;
    --color-border: #334155;
  }
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: var(--color-surface-alt);
  color: var(--color-text);
}
```

- [ ] **Step 7: Create public/favicon.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#2563eb"/>
  <text x="16" y="23" text-anchor="middle" fill="white" font-family="system-ui" font-weight="bold" font-size="20">T</text>
</svg>
```

- [ ] **Step 8: Create public/robots.txt**

```
User-agent: *
Allow: /

Sitemap: https://toolprime.dev/sitemap-index.xml
```

- [ ] **Step 9: Verify build works**

Run: `cd /Users/markus/Developer/toolprime && pnpm build`
Expected: Build succeeds (may warn about no pages yet, that's fine)

- [ ] **Step 10: Create .gitignore and commit**

```gitignore
node_modules/
dist/
.astro/
.DS_Store
```

```bash
git add -A
git commit -m "feat: scaffold Astro project with React, Tailwind, sitemap"
```

---

## Task 2: Data Layer — Tool Registry, FAQs, Conversions

**Files:**
- Create: `src/data/tools.ts`
- Create: `src/data/faqs.ts`
- Create: `src/data/conversions.ts`

- [ ] **Step 1: Create tool registry**

Create `src/data/tools.ts`:

```typescript
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
    relatedTools: ['case-converter', 'lorem-ipsum-generator', 'diff-checker'],
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
    relatedTools: ['base64-encode-decode', 'regex-tester', 'sql-formatter', 'url-encode-decode'],
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
    relatedTools: ['favicon-generator', 'color-picker'],
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
    relatedTools: ['css-gradient-generator', 'favicon-generator'],
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
    relatedTools: ['json-formatter', 'url-encode-decode', 'timestamp-converter'],
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
    relatedTools: ['favicon-generator', 'qr-code-generator'],
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
    relatedTools: ['word-counter', 'case-converter'],
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
    relatedTools: ['percentage-calculator', 'timestamp-converter'],
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
```

- [ ] **Step 2: Create FAQ data**

Create `src/data/faqs.ts`:

```typescript
export interface Faq {
  question: string
  answer: string
}

export const faqs: Record<string, Faq[]> = {
  'word-counter': [
    { question: 'How does the word counter work?', answer: 'Paste or type your text into the input field. The tool instantly counts words, characters (with and without spaces), sentences, paragraphs, and estimates reading time based on an average of 200 words per minute.' },
    { question: 'Is there a character limit?', answer: 'No. The tool runs entirely in your browser and can handle texts of any length. Performance stays fast even with 100,000+ words.' },
    { question: 'Does this tool save my text?', answer: 'No. All processing happens locally in your browser. Your text is never sent to any server or stored anywhere.' },
  ],
  'json-formatter': [
    { question: 'What JSON formatting options are available?', answer: 'You can beautify JSON with 2-space or 4-space indentation, minify it to a single line, or validate its syntax to find errors with line numbers.' },
    { question: 'Can it handle large JSON files?', answer: 'Yes. The formatter processes JSON entirely in your browser and can handle files up to several megabytes without issues.' },
    { question: 'Is my data safe?', answer: 'Yes. All JSON processing happens locally in your browser. No data is ever sent to a server.' },
  ],
  'password-generator': [
    { question: 'Are the generated passwords truly random?', answer: 'Yes. The tool uses the Web Crypto API (crypto.getRandomValues) which provides cryptographically secure random numbers, the same standard used by password managers.' },
    { question: 'What makes a password strong?', answer: 'A strong password is at least 16 characters long and includes a mix of uppercase letters, lowercase letters, numbers, and symbols. Our strength meter evaluates your password against these criteria.' },
    { question: 'Is it safe to generate passwords online?', answer: 'Yes, because this tool generates passwords entirely in your browser. No password is ever sent to a server or stored anywhere.' },
  ],
  'qr-code-generator': [
    { question: 'What can I encode in a QR code?', answer: 'You can encode URLs, plain text, email addresses, phone numbers, WiFi credentials, and more. Most QR code scanners will automatically detect the content type.' },
    { question: 'What image formats are available?', answer: 'You can download your QR code as PNG (raster, best for web) or SVG (vector, best for print). Both formats support any size.' },
    { question: 'Is there a size limit for QR code content?', answer: 'QR codes can store up to about 4,296 alphanumeric characters. For most use cases like URLs and text, this is more than enough.' },
  ],
  'color-picker': [
    { question: 'What color formats are supported?', answer: 'The tool supports HEX (#ff0000), RGB (rgb(255, 0, 0)), and HSL (hsl(0, 100%, 50%)) formats. You can input in any format and instantly see the conversion to all others.' },
    { question: 'Can I pick a color from my screen?', answer: 'Yes, if your browser supports the EyeDropper API (Chrome, Edge). Click the eyedropper button to pick any color from your screen.' },
    { question: 'How do I copy a color value?', answer: 'Click the copy icon next to any color value (HEX, RGB, or HSL) to copy it to your clipboard. A confirmation will appear briefly.' },
  ],
  'base64-encode-decode': [
    { question: 'What is Base64 encoding?', answer: 'Base64 is a way to represent binary data as ASCII text. It is commonly used to embed images in HTML/CSS, send data in URLs, and transmit binary content over text-based protocols like email.' },
    { question: 'Does Base64 encrypt my data?', answer: 'No. Base64 is an encoding, not encryption. Anyone can decode Base64 text. Do not use it to hide sensitive information.' },
    { question: 'Does it support special characters and emojis?', answer: 'Yes. The tool handles full UTF-8 encoding, including special characters, accented letters, and emojis.' },
  ],
  'image-compressor': [
    { question: 'Which image formats are supported?', answer: 'The tool supports JPEG and PNG images. JPEG compression adjusts quality level. PNG compression optimizes the file without visible quality loss.' },
    { question: 'Are my images uploaded to a server?', answer: 'No. All compression happens entirely in your browser using the Canvas API. Your images never leave your device.' },
    { question: 'How much can I reduce file size?', answer: 'Typical JPEG compression reduces file size by 50-80% with minimal visible quality loss. PNG compression typically achieves 20-50% reduction.' },
  ],
  'lorem-ipsum-generator': [
    { question: 'What is Lorem Ipsum?', answer: 'Lorem Ipsum is placeholder text used in design and typesetting since the 1500s. It allows designers to focus on visual layout without being distracted by readable content.' },
    { question: 'Can I choose how much text to generate?', answer: 'Yes. You can generate a specific number of paragraphs, sentences, or words. The default is 5 paragraphs.' },
    { question: 'Is the generated text always the same?', answer: 'The text follows standard Lorem Ipsum patterns but includes randomization so each generation is slightly different.' },
  ],
  'unit-converter': [
    { question: 'What unit categories are available?', answer: 'The tool supports conversions for length, weight/mass, temperature, volume, area, speed, time, and digital storage.' },
    { question: 'How accurate are the conversions?', answer: 'All conversions use standard conversion factors with full floating-point precision. Results are rounded to 6 decimal places for display.' },
    { question: 'Can I see a conversion table?', answer: 'Yes. Every conversion page includes a table showing common values converted between the two units.' },
  ],
  'percentage-calculator': [
    { question: 'What percentage calculations are supported?', answer: 'You can calculate: what is X% of Y, X is what percent of Y, percent increase or decrease between two numbers, and the percentage difference between two values.' },
    { question: 'Does it show the calculation steps?', answer: 'Yes. Each result includes a step-by-step explanation of the formula used and the arithmetic.' },
    { question: 'Can I use decimals?', answer: 'Yes. The calculator supports decimal numbers for both the percentage and the values.' },
  ],
}
```

- [ ] **Step 3: Create conversion data**

Create `src/data/conversions.ts`:

```typescript
export interface Conversion {
  from: string
  fromAbbr: string
  to: string
  toAbbr: string
  factor?: number
  formula?: string
  reverseFormula?: string
  category: ConversionCategory
}

export type ConversionCategory = 'length' | 'weight' | 'temperature' | 'volume' | 'area' | 'speed' | 'time' | 'digital'

export const conversionCategoryLabels: Record<ConversionCategory, string> = {
  length: 'Length',
  weight: 'Weight & Mass',
  temperature: 'Temperature',
  volume: 'Volume',
  area: 'Area',
  speed: 'Speed',
  time: 'Time',
  digital: 'Digital Storage',
}

export const conversions: Conversion[] = [
  // Length
  { from: 'kilometer', fromAbbr: 'km', to: 'mile', toAbbr: 'mi', factor: 0.621371, category: 'length' },
  { from: 'meter', fromAbbr: 'm', to: 'foot', toAbbr: 'ft', factor: 3.28084, category: 'length' },
  { from: 'centimeter', fromAbbr: 'cm', to: 'inch', toAbbr: 'in', factor: 0.393701, category: 'length' },
  { from: 'millimeter', fromAbbr: 'mm', to: 'inch', toAbbr: 'in', factor: 0.0393701, category: 'length' },
  { from: 'meter', fromAbbr: 'm', to: 'yard', toAbbr: 'yd', factor: 1.09361, category: 'length' },
  { from: 'inch', fromAbbr: 'in', to: 'centimeter', toAbbr: 'cm', factor: 2.54, category: 'length' },
  { from: 'foot', fromAbbr: 'ft', to: 'meter', toAbbr: 'm', factor: 0.3048, category: 'length' },
  { from: 'mile', fromAbbr: 'mi', to: 'kilometer', toAbbr: 'km', factor: 1.60934, category: 'length' },
  { from: 'yard', fromAbbr: 'yd', to: 'meter', toAbbr: 'm', factor: 0.9144, category: 'length' },

  // Weight
  { from: 'kilogram', fromAbbr: 'kg', to: 'pound', toAbbr: 'lbs', factor: 2.20462, category: 'weight' },
  { from: 'pound', fromAbbr: 'lbs', to: 'kilogram', toAbbr: 'kg', factor: 0.453592, category: 'weight' },
  { from: 'gram', fromAbbr: 'g', to: 'ounce', toAbbr: 'oz', factor: 0.035274, category: 'weight' },
  { from: 'ounce', fromAbbr: 'oz', to: 'gram', toAbbr: 'g', factor: 28.3495, category: 'weight' },
  { from: 'kilogram', fromAbbr: 'kg', to: 'stone', toAbbr: 'st', factor: 0.157473, category: 'weight' },
  { from: 'metric ton', fromAbbr: 't', to: 'pound', toAbbr: 'lbs', factor: 2204.62, category: 'weight' },

  // Temperature (formulas instead of factors)
  { from: 'celsius', fromAbbr: '°C', to: 'fahrenheit', toAbbr: '°F', formula: '(x * 9/5) + 32', reverseFormula: '(x - 32) * 5/9', category: 'temperature' },
  { from: 'celsius', fromAbbr: '°C', to: 'kelvin', toAbbr: 'K', formula: 'x + 273.15', reverseFormula: 'x - 273.15', category: 'temperature' },
  { from: 'fahrenheit', fromAbbr: '°F', to: 'celsius', toAbbr: '°C', formula: '(x - 32) * 5/9', reverseFormula: '(x * 9/5) + 32', category: 'temperature' },

  // Volume
  { from: 'liter', fromAbbr: 'L', to: 'gallon (US)', toAbbr: 'gal', factor: 0.264172, category: 'volume' },
  { from: 'gallon (US)', fromAbbr: 'gal', to: 'liter', toAbbr: 'L', factor: 3.78541, category: 'volume' },
  { from: 'milliliter', fromAbbr: 'mL', to: 'fluid ounce', toAbbr: 'fl oz', factor: 0.033814, category: 'volume' },
  { from: 'cup (US)', fromAbbr: 'cup', to: 'milliliter', toAbbr: 'mL', factor: 236.588, category: 'volume' },
  { from: 'tablespoon', fromAbbr: 'tbsp', to: 'milliliter', toAbbr: 'mL', factor: 14.7868, category: 'volume' },

  // Area
  { from: 'square meter', fromAbbr: 'm²', to: 'square foot', toAbbr: 'ft²', factor: 10.7639, category: 'area' },
  { from: 'hectare', fromAbbr: 'ha', to: 'acre', toAbbr: 'ac', factor: 2.47105, category: 'area' },
  { from: 'square kilometer', fromAbbr: 'km²', to: 'square mile', toAbbr: 'mi²', factor: 0.386102, category: 'area' },

  // Speed
  { from: 'km/h', fromAbbr: 'km/h', to: 'mph', toAbbr: 'mph', factor: 0.621371, category: 'speed' },
  { from: 'mph', fromAbbr: 'mph', to: 'km/h', toAbbr: 'km/h', factor: 1.60934, category: 'speed' },
  { from: 'm/s', fromAbbr: 'm/s', to: 'km/h', toAbbr: 'km/h', factor: 3.6, category: 'speed' },
  { from: 'knot', fromAbbr: 'kn', to: 'km/h', toAbbr: 'km/h', factor: 1.852, category: 'speed' },

  // Time
  { from: 'hour', fromAbbr: 'hr', to: 'minute', toAbbr: 'min', factor: 60, category: 'time' },
  { from: 'day', fromAbbr: 'd', to: 'hour', toAbbr: 'hr', factor: 24, category: 'time' },
  { from: 'week', fromAbbr: 'wk', to: 'day', toAbbr: 'd', factor: 7, category: 'time' },
  { from: 'year', fromAbbr: 'yr', to: 'day', toAbbr: 'd', factor: 365.25, category: 'time' },

  // Digital Storage
  { from: 'megabyte', fromAbbr: 'MB', to: 'gigabyte', toAbbr: 'GB', factor: 0.001, category: 'digital' },
  { from: 'gigabyte', fromAbbr: 'GB', to: 'terabyte', toAbbr: 'TB', factor: 0.001, category: 'digital' },
  { from: 'kilobyte', fromAbbr: 'KB', to: 'megabyte', toAbbr: 'MB', factor: 0.001, category: 'digital' },
  { from: 'megabit', fromAbbr: 'Mb', to: 'megabyte', toAbbr: 'MB', factor: 0.125, category: 'digital' },
]

export function getSlug(conversion: Conversion): string {
  return `${conversion.fromAbbr.toLowerCase().replace(/[^a-z0-9]/g, '')}-to-${conversion.toAbbr.toLowerCase().replace(/[^a-z0-9]/g, '')}`
}

export function convert(conversion: Conversion, value: number): number {
  if (conversion.factor) {
    return value * conversion.factor
  }
  if (conversion.formula) {
    // eslint-disable-next-line no-new-func
    return new Function('x', `return ${conversion.formula}`)(value) as number
  }
  return value
}

export function getConversionsByCategory(category: ConversionCategory): Conversion[] {
  return conversions.filter(c => c.category === category)
}
```

- [ ] **Step 4: Verify TypeScript compiles**

Run: `cd /Users/markus/Developer/toolprime && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
cd /Users/markus/Developer/toolprime
git add src/data/
git commit -m "feat: add tool registry, FAQ data, and unit conversion data"
```

---

## Task 3: SEO Helpers & Schema Markup

**Files:**
- Create: `src/lib/seo.ts`
- Create: `src/lib/schema.ts`

- [ ] **Step 1: Create SEO helper**

Create `src/lib/seo.ts`:

```typescript
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
```

- [ ] **Step 2: Create schema markup helper**

Create `src/lib/schema.ts`:

```typescript
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
```

- [ ] **Step 3: Commit**

```bash
cd /Users/markus/Developer/toolprime
git add src/lib/
git commit -m "feat: add SEO meta tag and JSON-LD schema helpers"
```

---

## Task 4: Layouts & Shared Components

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/layouts/ToolLayout.astro`
- Create: `src/components/seo/Breadcrumbs.astro`
- Create: `src/components/seo/RelatedTools.astro`
- Create: `src/components/seo/FaqSection.astro`
- Create: `src/components/seo/SchemaMarkup.astro`
- Create: `src/components/ui/CopyButton.tsx`

- [ ] **Step 1: Create BaseLayout**

Create `src/layouts/BaseLayout.astro`:

```astro
---
import '../styles/global.css'

interface Props {
  title: string
  description: string
  canonical: string
  ogTitle?: string
  ogDescription?: string
  ogType?: string
}

const { title, description, canonical, ogTitle, ogDescription, ogType = 'website' } = Astro.props
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <meta property="og:title" content={ogTitle ?? title} />
    <meta property="og:description" content={ogDescription ?? description} />
    <meta property="og:type" content={ogType} />
    <meta property="og:url" content={canonical} />
    <meta name="twitter:card" content="summary" />
    <slot name="head" />
  </head>
  <body class="min-h-screen flex flex-col">
    <header class="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" class="text-xl font-bold text-[var(--color-primary)]">ToolPrime</a>
        <nav class="hidden sm:flex gap-4 text-sm text-[var(--color-text-muted)]">
          <a href="/#developer" class="hover:text-[var(--color-text)]">Developer</a>
          <a href="/#text" class="hover:text-[var(--color-text)]">Text</a>
          <a href="/#image" class="hover:text-[var(--color-text)]">Image</a>
          <a href="/#math" class="hover:text-[var(--color-text)]">Math</a>
        </nav>
      </div>
    </header>

    <main class="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
      <slot />
    </main>

    <footer class="border-t border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-text-muted)]">
      <div class="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between gap-4">
        <p>© {new Date().getFullYear()} ToolPrime. All tools are free and process data locally in your browser.</p>
        <div class="flex gap-4">
          <a href="/impressum" class="hover:text-[var(--color-text)]">Impressum</a>
          <a href="/datenschutz" class="hover:text-[var(--color-text)]">Privacy</a>
        </div>
      </div>
    </footer>
  </body>
</html>
```

- [ ] **Step 2: Create SchemaMarkup component**

Create `src/components/seo/SchemaMarkup.astro`:

```astro
---
interface Props {
  json: string
}
const { json } = Astro.props
---

<script type="application/ld+json" set:html={json} />
```

- [ ] **Step 3: Create Breadcrumbs component**

Create `src/components/seo/Breadcrumbs.astro`:

```astro
---
import { breadcrumbSchema } from '@/lib/schema'
import SchemaMarkup from './SchemaMarkup.astro'

interface BreadcrumbItem {
  name: string
  url: string
}

interface Props {
  items: BreadcrumbItem[]
}

const { items } = Astro.props
const allItems = [{ name: 'Home', url: 'https://toolprime.dev/' }, ...items]
---

<SchemaMarkup json={breadcrumbSchema(allItems)} />
<nav aria-label="Breadcrumb" class="text-sm text-[var(--color-text-muted)] mb-4">
  <ol class="flex flex-wrap gap-1">
    {allItems.map((item, i) => (
      <li class="flex items-center gap-1">
        {i > 0 && <span aria-hidden="true">›</span>}
        {i < allItems.length - 1 ? (
          <a href={item.url} class="hover:text-[var(--color-text)]">{item.name}</a>
        ) : (
          <span class="text-[var(--color-text)]">{item.name}</span>
        )}
      </li>
    ))}
  </ol>
</nav>
```

- [ ] **Step 4: Create RelatedTools component**

Create `src/components/seo/RelatedTools.astro`:

```astro
---
import { getRelatedTools, type Tool } from '@/data/tools'
import * as icons from 'lucide-react'

interface Props {
  toolId: string
}

const { toolId } = Astro.props
const related = getRelatedTools(toolId)
---

{related.length > 0 && (
  <section class="mt-12">
    <h2 class="text-xl font-semibold mb-4">Related Tools</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {related.map((tool) => (
        <a
          href={tool.path}
          class="block p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] transition-colors"
        >
          <h3 class="font-medium text-[var(--color-text)]">{tool.name}</h3>
          <p class="text-sm text-[var(--color-text-muted)] mt-1 line-clamp-2">{tool.description}</p>
        </a>
      ))}
    </div>
  </section>
)}
```

- [ ] **Step 5: Create FaqSection component**

Create `src/components/seo/FaqSection.astro`:

```astro
---
import { faqPageSchema } from '@/lib/schema'
import SchemaMarkup from './SchemaMarkup.astro'
import type { Faq } from '@/data/faqs'

interface Props {
  faqs: Faq[]
}

const { faqs } = Astro.props
---

{faqs.length > 0 && (
  <section class="mt-12">
    <SchemaMarkup json={faqPageSchema(faqs)} />
    <h2 class="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
    <div class="space-y-4">
      {faqs.map((faq) => (
        <details class="group border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)]">
          <summary class="px-4 py-3 cursor-pointer font-medium hover:text-[var(--color-primary)] list-none flex justify-between items-center">
            {faq.question}
            <span class="text-[var(--color-text-muted)] group-open:rotate-180 transition-transform">▾</span>
          </summary>
          <p class="px-4 pb-4 text-[var(--color-text-muted)]">{faq.answer}</p>
        </details>
      ))}
    </div>
  </section>
)}
```

- [ ] **Step 6: Create ToolLayout**

Create `src/layouts/ToolLayout.astro`:

```astro
---
import BaseLayout from './BaseLayout.astro'
import Breadcrumbs from '@/components/seo/Breadcrumbs.astro'
import RelatedTools from '@/components/seo/RelatedTools.astro'
import FaqSection from '@/components/seo/FaqSection.astro'
import SchemaMarkup from '@/components/seo/SchemaMarkup.astro'
import { webApplicationSchema } from '@/lib/schema'
import { getToolMeta } from '@/lib/seo'
import { categoryLabels, type Tool } from '@/data/tools'
import { faqs as allFaqs } from '@/data/faqs'

interface Props {
  tool: Tool
}

const { tool } = Astro.props
const meta = getToolMeta(tool)
const toolFaqs = allFaqs[tool.id] ?? []
const categoryLabel = categoryLabels[tool.category]
---

<BaseLayout {...meta}>
  <SchemaMarkup json={webApplicationSchema(tool)} slot="head" />

  <Breadcrumbs items={[
    { name: categoryLabel, url: `https://toolprime.dev/#${tool.category}` },
    { name: tool.name, url: meta.canonical },
  ]} />

  <h1 class="text-3xl font-bold mb-2">{tool.name}</h1>
  <p class="text-[var(--color-text-muted)] mb-6">{tool.longDescription}</p>

  <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6">
    <slot />
  </div>

  <slot name="content" />

  <FaqSection faqs={toolFaqs} />
  <RelatedTools toolId={tool.id} />
</BaseLayout>
```

- [ ] **Step 7: Create CopyButton**

Create `src/components/ui/CopyButton.tsx`:

```tsx
import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CopyButtonProps {
  text: string
  className?: string
}

export function CopyButton({ text, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-md border border-[var(--color-border)] hover:bg-[var(--color-surface-alt)] transition-colors ${className}`}
      title="Copy to clipboard"
    >
      {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}
```

- [ ] **Step 8: Verify build**

Run: `cd /Users/markus/Developer/toolprime && pnpm build`
Expected: Build succeeds

- [ ] **Step 9: Commit**

```bash
cd /Users/markus/Developer/toolprime
git add src/layouts/ src/components/
git commit -m "feat: add base layout, tool layout, breadcrumbs, FAQ, related tools, copy button"
```

---

## Task 5: Homepage

**Files:**
- Create: `src/pages/index.astro`

- [ ] **Step 1: Create homepage**

Create `src/pages/index.astro`:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro'
import { tools, categoryLabels, type ToolCategory } from '@/data/tools'
import { getHomeMeta } from '@/lib/seo'

const meta = getHomeMeta()

const categories = Object.entries(categoryLabels) as [ToolCategory, string][]
---

<BaseLayout {...meta}>
  <section class="text-center mb-12">
    <h1 class="text-4xl font-bold mb-3">Free Online Tools</h1>
    <p class="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
      Developer tools, text utilities, image processors, calculators, and more. No signup, no server uploads — everything runs in your browser.
    </p>
  </section>

  {categories.map(([category, label]) => {
    const categoryTools = tools.filter(t => t.category === category)
    if (categoryTools.length === 0) return null
    return (
      <section id={category} class="mb-10">
        <h2 class="text-2xl font-semibold mb-4">{label}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryTools.map((tool) => (
            <a
              href={tool.path}
              class="block p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] hover:shadow-sm transition-all"
            >
              <h3 class="font-semibold text-[var(--color-text)] mb-1">{tool.name}</h3>
              <p class="text-sm text-[var(--color-text-muted)] line-clamp-2">{tool.longDescription}</p>
            </a>
          ))}
        </div>
      </section>
    )
  })}
</BaseLayout>
```

- [ ] **Step 2: Run dev server and verify**

Run: `cd /Users/markus/Developer/toolprime && pnpm dev`
Expected: Homepage loads at localhost:4321 with tool cards organized by category.

- [ ] **Step 3: Commit**

```bash
cd /Users/markus/Developer/toolprime
git add src/pages/index.astro
git commit -m "feat: add homepage with categorized tool directory"
```

---

## Task 6: First Tool — Word Counter

**Files:**
- Create: `src/components/tools/WordCounter.tsx`
- Create: `src/pages/word-counter.astro`

- [ ] **Step 1: Create WordCounter component**

Create `src/components/tools/WordCounter.tsx`:

```tsx
import { useState } from 'react'

interface Stats {
  words: number
  characters: number
  charactersNoSpaces: number
  sentences: number
  paragraphs: number
  readingTime: string
}

function analyze(text: string): Stats {
  if (!text.trim()) {
    return { words: 0, characters: 0, charactersNoSpaces: 0, sentences: 0, paragraphs: 0, readingTime: '0 sec' }
  }

  const words = text.trim().split(/\s+/).length
  const characters = text.length
  const charactersNoSpaces = text.replace(/\s/g, '').length
  const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length || 1
  const minutes = Math.ceil(words / 200)
  const readingTime = minutes < 1 ? '< 1 min' : `${minutes} min`

  return { words, characters, charactersNoSpaces, sentences, paragraphs, readingTime }
}

export function WordCounter() {
  const [text, setText] = useState('')
  const stats = analyze(text)

  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here..."
        className="w-full h-48 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] resize-y focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-sans text-base"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {([
          ['Words', stats.words],
          ['Characters', stats.characters],
          ['No Spaces', stats.charactersNoSpaces],
          ['Sentences', stats.sentences],
          ['Paragraphs', stats.paragraphs],
          ['Reading Time', stats.readingTime],
        ] as const).map(([label, value]) => (
          <div key={label} className="text-center p-3 rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border)]">
            <div className="text-2xl font-bold text-[var(--color-primary)]">{value}</div>
            <div className="text-xs text-[var(--color-text-muted)] mt-1">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create word-counter page**

Create `src/pages/word-counter.astro`:

```astro
---
import ToolLayout from '@/layouts/ToolLayout.astro'
import { WordCounter } from '@/components/tools/WordCounter'
import { getToolById } from '@/data/tools'

const tool = getToolById('word-counter')!
---

<ToolLayout tool={tool}>
  <WordCounter client:load />

  <section slot="content" class="mt-8 prose prose-slate max-w-none">
    <h2>How to Use the Word Counter</h2>
    <p>
      Simply paste or type your text into the input field above. The tool instantly analyzes your text and displays six key metrics: word count, character count (with and without spaces), sentence count, paragraph count, and estimated reading time.
    </p>
    <p>
      Reading time is calculated based on an average reading speed of 200 words per minute, which is the standard used by most publishing platforms including Medium and WordPress.
    </p>

    <h2>Use Cases</h2>
    <ul>
      <li><strong>Essay writing:</strong> Track your word count against assignment requirements.</li>
      <li><strong>SEO content:</strong> Ensure your blog posts meet recommended lengths (1,500–2,500 words for long-form).</li>
      <li><strong>Social media:</strong> Check character limits for Twitter/X (280), LinkedIn (3,000), or Instagram (2,200).</li>
      <li><strong>Academic writing:</strong> Monitor word count for abstracts, papers, and dissertations.</li>
    </ul>

    <h2>Privacy</h2>
    <p>
      This tool processes your text entirely in your browser. No text is ever sent to a server, stored, or logged. Your content remains completely private.
    </p>
  </section>
</ToolLayout>
```

- [ ] **Step 3: Verify in browser**

Run: `cd /Users/markus/Developer/toolprime && pnpm dev`
Visit: `http://localhost:4321/word-counter`
Expected: Tool page loads with textarea, stats update as you type, breadcrumbs show "Home > Text Tools > Word Counter", FAQ section renders, related tools appear.

- [ ] **Step 4: Run build**

Run: `cd /Users/markus/Developer/toolprime && pnpm build`
Expected: Build succeeds, word-counter page is generated.

- [ ] **Step 5: Commit**

```bash
cd /Users/markus/Developer/toolprime
git add src/components/tools/WordCounter.tsx src/pages/word-counter.astro
git commit -m "feat: add Word Counter tool with stats and content"
```

---

## Task 7: JSON Formatter Tool

**Files:**
- Create: `src/components/tools/JsonFormatter.tsx`
- Create: `src/pages/json-formatter.astro`

- [ ] **Step 1: Create JsonFormatter component**

Create `src/components/tools/JsonFormatter.tsx`:

```tsx
import { useState } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'

type Tab = 'format' | 'minify' | 'validate'

export function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [tab, setTab] = useState<Tab>('format')
  const [indent, setIndent] = useState(2)

  const process = (action: Tab) => {
    setTab(action)
    setError('')
    if (!input.trim()) {
      setOutput('')
      return
    }
    try {
      const parsed = JSON.parse(input)
      if (action === 'format') {
        setOutput(JSON.stringify(parsed, null, indent))
      } else if (action === 'minify') {
        setOutput(JSON.stringify(parsed))
      } else {
        setOutput('✓ Valid JSON')
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Invalid JSON'
      setError(msg)
      setOutput('')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(['format', 'minify', 'validate'] as const).map((action) => (
          <button
            key={action}
            onClick={() => process(action)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              tab === action
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-[var(--color-surface-alt)] border border-[var(--color-border)] hover:bg-[var(--color-border)]'
            }`}
          >
            {action.charAt(0).toUpperCase() + action.slice(1)}
          </button>
        ))}
        {tab === 'format' && (
          <select
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value))}
            className="px-3 py-2 rounded-md text-sm border border-[var(--color-border)] bg-[var(--color-surface)]"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
          </select>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"key": "value"}'
            className="w-full h-64 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium">Output</label>
            {output && !error && <CopyButton text={output} />}
          </div>
          {error ? (
            <div className="w-full h-64 p-4 rounded-lg border border-red-300 bg-red-50 text-red-700 font-mono text-sm overflow-auto">
              {error}
            </div>
          ) : (
            <textarea
              readOnly
              value={output}
              className="w-full h-64 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] font-mono text-sm resize-y"
            />
          )}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create json-formatter page**

Create `src/pages/json-formatter.astro`:

```astro
---
import ToolLayout from '@/layouts/ToolLayout.astro'
import { JsonFormatter } from '@/components/tools/JsonFormatter'
import { getToolById } from '@/data/tools'

const tool = getToolById('json-formatter')!
---

<ToolLayout tool={tool}>
  <JsonFormatter client:load />

  <section slot="content" class="mt-8 prose prose-slate max-w-none">
    <h2>How to Use the JSON Formatter</h2>
    <p>
      Paste your JSON data into the input field and click <strong>Format</strong> to beautify it with proper indentation, <strong>Minify</strong> to compress it to a single line, or <strong>Validate</strong> to check if the syntax is correct.
    </p>
    <p>
      Choose between 2-space or 4-space indentation for formatted output. If your JSON has syntax errors, the tool will show the error message with details about what went wrong.
    </p>

    <h2>What is JSON?</h2>
    <p>
      JSON (JavaScript Object Notation) is a lightweight data format used for data exchange between servers and web applications. It is human-readable and easy to parse. JSON is the most common format for REST APIs, configuration files, and data storage.
    </p>

    <h2>Privacy</h2>
    <p>
      All JSON processing happens locally in your browser using JavaScript's built-in <code>JSON.parse()</code> and <code>JSON.stringify()</code>. Your data never leaves your device.
    </p>
  </section>
</ToolLayout>
```

- [ ] **Step 3: Verify and commit**

Run: `cd /Users/markus/Developer/toolprime && pnpm build`
Expected: Build succeeds.

```bash
cd /Users/markus/Developer/toolprime
git add src/components/tools/JsonFormatter.tsx src/pages/json-formatter.astro
git commit -m "feat: add JSON Formatter tool with format, minify, validate"
```

---

## Task 8-15: Remaining 8 Tools

Each of the remaining 8 tools (Password Generator, QR Code, Color Picker, Base64, Image Compressor, Lorem Ipsum, Unit Converter, Percentage Calculator) follows the exact same pattern as Tasks 6-7:

1. Create `src/components/tools/[ToolName].tsx` — React component with full client-side logic
2. Create `src/pages/[tool-slug].astro` — Astro page using ToolLayout, imports the component with `client:load`, adds 500+ words of content in the `slot="content"` section
3. Verify build succeeds
4. Commit

**For each tool, the implementing agent should:**
- Reference `src/data/tools.ts` for the tool's metadata
- Reference `src/data/faqs.ts` for the tool's FAQ content
- Follow the page structure exactly as shown in Tasks 6-7
- Use `client:load` directive for the React island
- Include "How to Use", use cases, and privacy sections in the content
- For QR Code: install `qrcode` package (`pnpm add qrcode @types/qrcode`)
- For Image Compressor: install `browser-image-compression` package (`pnpm add browser-image-compression`)

**Commit each tool separately** with message format: `feat: add [Tool Name] tool`

---

## Task 16: Programmatic SEO — Unit Conversion Pages

**Files:**
- Create: `src/pages/converters/[...slug].astro`

- [ ] **Step 1: Create dynamic converter page**

Create `src/pages/converters/[...slug].astro`:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro'
import Breadcrumbs from '@/components/seo/Breadcrumbs.astro'
import { conversions, getSlug, convert, conversionCategoryLabels } from '@/data/conversions'
import { getConversionMeta } from '@/lib/seo'

export function getStaticPaths() {
  return conversions.map((conv) => ({
    params: { slug: getSlug(conv) },
    props: { conversion: conv },
  }))
}

const { conversion } = Astro.props
const meta = getConversionMeta(conversion.from, conversion.fromAbbr, conversion.to, conversion.toAbbr)
const categoryLabel = conversionCategoryLabels[conversion.category]

// Generate conversion table (1-100)
const tableValues = [1, 2, 5, 10, 15, 20, 25, 50, 75, 100]
const tableRows = tableValues.map(v => ({
  input: v,
  output: Number(convert(conversion, v).toFixed(6)),
}))
---

<BaseLayout {...meta}>
  <Breadcrumbs items={[
    { name: 'Unit Converter', url: 'https://toolprime.dev/unit-converter' },
    { name: categoryLabel, url: `https://toolprime.dev/unit-converter#${conversion.category}` },
    { name: `${conversion.from} to ${conversion.to}`, url: meta.canonical },
  ]} />

  <h1 class="text-3xl font-bold mb-2">
    Convert {conversion.from} ({conversion.fromAbbr}) to {conversion.to} ({conversion.toAbbr})
  </h1>
  <p class="text-[var(--color-text-muted)] mb-6">
    Instantly convert {conversion.from} to {conversion.to} with our free online converter. Enter a value below.
  </p>

  <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 mb-8">
    <div class="flex flex-col sm:flex-row items-center gap-4" id="converter">
      <div class="flex-1 w-full">
        <label class="block text-sm font-medium mb-1">{conversion.from} ({conversion.fromAbbr})</label>
        <input
          type="number"
          id="input-value"
          value="1"
          class="w-full p-3 rounded-lg border border-[var(--color-border)] text-lg font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />
      </div>
      <span class="text-2xl text-[var(--color-text-muted)]">=</span>
      <div class="flex-1 w-full">
        <label class="block text-sm font-medium mb-1">{conversion.to} ({conversion.toAbbr})</label>
        <input
          type="text"
          id="output-value"
          value={convert(conversion, 1).toFixed(6)}
          readonly
          class="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-lg font-mono"
        />
      </div>
    </div>
  </div>

  <script define:vars={{ factor: conversion.factor, formula: conversion.formula }}>
    const input = document.getElementById('input-value')
    const output = document.getElementById('output-value')
    input.addEventListener('input', () => {
      const val = parseFloat(input.value)
      if (isNaN(val)) { output.value = ''; return }
      let result
      if (factor) {
        result = val * factor
      } else if (formula) {
        result = new Function('x', `return ${formula}`)(val)
      }
      output.value = result.toFixed(6)
    })
  </script>

  <h2 class="text-xl font-semibold mb-4">Conversion Table: {conversion.from} to {conversion.to}</h2>
  <div class="overflow-x-auto">
    <table class="w-full border-collapse border border-[var(--color-border)] mb-8">
      <thead>
        <tr class="bg-[var(--color-surface-alt)]">
          <th class="border border-[var(--color-border)] px-4 py-2 text-left">{conversion.from} ({conversion.fromAbbr})</th>
          <th class="border border-[var(--color-border)] px-4 py-2 text-left">{conversion.to} ({conversion.toAbbr})</th>
        </tr>
      </thead>
      <tbody>
        {tableRows.map(row => (
          <tr>
            <td class="border border-[var(--color-border)] px-4 py-2 font-mono">{row.input}</td>
            <td class="border border-[var(--color-border)] px-4 py-2 font-mono">{row.output}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <div class="prose prose-slate max-w-none">
    <h2>How to Convert {conversion.from} to {conversion.to}</h2>
    {conversion.factor ? (
      <p>
        To convert {conversion.from} to {conversion.to}, multiply the value by {conversion.factor}. For example, 10 {conversion.fromAbbr} × {conversion.factor} = {(10 * conversion.factor).toFixed(4)} {conversion.toAbbr}.
      </p>
    ) : (
      <p>
        To convert {conversion.from} to {conversion.to}, use the formula: {conversion.toAbbr} = {conversion.formula?.replace('x', conversion.fromAbbr)}. For example, 100 {conversion.fromAbbr} = {convert(conversion, 100).toFixed(2)} {conversion.toAbbr}.
      </p>
    )}
  </div>
</BaseLayout>
```

- [ ] **Step 2: Verify programmatic pages generate**

Run: `cd /Users/markus/Developer/toolprime && pnpm build`
Expected: Build generates 40+ conversion pages under `/converters/`. Check output for page count.

- [ ] **Step 3: Commit**

```bash
cd /Users/markus/Developer/toolprime
git add src/pages/converters/
git commit -m "feat: add programmatic unit conversion pages (40+ pages for SEO)"
```

---

## Task 17: Legal Pages

**Files:**
- Create: `src/pages/impressum.astro`
- Create: `src/pages/datenschutz.astro`
- Create: `src/pages/404.astro`

- [ ] **Step 1: Create Impressum page**

Create `src/pages/impressum.astro` with placeholder content (user must fill in real data):

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro'
---

<BaseLayout
  title="Impressum | ToolPrime"
  description="Legal notice (Impressum) for ToolPrime."
  canonical="https://toolprime.dev/impressum"
>
  <h1 class="text-3xl font-bold mb-6">Impressum</h1>
  <div class="prose prose-slate max-w-none">
    <p><strong>Angaben gemäß § 5 TMG:</strong></p>
    <p>
      [Name]<br />
      [Straße Nr.]<br />
      [PLZ Ort]<br />
      Deutschland
    </p>
    <p><strong>Kontakt:</strong></p>
    <p>E-Mail: [email@example.com]</p>
    <p><strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</strong></p>
    <p>[Name], [Adresse]</p>
  </div>
</BaseLayout>
```

- [ ] **Step 2: Create Datenschutz page**

Create `src/pages/datenschutz.astro`:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro'
---

<BaseLayout
  title="Datenschutzerklärung | ToolPrime"
  description="Privacy policy for ToolPrime. All tools process data locally in your browser."
  canonical="https://toolprime.dev/datenschutz"
>
  <h1 class="text-3xl font-bold mb-6">Privacy Policy / Datenschutzerklärung</h1>
  <div class="prose prose-slate max-w-none">
    <h2>Data Processing</h2>
    <p>
      All tools on ToolPrime process data exclusively in your web browser. No user data, text, images, or files are transmitted to our servers or any third-party servers. Your data never leaves your device.
    </p>

    <h2>Analytics</h2>
    <p>
      We use <a href="https://plausible.io" rel="nofollow">Plausible Analytics</a>, a privacy-friendly analytics service that does not use cookies, does not collect personal data, and is fully compliant with GDPR, CCPA, and PECR. No consent banner is required.
    </p>

    <h2>Advertising</h2>
    <p>
      This website displays advertisements provided by third-party ad networks. These networks may use cookies to serve relevant ads. You can manage your cookie preferences via the cookie consent banner displayed on your first visit.
    </p>

    <h2>Your Rights (GDPR)</h2>
    <p>
      Under the General Data Protection Regulation (GDPR), you have the right to access, rectify, erase, restrict processing, data portability, and object to processing of your personal data. Since we do not collect personal data through our tools, these rights primarily apply to any data collected through advertising cookies.
    </p>

    <h2>Contact</h2>
    <p>For privacy-related inquiries: [email@example.com]</p>
  </div>
</BaseLayout>
```

- [ ] **Step 3: Create 404 page**

Create `src/pages/404.astro`:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro'
---

<BaseLayout
  title="Page Not Found | ToolPrime"
  description="The page you are looking for does not exist."
  canonical="https://toolprime.dev/404"
>
  <div class="text-center py-20">
    <h1 class="text-6xl font-bold text-[var(--color-text-muted)] mb-4">404</h1>
    <p class="text-xl text-[var(--color-text-muted)] mb-8">Page not found</p>
    <a href="/" class="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:opacity-90 transition-opacity">
      Back to Tools
    </a>
  </div>
</BaseLayout>
```

- [ ] **Step 4: Commit**

```bash
cd /Users/markus/Developer/toolprime
git add src/pages/impressum.astro src/pages/datenschutz.astro src/pages/404.astro
git commit -m "feat: add legal pages (Impressum, Datenschutz) and 404"
```

---

## Task 18: Deploy to Cloudflare Pages

- [ ] **Step 1: Verify full build**

Run: `cd /Users/markus/Developer/toolprime && pnpm build`
Expected: Build succeeds, all pages generated. Check `dist/` folder for all tool pages and converter pages.

- [ ] **Step 2: Create GitHub repository**

```bash
cd /Users/markus/Developer/toolprime
gh repo create toolprime --private --source=. --push
```

- [ ] **Step 3: Connect to Cloudflare Pages**

Go to dash.cloudflare.com → Pages → Create a project → Connect to Git → Select `toolprime` repo.

Build settings:
- Framework preset: Astro
- Build command: `pnpm build`
- Build output directory: `dist`
- Node.js version: 20

- [ ] **Step 4: Configure custom domain (when ready)**

In Cloudflare Pages project settings → Custom domains → Add `toolprime.dev` (once domain is purchased).

- [ ] **Step 5: Submit to Google Search Console**

1. Go to search.google.com/search-console
2. Add property: `https://toolprime.dev`
3. Verify via DNS TXT record (add to Cloudflare DNS)
4. Submit sitemap: `https://toolprime.dev/sitemap-index.xml`

- [ ] **Step 6: Commit deployment config**

```bash
cd /Users/markus/Developer/toolprime
git add -A
git commit -m "chore: production build verified, ready for Cloudflare Pages deployment"
```

---

## Verification Checklist

After all tasks are complete, verify:

- [ ] `pnpm build` succeeds with zero errors
- [ ] All 10 tool pages render correctly in browser
- [ ] All 40+ programmatic converter pages render correctly
- [ ] Homepage lists all tools by category
- [ ] Breadcrumbs show on every tool page
- [ ] Related tools show on every tool page
- [ ] FAQ sections render and expand on click
- [ ] JSON-LD schema validates at https://validator.schema.org
- [ ] Lighthouse scores 95+ on Performance, Accessibility, SEO, Best Practices for all pages
- [ ] All tools work on mobile (375px viewport)
- [ ] Impressum and Datenschutz pages are accessible from footer
- [ ] robots.txt references sitemap
- [ ] sitemap-index.xml includes all pages
- [ ] Copy buttons work on all relevant tools
