'use client'

import { useEffect, useRef, useState } from 'react'

export type TocItem = {
  title: string
  url: string
  items: TocItem[]
}

function flattenToc(items: TocItem[]): TocItem[] {
  const result: TocItem[] = []
  for (const item of items) {
    result.push(item)
    if (item.items.length > 0) result.push(...flattenToc(item.items))
  }
  return result
}

function TocLink({
  item,
  depth,
  activeId,
}: {
  item: TocItem
  depth: number
  activeId: string
}) {
  const id = item.url.replace('#', '')
  const isActive = activeId === id
  return (
    <>
      <a
        href={item.url}
        className={`block border-l-2 py-1 text-[13px] leading-snug transition-colors ${
          isActive
            ? 'border-primary text-foreground'
            : 'border-transparent text-muted-foreground hover:text-foreground'
        }`}
        style={{ paddingLeft: `${12 + depth * 12}px` }}
      >
        {item.title}
      </a>
      {item.items.map((child) => (
        <TocLink key={child.url} item={child} depth={depth + 1} activeId={activeId} />
      ))}
    </>
  )
}

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const flat = flattenToc(items)
    const ids = flat.map((item) => item.url.replace('#', ''))

    observerRef.current?.disconnect()

    const observer = new IntersectionObserver(
      (entries) => {
        // 화면에 보이는 heading 중 가장 위에 있는 것을 active로
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 },
    )

    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    observerRef.current = observer
    return () => observer.disconnect()
  }, [items])

  if (!items.length) return null

  return (
    <nav aria-label="목차">
      <h3 className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        On this page
      </h3>
      <div className="space-y-0.5">
        {items.map((item) => (
          <TocLink key={item.url} item={item} depth={0} activeId={activeId} />
        ))}
      </div>
    </nav>
  )
}
