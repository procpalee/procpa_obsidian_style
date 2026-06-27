import Image from 'next/image'

/** 정적 이미지 배경 (public/hero-cover.jpg — 교체 가능). */
export function ImageStaticBg() {
  return <Image src="/hero-cover.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
}
