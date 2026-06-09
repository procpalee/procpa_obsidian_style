'use client'

import { useState } from 'react'
import { PostCard, SeriesCard } from '@/components/content-card'
import { TOPIC_KEYS, topicLabel, type TopicKey } from '@/lib/topics'

export type FilterPost = {
  title: string
  description?: string
  url: string
  date: string
  tags?: string[]
  category: string
}

export type FilterSeries = {
  title: string
  description: string
  url: string
  cover?: string
  chapterCount?: number
  lastUpdated?: string
  category: string
}

const cleanLabel = (key: TopicKey) => topicLabel(key).replace(/^\d+\.\s*/, '')

export function Chip({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-xs transition-colors ${
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border/60 text-muted-foreground hover:border-foreground/40 hover:text-foreground'
      }`}
    >
      <span>{label}</span>
      <span className={active ? 'opacity-70' : 'text-muted-foreground/60'}>{count}</span>
    </button>
  )
}

type Props =
  | { kind: 'post'; items: FilterPost[] }
  | { kind: 'series'; items: FilterSeries[] }

/**
 * Category chip filter shared by `/blog`, `/series` and `/browse`.
 * Renders a "전체 + topics" chip row and the filtered list/grid client-side.
 */
export function CategoryFilter(props: Props) {
  const [active, setActive] = useState<TopicKey | 'all'>('all')

  const items = props.items
  const present = TOPIC_KEYS.filter((k) => items.some((it) => it.category === k))
  const countOf = (k: TopicKey) => items.filter((it) => it.category === k).length

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Chip label="전체" count={items.length} active={active === 'all'} onClick={() => setActive('all')} />
        {present.map((k) => (
          <Chip
            key={k}
            label={cleanLabel(k)}
            count={countOf(k)}
            active={active === k}
            onClick={() => setActive(k)}
          />
        ))}
      </div>

      <div className="mt-10">
        {props.kind === 'series' ? (
          <SeriesList items={props.items.filter((s) => active === 'all' || s.category === active)} />
        ) : (
          <PostList items={props.items.filter((p) => active === 'all' || p.category === active)} />
        )}
      </div>
    </div>
  )
}

function SeriesList({ items }: { items: FilterSeries[] }) {
  if (items.length === 0) {
    return <p className="font-mono text-sm text-muted-foreground">해당 카테고리의 시리즈가 없습니다.</p>
  }
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((s) => (
        <SeriesCard
          key={s.url}
          title={s.title}
          description={s.description}
          url={s.url}
          cover={s.cover}
          chapterCount={s.chapterCount}
          lastUpdated={s.lastUpdated}
          variant="default"
        />
      ))}
    </div>
  )
}

function PostList({ items }: { items: FilterPost[] }) {
  if (items.length === 0) {
    return <p className="font-mono text-sm text-muted-foreground">해당 카테고리의 포스트가 없습니다.</p>
  }
  return (
    <div className="divide-y divide-border/60">
      {items.map((p) => (
        <PostCard
          key={p.url}
          title={p.title}
          description={p.description}
          url={p.url}
          date={p.date}
          tags={p.tags}
          variant="list"
        />
      ))}
    </div>
  )
}
