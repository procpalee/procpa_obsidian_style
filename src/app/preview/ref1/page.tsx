import type { Metadata } from 'next'
import { Playfair_Display, Nanum_Myeongjo } from 'next/font/google'
import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react'
import { PreviewNav } from '../_nav'
import { GithubIcon } from '@/components/social-icons'
import { stats, expertise } from '@/lib/about-data'
import { projects } from '@/lib/projects-data'
import { Reveal } from '@/components/reveal'

export const metadata: Metadata = {
  title: 'Ref1 · 에디토리얼 갤러리',
  robots: { index: false, follow: false },
}

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'], style: ['normal', 'italic'], display: 'swap' })
const myeongjo = Nanum_Myeongjo({ weight: ['400', '700', '800'], display: 'swap', preload: false })
const serif = `${playfair.style.fontFamily}, ${myeongjo.style.fontFamily}, serif`

const NAVER = 'https://blog.naver.com/procpalee'
const WIKIDOCS = 'https://wikidocs.net/'
const GITHUB = 'https://github.com/procpalee'
const KAKAO = 'https://open.kakao.com/o/sQCXbyXg'
const EMAIL = 'wogus3575@naver.com'

const img = (seed: string, w: number, h: number, extra = '') =>
  `https://picsum.photos/seed/${seed}/${w}/${h}${extra}`

