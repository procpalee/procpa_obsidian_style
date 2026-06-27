import Link from 'next/link'

/** 텍스트 모션 + 이미지 배경 시안 전환 바 (임시). */
const items = [
  { id: 'img-a', label: 'A · 정적 이미지' },
  { id: 'img-b', label: 'B · 켄번스 줌·팬' },
  { id: 'img-c', label: 'C · 듀오톤 + 글로우' },
]

export function ImgNav({ current }: { current: 'img-a' | 'img-b' | 'img-c' }) {
  return (
    <div className="sticky top-0 z-[60] border-b border-white/15 bg-black/70 text-white backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-2 gap-y-1 px-6 py-2.5 text-xs">
        <Link href="/preview" className="mr-2 font-mono uppercase tracking-widest text-white/60 hover:text-white">
          텍스트+이미지
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
