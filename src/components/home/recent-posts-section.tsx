import Link from 'next/link'
import { posts } from '#site/content'
import { Eyebrow } from './section-ui'

/** 최근 글 — 카드 그리드 */
export function RecentPostsSection() {
  const recent = [...posts]
    .filter((p) => !p.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 6)

  if (recent.length === 0) return null

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <Eyebrow>Writing</Eyebrow>
            <h2 className="mt-3 text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold leading-[1.15] tracking-[-0.02em]">
              최근 글
            </h2>
          </div>
          <Link
            href="/blog"
            className="shrink-0 font-mono text-[12px] text-muted-foreground transition-colors hover:text-foreground"
          >
            전체 보기 →
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recent.map((p) => (
            <Link
              key={p.slug}
              href={`/${p.slugAsParams}`}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-accent"
            >
              <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                <span className="rounded-full bg-secondary px-2 py-0.5">
                  {p.category === '회계실무' ? '회계' : 'AI'}
                </span>
                <span>{p.date.slice(0, 10).replace(/-/g, '.')}</span>
              </div>
              <h3 className="mt-4 text-base font-semibold leading-snug tracking-tight group-hover:text-primary">
                {p.title}
              </h3>
              {p.description && (
                <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
