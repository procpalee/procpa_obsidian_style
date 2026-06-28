import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import {
  advisory,
  career,
  certificates,
  education,
  expertise,
  stats,
  contacts,
} from '@/lib/about-data'
import { press } from '@/lib/press-data'
import { publications } from '@/lib/publications-data'
import { lectures } from '@/lib/lectures-data'
import { projects } from '@/lib/projects-data'
import { ProjectCard } from '@/components/project-card'
import { JsonLd, personJsonLd } from '@/components/json-ld'
import { PageHero } from '@/components/page-hero'
import { content } from '@/lib/site-content'

const t = content.about
const cp = content.portfolio

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

      {/* 도서 */}
      <Section label={cp.books.kicker} title={cp.books.title}>
        <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground">{cp.books.description}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {publications.map((p) => (
            <a
              key={p.key}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="group flex gap-5 rounded-2xl border border-border/60 p-5 transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-sm"
            >
              <div className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden rounded-md bg-secondary">
                {p.cover && <Image src={p.cover} alt={p.title} fill sizes="96px" className="object-cover" />}
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{p.platform}</span>
                  {p.status && (
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {p.status}
                    </span>
                  )}
                </div>
                <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight group-hover:text-primary">{p.title}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-sm">
                  <span className="font-mono text-xs text-muted-foreground">{p.year}</span>
                  <span className="inline-flex items-center gap-1 font-medium text-primary transition-opacity group-hover:opacity-80">
                    {cp.readMore} <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* 강의 */}
      <Section label={cp.lectures.kicker} title={cp.lectures.title}>
        <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground">{cp.lectures.description}</p>
        {lectures.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {lectures.map((l) => {
              const cardCls =
                'group flex flex-col rounded-2xl border border-border/60 p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-sm'
              const inner = (
                <>
                  {(l.org || l.date) && (
                    <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      {[l.org, l.date].filter(Boolean).join(' · ')}
                    </span>
                  )}
                  <h3 className="mt-3 text-lg font-semibold tracking-tight">{l.title}</h3>
                  <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{l.description}</p>
                </>
              )
              return l.url ? (
                <a key={l.key} href={l.url} target="_blank" rel="noreferrer" className={cardCls}>
                  {inner}
                </a>
              ) : (
                <div key={l.key} className={cardCls}>
                  {inner}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border/60 px-6 py-10 text-center text-base text-muted-foreground">
            {cp.lectures.empty}
          </div>
        )}
      </Section>

      {/* 프로젝트 */}
      <Section label={cp.projects.kicker} title={cp.projects.title}>
        <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground">{cp.projects.description}</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.key} project={p} detailed />
          ))}
        </div>
      </Section>

      <Section label={t.sections.externalActivities.en} title={t.sections.externalActivities.ko}>
        {press.length > 0 ? (
          <div className="divide-y divide-border/60 overflow-hidden rounded-2xl border border-border/60">
            {press.map((n) => (
              <a
                key={n.key}
                href={n.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-secondary/40"
              >
                <div className="min-w-0">
                  <h3 className="truncate text-base font-medium group-hover:text-primary">{n.title}</h3>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                    {[n.outlet, n.date].filter(Boolean).join(' · ')}
                  </p>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
              </a>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border/60 px-6 py-10 text-center text-base text-muted-foreground">
            {t.externalActivitiesEmpty}
          </div>
        )}
      </Section>
    </>
  )
}
