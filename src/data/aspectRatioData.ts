export interface AspectRatioEntry {
  slug: string
  width: number
  height: number
  ratio: string       // e.g., "16:9"
  ratioDecimal: number // e.g., 1.778
}

export interface DeviceEntry {
  slug: string
  name: string
  width: number
  height: number
  ratio: string
  ppi?: number
  category: string
}

function gcd(a: number, b: number): number {
  while (b) { [a, b] = [b, a % b] }
  return a
}

export function calculateRatio(w: number, h: number): string {
  const g = gcd(w, h)
  return `${w / g}:${h / g}`
}

// Common resolutions
const resolutions: [number, number][] = [
  [640, 480], [800, 600], [1024, 768], [1280, 720], [1280, 800],
  [1280, 1024], [1366, 768], [1440, 900], [1600, 900], [1680, 1050],
  [1920, 1080], [1920, 1200], [2048, 1080], [2560, 1080], [2560, 1440],
  [2560, 1600], [3440, 1440], [3840, 2160], [5120, 2880], [7680, 4320],
  [1080, 1080], [1080, 1350], [1080, 1920], [1200, 628], [1200, 630],
  [640, 360], [854, 480], [960, 540], [1024, 576],
  [320, 480], [375, 667], [390, 844], [414, 896], [430, 932],
]

const seenResolutions = new Set<string>()

export const aspectRatioEntries: AspectRatioEntry[] = resolutions
  .filter(([w, h]) => {
    const key = `${w}x${h}`
    if (seenResolutions.has(key)) return false
    seenResolutions.add(key)
    return true
  })
  .map(([w, h]) => ({
    slug: `aspect-ratio-${w}x${h}`,
    width: w,
    height: h,
    ratio: calculateRatio(w, h),
    ratioDecimal: w / h,
  }))

export const deviceEntries: DeviceEntry[] = [
  { slug: 'iphone-16-pro-max-resolution', name: 'iPhone 16 Pro Max', width: 1320, height: 2868, ratio: '110:239', ppi: 460, category: 'Phone' },
  { slug: 'iphone-16-pro-resolution', name: 'iPhone 16 Pro', width: 1206, height: 2622, ratio: '201:437', ppi: 460, category: 'Phone' },
  { slug: 'iphone-16-resolution', name: 'iPhone 16', width: 1179, height: 2556, ratio: '131:284', ppi: 460, category: 'Phone' },
  { slug: 'iphone-15-pro-max-resolution', name: 'iPhone 15 Pro Max', width: 1290, height: 2796, ratio: '215:466', ppi: 460, category: 'Phone' },
  { slug: 'iphone-15-pro-resolution', name: 'iPhone 15 Pro', width: 1179, height: 2556, ratio: '131:284', ppi: 460, category: 'Phone' },
  { slug: 'iphone-15-resolution', name: 'iPhone 15', width: 1179, height: 2556, ratio: '131:284', ppi: 460, category: 'Phone' },
  { slug: 'iphone-14-resolution', name: 'iPhone 14', width: 1170, height: 2532, ratio: '195:422', ppi: 460, category: 'Phone' },
  { slug: 'iphone-se-resolution', name: 'iPhone SE', width: 750, height: 1334, ratio: '375:667', ppi: 326, category: 'Phone' },
  { slug: 'samsung-galaxy-s24-ultra-resolution', name: 'Samsung Galaxy S24 Ultra', width: 1440, height: 3120, ratio: '6:13', ppi: 505, category: 'Phone' },
  { slug: 'samsung-galaxy-s24-resolution', name: 'Samsung Galaxy S24', width: 1080, height: 2340, ratio: '6:13', ppi: 416, category: 'Phone' },
  { slug: 'ipad-pro-13-resolution', name: 'iPad Pro 13"', width: 2064, height: 2752, ratio: '3:4', ppi: 264, category: 'Tablet' },
  { slug: 'ipad-pro-11-resolution', name: 'iPad Pro 11"', width: 1668, height: 2388, ratio: '139:199', ppi: 264, category: 'Tablet' },
  { slug: 'ipad-air-resolution', name: 'iPad Air', width: 1640, height: 2360, ratio: '41:59', ppi: 264, category: 'Tablet' },
  { slug: 'ipad-mini-resolution', name: 'iPad Mini', width: 1488, height: 2266, ratio: '744:1133', ppi: 326, category: 'Tablet' },
  { slug: 'macbook-pro-16-resolution', name: 'MacBook Pro 16"', width: 3456, height: 2234, ratio: '1728:1117', ppi: 254, category: 'Laptop' },
  { slug: 'macbook-pro-14-resolution', name: 'MacBook Pro 14"', width: 3024, height: 1964, ratio: '756:491', ppi: 254, category: 'Laptop' },
  { slug: 'macbook-air-15-resolution', name: 'MacBook Air 15"', width: 2880, height: 1864, ratio: '360:233', ppi: 224, category: 'Laptop' },
  { slug: 'macbook-air-13-resolution', name: 'MacBook Air 13"', width: 2560, height: 1664, ratio: '20:13', ppi: 224, category: 'Laptop' },
  { slug: '4k-monitor-resolution', name: '4K UHD Monitor', width: 3840, height: 2160, ratio: '16:9', ppi: 163, category: 'Monitor' },
  { slug: '1440p-monitor-resolution', name: 'QHD Monitor', width: 2560, height: 1440, ratio: '16:9', ppi: 109, category: 'Monitor' },
  { slug: '1080p-monitor-resolution', name: 'Full HD Monitor', width: 1920, height: 1080, ratio: '16:9', ppi: 92, category: 'Monitor' },
  { slug: 'ultrawide-monitor-resolution', name: 'Ultrawide Monitor', width: 3440, height: 1440, ratio: '43:18', ppi: 109, category: 'Monitor' },
  { slug: '5k-monitor-resolution', name: '5K Monitor', width: 5120, height: 2880, ratio: '16:9', ppi: 218, category: 'Monitor' },
  { slug: '8k-monitor-resolution', name: '8K Monitor', width: 7680, height: 4320, ratio: '16:9', ppi: 326, category: 'Monitor' },
]

