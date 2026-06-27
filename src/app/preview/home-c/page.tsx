import type { Metadata } from 'next'
import { HomeNav } from '../_home-nav'
import { Reveal } from '@/components/reveal'
import { HomeHero, HomeMarquee, HomeFeatured, HomeIndex, HomeCta } from '../_home-parts'

export const metadata: Metadata = {
  title: 'Home 시안 C · 마키 + 대표작',
  robots: { index: false, follow: false },
}

export default function HomeC() {
  return (
    <>
      <HomeNav current="home-c" />
      <HomeHero />
      <HomeMarquee />
      <Reveal>
        <HomeFeatured />
      </Reveal>
      <Reveal>
        <HomeIndex />
      </Reveal>
      <Reveal>
        <HomeCta />
      </Reveal>
    </>
  )
}
