import { TableOfContents, type TocItem } from './table-of-contents'
import { BacklinksCompact } from './backlinks-panel'
import { LocalGraphMini } from './graph/local-graph'

interface ContentAsideProps {
  toc: TocItem[]
  slug: string
}

export function ContentAside({ toc, slug }: ContentAsideProps) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-20 space-y-8 overflow-y-auto max-h-[calc(100vh-6rem)]">
        <TableOfContents items={toc} />
        <BacklinksCompact slug={slug} />
        <LocalGraphMini currentSlug={slug} />
      </div>
    </aside>
  )
}
