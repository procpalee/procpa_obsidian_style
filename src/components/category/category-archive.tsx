import Link from 'next/link'
import { CategoryHero } from '@/components/category/shared'
import type { CategoryData } from '@/lib/category'
import type { CategoryDoc } from '@/components/doc-list'

const fmtDate = (d: string) => (d ? d.slice(0, 10).replace(/-/g, '.') : '')

function rowMeta(doc: CategoryDoc): string {
  if (doc.type === 'series') {
    const base = doc.chapterCount != null ? `${doc.chapterCount}챕터` : '시리즈'
    const date = fmtDate(doc.lastUpdated ?? doc.date)
    return date ? `${base} · ${date}` : base
  }
  const base = doc.readingTime != null ? `${Math.max(1, Math.round(doc.readingTime))}분` : ''
  const date = fmtDate(doc.date)
  return [base, date].filter(Boolean).join(' · ')
}

/** Design A — flat archive table (no cards): mono index, type pill, title, meta. */
export function CategoryArchive({ data }: { data: CategoryData }) {
  const seriesDocs = data.docs.filter((d) => d.type === 'series')
  const postDocs = data.docs
    .filter((d) => d.type === 'post')
    .sort((a, b) => b.date.localeCompare(a.date))
  const ordered = [...seriesDocs, ...postDocs]

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-14 sm:py-20">
      <CategoryHero data={data} />

      <ul className="mt-12 divide-y divide-border/60 border-y border-border/60">
        {ordered.map((doc, i) => (
          <li key={doc.url}>
            <Link
              href={doc.url}
              className="group grid grid-cols-[2.5rem_4rem_1fr_auto] items-center gap-4 py-4 transition-colors hover:bg-accent/40"
            >
              <span className="font-mono text-xs text-muted-foreground/50 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className={`inline-flex justify-center rounded border px-2 py-0.5 font-mono text-[11px] ${
                  doc.type === 'series'
                    ? 'border-primary/40 text-primary'
                    : 'border-border/60 text-muted-foreground'
                }`}
              >
                {doc.type === 'series' ? '시리즈' : '포스트'}
              </span>
              <span className="min-w-0 truncate text-base leading-snug group-hover:text-primary">
                {doc.title}
              </span>
              <span className="shrink-0 text-right font-mono text-xs text-muted-foreground tabular-nums">
                {rowMeta(doc)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
