// 4 핵심 서비스 — /services 페이지와 디자인 컨셉 미리보기에서 공용으로 사용.
// about-data.ts 패턴을 따른다.

export type Service = {
  key: string
  title: string
  /** 한 줄 요약 (카드/리스트용) */
  summary: string
  /** 기대 성과 / 제공 내용 */
  outcomes: string[]
  /** 이런 분께 */
  forWhom: string
  /** CTA 라벨 */
  cta: string
}

export const services: Service[] = [
  {
    key: 'accounting',
    title: '회계·재무 자문',
    summary: '회계감사·결산·내부회계·공정가치평가 등 다양한 서비스를 수행합니다.',
    outcomes: [
      'IFRS/K-GAAP 회계처리 및 결산 자문',
      '내부회계관리제도(ICFR) 구축·평가',
      '공정가치평가·손상검사·PA 등 회계자문',
    ],
    forWhom: '결산·감사 대응이 필요한 기업, 재무팀',
    cta: '회계 자문 문의',
  },
  {
    key: 'ai',
    title: 'AI 도입·컨설팅',
    summary: '실무에 바로 쓰는 AI 워크플로우를 설계해 팀의 생산성을 끌어올립니다.',
    outcomes: [
      '재무·회계 업무 AI 자동화 설계',
      'Claude·MCP 기반 사내 워크플로우 구축',
      'AI 도입 교육 및 사내 가이드 정립',
    ],
    forWhom: 'AI로 업무 효율을 높이려는 조직·실무자',
    cta: 'AI 컨설팅 문의',
  },
  {
    key: 'teaching',
    title: '강의·워크숍',
    summary: '한국공인회계사회(KICPA) AI 자문위원으로서, 직접 집필한 가이드를 레퍼런스로 활용하여 깊이 있는 회계·AI 실무 교육을 제공합니다.',
    outcomes: [
      '회계·세무 실무자를 위한 맞춤형 AI 자동화 강의 및 워크숍',
      '직접 집필한 가이드북(2종)을 교육 레퍼런스로 활용',
      '한국공인회계사회 AI 자문위원으로서 공신력 있는 세미나·강연 진행',
    ],
    forWhom: '기업 교육 담당자, 대학 및 교육 기관, 세미나 주최자',
    cta: '강의 문의',
  },
  {
    key: 'collab',
    title: '협업·외주 프로젝트',
    summary: '회계 도메인 지식이 필요한 제품·콘텐츠·도구 개발을 함께합니다.',
    outcomes: [
      '회계 SaaS 개발 협업',
      '데이터/MCP 기반 도구 개발',
      '전문 콘텐츠 제작 협업',
    ],
    forWhom: '도메인 전문성이 필요한 팀·스타트업',
    cta: '협업 제안하기',
  },
]
