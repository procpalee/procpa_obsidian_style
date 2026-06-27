import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Section } from '@/components/home/section'
import { services } from '@/lib/services-data'
import { content } from '@/lib/site-content'

const t = content.home.services

/** 하는 일 — 서비스 4종 컴팩트 티저(상세는 /contact). 홈에서 "무엇을 하는지" 한눈에. */
export function ServicesTeaser() {
  return (
    <Section kicker={t.kicker} title={t.title} description={t.description}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <Link
            key={s.key}
            href={`/contact?type=${s.key}#inquiry`}
            className="group flex flex-col rounded-2xl border border-border/60 p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-sm"
          >
            <h3 className="flex items-start justify-between gap-2 text-lg font-semibold tracking-tight">
              {s.title}
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.summary}</p>
            <span className="mt-4 font-mono text-xs text-primary">{s.cta} →</span>
          </Link>
        ))}
      </div>
    </Section>
  )
}
