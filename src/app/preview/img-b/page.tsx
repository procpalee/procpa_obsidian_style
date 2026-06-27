import type { Metadata } from 'next'
import { ImgNav } from '../_img-nav'
import { HeroFxShell } from '@/components/home/hero-fx/hero-fx-shell'
import { KenBurnsBg } from '@/components/home/hero-fx/image-kenburns'
import { HomeIndex } from '@/components/home/home-index'
import { CtaBlock } from '@/components/home/cta-block'
import { Reveal } from '@/components/reveal'

export const metadata: Metadata = {
  title: '텍스트+이미지 B · 켄번스',
  robots: { index: false, follow: false },
}

export default function ImgB() {
  return (
    <>
      <ImgNav current="img-b" />
      <HeroFxShell bg={<KenBurnsBg />} />
      <Reveal>
        <HomeIndex />
      </Reveal>
      <Reveal>
        <CtaBlock />
      </Reveal>
    </>
  )
}
