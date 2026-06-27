import Link from 'next/link'

/** 홈 랜딩 시안 전환 바 (임시). 채택 후 preview 폴더와 함께 삭제. */
const items = [
  { id: 'home-a', label: 'A · 미니멀 인덱스' },
  { id: 'home-b', label: 'B · 스탯 임팩트' },
  { id: 'home-c', label: 'C · 마키 + 대표작' },
]

export function HomeNav({ current }: { current: 'home-a' | 'home-b' | 'home-c' }) {
  return (
    <div className="sticky top-0 z-[60] border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-2 gap-y-1 px-6 py-2.5 text-xs">
        <Link href="/preview" className="mr-2 font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground">
          Home 시안
        </Link>
        {items.map((it) => (
          <Link
            key={it.id}
            href={`/preview/${it.id}`}
            className={
              'rounded-full border px-3 py-1 font-mono transition-colors ' +
              (it.id === current
                ? 'border-foreground/40 bg-foreground text-background'
                : 'border-border/60 text-muted-foreground hover:border-foreground/40 hover:text-foreground')
            }
          >
            {it.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
