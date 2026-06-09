import { posts, series, chapters } from '#site/content'
import { topicLabel, type TopicKey } from '@/lib/topics'
import type { CategoryDoc } from '@/components/doc-list'

export type SubcategoryInfo = {
  name: string
  postCount: number
  seriesCount: number
}

export type CategoryData = {
  category: TopicKey
  label: string
  subcategories: SubcategoryInfo[]
  docs: CategoryDoc[]
}

/** Strip the leading "NN. " ordering prefix from a topic label. */
export const cleanLabel = (label: string) => label.replace(/^\d+\.\s*/, '')

/** "시리즈 N · 포스트 N · 서브카테고리 N" summary for a category. */
export function categoryStats(data: CategoryData): string {
  const seriesCount = data.docs.filter((d) => d.type === 'series').length
  const postCount = data.docs.filter((d) => d.type === 'post').length
  return [
    seriesCount > 0 && `시리즈 ${seriesCount}`,
    postCount > 0 && `포스트 ${postCount}`,
    data.subcategories.length > 0 && `서브카테고리 ${data.subcategories.length}`,
  ].filter(Boolean).join(' · ')
}

/**
 * Assemble the listing data for one category (series + posts + subcategory
 * counts). Shared by the category route (`[...slug]`) and the design-preview
 * route so both render from identical data.
 */
export function buildCategoryData(cat: TopicKey): CategoryData {
  const catPosts = posts.filter((p) => !p.draft && p.category === cat)
  const catSeries = series.filter((s) => !s.draft && s.category === cat)

  const subNames = [...new Set([
    ...catPosts.map((p) => p.subcategory),
    ...catSeries.map((s) => s.subcategory),
  ])].filter(Boolean).sort() as string[]

  const subcategories: SubcategoryInfo[] = subNames.map((name) => ({
    name,
    postCount: catPosts.filter((p) => p.subcategory === name).length,
    seriesCount: catSeries.filter((s) => s.subcategory === name).length,
  }))

  const docs: CategoryDoc[] = [
    ...catSeries.map((s) => {
      const cc = chapters.filter((c) => !c.draft && c.series === s.slugAsParams)
      const lastSynced = cc.map((c) => c.last_synced).filter(Boolean).sort().pop()
      return {
        type: 'series' as const,
        title: s.title,
        description: s.description,
        url: `/${s.slugAsParams}`,
        date: s.date ?? '',
        tags: s.tags,
        cover: s.cover,
        subcategory: s.subcategory ?? undefined,
        chapterCount: cc.length,
        lastUpdated: lastSynced ?? undefined,
      }
    }),
    ...catPosts.map((p) => ({
      type: 'post' as const,
      title: p.title,
      description: p.description,
      url: `/${p.slugAsParams}`,
      date: p.date,
      tags: p.tags,
      subcategory: p.subcategory ?? undefined,
      readingTime: p.metadata.readingTime,
    })),
  ]

  return { category: cat, label: topicLabel(cat), subcategories, docs }
}
