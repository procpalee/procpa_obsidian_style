// 디자인 컨셉 후보 4종. 각 컨셉은 자체 CSS 변수(OKLCH 토큰) + 폰트 스택을 가지며,
// theme-preview 패턴처럼 인라인 style 래퍼로 격리되어 라이브 사이트에 영향을 주지 않는다.
// 사용자가 하나를 선택하면 해당 토큰을 globals.css로 승격하고 이 스캐폴드는 삭제한다.

export type DesignConcept = {
  key: string
  /** 표시 이름 */
  name: string
  /** 영문 부제 */
  tagline: string
  /** 디자인 철학 (한 줄) */
  philosophy: string
  /** AI-slop이 아닌 이유 */
  antiSlop: string
  /** 래퍼에 인라인으로 주입할 CSS 변수 (라이트 팔레트) */
  vars: Record<string, string>
  /** 본문 폰트 스택 */
  fontSans: string
  /** 헤딩 폰트 스택 */
  fontHeading: string
  /** 필요 시 로드할 웹폰트 stylesheet URL */
  fontLink?: string
  /** 히어로 표현 방식 */
  heroStyle: 'band' | 'plain' | 'split'
  /** 골드/세컨더리 액센트 색 (선택) */
  accent?: string
}

export const designConcepts: DesignConcept[] = [
  {
    key: 'ledger',
    name: 'Ledger',
    tagline: 'Editorial Ink',
    philosophy: '따뜻한 종이 위 잉크. 회계 출판물 같은 신뢰감과 절제된 옥스블러드 액센트.',
    antiSlop:
      '그라데이션·글래스 없이 세리프 헤드라인과 헤어라인, 넓은 행간만으로 위계를 만든다. 연차보고서의 품격.',
    vars: {
      '--background': 'oklch(0.985 0.006 85)',
      '--foreground': 'oklch(0.22 0.012 60)',
      '--card': 'oklch(1 0 0)',
      '--card-foreground': 'oklch(0.22 0.012 60)',
      '--popover': 'oklch(1 0 0)',
      '--popover-foreground': 'oklch(0.22 0.012 60)',
      '--muted': 'oklch(0.955 0.008 85)',
      '--muted-foreground': 'oklch(0.50 0.02 70)',
      '--primary': 'oklch(0.45 0.11 25)',
      '--primary-foreground': 'oklch(0.985 0.008 85)',
      '--accent': 'oklch(0.95 0.012 85)',
      '--accent-foreground': 'oklch(0.30 0.03 40)',
      '--border': 'oklch(0.88 0.012 85)',
      '--input': 'oklch(0.88 0.012 85)',
      '--ring': 'oklch(0.45 0.11 25)',
      '--radius': '0.25rem',
    },
    fontSans: "'Pretendard Variable', Pretendard, ui-sans-serif, sans-serif",
    fontHeading: "'Noto Serif KR', 'Pretendard Variable', serif",
    fontLink:
      'https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@500;600;700&display=swap',
    heroStyle: 'plain',
    accent: 'oklch(0.45 0.11 25)',
  },
  {
    key: 'audit',
    name: 'Audit',
    tagline: 'Swiss Precision',
    philosophy: '쿨 화이트 위 그래파이트. 엄격한 그리드와 단일 코발트 액센트의 데이터 밀도.',
    antiSlop:
      'mono 라벨, near-zero radius, 타이트한 트래킹. Linear/Stripe-doc 풍의 정밀한 시스템 디자인.',
    vars: {
      '--background': 'oklch(0.98 0.002 250)',
      '--foreground': 'oklch(0.21 0.008 250)',
      '--card': 'oklch(1 0 0)',
      '--card-foreground': 'oklch(0.21 0.008 250)',
      '--popover': 'oklch(1 0 0)',
      '--popover-foreground': 'oklch(0.21 0.008 250)',
      '--muted': 'oklch(0.96 0.003 250)',
      '--muted-foreground': 'oklch(0.50 0.012 250)',
      '--primary': 'oklch(0.50 0.16 255)',
      '--primary-foreground': 'oklch(0.99 0 0)',
      '--accent': 'oklch(0.955 0.006 250)',
      '--accent-foreground': 'oklch(0.30 0.02 255)',
      '--border': 'oklch(0.9 0.005 250)',
      '--input': 'oklch(0.9 0.005 250)',
      '--ring': 'oklch(0.50 0.16 255)',
      '--radius': '0.25rem',
    },
    fontSans: "'Pretendard Variable', Pretendard, ui-sans-serif, sans-serif",
    fontHeading: "'Pretendard Variable', Pretendard, ui-sans-serif, sans-serif",
    heroStyle: 'split',
    accent: 'oklch(0.50 0.16 255)',
  },
  {
    key: 'advisory',
    name: 'Advisory',
    tagline: 'Deep Navy Authority',
    philosophy: '라이트 기본에 시그니처 딥네이비 블록과 골드 헤어라인. 시니어 컨설팅 브랜드의 무게감.',
    antiSlop:
      '네이비는 그라데이션이 아닌 솔리드 블록, 골드는 얇은 선으로만. 권위 있되 차분하다.',
    vars: {
      '--background': 'oklch(0.98 0.004 250)',
      '--foreground': 'oklch(0.24 0.02 258)',
      '--card': 'oklch(1 0 0)',
      '--card-foreground': 'oklch(0.24 0.02 258)',
      '--popover': 'oklch(1 0 0)',
      '--popover-foreground': 'oklch(0.24 0.02 258)',
      '--muted': 'oklch(0.955 0.006 255)',
      '--muted-foreground': 'oklch(0.48 0.02 258)',
      '--primary': 'oklch(0.30 0.06 260)',
      '--primary-foreground': 'oklch(0.97 0.01 250)',
      '--accent': 'oklch(0.95 0.01 255)',
      '--accent-foreground': 'oklch(0.30 0.06 260)',
      '--border': 'oklch(0.9 0.008 255)',
      '--input': 'oklch(0.9 0.008 255)',
      '--ring': 'oklch(0.30 0.06 260)',
      '--radius': '0.625rem',
    },
    fontSans: "'Pretendard Variable', Pretendard, ui-sans-serif, sans-serif",
    fontHeading: "'Pretendard Variable', Pretendard, ui-sans-serif, sans-serif",
    heroStyle: 'band',
    accent: 'oklch(0.66 0.10 75)',
  },
  {
    key: 'ground',
    name: 'Ground',
    tagline: 'Warm Minimal Stone',
    philosophy: 'Notion-stone 배경에 뮤트 세이지 액센트. 차분하고 인간적인 미니멀.',
    antiSlop:
      '이모지·글래스 없이 부드러운 단일 그림자와 넉넉한 radius로 따뜻함을 낸다. 저채도지만 생기 있는 액센트 하나.',
    vars: {
      '--background': 'oklch(0.972 0.004 75)',
      '--foreground': 'oklch(0.27 0.012 120)',
      '--card': 'oklch(0.99 0.003 75)',
      '--card-foreground': 'oklch(0.27 0.012 120)',
      '--popover': 'oklch(0.99 0.003 75)',
      '--popover-foreground': 'oklch(0.27 0.012 120)',
      '--muted': 'oklch(0.95 0.006 75)',
      '--muted-foreground': 'oklch(0.50 0.015 120)',
      '--primary': 'oklch(0.52 0.07 175)',
      '--primary-foreground': 'oklch(0.99 0.005 75)',
      '--accent': 'oklch(0.94 0.012 150)',
      '--accent-foreground': 'oklch(0.32 0.04 160)',
      '--border': 'oklch(0.9 0.008 75)',
      '--input': 'oklch(0.9 0.008 75)',
      '--ring': 'oklch(0.52 0.07 175)',
      '--radius': '0.875rem',
    },
    fontSans: "'Pretendard Variable', Pretendard, ui-sans-serif, sans-serif",
    fontHeading: "'Pretendard Variable', Pretendard, ui-sans-serif, sans-serif",
    heroStyle: 'plain',
    accent: 'oklch(0.52 0.07 175)',
  },
]

export function getConcept(key: string) {
  return designConcepts.find((c) => c.key === key)
}
