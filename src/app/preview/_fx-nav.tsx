import Link from 'next/link'

/** 화려한 히어로(텍스트 애니메이션 + 컬러 배경) 시안 전환 바 (임시). */
const items = [
  { id: 'fx-a', label: 'A · 오로라 메시' },
  { id: 'fx-b', label: 'B · 컬러 플로우' },
  { id: 'fx-c', label: 'C · 코닉 스포트라이트' },
]

export function FxNav({ current }: { current: 'fx-a' | 'fx-b' | 'fx-c' }) {
  return (
    <div className="sticky top-0 z-[60] border-b border-white/15 bg-black/70 text-white backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-2 gap-y-1 px-6 py-2.5 text-xs">
        <Link href="/preview" className="mr-2 font-mono uppercase tracking-widest text-white/60 hover:text-white">
          화려한 히어로
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
