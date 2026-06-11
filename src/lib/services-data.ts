import type { TopicKey } from '@/lib/topics'

export type ServiceSlug = 'audit' | 'icfr' | 'tax' | 'valuation' | 'consolidation-pa'

export type ServiceStep = { title: string; detail: string }
export type ServiceFaq = { q: string; a: string }

export type ServiceArea = {
  slug: ServiceSlug
  /** PageHero mono label */
  en: string
  /** 한글 제목 */
  title: string
  /** 허브 카드 한 줄 요약 */
  tagline: string
  /** 개요 단락 */
  summary: string
  /** 대상 — 누구를 위한 서비스인가 */
  forWhom: string[]
  /** 처음 받는 고객용 전환 장치(특히 외부감사) — 선택 */
  firstTimeNotes?: { title: string; body: string }
  /** 진행 과정 */
  process: ServiceStep[]
  faqs: ServiceFaq[]
  cta: string
  /** 관련 실무 콘텐츠 자동 연결 */
  contentCategory?: TopicKey
  contentTags?: string[]
  contentMatch?: string[]
  related?: ServiceSlug[]
}

// NOTE: 카피는 시작 초안입니다. 소유자가 실제 서비스 내용으로 다듬으세요.
export const serviceAreas: ServiceArea[] = [
  {
    slug: 'audit',
    en: 'External Audit',
    title: '외부감사',
    tagline: '처음 받는 외부감사부터 감사인 교체까지, 막막함을 단계별로 안내합니다.',
    summary:
      '상장·비상장 회계감사 In-charge 경험을 바탕으로, 재무제표 감사 전 과정을 회사 입장에서 함께 준비합니다. 감사 대상 여부 판단, 감사인 선임, 준비 자료, 일정, 자주 나오는 지적사항까지 — 처음 감사를 받는 회사가 헤매지 않도록 돕습니다.',
    forWhom: [
      '올해 처음 외부감사 대상이 된 회사',
      '감사인 교체(최초감사)를 앞둔 재무팀',
      '감사 준비 자료와 일정이 막막한 실무자',
      '지적사항을 줄이고 깔끔하게 마무리하고 싶은 담당자',
    ],
    firstTimeNotes: {
      title: '처음 외부감사를 받으시나요?',
      body:
        '외부감사는 "준비된 만큼" 수월해집니다. 감사 대상 판단(자산·매출·부채·종업원 기준), 감사인 선임 절차와 기한, 표준 요청자료(PBC) 목록, 감사 단계별 일정, 그리고 첫 감사에서 자주 나오는 지적사항을 미리 짚어드립니다. 부담 없이 현재 상황만 알려주세요.',
    },
    process: [
      { title: '감사 대상·범위 진단', detail: '외부감사 대상 여부와 감사 범위, 일정 가능성을 먼저 확인합니다.' },
      { title: '감사인 선임·준비 안내', detail: '감사인 선임 절차와 기한, PBC(요청자료) 목록과 준비 우선순위를 정리합니다.' },
      { title: '자료 정비·사전 점검', detail: '계정별 명세와 증빙을 사전 점검해 본 감사 전 리스크를 줄입니다.' },
      { title: '감사 대응·마무리', detail: '감사 진행 중 질의 대응과 조정사항 협의, 지적사항 정리까지 함께합니다.' },
    ],
    faqs: [
      { q: '우리 회사가 외부감사 대상인지 어떻게 아나요?', a: '자산총액·매출액·부채·종업원 수 기준 중 일정 요건을 충족하면 대상입니다. 현재 재무 규모만 알려주시면 빠르게 확인해 드립니다.' },
      { q: '감사 준비는 얼마나 걸리나요?', a: '회사 규모와 자료 정비 상태에 따라 다르지만, 보통 본 감사 4~8주 전부터 준비를 시작하는 것을 권합니다.' },
      { q: '비용은 어떻게 책정되나요?', a: '업종·규모·일정에 따라 달라집니다. 문의 폼에 상황을 남겨주시면 범위를 안내드립니다.' },
    ],
    cta: '외부감사 문의',
    contentCategory: '회계실무',
    contentTags: ['외부감사', '감사', 'audit'],
    contentMatch: ['외부감사', '감사'],
    related: ['icfr', 'consolidation-pa'],
  },
  {
    slug: 'icfr',
    en: 'Internal Control (ICFR)',
    title: '내부회계관리제도',
    tagline: '통제의 늪에 빠지지 않는 ‘진짜’ 내부회계 구축·평가.',
    summary:
      '내부회계관리제도(ICFR) 구축·설계평가·운영평가 In-charge 경험과 연결내부회계 구축 경험을 바탕으로, 형식이 아닌 실제로 작동하는 통제를 설계합니다. 과도한 통제로 실무가 마비되지 않도록 핵심 리스크 중심으로 정리합니다.',
    forWhom: [
      '내부회계관리제도를 처음 구축하는 회사',
      '설계·운영평가를 앞둔 재무팀',
      '연결 내부회계로 확장이 필요한 그룹사',
      '통제가 비대해져 정비가 필요한 담당자',
    ],
    process: [
      { title: '범위·리스크 평가', detail: '유의한 계정과 프로세스를 식별해 통제 범위를 합리적으로 설정합니다.' },
      { title: '통제 설계', detail: '핵심 통제 중심으로 RCM(통제기술서)을 설계하거나 정비합니다.' },
      { title: '운영·테스트', detail: '운영평가 절차와 증빙 체계를 마련하고 미비점을 개선합니다.' },
      { title: '보고·개선', detail: '평가 결과 보고와 미비점 개선 과제를 정리합니다.' },
    ],
    faqs: [
      { q: '내부회계는 언제부터 의무인가요?', a: '자산 규모 등 요건에 따라 단계적으로 적용됩니다. 회사 상황을 알려주시면 적용 시점을 안내드립니다.' },
      { q: '기존 통제가 너무 많아 부담입니다.', a: '핵심 리스크 중심으로 통제를 재정비하면 운영 부담을 크게 줄일 수 있습니다.' },
    ],
    cta: '내부회계 문의',
    contentCategory: '회계실무',
    contentTags: ['내부회계', 'ICFR', '내부통제'],
    contentMatch: ['icfr', '내부회계'],
    related: ['audit', 'consolidation-pa'],
  },
  {
    slug: 'tax',
    en: 'Tax',
    title: '세무',
    tagline: '실무에 바로 닿는 세무 자문과 신고 지원.',
    summary:
      '회계감사·자문 경험을 바탕으로 회계와 세무가 만나는 지점을 함께 풀어드립니다. 결산·세무조정, 세무 리스크 점검, 일상적 세무 질의 대응까지 실무 중심으로 지원합니다.',
    forWhom: [
      '결산·세무조정 지원이 필요한 회사',
      '세무 리스크를 사전 점검하고 싶은 재무팀',
      '회계-세무 차이로 고민하는 실무자',
    ],
    process: [
      { title: '현황 진단', detail: '재무·세무 현황과 주요 이슈를 파악합니다.' },
      { title: '리스크 점검', detail: '세무 리스크와 절세 여지를 점검합니다.' },
      { title: '신고·자문 지원', detail: '결산·세무조정과 신고를 지원하고 질의에 대응합니다.' },
    ],
    faqs: [
      { q: '회계자문과 세무를 함께 받을 수 있나요?', a: '네. 회계-세무가 얽힌 이슈는 함께 보는 것이 효율적입니다.' },
    ],
    cta: '세무 문의',
    contentCategory: '회계실무',
    contentTags: ['세무', '세무조정'],
    contentMatch: ['세무'],
    related: ['audit'],
  },
  {
    slug: 'valuation',
    en: 'Valuation',
    title: '가치평가',
    tagline: 'DCF·공정가치평가·손상검사 — 재무보고 목적 평가를 신뢰성 있게.',
    summary:
      '재무보고목적 공정가치평가, 손상검사, DCF 평가 업무 경험을 바탕으로 신뢰성 있는 평가를 수행합니다. 평가의 핵심 가정과 입력값을 투명하게 정리해 감사 대응까지 고려합니다.',
    forWhom: [
      '재무보고목적 공정가치평가가 필요한 회사',
      '영업권·자산 손상검사를 앞둔 재무팀',
      'M&A·투자 의사결정을 위한 가치평가가 필요한 담당자',
    ],
    process: [
      { title: '평가 범위·방법 결정', detail: '평가 목적에 맞는 방법(DCF, 시장접근법 등)을 결정합니다.' },
      { title: '데이터·가정 정리', detail: '핵심 입력값과 가정을 수집·검증합니다.' },
      { title: '평가 수행', detail: '모델을 구축하고 민감도를 분석합니다.' },
      { title: '보고·감사 대응', detail: '평가보고서를 작성하고 감사 질의에 대응합니다.' },
    ],
    faqs: [
      { q: 'DCF 템플릿을 받을 수 있나요?', a: '네. 자료실/제품에서 DCF 평가 템플릿을 무료로 제공합니다.' },
      { q: '감사 대응까지 도와주나요?', a: '평가의 가정·입력값을 감사인이 검토할 수 있도록 정리해 드립니다.' },
    ],
    cta: '가치평가 문의',
    contentCategory: '회계실무',
    contentTags: ['평가', 'DCF', '밸류에이션', '공정가치'],
    contentMatch: ['dcf', '평가', 'peer-group'],
    related: ['consolidation-pa'],
  },
  {
    slug: 'consolidation-pa',
    en: 'Consolidation & PA',
    title: '연결·회계자문(PA)',
    tagline: '연결 PA·IFRS 전환 등 까다로운 회계자문을 함께.',
    summary:
      'IFRS Conversion, 연결 PA(Purchase Accounting) 등 복잡한 회계자문 경험을 바탕으로, 연결 결산과 기준서 적용의 어려운 지점을 함께 해결합니다.',
    forWhom: [
      '연결 결산·연결 PA가 필요한 그룹사',
      'IFRS 전환을 준비하는 회사',
      '복잡한 기준서 적용 판단이 필요한 재무팀',
    ],
    process: [
      { title: '이슈 정의', detail: '연결·기준서 적용의 핵심 쟁점을 정의합니다.' },
      { title: '기준 검토·판단', detail: '관련 기준서를 검토하고 회계처리 방향을 제시합니다.' },
      { title: '적용·문서화', detail: '회계처리를 적용하고 감사 대응을 위해 문서화합니다.' },
    ],
    faqs: [
      { q: '연결 PA가 무엇인가요?', a: '사업결합 시 취득 자산·부채를 공정가치로 배분(Purchase Price Allocation)하는 회계처리입니다.' },
    ],
    cta: '회계자문 문의',
    contentCategory: '회계실무',
    contentTags: ['연결', 'PA', 'IFRS', '회계자문'],
    contentMatch: ['연결', 'ifrs', 'pa'],
    related: ['valuation', 'audit'],
  },
]

export const getService = (slug: string): ServiceArea | undefined =>
  serviceAreas.find((s) => s.slug === slug)
