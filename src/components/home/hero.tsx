import Link from 'next/link'
import { stats } from '@/lib/about-data'
import { socials } from '@/components/social-icons'

export function Hero() {
  const followChips = socials.filter((s) => s.featured)

  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-5xl px-6 pt-16 pb-14 sm:pt-24 sm:pb-20">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1 font-mono text-[11px] text-muted-foreground">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          정인회계법인 · 방위사업청 원가관리 자문위원
        </div>

        <h1 className="mt-6 max-w-3xl text-balance text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl">
          회계 전문성에
          <br />
          <span className="text-primary">AI의 생산성</span>을 더합니다
        </h1>

        <p className="mt-6 max-w-2xl text-[16px] leading-[1.85] text-muted-foreground">
          안녕하세요, 한국공인회계사 <span className="text-foreground">이재현</span>입니다.
          회계·재무 실무에 AI를 접목해 더 빠르고 정확하게 일하는 법을 연구하고,
          그 과정을 <span className="text-foreground">글·도구·강의</span>로 공유합니다.
        </p>

        {/* Primary CTAs */}
        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          <Link
            href="/#follow"
            className="rounded-md bg-primary px-5 py-2.5 text-[14px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            구독하기
          </Link>
          <Link
            href="/contact"
            className="rounded-md border border-border/60 px-5 py-2.5 text-[14px] font-medium transition-colors hover:border-foreground/40"
          >
            문의하기
          </Link>
        </div>

        {/* Follow chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          {followChips.map((s) => {
            const Icon = s.icon
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3 py-1.5 text-[12px] text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="font-mono">{s.handle}</span>
              </a>
            )
          })}
        </div>

        {/* Stats */}
        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border/60 bg-border/60 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-card px-5 py-5">
              <dt className="font-mono text-2xl font-bold tracking-tight text-foreground">
                {s.value}
              </dt>
              <dd className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
