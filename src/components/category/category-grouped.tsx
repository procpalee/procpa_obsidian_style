import { CategoryHero } from '@/components/category/shared'
import { SeriesCard, PostCard } from '@/components/content-card'
import { type CategoryDoc } from '@/components/doc-list'
import type { CategoryData } from '@/lib/category'

type Group = { key: string; name: string; docs: CategoryDoc[] }

function groupDocs(data: CategoryData): Group[] {
  const groups: Group[] = data.subcategories.map((s, i) => ({
    key: `sub-${i}`,
    name: s.name,
    docs: data.docs.filter((d) => d.subcategory === s.name),
  }))
  const ungrouped = data.docs.filter((d) => !d.subcategory)
  if (ungrouped.length > 0) {
    groups.push({ key: 'sub-etc', name: '기타', docs: ungrouped })
  }
  return groups.filter((g) => g.docs.length > 0)
}

/** Design C — sectioned by subcategory with jump-to anchor chips. */
export function CategoryGrouped({ data }: { data: CategoryData }) {
  const groups = groupDocs(data)

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-14 sm:py-20">
      <CategoryHero data={data} />

      {groups.length > 1 && (
        <nav className="mt-10 flex flex-wrap gap-2">
          {groups.map((g) => (
            <a
              key={g.key}
              href={`#${g.key}`}
              className="rounded-full border border-border/60 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              {g.name}
              <span className="ml-1.5 text-muted-foreground/50">{g.docs.length}</span>
            </a>
          ))}
        </nav>
      )}

      <div className="mt-12 divide-y divide-border/60">
        {groups.map((g) => {
          const seriesDocs = g.docs.filter((d) => d.type === 'series')
          const postDocs = g.docs
            .filter((d) => d.type === 'post')
            .sort((a, b) => b.date.localeCompare(a.date))
          return (
            <section key={g.key} id={g.key} className="scroll-mt-24 py-12 first:pt-0">
              <div className="flex items-baseline gap-3">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{g.name}</h2>
                <span className="font-mono text-xs text-muted-foreground/60">{g.docs.length}</span>
              </div>

              {seriesDocs.length > 0 && (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {seriesDocs.map((d) => (
                    <SeriesCard
                      key={d.url}
                      title={d.title}
                      description={d.description}
                      url={d.url}
                      cover={d.cover}
                      chapterCount={d.chapterCount}
                      lastUpdated={d.lastUpdated}
                    />
                  ))}
                </div>
              )}

              {postDocs.length > 0 && (
                <ul className="mt-2 divide-y divide-border/60">
                  {postDocs.map((d) => (
                    <li key={d.url}>
                      <PostCard title={d.title} url={d.url} date={d.date} tags={d.tags} variant="list" />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}
