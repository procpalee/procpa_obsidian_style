import Link from 'next/link'
import { HeroConstellation, HeroTyping } from '@/components/home/hero-animated'

/* 홈 히어로 시안 모음 — /design/hero 에서 비교용. */

function Ctas() {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
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
  )
}

const KICKER = 'font-mono text-sm uppercase tracking-widest text-primary'

/** 시안 A — Editorial: 큰 헤드라인 + 하단 mono 인덱스 라인. 현재 톤의 정제판. */
export function HeroEditorial() {
  return (
    <section>
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <p className={KICKER}>Home</p>
        <h1 className="mt-5 max-w-3xl text-balance text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl">
          회계 전문성에 <span className="text-primary">AI의 생산성</span>을 더합니다
        </h1>
        <p className="mt-6 max-w-2xl text-[16px] leading-[1.85] text-muted-foreground">
          안녕하세요, 한국공인회계사 <span className="text-foreground">이재현</span>입니다.
          회계·재무 실무에 AI를 접목해 더 빠르고 정확하게 일하는 법을 연구하고, 그 과정을{' '}
          <span className="text-foreground">글·도구·강의</span>로 공유합니다.
        </p>
        <div className="mt-8">
          <Ctas />
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border/60 pt-5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span>Accounting × AI</span>
          <span className="text-border">/</span>
          <span>Since 2019</span>
          <span className="text-border">/</span>
          <span>Seoul, KR</span>
        </div>
      </div>
    </section>
  )
}

