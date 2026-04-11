import Link from 'next/link'
import type { Metadata } from 'next'
import { posts, series } from '#site/content'
import { VaultSidebar, type VaultData } from '@/components/vault/vault-sidebar'
import { VaultDrawer } from '@/components/vault/vault-drawer'
import { ScrollArea } from '@/components/ui/scroll-area'
import { buildVaultTree } from '@/lib/vault-tree'

export const metadata: Metadata = {
  title: 'PROCPA',
  description: '한국공인회계사 이재현의 개인 지식 데이터베이스 — 회계·재무 전문성에 AI의 생산성을 더하다.',
}

function formatDate(d: string) {
  return d.slice(0, 10).replace(/-/g, '.')
}

export default function HomePage() {
  const visiblePosts = posts.filter((p) => !p.draft)
  const visibleSeries = series.filter((s) => !s.draft)

  const recentPosts = [...visiblePosts]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 6)

  const tagCounts = new Map<string, number>()
  for (const p of visiblePosts) for (const t of p.tags) tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1)
  const tagList: [string, number][] = [...tagCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)

  const vaultTree = buildVaultTree(visiblePosts, visibleSeries)

  const vaultData: VaultData = {
    tree: vaultTree,
    counts: {
      posts: visiblePosts.length,
      series: visibleSeries.length,
      tags: tagCounts.size,
    },
    tags: tagList,
  }

  return (
    <div className="border-t border-border/60">
      <div className="mx-auto grid min-h-[calc(100vh-3.5rem)] max-w-6xl grid-cols-12 gap-0 px-6 lg:px-0">
        {/* ───────── Left · Vault sidebar (desktop only) ───────── */}
        <aside className="hidden border-border/60 lg:col-span-3 lg:block lg:border-r">
          <div className="group/sidebar sticky top-14 h-[calc(100vh-3.5rem)]">
            <ScrollArea className="h-full [&_[data-slot=scroll-area-scrollbar]]:opacity-0 [&_[data-slot=scroll-area-scrollbar]]:transition-opacity group-hover/sidebar:[&_[data-slot=scroll-area-scrollbar]]:opacity-100">
              <div className="px-6 py-8">
                <VaultSidebar data={vaultData} />
              </div>
            </ScrollArea>
          </div>
        </aside>

        {/* ───────── Center · Note view ───────── */}
        <section className="col-span-12 min-w-0 lg:col-span-9">
          <div className="py-8 sm:py-10 lg:px-12 lg:py-8">
            {/* Mobile toolbar */}
            <div className="mb-8 flex items-center justify-between gap-3 border-b border-border/60 pb-4 lg:hidden">
              <VaultDrawer>
                <VaultSidebar data={vaultData} />
              </VaultDrawer>
              <div className="font-mono text-[11px] text-muted-foreground">Home</div>
            </div>

            {/* Desktop breadcrumb */}
            <div className="hidden font-mono text-[11px] text-muted-foreground lg:block">
              <span>Home</span>
            </div>

            {/* Title */}
            <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              회계·재무 전문성에
              <br />
              AI의 생산성을 더하다.
            </h1>

            <p className="mt-6 max-w-2xl text-[15px] leading-[1.85] text-muted-foreground sm:text-base">
              한국공인회계사의 개인 지식
              데이터베이스. 
              <br />
              실무에 즉시 활용 가능한 회계·재무 지식과 AI 생산성 인사이트를 공유합니다.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted-foreground">
              <span className="rounded border border-border/60 px-2 py-0.5">#KICPA</span>
              <span className="rounded border border-border/60 px-2 py-0.5">#Professional</span>
              <span className="rounded border border-border/60 px-2 py-0.5">#Productivity</span>
            </div>

            {/* Recent notes */}
            <div className="mt-14 lg:mt-16">
              <h2 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                ## 이번 주의 노트
              </h2>
              <ul className="mt-5 divide-y divide-border/60">
                {recentPosts.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/${p.slugAsParams}`}
                      className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-4"
                    >
                      <div className="flex min-w-0 flex-1 items-baseline gap-3">
                        <span className="font-mono text-[11px] text-muted-foreground group-hover:text-foreground">
                          ▸
                        </span>
                        <span className="flex-1 text-[15px] leading-snug group-hover:text-primary">
                          {p.title}
                        </span>
                      </div>
                      <span className="pl-6 font-mono text-[10px] text-muted-foreground sm:pl-0">
                        {formatDate(p.date)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ongoing series */}
            <div className="mt-14 lg:mt-16">
              <h2 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                ## 진행 중인 시리즈
              </h2>
              <div className="mt-5 grid gap-3">
                {visibleSeries.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/${s.slugAsParams}`}
                    className="group flex items-baseline gap-4 rounded-md border border-border/60 px-4 py-3.5 transition-colors hover:border-foreground/40"
                  >
                    <span className="font-mono text-[11px] text-muted-foreground">▸</span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[15px] font-medium group-hover:text-primary">
                        {s.title}
                      </div>
                      <div className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-muted-foreground">
                        {s.description}
                      </div>
                    </div>
                    <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
                      {s.category === 'accounting' ? '회계' : 'AI'}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
