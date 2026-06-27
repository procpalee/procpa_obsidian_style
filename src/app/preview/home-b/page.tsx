import type { Metadata } from 'next'
import { HomeNav } from '../_home-nav'
import { Reveal } from '@/components/reveal'
import { HomeHero, HomeStats, HomeIndex, HomeCta } from '../_home-parts'

export const metadata: Metadata = {
  title: 'Home 시안 B · 스탯 임팩트',
  robots: { index: false, follow: false },
}

export default function HomeB() {
  return (
    <>
      <HomeNav current="home-b" />
      <HomeHero />
      <Reveal>
        <HomeStats />
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
