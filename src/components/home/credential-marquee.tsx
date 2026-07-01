import { advisory, stats } from '@/lib/about-data'

// 히어로 직하의 얇은 크레덴셜 티커 — 읽지 않아도 스치며 박히는 권위.
// about-data에서 자동 구성되므로 자격·이력이 바뀌면 따라 갱신된다.
const items: { text: string; strong?: boolean }[] = [
  { text: '한국공인회계사 이재현', strong: true },
  ...advisory.map((a) => ({ text: `${a.org} ${a.role}`, strong: true })),
  { text: `실무 경력 ${stats[0].value}년` },
  { text: `보유 자격증 ${stats[1].value}종` },
  { text: `집필 도서 ${stats[2].value}권` },
  { text: `운영 프로젝트 ${stats[3].value}개` },
]

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
            {items.map((it) => (
              <li
                key={it.text}
                className="flex items-center gap-10 whitespace-nowrap pr-10 font-mono text-[13px] tracking-[0.14em]"
              >
                <span className={it.strong ? 'text-foreground' : 'text-muted-foreground'}>
                  {it.text}
                </span>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
