import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import { ArrowRight, Mail, ShieldCheck, ClipboardCheck, Calculator, LineChart, Cpu, FileText } from 'lucide-react'
import { PreviewNav } from '../_nav'
import { stats } from '@/lib/about-data'
import { projects } from '@/lib/projects-data'
import { Reveal } from '@/components/reveal'

export const metadata: Metadata = {
  title: 'Ref2 · 모던 미니멀',
  robots: { index: false, follow: false },
}

const outfit = Outfit({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], display: 'swap' })
const display = `${outfit.style.fontFamily}, Pretendard, ui-sans-serif, system-ui, sans-serif`

const NAVER = 'https://blog.naver.com/procpalee'
const WIKIDOCS = 'https://wikidocs.net/'
const GITHUB = 'https://github.com/procpalee'
const EMAIL = 'wogus3575@naver.com'

const img = (seed: string, w: number, h: number, extra = '') =>
  `https://picsum.photos/seed/${seed}/${w}/${h}${extra}`

const caps = [
  { icon: ShieldCheck, label: '회계감사' },
  { icon: ClipboardCheck, label: '내부회계관리제도' },
  { icon: Calculator, label: '가치평가·회계자문' },
  { icon: LineChart, label: '원가분석·정책' },
  { icon: Cpu, label: 'AI 실무 자동화' },
  { icon: FileText, label: '콘텐츠·집필' },
]

export default function Ref2() {
  return (
    <div style={{ background: '#fafafa', color: '#171717' }}>
      <PreviewNav current="ref2" />

      <main className="pb-24">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-6 pb-24 pt-16 md:pb-32 md:pt-24">
          <div className="max-w-4xl">
            <h1 style={{ fontFamily: display }} className="mb-8 text-5xl font-medium leading-[1.05] tracking-tight text-neutral-900 md:text-7xl lg:text-[5.5rem]">
              회계 전문성에
              <br className="hidden md:block" /> AI 생산성을 더합니다
            </h1>
            <p className="mb-12 max-w-2xl text-lg leading-relaxed text-neutral-600 md:text-xl">
              공인회계사 이재현. 감사·내부회계·가치평가 실무에 AI를 접목하고, 그 과정을 글과 도구로 공유합니다.
            </p>
            <a href="#work" className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-8 py-4 font-medium text-neutral-50 transition-all hover:gap-3 hover:bg-neutral-800">
              작업 살펴보기
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <Reveal className="relative mt-24 aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl shadow-neutral-900/5 md:aspect-[21/9]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img('procpa-hero', 2400, 1200, '?blur=1')} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent" />
          </Reveal>
        </section>

        {/* Work */}
        <section id="work" className="mx-auto max-w-7xl px-6 py-24">
          <Reveal className="mb-16">
            <h2 style={{ fontFamily: display }} className="text-3xl font-medium tracking-tight md:text-4xl">
              주요 프로젝트
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal key={p.key} delay={(i % 2) * 100}>
                <a href={p.liveUrl ?? GITHUB} target="_blank" rel="noreferrer" className="group block">
                  <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img(p.key, 1200, 900)} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/0 transition-colors duration-500 group-hover:bg-neutral-900/10">
                      <div className="translate-y-4 rounded-full bg-white/90 px-6 py-3 text-sm font-medium text-neutral-900 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        자세히 보기
                      </div>
                    </div>
                  </div>
                  <h3 style={{ fontFamily: display }} className="mb-2 text-2xl font-medium transition-colors group-hover:text-neutral-600">
                    {p.name}
                  </h3>
                  <p className="text-sm uppercase tracking-wide text-neutral-500">{p.tagline}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="bg-neutral-100 py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
              <Reveal className="lg:col-span-4">
                <h2 style={{ fontFamily: display }} className="text-3xl font-medium tracking-tight md:text-4xl">
                  소개
                </h2>
              </Reveal>
              <div className="lg:col-span-8">
                <Reveal>
                  <p style={{ fontFamily: display }} className="mb-12 text-2xl font-medium leading-tight text-neutral-900 md:text-3xl lg:text-4xl">
                    상장·비상장 감사, 내부회계관리제도 구축, 공정가치평가, 방산물자 원가계산까지. 다양한 실무 위에
                    AI를 얹어 더 빠르고 정확한 결과물을 만듭니다.
                  </p>
                </Reveal>
                <div className="mb-16 grid grid-cols-2 gap-8 border-t border-neutral-200 pt-12 md:grid-cols-4">
                  {stats.map((s, i) => (
                    <Reveal key={s.label} delay={i * 80}>
                      <h4 style={{ fontFamily: display }} className="mb-2 text-4xl font-medium text-neutral-900">
                        {s.value}
                      </h4>
                      <p className="font-medium text-neutral-600">{s.label}</p>
                    </Reveal>
                  ))}
                </div>
                <Reveal className="flex items-center gap-6">
                  <span className="text-sm font-medium uppercase tracking-wider text-neutral-500">글은 이곳에서</span>
                  <div className="flex flex-wrap gap-3">
                    <a href={NAVER} target="_blank" rel="noreferrer" className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-all hover:border-neutral-900 hover:bg-neutral-900 hover:text-white">
                      Naver Blog
                    </a>
                    <a href={WIKIDOCS} target="_blank" rel="noreferrer" className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-all hover:border-neutral-900 hover:bg-neutral-900 hover:text-white">
                      Wikidocs
                    </a>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <Reveal className="mb-20 text-center">
            <h2 style={{ fontFamily: display }} className="mb-6 text-3xl font-medium tracking-tight md:text-4xl">
              전문 분야
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-600">회계 실무와 AI를 잇는 작업 영역입니다.</p>
          </Reveal>
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 md:gap-y-16">
            {caps.map((c, i) => {
              const Icon = c.icon
              return (
                <Reveal key={c.label} delay={(i % 3) * 80} className="group flex flex-col items-center text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 transition-colors duration-300 group-hover:bg-neutral-900 group-hover:text-white">
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-medium text-neutral-900">{c.label}</h3>
                </Reveal>
              )
            })}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="bg-neutral-900 py-24 text-neutral-50 md:py-32">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <Reveal>
              <h2 style={{ fontFamily: display }} className="mb-6 text-4xl font-medium tracking-tight md:text-6xl">
                함께 일해요
              </h2>
              <p className="mx-auto mb-12 max-w-2xl text-lg text-neutral-400 md:text-xl">
                업무 문의부터 가벼운 커피챗까지 환영합니다.
              </p>
              <a href={`mailto:${EMAIL}`} className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-medium text-neutral-900 transition-all hover:gap-3 hover:bg-neutral-200">
                <Mail className="h-4 w-4" />
                이메일 보내기
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  )
}
