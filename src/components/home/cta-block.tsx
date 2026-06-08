import { MessageSquare, ArrowRight } from 'lucide-react'

export function CtaBlock() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 sm:py-24 border-t border-border/60">
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#1e3a8a] via-[#1d4ed8] to-[#2563eb] px-6 py-12 text-center shadow-xl sm:px-12 sm:py-20 dark:from-[#172554] dark:via-[#1e3a8a] dark:to-[#1e40af]">
        {/* Glow effects inside the card */}
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-[#60a5fa]/20 blur-[60px]" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-[#3b82f6]/30 blur-[60px]" />

        <div className="relative mx-auto max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-md mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            COMMUNITY
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl [word-break:keep-all] leading-tight">
            회계·세무·재무 <br className="sm:hidden" />
            <span className="text-[#93c5fd] dark:text-[#bfdbfe]">AI 실무 자동화</span> 커뮤니티
          </h2>

          <p className="mt-6 text-base sm:text-lg leading-relaxed text-blue-100/90 [word-break:keep-all]">
            회계·세무·재무 분야에 AI를 활용한 사례를 공유하는 실무 중심 커뮤니티입니다.<br className="hidden md:inline" />
            참여에 관심이 있으신 분은 편하게 개별 연락 주세요.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="https://open.kakao.com/o/gcpfDupi"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-blue-900 transition-all hover:bg-blue-50 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/10"
            >
              <MessageSquare className="h-5 w-5 text-blue-600 fill-current" />
              오픈채팅방 참여하기
            </a>
            <a
              href="https://open.kakao.com/o/sQCXbyXg"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm"
            >
              1:1 개별 문의 (카카오톡)
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
