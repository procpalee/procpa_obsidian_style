import type { Metadata } from 'next'
import { HeroNav } from '../_hero-nav'
import { HeroShell } from '@/components/home/hero-shell'
import { GridBg } from '@/components/home/hero-bg/grid'
import { HomeIndex } from '@/components/home/home-index'
import { CtaBlock } from '@/components/home/cta-block'
import { Reveal } from '@/components/reveal'

export const metadata: Metadata = {
  title: 'Hero 배경 C · 드리프팅 그리드',
  robots: { index: false, follow: false },
}

export default function HeroC() {
  return (
    <>
      <HeroNav current="hero-c" />
      <HeroShell bg={<GridBg />} />
      <Reveal>
        <HomeIndex />
      </Reveal>
      <Reveal>
        <CtaBlock />
      </Reveal>
    </>
  )
}
