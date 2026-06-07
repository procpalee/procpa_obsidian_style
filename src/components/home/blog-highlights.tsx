import { posts, series, chapters } from '#site/content'
import { Section, SectionLink } from '@/components/home/section'
import { NoteCarousel } from '@/components/note-carousel'
import { SeriesCard, PostCard } from '@/components/content-card'
import { topicLabel } from '@/lib/topics'

export function BlogHighlights() {
  const visibleSeries = series.filter((s) => !s.draft)
  const recentPosts = posts
    .filter((p) => !p.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 8)

  return (
    <Section
      id="blog"
      kicker="Writing"
      title="기록과 가이드"
      description="실무에 바로 쓰는 회계·AI 인사이트와, 깊이 있게 정리한 시리즈 가이드를 발행합니다."
      action={<SectionLink href="/blog">블로그 전체 보기 →</SectionLink>}
    >
      {visibleSeries.length > 0 && (
        <div>
          <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Featured Series
          </h3>
          <NoteCarousel>
            {visibleSeries.map((s) => {
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
                  variant="featured"
                />
              )
            })}
          </NoteCarousel>
        </div>
      )}

      {recentPosts.length > 0 && (
        <div className="mt-10">
          <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Recent Posts
          </h3>
          <NoteCarousel>
            {recentPosts.map((p) => (
              <PostCard
                key={p.slug}
                title={p.title}
                description={p.description}
                url={`/${p.slugAsParams}`}
                date={p.date}
                category={topicLabel(p.category).replace(/^\d+\.\s*/, '')}
                variant="card"
              />
            ))}
          </NoteCarousel>
        </div>
      )}
    </Section>
  )
}
