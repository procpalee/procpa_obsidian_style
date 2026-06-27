import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { Sparkles, ArrowRight, ShieldCheck, ClipboardCheck, Calculator, LineChart, CheckCircle2, Activity, Folder } from 'lucide-react'
import { PreviewNav } from '../_nav'
import { stats, expertise } from '@/lib/about-data'
import { projects, statusLabel } from '@/lib/projects-data'
import { Reveal } from '@/components/reveal'

export const metadata: Metadata = {
  title: 'Ref3 · 다크 테크',
  robots: { index: false, follow: false },
}

const jb = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '700'], display: 'swap' })
const mono = `${jb.style.fontFamily}, ui-monospace, SFMono-Regular, monospace`

const NAVER = 'https://blog.naver.com/procpalee'
const WIKIDOCS = 'https://wikidocs.net/'
const GITHUB = 'https://github.com/procpalee'
const EMAIL = 'wogus3575@naver.com'

const img = (seed: string, w: number, h: number) => `https://picsum.photos/seed/${seed}/${w}/${h}`

const ticker = [
  'OpenDART MCP 배포',
  'Marklog 정식 출시',
  '클로드 엑셀 가이드 연재중',
  'DCF Peer-Group MCP 개발중',
]

const expIcons = [ShieldCheck, ClipboardCheck, Calculator, LineChart]

