import { useState, useMemo } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'

type UnitSystem = 'metric' | 'imperial'

interface BmiResult {
  bmi: number
  category: string
  color: string
  healthyMin: number
  healthyMax: number
}

const BMI_CATEGORIES = [
  { label: 'Underweight', min: 0, max: 18.5, color: '#38bdf8' },
  { label: 'Normal', min: 18.5, max: 25, color: '#22c55e' },
  { label: 'Overweight', min: 25, max: 30, color: '#f59e0b' },
  { label: 'Obese', min: 30, max: 100, color: '#ef4444' },
] as const

function calculateBmi(heightCm: number, weightKg: number): BmiResult | null {
  if (heightCm <= 0 || weightKg <= 0) return null
  const heightM = heightCm / 100
  const bmi = weightKg / (heightM * heightM)
  if (!isFinite(bmi)) return null

  const cat = BMI_CATEGORIES.find(c => bmi < c.max) ?? BMI_CATEGORIES[BMI_CATEGORIES.length - 1]
  const healthyMin = Math.round(18.5 * heightM * heightM * 10) / 10
  const healthyMax = Math.round(25 * heightM * heightM * 10) / 10

  return {
    bmi: Math.round(bmi * 10) / 10,
    category: cat.label,
    color: cat.color,
    healthyMin,
    healthyMax,
  }
}

function cmToFtIn(cm: number): { ft: number; inches: number } {
  const totalInches = cm / 2.54
  const ft = Math.floor(totalInches / 12)
  const inches = Math.round((totalInches - ft * 12) * 10) / 10
  return { ft, inches }
}

function ftInToCm(ft: number, inches: number): number {
  return (ft * 12 + inches) * 2.54
}

function lbsToKg(lbs: number): number {
  return lbs * 0.453592
}

function kgToLbs(kg: number): number {
  return kg / 0.453592
}

