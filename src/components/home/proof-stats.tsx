import { Section } from '@/components/home/section'
import { StatCounter } from '@/components/home/stat-counter'
import { stats } from '@/lib/about-data'
import { content } from '@/lib/site-content'

const t = content.home.approach

/** 왜 나인가 — 자동 집계 stats를 대형 카운트업 숫자로 + 강점 3포인트(타이포 중심). */
export function ProofStats() {
  return (
    <Section size="display" kicker={t.kicker} title={t.title} description={t.description}>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label}>
            <dd className="text-[clamp(3rem,7vw,6rem)] font-bold leading-none tracking-[-0.04em] tabular-nums">
              <StatCounter value={s.value} />
            </dd>
            {/* 라벨은 statsLabels(한글)로 오버라이드 — about-data.stats와 인덱스 순서 계약 */}
            <dt className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {t.statsLabels[i] ?? s.label}
            </dt>
          </div>
        ))}
      </dl>

      <div className="mt-16 grid gap-10 border-t border-border/60 pt-12 sm:grid-cols-3">
        {t.points.map((p, i) => (
          <div key={p.title}>
            <span className="font-mono text-xs tracking-widest text-primary">0{i + 1}</span>
            <h3 className="mt-3 text-xl font-semibold tracking-tight [word-break:keep-all]">
              {p.title}
            </h3>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground [word-break:keep-all]">
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}
