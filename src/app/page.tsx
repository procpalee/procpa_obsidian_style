import type { Metadata } from 'next'
import { JsonLd, websiteJsonLd, personJsonLd } from '@/components/json-ld'
import { socials } from '@/components/social-icons'
import { Reveal } from '@/components/reveal'
import { Hero } from '@/components/home/hero'
import { Approach } from '@/components/home/approach'
import { ServicesTeaser } from '@/components/home/services-teaser'
import { CtaBlock } from '@/components/home/cta-block'

export const metadata: Metadata = {
  title: 'PROCPA — 이재현',
  description:
    '한국공인회계사 이재현. 회계·재무 전문성에 AI의 생산성을 더합니다. 회계 자문·AI 도입·AX 컨설팅·강의·협업 문의를 받습니다.',
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <JsonLd
        data={personJsonLd({
          sameAs: socials
            .filter((s) => s.href.startsWith('http'))
            .map((s) => s.href),
        })}
      />
      <Hero />
      <Reveal>
        <Approach />
      </Reveal>
      <Reveal>
        <ServicesTeaser />
      </Reveal>
      <Reveal>
        <CtaBlock />
      </Reveal>
    </>
  )
}
