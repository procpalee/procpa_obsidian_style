import type { Metadata } from 'next'
import { JsonLd, websiteJsonLd, personJsonLd } from '@/components/json-ld'
import { socials } from '@/components/social-icons'
import { getLastPushDate } from '@/lib/last-updated'
import { Reveal } from '@/components/reveal'
import { Hero } from '@/components/home/hero'
import { StatsStrip } from '@/components/home/stats-strip'
import { AboutPreview } from '@/components/home/about-preview'
import { SeriesHighlights } from '@/components/home/series-highlights'
import { BlogHighlights } from '@/components/home/blog-highlights'
import { ProjectsGrid } from '@/components/home/projects-grid'
import { FollowBand } from '@/components/home/follow-band'
import { CtaBlock } from '@/components/home/cta-block'

export const metadata: Metadata = {
  title: 'PROCPA — 이재현',
  description:
    '한국공인회계사 이재현. 회계·재무 전문성에 AI의 생산성을 더합니다. 글·도구·강의로 실무 인사이트를 공유합니다.',
}

export default function HomePage() {
  const lastUpdated = getLastPushDate()

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
      <Hero updated={lastUpdated} />
      <StatsStrip />
      <Reveal>
        <AboutPreview />
      </Reveal>
      <Reveal>
        <SeriesHighlights />
      </Reveal>
      <Reveal>
        <BlogHighlights />
      </Reveal>
      <Reveal>
        <ProjectsGrid limit={3} />
      </Reveal>
      <Reveal>
        <FollowBand />
      </Reveal>
      <Reveal>
        <CtaBlock />
      </Reveal>
    </>
  )
}
