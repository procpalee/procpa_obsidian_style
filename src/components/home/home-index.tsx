import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const INDEX = [
  { n: '01', title: '소개', href: '/about', teaser: '이력·학력·커리어와 전문 분야' },
  { n: '02', title: '포트폴리오', href: '/portfolio', teaser: '도서·강의·프로젝트·활동' },
  { n: '03', title: '문의', href: '/contact', teaser: '자문·AI 도입·강의·협업 문의' },
]

/** 메뉴 인덱스 — 홈에서 각 페이지로 길안내. */
export function HomeIndex() {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-[1440px] px-6 py-16 sm:py-20">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 sm:grid-cols-3">
          {INDEX.map((it) => (
            <Link
              key={it.n}
              href={it.href}
              className="group flex flex-col bg-background p-8 transition-colors hover:bg-secondary/40"
            >
              <span className="font-mono text-sm text-primary">{it.n}</span>
              <h2 className="mt-4 flex items-center gap-2 text-2xl font-bold tracking-[-0.02em]">
                {it.title}
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </h2>
              <p className="mt-2 text-pretty text-muted-foreground">{it.teaser}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
