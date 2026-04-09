import Link from 'next/link'

/**
 * Light-mode background variants. Each sample renders a mini "site" inside a
 * scoped wrapper that overrides the relevant CSS variables, so you can compare
 * them side-by-side without flipping the global theme.
 *
 * Open /theme-preview in light mode (toggle in header) to see them.
 */

type Variant = {
  key: string
  title: string
  note: string
  // CSS variable overrides applied to the wrapper
  vars: Record<string, string>
}

const variants: Variant[] = [
  {
    key: 'A',
    title: 'A — Warm Paper (#FAF8F4)',
    note: '아주 옅은 따뜻한 베이지. 종이 질감, 장시간 읽기에 가장 부드러움.',
    vars: {
      '--background': 'oklch(0.985 0.006 85)',
      '--card': 'oklch(1 0 0)',
      '--muted': 'oklch(0.955 0.008 85)',
      '--border': 'oklch(0.9 0.008 85)',
    },
  },
  {
    key: 'B',
    title: 'B — Cool Mist (#F6F7F9)',
    note: '아주 옅은 차가운 회색. 모던/테크 감성, 채도 0에 가까움.',
    vars: {
      '--background': 'oklch(0.975 0.003 250)',
      '--card': 'oklch(1 0 0)',
      '--muted': 'oklch(0.955 0.004 250)',
      '--border': 'oklch(0.9 0.005 250)',
    },
  },
  {
    key: 'C',
    title: 'C — Notion Stone (#F7F6F3)',
    note: 'Notion/Linear 톤. 미세한 웜그레이, 가장 무난.',
    vars: {
      '--background': 'oklch(0.972 0.004 75)',
      '--card': 'oklch(0.99 0.002 75)',
      '--muted': 'oklch(0.95 0.005 75)',
      '--border': 'oklch(0.895 0.006 75)',
    },
  },
  {
    key: 'D',
    title: 'D — Soft Slate (#EFF1F4)',
    note: '한 단계 더 어둡게. 카드와 배경 대비가 분명해짐.',
    vars: {
      '--background': 'oklch(0.955 0.005 250)',
      '--card': 'oklch(0.99 0.002 250)',
      '--muted': 'oklch(0.93 0.006 250)',
      '--border': 'oklch(0.88 0.008 250)',
    },
  },
]

function MiniSite() {
  return (
    <div className="bg-background text-foreground">
      {/* header */}
      <div className="flex h-12 items-center justify-between border-b border-border px-5 text-xs">
        <div className="flex items-center gap-4">
          <span className="font-mono font-semibold">PROCPA</span>
          <span className="text-muted-foreground">Posts</span>
          <span className="text-muted-foreground">Series</span>
          <span className="text-muted-foreground">Tags</span>
        </div>
        <span className="font-mono text-muted-foreground">⌘K</span>
      </div>

      <div className="grid grid-cols-12">
        {/* sidebar */}
        <aside className="col-span-3 border-r border-border px-5 py-6 text-xs">
          <p className="mb-2 font-mono uppercase tracking-wider text-muted-foreground">Vault</p>
          <ul className="space-y-1.5">
            <li>회계 · 12</li>
            <li>AI · 8</li>
            <li>Series · 3</li>
          </ul>
          <p className="mt-6 mb-2 font-mono uppercase tracking-wider text-muted-foreground">Tags</p>
          <div className="flex flex-wrap gap-1.5">
            {['IFRS', 'K-GAAP', 'LLM', 'RAG', 'M&A'].map((t) => (
              <span key={t} className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                {t}
              </span>
            ))}
          </div>
        </aside>

        {/* note */}
        <section className="col-span-9 px-8 py-8">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Home</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            지식은 느리게 쌓이지만, 복리로 자란다
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            한국공인회계사 이재현의 개인 지식 데이터베이스. 회계·재무 전문성에 AI의
            생산성을 더하는 작업 노트와 글을 모읍니다.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-md border border-border bg-card p-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Post · 2026.03.{10 + i}
                </p>
                <p className="mt-2 text-sm font-medium">샘플 글 제목 {i}</p>
                <p className="mt-1 text-xs text-muted-foreground">짧은 설명 텍스트가 여기에 들어갑니다.</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default function ThemePreviewPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-2 text-2xl font-semibold tracking-tight">Light Background Samples</h1>
      <p className="mb-2 text-sm text-muted-foreground">
        라이트 모드 배경색 후보 4종. 각 미니 사이트는 자체 CSS 변수로 격리되어 있으므로
        현재 테마와 무관하게 비교할 수 있습니다.
      </p>
      <p className="mb-10 text-xs text-muted-foreground">
        보기 팁: 헤더의 테마 토글로 라이트 모드로 바꾸면 외곽 페이지도 함께 라이트가 되어
        가장 정확하게 비교됩니다. <Link href="/" className="underline">홈으로</Link>
      </p>

      <div className="space-y-12">
        {variants.map((v) => (
          <section key={v.key}>
            <div className="mb-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Variant {v.key}
              </p>
              <h2 className="mt-1 text-base font-semibold">{v.title}</h2>
              <p className="text-xs text-muted-foreground">{v.note}</p>
            </div>
            <div
              className="overflow-hidden rounded-lg border border-border shadow-sm"
              style={v.vars as React.CSSProperties}
            >
              <MiniSite />
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
