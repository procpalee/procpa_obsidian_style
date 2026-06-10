'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function Hero({ updated }: { updated?: string }) {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setOn(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const reveal = () =>
    cn(
      'transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
      on ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
    )
  const delay = (i: number) => ({ transitionDelay: `${i * 90}ms` })

  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-[1440px] px-6 py-20 sm:py-28">
        {/* eyebrow pill — 최근 업데이트 날짜 */}
        <div className={reveal()} style={delay(0)}>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-[13px] uppercase tracking-widest text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Updated {updated ?? new Date().toISOString().slice(0, 10)}
          </span>
        </div>

        {/* oversized headline */}
        <h1
          className={cn(
            'mt-7 font-bold tracking-[-0.04em]',
            'text-[clamp(2.5rem,7vw,5rem)]/[1.05]',
            reveal()
          )}
          style={delay(1)}
        >
          회계 전문성에
          <br />
          <span className="text-primary">AI의 생산성</span>을 더합니다
        </h1>

        {/* lede */}
        <p
          className={cn(
            'mt-8 max-w-2xl text-pretty tracking-[-0.015em] text-muted-foreground',
            'text-[clamp(1.25rem,1.9vw,1.5rem)]/[1.5]',
            reveal()
          )}
          style={delay(2)}
        >
          회계·재무 실무에 AI를 접목해 더 나은 결과물을 만드는 법을 연구하고, 그 과정을{' '}
          <span className="text-foreground">글과 프로젝트</span>로 공유합니다.
        </p>

        {/* pill CTAs */}
        <div className={cn('mt-9 flex flex-wrap items-center gap-3', reveal())} style={delay(3)}>
          <Link
            href="/#follow"
            className="rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            함께하기
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-border/60 px-6 py-3 text-base font-medium transition-colors hover:border-foreground/40"
          >
            연락하기
          </Link>
        </div>

        {/* expertise strip — adds structure + impact under the fold line */}
        <div
          className={cn(
            'mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border/60 pt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground',
            reveal()
          )}
          style={delay(4)}
        >
          {['회계감사', '내부회계', '기업가치평가', '원가분석', 'AI 자동화'].map((k, i) => (
            <span key={k} className="inline-flex items-center gap-3">
              {i > 0 && <span className="opacity-30">/</span>}
              {k}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
