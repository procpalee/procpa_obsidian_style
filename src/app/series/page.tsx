import type { Metadata } from 'next'
import Link from 'next/link'
import { series, chapters } from '#site/content'
import { PageHero } from '@/components/page-hero'
import { CategoryFilter, type FilterSeries } from '@/components/category-filter'

const DESC = '여러 편으로 이어지는 전자책형 연재 — 주제별로 묶어 한 권씩 읽어 나갈 수 있게 정리했습니다.'

export const metadata: Metadata = {
  title: '시리즈',
  description: DESC,
  alternates: { canonical: '/series' },
  openGraph: { title: '시리즈', description: DESC, url: '/series', images: ['/og-default.png'] },
  twitter: { card: 'summary_large_image', title: '시리즈', description: DESC, images: ['/og-default.png'] },
}

export default function SeriesPage() {
  const items: FilterSeries[] = series
    .filter((s) => !s.draft)
    .sort(
      (a, b) =>
        (a.order ?? 0) - (b.order ?? 0) ||
        +new Date(b.date ?? 0) - +new Date(a.date ?? 0),
    )
    .map((s) => {
      const cc = chapters.filter((c) => !c.draft && c.series === s.slugAsParams)
      const lastSynced = cc.map((c) => c.last_synced).filter(Boolean).sort().pop()
      return {
        title: s.title,
        description: s.description,
        url: `/${s.slugAsParams}`,
        cover: s.cover,
        chapterCount: cc.length || undefined,
        lastUpdated: lastSynced ?? undefined,
        category: s.category,
      }
    })

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-14 sm:py-20">
      <PageHero
        en="Series"
        ko="시리즈"
        description="여러 편으로 이어지는 전자책형 연재. 주제별로 묶어 한 권씩 읽어 나갈 수 있게 정리했습니다."
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
        {items.length > 0 ? (
          <CategoryFilter kind="series" items={items} />
        ) : (
          <p className="font-mono text-sm text-muted-foreground">아직 공개된 시리즈가 없습니다.</p>
        )}
      </div>
    </div>
  )
}
