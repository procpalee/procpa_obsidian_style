import type { Metadata } from 'next'
import { ImgNav } from '../_img-nav'
import { HeroFxShell } from '@/components/home/hero-fx/hero-fx-shell'
import { DuotoneBg } from '@/components/home/hero-fx/image-duotone'
import { HomeIndex } from '@/components/home/home-index'
import { CtaBlock } from '@/components/home/cta-block'
import { Reveal } from '@/components/reveal'

export const metadata: Metadata = {
  title: '텍스트+이미지 C · 듀오톤',
  robots: { index: false, follow: false },
}

export default function ImgC() {
  return (
    <>
      <ImgNav current="img-c" />
      <HeroFxShell bg={<DuotoneBg />} />
      <Reveal>
        <HomeIndex />
      </Reveal>
      <Reveal>
        <CtaBlock />
      </Reveal>
    </>
  )
}
