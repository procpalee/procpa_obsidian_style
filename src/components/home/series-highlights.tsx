import { series, chapters } from '#site/content'
import { Section, SectionLink } from '@/components/home/section'
import { SeriesCard } from '@/components/content-card'
import { topicLabel } from '@/lib/topics'

const cleanLabel = (key: string) => topicLabel(key).replace(/^\d+\.\s*/, '')

export function SeriesHighlights() {
  const recentSeries = series
    .filter((s) => !s.draft)
    .sort(
      (a, b) =>
        (a.order ?? 0) - (b.order ?? 0) ||
        +new Date(b.date ?? 0) - +new Date(a.date ?? 0),
    )
    .slice(0, 4)

  if (recentSeries.length === 0) return null

  return (
    <Section
      id="series"
      kicker="Series"
      title="한 권으로 읽는 시리즈"
      description="회계실무 및 AI 활용 가이드"
      action={<SectionLink href="/blog">시리즈 전체 보기 →</SectionLink>}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {recentSeries.map((s) => {
          const cc = chapters.filter((c) => !c.draft && c.series === s.slugAsParams)
          const lastSynced = cc.map((c) => c.last_synced).filter(Boolean).sort().pop()
          return (
            <SeriesCard
              key={s.slug}
              title={s.title}
              description={s.description}
              url={`/${s.slugAsParams}`}
              cover={s.cover}
              category={cleanLabel(s.category)}
              chapterCount={cc.length || undefined}
              lastUpdated={lastSynced ?? undefined}
              variant="default"
            />
          )
        })}
      </div>
    </Section>
  )
}
