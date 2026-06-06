import Link from 'next/link'
import type { Metadata } from 'next'
import { designConcepts } from '@/lib/design-concepts'
import { ConceptShell } from '@/components/design-preview/concept-shell'
import { ConceptHero } from '@/components/design-preview/concept-hero'
import { ConceptServices } from '@/components/design-preview/concept-services'
import { ConceptPostcardRow } from '@/components/design-preview/concept-postcard-row'

export const metadata: Metadata = {
  title: '디자인 컨셉 비교',
  robots: { index: false, follow: false },
}

export default function DesignComparePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <header className="mb-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Design Concepts
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          디자인 컨셉 4종 비교
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          각 컨셉은 자체 색·폰트·레이아웃으로 격리되어 현재 테마와 무관하게 비교됩니다.
          하나를 고르시면 해당 토큰을 사이트 전역에 적용하고 나머지는 정리합니다.
          개별 컨셉을 전체화면으로 보려면 제목의 링크를 누르세요.
        </p>
        <nav className="mt-5 flex flex-wrap gap-2">
          {designConcepts.map((c) => (
            <Link
              key={c.key}
              href={`/design/${c.key}`}
              className="rounded-md border border-border/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              {c.name}
            </Link>
          ))}
        </nav>
      </header>

      <div className="space-y-16">
        {designConcepts.map((c) => (
          <section key={c.key}>
            <div className="mb-4">
              <div className="flex flex-wrap items-baseline gap-3">
                <Link
                  href={`/design/${c.key}`}
                  className="text-lg font-semibold tracking-tight underline-offset-4 hover:underline"
                >
                  {c.name}
                </Link>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {c.tagline}
                </span>
              </div>
              <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-muted-foreground">
                {c.philosophy}
              </p>
              <p className="mt-1 max-w-2xl text-[12px] leading-relaxed text-muted-foreground/80">
                <span className="font-medium text-muted-foreground">왜 AI-slop이 아닌가 ·</span>{' '}
                {c.antiSlop}
              </p>
            </div>
            <div className="overflow-hidden rounded-xl border border-border/60 shadow-sm">
              <ConceptShell concept={c}>
                <ConceptHero concept={c} />
                <ConceptServices concept={c} />
                <ConceptPostcardRow concept={c} />
              </ConceptShell>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
