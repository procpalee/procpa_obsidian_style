import type { Metadata } from 'next'
import { ImgNav } from '../_img-nav'
import { HeroFxShell } from '@/components/home/hero-fx/hero-fx-shell'
import { ImageStaticBg } from '@/components/home/hero-fx/image-static'
import { HomeIndex } from '@/components/home/home-index'
import { CtaBlock } from '@/components/home/cta-block'
import { Reveal } from '@/components/reveal'

export const metadata: Metadata = {
  title: '텍스트+이미지 A · 정적 이미지',
  robots: { index: false, follow: false },
}

export default function ImgA() {
  return (
    <>
      <ImgNav current="img-a" />
      <HeroFxShell bg={<ImageStaticBg />} />
      <Reveal>
        <HomeIndex />
      </Reveal>
      <Reveal>
        <CtaBlock />
      </Reveal>
    </>
  )
}
