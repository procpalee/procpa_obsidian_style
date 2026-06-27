import Link from 'next/link'

/**
 * 히어로 셸 — 배경 레이어(bg)를 슬롯으로 받고, 가독성 오버레이 + 콘텐츠를 얹는다.
 * 배경은 정적 이미지 또는 캔버스 애니메이션 컴포넌트를 넣을 수 있다.
 */
export function HeroShell({ updated, bg }: { updated?: string; bg: React.ReactNode }) {
  return (
    <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden border-b border-border/60 bg-[#0a0c10]">
      {/* 배경 레이어 */}
      <div className="absolute inset-0 -z-10">{bg}</div>
      {/* 가독성 오버레이 (좌측 텍스트 영역 + 하단 페이지 배경 블렌드) */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-b from-transparent to-background" />

      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 text-white sm:py-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 font-mono text-[13px] uppercase tracking-widest text-white/90 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Updated {updated ?? new Date().toISOString().slice(0, 10)}
        </span>

        <h1 className="mt-8 max-w-4xl text-balance text-[clamp(2.75rem,8vw,6rem)]/[0.98] font-bold tracking-[-0.05em]">
          회계 전문성에
          <br />
          <span className="text-primary">AI의 생산성</span>을 더합니다
        </h1>

        <p className="mt-8 max-w-2xl text-pretty text-[clamp(1.25rem,1.9vw,1.5rem)]/[1.5] tracking-[-0.015em] text-white/80">
          공인회계사 이재현 — 감사·내부회계·가치평가 실무에 AI를 접목합니다. 회계 자문, AI 도입·AX 컨설팅,
          강의, 협업을 함께합니다.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/contact"
            className="rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            업무 문의하기
          </Link>
          <Link
            href="/portfolio"
            className="rounded-full border border-white/40 px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-white/10"
          >
            포트폴리오 보기
          </Link>
        </div>
      </div>
    </section>
  )
}
