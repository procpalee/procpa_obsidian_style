import type { Metadata } from 'next'
import { HeroNav } from '../_hero-nav'
import { HeroShell } from '@/components/home/hero-shell'
import { FlowBg } from '@/components/home/hero-bg/flow'
import { HomeIndex } from '@/components/home/home-index'
import { CtaBlock } from '@/components/home/cta-block'
import { Reveal } from '@/components/reveal'

export const metadata: Metadata = {
  title: 'Hero 배경 B · 플로우 필드',
  robots: { index: false, follow: false },
}

export default function HeroB() {
  return (
    <>
      <HeroNav current="hero-b" />
      <HeroShell bg={<FlowBg />} />
      <Reveal>
        <HomeIndex />
      </Reveal>
      <Reveal>
        <CtaBlock />
      </Reveal>
    </>
  )
}
