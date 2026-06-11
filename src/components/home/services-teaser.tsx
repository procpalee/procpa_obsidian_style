import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Section, SectionLink } from '@/components/home/section'
import { serviceAreas } from '@/lib/services-data'

/** 홈 서비스/제품 티저 — 실무 영역 그리드 + 제품 콜아웃. */
export function ServicesTeaser() {
  return (
    <Section
      id="services"
      kicker="Services"
      title="함께 일하는 방법"
      description="외부감사·내부회계·세무·가치평가·연결PA 등 실무 경험 기반의 회계 서비스를 수임합니다."
      action={<SectionLink href="/services">서비스 전체 보기 →</SectionLink>}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {serviceAreas.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="group flex flex-col rounded-2xl border border-border/60 p-5 transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-sm"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{s.en}</p>
            <h3 className="mt-2 text-lg font-semibold tracking-tight group-hover:text-primary [word-break:keep-all]">
              {s.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground [word-break:keep-all]">
              {s.tagline}
            </p>
          </Link>
        ))}
        <Link
          href="/ax"
          className="group flex flex-col justify-between rounded-2xl border border-border/60 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-sm"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">AX</p>
            <h3 className="mt-2 text-lg font-semibold tracking-tight group-hover:text-primary [word-break:keep-all]">
              AI 컨설팅·교육
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground [word-break:keep-all]">
              회계 업무에 AI를 접목하는 컨설팅·강의.
            </p>
          </div>
          <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground group-hover:text-foreground">
            자세히 보기 <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </Link>
      </div>
    </Section>
  )
}