/** 시안 B — Frontmatter Note: Obsidian 노트(프론트매터)처럼 보이는 히어로. 볼트 방향성과 일치. */
export function HeroFrontmatter() {
  const rows: [string, React.ReactNode][] = [
    ['역할', '한국공인회계사 · 이재현'],
    ['분야', '회계·재무 × AI 생산성'],
    ['활동', '글 · 도구 · 강의'],
    ['위치', 'Seoul, KR'],
  ]
  return (
    <section>
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <div className="overflow-hidden rounded-xl border border-border/60">
          <div className="flex items-center gap-2 border-b border-border/60 bg-muted/20 px-5 py-2.5 font-mono text-xs text-muted-foreground">
            <span className="text-primary">procpa</span>
            <span className="text-border">/</span>
            <span>home.md</span>
          </div>
          <div className="px-6 py-9 sm:px-10 sm:py-11">
            <p className={KICKER}>Home</p>
            <h1 className="mt-4 max-w-2xl text-3xl font-bold leading-[1.18] tracking-tight sm:text-4xl">
              회계 전문성에 <span className="text-primary">AI의 생산성</span>을 더합니다
            </h1>
            <dl className="mt-8 border-y border-border/60">
              {rows.map(([k, v]) => (
                <div
                  key={k}
                  className="grid grid-cols-[5rem_1fr] items-baseline gap-4 border-b border-border/60 py-3 last:border-0"
                >
                  <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {k}
                  </dt>
                  <dd className="text-[15px]">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-7 max-w-2xl text-[15px] leading-[1.8] text-muted-foreground">
              회계·재무 실무에 AI를 접목해 더 빠르고 정확하게 일하는 법을 연구하고, 그 과정을{' '}
              <span className="text-foreground">글·도구·강의</span>로 공유합니다.
            </p>
            <div className="mt-8">
              <Ctas />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** 시안 C — Asymmetric Index: 초대형 헤드라인 + 우측 섹션 인덱스(목차). 매거진 느낌. */
export function HeroIndex() {
  const index: [string, string, string][] = [
    ['01', '소개', '/about'],
    ['02', '블로그', '/blog'],
    ['03', '프로젝트', '/projects'],
    ['04', '문의', '/contact'],
  ]
  return (
    <section>
      <div className="mx-auto grid max-w-5xl grid-cols-12 gap-x-6 gap-y-10 px-6 py-16 sm:py-24">
        <div className="col-span-12 lg:col-span-8">
          <p className={KICKER}>Home</p>
          <h1 className="mt-5 text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            회계 전문성에 <span className="text-primary">AI의 생산성</span>을 더합니다
          </h1>
        </div>
        <nav className="col-span-12 lg:col-span-4 lg:border-l lg:border-border/60 lg:pl-6">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Index
          </p>
          <ul className="mt-4 border-t border-border/60">
            {index.map(([n, label, href]) => (
              <li key={n} className="border-b border-border/60">
                <Link
                  href={href}
                  className="group flex items-baseline gap-3 py-3 transition-colors"
                >
                  <span className="font-mono text-xs text-muted-foreground">{n}</span>
                  <span className="text-[15px] group-hover:text-primary">{label}</span>
                  <span className="ml-auto font-mono text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="col-span-12 lg:col-span-8">
          <p className="max-w-2xl text-[16px] leading-[1.85] text-muted-foreground">
            안녕하세요, 한국공인회계사 <span className="text-foreground">이재현</span>입니다.
            회계·재무 실무에 AI를 접목해 더 빠르고 정확하게 일하는 법을 연구하고, 그 과정을{' '}
            <span className="text-foreground">글·도구·강의</span>로 공유합니다.
          </p>
          <div className="mt-8">
            <Ctas />
          </div>
        </div>
      </div>
    </section>
  )
}

/** 시안 D — Graph Field: 지식 그래프(노드·엣지) 배경 위 중앙 정렬 히어로. 그래프 뷰와 동일 테마. */
export function HeroGraph() {
  const nodes = [
    [120, 90, 4], [330, 60, 3], [250, 230, 7], [70, 320, 4], [430, 360, 5],
    [620, 120, 9], [880, 80, 4], [760, 300, 6], [1040, 220, 7], [1180, 90, 4],
    [1120, 420, 5], [560, 420, 4], [930, 440, 5], [350, 470, 4], [1230, 320, 4],
  ] as const
  const edges = [
    [0, 2], [1, 2], [2, 3], [2, 4], [1, 5], [5, 6], [5, 7], [7, 8], [8, 9],
    [8, 10], [4, 11], [7, 12], [4, 13], [10, 14], [8, 12], [11, 7],
  ] as const
  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-background">
      <svg
        aria-hidden
        viewBox="0 0 1280 500"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full text-primary opacity-[0.28]"
      >
        <g stroke="currentColor" strokeOpacity="0.5" strokeWidth="1">
          {edges.map(([a, b], i) => (
            <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />
          ))}
        </g>
        <g fill="currentColor">
          {nodes.map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} className="animate-pulse" style={{ animationDelay: `${(i % 5) * 0.4}s`, animationDuration: '3s' }} />
          ))}
        </g>
      </svg>
      <div className="relative mx-auto max-w-3xl px-6 py-24 text-center sm:py-32">
        <p className={KICKER}>Home</p>
        <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl">
          회계 전문성에 <span className="text-primary">AI의 생산성</span>을 더합니다
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-[1.8] text-muted-foreground">
          회계·재무 실무에 AI를 접목해 더 빠르고 정확하게 일하는 법을 연구하고, 그 과정을{' '}
          <span className="text-foreground">글·도구·강의</span>로 공유합니다.
        </p>
        <div className="mt-8 flex justify-center">
          <Ctas />
        </div>
      </div>
    </section>
  )
}

/** 시안 E — Cover: 풀블리드 배경 이미지(hero-cover.svg) + 오버레이, 매거진 커버 레이아웃. */
export function HeroCover() {
  return (
    <section className="relative overflow-hidden border-y border-border/60">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/hero-cover.svg)' }}
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative mx-auto max-w-5xl px-6 py-28 sm:py-40">
        <p className="font-mono text-sm uppercase tracking-widest text-primary">Home</p>
        <h1 className="mt-5 max-w-3xl text-balance text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl">
          회계 전문성에 <span className="text-primary">AI의 생산성</span>을 더합니다
        </h1>
        <p className="mt-6 max-w-2xl text-[16px] leading-[1.85] text-white/70">
          한국공인회계사 이재현. 회계·재무 실무에 AI를 접목해 더 빠르고 정확하게 일하는 법을
          연구하고, 그 과정을 글·도구·강의로 공유합니다.
        </p>
        <div className="mt-8">
          <Ctas />
        </div>
      </div>
    </section>
  )
}

/** 시안 F — Blueprint Grid: 모눈종이(graph paper) 배경 위 주석 달린 노트형 히어로. */
export function HeroBlueprint() {
  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-background">
      <div
        className="absolute inset-0"
        style={{ backgroundImage: 'url(/hero-grid.svg)', backgroundSize: '48px 48px' }}
      />
      <div className="relative mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-primary">Home</span>
          <span className="h-px flex-1 bg-border/60" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Fig. 01
          </span>
        </div>
        <h1 className="mt-6 max-w-3xl text-balance text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl">
          회계 전문성에 <span className="text-primary">AI의 생산성</span>을 더합니다
        </h1>
        <p className="mt-6 max-w-2xl text-[16px] leading-[1.85] text-muted-foreground">
          안녕하세요, 한국공인회계사 <span className="text-foreground">이재현</span>입니다.
          회계·재무 실무에 AI를 접목해 더 빠르고 정확하게 일하는 법을 연구하고, 그 과정을{' '}
          <span className="text-foreground">글·도구·강의</span>로 공유합니다.
        </p>
        <div className="mt-8 inline-flex border border-border/60 bg-background/90 p-3">
          <Ctas />
        </div>
      </div>
    </section>
  )
}

/** 시안 I — Orbit: 허브를 중심으로 노드가 공전하는 CSS 애니메이션 다이어그램 배경. */
export function HeroOrbit() {
  const ring = 'absolute rounded-full border border-border/50'
  const node =
    'absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_12px_2px_rgba(91,156,255,0.5)]'
  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-background">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-80">
        <div className="relative h-[560px] w-[560px] max-w-[90vw]">
          <div className={`${ring} inset-0`} />
          <div className={`${ring} inset-[15%]`} />
          <div className={`${ring} inset-[30%]`} />
          <div className="absolute inset-0 animate-[spin_30s_linear_infinite] motion-reduce:animate-none">
            <span className={node} />
            <span className={`${node} left-auto right-0 top-1/2 -translate-y-1/2 translate-x-1/2`} />
          </div>
          <div className="absolute inset-[15%] animate-[spin_20s_linear_infinite] [animation-direction:reverse] motion-reduce:animate-none">
            <span className={node} />
          </div>
          <div className="absolute inset-[30%] animate-[spin_13s_linear_infinite] motion-reduce:animate-none">
            <span className={node} />
            <span className={`${node} left-1/2 top-auto bottom-0 translate-y-1/2`} />
          </div>
          <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_24px_6px_rgba(91,156,255,0.55)]" />
        </div>
      </div>
      <div className="relative mx-auto max-w-3xl px-6 py-28 text-center sm:py-36">
        <p className={KICKER}>Home</p>
        <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl">
          회계 전문성에 <span className="text-primary">AI의 생산성</span>을 더합니다
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-[1.8] text-muted-foreground">
          회계·재무 실무에 AI를 접목해 더 빠르고 정확하게 일하는 법을 연구하고, 그 과정을{' '}
          <span className="text-foreground">글·도구·강의</span>로 공유합니다.
        </p>
        <div className="mt-8 flex justify-center">
          <Ctas />
        </div>
      </div>
    </section>
  )
}

export const HERO_VARIANTS = [
  { id: 'editorial', name: 'A · Editorial', component: HeroEditorial },
  { id: 'frontmatter', name: 'B · Frontmatter Note', component: HeroFrontmatter },
  { id: 'index', name: 'C · Asymmetric Index', component: HeroIndex },
  { id: 'graph', name: 'D · Graph Field', component: HeroGraph },
  { id: 'cover', name: 'E · Cover (Background Image)', component: HeroCover },
  { id: 'blueprint', name: 'F · Blueprint Grid', component: HeroBlueprint },
  { id: 'constellation', name: 'G · Constellation (애니메이션·인터랙티브)', component: HeroConstellation },
  { id: 'typing', name: 'H · Typewriter (애니메이션)', component: HeroTyping },
  { id: 'orbit', name: 'I · Orbit (애니메이션)', component: HeroOrbit },
] as const
