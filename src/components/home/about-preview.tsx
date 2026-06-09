import { Section, SectionLink } from '@/components/home/section'

const ABOUT_TAGS = [
  '회계감사 (Audit & Assurance)',
  '내부회계 (ICFR)',
  '평가 및 회계자문 (Valuation & PA)',
  '원가분석 및 정책 (Cost Analysis & Policy)',
]

export function AboutPreview() {
  return (
    <Section
      id="about"
      kicker="About"
      title="자기소개"
      description="회계감사·내부회계·평가 등 실무를 거치며 쌓은 전문성 위에, 데이터·AI를 더해 일하는 방식을 바꾸고 있습니다."
      action={<SectionLink href="/about">소개 전체 보기 →</SectionLink>}
    >
      <div className="flex flex-wrap gap-2">
        {ABOUT_TAGS.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border/60 px-4 py-2 text-base text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </Section>
  )
}
