import type { Metadata } from 'next'
import { FxNav } from '../_fx-nav'
import { HeroFxShell } from '@/components/home/hero-fx/hero-fx-shell'
import { ColorFlowBg } from '@/components/home/hero-fx/color-flow'
import { HomeIndex } from '@/components/home/home-index'
import { CtaBlock } from '@/components/home/cta-block'
import { Reveal } from '@/components/reveal'

export const metadata: Metadata = {
  title: '화려한 히어로 B · 컬러 플로우',
  robots: { index: false, follow: false },
}

export default function FxB() {
  return (
    <>
      <FxNav current="fx-b" />
      <HeroFxShell bg={<ColorFlowBg />} />
      <Reveal>
        <HomeIndex />
      </Reveal>
      <Reveal>
        <CtaBlock />
      </Reveal>
    </>
  )
}
