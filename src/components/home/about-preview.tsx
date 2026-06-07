import { Section, SectionLink } from '@/components/home/section'
import { expertise, career } from '@/lib/about-data'

export function AboutPreview() {
  return (
    <Section
      id="about"
      kicker="About"
      title="회계와 AI를 잇는 사람"
      description="회계감사·내부회계·평가 실무를 거치며 쌓은 전문성 위에, 데이터·AI를 더해 일하는 방식을 바꾸고 있습니다."
      action={<SectionLink href="/about">소개 전체 보기 →</SectionLink>}
    >
      {/* Expertise grid */}
      <div className="grid gap-3 sm:grid-cols-2">
        {expertise.map((e) => (
          <div
            key={e.title}
            className="rounded-xl border border-border/60 p-5 transition-colors hover:border-foreground/40"
          >
            <h3 className="text-[15px] font-semibold tracking-tight">{e.title}</h3>
            <ul className="mt-2.5 space-y-1.5">
              {e.items.map((item) => (
                <li key={item} className="text-[13px] leading-relaxed text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Career strip */}
      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-border/60 px-5 py-4 font-mono text-[12px] text-muted-foreground">
        <span className="uppercase tracking-wider text-muted-foreground/60">Career</span>
        {career.map((c, i) => (
          <span key={c.title} className="flex items-center gap-3">
            {i > 0 && <span className="text-border">·</span>}
            <span className="text-foreground">{c.title}</span>
          </span>
        ))}
      </div>
    </Section>
  )
}
