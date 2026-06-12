import type { Metadata } from 'next'
import Link from 'next/link'
import { posts, series, chapters } from '#site/content'
import { PageHero } from '@/components/page-hero'
import { BlogFeed, type FeedPost } from '@/components/blog-feed'
import { SeriesCard } from '@/components/content-card'
import { topicLabel } from '@/lib/topics'

const DESC = '회계·재무 실무와 AI 활용에 관한 시리즈와 단편 포스트를 한곳에서.'

export const metadata: Metadata = {
  title: '블로그',
  description: DESC,
  alternates: { canonical: '/blog' },
  openGraph: { title: '블로그', description: DESC, url: '/blog', images: ['/og-default.png'] },
  twitter: { card: 'summary_large_image', title: '블로그', description: DESC, images: ['/og-default.png'] },
}

const cleanLabel = (key: string) => topicLabel(key).replace(/^\d+\.\s*/, '')

export default function BlogPage() {
  const seriesItems = series
    .filter((s) => !s.draft)
    .sort(
      (a, b) =>
        (a.order ?? 0) - (b.order ?? 0) || +new Date(b.date ?? 0) - +new Date(a.date ?? 0),
    )
    .map((s) => {
      const cc = chapters.filter((c) => !c.draft && c.series === s.slugAsParams)
      const lastSynced = cc.map((c) => c.last_synced).filter(Boolean).sort().pop()
      return {
        title: s.title,
        description: s.description,
        url: `/${s.slugAsParams}`,
        cover: s.cover,
        category: cleanLabel(s.category),
        chapterCount: cc.length || undefined,
        lastUpdated: lastSynced ?? undefined,
      }
    })

  const postItems: FeedPost[] = posts
    .filter((p) => !p.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .map((p) => ({
      title: p.title,
      description: p.description,
      url: `/${p.slugAsParams}`,
      date: p.date,
      tags: p.tags,
      category: p.category,
      readingTime: p.metadata.readingTime,
    }))

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-14 sm:py-20">
      <PageHero
        en="Blog"
        ko="블로그"
        description="한 권으로 읽는 시리즈와 단편 포스트를 한곳에서 모아 봅니다."
        action={
          <Link
            href="/browse"
            className="inline-flex items-center rounded-full border border-border/60 px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
          >
            주제별로 보기 →
          </Link>
        }
      />

      <div className="mt-14 space-y-20 sm:mt-16">
        {seriesItems.length > 0 && (
          <section>
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Series
            </div>
            <div className="mt-2 flex items-baseline gap-3">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">시리즈</h2>
              <span className="font-mono text-xs text-muted-foreground/60">{seriesItems.length}</span>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {seriesItems.map((s) => (
                <SeriesCard
                  key={s.url}
                  title={s.title}
                  description={s.description}
                  url={s.url}
                  cover={s.cover}
                  category={s.category}
                  chapterCount={s.chapterCount}
                  lastUpdated={s.lastUpdated}
                  variant="default"
                />
              ))}
            </div>
          </section>
        )}

        <section>
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Posts
          </div>
          <div className="mt-2 flex items-baseline gap-3">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">포스트</h2>
            <span className="font-mono text-xs text-muted-foreground/60">{postItems.length}</span>
          </div>
          <div className="mt-8">
            {postItems.length > 0 ? (
              <BlogFeed items={postItems} />
            ) : (
              <p className="font-mono text-sm text-muted-foreground">아직 공개된 포스트가 없습니다.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
