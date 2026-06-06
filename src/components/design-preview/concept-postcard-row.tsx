import type { CSSProperties } from 'react'
import { posts } from '#site/content'
import type { DesignConcept } from '@/lib/design-concepts'
import { PostCard } from '@/components/content-card'

/** 컨셉별 최근 글 3개. 실제 PostCard 컴포넌트를 컨셉 토큰 아래에서 렌더한다. */
export function ConceptPostcardRow({ concept }: { concept: DesignConcept }) {
  const headingStyle = { fontFamily: concept.fontHeading } as CSSProperties
  const recent = [...posts]
    .filter((p) => !p.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 3)

  return (
    <section className="border-t border-border px-6 py-16 sm:px-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        Recent Writing
      </p>
      <h2 style={headingStyle} className="mt-2 text-2xl font-semibold tracking-tight">
        블로그
      </h2>

      <div className="mt-8 flex flex-wrap gap-4">
        {recent.map((p) => (
          <PostCard
            key={p.slug}
            title={p.title}
            description={p.description}
            url={`/${p.slugAsParams}`}
            date={p.date}
            category={p.category === '회계실무' ? '회계' : 'AI'}
            variant="card"
          />
        ))}
      </div>
    </section>
  )
}
