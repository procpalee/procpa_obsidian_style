import type { Metadata } from 'next'
import { PageHero, type PageHeroVariant } from '@/components/page-hero'

export const metadata: Metadata = {
  title: '히어로 시안 비교',
  robots: { index: false, follow: false },
}

const samples: { en: string; ko: string; description: string }[] = [
  {
    en: 'About',
    ko: '소개',
    description: '회계·재무 전문성과 AI의 생산성을 모두 갖춘 새로운 시대의 전문가를 지향합니다.',
  },
  {
    en: 'Writing',
    ko: '블로그',
    description: '회계·재무 실무와 AI 활용에 관한 기록과, 깊이 있게 정리한 시리즈 가이드입니다.',
  },
  {
    en: 'Projects',
    ko: '직접 만든 도구들',
    description: '실무에서 마주친 불편함을 코드로 풀어, 웹과 MCP 서버로 배포해 운영합니다.',
  },
  {
    en: 'Contact',
    ko: '문의하기',
    description: '회계·재무 자문부터 AI 도입, 강의·집필, 협업 제안까지 — 어떤 주제든 편하게 연락주세요.',
  },
]

const variants: { variant: PageHeroVariant; title: string; note: string }[] = [
  { variant: 'display', title: '시안 1 — 영문 강조형 (display)', note: '큰 영문 제목을 메인으로, 한글/설명을 보조로.' },
  { variant: 'eyebrow', title: '시안 3 — 구조 유지형 (eyebrow)', note: '영문 mono 라벨 확대 + 한글 h1. 기존 구조 유지.' },
]

export default function HeroPreviewPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
      <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        Preview · noindex
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">서브페이지 히어로 시안 비교</h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
        소개·블로그·프로젝트·문의 히어로를 두 시안으로 렌더했습니다. 선택한 시안을 기본값으로
        전 서브페이지에 일괄 적용하고, 이 페이지는 제거합니다.
      </p>

      {variants.map((v) => (
        <section key={v.variant} className="mt-16 border-t border-border/60 pt-12">
          <h2 className="text-xl font-bold tracking-tight">{v.title}</h2>
          <p className="mt-1 text-[13px] text-muted-foreground">{v.note}</p>
          <div className="mt-8 space-y-12">
            {samples.map((s) => (
              <div key={s.en} className="rounded-xl border border-border/60 p-6 sm:p-8">
                <PageHero
                  en={s.en}
                  ko={s.ko}
                  description={s.description}
                  variant={v.variant}
                />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
