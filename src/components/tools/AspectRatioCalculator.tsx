import { useState, useMemo } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'

type Mode = 'calculate' | 'resize'

const QUICK_RATIOS: [number, number, string][] = [
  [16, 9, '16:9'],
  [4, 3, '4:3'],
  [1, 1, '1:1'],
  [21, 9, '21:9'],
  [9, 16, '9:16'],
]

function gcd(a: number, b: number): number {
  while (b) { [a, b] = [b, a % b] }
  return a
}

interface AspectRatioCalculatorProps {
  defaultWidth?: number
  defaultHeight?: number
}

export function AspectRatioCalculator({ defaultWidth, defaultHeight }: AspectRatioCalculatorProps) {
  const [mode, setMode] = useState<Mode>('calculate')

  // Calculate mode
  const [calcWidth, setCalcWidth] = useState(defaultWidth?.toString() ?? '1920')
  const [calcHeight, setCalcHeight] = useState(defaultHeight?.toString() ?? '1080')

  // Resize mode
  const [resizeWidth, setResizeWidth] = useState(defaultWidth?.toString() ?? '1920')
  const [resizeHeight, setResizeHeight] = useState('')
  const [ratioW, setRatioW] = useState('16')
  const [ratioH, setRatioH] = useState('9')
  const [lockDim, setLockDim] = useState<'width' | 'height'>('width')

  const calcResult = useMemo(() => {
    const w = parseInt(calcWidth, 10)
    const h = parseInt(calcHeight, 10)
    if (!w || !h || w <= 0 || h <= 0) return null
    const g = gcd(w, h)
    const rw = w / g
    const rh = h / g
    const megapixels = (w * h) / 1_000_000
    return {
      ratio: `${rw}:${rh}`,
      decimal: (w / h).toFixed(4),
      megapixels: megapixels.toFixed(2),
      width: w,
      height: h,
    }
  }, [calcWidth, calcHeight])

  const resizeResult = useMemo(() => {
    const rw = parseInt(ratioW, 10)
    const rh = parseInt(ratioH, 10)
    if (!rw || !rh || rw <= 0 || rh <= 0) return null

    if (lockDim === 'width') {
      const w = parseInt(resizeWidth, 10)
      if (!w || w <= 0) return null
      const h = Math.round((w * rh) / rw)
      return { width: w, height: h }
    } else {
      const h = parseInt(resizeHeight, 10)
      if (!h || h <= 0) return null
      const w = Math.round((h * rw) / rh)
      return { width: w, height: h }
    }
  }, [resizeWidth, resizeHeight, ratioW, ratioH, lockDim])

  const previewDims = useMemo(() => {
    const result = mode === 'calculate' ? calcResult : resizeResult
    if (!result) return null
    const maxSize = 200
    const { width, height } = result
    const scale = Math.min(maxSize / width, maxSize / height)
    return { width: Math.round(width * scale), height: Math.round(height * scale) }
  }, [mode, calcResult, resizeResult])

  function handleQuickRatio(rw: number, rh: number) {
    setRatioW(rw.toString())
    setRatioH(rh.toString())
  }

  const inputClass = 'w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]'
  const labelClass = 'block text-sm font-medium text-[var(--color-text-muted)] mb-1'
  const btnActive = 'bg-[var(--color-primary)] text-white'
  const btnInactive = 'bg-[var(--color-surface-alt)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)]'

  return (
    <div className="space-y-6">
      {/* Mode toggle */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode('calculate')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${mode === 'calculate' ? btnActive : btnInactive}`}
        >
          Calculate Ratio
        </button>
        <button
          type="button"
          onClick={() => setMode('resize')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${mode === 'resize' ? btnActive : btnInactive}`}
        >
          Resize
        </button>
      </div>

      {mode === 'calculate' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Width (px)</label>
              <input
                type="number"
                min="1"
                value={calcWidth}
                onChange={(e) => setCalcWidth(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Height (px)</label>
              <input
                type="number"
                min="1"
                value={calcHeight}
                onChange={(e) => setCalcHeight(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {calcResult && (
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xs text-[var(--color-text-muted)] mb-1">Aspect Ratio</div>
                  <div className="text-lg font-bold text-[var(--color-text)] flex items-center justify-center gap-1">
                    {calcResult.ratio}
                    <CopyButton text={calcResult.ratio} className="inline-flex" />
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[var(--color-text-muted)] mb-1">Decimal</div>
                  <div className="text-lg font-bold text-[var(--color-text)]">{calcResult.decimal}</div>
                </div>
                <div>
                  <div className="text-xs text-[var(--color-text-muted)] mb-1">Megapixels</div>
                  <div className="text-lg font-bold text-[var(--color-text)]">{calcResult.megapixels} MP</div>
                </div>
              </div>

              {previewDims && (
                <div className="flex justify-center">
                  <div
                    className="border-2 border-[var(--color-primary)] rounded bg-[var(--color-primary)]/10 flex items-center justify-center text-xs text-[var(--color-text-muted)]"
                    style={{ width: previewDims.width, height: previewDims.height }}
                  >
                    {calcResult.width} x {calcResult.height}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {mode === 'resize' && (
        <div className="space-y-4">
          {/* Ratio inputs */}
          <div>
            <label className={labelClass}>Aspect Ratio</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                value={ratioW}
                onChange={(e) => setRatioW(e.target.value)}
                className={inputClass}
                style={{ maxWidth: 80 }}
              />
              <span className="text-[var(--color-text-muted)] font-bold">:</span>
              <input
                type="number"
                min="1"
                value={ratioH}
                onChange={(e) => setRatioH(e.target.value)}
                className={inputClass}
                style={{ maxWidth: 80 }}
              />
            </div>
          </div>

          {/* Quick select */}
          <div className="flex flex-wrap gap-2">
            {QUICK_RATIOS.map(([rw, rh, label]) => (
              <button
                key={label}
                type="button"
                onClick={() => handleQuickRatio(rw, rh)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  ratioW === rw.toString() && ratioH === rh.toString() ? btnActive : btnInactive
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Dimension lock */}
          <div className="flex gap-2 text-sm">
            <button
              type="button"
              onClick={() => setLockDim('width')}
              className={`rounded-lg px-3 py-1.5 font-medium transition-colors ${lockDim === 'width' ? btnActive : btnInactive}`}
            >
              Lock Width
            </button>
            <button
              type="button"
              onClick={() => setLockDim('height')}
              className={`rounded-lg px-3 py-1.5 font-medium transition-colors ${lockDim === 'height' ? btnActive : btnInactive}`}
            >
              Lock Height
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Width (px)</label>
              <input
                type="number"
                min="1"
                value={lockDim === 'width' ? resizeWidth : (resizeResult?.width.toString() ?? '')}
                onChange={(e) => { if (lockDim === 'width') setResizeWidth(e.target.value) }}
                readOnly={lockDim === 'height'}
                className={`${inputClass} ${lockDim === 'height' ? 'opacity-60' : ''}`}
              />
            </div>
            <div>
              <label className={labelClass}>Height (px)</label>
              <input
                type="number"
                min="1"
                value={lockDim === 'height' ? resizeHeight : (resizeResult?.height.toString() ?? '')}
                onChange={(e) => { if (lockDim === 'height') setResizeHeight(e.target.value) }}
                readOnly={lockDim === 'width'}
                className={`${inputClass} ${lockDim === 'width' ? 'opacity-60' : ''}`}
              />
            </div>
          </div>

          {resizeResult && previewDims && (
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4 sm:p-6 space-y-4">
              <div className="text-center">
                <div className="text-xs text-[var(--color-text-muted)] mb-1">Result</div>
                <div className="text-lg font-bold text-[var(--color-text)] flex items-center justify-center gap-1">
                  {resizeResult.width} x {resizeResult.height}
                  <CopyButton text={`${resizeResult.width}x${resizeResult.height}`} className="inline-flex" />
                </div>
              </div>

              <div className="flex justify-center">
                <div
                  className="border-2 border-[var(--color-primary)] rounded bg-[var(--color-primary)]/10 flex items-center justify-center text-xs text-[var(--color-text-muted)]"
                  style={{ width: previewDims.width, height: previewDims.height }}
                >
                  {resizeResult.width} x {resizeResult.height}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
