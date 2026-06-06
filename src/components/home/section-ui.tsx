import type { ReactNode } from 'react'

/** mono 라벨 + 그린 dot 뱃지 (CMDS 시그니처 eyebrow) */
export function BadgePill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-[12px] tracking-tight text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </span>
  )
}

/** 섹션 상단 mono eyebrow (그린/핑크 액센트) */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[12px] uppercase tracking-[0.05em] text-primary">
      {children}
    </p>
  )
}
