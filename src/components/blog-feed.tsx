'use client'

import { useState } from 'react'
import Link from 'next/link'
import { TOPIC_KEYS, topicLabel, type TopicKey } from '@/lib/topics'
import { Chip } from '@/components/category-filter'

export type FeedPost = {
  title: string
  description?: string
  url: string
  date: string
  tags?: string[]
  category: string
  readingTime?: number
}

const catLabel = (c: string) => topicLabel(c).replace(/^\d+\.\s*/, '')
const fmt = (d: string) => d.slice(0, 10).replace(/-/g, '.')

/**
 * /blog feed — category chips (주제 축) + featured lead card + card grid (형식 축).
 * 두 분류 축을 한 화면에서 직관적으로: 칩으로 주제를 좁히고, 그리드로 글을 훑는다.
 */
export function BlogFeed({ items }: { items: FeedPost[] }) {
  const [active, setActive] = useState<TopicKey | 'all'>('all')
  const present = TOPIC_KEYS.filter((k) => items.some((it) => it.category === k))
  const countOf = (k: TopicKey) => items.filter((it) => it.category === k).length
  const filtered = items.filter((p) => active === 'all' || p.category === active)
  const [featured, ...rest] = filtered

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Chip label="전체" count={items.length} active={active === 'all'} onClick={() => setActive('all')} />
        {present.map((k) => (
          <Chip key={k} label={catLabel(k)} count={countOf(k)} active={active === k} onClick={() => setActive(k)} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 font-mono text-sm text-muted-foreground">해당 주제의 글이 없습니다.</p>
      ) : (
        <>
          {featured && <FeaturedCard p={featured} />}
          {rest.length > 0 && (
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => (
                <GridCard key={p.url} p={p} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

function FeaturedCard({ p }: { p: FeedPost }) {
  return (
    <Link
      href={p.url}
      className="group mt-10 block rounded-2xl border border-border/60 p-6 transition-all hover:border-foreground/40 hover:shadow-sm sm:p-8"
    >
      <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
        <span className="rounded-full border border-border/60 px-2 py-0.5">{catLabel(p.category)}</span>
        <span className="text-primary">Featured</span>
      </div>
      <h2 className="mt-4 text-2xl font-bold tracking-tight group-hover:text-primary sm:text-3xl [word-break:keep-all]">
        {p.title}
      </h2>
      {p.description && (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground [word-break:keep-all]">
          {p.description}
        </p>
      )}
      <div className="mt-5 flex flex-wrap items-center gap-x-3 font-mono text-xs text-muted-foreground">
        <span>{fmt(p.date)}</span>
        {p.readingTime != null && (
          <>
            <span aria-hidden>·</span>
            <span>{p.readingTime}분</span>
          </>
        )}
      </div>
    </Link>
  )
}

function GridCard({ p }: { p: FeedPost }) {
  return (
    <Link
      href={p.url}
      className="group flex flex-col rounded-2xl border border-border/60 p-5 transition-all hover:translate-y-[-2px] hover:border-foreground/40 hover:shadow-sm"
    >
      <span className="inline-flex w-fit rounded-full border border-border/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
        {catLabel(p.category)}
      </span>
      <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight group-hover:text-primary [word-break:keep-all]">
        {p.title}
      </h3>
      {p.description && (
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground [word-break:keep-all]">
          {p.description}
        </p>
      )}
      <span className="mt-4 font-mono text-xs text-muted-foreground">{fmt(p.date)}</span>
    </Link>
  )
}
