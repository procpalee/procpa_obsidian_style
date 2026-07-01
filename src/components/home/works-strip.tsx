import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Section, SectionLink } from '@/components/home/section'
import { publications } from '@/lib/publications-data'
import { projects } from '@/lib/projects-data'
import { press } from '@/lib/press-data'
import { content } from '@/lib/site-content'
import { cn } from '@/lib/utils'

const t = content.home.works

/** 결과물 — 도서 표지(실물) + Live 프로젝트 + 언론 보도. 홈의 유일한 이미지 섹션. */
export function WorksStrip() {
  const live = projects.filter((p) => p.status === 'live')
  const shown = live.slice(0, 3)
  const rest = live.length - shown.length

  return (
    <Section
      size="display"
      kicker={t.kicker}
      title={t.title}
      description={t.description}
      action={<SectionLink href="/about">{t.viewAll}</SectionLink>}
    >
      <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        {/* 도서 — 표지 스틸라이프 */}
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {t.books}
          </p>
          <div className="mt-6 flex gap-6">
            {publications.map((p, i) => (
              <a
                key={p.key}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className={cn('group w-36 shrink-0 sm:w-44', i === 1 && 'translate-y-6')}
              >
                <span className="relative block aspect-[3/4] overflow-hidden rounded-xl bg-secondary shadow-lg ring-1 ring-border/60 transition-transform group-hover:-translate-y-1.5 group-hover:rotate-[-1deg]">
                  {p.cover && (
                    <Image src={p.cover} alt={p.title} fill sizes="176px" className="object-cover" />
                  )}
                  {p.status && (
                    <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[11px] text-white backdrop-blur-sm">
                      {p.status}
                    </span>
                  )}
                </span>
                <span className="mt-3 block text-sm font-medium leading-snug [word-break:keep-all] transition-colors group-hover:text-primary">
                  {p.title}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* 프로젝트 + 언론 */}
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {t.projects}
          </p>
          <ul className="mt-2 divide-y divide-border/60">
            {shown.map((p) => (
              <li key={p.key}>
                <a
                  href={p.liveUrl ?? p.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 py-4"
                >
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-base font-semibold transition-colors group-hover:text-primary">
                      {p.name}
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-normal text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Live
                      </span>
                    </span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground [word-break:keep-all]">
                      {p.tagline}
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                </a>
              </li>
            ))}
          </ul>
          {rest > 0 && (
            <p className="mt-3 font-mono text-xs text-muted-foreground">
              외 {rest}
              {t.moreSuffix}
            </p>
          )}

          <p className="mt-12 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {t.press}
          </p>
          <ul className="mt-4 space-y-3">
            {press.slice(0, 2).map((n) => (
              <li key={n.key}>
                <a
                  href={n.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3"
                >
                  <span className="min-w-0 text-sm transition-colors [word-break:keep-all] group-hover:text-primary sm:truncate">
                    {n.title}
                  </span>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    {[n.outlet, n.date].filter(Boolean).join(' · ')}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
