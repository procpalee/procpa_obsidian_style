import type { Metadata } from 'next'
import { FxNav } from '../_fx-nav'
import { HeroFxShell } from '@/components/home/hero-fx/hero-fx-shell'
import { SpotlightBg } from '@/components/home/hero-fx/spotlight'
import { HomeIndex } from '@/components/home/home-index'
import { CtaBlock } from '@/components/home/cta-block'
import { Reveal } from '@/components/reveal'

export const metadata: Metadata = {
  title: '화려한 히어로 C · 코닉 스포트라이트',
  robots: { index: false, follow: false },
}

export default function FxC() {
  return (
    <>
      <FxNav current="fx-c" />
      <HeroFxShell bg={<SpotlightBg />} />
      <Reveal>
        <HomeIndex />
      </Reveal>
      <Reveal>
        <CtaBlock />
      </Reveal>
    </>
  )
}
