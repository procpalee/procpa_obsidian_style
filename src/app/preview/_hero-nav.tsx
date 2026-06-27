import Link from 'next/link'

/** 애니메이션 히어로 배경 시안 전환 바 (임시). */
const items = [
  { id: 'hero-a', label: 'A · 컨스텔레이션' },
  { id: 'hero-b', label: 'B · 플로우 필드' },
  { id: 'hero-c', label: 'C · 드리프팅 그리드' },
]

export function HeroNav({ current }: { current: 'hero-a' | 'hero-b' | 'hero-c' }) {
  return (
    <div className="sticky top-0 z-[60] border-b border-white/15 bg-black/70 text-white backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-2 gap-y-1 px-6 py-2.5 text-xs">
        <Link href="/preview" className="mr-2 font-mono uppercase tracking-widest text-white/60 hover:text-white">
          Hero 배경
        </Link>
        {items.map((it) => (
          <Link
            key={it.id}
            href={`/preview/${it.id}`}
            className={
              'rounded-full border px-3 py-1 font-mono transition-colors ' +
              (it.id === current
                ? 'border-white bg-white text-black'
                : 'border-white/30 text-white/70 hover:border-white hover:text-white')
            }
          >
            {it.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
