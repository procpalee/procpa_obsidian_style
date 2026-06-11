import type { Metadata } from 'next'
import Link from 'next/link'
import { axPrograms, axAudience, axFormat } from '@/lib/ax-data'
import { testimonials } from '@/lib/testimonials-data'
import { PageHero } from '@/components/page-hero'
import { Section } from '@/components/home/section'
import { InquiryEmbed } from '@/components/inquiry-embed'

const ogTitle = encodeURIComponent('AX 컨설팅·교육')
const ogSubtitle = encodeURIComponent('회계 실무에 AI를 더하다')
const DESC = '회계·재무 실무에 AI를 접목하는 컨설팅과 강의·워크숍. 한국공인회계사회 AI 자문위원이 직접 진행합니다.'

export const metadata: Metadata = {
  title: 'AX 컨설팅·교육',
  description: DESC,
  alternates: { canonical: '/ax' },
  openGraph: {
    title: 'AX 컨설팅·교육',
    description: DESC,
    url: '/ax',
    images: [{ url: `/api/og?kicker=PROCPA&title=${ogTitle}&subtitle=${ogSubtitle}`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`/api/og?kicker=PROCPA&title=${ogTitle}&subtitle=${ogSubtitle}`],
  },
}

export default function AxPage() {
  return (
    <>
      <div className="mx-auto max-w-[1440px] px-6 py-14 sm:py-20">
        <PageHero
          en="AX Consulting & Education"
          ko="AI로 회계 실무를 바꾸다"
          description="회계·재무 업무에 AI를 접목하는 컨설팅과 강의·워크숍을 제공합니다. 한국공인회계사회 AI 자문위원으로서 실무에 바로 닿는 변화를 함께 만듭니다."
          action={
            <Link
              href="/services"
              className="inline-flex items-center rounded-full border border-border px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              회계 서비스 →
            </Link>
          }
        />
      </div>

      <Section id="programs" kicker="Programs" title="프로그램">
        <div className="grid gap-3 sm:grid-cols-2">
          {axPrograms.map((p) => (
            <div
              key={p.title}
              className="flex flex-col rounded-2xl border border-border/60 p-6 transition-all hover:border-foreground/40 hover:shadow-sm"
            >
              <h3 className="text-lg font-semibold tracking-tight [word-break:keep-all]">{p.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground [word-break:keep-all]">{p.summary}</p>
              <ul className="mt-4 space-y-2">
                {p.outcomes.map((o) => (
                  <li key={o} className="flex gap-2.5 text-base leading-relaxed text-muted-foreground [word-break:keep-all]">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {o}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-border/60 pt-4 font-mono text-[13px] text-muted-foreground">
                {p.forWhom}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="audience" kicker="Audience" title="이런 분께">
        <ul className="grid gap-3 sm:grid-cols-3">
          {axAudience.map((a) => (
            <li
              key={a}
              className="rounded-xl border border-border/60 p-5 text-base leading-relaxed text-muted-foreground [word-break:keep-all]"
            >
              {a}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="format" kicker="How" title="진행 방식">
        <ol className="divide-y divide-border/60">
          {axFormat.map((f, i) => (
            <li key={f.title} className="flex gap-5 py-5">
              <span className="font-mono text-sm text-muted-foreground/70">{String(i + 1).padStart(2, '0')}</span>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold tracking-tight [word-break:keep-all]">{f.title}</h3>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground [word-break:keep-all]">{f.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {testimonials.length > 0 && (
        <Section id="testimonials" kicker="Testimonials" title="이런 평가를 받았습니다">
          <div className="grid gap-3 sm:grid-cols-2">
            {testimonials.map((t) => (
              <figure key={t.quote} className="flex flex-col rounded-xl border border-border/60 p-6">
                <blockquote className="text-base leading-relaxed text-foreground [word-break:keep-all]">“{t.quote}”</blockquote>
                <figcaption className="mt-4 border-t border-border/60 pt-4 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{t.author}</span>
                  {t.role && <span> · {t.role}</span>}
                  {t.context && <p className="mt-1 font-mono text-[13px]">{t.context}</p>}
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
      )}

      <Section
        id="inquiry"
        kicker="Inquiry"
        title="컨설팅·강의 문의"
        description="아래 폼을 남겨주시면 검토 후 빠르게 회신드립니다. 이메일·카카오톡으로도 연락하실 수 있습니다."
      >
        <InquiryEmbed service="ax" />
      </Section>
    </>
  )
}
