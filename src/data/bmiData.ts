export interface BmiPreset {
  slug: string
  heightCm: number
  weightKg: number
  bmi: number
  category: string
  title: string
  description: string
  healthyWeightRange: { min: number; max: number }
  faqs: Array<{ question: string; answer: string }>
  relatedBmi: string[]
}

const HEIGHTS = [146, 148, 150, 152, 155, 157, 160, 162, 165, 167, 170, 172, 175, 177, 180, 182, 185, 187, 190, 193, 195, 198, 200, 203] as const
const WEIGHTS = [38, 40, 43, 45, 48, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140] as const

function getBmiCategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal'
  if (bmi < 30) return 'Overweight'
  return 'Obese'
}

function getCategoryColor(category: string): string {
  switch (category) {
    case 'Underweight': return '#38bdf8'
    case 'Normal': return '#22c55e'
    case 'Overweight': return '#f59e0b'
    case 'Obese': return '#ef4444'
    default: return '#6b7280'
  }
}

function calcBmi(heightCm: number, weightKg: number): number {
  const heightM = heightCm / 100
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10
}

function healthyRange(heightCm: number): { min: number; max: number } {
  const heightM = heightCm / 100
  return {
    min: Math.round(18.5 * heightM * heightM * 10) / 10,
    max: Math.round(25 * heightM * heightM * 10) / 10,
  }
}

function isRealisticCombo(heightCm: number, weightKg: number): boolean {
  const bmi = calcBmi(heightCm, weightKg)
  // Filter extreme combos: skip BMI below 12 or above 45
  if (bmi < 12 || bmi > 45) return false
  // Skip very short + very heavy or very tall + very light
  if (heightCm <= 155 && weightKg >= 120) return false
  if (heightCm >= 195 && weightKg <= 45) return false
  return true
}

function buildSlug(heightCm: number, weightKg: number): string {
  return `bmi-${heightCm}cm-${weightKg}kg`
}

function buildFaqs(heightCm: number, weightKg: number, bmi: number, category: string, range: { min: number; max: number }): Array<{ question: string; answer: string }> {
  const heightM = (heightCm / 100).toFixed(2)
  return [
    {
      question: `What is the BMI for ${heightCm} cm and ${weightKg} kg?`,
      answer: `A person who is ${heightCm} cm tall and weighs ${weightKg} kg has a BMI of ${bmi}, which falls in the ${category} category according to WHO standards.`,
    },
    {
      question: `Is ${weightKg} kg a healthy weight for ${heightCm} cm?`,
      answer: category === 'Normal'
        ? `Yes, ${weightKg} kg is within the healthy weight range for someone ${heightCm} cm tall. The healthy range is ${range.min}–${range.max} kg.`
        : `A BMI of ${bmi} at ${heightCm} cm and ${weightKg} kg is classified as ${category}. The healthy weight range for ${heightCm} cm is ${range.min}–${range.max} kg.`,
    },
    {
      question: `How is BMI calculated for ${heightCm} cm and ${weightKg} kg?`,
      answer: `BMI = weight (kg) / height (m)². For ${heightCm} cm (${heightM} m) and ${weightKg} kg: ${weightKg} / (${heightM} × ${heightM}) = ${bmi}.`,
    },
  ]
}

function buildRelated(heightCm: number, weightKg: number, allSlugs: Set<string>): string[] {
  const related: string[] = []
  // Same height, different weights
  for (const w of WEIGHTS) {
    if (w === weightKg) continue
    const slug = buildSlug(heightCm, w)
    if (allSlugs.has(slug)) related.push(slug)
    if (related.length >= 4) break
  }
  // Same weight, different heights
  for (const h of HEIGHTS) {
    if (h === heightCm) continue
    const slug = buildSlug(h, weightKg)
    if (allSlugs.has(slug)) related.push(slug)
    if (related.length >= 8) break
  }
  return related
}

// Generate all valid presets
function generatePresets(): BmiPreset[] {
  // First pass: collect valid slugs
  const validCombos: Array<{ h: number; w: number }> = []
  const allSlugs = new Set<string>()

  for (const h of HEIGHTS) {
    for (const w of WEIGHTS) {
      if (isRealisticCombo(h, w)) {
        validCombos.push({ h, w })
        allSlugs.add(buildSlug(h, w))
      }
    }
  }

  // Second pass: build full presets with cross-links
  return validCombos.map(({ h, w }) => {
    const bmi = calcBmi(h, w)
    const category = getBmiCategory(bmi)
    const range = healthyRange(h)
    const slug = buildSlug(h, w)

    return {
      slug,
      heightCm: h,
      weightKg: w,
      bmi,
      category,
      title: `BMI for ${h} cm and ${w} kg — ${bmi} (${category})`,
      description: `Calculate BMI for ${h} cm height and ${w} kg weight. BMI is ${bmi} (${category}). Healthy weight range: ${range.min}–${range.max} kg.`,
      healthyWeightRange: range,
      faqs: buildFaqs(h, w, bmi, category, range),
      relatedBmi: buildRelated(h, w, allSlugs),
    }
  })
}

export const bmiPresets: BmiPreset[] = generatePresets()

export function getBmiPresetBySlug(slug: string): BmiPreset | undefined {
  return bmiPresets.find(p => p.slug === slug)
}

export function getBmiPresetsForHeight(heightCm: number, excludeSlug?: string): BmiPreset[] {
  return bmiPresets.filter(p => p.heightCm === heightCm && p.slug !== excludeSlug)
}

export { getCategoryColor }
