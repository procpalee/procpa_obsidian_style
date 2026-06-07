import { cn } from '@/lib/utils'

/**
 * 서브페이지(소개·블로그·프로젝트·문의) 공용 히어로.
 * 영문 mono 라벨(text-primary) + 한글 h1 + 설명 + 우측 액션.
 */
export function PageHero({
  en,
  ko,
  description,
  action,
  className,
}: {
  en: string
  ko: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  className?: string
}) {
  return (
    <header
      className={cn('flex flex-wrap items-end justify-between gap-x-6 gap-y-4', className)}
    >
      <div className="min-w-0">
        <p className="font-mono text-sm uppercase tracking-widest text-primary">{en}</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{ko}</h1>
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
