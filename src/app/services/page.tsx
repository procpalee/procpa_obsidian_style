import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { serviceAreas } from '@/lib/services-data'
import { PageHero } from '@/components/page-hero'
import { Section } from '@/components/home/section'

const ogTitle = encodeURIComponent('전문 회계 서비스')
const ogSubtitle = encodeURIComponent('외부감사·내부회계·세무·평가·연결PA')
const DESC = '외부감사·내부회계·세무·가치평가·연결PA — 실무 경험 기반의 회계 서비스를 수임합니다.'

export const metadata: Metadata = {
  title: '서비스',
  description: DESC,
  alternates: { canonical: '/services' },
  openGraph: {
    title: '서비스',
    description: DESC,
    url: '/services',
    images: [{ url: `/api/og?kicker=PROCPA&title=${ogTitle}&subtitle=${ogSubtitle}`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`/api/og?kicker=PROCPA&title=${ogTitle}&subtitle=${ogSubtitle}`],
  },
}

export default function ServicesPage() {
  return (
    <>
      <div className="mx-auto max-w-[1440px] px-6 py-14 sm:py-20">
        <PageHero
          en="Services"
          ko="전문 회계 서비스"
          description="외부감사부터 내부회계·세무·가치평가·연결PA까지, 실무 In-charge 경험을 바탕으로 수임합니다."
          action={
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border border-border px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              문의하기 →
            </Link>
          }
        />
      </div>

      <Section id="areas" kicker="Practice Areas" title="실무 영역">
        <div className="grid gap-3 sm:grid-cols-2">
          {serviceAreas.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group flex flex-col rounded-2xl border border-border/60 p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{s.en}</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight group-hover:text-primary [word-break:keep-all]">
                    {s.title}
                  </h3>
                </div>
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
              </div>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground [word-break:keep-all]">
                {s.tagline}
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <Section id="ax" kicker="AX">
        <div className="flex flex-col items-start gap-4 rounded-2xl border border-border/60 bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base leading-relaxed text-muted-foreground [word-break:keep-all]">
            회계 업무에 AI를 접목하는 <span className="text-foreground">컨설팅·강의</span>를 찾으신다면,
            AX 페이지에서 자세히 안내합니다.
          </p>
          <Link
            href="/ax"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            AX 컨설팅·교육 보기
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>
    </>
  )
}
