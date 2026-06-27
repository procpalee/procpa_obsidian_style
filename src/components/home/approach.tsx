import { ShieldCheck, Sparkles, Hammer } from 'lucide-react'
import { Section } from '@/components/home/section'

const points = [
  {
    icon: ShieldCheck,
    title: '회계 실무의 깊이',
    desc: '감사·내부회계관리제도·가치평가·원가까지, 상장·비상장 현장에서 In-charge로 쌓은 실무 전문성.',
  },
  {
    icon: Sparkles,
    title: 'AI로 끌어올린 생산성',
    desc: '실무에 바로 쓰는 AI 워크플로우를 설계해 반복은 자동화하고 판단에 집중합니다.',
  },
  {
    icon: Hammer,
    title: '직접 만드는 실행력',
    desc: '필요한 도구·MCP 서버를 직접 개발·배포합니다. 말이 아니라 결과물로 증명합니다.',
  },
]

/** 강점 — 왜 나인가. 회계 깊이 + AI 생산성 + 실행력. (설득형, 메뉴 페이지와 중복 없음) */
export function Approach() {
  return (
    <Section
      kicker="Approach"
      title="회계 전문성과 AI, 그리고 실행력"
      description="깊이 있는 회계 실무 위에 AI 생산성과 직접 만드는 실행력을 더합니다."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {points.map((p) => {
          const Icon = p.icon
          return (
            <div
              key={p.title}
              className="flex flex-col rounded-2xl border border-border/60 p-7 transition-all hover:-translate-y-0.5 hover:border-foreground/40"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{p.desc}</p>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
