import { posts, series } from '#site/content'

export type RelatedDoc = {
  type: 'post' | 'series'
  title: string
  description?: string
  url: string
  date: string
}

/**
 * Auto-link content (posts + series) to a service/product by category, tag, or
 * slug substring. Generalizes the `resolveArticleHref` pattern used by the
 * projects grid. Runs at build time over `#site/content`, so newly authored
 * content attaches automatically on the next deploy.
 */
export function relatedContent(opts: {
  category?: string
  tags?: string[]
  match?: string[]
  limit?: number
}): RelatedDoc[] {
  const tagSet = new Set((opts.tags ?? []).map((t) => t.toLowerCase()))

  const hit = (slug: string, docTags: string[], cat?: string) =>
    (opts.match?.some((m) => slug.includes(m)) ?? false) ||
    (!!opts.category && cat === opts.category) ||
    docTags.some((t) => tagSet.has(t.toLowerCase()))

  const p: RelatedDoc[] = posts
    .filter((d) => !d.draft && hit(d.slugAsParams, d.tags, d.category))
    .map((d) => ({
      type: 'post' as const,
      title: d.title,
      description: d.description,
      url: `/${d.slugAsParams}`,
      date: d.date,
    }))

  const s: RelatedDoc[] = series
    .filter((d) => !d.draft && hit(d.slugAsParams, d.tags, d.category))
    .map((d) => ({
      type: 'series' as const,
      title: d.title,
      description: d.description,
      url: `/${d.slugAsParams}`,
      date: d.date ?? '',
    }))

  return [...s, ...p]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, opts.limit ?? 6)
}
