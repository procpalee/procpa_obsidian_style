import type { Metadata } from 'next'
import { JsonLd, websiteJsonLd, personJsonLd } from '@/components/json-ld'
import { socials } from '@/components/social-icons'
import { Reveal } from '@/components/reveal'
import { Hero } from '@/components/home/hero'
import { Approach } from '@/components/home/approach'
import { ServicesTeaser } from '@/components/home/services-teaser'
import { CtaBlock } from '@/components/home/cta-block'
import { content } from '@/lib/site-content'

export const metadata: Metadata = {
  title: content.meta.home.title,
  description: content.meta.home.description,
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
