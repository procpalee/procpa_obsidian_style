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
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
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
            'mt-7 text-balance font-bold leading-[1.0] tracking-[-0.04em]',
            'text-[clamp(2.75rem,8vw,6rem)]',
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
            'mt-7 max-w-2xl text-pretty leading-[1.55] tracking-[-0.015em] text-muted-foreground',
            'text-[clamp(1.0625rem,1.6vw,1.3rem)]',
            reveal()
          )}
          style={delay(2)}
        >
          회계·재무 실무에 AI를 접목해 더 빠르고 정확하게 일하는 법을 연구하고, 그 과정을{' '}
          <span className="text-foreground">글·도구·강의</span>로 공유합니다.
        </p>

        {/* pill CTAs */}
        <div className={cn('mt-9 flex flex-wrap items-center gap-3', reveal())} style={delay(3)}>
          <Link
            href="/#follow"
            className="rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            구독하기
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-border/60 px-6 py-3 text-base font-medium transition-colors hover:border-foreground/40"
          >
            문의하기
          </Link>
        </div>
      </div>
    </section>
  )
}
