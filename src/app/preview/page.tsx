import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '디자인 방향 프리뷰',
  robots: { index: false, follow: false },
}

const dirs = [
  {
    id: 'ref1',
    name: '에디토리얼 갤러리',
    ref: 'reference1 — 세리프 · 풀스크린 이미지',
    desc: '크림 배경 + Playfair 세리프 + 풀스크린 배경이미지 히어로 + 4:5 프로젝트 갤러리. 잡지/아트북 같은 고급 에디토리얼 톤.',
  },
  {
    id: 'ref2',
    name: '모던 미니멀',
    ref: 'reference2 — 밝고 깔끔 · 대형 히어로 이미지',
    desc: '밝은 회색 + Outfit 디스플레이 + 대형 21:9 히어로 이미지 + 2열 프로젝트 그리드. Framer 스타일의 깔끔하고 전문적인 톤.',
  },
  {
    id: 'ref3',
    name: '다크 테크',
    ref: 'reference3 — 순흑 · 프로덕트 런치',
    desc: '순흑 배경 + JetBrains Mono + 마키 배너 + 스플릿 히어로 + 디바이스/카드 목업. 개발 프로덕트 런치 같은 임팩트 강한 톤.',
  },
] as const

export default function PreviewIndex() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-20 sm:py-28">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Temporary — 선택 후 삭제
      </p>
      <h1 className="mt-4 text-[clamp(2rem,5vw,3.5rem)]/[1.05] font-bold tracking-[-0.03em]">
        레퍼런스 기반 디자인 3종
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
        reference 폴더의 3개 템플릿을 procpa 콘텐츠(이재현 CPA · 전문분야 · 프로젝트 · 외부 글 링크)로 각각
        적용했습니다. 이미지는 임시 placeholder이며 선택 후 실제 자산으로 교체합니다.
      </p>

      <p className="mt-12 font-mono text-xs uppercase tracking-widest text-primary">
        텍스트 애니메이션 + 이미지 배경 (최신)
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {[
          { id: 'img-a', name: 'A · 정적 이미지', desc: '배경 이미지 + 텍스트 슬라이드업. 가장 깔끔.' },
          { id: 'img-b', name: 'B · 켄번스', desc: '이미지가 천천히 줌·팬하며 살아있는 느낌.' },
          { id: 'img-c', name: 'C · 듀오톤 + 글로우', desc: '이미지를 블루 톤으로 + 은은한 글로우 드리프트.' },
        ].map((d) => (
          <Link
            key={d.id}
            href={`/preview/${d.id}`}
            className="group rounded-2xl border border-primary/40 p-6 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-sm"
          >
            <h2 className="text-xl font-bold tracking-[-0.02em]">{d.name}</h2>
            <p className="mt-2 text-pretty text-sm text-muted-foreground">{d.desc}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground">
              열어보기 →
            </span>
          </Link>
        ))}
      </div>

      <p className="mt-16 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        화려한 히어로 — 텍스트 애니메이션 + 컬러 배경
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {[
          { id: 'fx-a', name: 'A · 오로라 메시', desc: '블루·바이올렛·시안 블롭이 흐르는 배경 + 텍스트 슬라이드업.' },
          { id: 'fx-b', name: 'B · 컬러 플로우', desc: '색이 순환하는 입자 흐름 + 텍스트 슬라이드업.' },
          { id: 'fx-c', name: 'C · 코닉 스포트라이트', desc: '회전하는 컬러 스윕 + 격자 + 텍스트 슬라이드업.' },
        ].map((d) => (
          <Link
            key={d.id}
            href={`/preview/${d.id}`}
            className="group rounded-2xl border border-primary/40 p-6 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-sm"
          >
            <h2 className="text-xl font-bold tracking-[-0.02em]">{d.name}</h2>
            <p className="mt-2 text-pretty text-sm text-muted-foreground">{d.desc}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground">
              열어보기 →
            </span>
          </Link>
        ))}
      </div>

      <p className="mt-16 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        애니메이션 히어로 배경 (잔잔)
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {[
          { id: 'hero-a', name: 'A · 컨스텔레이션', desc: '떠다니는 노드 + 연결선. 데이터/AI 느낌.' },
          { id: 'hero-b', name: 'B · 플로우 필드', desc: '입자가 흐르며 잔상. 고급스러운 유기적 모션.' },
          { id: 'hero-c', name: 'C · 드리프팅 그리드', desc: '흐르는 격자 + 명멸 노드. 테크/건축 느낌.' },
        ].map((d) => (
          <Link
            key={d.id}
            href={`/preview/${d.id}`}
            className="group rounded-2xl border border-border/60 p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-sm"
          >
            <h2 className="text-xl font-bold tracking-[-0.02em]">{d.name}</h2>
            <p className="mt-2 text-pretty text-sm text-muted-foreground">{d.desc}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground">
              열어보기 →
            </span>
          </Link>
        ))}
      </div>

      <p className="mt-16 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        홈 랜딩 시안 (구조)
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {[
          { id: 'home-a', name: 'A · 미니멀 인덱스', desc: '히어로 + 메뉴 인덱스 3카드 + CTA. 중복 0, 가장 깔끔.' },
          { id: 'home-b', name: 'B · 스탯 임팩트', desc: '히어로 + 신뢰 스탯 행 + 인덱스 + CTA.' },
          { id: 'home-c', name: 'C · 마키 + 대표작', desc: '히어로 + 키워드 마키 + 대표 작업 3개 + 인덱스 + CTA.' },
        ].map((d) => (
          <Link
            key={d.id}
            href={`/preview/${d.id}`}
            className="group rounded-2xl border border-border/60 p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-sm"
          >
            <h2 className="text-xl font-bold tracking-[-0.02em]">{d.name}</h2>
            <p className="mt-2 text-pretty text-sm text-muted-foreground">{d.desc}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground">
              열어보기 →
            </span>
          </Link>
        ))}
      </div>

      <p className="mt-16 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        전체 비주얼 방향 (레퍼런스)
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {dirs.map((d) => (
          <Link
            key={d.id}
            href={`/preview/${d.id}`}
            className="group rounded-2xl border border-border/60 p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-sm"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-primary">{d.ref}</span>
            <h2 className="mt-3 text-2xl font-bold tracking-[-0.02em]">{d.name}</h2>
            <p className="mt-3 text-pretty text-sm text-muted-foreground">{d.desc}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground">
              열어보기 →
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
