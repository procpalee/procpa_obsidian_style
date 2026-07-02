import Link from 'next/link'
import { ArrowRight, MessageSquare } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { content } from '@/lib/site-content'

const t = content.home.cta

/** 클로징 — 풀와이드 좌정렬 스테이트먼트. */
export function ContactFinale() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-border/60">
      <div className="mx-auto max-w-[1440px] px-6 py-24 sm:py-32">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {t.kicker}
        </p>

        <h2 className="mt-5 max-w-4xl text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[1.06] tracking-[-0.04em] [word-break:keep-all]">
          {t.headingLine1}
          <br />
          <span className="text-primary">{t.headingAccent}</span>
          {t.headingSuffix}
        </h2>

        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground [word-break:keep-all]">
          {t.paragraph1}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/contact#inquiry"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:scale-[1.02] hover:bg-primary/95 active:scale-[0.98]"
          >
            {t.primary}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={siteConfig.kakaoDirect}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-base font-semibold transition-colors hover:bg-secondary"
          >
            <MessageSquare className="h-5 w-5" />
            {t.secondaryKakao}
          </a>
        </div>
      </div>
    </section>
  )
}
