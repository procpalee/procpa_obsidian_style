import Link from 'next/link'

export type Crumb = { name: string; href?: string }

/**
 * 본문 상단의 가시적 브레드크럼. breadcrumbJsonLd의 항목과 1:1로 맞춘다.
 * 마지막 항목(현재 페이지)은 링크 없이 표시한다.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="브레드크럼"
      className="mb-4 flex flex-wrap items-center gap-1.5 font-mono text-xs text-muted-foreground"
    >
      {items.map((c, i) => (
        <span key={`${c.name}-${i}`} className="inline-flex items-center gap-1.5">
          {i > 0 && <span aria-hidden className="opacity-40">/</span>}
          {c.href ? (
            <Link href={c.href} className="transition-colors hover:text-foreground">
              {c.name}
            </Link>
          ) : (
            <span className="max-w-[18rem] truncate text-foreground/70">{c.name}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
