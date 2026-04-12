import type { Metadata } from 'next'
import { downloads } from '#site/content'
import { FileDownload } from '@/components/mdx/file-download'
import { TOPICS, topicLabel, topicOrder, type TopicKey } from '@/lib/topics'

export const metadata: Metadata = {
  title: '자료실',
  description: '실무에 활용할 수 있는 엑셀 템플릿, 가이드 등 첨부파일을 다운로드할 수 있습니다.',
  alternates: { canonical: '/downloads' },
}

function groupByCategory(items: typeof downloads) {
  const groups = new Map<string, typeof downloads>()
  for (const item of items) {
    if (item.draft) continue
    const cat = item.category
    if (!groups.has(cat)) groups.set(cat, [])
    groups.get(cat)!.push(item)
  }
  // 카테고리 순서대로 정렬
  return [...groups.entries()].sort(
    ([a], [b]) => topicOrder(a) - topicOrder(b),
  )
}

export default function DownloadsPage() {
  const grouped = groupByCategory(downloads)
  const total = downloads.filter((d) => !d.draft).length

  return (
    <section>
      <div className="mx-auto max-w-5xl px-6 py-12">
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Downloads
        </p>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
          자료실
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-[1.85] text-muted-foreground">
          실무에 활용할 수 있는 엑셀 템플릿, 가이드 등을 다운로드할 수 있습니다.
        </p>

        {total === 0 ? (
          <p className="mt-12 text-sm text-muted-foreground">등록된 파일이 없습니다.</p>
        ) : (
          <div className="mt-12 space-y-14">
            {grouped.map(([category, items]) => (
              <div key={category}>
                <div className="flex items-baseline gap-3 border-b border-border/60 pb-3">
                  <h2 className="text-lg font-semibold tracking-tight">
                    {category in TOPICS
                      ? topicLabel(category).replace(/^\d+\.\s*/, '')
                      : category}
                  </h2>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {items.length}
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  {items
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((item) => (
                      <div key={item.slug}>
                        <FileDownload
                          href={item.file}
                          name={item.title}
                          description={item.description}
                        />
                        {item.tags.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1.5 pl-1">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-border/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
