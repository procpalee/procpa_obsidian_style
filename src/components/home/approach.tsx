import { ShieldCheck, Sparkles, Hammer } from 'lucide-react'
import { Section } from '@/components/home/section'
import { content } from '@/lib/site-content'

const t = content.home.approach
// 아이콘은 코드에서, 문구는 site-content.ts(home.approach.points)에서 — 순서대로 매칭.
const icons = [ShieldCheck, Sparkles, Hammer]
const points = t.points.map((p, i) => ({ ...p, icon: icons[i] ?? ShieldCheck }))

/** 강점 — 왜 나인가. 회계 깊이 + AI 생산성 + 실행력. (설득형, 메뉴 페이지와 중복 없음) */
export function Approach() {
  return (
    <Section kicker={t.kicker} title={t.title} description={t.description}>
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
