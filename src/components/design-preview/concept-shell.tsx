import type { CSSProperties, ReactNode } from 'react'
import type { DesignConcept } from '@/lib/design-concepts'

/**
 * 컨셉별 CSS 변수 + 폰트를 인라인으로 격리 적용하는 래퍼.
 * theme-preview/page.tsx의 MiniSite 격리 패턴을 재사용한다.
 * 라이브 사이트의 :root 토큰을 건드리지 않는다.
 */
export function ConceptShell({
  concept,
  children,
  className = '',
}: {
  concept: DesignConcept
  children: ReactNode
  className?: string
}) {
  const style = {
    ...concept.vars,
    fontFamily: concept.fontSans,
  } as CSSProperties

  return (
    <div style={style} className={`bg-background text-foreground ${className}`}>
      {concept.fontLink && <link rel="stylesheet" href={concept.fontLink} />}
      {children}
    </div>
  )
}
