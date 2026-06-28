import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Section } from '@/components/home/section'
import { ProjectCard } from '@/components/project-card'
import { projects } from '@/lib/projects-data'
import { publications } from '@/lib/publications-data'
import { lectures } from '@/lib/lectures-data'
import { content } from '@/lib/site-content'

const t = content.portfolio
const DESC = content.meta.portfolio.description

export const metadata: Metadata = {
  title: content.meta.portfolio.title,
  description: DESC,
  alternates: { canonical: '/portfolio' },
  openGraph: { title: content.meta.portfolio.title, description: DESC, url: '/portfolio', images: ['/og-default.png'] },
  twitter: { card: 'summary_large_image', title: content.meta.portfolio.title, description: DESC, images: ['/og-default.png'] },
}

function EmptyNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-border/60 px-6 py-10 text-center text-base text-muted-foreground">
      {children}
    </div>
  )
}


export default function PortfolioPage() {
  return (
    <>
      <div className="mx-auto max-w-[1440px] px-6 py-14 sm:py-20">
        <PageHero en={t.hero.en} ko={t.hero.ko} description={DESC} />
      </div>

      {/* 도서 */}
      <Section kicker={t.books.kicker} title={t.books.title} description={t.books.description}>
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
                {p.cover && (
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {p.platform}
                  </span>
                  {p.status && (
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {p.status}
                    </span>
                  )}
                </div>
                <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight group-hover:text-primary">
                  {p.title}
                </h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-sm">
                  <span className="font-mono text-xs text-muted-foreground">{p.year}</span>
                  <span className="inline-flex items-center gap-1 font-medium text-primary transition-opacity group-hover:opacity-80">
                    {t.readMore} <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* 강의 */}
      <Section kicker={t.lectures.kicker} title={t.lectures.title} description={t.lectures.description}>
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
          <EmptyNote>{t.lectures.empty}</EmptyNote>
        )}
      </Section>

      {/* 프로젝트 */}
      <Section kicker={t.projects.kicker} title={t.projects.title} description={t.projects.description}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.key} project={p} detailed />
          ))}
        </div>
      </Section>
    </>
  )
}
