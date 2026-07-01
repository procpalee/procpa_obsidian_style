import type { Metadata } from 'next'
import { JsonLd, websiteJsonLd, personJsonLd } from '@/components/json-ld'
import { socials } from '@/components/social-icons'
import { Reveal } from '@/components/reveal'
import { Hero } from '@/components/home/hero'
import { CredentialMarquee } from '@/components/home/credential-marquee'
import { ServicesIndex } from '@/components/home/services-index'
import { ProofStats } from '@/components/home/proof-stats'
import { WorksStrip } from '@/components/home/works-strip'
import { ContactFinale } from '@/components/home/contact-finale'
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
      <CredentialMarquee />
      <Reveal>
        <ServicesIndex />
      </Reveal>
      <Reveal>
        <ProofStats />
      </Reveal>
      <Reveal>
        <WorksStrip />
      </Reveal>
      <Reveal>
        <ContactFinale />
      </Reveal>
    </>
  )
}
