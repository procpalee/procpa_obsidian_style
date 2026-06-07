import { Section } from '@/components/home/section'
import { services } from '@/lib/services-data'

const EMAIL = 'wogus3575@naver.com'

export function ServicesGrid() {
  return (
    <Section
      id="services"
      kicker="Services"
      title="함께 일하는 방법"
      description="회계 도메인 전문성과 AI 활용 역량을 결합해, 까다로운 실무 과제를 함께 풀어드립니다."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {services.map((s) => (
          <div
            key={s.key}
            className="group flex flex-col rounded-xl border border-border/60 p-6 transition-all hover:border-foreground/40 hover:shadow-sm"
          >
            <h3 className="text-[17px] font-semibold tracking-tight">{s.title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{s.summary}</p>

            <ul className="mt-4 space-y-2">
              {s.outcomes.map((o) => (
                <li
                  key={o}
                  className="flex gap-2 text-[13px] leading-relaxed text-muted-foreground"
                >
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary" />
                  {o}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
              <span className="font-mono text-[11px] text-muted-foreground">{s.forWhom}</span>
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(`[${s.title}] 문의`)}`}
                className="shrink-0 text-[12px] font-medium text-primary transition-opacity hover:opacity-80"
              >
                {s.cta} →
              </a>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
