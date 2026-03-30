import { useState } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'

type GradientType = 'linear' | 'radial' | 'conic'

interface ColorStop {
  color: string
  position: number
}

interface GradientPreset {
  name: string
  description: string
  stops: ColorStop[]
  type: GradientType
  angle: number
}

const presets: GradientPreset[] = [
  { name: 'Sunset', description: 'Hero section or CTA background with warm contrast.', stops: [{ color: '#ff6b6b', position: 0 }, { color: '#feca57', position: 100 }], type: 'linear', angle: 135 },
  { name: 'Ocean', description: 'Clean SaaS or dashboard surface with cooler tones.', stops: [{ color: '#2193b0', position: 0 }, { color: '#6dd5ed', position: 100 }], type: 'linear', angle: 90 },
  { name: 'Purple Haze', description: 'Editorial banner or product splash with extra depth.', stops: [{ color: '#7b2ff7', position: 0 }, { color: '#c471f5', position: 50 }, { color: '#f64f59', position: 100 }], type: 'linear', angle: 135 },
  { name: 'Forest', description: 'Natural palette for wellness, sustainability, or outdoors.', stops: [{ color: '#134e5e', position: 0 }, { color: '#71b280', position: 100 }], type: 'linear', angle: 180 },
  { name: 'Warm Flame', description: 'Soft accent for cards, headers, or onboarding flows.', stops: [{ color: '#ff9a9e', position: 0 }, { color: '#fad0c4', position: 100 }], type: 'linear', angle: 45 },
  { name: 'Night Sky', description: 'High-contrast dark gradient for overlays and covers.', stops: [{ color: '#0f0c29', position: 0 }, { color: '#302b63', position: 50 }, { color: '#24243e', position: 100 }], type: 'linear', angle: 180 },
  { name: 'Soft Radial', description: 'Spotlight treatment for product cards or avatars.', stops: [{ color: '#fdfbfb', position: 0 }, { color: '#ebedee', position: 100 }], type: 'radial', angle: 0 },
  { name: 'Conic Burst', description: 'Playful accent for badges, charts, or experimental UI.', stops: [{ color: '#ff9a9e', position: 0 }, { color: '#fad0c4', position: 35 }, { color: '#fad0c4', position: 65 }, { color: '#fcb69f', position: 100 }], type: 'conic', angle: 180 },
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
  const backgroundImageOutput = `background-image: ${gradientCSS};`
  const presetDescription = presets.find((preset) => (
    preset.type === type &&
    preset.angle === angle &&
    JSON.stringify(preset.stops) === JSON.stringify(stops)
  ))?.description

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

  function clearToDefault() {
    setType('linear')
    setAngle(135)
    setStops([
      { color: '#667eea', position: 0 },
      { color: '#764ba2', position: 100 },
    ])
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-[var(--color-text)]">Start from a gradient preset:</span>
          {presets.slice(0, 6).map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className="px-3 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-sm text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
            >
              {preset.name}
            </button>
          ))}
          <button
            onClick={clearToDefault}
            className="px-3 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-sm text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <h3 className="text-sm font-semibold text-[var(--color-text)]">Fast visual exploration</h3>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Test direction, type, and stop placement before opening design tooling or touching code.
          </p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <h3 className="text-sm font-semibold text-[var(--color-text)]">Developer handoff</h3>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Copy clean CSS output for hero sections, cards, buttons, overlays, or background-image declarations.
          </p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <h3 className="text-sm font-semibold text-[var(--color-text)]">Preset-based iteration</h3>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Use a proven gradient as a base, then adjust stops and angles instead of building every palette from scratch.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <div
          className="w-full h-56 rounded-lg border border-[var(--color-border)]"
          style={{ background: gradientCSS }}
        />
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-3">
            <p className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">Gradient type</p>
            <p className="mt-1 text-sm font-semibold capitalize text-[var(--color-text)]">{type}</p>
          </div>
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-3">
            <p className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">Angle / origin</p>
            <p className="mt-1 text-sm font-semibold text-[var(--color-text)]">{type === 'radial' ? 'Circle center' : `${angle}°`}</p>
          </div>
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-3">
            <p className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">Color stops</p>
            <p className="mt-1 text-sm font-semibold text-[var(--color-text)]">{stops.length}</p>
          </div>
        </div>
        {presetDescription && (
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">{presetDescription}</p>
        )}
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
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
            <div className="flex items-center gap-2 ml-0 md:ml-2">
              <label className="text-sm text-[var(--color-text-muted)]">Angle:</label>
              <input
                type="range"
                min={0}
                max={360}
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-28"
              />
              <span className="text-sm font-mono w-12">{angle}°</span>
            </div>
          )}
        </div>

        <div className="mt-4 space-y-3">
          <label className="text-sm font-medium text-[var(--color-text)]">Color Stops</label>
          {stops.map((stop, i) => (
            <div key={i} className="flex flex-wrap items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-3">
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
                className="w-28 p-2 rounded border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
              <input
                type="range"
                min={0}
                max={100}
                value={stop.position}
                onChange={(e) => updateStop(i, 'position', Number(e.target.value))}
                className="flex-1 min-w-[140px]"
              />
              <span className="text-sm font-mono w-12">{stop.position}%</span>
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
      </div>

      <div>
        <label className="text-sm font-medium block mb-2">Preset Library</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-left hover:border-[var(--color-primary)] transition-colors"
            >
              <div
                className="h-20 rounded-lg border border-[var(--color-border)]"
                style={{ background: buildGradientCSS(preset.type, preset.angle, preset.stops) }}
              />
              <div className="mt-3 flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-[var(--color-text)]">{preset.name}</h3>
                <span className="text-xs font-mono text-[var(--color-text-muted)] capitalize">{preset.type}</span>
              </div>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">{preset.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium">CSS Output</label>
            <CopyButton text={cssOutput} />
          </div>
          <div className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] font-mono text-sm">
            {cssOutput}
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium">Background Image Output</label>
            <CopyButton text={backgroundImageOutput} />
          </div>
          <div className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] font-mono text-sm">
            {backgroundImageOutput}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <h3 className="text-sm font-semibold text-[var(--color-text)]">Hero and marketing surfaces</h3>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Gradients add quick depth to landing page heroes, pricing banners, and feature callouts.
          </p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <h3 className="text-sm font-semibold text-[var(--color-text)]">Cards and overlays</h3>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Test subtle two-stop blends for cards, avatars, section dividers, and glassmorphism-style overlays.
          </p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <h3 className="text-sm font-semibold text-[var(--color-text)]">Reusable design tokens</h3>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Lock in a palette and export the exact CSS string for component libraries or design system docs.
          </p>
        </div>
      </div>
    </div>
  )
}
