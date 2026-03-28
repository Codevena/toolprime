export interface GradientPreset {
  name: string
  slug: string
  colors: string[]
  direction: number
  category: 'warm' | 'cool' | 'dark' | 'pastel' | 'vibrant' | 'neon' | 'earth'
}

export const gradientPresets: GradientPreset[] = [
  // Warm
  { name: 'Sunset Orange', slug: 'sunset-orange', colors: ['#FF512F', '#F09819'], direction: 135, category: 'warm' },
  { name: 'Warm Flame', slug: 'warm-flame', colors: ['#ff9a9e', '#fad0c4'], direction: 45, category: 'warm' },
  { name: 'Juicy Peach', slug: 'juicy-peach', colors: ['#ffecd2', '#fcb69f'], direction: 135, category: 'warm' },
  { name: 'Mango Pulp', slug: 'mango-pulp', colors: ['#F7971E', '#FFD200'], direction: 90, category: 'warm' },
  { name: 'Autumn Leaves', slug: 'autumn-leaves', colors: ['#D4145A', '#FBB03B'], direction: 135, category: 'warm' },
  { name: 'Golden Hour', slug: 'golden-hour', colors: ['#F2994A', '#F2C94C'], direction: 90, category: 'warm' },
  { name: 'Spiced Cider', slug: 'spiced-cider', colors: ['#C0392B', '#E67E22'], direction: 135, category: 'warm' },
  { name: 'Amber Glow', slug: 'amber-glow', colors: ['#FF8F00', '#FFB300'], direction: 90, category: 'warm' },
  // Cool
  { name: 'Ocean Blue', slug: 'ocean-blue', colors: ['#2E3192', '#1BFFFF'], direction: 135, category: 'cool' },
  { name: 'Arctic Ice', slug: 'arctic-ice', colors: ['#E0EAFC', '#CFDEF3'], direction: 135, category: 'cool' },
  { name: 'Winter Breeze', slug: 'winter-breeze', colors: ['#89F7FE', '#66A6FF'], direction: 135, category: 'cool' },
  { name: 'Aqua Marine', slug: 'aqua-marine', colors: ['#1A2980', '#26D0CE'], direction: 135, category: 'cool' },
  { name: 'Cool Sky', slug: 'cool-sky', colors: ['#2BC0E4', '#EAECC6'], direction: 135, category: 'cool' },
  { name: 'Pacific Dream', slug: 'pacific-dream', colors: ['#34e89e', '#0f3443'], direction: 135, category: 'cool' },
  { name: 'Frost Bite', slug: 'frost-bite', colors: ['#00BCD4', '#B2EBF2'], direction: 135, category: 'cool' },
  { name: 'Glacier Blue', slug: 'glacier-blue', colors: ['#0D47A1', '#42A5F5'], direction: 135, category: 'cool' },
  // Dark
  { name: 'Midnight Purple', slug: 'midnight-purple', colors: ['#0F0C29', '#302B63', '#24243E'], direction: 135, category: 'dark' },
  { name: 'Deep Space', slug: 'deep-space', colors: ['#000000', '#434343'], direction: 135, category: 'dark' },
  { name: 'Dark Knight', slug: 'dark-knight', colors: ['#BA8B02', '#181818'], direction: 135, category: 'dark' },
  { name: 'Obsidian', slug: 'obsidian', colors: ['#44A08D', '#093637'], direction: 135, category: 'dark' },
  { name: 'Charcoal Mist', slug: 'charcoal-mist', colors: ['#3E5151', '#DECBA4'], direction: 135, category: 'dark' },
  { name: 'Eclipse', slug: 'eclipse', colors: ['#FC5C7D', '#6A82FB'], direction: 135, category: 'dark' },
  { name: 'Black Hole', slug: 'black-hole', colors: ['#000000', '#1A237E'], direction: 135, category: 'dark' },
  // Pastel
  { name: 'Cotton Candy', slug: 'cotton-candy', colors: ['#fbc2eb', '#a6c1ee'], direction: 135, category: 'pastel' },
  { name: 'Lavender Dream', slug: 'lavender-dream', colors: ['#C9D6FF', '#E2E2E2'], direction: 135, category: 'pastel' },
  { name: 'Mint Fresh', slug: 'mint-fresh', colors: ['#00B09B', '#96C93D'], direction: 135, category: 'pastel' },
  { name: 'Peach Blush', slug: 'peach-blush', colors: ['#fbc8d4', '#f9748f'], direction: 90, category: 'pastel' },
  { name: 'Baby Blue', slug: 'baby-blue', colors: ['#E0C3FC', '#8EC5FC'], direction: 135, category: 'pastel' },
  { name: 'Rose Quartz', slug: 'rose-quartz', colors: ['#ffecd2', '#ee9ca7'], direction: 135, category: 'pastel' },
  { name: 'Lilac Breeze', slug: 'lilac-breeze', colors: ['#CE93D8', '#F3E5F5'], direction: 135, category: 'pastel' },
  // Vibrant
  { name: 'Neon Glow', slug: 'neon-glow', colors: ['#00F260', '#0575E6'], direction: 135, category: 'vibrant' },
  { name: 'Electric Purple', slug: 'electric-purple', colors: ['#8E2DE2', '#4A00E0'], direction: 135, category: 'vibrant' },
  { name: 'Cyber Punk', slug: 'cyber-punk', colors: ['#f953c6', '#b91d73'], direction: 135, category: 'vibrant' },
  { name: 'Lime Burst', slug: 'lime-burst', colors: ['#56ab2f', '#a8e063'], direction: 135, category: 'vibrant' },
  { name: 'Hot Pink', slug: 'hot-pink', colors: ['#FF0099', '#493240'], direction: 135, category: 'vibrant' },
  { name: 'Tropical Punch', slug: 'tropical-punch', colors: ['#fc4a1a', '#f7b733'], direction: 135, category: 'vibrant' },
  { name: 'Tropical Punch II', slug: 'tropical-punch-ii', colors: ['#FF4081', '#FF9100'], direction: 135, category: 'vibrant' },
  { name: 'Cosmic Fusion', slug: 'cosmic-fusion', colors: ['#6200EA', '#00BFA5'], direction: 135, category: 'vibrant' },
  // Neon
  { name: 'Electric Blue', slug: 'electric-blue', colors: ['#00F5FF', '#0080FF'], direction: 135, category: 'neon' },
  { name: 'Neon Hot Pink', slug: 'neon-hot-pink', colors: ['#FF1493', '#FF69B4'], direction: 135, category: 'neon' },
  { name: 'Cyber Green', slug: 'cyber-green', colors: ['#39FF14', '#00E676'], direction: 135, category: 'neon' },
  { name: 'Neon Orange', slug: 'neon-orange', colors: ['#FF6600', '#FFAA00'], direction: 90, category: 'neon' },
  { name: 'Laser Purple', slug: 'laser-purple', colors: ['#BF00FF', '#8000FF'], direction: 135, category: 'neon' },
  { name: 'Acid Yellow', slug: 'acid-yellow', colors: ['#CCFF00', '#66FF00'], direction: 90, category: 'neon' },
  // Earth
  { name: 'Forest Canopy', slug: 'forest-canopy', colors: ['#1B5E20', '#4CAF50'], direction: 135, category: 'earth' },
  { name: 'Desert Sand', slug: 'desert-sand', colors: ['#D2B48C', '#C19A6B'], direction: 90, category: 'earth' },
  { name: 'Deep Ocean', slug: 'deep-ocean', colors: ['#01579B', '#0288D1'], direction: 135, category: 'earth' },
  { name: 'Mountain Mist', slug: 'mountain-mist', colors: ['#546E7A', '#90A4AE'], direction: 135, category: 'earth' },
  { name: 'Sunset Horizon', slug: 'sunset-horizon', colors: ['#E65100', '#FF6F00', '#FFA000'], direction: 90, category: 'earth' },
  { name: 'Volcanic Rock', slug: 'volcanic-rock', colors: ['#1A1A2E', '#B71C1C'], direction: 135, category: 'earth' },
]

export const gradientCategoryLabels: Record<GradientPreset['category'], string> = {
  warm: 'Warm',
  cool: 'Cool',
  dark: 'Dark',
  pastel: 'Pastel',
  vibrant: 'Vibrant',
  neon: 'Neon',
  earth: 'Earth',
}

export function getRelatedGradients(slug: string, category: string): GradientPreset[] {
  return gradientPresets
    .filter((g) => g.slug !== slug && g.category === category)
    .slice(0, 6)
}

export function getCssGradient(colors: string[], direction: number): string {
  return `linear-gradient(${direction}deg, ${colors.join(', ')})`
}

export function getTailwindGradient(colors: string[]): string {
  if (colors.length === 2) return `bg-gradient-to-r from-[${colors[0]}] to-[${colors[1]}]`
  if (colors.length === 3) return `bg-gradient-to-r from-[${colors[0]}] via-[${colors[1]}] to-[${colors[2]}]`
  return `bg-gradient-to-r from-[${colors[0]}] to-[${colors[colors.length - 1]}]`
}
