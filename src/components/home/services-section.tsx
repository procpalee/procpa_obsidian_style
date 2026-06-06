import Link from 'next/link'
import { Eyebrow } from './section-ui'
import { services } from '@/lib/services-data'

/** 서비스 — 번호 매긴 스택 카드 (CMDS file-stack 패턴 차용) */
export function ServicesSection() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <Eyebrow>Services</Eyebrow>
        <h2 className="mt-3 max-w-2xl text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold leading-[1.15] tracking-[-0.02em]">
          이런 업무를 함께합니다
        </h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          회계의 정밀함과 AI의 속도를 한 번에. 업무 제안은 언제든 환영합니다.
        </p>

        <div className="mt-10 overflow-hidden rounded-2xl border border-border">
          {services.map((s, i) => (
            <Link
              key={s.key}
              href="/services"
              className="group flex flex-col gap-4 border-b border-border bg-card p-6 transition-colors last:border-b-0 hover:bg-accent sm:flex-row sm:items-start sm:gap-8 sm:p-8"
            >
              <div className="font-mono text-2xl font-bold tabular-nums text-primary sm:w-16">
                0{i + 1}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                  {s.summary}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {s.outcomes.map((o) => (
                    <li
                      key={o}
                      className="rounded-full bg-secondary px-3 py-1 text-[12px] text-muted-foreground"
                    >
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="shrink-0 font-mono text-[12px] text-muted-foreground sm:text-right">
                <div className="opacity-70">→ {s.forWhom}</div>
                <div className="mt-2 text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  {s.cta} ↗
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
