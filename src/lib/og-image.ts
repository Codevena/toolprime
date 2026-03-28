import satori from 'satori'
import sharp from 'sharp'
import type { ToolCategory } from '@/data/tools'
import { categoryColors, categoryLabels } from '@/data/tools'

type SatoriElement = {
  type: string
  props: {
    style?: Record<string, unknown>
    children?: (SatoriElement | string)[] | string
    [key: string]: unknown
  }
}

const FONT_URL =
  'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf'
const FONT_BOLD_URL =
  'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYAZ9hjQ.ttf'

async function fetchFont(url: string, label: string): Promise<ArrayBuffer> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(10_000) })
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
    return await res.arrayBuffer()
  } catch (err) {
    console.warn(`Failed to fetch ${label} font from ${url}:`, err)
    throw new Error(`Failed to fetch ${label} font: ${err instanceof Error ? err.message : String(err)}`)
  }
}

let fontsPromise: Promise<{ regular: ArrayBuffer; bold: ArrayBuffer }> | null = null

function loadFonts(): Promise<{ regular: ArrayBuffer; bold: ArrayBuffer }> {
  if (!fontsPromise) {
    fontsPromise = (async () => {
      const [regular, bold] = await Promise.all([
        fetchFont(FONT_URL, 'Inter Regular'),
        fetchFont(FONT_BOLD_URL, 'Inter Bold'),
      ])
      return { regular, bold }
    })().catch((err) => {
      fontsPromise = null
      throw err
    })
  }
  return fontsPromise
}

const iconAbbreviations: Record<string, string> = {
  'word-counter': 'Aa',
  'json-formatter': '{ }',
  'password-generator': '\u2022\u2022',
  'qr-code-generator': 'QR',
  'color-picker': 'C',
  'base64-encode-decode': 'B64',
  'image-compressor': 'IMG',
  'lorem-ipsum-generator': 'Li',
  'unit-converter': '\u21C4',
  'percentage-calculator': '%',
  'url-encode-decode': '%20',
  'case-converter': 'Aa',
  'timestamp-converter': '\u23F1',
  'hash-generator': '#',
  'regex-tester': '.*',
  'sql-formatter': 'SQL',
  'diff-checker': '\u00B1',
  'css-gradient-generator': '\u25C6',
  'favicon-generator': 'ico',
  'invoice-generator': '$',
}

function getIconText(toolId: string): string {
  return iconAbbreviations[toolId] ?? toolId.charAt(0).toUpperCase()
}

function getIconColor(category: ToolCategory): string {
  return categoryColors[category] ?? '#818cf8'
}

export async function generateOgImage(tool: {
  id: string
  name: string
  description: string
  category: ToolCategory
}): Promise<Buffer> {
  const fonts = await loadFonts()
  const iconText = getIconText(tool.id)
  const iconColor = getIconColor(tool.category)
  const categoryLabel = categoryLabels[tool.category] ?? tool.category

  const markup = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '1200px',
        height: '630px',
        backgroundColor: '#0f172a',
        fontFamily: 'Inter',
      },
      children: [
        // Top gradient accent bar
        {
          type: 'div',
          props: {
            style: {
              width: '100%',
              height: '4px',
              background: 'linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)',
            },
          },
        },
        // Main content area
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              padding: '60px 80px',
              justifyContent: 'center',
            },
            children: [
              // Icon + category row
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '24px',
                  },
                  children: [
                    // Icon box
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '48px',
                          height: '48px',
                          borderRadius: '8px',
                          backgroundColor: iconColor,
                          color: '#ffffff',
                          fontSize: '20px',
                          fontWeight: 700,
                        },
                        children: iconText,
                      },
                    },
                    // Category label
                    {
                      type: 'div',
                      props: {
                        style: {
                          marginLeft: '16px',
                          fontSize: '14px',
                          color: '#94a3b8',
                          fontWeight: 400,
                        },
                        children: categoryLabel,
                      },
                    },
                  ],
                },
              },
              // Tool name
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '32px',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginBottom: '16px',
                    lineHeight: 1.3,
                  },
                  children: tool.name,
                },
              },
              // Description
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '20px',
                    fontWeight: 400,
                    color: '#94a3b8',
                    lineHeight: 1.5,
                    maxWidth: '900px',
                  },
                  children: tool.description,
                },
              },
            ],
          },
        },
        // Bottom bar with branding
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              padding: '0 80px 40px 80px',
            },
            children: [
              // Small gradient square
              {
                type: 'div',
                props: {
                  style: {
                    width: '20px',
                    height: '20px',
                    borderRadius: '4px',
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
                  },
                },
              },
              // Domain text
              {
                type: 'div',
                props: {
                  style: {
                    marginLeft: '10px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#64748b',
                  },
                  children: 'toolprime.dev',
                },
              },
            ],
          },
        },
      ],
    },
  }

  const svg = await satori(markup as SatoriElement as React.ReactNode, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Inter',
        data: fonts.regular,
        weight: 400,
        style: 'normal' as const,
      },
      {
        name: 'Inter',
        data: fonts.bold,
        weight: 700,
        style: 'normal' as const,
      },
    ],
  })

  const png = await sharp(Buffer.from(svg)).png().toBuffer()
  return png
}
