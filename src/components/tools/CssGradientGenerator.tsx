import { useState } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'

type GradientType = 'linear' | 'radial' | 'conic'

interface ColorStop {
  color: string
  position: number
}

const presets: { name: string; stops: ColorStop[]; type: GradientType; angle: number }[] = [
  { name: 'Sunset', stops: [{ color: '#ff6b6b', position: 0 }, { color: '#feca57', position: 100 }], type: 'linear', angle: 135 },
  { name: 'Ocean', stops: [{ color: '#2193b0', position: 0 }, { color: '#6dd5ed', position: 100 }], type: 'linear', angle: 90 },
  { name: 'Purple Haze', stops: [{ color: '#7b2ff7', position: 0 }, { color: '#c471f5', position: 50 }, { color: '#f64f59', position: 100 }], type: 'linear', angle: 135 },
  { name: 'Forest', stops: [{ color: '#134e5e', position: 0 }, { color: '#71b280', position: 100 }], type: 'linear', angle: 180 },
  { name: 'Warm Flame', stops: [{ color: '#ff9a9e', position: 0 }, { color: '#fad0c4', position: 100 }], type: 'linear', angle: 45 },
  { name: 'Night Sky', stops: [{ color: '#0f0c29', position: 0 }, { color: '#302b63', position: 50 }, { color: '#24243e', position: 100 }], type: 'linear', angle: 180 },
]

function buildGradientCSS(type: GradientType, angle: number, stops: ColorStop[]): string {
  const stopsStr = stops.map(s => `${s.color} ${s.position}%`).join(', ')
  switch (type) {
    case 'linear': return `linear-gradient(${angle}deg, ${stopsStr})`
    case 'radial': return `radial-gradient(circle, ${stopsStr})`
    case 'conic': return `conic-gradient(from ${angle}deg, ${stopsStr})`
  }
}

export function CssGradientGenerator() {
  const [type, setType] = useState<GradientType>('linear')
  const [angle, setAngle] = useState(135)
  const [stops, setStops] = useState<ColorStop[]>([
    { color: '#667eea', position: 0 },
    { color: '#764ba2', position: 100 },
  ])

  const gradientCSS = buildGradientCSS(type, angle, stops)
  const cssOutput = `background: ${gradientCSS};`

  function updateStop(index: number, field: 'color' | 'position', value: string | number) {
    setStops(prev => prev.map((s, i) => i === index ? { ...s, [field]: value } : s))
  }

  function addStop() {
    const lastPos = stops[stops.length - 1]?.position ?? 0
    const newPos = Math.min(lastPos + 20, 100)
    setStops(prev => [...prev, { color: '#ffffff', position: newPos }])
  }

  function removeStop(index: number) {
    if (stops.length <= 2) return
    setStops(prev => prev.filter((_, i) => i !== index))
  }

  function applyPreset(preset: typeof presets[number]) {
    setStops(preset.stops)
    setType(preset.type)
    setAngle(preset.angle)
  }

  return (
    <div className="space-y-4">
      {/* Preview */}
      <div
        className="w-full h-48 rounded-lg border border-[var(--color-border)]"
        style={{ background: gradientCSS }}
      />

      {/* Controls */}
      <div className="flex flex-wrap gap-2 items-center">
        {(['linear', 'radial', 'conic'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
              type === t
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-[var(--color-surface-alt)] border border-[var(--color-border)] hover:bg-[var(--color-border)]'
            }`}
          >
            {t}
          </button>
        ))}
        {(type === 'linear' || type === 'conic') && (
          <div className="flex items-center gap-2 ml-2">
            <label className="text-sm text-[var(--color-text-muted)]">Angle:</label>
            <input
              type="range"
              min={0}
              max={360}
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-24"
            />
            <span className="text-sm font-mono w-10">{angle}°</span>
          </div>
        )}
      </div>

      {/* Color stops */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Color Stops</label>
        {stops.map((stop, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="color"
              value={stop.color}
              onChange={(e) => updateStop(i, 'color', e.target.value)}
              className="w-10 h-10 rounded border border-[var(--color-border)] cursor-pointer"
            />
            <input
              type="text"
              value={stop.color}
              onChange={(e) => updateStop(i, 'color', e.target.value)}
              className="w-24 p-2 rounded border border-[var(--color-border)] bg-[var(--color-surface-alt)] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
            <input
              type="range"
              min={0}
              max={100}
              value={stop.position}
              onChange={(e) => updateStop(i, 'position', Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm font-mono w-10">{stop.position}%</span>
            {stops.length > 2 && (
              <button
                onClick={() => removeStop(i)}
                className="px-2 py-1 text-sm rounded border border-[var(--color-border)] hover:bg-[var(--color-error-bg)] hover:text-[var(--color-error-text)] transition-colors"
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addStop}
          className="px-3 py-1.5 text-sm rounded-md border border-[var(--color-border)] bg-[var(--color-surface-alt)] hover:bg-[var(--color-border)] transition-colors"
        >
          + Add Color Stop
        </button>
      </div>

      {/* Presets */}
      <div>
        <label className="text-sm font-medium block mb-2">Presets</label>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm border border-[var(--color-border)] bg-[var(--color-surface-alt)] hover:bg-[var(--color-border)] transition-colors"
            >
              <span
                className="w-4 h-4 rounded-full border border-[var(--color-border)]"
                style={{ background: buildGradientCSS(preset.type, preset.angle, preset.stops) }}
              />
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* CSS Output */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-sm font-medium">CSS Output</label>
          <CopyButton text={cssOutput} />
        </div>
        <div className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] font-mono text-sm">
          {cssOutput}
        </div>
      </div>
    </div>
  )
}
