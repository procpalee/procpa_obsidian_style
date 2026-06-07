import type { Metadata } from 'next'
import Link from 'next/link'
import { posts, series, chapters } from '#site/content'
import { SeriesCard, PostCard } from '@/components/content-card'
import { TOPIC_KEYS, topicLabel, topicOrder } from '@/lib/topics'

export const metadata: Metadata = {
  title: '블로그',
  description: '회계·재무 실무와 AI 활용에 관한 글과 시리즈 가이드.',
}

const cleanLabel = (key: string) => topicLabel(key).replace(/^\d+\.\s*/, '')

export default function BlogPage() {
  const visibleSeries = series
    .filter((s) => !s.draft)
    .sort((a, b) => topicOrder(a.category) - topicOrder(b.category))

  const visiblePosts = posts.filter((p) => !p.draft)

  const byCategory = TOPIC_KEYS.map((key) => ({
    key,
    label: cleanLabel(key),
    items: visiblePosts
      .filter((p) => p.category === key)
      .sort((a, b) => +new Date(b.date) - +new Date(a.date)),
  })).filter((g) => g.items.length > 0)

  return (
    <div className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
            Writing
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">블로그</h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            회계·재무 실무와 AI 활용에 관한 기록과, 깊이 있게 정리한 시리즈 가이드입니다.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/explore"
            className="inline-flex items-center rounded-md border border-border/60 px-3.5 py-2 font-mono text-[11px] text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
          >
            탐색 →
          </Link>
          <Link
            href="/graph"
            className="inline-flex items-center rounded-md border border-border/60 px-3.5 py-2 font-mono text-[11px] text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
          >
            그래프 →
          </Link>
        </div>
      </header>

      {/* Series */}
      {visibleSeries.length > 0 && (
        <section className="mt-14">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Series
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
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
                  variant="default"
                />
              )
            })}
          </div>
        </section>
      )}

      {/* Posts by category */}
      {byCategory.map((g) => (
        <section key={g.key} className="mt-14">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            {g.label}
          </h2>
          <div className="mt-2 divide-y divide-border/60">
            {g.items.map((p) => (
              <PostCard
                key={p.slug}
                title={p.title}
                description={p.description}
                url={`/${p.slugAsParams}`}
                date={p.date}
                tags={p.tags}
                variant="list"
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
