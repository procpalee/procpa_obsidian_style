import { cn } from '@/lib/utils'

/**
 * 서브페이지(소개·블로그·프로젝트·문의) 공용 히어로.
 * - `eyebrow`(시안3): 영문 mono 라벨 + 한글 h1. 기존 blog/projects 구조 유지.
 * - `display`(시안1): 큰 영문 제목을 메인으로, 한글/설명은 보조.
 */
export type PageHeroVariant = 'display' | 'eyebrow'

export function PageHero({
  en,
  ko,
  description,
  action,
  variant = 'eyebrow',
  className,
}: {
  en: string
  ko: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  variant?: PageHeroVariant
  className?: string
}) {
  return (
    <header
      className={cn('flex flex-wrap items-end justify-between gap-x-6 gap-y-4', className)}
    >
      <div className="min-w-0">
        {variant === 'display' ? (
          <>
            <h1 className="text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              {en}
            </h1>
            <p className="mt-4 text-lg font-semibold tracking-tight text-muted-foreground sm:text-xl">
              {ko}
            </p>
          </>
        ) : (
          <>
            <p className="font-mono text-sm uppercase tracking-widest text-primary">
              {en}
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {ko}
            </h1>
          </>
        )}
        {description && (
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  )
}
