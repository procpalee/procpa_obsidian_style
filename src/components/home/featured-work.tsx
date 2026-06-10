import { Section } from '@/components/home/section'
import { publications } from '@/lib/about-data'

/** 대표 작업 쇼케이스 — 출간 가이드를 큰 비주얼 카드로(impact device #2). */
export function FeaturedWork() {
  return (
    <Section
      kicker="Featured Work"
      title="대표 작업"
      description="직접 집필한 가이드로 회계·AI 실무 노하우를 정리해 공개합니다."
    >
      <div className="grid gap-3 md:grid-cols-2">
        {publications.map((p, i) => (
          <a
            key={p.title}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className="group flex min-h-[240px] flex-col justify-between rounded-2xl border border-border/60 p-7 transition-all hover:border-foreground/40 hover:shadow-sm sm:p-8"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Book {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary [word-break:keep-all] sm:text-3xl">
                {p.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground [word-break:keep-all]">
                {p.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-sm text-primary">
                WikiDocs에서 보기 →
              </span>
            </div>
          </a>
        ))}
      </div>
    </Section>
  )
}