export default function Ref1() {
  return (
    <div style={{ background: '#F9F9F7', color: '#111111' }}>
      <PreviewNav current="ref1" />

      {/* Hero — full-bleed image + overlay */}
      <section className="relative flex min-h-[88vh] w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img('procpa-accounting', 1920, 1080, '?blur=6&grayscale')} alt="" className="h-full w-full scale-110 object-cover opacity-90" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#F9F9F7]" />
        </div>
        <div className="relative z-10 mx-auto mt-16 max-w-5xl px-6 text-center text-white">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-white/80">이재현 · 공인회계사 (CPA)</p>
          <h1 style={{ fontFamily: serif }} className="mb-6 text-5xl leading-[1.1] tracking-tight md:text-7xl lg:text-8xl">
            회계의 깊이에,
            <br />
            <span className="italic">AI의 속도를.</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg font-light text-white/90 md:text-xl">
            감사·내부회계·가치평가 실무에 AI를 접목하고, 그 과정을 글과 프로젝트로 공유합니다.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="#work" className="rounded-full bg-white px-8 py-4 text-sm font-medium uppercase tracking-widest text-black transition-colors hover:bg-gray-100">
              프로젝트 보기
            </a>
            <a href="#contact" className="rounded-full border border-white/50 px-8 py-4 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white/10">
              연락하기
            </a>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <h2 style={{ fontFamily: serif }} className="mb-8 text-3xl italic text-gray-500 md:text-5xl">
              “전문성은 깊이에서, 생산성은 도구에서.”
            </h2>
            <p className="text-lg font-light leading-relaxed text-[#111] md:text-2xl">
              7년간의 회계감사·내부회계·가치평가 실무 위에 AI를 얹어, 반복은 자동화하고 판단에 집중합니다. 그
              과정에서 만든 도구와 기록을 나눕니다.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Work gallery */}
      <section id="work" className="mx-auto max-w-[1600px] px-6 py-24 md:px-12">
        <div className="mb-16 flex items-end justify-between border-b border-gray-300 pb-6">
          <h2 style={{ fontFamily: serif }} className="text-4xl md:text-5xl">
            The Work
          </h2>
          <span className="hidden font-mono text-xs uppercase tracking-widest text-gray-500 md:block">
            Selected Projects
          </span>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.key} delay={(i % 3) * 80}>
              <a href={p.liveUrl ?? GITHUB} target="_blank" rel="noreferrer" className="group block cursor-pointer">
                <div className="relative mb-6 aspect-[4/5] overflow-hidden bg-gray-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img(p.key, 800, 1000)} alt={p.name} className="h-full w-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-500 group-hover:bg-black/40">
                    <div className="flex translate-y-4 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      자세히 <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
                <h3 style={{ fontFamily: serif }} className="mb-1 text-2xl">
                  {p.name}
                </h3>
                <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                  <p>{p.tagline}</p>
                  <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs">{p.category}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured / About */}
      <section className="mx-auto max-w-[1600px] px-6 py-28 md:px-12">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <Reveal className="aspect-[4/5] overflow-hidden bg-gray-200 lg:aspect-square">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img('profile-portrait', 1000, 1000, '?grayscale')} alt="프로필" className="h-full w-full object-cover" />
          </Reveal>
          <Reveal delay={150} className="lg:pl-12">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-gray-500">About</p>
            <h2 style={{ fontFamily: serif }} className="mb-8 text-5xl leading-[1.1] md:text-6xl">
              숫자 너머의
              <br />
              <span className="italic">맥락을 설계합니다.</span>
            </h2>
            <p className="mb-12 text-lg font-light leading-relaxed text-gray-600">
              상장·비상장 감사 In-charge, 내부회계관리제도 구축, 재무보고목적 공정가치평가, 방산물자 원가계산까지 —
              다양한 산업과 영역의 실무를 거쳤습니다. 지금은 AI로 그 실무를 더 빠르고 정확하게 만드는 일에
              집중합니다.
            </p>
            <div className="grid grid-cols-2 gap-6 border-t border-gray-200 pt-8 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <p style={{ fontFamily: serif }} className="mb-1 text-3xl">
                    {s.value}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Expertise — dark */}
      <section className="bg-[#111111] px-6 py-28 text-white md:px-12">
        <div className="mx-auto max-w-[1600px]">
          <h2 style={{ fontFamily: serif }} className="mb-16 text-4xl md:text-5xl">
            전문 분야
          </h2>
          <div className="grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2">
            {expertise.map((e, i) => (
              <Reveal key={e.title} delay={(i % 2) * 100} className="flex gap-6 border-t border-white/10 pt-8">
                <span style={{ fontFamily: serif }} className="text-2xl text-white/40">
                  0{i + 1}
                </span>
                <div>
                  <h3 style={{ fontFamily: serif }} className="mb-3 text-2xl">
                    {e.title}
                  </h3>
                  <ul className="space-y-2 font-light leading-relaxed text-gray-400">
                    {e.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Writing + Contact — dark */}
      <section id="contact" className="border-t border-white/10 bg-[#111111] px-6 py-28 text-white">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <h2 style={{ fontFamily: serif }} className="mb-6 text-5xl leading-[1.1] md:text-7xl">
              함께
              <br />
              <span className="italic">만들어요.</span>
            </h2>
            <p className="mb-12 max-w-md text-lg font-light text-gray-400">
              업무 문의부터 가벼운 커피챗까지 환영합니다.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-medium uppercase tracking-widest text-black transition-colors hover:bg-gray-200">
                <Mail className="h-4 w-4" /> 이메일
              </a>
              <a href={KAKAO} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-sm font-medium uppercase tracking-widest transition-colors hover:bg-white/10">
                <MessageCircle className="h-4 w-4" /> 오픈채팅
              </a>
              <a href={GITHUB} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-sm font-medium uppercase tracking-widest transition-colors hover:bg-white/10">
                <GithubIcon className="h-4 w-4" /> GitHub
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-gray-500">글은 이곳에서</p>
            {[
              { label: 'Naver Blog', handle: '@procpalee', href: NAVER },
              { label: 'Wikidocs', handle: '온라인 가이드북', href: WIKIDOCS },
            ].map((w) => (
              <a key={w.label} href={w.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between border-b border-white/10 pb-4 transition-colors hover:border-white/40">
                <span style={{ fontFamily: serif }} className="text-2xl">
                  {w.label}
                </span>
                <span className="flex items-center gap-2 text-sm text-gray-400">
                  {w.handle} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
