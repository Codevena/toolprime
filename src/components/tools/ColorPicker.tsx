import { useState } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'

// Conversion utilities
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace('#', '')
  if (clean.length !== 6) return null
  const r = parseInt(clean.slice(0, 2), 16)
  const g = parseInt(clean.slice(2, 4), 16)
  const b = parseInt(clean.slice(4, 6), 16)
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null
  return { r, g, b }
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rn = r / 255, gn = g / 255, bn = b / 255
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn)
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

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  const sn = s / 100, ln = l / 100
  const c = (1 - Math.abs(2 * ln - 1)) * sn
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = ln - c / 2
  let r = 0, g = 0, b = 0
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

export function ColorPicker() {
  const [hex, setHex] = useState('#3b82f6')
  const [hexInput, setHexInput] = useState('#3b82f6')
  const [rgb, setRgb] = useState(() => hexToRgb('#3b82f6')!)
  const [hsl, setHsl] = useState(() => rgbToHsl(59, 130, 246))

  const updateFromHex = (value: string) => {
    setHexInput(value)
    const parsed = hexToRgb(value)
    if (parsed) {
      setHex(value.startsWith('#') ? value : '#' + value)
      setRgb(parsed)
      setHsl(rgbToHsl(parsed.r, parsed.g, parsed.b))
    }
  }

  const updateFromPicker = (value: string) => {
    setHex(value)
    setHexInput(value)
    const parsed = hexToRgb(value)!
    setRgb(parsed)
    setHsl(rgbToHsl(parsed.r, parsed.g, parsed.b))
  }

  const updateFromRgb = (field: 'r' | 'g' | 'b', value: number) => {
    const newRgb = { ...rgb, [field]: Math.max(0, Math.min(255, value)) }
    setRgb(newRgb)
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b)
    setHex(newHex)
    setHexInput(newHex)
    setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b))
  }

  const updateFromHsl = (field: 'h' | 's' | 'l', value: number) => {
    const max = field === 'h' ? 360 : 100
    const newHsl = { ...hsl, [field]: Math.max(0, Math.min(max, value)) }
    setHsl(newHsl)
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l)
    setRgb(newRgb)
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b)
    setHex(newHex)
    setHexInput(newHex)
  }

  const hexStr = hex
  const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`

  return (
    <div className="space-y-6">
      {/* Color swatch + picker */}
      <div className="flex items-center gap-4">
        <div
          className="w-24 h-24 rounded-xl border border-[var(--color-border)] shadow-inner flex-shrink-0"
          style={{ backgroundColor: hex }}
        />
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Color Picker</label>
          <input
            type="color"
            value={hex}
            onChange={(e) => updateFromPicker(e.target.value)}
            className="w-full h-12 rounded-lg cursor-pointer border border-[var(--color-border)]"
          />
        </div>
      </div>

      {/* HEX */}
      <div className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold">HEX</label>
          <CopyButton text={hexStr} />
        </div>
        <input
          type="text"
          value={hexInput}
          onChange={(e) => updateFromHex(e.target.value)}
          className="w-full p-2 rounded border border-[var(--color-border)] bg-[var(--color-surface)] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          placeholder="#rrggbb"
        />
      </div>

      {/* RGB */}
      <div className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold">RGB</label>
          <CopyButton text={rgbStr} />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {(['r', 'g', 'b'] as const).map((ch) => (
            <div key={ch}>
              <label className="block text-xs text-[var(--color-text-muted)] mb-1 uppercase">{ch}</label>
              <input
                type="number"
                min={0}
                max={255}
                value={rgb[ch]}
                onChange={(e) => updateFromRgb(ch, Number(e.target.value))}
                className="w-full p-2 rounded border border-[var(--color-border)] bg-[var(--color-surface)] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* HSL */}
      <div className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold">HSL</label>
          <CopyButton text={hslStr} />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {([
            ['h', 'H', 360],
            ['s', 'S', 100],
            ['l', 'L', 100],
          ] as const).map(([field, label, max]) => (
            <div key={field}>
              <label className="block text-xs text-[var(--color-text-muted)] mb-1">{label}{field !== 'h' ? '%' : '°'}</label>
              <input
                type="number"
                min={0}
                max={max}
                value={hsl[field]}
                onChange={(e) => updateFromHsl(field, Number(e.target.value))}
                className="w-full p-2 rounded border border-[var(--color-border)] bg-[var(--color-surface)] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
