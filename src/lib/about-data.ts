import { publications } from './publications-data'
import { projects } from './projects-data'

// 자문위원 — Career 타임라인에도 포함하되, 히어로 배너로도 강조한다.
export const advisory = [
  { period: '2025 – 현재', org: '방위사업청', role: '원가관리 자문위원' },
  { period: '2026 – 현재', org: '한국공인회계사회', role: 'AI 자문위원' },
]

export const career = [
  { period: '2026 – 현재', title: '정인회계법인' },
  { period: '2026 – 현재', title: '한국공인회계사회 AI 자문위원' },
  { period: '2025 – 현재', title: '방위사업청 원가관리 자문위원' },
  { period: '2023 – 2026', title: '육군 재정장교' },
  { period: '2021 – 2023', title: '안진회계법인 (Deloitte)' },
  { period: '2019 – 2021', title: '안경회계법인' },
]

export const education = [
  { period: '2025 – 현재', title: '경북대학교 데이터사이언스 대학원 (석사)' },
  { period: '2023 – 2025', title: '한국방송통신대학교 AI학과' },
  { period: '2014 – 2019', title: '경북대학교 글로벌인재학부' },
]

export const expertise = [
  {
    title: '회계감사 (Audit & Assurance)',
    items: [
      '상장사 및 비상장사 회계감사 In-charge 역할 수행',
      '반도체, 자동차, 화학, 2차전지 등 다양한 산업 경험',
    ],
  },
  {
    title: '내부회계 (ICFR)',
    items: [
      '내부회계관리제도 구축 및 설계/운영평가 용역 In-charge 역할 수행',
      '연결내부회계관리제도 구축 업무 경험',
    ],
  },
  {
    title: '평가 및 회계자문 (Valuation & PA)',
    items: [
      '재무보고목적 공정가치평가 및 손상검사 업무 수행',
      'IFRS Conversion, 연결 PA 등 회계자문 업무 수행',
    ],
  },
  {
    title: '원가분석 및 정책 (Cost Analysis & Policy)',
    items: [
      '방산물자 원가계산 업무 수행',
      '데이터 기반의 정책연구 보고서 작성 및 비용 추계 분석',
    ],
  },
]

export const certificates = [
  {
    group: 'Finance',
    items: ['한국공인회계사 (KICPA)', '원가분석사', '국방원가관리사'],
  },
  {
    group: 'IT',
    items: ['국제정보시스템감사사 (CISA)', '정보처리기사'],
  },
  {
    group: 'Data',
    items: [
      '빅데이터분석기사',
      '재무빅데이터분석사 1·2급',
      '데이터분석준전문가 (ADsP)',
      'SQL개발자 (SQLD)',
    ],
  },
]

// 통계 — 데이터에서 자동 집계한다. 자격증/도서/프로젝트를 추가·삭제하면 숫자가 따라 갱신된다.
// (Years Exp.만 시작 연도 기준으로 매년 자동 증가)
const CAREER_START_YEAR = 2019 // 회계 실무 시작 연도(경력 최하단 기준)
const yearsOfExperience = new Date().getFullYear() - CAREER_START_YEAR
const certificateCount = certificates.reduce((total, group) => total + group.items.length, 0)

export const stats = [
  { value: `${yearsOfExperience}+`, label: 'Years Exp.' },
  { value: `${certificateCount}`, label: 'Certificates' },
  { value: `${publications.length}`, label: 'Publications' },
  { value: `${projects.length}`, label: 'Side Projects' },
]

export const contacts = [
  {
    label: 'Email',
    href: 'mailto:wogus3575@naver.com',
    description: '업무 문의나 협업 제안은 이메일로 편하게 주세요.',
  },
  {
    label: 'KakaoTalk',
    href: 'https://open.kakao.com/o/sQCXbyXg',
    description: '실시간 소통이 필요하다면 오픈채팅으로 연락주세요.',
  },
  {
    label: 'Naver Blog',
    href: 'https://blog.naver.com/procpalee',
    description: '다양한 인사이트를 네이버 블로그에 기록합니다.',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@Jaehyun-f9c',
    description: '영상 콘텐츠는 유튜브 채널에서 만나보실 수 있습니다.',
  },
  {
    label: 'Threads',
    href: 'https://www.threads.com/@procpalee',
    description: '짧은 생각과 소식은 스레드에서 공유합니다.',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/procpalee',
    description: '사이드 프로젝트 소스 코드를 공유합니다.',
  },
]
