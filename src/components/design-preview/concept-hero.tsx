import type { CSSProperties } from 'react'
import type { DesignConcept } from '@/lib/design-concepts'

const CREDS = ['한국공인회계사', 'CISA', '원가분석사', '데이터사이언스 석사과정']

/**
 * 컨셉별 히어로. heroStyle에 따라 표현 방식이 달라진다.
 * - plain: 큰 헤딩 + 가치제안 + CTA
 * - split: 좌(헤딩) / 우(메타) 2단 그리드, Swiss 느낌
 * - band: 풀폭 솔리드 컬러 밴드 + 골드 헤어라인 (Advisory)
 */
export function ConceptHero({ concept }: { concept: DesignConcept }) {
  const headingStyle = { fontFamily: concept.fontHeading } as CSSProperties

  if (concept.heroStyle === 'band') {
    return (
      <section className="px-6 py-16 sm:px-10">
        <div
          className="relative overflow-hidden rounded-[var(--radius)] bg-primary px-8 py-14 text-primary-foreground sm:px-12 sm:py-16"
        >
          <div
            className="absolute left-0 top-0 h-full w-1"
            style={{ background: concept.accent }}
          />
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-70">
            CPA × AI · 업무 제안
          </p>
          <h1
            style={headingStyle}
            className="mt-5 max-w-2xl text-3xl font-semibold leading-[1.25] tracking-tight sm:text-[2.75rem]"
          >
            회계·재무 전문성에{' '}
            <span style={{ color: concept.accent }}>AI의 생산성</span>을
            더합니다.
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed opacity-80">
            한국공인회계사 이재현. 결산·내부회계 자문부터 AI 도입 컨설팅까지,
            실무에 바로 쓰이는 결과로 증명합니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center rounded-[var(--radius)] bg-primary-foreground px-5 py-2.5 text-sm font-medium text-primary">
              업무 제안하기
            </span>
            <span className="inline-flex items-center rounded-[var(--radius)] border border-primary-foreground/30 px-5 py-2.5 text-sm">
              서비스 보기
            </span>
          </div>
        </div>
      </section>
    )
  }

  if (concept.heroStyle === 'split') {
    return (
      <section className="border-b border-border px-6 py-16 sm:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Korean CPA · AI Consultant
            </p>
            <h1
              style={headingStyle}
              className="mt-5 text-4xl font-semibold leading-[1.15] tracking-tight sm:text-5xl"
            >
              회계의 정밀함,
              <br />
              <span className="text-primary">AI의 속도.</span>
            </h1>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
              한국공인회계사 이재현. 까다로운 회계 이슈와 AI 워크플로우를
              한 번에 풀어내는 자문 파트너.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center rounded-[var(--radius)] bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
                업무 제안하기
              </span>
              <span className="inline-flex items-center rounded-[var(--radius)] border border-border px-5 py-2.5 text-sm">
                포트폴리오
              </span>
            </div>
          </div>
          <div className="md:col-span-4 md:border-l md:border-border md:pl-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Credentials
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              {CREDS.map((c) => (
                <li key={c} className="flex items-baseline gap-2">
                  <span className="text-primary">—</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    )
  }

  // plain
  return (
    <section className="px-6 py-20 sm:px-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        Korean CPA · AI Consultant
      </p>
      <h1
        style={headingStyle}
        className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.2] tracking-tight sm:text-[3.25rem]"
      >
        회계·재무 전문성에{' '}
        <span className="text-primary">AI의 생산성</span>을 더합니다.
      </h1>
      <p className="mt-6 max-w-xl text-[15px] leading-[1.8] text-muted-foreground sm:text-base">
        한국공인회계사 이재현. 결산·내부회계 자문부터 AI 도입 컨설팅,
        강의·집필까지 — 실무에 바로 쓰이는 결과로 증명합니다.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <span className="inline-flex items-center rounded-[var(--radius)] bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
          업무 제안하기
        </span>
        <span className="inline-flex items-center rounded-[var(--radius)] border border-border px-5 py-2.5 text-sm">
          서비스 보기
        </span>
      </div>
      <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-6 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        {CREDS.map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>
    </section>
  )
}
