import Link from 'next/link'
import { content } from '@/lib/site-content'

const t = content.home.hero

/**
 * 화려한 히어로 셸 — 텍스트가 라인 마스크 슬라이드업으로 등장 + 강조어 그라데이션 시머.
 * 배경(bg) 슬롯에 컬러풀 애니메이션 배경을 넣는다. (히어로 한정으로 그라데이션 허용)
 */
export function HeroFxShell({ bg }: { bg: React.ReactNode }) {
  return (
    <section className="relative isolate flex min-h-[90vh] items-center overflow-hidden border-b border-border/60 bg-[#070912]">
      <style>{`
        .fx-mask{overflow:hidden;display:block;padding-bottom:.04em}
        .fx-rise{display:block;transform:translateY(115%);animation:fxRise 1s cubic-bezier(.16,1,.3,1) both}
        .fx-fade{animation:fxFade .9s ease-out both}
        .fx-grad{background:linear-gradient(90deg,#5b9cff,#a78bfa,#22d3ee,#5b9cff);background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;animation:fxShimmer 5s linear infinite}
        @keyframes fxRise{to{transform:translateY(0)}}
        @keyframes fxFade{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
        @keyframes fxShimmer{to{background-position:200% center}}
        @media (prefers-reduced-motion: reduce){
          .fx-rise{animation:none;transform:none}.fx-fade{animation:none}.fx-grad{animation:none}
        }
      `}</style>

      <div className="absolute inset-0 -z-10">{bg}</div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-b from-transparent to-background" />

      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 text-white sm:py-28">
        <span
          className="fx-fade inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 font-mono text-[13px] uppercase tracking-widest text-white/90 backdrop-blur-sm"
          style={{ animationDelay: '0ms' }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {t.badge}
        </span>

        <h1 className="mt-8 max-w-4xl text-[clamp(2.75rem,8vw,6rem)]/[1.02] font-bold tracking-[-0.05em]">
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
          className="fx-fade mt-8 max-w-2xl text-pretty text-[clamp(1.25rem,1.9vw,1.5rem)]/[1.5] tracking-[-0.015em] text-white/80"
          style={{ animationDelay: '520ms' }}
        >
          {t.lede}
        </p>

        <div className="fx-fade mt-10 flex flex-wrap items-center gap-3" style={{ animationDelay: '680ms' }}>
          <Link
            href="/contact"
            className="rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t.ctaPrimary}
          </Link>
          <Link
            href="/portfolio"
            className="rounded-full border border-white/40 px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-white/10"
          >
            {t.ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  )
}
