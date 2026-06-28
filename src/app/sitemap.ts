import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

const SITE = 'https://procpa.co.kr'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/about', '/blog', '/contact', '/terms', '/disclaimer'].map((p) => ({
    url: `${SITE}${p}`,
    lastModified: new Date(),
  }))
  const postRoutes = getAllPosts().map((p) => ({
    url: `${SITE}/blog/${p.slug}`,
    lastModified: p.updated ? new Date(p.updated) : p.date ? new Date(p.date) : new Date(),
  }))
  return [...staticRoutes, ...postRoutes]
}
