import type { CSSProperties } from 'react'
import type { DesignConcept } from '@/lib/design-concepts'
import { services } from '@/lib/services-data'

/** 컨셉별 서비스 티저 (4 카드). 실제 services-data를 사용한다. */
export function ConceptServices({ concept }: { concept: DesignConcept }) {
  const headingStyle = { fontFamily: concept.fontHeading } as CSSProperties

  return (
    <section className="border-t border-border px-6 py-16 sm:px-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Services
          </p>
          <h2 style={headingStyle} className="mt-2 text-2xl font-semibold tracking-tight">
            이런 업무를 함께합니다
          </h2>
        </div>
        <span className="hidden font-mono text-[11px] text-muted-foreground sm:inline">
          전체 보기 →
        </span>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {services.map((s, i) => (
          <div
            key={s.key}
            className="group rounded-[var(--radius)] border border-border bg-card p-6 transition-shadow hover:shadow-md"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[11px] text-primary">
                0{i + 1}
              </span>
              <h3 className="text-base font-semibold">{s.title}</h3>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
              {s.summary}
            </p>
            <ul className="mt-4 space-y-1.5">
              {s.outcomes.map((o) => (
                <li
                  key={o}
                  className="flex items-baseline gap-2 text-[13px] text-card-foreground"
                >
                  <span className="text-primary">·</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 inline-flex items-center font-mono text-[11px] uppercase tracking-wider text-primary">
              {s.cta} →
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
