import { series, chapters } from '#site/content'
import { Section, SectionLink } from '@/components/home/section'
import { SeriesCard } from '@/components/content-card'

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
      title="한 권으로 읽는 연재"
      description="여러 편으로 이어지는 전자책형 연재를 주제별로 묶어 한 권씩 읽어 나갈 수 있게 정리합니다."
      action={<SectionLink href="/series">시리즈 전체 보기 →</SectionLink>}
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
