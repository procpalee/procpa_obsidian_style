import { Section } from '@/components/home/section'
import { InquiryEmbed } from '@/components/inquiry-embed'

/** Reusable "문의 남기기" section wrapping the hosted inquiry form. */
export function InquirySection({
  service,
  title = '문의 남기기',
  description = '아래 폼을 남겨주시면 검토 후 빠르게 회신드립니다. 이메일·카카오톡으로도 연락하실 수 있습니다.',
}: {
  service?: string
  title?: string
  description?: string
}) {
  return (
    <Section id="inquiry" kicker="Inquiry" title={title} description={description}>
      <InquiryEmbed service={service} />
    </Section>
  )
}
