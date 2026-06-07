import type { Metadata } from 'next'
import { HERO_VARIANTS } from '@/components/home/hero-variants'

export const metadata: Metadata = {
  title: '홈 히어로 시안',
  robots: { index: false, follow: false },
}

export default function HeroPreviewPage() {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-5xl px-6">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">Preview</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">홈 히어로 시안 비교</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          아래 3개 시안을 비교해 보고 원하는 번호(A/B/C)를 알려주시면 홈에 적용하겠습니다.
          모두 사이트 톤 규칙(그라데이션·글래스·이모지 없음)을 따릅니다.
        </p>
      </div>

      <div className="mt-12 space-y-4">
        {HERO_VARIANTS.map(({ id, name, component: Hero }) => (
          <div key={id}>
            <div className="mx-auto max-w-5xl px-6">
              <div className="flex items-center gap-3 border-t border-border/60 pt-4">
                <span className="rounded-md bg-primary px-2.5 py-1 font-mono text-xs uppercase tracking-widest text-primary-foreground">
                  {name}
                </span>
              </div>
            </div>
            <Hero />
          </div>
        ))}
      </div>
    </div>
  )
}