export default function Ref3() {
  return (
    <div style={{ background: '#000', color: '#fff', fontFamily: 'Inter, Pretendard, ui-sans-serif, system-ui, sans-serif' }} className="relative">
      <style>{`
        @keyframes r3-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .r3-marquee { animation: r3-marquee 28s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .r3-marquee { animation: none; } }
      `}</style>

      <PreviewNav current="ref3" />

      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.04)_0%,_transparent_50%)]" />

      {/* Marquee banner */}
      <div className="flex w-full overflow-hidden whitespace-nowrap border-b border-white/10 bg-black py-2 text-[10px] uppercase tracking-widest text-white/50" style={{ fontFamily: mono }}>
        <div className="r3-marquee flex min-w-max gap-8">
          {[...ticker, ...ticker, ...ticker, ...ticker].map((t, i) => (
            <span key={i} className="flex items-center gap-8">
              <span>{t}</span>
              <span>•</span>
            </span>
          ))}
        </div>
      </div>

      <main className="relative z-10 px-6 pb-32 md:px-12 lg:px-24">
        {/* Hero */}
        <div className="mx-auto mt-20 grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-[10px] uppercase tracking-widest text-green-400" style={{ fontFamily: mono }}>
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              AI 워크플로우 가동중
            </div>
            <h1 className="text-6xl font-bold leading-[1.05] tracking-tighter md:text-[5.5rem]">
              회계 실무.
              <br />
              <span className="text-white/30">AI로.</span>
              <br />
              자동화.
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-white/50">
              공인회계사 이재현. 감사·내부회계·가치평가 실무를 AI로 자동화하고, 도구와 기록으로 공유합니다.
            </p>

            <div className="mt-12 flex w-full max-w-md items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1.5 pl-5 transition-all focus-within:border-white/30">
              <span className="text-sm text-white/40" style={{ fontFamily: mono }}>
                $ contact
              </span>
              <a href={`mailto:${EMAIL}`} className="ml-auto flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black transition-colors hover:bg-white/90">
                <Sparkles className="h-4 w-4" /> 연락하기
              </a>
            </div>
          </div>

          {/* Device / analysis mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative h-[680px] w-[340px] overflow-hidden rounded-[3rem] border-[8px] border-[#1a1a1a] bg-black shadow-2xl shadow-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img('procpa-analysis', 800, 1600)} alt="" className="h-full w-full object-cover opacity-50" />
              <div className="absolute left-6 right-6 top-6 flex items-center justify-between">
                <div className="flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-[10px] tracking-widest text-white backdrop-blur-md" style={{ fontFamily: mono }}>
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> LIVE
                </div>
                <div className="rounded-full bg-black/40 px-3 py-1.5 text-[10px] text-white backdrop-blur-md" style={{ fontFamily: mono }}>
                  ICFR
                </div>
              </div>
              <div className="absolute bottom-28 left-6 right-6">
                <div className="rounded-2xl border border-white/10 bg-black/60 p-4 backdrop-blur-md">
                  <div className="mb-2 text-[10px] uppercase tracking-widest text-white/40" style={{ fontFamily: mono }}>
                    AI 분석 결과
                  </div>
                  <p className="text-sm leading-snug text-white">통제 미비점 3건 식별 · 자동 조서화 완료</p>
                </div>
              </div>
              <div className="absolute bottom-6 right-6 flex items-center gap-3 rounded-xl border border-white/10 bg-[#111]/90 p-3 shadow-xl backdrop-blur-md">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                  <Activity className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-white/50">처리 시간</div>
                  <div className="mt-0.5 text-lg font-bold leading-none text-white">
                    −82<span className="text-xs font-normal text-white/50">%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent projects list */}
        <div className="mx-auto mt-40 max-w-5xl">
          <Reveal>
            <div className="mb-6 flex items-center justify-between px-2">
              <div className="flex items-center gap-2 text-sm font-medium text-white/80">
                <Folder className="h-4 w-4" /> 프로젝트
              </div>
              <a href={GITHUB} target="_blank" rel="noreferrer" className="text-[10px] uppercase tracking-widest text-white/50 transition-colors hover:text-white" style={{ fontFamily: mono }}>
                View All
              </a>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
              {projects.map((p, i) => {
                const done = p.status === 'live'
                return (
                  <a key={p.key} href={p.liveUrl ?? GITHUB} target="_blank" rel="noreferrer" className={'flex flex-col justify-between gap-4 p-5 transition-colors hover:bg-white/[0.03] sm:flex-row sm:items-center ' + (i < projects.length - 1 ? 'border-b border-white/5' : '')}>
                    <div className="flex items-center gap-4">
                      <div className="relative h-10 w-16 shrink-0 overflow-hidden rounded-md bg-white/5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img(p.key, 200, 120)} alt="" className="h-full w-full object-cover opacity-60" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{p.name}</div>
                        <div className="mt-0.5 text-xs text-white/40">
                          {p.category} · {p.year}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 sm:w-72">
                      <div className="flex-1">
                        <div className={'mb-1.5 flex justify-between text-[10px] ' + (done ? 'text-green-400' : 'text-white/50')} style={{ fontFamily: mono }}>
                          <span>{done ? 'Complete' : 'In Progress'}</span>
                          {done ? <CheckCircle2 className="h-3 w-3" /> : <span>70%</span>}
                        </div>
                        <div className="h-1 overflow-hidden rounded-full bg-white/10">
                          <div className={'h-full rounded-full ' + (done ? 'bg-green-400' : 'bg-white')} style={{ width: done ? '100%' : '70%' }} />
                        </div>
                      </div>
                      <div className="w-24 text-center text-[10px] text-white/50" style={{ fontFamily: mono }}>
                        {statusLabel[p.status]}
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          </Reveal>
        </div>

        {/* Expertise features */}
        <div className="mx-auto mt-48 max-w-5xl text-center">
          <Reveal>
            <h2 className="mb-24 text-5xl font-medium tracking-tight md:text-6xl">
              전문성은 운이 아니다. <span className="text-white/30">설계다.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
            {expertise.map((e, i) => {
              const Icon = expIcons[i] ?? ShieldCheck
              const short = e.title.split(' ')[0]
              return (
                <Reveal key={e.title} delay={(i % 4) * 80} className="group flex cursor-default flex-col items-center">
                  <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.02] transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/[0.05]">
                    <Icon className="h-10 w-10 text-white/60 transition-colors group-hover:text-white" strokeWidth={1.5} />
                  </div>
                  <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50 transition-colors group-hover:text-white/80">
                    {short}
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>

        {/* Stats strip */}
        <div className="mx-auto mt-40 grid max-w-5xl grid-cols-2 gap-8 border-y border-white/10 py-16 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-5xl font-bold tracking-tight">{s.value}</div>
              <div className="mt-2 text-[10px] uppercase tracking-widest text-white/40" style={{ fontFamily: mono }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA footer */}
        <div className="mx-auto mt-40 flex max-w-5xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">함께 만들어요.</h2>
            <p className="max-w-xs text-sm leading-relaxed text-white/40">
              회계·재무 실무의 AI 자동화, 같이 고민합니다.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href={NAVER} target="_blank" rel="noreferrer" className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5">
              Naver Blog
            </a>
            <a href={WIKIDOCS} target="_blank" rel="noreferrer" className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5">
              Wikidocs
            </a>
            <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90">
              연락하기 <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
