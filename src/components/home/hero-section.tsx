import Link from 'next/link'
import { BadgePill } from './section-ui'
import { stats } from '@/lib/about-data'

/** 메인 히어로 — 큰 타이트 타이포 + mono 뱃지 + 메트릭 그리드 */
export function HeroSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-16 sm:pt-24">
      <BadgePill>한국공인회계사 · AI 컨설턴트</BadgePill>

      <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em]">
        회계·재무 전문성에{' '}
        <span className="text-primary">AI의 생산성</span>을 더합니다
      </h1>

      <p className="mt-7 max-w-2xl text-[clamp(1.05rem,1.6vw,1.375rem)] leading-[1.55] tracking-[-0.01em] text-muted-foreground">
        한국공인회계사 이재현입니다. 결산·내부회계 자문부터 AI 도입 컨설팅,
        강의·집필까지 — 실무에 바로 쓰이는 결과로 증명합니다.
      </p>

      <div className="mt-9 flex flex-wrap items-center gap-3">
        <Link
          href="/contact"
          className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          업무 제안하기
        </Link>
        <Link
          href="/services"
          className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary"
        >
          서비스 보기
        </Link>
        <Link
          href="/about"
          className="inline-flex items-center px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          About →
        </Link>
      </div>

      {/* 메트릭 그리드 */}
      <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card px-6 py-7">
            <div className="text-3xl font-bold tracking-tight sm:text-4xl">
              {s.value}
            </div>
            <div className="mt-1.5 font-mono text-[12px] text-muted-foreground">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
