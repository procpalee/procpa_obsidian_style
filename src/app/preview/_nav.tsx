import Link from 'next/link'

/** 임시 프리뷰 전환 바 — 레퍼런스 3종을 빠르게 비교. 선택 후 preview 폴더와 함께 삭제. */
const items = [
  { id: 'ref1', label: 'Ref1 · 에디토리얼 갤러리' },
  { id: 'ref2', label: 'Ref2 · 모던 미니멀' },
  { id: 'ref3', label: 'Ref3 · 다크 테크' },
]

export function PreviewNav({ current }: { current: 'ref1' | 'ref2' | 'ref3' }) {
  return (
    <div className="sticky top-0 z-[60] border-b border-black/10 bg-white/90 text-black backdrop-blur">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-x-2 gap-y-1 px-6 py-2.5 text-xs">
        <Link href="/preview" className="mr-2 font-mono uppercase tracking-widest text-black/50 hover:text-black">
          Preview
        </Link>
        {items.map((it) => (
          <Link
            key={it.id}
            href={`/preview/${it.id}`}
            className={
              'rounded-full border px-3 py-1 font-mono transition-colors ' +
              (it.id === current
                ? 'border-black bg-black text-white'
                : 'border-black/20 text-black/60 hover:border-black hover:text-black')
            }
          >
            {it.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
