import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { designConcepts, getConcept } from '@/lib/design-concepts'
import { ConceptShell } from '@/components/design-preview/concept-shell'
import { ConceptHero } from '@/components/design-preview/concept-hero'
import { ConceptServices } from '@/components/design-preview/concept-services'
import { ConceptPostcardRow } from '@/components/design-preview/concept-postcard-row'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export function generateStaticParams() {
  return designConcepts.map((c) => ({ concept: c.key }))
}

export default async function ConceptPreviewPage({
  params,
}: {
  params: Promise<{ concept: string }>
}) {
  const { concept: key } = await params
  const concept = getConcept(key)
  if (!concept) notFound()

  return (
    <div>
      {/* 미리보기 컨트롤 바 (사이트 토큰 사용, 컨셉 밖) */}
      <div className="border-b border-border/60 bg-background px-6 py-3">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-baseline gap-3">
            <Link href="/design" className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground">
              ← 비교로
            </Link>
            <span className="text-sm font-semibold">{concept.name}</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {concept.tagline}
            </span>
          </div>
          <nav className="flex flex-wrap gap-1.5">
            {designConcepts.map((c) => (
              <Link
                key={c.key}
                href={`/design/${c.key}`}
                className={`rounded px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                  c.key === concept.key
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {c.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* 전체화면 컨셉 미리보기 */}
      <ConceptShell concept={concept} className="min-h-[calc(100vh-3.5rem)]">
        <div className="mx-auto max-w-5xl">
          <ConceptHero concept={concept} />
          <ConceptServices concept={concept} />
          <ConceptPostcardRow concept={concept} />
        </div>
      </ConceptShell>
    </div>
  )
}
