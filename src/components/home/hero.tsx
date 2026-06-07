'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const NAV = [
  { n: '01', ko: '소개', en: 'About', href: '/about', desc: '한국공인회계사 이재현의 경력·전문성' },
  { n: '02', ko: '블로그', en: 'Writing', href: '/blog', desc: '회계·재무 실무와 AI 활용 기록, 시리즈 가이드' },
  { n: '03', ko: '프로젝트', en: 'Projects', href: '/projects', desc: '실무 문제를 푼 웹·MCP 도구들' },
]

export function Hero() {
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
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        {/* eyebrow pill */}
        <div className={reveal()} style={delay(0)}>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            한국공인회계사 · Knowledge Base
          </span>
        </div>

        {/* oversized headline */}
        <h1
          className={cn(
            'mt-7 max-w-[14ch] text-balance font-bold leading-[1.02] tracking-[-0.04em]',
            'text-[clamp(2.75rem,8vw,6rem)]',
            reveal()
          )}
          style={delay(1)}
        >
          회계 전문성에 <span className="text-primary">AI의 생산성</span>을 더합니다
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
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            구독하기
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-border/60 px-6 py-3 text-sm font-medium transition-colors hover:border-foreground/40"
          >
            문의하기
          </Link>
        </div>

        {/* numbered index rows */}
        <div className={cn('mt-16 space-y-3', reveal())} style={delay(4)}>
          {NAV.map((item) => (
            <Link
              key={item.n}
              href={item.href}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 rounded-2xl border border-border/60 px-6 py-6 transition-all hover:-translate-y-0.5 hover:border-foreground/30"
            >
              <span className="font-mono text-3xl font-bold tabular-nums text-primary sm:text-4xl">
                {item.n}
              </span>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold tracking-tight group-hover:text-primary">
                  {item.ko}
                </h3>
                <p className="mt-1 truncate text-sm text-muted-foreground">{item.desc}</p>
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-transform group-hover:translate-x-0.5">
                {item.en} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
