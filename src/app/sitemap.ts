import type { MetadataRoute } from 'next'

const SITE = 'https://procpa.co.kr'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '',
    '/about',
    '/portfolio',
    '/contact',
    '/terms',
    '/disclaimer',
  ].map((p) => ({ url: `${SITE}${p}`, lastModified: new Date() }))
}
