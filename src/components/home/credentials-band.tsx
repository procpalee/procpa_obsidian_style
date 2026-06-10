import { Section } from '@/components/home/section'
import { advisory, publications } from '@/lib/about-data'

/**
 * 홈 권위 신호 밴드 — 자문위원 활동 + 출간물을 mono 라벨/hairline로 노출.
 * about-data.ts를 단일 출처로 재사용한다(추가 콘텐츠 작성 불필요).
 */
export function CredentialsBand() {
  return (
    <Section
      id="credentials"
      kicker="Credentials"
      title="활동과 기록"
      description="공적 자문 활동과 직접 집필한 가이드로 전문성을 검증받고 있습니다."
    >
      <div className="grid gap-px overflow-hidden rounded-xl border border-border/60 bg-border/60 sm:grid-cols-2">
        <div className="bg-background p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Advisory
          </p>
          <ul className="mt-4 space-y-4">
            {advisory.map((a) => (
              <li key={`${a.org}-${a.role}`} className="flex flex-col gap-0.5">
                <span className="text-base font-semibold tracking-tight">
                  {a.org} <span className="text-muted-foreground">·</span> {a.role}
                </span>
                <span className="font-mono text-[13px] text-muted-foreground">{a.period}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-background p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Publications
          </p>
          <ul className="mt-4 space-y-4">
            {publications.map((p) => (
              <li key={p.title}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col gap-0.5"
                >
                  <span className="text-base font-semibold tracking-tight transition-colors group-hover:text-primary">
                    {p.title}
                  </span>
                  <span className="text-[13px] leading-relaxed text-muted-foreground">
                    {p.description}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
