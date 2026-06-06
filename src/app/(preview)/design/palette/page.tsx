import type { Metadata } from 'next'
import { PaletteMini } from '@/components/design-preview/palette-mini'
import { lightPalettes, darkAccents } from '@/lib/palette-options'

export const metadata: Metadata = {
  title: '팔레트 비교',
  robots: { index: false, follow: false },
}

/** 라이트 메인 블루 4종 + 다크 액센트 3종을 나란히 비교하는 갤러리 (noindex). */
export default function PaletteComparePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <header className="mb-10">
        <p className="font-mono text-[12px] uppercase tracking-[0.05em] text-primary">
          Palette compare
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-[-0.02em]">
          블루 팔레트 비교
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          같은 컴포넌트·뉴트럴 위에서 메인 블루만 바꿔 비교합니다. 마음에 드는
          라이트 팔레트(A–D)와 다크 액센트를 각각 골라 알려주세요. 선택하신
          조합을 사이트 전체 기본값으로 확정합니다.
        </p>
      </header>

      {/* 라이트 메인 블루 비교 */}
      <section>
        <h2 className="mb-4 text-lg font-semibold tracking-tight">
          1. 라이트 모드 — 메인 블루 4종
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {lightPalettes.map((p) => (
            <PaletteMini key={p.id} label={p.name} hex={p.hex} vars={p.vars} />
          ))}
        </div>
      </section>

      {/* 다크 액센트 비교 */}
      <section className="mt-14">
        <h2 className="mb-4 text-lg font-semibold tracking-tight">
          2. 다크 모드 — 액센트 3종
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {darkAccents.map((d) => (
            <PaletteMini key={d.id} label={d.name} hex={d.hex} vars={d.vars} />
          ))}
        </div>
      </section>
    </div>
  )
}
