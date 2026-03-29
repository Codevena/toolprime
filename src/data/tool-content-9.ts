import type { ToolContent } from './tool-content'

export const toolContent9: Record<string, ToolContent> = {
  'color-palette-generator': {
    whatIs: {
      heading: 'What Is Color Theory and Why Does It Matter?',
      body: "Color theory is the foundation of visual design, guiding how colors interact, contrast, and harmonize with one another. At its core, color theory uses the color wheel — a circular arrangement of hues — to define relationships between colors. These relationships, called color harmonies, produce combinations that feel balanced and aesthetically pleasing to the human eye.\n\nThe six primary harmony types — complementary, analogous, triadic, tetradic, split-complementary, and monochromatic — each create distinct visual effects. Complementary pairs sit opposite each other on the wheel and produce high contrast. Analogous colors sit side by side and create smooth, unified palettes. Triadic and tetradic harmonies distribute colors evenly around the wheel for vibrant, balanced schemes.\n\nUnderstanding color theory lets designers make intentional choices that evoke specific emotions, guide user attention, and reinforce brand identity. A well-chosen palette communicates professionalism and builds trust, while a poorly matched set of colors can confuse users and undermine credibility. Tools like this palette generator automate the math behind these harmonies, letting you focus on creative decisions rather than manual calculations.",
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        {
          title: 'Brand Identity Design',
          description: 'Generate harmonious brand palettes from a single primary color. Ensure your logo, website, packaging, and marketing materials share a cohesive color system that strengthens brand recognition.',
        },
        {
          title: 'Web and UI Design',
          description: 'Build accessible color systems for websites and applications. Use monochromatic palettes for subtle UI layers or complementary palettes for high-contrast call-to-action elements.',
        },
        {
          title: 'Presentations and Slide Decks',
          description: 'Create visually consistent slide decks by generating a palette from your brand color. Export as CSS variables or apply the hex values directly to charts, backgrounds, and text elements.',
        },
        {
          title: 'Social Media and Marketing',
          description: 'Produce eye-catching social media graphics with harmonious color combinations. Consistent palettes across posts build a recognizable visual brand on platforms like Instagram and LinkedIn.',
        },
      ],
    },
    tips: {
      heading: 'Color Palette Best Practices',
      items: [
        {
          title: 'Start With One Strong Base',
          description: 'Choose a single meaningful base color — often your brand primary — and let the harmony rules generate the rest. Starting with too many colors leads to visual clutter.',
        },
        {
          title: 'Test for Accessibility',
          description: 'Check that text colors meet WCAG contrast ratios (4.5:1 for body text, 3:1 for large text) against your backgrounds. Beautiful palettes must also be readable.',
        },
        {
          title: 'Use the 60-30-10 Rule',
          description: 'Allocate 60% of your design to a dominant color, 30% to a secondary, and 10% to an accent. This creates a balanced layout that guides the eye naturally.',
        },
        {
          title: 'Export and Document',
          description: 'Export your palette as CSS variables or a Tailwind config so every developer on the team uses the exact same values. Consistency prevents color drift across a project.',
        },
      ],
    },
    comparison: {
      heading: 'Harmony Types Compared',
      headers: ['Harmony', 'Colors', 'Contrast', 'Best For'],
      rows: [
        ['Complementary', '2', 'High', 'CTAs, bold designs'],
        ['Analogous', '3', 'Low', 'Calm, unified layouts'],
        ['Triadic', '3', 'Medium', 'Vibrant, balanced schemes'],
        ['Tetradic', '4', 'High', 'Complex, rich designs'],
        ['Split-Complementary', '3', 'Medium–High', 'Softer contrast'],
        ['Monochromatic', '5', 'Low', 'Subtle UI layers'],
      ],
    },
  },
}
