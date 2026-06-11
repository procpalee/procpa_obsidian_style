import type { MetadataRoute } from 'next'
import { posts, series, chapters } from '#site/content'
import { serviceAreas } from '@/lib/services-data'
import { products } from '@/lib/products-data'

const SITE = 'https://procpa.co.kr'

/** Parse a date string defensively — empty/invalid values fall back to now. */
function safeDate(value?: string | null): Date {
  if (!value) return new Date()
  const d = new Date(value)
  return isNaN(+d) ? new Date() : d
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticUrls: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/services',
    '/ax',
    '/products',
    '/blog',
    '/browse',
    '/projects',
    '/downloads',
    '/contact',
    '/tags',
    '/terms',
    '/disclaimer',
  ].map((p) => ({ url: `${SITE}${p}`, lastModified: new Date() }))

  const visiblePosts = posts.filter((p) => !p.draft)
  const visibleSeries = series.filter((s) => !s.draft)
  const visibleChapters = chapters.filter((c) => !c.draft)

  const postUrls: MetadataRoute.Sitemap = visiblePosts.map((p) => ({
    url: `${SITE}/${p.slugAsParams}`,
    lastModified: safeDate(p.updated ?? p.date),
  }))

  const chapterUrls: MetadataRoute.Sitemap = visibleChapters.map((c) => ({
    url: `${SITE}/${c.slugAsParams}`,
    lastModified: safeDate(c.last_synced),
  }))

  // Series lastModified = latest of its chapters' last_synced (fallback s.date).
  const seriesUrls: MetadataRoute.Sitemap = visibleSeries.map((s) => {
    const childDates = visibleChapters
      .filter((c) => c.series === s.slugAsParams)
      .map((c) => c.last_synced)
      .filter((d): d is string => !!d)
      .sort()
    const latest = childDates.pop() ?? s.date
    return {
      url: `${SITE}/${s.slugAsParams}`,
      lastModified: safeDate(latest),
    }
  })

  // Individual tag pages (aggregated from posts + series tags).
  const tagSet = new Set<string>()
  for (const p of visiblePosts) for (const t of p.tags) tagSet.add(t)
  for (const s of visibleSeries) for (const t of s.tags) tagSet.add(t)
  const tagUrls: MetadataRoute.Sitemap = [...tagSet].map((t) => ({
    url: `${SITE}/tags/${encodeURIComponent(t)}`,
    lastModified: new Date(),
  }))

  const serviceUrls: MetadataRoute.Sitemap = serviceAreas.map((s) => ({
    url: `${SITE}/services/${s.slug}`,
    lastModified: new Date(),
  }))

  const productUrls: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE}/products/${p.slug}`,
    lastModified: new Date(),
  }))

  return [
    ...staticUrls,
    ...serviceUrls,
    ...productUrls,
    ...postUrls,
    ...seriesUrls,
    ...chapterUrls,
    ...tagUrls,
  ]
}
