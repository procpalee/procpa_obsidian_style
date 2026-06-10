import { SeriesCard, PostCard } from '@/components/content-card'
import { Download } from 'lucide-react'

export type CategoryDoc = {
  type: 'post' | 'series' | 'download'
  title: string
  description: string
  url: string
  date: string
  tags: string[]
  cover?: string
  subcategory?: string
  chapterCount?: number
  lastUpdated?: string
  readingTime?: number
  file?: string
}

export function DocList({ docs, emptyMsg }: { docs: CategoryDoc[]; emptyMsg?: string }) {
  if (docs.length === 0) return <p className="text-sm text-muted-foreground">{emptyMsg ?? '글이 없습니다.'}</p>
  const seriesDocs = docs.filter((d) => d.type === 'series')
  const postDocs = docs.filter((d) => d.type === 'post').sort((a, b) => b.date.localeCompare(a.date))
  const downloadDocs = docs.filter((d) => d.type === 'download').sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="space-y-20">
      {seriesDocs.length > 0 && (
        <section>
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Series
          </div>
          <div className="mt-2 flex items-baseline gap-3">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">시리즈</h2>
            <span className="font-mono text-xs text-muted-foreground/60">{seriesDocs.length}</span>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {seriesDocs.map((d) => (
              <SeriesCard
                key={d.url}
                title={d.title}
                description={d.description}
                url={d.url}
                cover={d.cover}
                chapterCount={d.chapterCount}
                lastUpdated={d.lastUpdated}
                variant="default"
              />
            ))}
          </div>
        </section>
      )}
      {postDocs.length > 0 && (
        <section>
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Posts
          </div>
          <div className="mt-2 flex items-baseline gap-3">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">포스트</h2>
            <span className="font-mono text-xs text-muted-foreground/60">{postDocs.length}</span>
          </div>
          <ul className="mt-8 divide-y divide-border/60">
            {postDocs.map((d) => (
              <li key={d.url}>
                <PostCard
                  title={d.title}
                  url={d.url}
                  date={d.date}
                  tags={d.tags}
                  variant="list"
                />
              </li>
            ))}
          </ul>
        </section>
      )}
      {downloadDocs.length > 0 && (
        <section>
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Downloads
          </div>
          <div className="mt-2 flex items-baseline gap-3">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">자료실</h2>
            <span className="font-mono text-xs text-muted-foreground/60">{downloadDocs.length}</span>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {downloadDocs.map((d) => (
              <a
                key={d.url}
                href={d.file ?? d.url}
                download
                className="group flex flex-col rounded-xl border border-border/60 p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold tracking-tight [word-break:keep-all]">{d.title}</h3>
                  <Download className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                {d.description && (
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground [word-break:keep-all]">
                    {d.description}
                  </p>
                )}
                {d.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border/60 pt-4">
                    {d.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
