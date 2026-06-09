import type { Metadata } from 'next'
import Link from 'next/link'
import { posts } from '#site/content'
import { PageHero } from '@/components/page-hero'
import { CategoryFilter, type FilterPost } from '@/components/category-filter'
import { ogImageUrl } from '@/lib/og'

const DESC = '회계·재무 실무와 AI 활용에 관한 단편 포스트.'
const OG = ogImageUrl({ kicker: 'PROCPA · BLOG', title: '블로그', subtitle: DESC })

export const metadata: Metadata = {
  title: '블로그',
  description: DESC,
  alternates: { canonical: '/blog' },
  openGraph: { title: '블로그', description: DESC, url: '/blog', images: [{ url: OG, width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: '블로그', description: DESC, images: [OG] },
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
        action={
          <Link
            href="/browse"
            className="inline-flex items-center rounded-full border border-border/60 px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
          >
            카테고리별로 보기 →
          </Link>
        }
      />

      <div className="mt-14 sm:mt-16">
        <CategoryFilter kind="post" items={items} />
      </div>
    </div>
  )
}
