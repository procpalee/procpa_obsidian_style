// AX(AI Transformation) 컨설팅·교육 랜딩(/ax) 데이터.
// 기존 services-data의 AI·강의 항목을 이전해, 회계 서비스(services-data)와 분리한다.

export type AxProgram = {
  title: string
  summary: string
  outcomes: string[]
  forWhom: string
}

export const axPrograms: AxProgram[] = [
  {
    title: 'AI 도입·컨설팅',
    summary: '실무에 바로 쓰는 AI 워크플로우를 설계해 팀의 생산성을 끌어올립니다.',
    outcomes: [
      '재무·회계 업무 AI 자동화 설계',
      'Claude·MCP 기반 사내 워크플로우 구축',
      'AI 도입 교육 및 사내 가이드 정립',
    ],
    forWhom: 'AI로 업무 효율을 높이려는 조직·실무자',
  },
  {
    title: '강의·워크숍',
    summary:
      '한국공인회계사회(KICPA) AI 자문위원으로서, 직접 집필한 가이드를 레퍼런스로 깊이 있는 회계·AI 실무 교육을 제공합니다.',
    outcomes: [
      '회계·세무 실무자를 위한 맞춤형 AI 자동화 강의·워크숍',
      '직접 집필한 가이드북(2종)을 교육 레퍼런스로 활용',
      '공신력 있는 세미나·강연 진행',
    ],
    forWhom: '기업 교육 담당자, 대학·교육 기관, 세미나 주최자',
  },
  {
    title: '협업·외주 프로젝트',
    summary: '회계 도메인 지식이 필요한 제품·콘텐츠·도구 개발을 함께합니다.',
    outcomes: [
      '회계 SaaS 개발 협업',
      '데이터/MCP 기반 도구 개발',
      '전문 콘텐츠 제작 협업',
    ],
    forWhom: '도메인 전문성이 필요한 팀·스타트업',
  },
]

export const axAudience: string[] = [
  '회계·세무·재무 실무에 AI를 도입하려는 조직',
  'AI 자동화 사내 교육이 필요한 기업',
  '회계 도메인 전문성이 필요한 제품·콘텐츠 팀',
]

export const axFormat: { title: string; detail: string }[] = [
  { title: '진단·설계', detail: '업무 흐름을 진단하고 AI 적용 지점을 설계합니다.' },
  { title: '구축·교육', detail: 'Claude·MCP 기반 워크플로우를 구축하고 팀을 교육합니다.' },
  { title: '정착·고도화', detail: '사내 가이드로 정착시키고 지속적으로 고도화합니다.' },
]
