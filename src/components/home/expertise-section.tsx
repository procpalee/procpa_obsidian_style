import { Eyebrow } from './section-ui'
import { expertise } from '@/lib/about-data'

/** 전문 분야 — 보더 그리드 (CMDS categories 패턴 차용) */
export function ExpertiseSection() {
  return (
    <section className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <Eyebrow>Expertise</Eyebrow>
        <h2 className="mt-3 max-w-2xl text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold leading-[1.15] tracking-[-0.02em]">
          전문 분야
        </h2>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {expertise.map((e, i) => (
            <div key={e.title} className="bg-card p-7 sm:p-8">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-sm font-bold text-primary tabular-nums">
                  {String((i + 1) * 100).padStart(3, '0')}
                </span>
                <h3 className="text-base font-semibold tracking-tight">{e.title}</h3>
              </div>
              <ul className="mt-4 space-y-2">
                {e.items.map((it) => (
                  <li
                    key={it}
                    className="flex gap-2 text-[14px] leading-relaxed text-muted-foreground"
                  >
                    <span className="text-primary">·</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
