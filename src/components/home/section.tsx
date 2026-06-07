import Link from 'next/link'
import { cn } from '@/lib/utils'

/** 홈 랜딩의 공통 섹션 셸 — mono 라벨 + 헤딩 + 설명 + 액션, hairline 구분선. */
export function Section({
  id,
  kicker,
  title,
  description,
  action,
  children,
  className,
}: {
  id?: string
  kicker?: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      className={cn('scroll-mt-20 border-t border-border/60', className)}
    >
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        {(kicker || title || description || action) && (
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
            <div className="min-w-0">
              {kicker && (
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {kicker}
                </p>
              )}
              {title && (
                <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-3 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}
        <div className={cn(kicker || title ? 'mt-10' : '')}>{children}</div>
      </div>
    </section>
  )
}

/** 섹션 우측 "전체 보기 →" 링크 */
export function SectionLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 rounded-md border border-border/60 px-3.5 py-2 font-mono text-[11px] text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
    >
      {children}
    </Link>
  )
}
