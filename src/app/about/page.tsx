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
import { content } from '@/lib/site-content'

const t = content.about

export const metadata: Metadata = {
  title: content.meta.about.title,
  description: content.meta.about.description,
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
            en={t.hero.en}
            ko={
              <>
                {t.hero.koPre}
                <span className="text-primary">{t.hero.koName}</span>
                {t.hero.koPost}
              </>
            }
            description={
              <>
                <span className="text-foreground">{t.hero.hi1}</span>
                {t.hero.mid}
                <span className="text-foreground">{t.hero.hi2}</span>
                {t.hero.descTail}
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
              {t.sections.career.en}
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{t.sections.career.ko}</h2>
            <div className="mt-8">
              <Timeline items={career} />
            </div>
          </div>
          <div className="col-span-12 border-t border-border/60 pt-20 lg:col-span-6 lg:border-0 lg:pt-0">
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {t.sections.education.en}
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{t.sections.education.ko}</h2>
            <div className="mt-8">
              <Timeline items={education} />
            </div>
          </div>
        </div>
      </section>

      <Section label={t.sections.expertise.en} title={t.sections.expertise.ko}>
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

      <Section label={t.sections.certificates.en} title={t.sections.certificates.ko}>
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
