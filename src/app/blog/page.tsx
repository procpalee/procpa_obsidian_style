import type { Metadata } from 'next'
import { posts } from '#site/content'
import { PageHero } from '@/components/page-hero'
import { CategoryFilter, type FilterPost } from '@/components/category-filter'

export const metadata: Metadata = {
  title: '블로그',
  description: '회계·재무 실무와 AI 활용에 관한 단편 포스트.',
}

export default function BlogPage() {
  const items: FilterPost[] = posts
    .filter((p) => !p.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .map((p) => ({
      title: p.title,
      description: p.description,
      url: `/${p.slugAsParams}`,
      date: p.date,
      tags: p.tags,
      category: p.category,
    }))

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-14 sm:py-20">
      <PageHero
        en="Blog"
        ko="블로그"
        description="회계·재무 실무 및 AI 활용에 대한 지식과 생각을 정리합니다."
      />

      <div className="mt-14 sm:mt-16">
        <CategoryFilter kind="post" items={items} />
      </div>
    </div>
  )
}
