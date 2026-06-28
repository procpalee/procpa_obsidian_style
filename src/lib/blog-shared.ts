// 클라이언트/서버 공용 — node 모듈 import 없음(클라이언트 번들에 안전).
export type CategoryKey = 'ai' | 'project'

export const CATEGORIES: { key: CategoryKey; label: string }[] = [
  { key: 'ai', label: 'AI 인사이트' },
  { key: 'project', label: '개발 프로젝트' },
]

export const CATEGORY_LABEL: Record<CategoryKey, string> = {
  ai: 'AI 인사이트',
  project: '개발 프로젝트',
}

export type PostMeta = {
  slug: string
  title: string
  description: string
  date: string
  updated?: string
  category: CategoryKey
  categoryLabel: string
  tags: string[]
  cover?: string
  readingTime: number
}

export function formatDate(d: string): string {
  if (!d) return ''
  const [y, m, day] = d.split('-')
  if (!y || !m || !day) return d
  return `${y}. ${m}. ${day}`
}
