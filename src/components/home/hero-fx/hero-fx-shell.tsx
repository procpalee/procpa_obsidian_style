import Link from 'next/link'
import { ArrowDown } from 'lucide-react'
import { content } from '@/lib/site-content'

const t = content.home.hero

/**
 * 에디토리얼 히어로 — 대형 헤드라인이 라인 마스크 슬라이드업으로 등장하고,
 * 하단에 섹션 인덱스가 히어로의 구조 요소로 붙어 홈 각 섹션으로 스크롤한다.
 * (fx-* keyframes/유틸은 globals.css의 Home FX 블록)
 */
export function HeroFxShell({ bg }: { bg: React.ReactNode }) {
  return (
    <section className="relative isolate flex min-h-[92svh] flex-col overflow-hidden border-b border-border/60 bg-[#070912]">
      <div className="absolute inset-0 -z-10">{bg}</div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-b from-transparent to-black/60" />

      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-6 py-20 text-white">
        <span
          className="fx-fade inline-flex items-center gap-2 self-start rounded-full border border-white/25 bg-white/10 px-3 py-1 font-mono text-[13px] tracking-wider text-white/90 backdrop-blur-sm"
          style={{ animationDelay: '0ms' }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {t.badge}
        </span>

        <h1 className="mt-6 text-[clamp(2.875rem,7.5vw,7rem)] font-bold leading-[0.98] tracking-[-0.05em] [word-break:keep-all]">
          <span className="fx-mask">
            <span className="fx-rise" style={{ animationDelay: '120ms' }}>
              {t.headline1}
            </span>
          </span>
          <span className="fx-mask">
            <span className="fx-rise" style={{ animationDelay: '260ms' }}>
              <span className="fx-grad">{t.headlineAccent}</span>
              {t.headlineSuffix}
            </span>
          </span>
        </h1>

        <p
          className="fx-fade mt-5 max-w-2xl text-pretty text-[clamp(1.125rem,1.8vw,1.4rem)]/[1.55] tracking-[-0.015em] text-white/80 [word-break:keep-all]"
          style={{ animationDelay: '520ms' }}
        >
          {t.lede}
        </p>

        <div
          className="fx-fade mt-7 flex flex-wrap items-center gap-x-7 gap-y-4"
          style={{ animationDelay: '640ms' }}
        >
          <Link
            href="/contact#inquiry"
            className="rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t.ctaPrimary}
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-white/40 px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-white/10"
          >
            {t.ctaSecondary}
          </Link>
        </div>
      </div>

      {/* 섹션 인덱스 — 홈 각 섹션으로 스크롤 (번호는 섹션 kicker 01~04와 매칭) */}
      <nav aria-label={t.sectionsAriaLabel} className="border-t border-white/15 text-white">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
          {t.sections.map((s, i) => (
            <Link
              key={s.href}
              href={s.href}
              className="fx-fade group flex items-center justify-between gap-3 px-6 py-4 transition-colors hover:bg-white/[0.06] sm:py-5"
              style={{ animationDelay: `${700 + i * 80}ms` }}
            >
              <span className="min-w-0">
                <span className="font-mono text-xs tracking-widest text-[#8ab4ff]">
                  0{i + 1}
                </span>
                <span className="mt-1 block text-[15px] font-semibold leading-snug [word-break:keep-all] sm:text-base">
                  {s.label}
                </span>
              </span>
              <ArrowDown className="h-4 w-4 shrink-0 text-white/50 transition-all group-hover:translate-y-0.5 group-hover:text-white" />
            </Link>
          ))}
        </div>
      </nav>
    </section>
  )
}
