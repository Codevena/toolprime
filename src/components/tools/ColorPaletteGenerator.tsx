import { useState, useCallback } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'

// ── Color math utilities ─────────────────────────────

interface RGB { r: number; g: number; b: number }
interface HSL { h: number; s: number; l: number }

function hexToRgb(hex: string): RGB | null {
  const clean = hex.replace('#', '')
  if (clean.length !== 6) return null
  const r = parseInt(clean.slice(0, 2), 16)
  const g = parseInt(clean.slice(2, 4), 16)
  const b = parseInt(clean.slice(4, 6), 16)
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null
  return { r, g, b }
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0')).join('')
}

function rgbToHsl(r: number, g: number, b: number): HSL {
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const l = (max + min) / 2
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) }
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6
  else if (max === gn) h = ((bn - rn) / d + 2) / 6
  else h = ((rn - gn) / d + 4) / 6
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

function hslToRgb(h: number, s: number, l: number): RGB {
  const sn = s / 100
  const ln = l / 100
  const c = (1 - Math.abs(2 * ln - 1)) * sn
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = ln - c / 2
  let r = 0
  let g = 0
  let b = 0
  if (h < 60) { r = c; g = x }
  else if (h < 120) { r = x; g = c }
  else if (h < 180) { g = c; b = x }
  else if (h < 240) { g = x; b = c }
  else if (h < 300) { r = x; b = c }
  else { r = c; b = x }
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  }
}

function hslToHex(h: number, s: number, l: number): string {
  const { r, g, b } = hslToRgb(h, s, l)
  return rgbToHex(r, g, b)
}

function normalizeHue(h: number): number {
  return ((h % 360) + 360) % 360
}

// ── Palette generation ───────────────────────────────

type HarmonyType = 'complementary' | 'analogous' | 'triadic' | 'tetradic' | 'split-complementary' | 'monochromatic'

interface PaletteColor {
  hex: string
  rgb: RGB
  hsl: HSL
  label: string
}

function generatePalette(baseHex: string, harmony: HarmonyType): PaletteColor[] {
  const rgb = hexToRgb(baseHex)
  if (!rgb) return []
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

  const makeColor = (h: number, s: number, l: number, label: string): PaletteColor => {
    const nh = normalizeHue(h)
    const hex = hslToHex(nh, s, l)
    const crgb = hslToRgb(nh, s, l)
    return { hex, rgb: crgb, hsl: { h: nh, s, l }, label }
  }

  const base = makeColor(hsl.h, hsl.s, hsl.l, 'Base')

  switch (harmony) {
    case 'complementary':
      return [
        base,
        makeColor(hsl.h + 180, hsl.s, hsl.l, 'Complement'),
      ]
    case 'analogous':
      return [
        makeColor(hsl.h - 30, hsl.s, hsl.l, 'Analogous -30'),
        base,
        makeColor(hsl.h + 30, hsl.s, hsl.l, 'Analogous +30'),
      ]
    case 'triadic':
      return [
        base,
        makeColor(hsl.h + 120, hsl.s, hsl.l, 'Triadic +120'),
        makeColor(hsl.h + 240, hsl.s, hsl.l, 'Triadic +240'),
      ]
    case 'tetradic':
      return [
        base,
        makeColor(hsl.h + 90, hsl.s, hsl.l, 'Tetradic +90'),
        makeColor(hsl.h + 180, hsl.s, hsl.l, 'Tetradic +180'),
        makeColor(hsl.h + 270, hsl.s, hsl.l, 'Tetradic +270'),
      ]
    case 'split-complementary':
      return [
        base,
        makeColor(hsl.h + 150, hsl.s, hsl.l, 'Split +150'),
        makeColor(hsl.h + 210, hsl.s, hsl.l, 'Split +210'),
      ]
    case 'monochromatic':
      return [
        makeColor(hsl.h, hsl.s, Math.max(hsl.l - 30, 5), 'Darkest'),
        makeColor(hsl.h, hsl.s, Math.max(hsl.l - 15, 10), 'Dark'),
        base,
        makeColor(hsl.h, hsl.s, Math.min(hsl.l + 15, 90), 'Light'),
        makeColor(hsl.h, hsl.s, Math.min(hsl.l + 30, 95), 'Lightest'),
      ]
    default:
      return [base]
  }
}

// ── Export helpers ────────────────────────────────────

function toCssVariables(colors: PaletteColor[]): string {
  return `:root {\n${colors.map((c, i) => `  --palette-${i + 1}: ${c.hex};`).join('\n')}\n}`
}

function toTailwindConfig(colors: PaletteColor[]): string {
  const entries = colors.map((c, i) => `      '${(i + 1) * 100}': '${c.hex}',`).join('\n')
  return `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        palette: {\n${entries}\n        },\n      },\n    },\n  },\n}`
}

