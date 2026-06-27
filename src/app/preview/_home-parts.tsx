import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { stats } from '@/lib/about-data'
import { projects } from '@/lib/projects-data'
import { publications } from '@/lib/publications-data'

const today = () => new Date().toISOString().slice(0, 10)

/** 선언형 히어로 — 한방. */
export function HomeHero() {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-[1440px] px-6 py-24 sm:py-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-[13px] uppercase tracking-widest text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Updated {today()}
        </span>
        <h1 className="mt-8 text-[clamp(2.75rem,8vw,6rem)]/[0.98] font-bold tracking-[-0.05em]">
          회계 전문성에
          <br />
          <span className="text-primary">AI의 생산성</span>을 더합니다
        </h1>
        <p className="mt-9 max-w-2xl text-pretty text-[clamp(1.25rem,1.9vw,1.5rem)]/[1.5] tracking-[-0.015em] text-muted-foreground">
          공인회계사 이재현 — 감사·내부회계·가치평가 실무에 AI를 접목하고, 그 과정을 도서·프로젝트로 공유합니다.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/portfolio"
            className="rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            포트폴리오 보기
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-border px-7 py-3.5 text-base font-medium transition-colors hover:border-foreground/40"
          >
            업무 문의하기
          </Link>
        </div>
      </div>
    </section>
  )
}

/** 신뢰 스탯 행. */
export function HomeStats() {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-8 px-6 py-14 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col">
            <span className="text-4xl font-bold tracking-tight tabular-nums sm:text-5xl">{s.value}</span>
            <span className="mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

const MARQUEE = ['감사', '내부회계관리제도', '가치평가', '원가분석', 'AI 자동화', 'MCP', '데이터']

/** 전문분야 키워드 마키 (full-bleed). */
export function HomeMarquee() {
  return (
    <section className="overflow-hidden border-b border-border/60 bg-foreground py-3 text-background">
      <style>{`
        @keyframes hp-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .hp-marquee { display:flex; width:max-content; animation: hp-marquee 24s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .hp-marquee { animation: none; } }
      `}</style>
      <div className="hp-marquee">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
            {MARQUEE.map((m) => (
              <span key={m} className="px-6 font-mono text-sm uppercase tracking-widest">
                {m} ·
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

/** 대표 작업 미리보기 (나머지는 포트폴리오에서). */
export function HomeFeatured() {
  const items = [
    { kind: '프로젝트', title: projects[4].name, desc: projects[4].tagline },
    { kind: '프로젝트', title: projects[1].name, desc: projects[1].tagline },
    { kind: '도서', title: publications[0].title, desc: publications[0].description },
  ]
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-[1440px] px-6 py-16 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Selected</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] sm:text-4xl">대표 작업</h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
          >
            전체 보기 →
          </Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {items.map((it) => (
            <Link
              key={it.title}
              href="/portfolio"
              className="group flex flex-col rounded-2xl border border-border/60 p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-sm"
            >
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{it.kind}</span>
              <h3 className="mt-3 text-lg font-semibold tracking-tight group-hover:text-primary">{it.title}</h3>
              <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{it.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

const INDEX = [
  { n: '01', title: '소개', href: '/about', teaser: '이력·학력·커리어와 전문 분야' },
  { n: '02', title: '포트폴리오', href: '/portfolio', teaser: '도서·강의·프로젝트·활동' },
  { n: '03', title: '문의', href: '/contact', teaser: '자문·AI 도입·강의·협업 문의' },
]

/** 메뉴 인덱스 — 길안내. */
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
              <h3 className="mt-4 flex items-center gap-2 text-2xl font-bold tracking-[-0.02em]">
                {it.title}
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </h3>
              <p className="mt-2 text-pretty text-muted-foreground">{it.teaser}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/** 마무리 CTA. */
export function HomeCta() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-20 sm:py-28 text-center">
      <h2 className="text-[clamp(2rem,5vw,3.5rem)]/[1.05] font-bold tracking-[-0.03em]">함께 일해요</h2>
      <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
        회계·재무 자문, AI 도입, 강의, 협업 — 필요하신 일이 있다면 편하게 문의해 주세요.
      </p>
      <div className="mt-9 flex justify-center">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          업무 문의하기 <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
