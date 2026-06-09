import Link from 'next/link'
import type { ReactNode } from 'react'
import { PageHero } from '@/components/page-hero'
import { cleanLabel, categoryStats, type CategoryData } from '@/lib/category'

/** Pill linking back to a parent listing (blog / category). */
export function BackPill({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-full border border-border/60 px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
    >
      {children}
    </Link>
  )
}

/** Shared category header: mono "Category" label + KO title + stats + back pill. */
export function CategoryHero({ data }: { data: CategoryData }) {
  return (
    <PageHero
      en="Category"
      ko={cleanLabel(data.label)}
      description={categoryStats(data)}
      action={<BackPill href="/blog">← 블로그</BackPill>}
    />
  )
}
