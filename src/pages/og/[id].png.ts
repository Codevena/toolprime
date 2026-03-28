import type { APIRoute, GetStaticPaths } from 'astro'
import { tools } from '@/data/tools'
import { generateOgImage } from '@/lib/og-image'

export const getStaticPaths: GetStaticPaths = () => {
  return tools.map((tool) => ({
    params: { id: tool.id },
    props: { tool },
  }))
}

export const GET: APIRoute = async ({ props }) => {
  const png = await generateOgImage(props.tool)
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  })
}
