import { Section, SectionLink } from '@/components/home/section'
import { expertise } from '@/lib/about-data'

export function AboutPreview() {
  return (
    <Section
      id="about"
      kicker="About"
      title="회계와 AI를 잇는 사람"
      description="회계감사·내부회계·평가·원가 실무를 거치며 쌓은 전문성 위에, 데이터·AI를 더해 일하는 방식을 바꾸고 있습니다."
      action={<SectionLink href="/about">소개 전체 보기 →</SectionLink>}
    >
      <div className="flex flex-wrap gap-2">
        {expertise.map((e) => (
          <span
            key={e.title}
            className="rounded-full border border-border/60 px-3.5 py-1.5 text-[13px] text-muted-foreground"
          >
            {e.title}
          </span>
        ))}
      </div>
    </Section>
  )
}