export interface VideoFormatEntry {
  slug: string
  name: string
  width: number
  height: number
  ratio: string
  platform: string
}

export const videoFormatEntries: VideoFormatEntry[] = [
  { slug: 'youtube-video-resolution', name: 'YouTube Video', width: 1920, height: 1080, ratio: '16:9', platform: 'YouTube' },
  { slug: 'youtube-shorts-resolution', name: 'YouTube Shorts', width: 1080, height: 1920, ratio: '9:16', platform: 'YouTube' },
  { slug: 'youtube-thumbnail-resolution', name: 'YouTube Thumbnail', width: 1280, height: 720, ratio: '16:9', platform: 'YouTube' },
  { slug: 'instagram-post-resolution', name: 'Instagram Post', width: 1080, height: 1080, ratio: '1:1', platform: 'Instagram' },
  { slug: 'instagram-story-resolution', name: 'Instagram Story', width: 1080, height: 1920, ratio: '9:16', platform: 'Instagram' },
  { slug: 'instagram-reel-resolution', name: 'Instagram Reel', width: 1080, height: 1920, ratio: '9:16', platform: 'Instagram' },
  { slug: 'tiktok-video-resolution', name: 'TikTok Video', width: 1080, height: 1920, ratio: '9:16', platform: 'TikTok' },
  { slug: 'facebook-post-resolution', name: 'Facebook Post', width: 1200, height: 630, ratio: '40:21', platform: 'Facebook' },
  { slug: 'facebook-cover-resolution', name: 'Facebook Cover', width: 820, height: 312, ratio: '205:78', platform: 'Facebook' },
  { slug: 'twitter-post-resolution', name: 'Twitter/X Post', width: 1600, height: 900, ratio: '16:9', platform: 'Twitter/X' },
  { slug: 'twitter-header-resolution', name: 'Twitter/X Header', width: 1500, height: 500, ratio: '3:1', platform: 'Twitter/X' },
  { slug: 'linkedin-post-resolution', name: 'LinkedIn Post', width: 1200, height: 627, ratio: '400:209', platform: 'LinkedIn' },
  { slug: 'linkedin-banner-resolution', name: 'LinkedIn Banner', width: 1584, height: 396, ratio: '4:1', platform: 'LinkedIn' },
  { slug: 'twitch-overlay-resolution', name: 'Twitch Overlay', width: 1920, height: 1080, ratio: '16:9', platform: 'Twitch' },
  { slug: 'og-image-resolution', name: 'OG Image', width: 1200, height: 630, ratio: '40:21', platform: 'Open Graph' },
  { slug: 'a4-paper-resolution', name: 'A4 Paper (300 DPI)', width: 2480, height: 3508, ratio: '620:877', platform: 'Print' },
  { slug: 'us-letter-resolution', name: 'US Letter (300 DPI)', width: 2550, height: 3300, ratio: '17:22', platform: 'Print' },
]

const extraWidths = [320, 480, 720, 960, 1024, 1152, 1280, 1440, 1600, 1920, 2048, 2560, 3840]
const commonRatios: [number, number][] = [[16, 9], [4, 3], [21, 9], [1, 1], [3, 2], [16, 10], [9, 16]]

const extraResolutions: AspectRatioEntry[] = []
const extraSeen = new Set(aspectRatioEntries.map((e) => e.slug))

for (const w of extraWidths) {
  for (const [rw, rh] of commonRatios) {
    const h = Math.round((w * rh) / rw)
    const slug = `aspect-ratio-${w}x${h}`
    if (extraSeen.has(slug)) continue
    extraSeen.add(slug)
    extraResolutions.push({
      slug,
      width: w,
      height: h,
      ratio: `${rw}:${rh}`,
      ratioDecimal: w / h,
    })
  }
}

export const allAspectRatioEntries = [...aspectRatioEntries, ...extraResolutions]

export function getRelatedAspectEntries(currentSlug: string, ratio: string): AspectRatioEntry[] {
  return allAspectRatioEntries
    .filter((e) => e.slug !== currentSlug && e.ratio === ratio)
    .slice(0, 8)
}
