import type { Metadata } from 'next'
import { FxNav } from '../_fx-nav'
import { HeroFxShell } from '@/components/home/hero-fx/hero-fx-shell'
import { AuroraBg } from '@/components/home/hero-fx/aurora'
import { HomeIndex } from '@/components/home/home-index'
import { CtaBlock } from '@/components/home/cta-block'
import { Reveal } from '@/components/reveal'

export const metadata: Metadata = {
  title: '화려한 히어로 A · 오로라 메시',
  robots: { index: false, follow: false },
}

export default function FxA() {
  return (
    <>
      <FxNav current="fx-a" />
      <HeroFxShell bg={<AuroraBg />} />
      <Reveal>
        <HomeIndex />
      </Reveal>
      <Reveal>
        <CtaBlock />
      </Reveal>
    </>
  )
}
