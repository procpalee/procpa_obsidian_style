import type { Metadata } from 'next'
import {
  advisory,
  career,
  certificates,
  education,
  expertise,
  stats,
  contacts,
} from '@/lib/about-data'
import { JsonLd, personJsonLd } from '@/components/json-ld'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: '소개',
  description: '한국공인회계사 이재현 — 회계·재무 전문성과 AI의 생산성을 모두 갖춘 새로운 시대의 전문가.',
  alternates: { canonical: '/about' },
  openGraph: {
    images: [{
      url: '/api/og?kicker=PROCPA&title=%EC%86%8C%EA%B0%9C&subtitle=%ED%95%9C%EA%B5%AD%EA%B3%B5%EC%9D%B8%ED%9A%8C%EA%B3%84%EC%82%AC%20%EC%9D%B4%EC%9E%AC%ED%98%84',
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/api/og?kicker=PROCPA&title=%EC%86%8C%EA%B0%9C&subtitle=%ED%95%9C%EA%B5%AD%EA%B3%B5%EC%9D%B8%ED%9A%8C%EA%B3%84%EC%82%AC%20%EC%9D%B4%EC%9E%AC%ED%98%84'],
  },
}

function Section({
  label,
  title,
  children,
}: {
  label: string
  title?: string
  children: React.ReactNode
}) {
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-6 px-6 py-20">
        <div className="col-span-12 lg:col-span-3">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {label}
          </div>
          {title && (
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
          )}
        </div>
        <div className="col-span-12 lg:col-span-9">{children}</div>
      </div>
    </section>
  )
}

function Timeline({ items }: { items: { period: string; title: string }[] }) {
  return (
    <ul className="divide-y divide-border/60">
      {items.map((item) => (
        <li key={item.period + item.title} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-8">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground sm:w-32">
            {item.period}
          </span>
          <span className="text-base">{item.title}</span>
        </li>
      ))}
    </ul>
  )
}

const SAME_AS = contacts
  .filter((c) => c.href.startsWith('http'))
  .map((c) => c.href)

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personJsonLd({ sameAs: SAME_AS })} />
      {/* Hero */}
      <section>
        <div className="mx-auto max-w-[1440px] px-6 py-14 sm:py-20">
          <PageHero
            en="About"
            ko={
              <>
                한국공인회계사 <span className="text-primary">이재현</span>입니다.
              </>
            }
            description={
              <>
                <span className="text-foreground">회계·재무 전문성</span>과{' '}
                <span className="text-foreground">AI의 생산성</span>을 모두 갖춘 새로운 시대의
                전문가를 지향합니다.
              </>
            }
          />

          {/* 자문위원 배너 */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {advisory.map((a) => (
              <span
                key={a.org + a.role}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/[0.06] px-3 py-1.5 text-[13px]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="font-medium">{a.org}</span>
                <span className="text-muted-foreground">{a.role}</span>
              </span>
            ))}
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-8 border-t border-border/60 pt-10 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </dt>
                <dd className="mt-2 font-mono text-3xl tracking-tight">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-border/60">
        <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-y-12 lg:gap-6 px-6 py-20">
          <div className="col-span-12 lg:col-span-6">
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Career
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">경력</h2>
            <div className="mt-8">
              <Timeline items={career} />
            </div>
          </div>
          <div className="col-span-12 border-t border-border/60 pt-20 lg:col-span-6 lg:border-0 lg:pt-0">
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Education
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">학력</h2>
            <div className="mt-8">
              <Timeline items={education} />
            </div>
          </div>
        </div>
      </section>

      <Section label="Expertise" title="전문 분야">
        <div className="grid gap-4 sm:grid-cols-2">
          {expertise.map((e) => (
            <div key={e.title} className="rounded-2xl border border-border/60 p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/40">
              <h3 className="text-lg font-medium">{e.title}</h3>
              <ul className="mt-3 space-y-2 text-base leading-7 text-muted-foreground">
                {e.items.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="text-primary">·</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section label="Certificates" title="자격증">
        <div className="grid gap-4 sm:grid-cols-3">
          {certificates.map((c) => (
            <div key={c.group} className="rounded-2xl border border-border/60 p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/40">
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {c.group}
              </div>
              <ul className="mt-3 space-y-2 text-base">
                {c.items.map((it) => (
                  <li key={it} className="flex gap-2">
                    <span className="text-primary">·</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
