import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/home/section'
import { PostCard } from '@/components/blog/post-card'
import { getAllPosts } from '@/lib/blog'
import { content } from '@/lib/site-content'

const t = content.home.blog

/** 최근 글 — 블로그 최신 3편. 글이 없으면 빈 안내 + 블로그 CTA. */
export function BlogTeaser() {
  const posts = getAllPosts().slice(0, 3)

  return (
    <Section
      kicker={t.kicker}
      title={t.title}
      description={t.description}
      action={
        posts.length > 0 ? (
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-foreground/40"
          >
            {t.action} <ArrowRight className="h-4 w-4" />
          </Link>
        ) : undefined
      }
    >
      {posts.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-start gap-4 rounded-2xl border border-dashed border-border/60 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base text-muted-foreground">{t.empty}</p>
          <Link
            href="/blog"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-foreground/40"
          >
            {t.emptyCta} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </Section>
  )
}
