/**
 * Build an absolute URL to the dynamic OG image route (`/api/og`).
 * Use for `openGraph.images` / `twitter.images` and JSON-LD `image`.
 */
const SITE = 'https://procpa.co.kr'

export function ogImageUrl(opts: {
  title: string
  kicker?: string
  subtitle?: string
  meta?: string
}): string {
  const p = new URLSearchParams()
  p.set('title', opts.title)
  if (opts.kicker) p.set('kicker', opts.kicker)
  if (opts.subtitle) p.set('subtitle', opts.subtitle)
  if (opts.meta) p.set('meta', opts.meta)
  return `${SITE}/api/og?${p.toString()}`
}
