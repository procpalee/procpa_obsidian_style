import type { Metadata } from 'next'
import { HomeNav } from '../_home-nav'
import { Reveal } from '@/components/reveal'
import { HomeHero, HomeIndex, HomeCta } from '../_home-parts'

export const metadata: Metadata = {
  title: 'Home 시안 A · 미니멀 인덱스',
  robots: { index: false, follow: false },
}

export default function HomeA() {
  return (
    <>
      <HomeNav current="home-a" />
      <HomeHero />
      <Reveal>
        <HomeIndex />
      </Reveal>
      <Reveal>
        <HomeCta />
      </Reveal>
    </>
  )
}