export function BmiCalculator() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric')
  const [heightCm, setHeightCm] = useState('')
  const [heightFt, setHeightFt] = useState('')
  const [heightIn, setHeightIn] = useState('')
  const [weightKg, setWeightKg] = useState('')
  const [weightLbs, setWeightLbs] = useState('')
  const [result, setResult] = useState<BmiResult | null>(null)
  const [calculated, setCalculated] = useState(false)

  const handleCalculate = () => {
    let h: number
    let w: number

    if (unitSystem === 'metric') {
      h = parseFloat(heightCm)
      w = parseFloat(weightKg)
    } else {
      const ft = parseFloat(heightFt) || 0
      const inches = parseFloat(heightIn) || 0
      h = ftInToCm(ft, inches)
      w = lbsToKg(parseFloat(weightLbs))
    }

    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
      setResult(null)
      setCalculated(true)
      return
    }

    setResult(calculateBmi(h, w))
    setCalculated(true)
  }

  const handleUnitToggle = (system: UnitSystem) => {
    if (system === unitSystem) return
    setUnitSystem(system)
    setResult(null)
    setCalculated(false)

    if (system === 'imperial' && heightCm) {
      const { ft, inches } = cmToFtIn(parseFloat(heightCm))
      setHeightFt(String(ft))
      setHeightIn(String(inches))
    }
    if (system === 'imperial' && weightKg) {
      setWeightLbs(String(Math.round(kgToLbs(parseFloat(weightKg)) * 10) / 10))
    }
    if (system === 'metric' && (heightFt || heightIn)) {
      const cm = ftInToCm(parseFloat(heightFt) || 0, parseFloat(heightIn) || 0)
      setHeightCm(String(Math.round(cm * 10) / 10))
    }
    if (system === 'metric' && weightLbs) {
      setWeightKg(String(Math.round(lbsToKg(parseFloat(weightLbs)) * 10) / 10))
    }
  }

  const barPosition = useMemo(() => {
    if (!result) return 0
    // Map BMI 10-40 to 0-100%
    return Math.max(0, Math.min(100, ((result.bmi - 10) / 30) * 100))
  }, [result])

  const copyText = result
    ? `BMI: ${result.bmi} (${result.category}). Healthy weight range: ${result.healthyMin}–${result.healthyMax} kg.`
    : ''

  return (
    <div className="space-y-6">
      {/* Unit toggle */}
      <div className="flex gap-2">
        {(['metric', 'imperial'] as const).map((system) => (
          <button
            key={system}
            onClick={() => handleUnitToggle(system)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              unitSystem === system
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-[var(--color-surface-alt)] border border-[var(--color-border)] hover:bg-[var(--color-border)]'
            }`}
          >
            {system === 'metric' ? 'Metric (cm / kg)' : 'Imperial (ft·in / lbs)'}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {unitSystem === 'metric' ? (
          <div>
            <label htmlFor="bmi-height-cm" className="block text-sm font-medium mb-1">Height (cm)</label>
            <input
              id="bmi-height-cm"
              type="number"
              value={heightCm}
              onChange={(e) => { setHeightCm(e.target.value); setCalculated(false) }}
              placeholder="e.g. 170"
              min="0"
              className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-lg font-mono"
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium mb-1">Height (ft / in)</label>
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  id="bmi-height-ft"
                  type="number"
                  value={heightFt}
                  onChange={(e) => { setHeightFt(e.target.value); setCalculated(false) }}
                  placeholder="ft"
                  min="0"
                  className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-lg font-mono"
                  aria-label="Feet"
                />
              </div>
              <div className="flex-1">
                <input
                  id="bmi-height-in"
                  type="number"
                  value={heightIn}
                  onChange={(e) => { setHeightIn(e.target.value); setCalculated(false) }}
                  placeholder="in"
                  min="0"
                  max="11.9"
                  step="0.1"
                  className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-lg font-mono"
                  aria-label="Inches"
                />
              </div>
            </div>
          </div>
        )}

        {unitSystem === 'metric' ? (
          <div>
            <label htmlFor="bmi-weight-kg" className="block text-sm font-medium mb-1">Weight (kg)</label>
            <input
              id="bmi-weight-kg"
              type="number"
              value={weightKg}
              onChange={(e) => { setWeightKg(e.target.value); setCalculated(false) }}
              placeholder="e.g. 70"
              min="0"
              className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-lg font-mono"
            />
          </div>
        ) : (
          <div>
            <label htmlFor="bmi-weight-lbs" className="block text-sm font-medium mb-1">Weight (lbs)</label>
            <input
              id="bmi-weight-lbs"
              type="number"
              value={weightLbs}
              onChange={(e) => { setWeightLbs(e.target.value); setCalculated(false) }}
              placeholder="e.g. 154"
              min="0"
              className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-lg font-mono"
            />
          </div>
        )}
      </div>

      {/* Calculate button */}
      <button
        onClick={handleCalculate}
        className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:opacity-90 transition-opacity"
      >
        Calculate BMI
      </button>

      {/* Result */}
      {calculated && result && (
        <div role="status" aria-live="polite" className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm text-[var(--color-text-muted)]">Your BMI</div>
              <div className="text-4xl font-bold" style={{ color: result.color }}>
                {result.bmi}
              </div>
              <div className="text-lg font-semibold" style={{ color: result.color }}>
                {result.category}
              </div>
            </div>
            <CopyButton text={copyText} />
          </div>

          {/* Color bar */}
          <div className="space-y-1">
            <div className="relative h-4 rounded-full overflow-hidden flex">
              {BMI_CATEGORIES.map((cat) => {
                const totalRange = 30 // 10 to 40
                const width = ((Math.min(cat.max, 40) - Math.max(cat.min, 10)) / totalRange) * 100
                return (
                  <div
                    key={cat.label}
                    style={{ width: `${width}%`, backgroundColor: cat.color }}
                    className="h-full"
                    title={`${cat.label}: ${cat.min}–${cat.max >= 100 ? '40+' : cat.max}`}
                  />
                )
              })}
              {/* Marker */}
              <div
                className="absolute top-0 h-full w-0.5 bg-[var(--color-text)]"
                style={{ left: `${barPosition}%`, transition: 'left 0.3s ease' }}
              >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-bold text-[var(--color-text)] whitespace-nowrap">
                  {result.bmi}
                </div>
              </div>
            </div>
            <div className="flex text-xs text-[var(--color-text-muted)]">
              <span style={{ width: `${((18.5 - 10) / 30) * 100}%` }} className="text-center">Underweight</span>
              <span style={{ width: `${((25 - 18.5) / 30) * 100}%` }} className="text-center">Normal</span>
              <span style={{ width: `${((30 - 25) / 30) * 100}%` }} className="text-center">Overweight</span>
              <span style={{ width: `${((40 - 30) / 30) * 100}%` }} className="text-center">Obese</span>
            </div>
          </div>

          {/* Healthy weight range */}
          <div className="pt-3 border-t border-[var(--color-border)]">
            <div className="text-sm text-[var(--color-text-muted)]">
              Healthy weight range for your height
            </div>
            <div className="text-lg font-semibold text-[var(--color-text)]">
              {result.healthyMin} – {result.healthyMax} kg
              <span className="text-sm font-normal text-[var(--color-text-muted)] ml-2">
                ({Math.round(kgToLbs(result.healthyMin))} – {Math.round(kgToLbs(result.healthyMax))} lbs)
              </span>
            </div>
          </div>
        </div>
      )}

      {calculated && !result && (
        <div className="p-3 rounded-lg text-sm" style={{ border: '1px solid var(--color-warning-border)', background: 'var(--color-warning-bg)', color: 'var(--color-warning-text)' }}>
          Please enter valid height and weight values.
        </div>
      )}

      {/* WHO BMI Categories Reference */}
      <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
        <table className="w-full text-sm">
          <caption className="sr-only">WHO BMI Categories</caption>
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-alt)]">
              <th scope="col" className="px-4 py-2.5 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Category</th>
              <th scope="col" className="px-4 py-2.5 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">BMI Range</th>
              <th scope="col" className="px-4 py-2.5 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Health Risk</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[var(--color-border)]">
              <th scope="row" className="px-4 py-2.5 text-sm font-medium" style={{ color: '#38bdf8' }}>Underweight</th>
              <td className="px-4 py-2.5 text-sm text-[var(--color-text-muted)]">&lt; 18.5</td>
              <td className="px-4 py-2.5 text-sm text-[var(--color-text-muted)]">Nutritional deficiency risk</td>
            </tr>
            <tr className="border-b border-[var(--color-border)]">
              <th scope="row" className="px-4 py-2.5 text-sm font-medium" style={{ color: '#22c55e' }}>Normal</th>
              <td className="px-4 py-2.5 text-sm text-[var(--color-text-muted)]">18.5 – 24.9</td>
              <td className="px-4 py-2.5 text-sm text-[var(--color-text-muted)]">Lowest health risk</td>
            </tr>
            <tr className="border-b border-[var(--color-border)]">
              <th scope="row" className="px-4 py-2.5 text-sm font-medium" style={{ color: '#f59e0b' }}>Overweight</th>
              <td className="px-4 py-2.5 text-sm text-[var(--color-text-muted)]">25.0 – 29.9</td>
              <td className="px-4 py-2.5 text-sm text-[var(--color-text-muted)]">Increased risk of chronic disease</td>
            </tr>
            <tr>
              <th scope="row" className="px-4 py-2.5 text-sm font-medium" style={{ color: '#ef4444' }}>Obese</th>
              <td className="px-4 py-2.5 text-sm text-[var(--color-text-muted)]">&ge; 30.0</td>
              <td className="px-4 py-2.5 text-sm text-[var(--color-text-muted)]">High risk of chronic disease</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
