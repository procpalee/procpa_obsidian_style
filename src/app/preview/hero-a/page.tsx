import type { Metadata } from 'next'
import { HeroNav } from '../_hero-nav'
import { HeroShell } from '@/components/home/hero-shell'
import { ParticlesBg } from '@/components/home/hero-bg/particles'
import { HomeIndex } from '@/components/home/home-index'
import { CtaBlock } from '@/components/home/cta-block'
import { Reveal } from '@/components/reveal'

export const metadata: Metadata = {
  title: 'Hero 배경 A · 컨스텔레이션',
  robots: { index: false, follow: false },
}

export default function HeroA() {
  return (
    <>
      <HeroNav current="hero-a" />
      <HeroShell bg={<ParticlesBg />} />
      <Reveal>
        <HomeIndex />
      </Reveal>
      <Reveal>
        <CtaBlock />
      </Reveal>
    </>
  )
}
