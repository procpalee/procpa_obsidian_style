import Link from 'next/link'
import { PageHero } from '@/components/page-hero'

export function Hero() {
  return (
    <section>
      <div className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
        <PageHero
          en="Home"
          ko={
            <>
              회계 전문성에 <span className="text-primary">AI의 생산성</span>을 더합니다
            </>
          }
          description={
            <>
              안녕하세요, 한국공인회계사 <span className="text-foreground">이재현</span>입니다.
              회계·재무 실무에 AI를 접목해 더 빠르고 정확하게 일하는 법을 연구하고,
              그 과정을 <span className="text-foreground">글·도구·강의</span>로 공유합니다.
            </>
          }
        />

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
      </div>
    </section>
  )
}
