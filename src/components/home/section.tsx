import Link from 'next/link'
import { cn } from '@/lib/utils'

/** 홈 랜딩의 공통 섹션 셸 — mono 라벨 + 헤딩 + 설명 + 액션, hairline 구분선.
 *  size="display" — 홈 리디자인용 대형 헤딩 + 넓은 리듬 (서브페이지는 default 유지). */
export function Section({
  id,
  kicker,
  title,
  description,
  action,
  children,
  className,
  size = 'default',
}: {
  id?: string
  kicker?: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
  size?: 'default' | 'display'
}) {
  const display = size === 'display'
  return (
    <section
      id={id}
      className={cn('scroll-mt-20 border-t border-border/60', className)}
    >
      <div
        className={cn(
          'mx-auto max-w-[1440px] px-6',
          display ? 'py-20 sm:py-28' : 'py-16 sm:py-20',
        )}
      >
        {(kicker || title || description || action) && (
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
            <div className="min-w-0">
              {kicker && (
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {kicker}
                </p>
              )}
              {title && (
                <h2
                  className={cn(
                    'mt-3 font-bold [word-break:keep-all]',
                    display
                      ? 'text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.08] tracking-[-0.035em]'
                      : 'text-3xl tracking-[-0.02em] sm:text-4xl',
                  )}
                >
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
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
      className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
    >
      {children}
    </Link>
  )
}
