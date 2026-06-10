import type { Metadata } from 'next'
import Link from 'next/link'
import { Download, ArrowUpRight } from 'lucide-react'
import { downloads } from '#site/content'
import { PageHero } from '@/components/page-hero'
import { Section } from '@/components/home/section'
import { topicLabel } from '@/lib/topics'

const ogTitle = encodeURIComponent('자료실')
const ogSubtitle = encodeURIComponent('실무 템플릿·자료 다운로드')

export const metadata: Metadata = {
  title: '자료실',
  description: '회계·재무 실무에 바로 쓰는 템플릿과 자료를 내려받을 수 있습니다.',
  alternates: { canonical: '/downloads' },
  openGraph: {
    images: [{ url: `/api/og?kicker=PROCPA&title=${ogTitle}&subtitle=${ogSubtitle}`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`/api/og?kicker=PROCPA&title=${ogTitle}&subtitle=${ogSubtitle}`],
  },
}

export default function DownloadsPage() {
  const items = downloads
    .filter((d) => !d.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))

  return (
    <>
      <div className="mx-auto max-w-[1440px] px-6 py-14 sm:py-20">
        <PageHero
          en="Downloads"
          ko="자료실"
          description="회계·재무 실무에 바로 쓰는 템플릿과 자료를 내려받을 수 있습니다."
        />
      </div>

      <Section id="files" kicker="Files" title="다운로드">
        {items.length === 0 ? (
          <p className="text-base text-muted-foreground">아직 공개된 자료가 없습니다.</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {items.map((d) => (
              <a
                key={d.slug}
                href={d.file}
                download
                className="group flex flex-col rounded-xl border border-border/60 p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold tracking-tight [word-break:keep-all]">{d.title}</h3>
                  <Download className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                {d.description && (
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground [word-break:keep-all]">
                    {d.description}
                  </p>
                )}
                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border/60 pt-4 font-mono text-[13px] text-muted-foreground">
                  <span>{topicLabel(d.category)}</span>
                  <span aria-hidden>·</span>
                  <span>{new Date(d.date).toISOString().slice(0, 10)}</span>
                  {d.tags.length > 0 && (
                    <>
                      <span aria-hidden>·</span>
                      <span>{d.tags.join(', ')}</span>
                    </>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </Section>

      <Section id="custom" className="border-t border-border/60">
        <div className="flex flex-col items-start gap-4 rounded-xl border border-border/60 bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base leading-relaxed text-muted-foreground [word-break:keep-all]">
            필요한 자료나 맞춤 템플릿·자문이 있으신가요? 편하게 문의해 주세요.
          </p>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            문의하기
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>
    </>
  )
}
