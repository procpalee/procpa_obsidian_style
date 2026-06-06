import Link from 'next/link'

/** 마무리 CTA 블록 — 풀폭 액센트 배경 (라이트 그린 / 다크 핑크) */
export function CtaSection() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="rounded-3xl bg-primary px-8 py-14 text-center text-primary-foreground sm:px-12 sm:py-20">
          <h2 className="mx-auto max-w-2xl text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.15] tracking-[-0.02em]">
            업무를 제안해 주세요
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed opacity-80 sm:text-base">
            회계 자문, AI 컨설팅, 강의·집필, 협업까지 — 어떤 형태의 제안이든
            편하게 연락 주세요. 빠르게 회신드리겠습니다.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary transition-opacity hover:opacity-90"
            >
              업무 제안하기
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-medium transition-colors hover:bg-primary-foreground/10"
            >
              포트폴리오 보기
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
