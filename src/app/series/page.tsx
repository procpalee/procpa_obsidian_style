import type { Metadata } from 'next'
import Link from 'next/link'
import { series, chapters } from '#site/content'
import { SeriesCard } from '@/components/content-card'
import { PageHero } from '@/components/page-hero'
import { TOPIC_KEYS, topicLabel } from '@/lib/topics'

export const metadata: Metadata = {
  title: '시리즈',
  description: '여러 편으로 이어지는 전자책형 연재 — 주제별로 묶어 한 권씩 읽어 나갈 수 있게 정리했습니다.',
}

const cleanLabel = (key: string) => topicLabel(key).replace(/^\d+\.\s*/, '')

export default function SeriesPage() {
  const visibleSeries = series.filter((s) => !s.draft)

  const seriesByCategory = TOPIC_KEYS.map((key) => ({
    key,
    label: cleanLabel(key),
    items: visibleSeries
      .filter((s) => s.category === key)
      .sort(
        (a, b) =>
          (a.order ?? 0) - (b.order ?? 0) ||
          +new Date(b.date ?? 0) - +new Date(a.date ?? 0),
      ),
  })).filter((g) => g.items.length > 0)

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-14 sm:py-20">
      <PageHero
        en="Series"
        ko="시리즈"
        description="여러 편으로 이어지는 전자책형 연재. 주제별로 묶어 한 권씩 읽어 나갈 수 있게 정리했습니다."
        action={
          <Link
            href="/blog"
            className="inline-flex items-center rounded-full border border-border/60 px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
          >
            포스트 보러가기 →
          </Link>
        }
      />

      {seriesByCategory.map((g) => (
        <section key={g.key} className="mt-14 first:mt-16">
          <div className="mb-4 flex items-baseline gap-3">
            <Link
              href={`/${g.key}`}
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              {g.label}
            </Link>
            <span className="font-mono text-xs text-muted-foreground/60">{g.items.length}</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {g.items.map((s) => {
              const cc = chapters.filter((c) => !c.draft && c.series === s.slugAsParams)
              const lastSynced = cc.map((c) => c.last_synced).filter(Boolean).sort().pop()
              return (
                <SeriesCard
                  key={s.slug}
                  title={s.title}
                  description={s.description}
                  url={`/${s.slugAsParams}`}
                  cover={s.cover}
                  chapterCount={cc.length || undefined}
                  lastUpdated={lastSynced ?? undefined}
                  variant="default"
                />
              )
            })}
          </div>
        </section>
      ))}

      {seriesByCategory.length === 0 && (
        <p className="mt-16 font-mono text-sm text-muted-foreground">아직 공개된 시리즈가 없습니다.</p>
      )}
    </div>
  )
}
