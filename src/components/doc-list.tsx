import { SeriesCard, PostCard } from '@/components/content-card'

export type CategoryDoc = {
  type: 'post' | 'series'
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
}

export function DocList({ docs, emptyMsg }: { docs: CategoryDoc[]; emptyMsg?: string }) {
  if (docs.length === 0) return <p className="text-sm text-muted-foreground">{emptyMsg ?? '글이 없습니다.'}</p>
  const seriesDocs = docs.filter((d) => d.type === 'series')
  const postDocs = docs.filter((d) => d.type === 'post').sort((a, b) => b.date.localeCompare(a.date))

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
    </div>
  )
}
