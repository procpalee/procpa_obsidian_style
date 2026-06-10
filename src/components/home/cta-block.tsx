import Link from 'next/link'
import { MessageSquare, ArrowRight } from 'lucide-react'

export function CtaBlock() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 sm:py-24 border-t border-border/60">
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card px-6 py-12 text-center shadow-sm sm:px-12 sm:py-20">
        <div className="relative mx-auto max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            COMMUNITY
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl [word-break:keep-all] leading-tight">
            회계·세무·재무 <br className="sm:hidden" />
            <span className="text-primary">AI 실무 자동화</span> 커뮤니티
          </h2>

          <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground [word-break:keep-all]">
            회계·세무·재무 분야에 AI를 활용한 사례를 공유하는 실무 중심 커뮤니티입니다.<br className="hidden md:inline" />
            참여에 관심이 있으신 분은 편하게 개별 연락 주세요.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="https://open.kakao.com/o/gcpfDupi"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/95 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
            >
              <MessageSquare className="h-5 w-5 fill-current" />
              오픈채팅방 참여하기
            </a>
            <a
              href="https://open.kakao.com/o/sQCXbyXg"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-6 py-3 text-base font-semibold text-foreground transition-all hover:bg-secondary hover:scale-[1.02] active:scale-[0.98]"
            >
              1:1 개별 문의 (카카오톡)
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            업무·컨설팅·강의 문의는{' '}
            <Link href="/contact" className="font-medium text-primary underline-offset-4 hover:underline">
              문의하기
            </Link>
            에서 확인하세요.
          </p>
        </div>
      </div>
    </section>
  )
}
