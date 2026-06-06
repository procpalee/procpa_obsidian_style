import type { Vars } from '@/lib/palette-options'

/** 한 팔레트가 적용된 대표 컴포넌트 묶음(미니 쇼케이스). 토큰만 다르게 주입된다. */
export function PaletteMini({
  label,
  hex,
  vars,
}: {
  label: string
  hex: string
  vars: Vars
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
      {/* 라벨 바 */}
      <div className="flex items-center gap-2 border-b border-black/10 bg-black/[0.03] px-4 py-2.5 text-xs dark:border-white/10 dark:bg-white/[0.04]">
        <span
          className="h-3.5 w-3.5 rounded-full ring-1 ring-black/10"
          style={{ background: hex }}
        />
        <span className="font-medium">{label}</span>
        <span className="ml-auto font-mono text-[11px] opacity-60">{hex}</span>
      </div>

      {/* 스코프된 미니 쇼케이스 */}
      <div style={vars as React.CSSProperties} className="bg-background text-foreground">
        <div className="space-y-5 p-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-[11px] tracking-tight text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            공인회계사 · AI 컨설턴트
          </span>

          <h3 className="text-2xl font-bold leading-[1.15] tracking-[-0.02em]">
            회계 전문성에 <span className="text-primary">AI의 생산성</span>을
            더합니다
          </h3>

          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground">
              업무 제안하기
            </span>
            <span className="inline-flex items-center rounded-full border border-border px-4 py-2 text-[13px] font-medium">
              서비스 보기
            </span>
          </div>

          {/* 메트릭 그리드 */}
          <div className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-border bg-border">
            {[
              ['7+', '년 실무'],
              ['10+', '자격·이수'],
              ['3', '프로젝트'],
            ].map(([v, l]) => (
              <div key={l} className="bg-card px-3 py-3">
                <div className="text-lg font-bold tracking-tight">{v}</div>
                <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                  {l}
                </div>
              </div>
            ))}
          </div>

          {/* 카드 + 칩 */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-sm font-bold text-primary">01</span>
              <span className="text-sm font-semibold">결산·내부회계 자문</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {['결산 정확도', '리스크 관리', '문서화'].map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] text-muted-foreground"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* 미니 CTA */}
          <div className="flex items-center justify-between gap-3 rounded-xl bg-primary px-4 py-4 text-primary-foreground">
            <span className="text-sm font-semibold">업무를 제안해 주세요</span>
            <span className="inline-flex items-center rounded-full bg-primary-foreground px-3 py-1.5 text-[12px] font-semibold text-primary">
              연락하기
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
