import Link from 'next/link'
import { CategoryHero } from '@/components/category/shared'
import { DocList, type CategoryDoc } from '@/components/doc-list'
import type { CategoryData } from '@/lib/category'

const fmtDate = (d: string) => (d ? d.slice(0, 10).replace(/-/g, '.') : '')

function featuredMeta(doc: CategoryDoc): string {
  if (doc.type === 'series') {
    const base = doc.chapterCount != null ? `${doc.chapterCount}개 챕터` : '시리즈'
    const date = fmtDate(doc.lastUpdated ?? doc.date)
    return date ? `${base} · ${date}` : base
  }
  return fmtDate(doc.date)
}

/** Design B — editorial: one large featured lead, then the standard DocList. */
export function CategoryEditorial({ data }: { data: CategoryData }) {
  // Lead = first series with a cover, else newest series, else newest doc.
  const seriesDocs = data.docs.filter((d) => d.type === 'series')
  const lead =
    seriesDocs.find((d) => d.cover) ??
    seriesDocs[0] ??
    [...data.docs].sort((a, b) => b.date.localeCompare(a.date))[0]

  const rest = data.docs.filter((d) => d.url !== lead?.url)

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-14 sm:py-20">
      <CategoryHero data={data} />

      {lead && (
        <Link
          href={lead.url}
          className="group mt-12 flex gap-6 border-y border-border/60 py-8 sm:gap-8"
        >
          {lead.type === 'series' &&
            (lead.cover ? (
              <img
                src={lead.cover}
                alt=""
                className="aspect-[10/13] w-28 shrink-0 rounded-md border border-border/40 object-cover sm:w-32"
              />
            ) : (
              <div className="flex aspect-[10/13] w-28 shrink-0 items-center justify-center rounded-md border border-border/40 bg-muted/40 sm:w-32">
                <span className="font-mono text-2xl text-muted-foreground">B</span>
              </div>
            ))}
          <div className="flex min-w-0 flex-col justify-center">
            <span className="font-mono text-xs uppercase tracking-widest text-primary">
              {lead.type === 'series' ? 'Featured Series' : 'Featured Post'}
            </span>
            <h2 className="mt-3 text-balance text-2xl font-semibold leading-tight tracking-tight group-hover:text-primary sm:text-3xl">
              {lead.title}
            </h2>
            {lead.description && (
              <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
                {lead.description}
              </p>
            )}
            <div className="mt-4 flex items-center gap-3 font-mono text-xs text-muted-foreground">
              <span>{featuredMeta(lead)}</span>
              <span className="text-foreground/70 transition-colors group-hover:text-primary">
                읽기 →
              </span>
            </div>
          </div>
        </Link>
      )}

      <div className="mt-16">
        <DocList docs={rest} />
      </div>
    </div>
  )
}
