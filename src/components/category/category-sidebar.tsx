import Link from 'next/link'
import { CategoryHero } from '@/components/category/shared'
import { DocList } from '@/components/doc-list'
import type { CategoryData } from '@/lib/category'

/** Design D — left subcategory index nav + DocList on the right. */
export function CategorySidebar({ data }: { data: CategoryData }) {
  const total = data.docs.length

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-14 sm:py-20">
      <CategoryHero data={data} />

      <div className="mt-12 grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
        {/* index nav — sticky column on desktop, horizontal scroll on mobile */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="hidden font-mono text-xs uppercase tracking-widest text-muted-foreground lg:block">
            Index
          </p>
          <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
            <span className="flex shrink-0 items-center justify-between gap-3 rounded-md border border-foreground/20 bg-accent/40 px-3 py-2 font-mono text-xs text-foreground lg:border-0 lg:border-l-2 lg:border-primary lg:bg-transparent lg:rounded-none">
              전체
              <span className="text-muted-foreground/60">{total}</span>
            </span>
            {data.subcategories.map((s) => (
              <Link
                key={s.name}
                href={`/${data.category}/${s.name}`}
                className="flex shrink-0 items-center justify-between gap-3 rounded-md border border-border/60 px-3 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground lg:border-0 lg:border-l-2 lg:border-transparent lg:rounded-none lg:hover:border-l-foreground/40"
              >
                {s.name}
                <span className="text-muted-foreground/50">{s.postCount + s.seriesCount}</span>
              </Link>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          <DocList docs={data.docs} />
        </div>
      </div>
    </div>
  )
}
