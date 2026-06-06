/**
 * 디자인 팔레트 비교용 토큰 세트.
 * 각 팔레트는 동일한 뉴트럴(순백/쿨그레이) 위에서 primary 계열만 다르게 둔다.
 * 컴포넌트는 var(--background) 등 사이트 토큰을 그대로 쓰므로,
 * 래퍼 div에 이 값들을 인라인 CSS 변수로 주입하면 그 영역만 해당 팔레트로 보인다.
 */
export type Vars = Record<string, string>

const lightNeutral: Vars = {
  '--background': '#ffffff',
  '--foreground': '#0c0e12',
  '--card': '#ffffff',
  '--card-foreground': '#0c0e12',
  '--popover': '#ffffff',
  '--popover-foreground': '#0c0e12',
  '--secondary': '#f4f6f9',
  '--secondary-foreground': '#0c0e12',
  '--muted': '#f4f6f9',
  '--muted-foreground': '#4a5160',
  '--border': '#e6e9ee',
  '--input': '#e6e9ee',
  '--primary-foreground': '#ffffff',
}

const darkNeutral: Vars = {
  '--background': '#0b0e13',
  '--foreground': '#f3f5f8',
  '--card': '#11151c',
  '--card-foreground': '#f3f5f8',
  '--popover': '#11151c',
  '--popover-foreground': '#f3f5f8',
  '--secondary': '#171c25',
  '--secondary-foreground': '#f3f5f8',
  '--muted': '#171c25',
  '--muted-foreground': '#9aa2b1',
  '--border': '#232a36',
  '--input': '#2a3340',
}

export type LightPalette = {
  id: string
  name: string
  hex: string
  vars: Vars
}

export const lightPalettes: LightPalette[] = [
  {
    id: 'a',
    name: 'A · 딥 네이비/인디고',
    hex: '#1E3A8A',
    vars: { ...lightNeutral, '--primary': '#1e3a8a', '--accent': '#eaf0fb', '--accent-foreground': '#1e3a8a', '--ring': '#1e3a8a' },
  },
  {
    id: 'b',
    name: 'B · 로열 아주르 (현재)',
    hex: '#1B4DD1',
    vars: { ...lightNeutral, '--primary': '#1b4dd1', '--accent': '#eef3fd', '--accent-foreground': '#1b4dd1', '--ring': '#1b4dd1' },
  },
  {
    id: 'c',
    name: 'C · 비비드 블루',
    hex: '#2563EB',
    vars: { ...lightNeutral, '--primary': '#2563eb', '--accent': '#eff5ff', '--accent-foreground': '#2563eb', '--ring': '#2563eb' },
  },
  {
    id: 'd',
    name: 'D · 차분한 슬레이트블루',
    hex: '#3B5BA5',
    vars: { ...lightNeutral, '--primary': '#3b5ba5', '--accent': '#eef2f9', '--accent-foreground': '#3b5ba5', '--ring': '#3b5ba5' },
  },
]

export type DarkAccent = {
  id: string
  name: string
  hex: string
  vars: Vars
}

export const darkAccents: DarkAccent[] = [
  {
    id: 'sky',
    name: '밝은 스카이 (현재)',
    hex: '#38BDF8',
    vars: { ...darkNeutral, '--primary': '#38bdf8', '--primary-foreground': '#042430', '--accent': '#0c2536', '--accent-foreground': '#7dd3fc', '--ring': '#38bdf8' },
  },
  {
    id: 'royal',
    name: '라이트 동일 계열 (밝은 로열)',
    hex: '#5B9CFF',
    vars: { ...darkNeutral, '--primary': '#5b9cff', '--primary-foreground': '#06101f', '--accent': '#13233f', '--accent-foreground': '#a8c6ff', '--ring': '#5b9cff' },
  },
  {
    id: 'peri',
    name: '차분한 연하늘 (periwinkle)',
    hex: '#7DA8E6',
    vars: { ...darkNeutral, '--primary': '#7da8e6', '--primary-foreground': '#0a1424', '--accent': '#152233', '--accent-foreground': '#b9d0f2', '--ring': '#7da8e6' },
  },
]
