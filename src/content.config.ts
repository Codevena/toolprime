import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    category: z.enum(['tutorial', 'roundup', 'explainer', 'tips', 'reference']),
    tags: z.array(z.string()),
    relatedTools: z.array(z.string()),
  }),
})

export const collections = { blog }
