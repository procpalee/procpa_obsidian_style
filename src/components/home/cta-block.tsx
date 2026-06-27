import Link from 'next/link'
import { ArrowRight, MessageSquare } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'

export function CtaBlock() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 sm:py-24 border-t border-border/60">
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card px-6 py-12 text-center shadow-sm sm:px-12 sm:py-20">
        <div className="relative mx-auto max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            WORK WITH ME
          </div>

          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-foreground [word-break:keep-all] sm:text-4xl lg:text-5xl">
            회계·재무 실무, <br className="sm:hidden" />
            <span className="text-primary">AI와 함께</span> 풀어드립니다
          </h2>

          <p className="mt-6 text-base leading-relaxed text-muted-foreground [word-break:keep-all] sm:text-lg">
            회계·재무 자문, AI 도입 컨설팅, 강의·집필, 협업까지 —<br className="hidden md:inline" />
            필요하신 일이 있다면 편하게 문의해 주세요.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition-all hover:scale-[1.02] hover:bg-primary/95 active:scale-[0.98]"
            >
              업무 문의하기
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={siteConfig.kakaoCommunity}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-6 py-3 text-base font-semibold text-foreground transition-all hover:scale-[1.02] hover:bg-secondary active:scale-[0.98]"
            >
              <MessageSquare className="h-5 w-5" />
              실무 자동화 커뮤니티
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
