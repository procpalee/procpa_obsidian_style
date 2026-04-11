'use client'

import * as React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { topicLabel } from '@/lib/topics'

export interface FacetCounts {
  categories: { value: string; count: number }[]
  tags: { value: string; count: number }[]
  types: { value: 'post' | 'series' | 'chapter'; count: number }[]
  years: { value: string; count: number }[]
}

const TYPE_LABEL: Record<'post' | 'series' | 'chapter', string> = {
  post: 'Post',
  series: 'Series',
  chapter: 'Chapter',
}

export function FacetPanel({ facets }: { facets: FacetCounts }) {
  const router = useRouter()
  const params = useSearchParams()

  const update = React.useCallback(
    (key: string, value: string, multi = false, checked = true) => {
      const next = new URLSearchParams(params.toString())
      if (multi) {
        const current = next.getAll(key)
        next.delete(key)
        const set = new Set(current)
        if (checked) set.add(value)
        else set.delete(value)
        for (const v of set) next.append(key, v)
      } else {
        if (checked) next.set(key, value)
        else next.delete(key)
      }
      router.replace(`/explore?${next.toString()}`, { scroll: false })
    },
    [params, router],
  )

  const reset = () => router.replace('/explore', { scroll: false })

  const selectedCategory = params.get('category') ?? ''
  const selectedType = params.get('type') ?? ''
  const selectedYear = params.get('year') ?? ''
  const selectedTags = new Set(params.getAll('tag'))

  return (
    <aside className="space-y-8 text-sm">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Filters
        </p>
        <button
          type="button"
          onClick={reset}
          className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
        >
          Reset
        </button>
      </div>

      <FacetGroup label="Type">
        <RadioRow
          name="type"
          value=""
          label="All"
          checked={!selectedType}
          onChange={() => update('type', '', false, false)}
        />
        {facets.types.map((t) => (
          <RadioRow
            key={t.value}
            name="type"
            value={t.value}
            label={`${TYPE_LABEL[t.value]} (${t.count})`}
            checked={selectedType === t.value}
            onChange={() => update('type', t.value)}
          />
        ))}
      </FacetGroup>

      <FacetGroup label="Category">
        <RadioRow
          name="category"
          value=""
          label="All"
          checked={!selectedCategory}
          onChange={() => update('category', '', false, false)}
        />
        {facets.categories.map((c) => (
          <RadioRow
            key={c.value}
            name="category"
            value={c.value}
            label={`${topicLabel(c.value)} (${c.count})`}
            checked={selectedCategory === c.value}
            onChange={() => update('category', c.value)}
          />
        ))}
      </FacetGroup>

      <FacetGroup label="Tags">
        {facets.tags.length === 0 ? (
          <p className="text-xs text-muted-foreground">—</p>
        ) : (
          facets.tags.map((t) => (
            <CheckRow
              key={t.value}
              label={`#${t.value} (${t.count})`}
              checked={selectedTags.has(t.value)}
              onChange={(checked) => update('tag', t.value, true, checked)}
            />
          ))
        )}
      </FacetGroup>

      <FacetGroup label="Year">
        <RadioRow
          name="year"
          value=""
          label="All"
          checked={!selectedYear}
          onChange={() => update('year', '', false, false)}
        />
        {facets.years.map((y) => (
          <RadioRow
            key={y.value}
            name="year"
            value={y.value}
            label={`${y.value} (${y.count})`}
            checked={selectedYear === y.value}
            onChange={() => update('year', y.value)}
          />
        ))}
      </FacetGroup>
    </aside>
  )
}

function FacetGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <div className="space-y-1">{children}</div>
    </div>
  )
}

function RadioRow({
  name,
  value,
  label,
  checked,
  onChange,
}: {
  name: string
  value: string
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 rounded px-1 py-0.5 text-[13px] hover:bg-accent/60">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="h-3 w-3 accent-primary"
      />
      <span className="flex-1 truncate">{label}</span>
    </label>
  )
}

function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 rounded px-1 py-0.5 text-[13px] hover:bg-accent/60">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-3 w-3 accent-primary"
      />
      <span className="flex-1 truncate">{label}</span>
    </label>
  )
}
