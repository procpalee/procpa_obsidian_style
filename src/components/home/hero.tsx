import { HeroFxShell } from '@/components/home/hero-fx/hero-fx-shell'
import { DuotoneBg } from '@/components/home/hero-fx/image-duotone'

/** 홈 히어로 — 텍스트 슬라이드업 모션 + 듀오톤 이미지 배경(글로우 드리프트). */
export function Hero() {
  return <HeroFxShell bg={<DuotoneBg />} />
}
