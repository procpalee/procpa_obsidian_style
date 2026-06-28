'use client'

import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { CATEGORIES, type CategoryKey, type PostMeta } from '@/lib/blog-shared'
import { PostCard } from './post-card'

type Filter = CategoryKey | 'all'

export function BlogIndex({ posts, tags }: { posts: PostMeta[]; tags: string[] }) {
  const [category, setCategory] = useState<Filter>('all')
  const [tag, setTag] = useState<string | null>(null)

  const filtered = useMemo(
    () =>
      posts.filter(
        (p) => (category === 'all' || p.category === category) && (tag === null || p.tags.includes(tag)),
      ),
    [posts, category, tag],
  )

  const chip =
    'rounded-full border px-3.5 py-1.5 text-sm transition-colors'
  const active = 'border-primary text-primary'
  const idle = 'border-border text-muted-foreground hover:border-foreground/40'

  return (
    <div>
      {/* 카테고리 */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setCategory('all')} className={cn(chip, category === 'all' ? active : idle)}>
          전체
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setCategory(c.key)}
            className={cn(chip, category === c.key ? active : idle)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* 태그 */}
      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
          <button
            onClick={() => setTag(null)}
            className={cn('font-mono text-xs', tag === null ? 'text-primary' : 'text-muted-foreground hover:text-foreground')}
          >
            #전체
          </button>
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(tag === t ? null : t)}
              className={cn('font-mono text-xs', tag === t ? 'text-primary' : 'text-muted-foreground hover:text-foreground')}
            >
              #{t}
            </button>
          ))}
        </div>
      )}

      {/* 목록 */}
      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-border/60 px-6 py-10 text-center text-base text-muted-foreground">
          해당하는 글이 없습니다.
        </div>
      )}
    </div>
  )
}
