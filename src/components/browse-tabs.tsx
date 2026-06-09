'use client'

import { useState } from 'react'
import { DocList, type CategoryDoc } from '@/components/doc-list'
import { Chip } from '@/components/category-filter'
import { TOPIC_KEYS, topicLabel, type TopicKey } from '@/lib/topics'

export type BrowseDoc = CategoryDoc & { category: string }

const cleanLabel = (key: TopicKey) => topicLabel(key).replace(/^\d+\.\s*/, '')

/** Single "browse by category" explorer: chip tabs over the combined series + posts. */
export function BrowseTabs({ docs }: { docs: BrowseDoc[] }) {
  const [active, setActive] = useState<TopicKey | 'all'>('all')

  const present = TOPIC_KEYS.filter((k) => docs.some((d) => d.category === k))
  const countOf = (k: TopicKey) => docs.filter((d) => d.category === k).length
  const filtered = active === 'all' ? docs : docs.filter((d) => d.category === active)

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Chip label="전체" count={docs.length} active={active === 'all'} onClick={() => setActive('all')} />
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

      <div className="mt-14">
        <DocList docs={filtered} emptyMsg="해당 카테고리에 글이 없습니다." />
      </div>
    </div>
  )
}
