import { stats } from '@/lib/about-data'

// 히어로 직하의 얇은 크레덴셜 티커 — 읽지 않아도 스치며 박히는 권위.
const items: string[] = [
  '한국공인회계사',
  '한국공인회계사회 AI 자문위원',
  '방위사업청 원가관리 자문위원',
  `실무경력 ${stats[0].value}년`,
  'AX 컨설팅',
]

// 한 copy(ul)가 화면 폭보다 넓도록 충분히 반복해야 translateX(-50%) 루프가 중간에 끊기지 않는다.
const loop = Array.from({ length: 4 }, () => items).flat()

/** 크레덴셜 마퀴 — 무한 좌측 스크롤, hover 일시정지, reduced-motion 시 정지. */
export function CredentialMarquee() {
  return (
    <div className="edge-fade-x overflow-hidden border-b border-border/60 py-4">
      <div className="fx-marquee-track">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 || undefined}
            className="flex shrink-0 items-center"
          >
            {loop.map((text, i) => (
              <li
                key={`${copy}-${i}`}
                className="flex items-center gap-10 whitespace-nowrap pr-10 font-mono text-[13px] tracking-[0.14em] text-foreground"
              >
                <span>{text}</span>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
