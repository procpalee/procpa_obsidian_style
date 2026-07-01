import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Section } from '@/components/home/section'
import { services } from '@/lib/services-data'
import { content } from '@/lib/site-content'

const t = content.home.services

/** 의뢰 가능한 업무 — 풀와이드 번호 행. 행 전체가 해당 유형이 선택된 문의 폼으로 가는 링크. */
export function ServicesIndex() {
  return (
    <Section
      id="services"
      size="display"
      kicker={t.kicker}
      title={t.title}
      description={t.description}
    >
      <div className="border-t border-border/60">
        {services.map((s, i) => (
          <Link
            key={s.key}
            href={`/contact?type=${s.key}#inquiry`}
            className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-5 border-b border-border/60 py-8 transition-colors hover:bg-accent/40 sm:gap-x-8 sm:py-10 lg:grid-cols-[72px_minmax(0,1.1fr)_minmax(0,1fr)_auto]"
          >
            <span className="pt-1.5 font-mono text-sm text-muted-foreground transition-colors group-hover:text-primary sm:pt-2.5">
              0{i + 1}
            </span>
            <div className="min-w-0">
              <h3 className="text-[clamp(1.5rem,3.2vw,2.5rem)] font-bold leading-tight tracking-[-0.03em] [word-break:keep-all] transition-transform group-hover:translate-x-1">
                {s.title}
              </h3>
              <div className="mt-3 lg:hidden">
                <p className="text-base leading-relaxed text-muted-foreground [word-break:keep-all]">
                  {s.summary}
                </p>
                <p className="mt-2 font-mono text-xs text-muted-foreground">
                  <span className="text-primary">{t.forWhomPrefix}</span> — {s.forWhom}
                </p>
              </div>
            </div>
            <div className="hidden min-w-0 pt-2 lg:block">
              <p className="text-base leading-relaxed text-muted-foreground [word-break:keep-all]">
                {s.summary}
              </p>
              <p className="mt-3 font-mono text-xs text-muted-foreground">
                <span className="text-primary">{t.forWhomPrefix}</span> — {s.forWhom}
              </p>
            </div>
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground sm:mt-1.5 sm:h-11 sm:w-11">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  )
}