// ── Harmony metadata ─────────────────────────────────

const harmonies: { value: HarmonyType; label: string; desc: string }[] = [
  { value: 'complementary', label: 'Complementary', desc: '2 colors opposite on the wheel' },
  { value: 'analogous', label: 'Analogous', desc: '3 neighboring colors' },
  { value: 'triadic', label: 'Triadic', desc: '3 colors evenly spaced' },
  { value: 'tetradic', label: 'Tetradic', desc: '4 colors forming a rectangle' },
  { value: 'split-complementary', label: 'Split-Complementary', desc: 'Base + 2 adjacent to complement' },
  { value: 'monochromatic', label: 'Monochromatic', desc: '5 shades of one hue' },
]

// ── Component ────────────────────────────────────────

export function ColorPaletteGenerator() {
  const [hex, setHex] = useState('#3b82f6')
  const [harmony, setHarmony] = useState<HarmonyType>('analogous')
  const [exportMode, setExportMode] = useState<'css' | 'tailwind'>('css')

  const palette = generatePalette(hex, harmony)

  const handleHexInput = useCallback((value: string) => {
    const cleaned = value.startsWith('#') ? value : `#${value}`
    if (cleaned.length <= 7) setHex(cleaned)
  }, [])

  const handlePickerChange = useCallback((value: string) => {
    setHex(value)
  }, [])

  const exportText = exportMode === 'css' ? toCssVariables(palette) : toTailwindConfig(palette)

  const allColorsText = palette.map(c => c.hex).join(', ')

  return (
    <div className="space-y-6">
      {/* Input Row */}
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="hex-input" className="block text-sm font-medium text-[var(--color-text)] mb-1">
            Base Color
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={hex.length === 7 ? hex : '#000000'}
              onChange={e => handlePickerChange(e.target.value)}
              className="w-10 h-10 rounded-lg border border-[var(--color-border)] cursor-pointer p-0.5"
              aria-label="Pick a color"
            />
            <input
              id="hex-input"
              type="text"
              value={hex}
              onChange={e => handleHexInput(e.target.value)}
              placeholder="#3b82f6"
              maxLength={7}
              className="flex-1 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label htmlFor="harmony-select" className="block text-sm font-medium text-[var(--color-text)] mb-1">
            Harmony Type
          </label>
          <select
            id="harmony-select"
            value={harmony}
            onChange={e => setHarmony(e.target.value as HarmonyType)}
            className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          >
            {harmonies.map(h => (
              <option key={h.value} value={h.value}>
                {h.label} — {h.desc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Palette Preview */}
      {palette.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-[var(--color-text)]">Generated Palette</h3>
            <CopyButton text={allColorsText} className="text-xs" />
          </div>

          {/* Big swatches row */}
          <div className="flex rounded-xl overflow-hidden border border-[var(--color-border)]" role="list" aria-label="Color palette swatches">
            {palette.map((c, i) => (
              <div
                key={i}
                className="flex-1 h-24 sm:h-32"
                style={{ backgroundColor: c.hex }}
                role="listitem"
                aria-label={`${c.label}: ${c.hex}`}
              />
            ))}
          </div>

          {/* Color detail cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
            {palette.map((c, i) => (
              <div key={i} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
                <div className="h-12" style={{ backgroundColor: c.hex }} />
                <div className="p-3 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[var(--color-text)]">{c.label}</span>
                    <CopyButton text={c.hex} className="text-xs" />
                  </div>
                  <div className="text-xs font-mono text-[var(--color-text-muted)] space-y-0.5">
                    <p>HEX: {c.hex}</p>
                    <p>RGB: rgb({c.rgb.r}, {c.rgb.g}, {c.rgb.b})</p>
                    <p>HSL: hsl({c.hsl.h}, {c.hsl.s}%, {c.hsl.l}%)</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Export */}
      {palette.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-sm font-semibold text-[var(--color-text)]">Export</h3>
            <div className="flex rounded-lg border border-[var(--color-border)] overflow-hidden text-xs">
              <button
                type="button"
                onClick={() => setExportMode('css')}
                className={`px-3 py-1 transition-colors ${exportMode === 'css' ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-alt)]'}`}
              >
                CSS Variables
              </button>
              <button
                type="button"
                onClick={() => setExportMode('tailwind')}
                className={`px-3 py-1 transition-colors ${exportMode === 'tailwind' ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-alt)]'}`}
              >
                Tailwind Config
              </button>
            </div>
          </div>
          <div className="relative">
            <pre className="bg-[var(--color-surface-alt)] border border-[var(--color-border)] rounded-lg p-4 text-xs font-mono text-[var(--color-text)] overflow-x-auto whitespace-pre">
              {exportText}
            </pre>
            <div className="absolute top-2 right-2">
              <CopyButton text={exportText} className="text-xs" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
