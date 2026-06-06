import { Eyebrow } from './section-ui'

/** 포지셔닝/철학 — split 컬럼 + pull quote (CMDS "The Idea" 패턴 차용) */
export function PhilosophySection() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <Eyebrow>Positioning</Eyebrow>
          <blockquote className="mt-4 text-[clamp(1.375rem,2.6vw,2rem)] font-semibold leading-[1.3] tracking-[-0.02em]">
            회계사는 숫자를 다루고,{' '}
            <span className="text-primary">AI는 반복을 없앱니다.</span> 둘을 잇는
            사람이 가장 빠르게 일합니다.
          </blockquote>
        </div>
        <div className="space-y-4 text-[15px] leading-[1.7] text-muted-foreground md:col-span-6 md:col-start-7">
          <p>
            7년 넘게 회계감사·내부회계·평가 실무를 해오며, 반복적이고 소모적인
            업무가 전문가의 시간을 얼마나 잠식하는지 절감했습니다.
          </p>
          <p>
            그래서 회계 전문성 위에 데이터사이언스와 AI를 더했습니다. Claude,
            MCP, 자동화 워크플로우를 실무에 녹여 같은 시간에 더 깊은 결과를
            만들어 냅니다.
          </p>
          <p>
            이 사이트는 그 과정에서 얻은 인사이트를 기록하고, 함께 일할 분들과
            연결되기 위한 공간입니다.
          </p>
        </div>
      </div>
    </section>
  )
}
