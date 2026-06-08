import type { Metadata } from 'next'
import Link from 'next/link'
import { posts, series, chapters } from '#site/content'
import { SeriesCard, PostCard } from '@/components/content-card'
import { PageHero } from '@/components/page-hero'
import { TOPIC_KEYS, topicLabel } from '@/lib/topics'

export const metadata: Metadata = {
  title: '블로그',
  description: '회계·재무 실무와 AI 활용에 관한 시리즈와 포스트.',
}

const cleanLabel = (key: string) => topicLabel(key).replace(/^\d+\.\s*/, '')

export default function BlogPage() {
  const visibleSeries = series.filter((s) => !s.draft)
  const visiblePosts = posts.filter((p) => !p.draft)

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

  const postsByCategory = TOPIC_KEYS.map((key) => ({
    key,
    label: cleanLabel(key),
    items: visiblePosts
      .filter((p) => p.category === key)
      .sort((a, b) => +new Date(b.date) - +new Date(a.date)),
  })).filter((g) => g.items.length > 0)

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-14 sm:py-20">
      <PageHero
        en="Blog"
        ko="블로그"
        description="회계·재무 실무 및 AI 활용에 대한 지식과 생각을 정리합니다."
        action={
          <div className="flex gap-2">
            <Link
              href="/explore"
              className="inline-flex items-center rounded-full border border-border/60 px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              탐색 →
            </Link>
            <Link
              href="/graph"
              className="inline-flex items-center rounded-full border border-border/60 px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              그래프 →
            </Link>
          </div>
        }
      />

      {/* ── Series ── */}
      {visibleSeries.length > 0 && (
        <section className="mt-16">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Series
          </div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">시리즈</h2>

          {seriesByCategory.map((g) => (
            <div key={g.key} className="mt-10 first:mt-8">
              <div className="mb-3 flex items-baseline gap-3">
                <Link
                  href={`/${g.key}`}
                  className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
                >
                  {g.label}
                </Link>
                <span className="font-mono text-[11px] text-muted-foreground/60">{g.items.length}</span>
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
            </div>
          ))}
        </section>
      )}

      {/* ── Posts ── */}
      {visiblePosts.length > 0 && (
        <section className="mt-16">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Posts
          </div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">포스트</h2>

          {postsByCategory.map((g) => (
            <div key={g.key} className="mt-10 first:mt-8">
              <div className="mb-1 flex items-baseline gap-3">
                <Link
                  href={`/${g.key}`}
                  className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
                >
                  {g.label}
                </Link>
                <span className="font-mono text-[11px] text-muted-foreground/60">{g.items.length}</span>
              </div>
              <div className="divide-y divide-border/60">
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
            </div>
          ))}
        </section>
      )}
    </div>
  )
}
