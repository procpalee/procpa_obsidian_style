// 템플릿·RPA 제품 — /products 허브 + /products/[slug] 상세에서 사용.
// 무료(free) 티어는 이메일 게이트(호스팅 폼 제출 후 파일 제공).
// 유료(premium)·구독은 다음 단계 — 구조/훅(price, premiumFeatures, comingSoon)만 둔다.

export type ProductType = 'template' | 'rpa'
export type ProductTier = 'free' | 'premium'

export type Product = {
  slug: string
  name: string
  tagline: string
  description: string
  type: ProductType
  tier: ProductTier
  features: string[]
  /** free 티어: 이메일 게이트 통과 후 받을 최종 파일 */
  fileUrl?: string
  /** free 티어: 제출 후 fileUrl로 redirect 설정된 Tally 이메일-수집 폼 */
  gateFormUrl?: string
  /** 다음 단계 훅 (현재 UI 없음) */
  price?: number
  premiumFeatures?: string[]
  comingSoon?: boolean
  /** 관련 프로젝트(projects-data.ts key) / 콘텐츠 매칭 */
  projectKey?: string
  contentMatch?: string[]
}

export const products: Product[] = [
  {
    slug: 'dcf-template',
    name: 'DCF 평가 템플릿',
    tagline: '클로드 엑셀로 작성한 실무용 DCF 모델링 템플릿',
    description:
      'WACC·성장률·민감도 분석까지 포함한 DCF 평가 엑셀 템플릿입니다. 입력값만 바꾸면 바로 평가가 돌아가도록 구성했습니다. 이메일을 남기시면 무료로 받으실 수 있습니다.',
    type: 'template',
    tier: 'free',
    features: ['WACC 산정 시트', '5개년 추정·잔여가치', '민감도 분석', '클로드 엑셀 연동 가이드'],
    fileUrl: '/files/dcf_test_v2.xlsx',
    // gateFormUrl 미설정 시 site-config의 emailGateDefault 사용
    contentMatch: ['dcf', '평가'],
  },
  {
    slug: 'cashflow-rpa',
    name: '현금흐름표 자동화 RPA',
    tagline: '재무제표에서 현금흐름표를 자동 생성하는 RPA',
    description:
      '반복적인 현금흐름표 작성을 자동화하는 RPA 도구입니다. 유료 버전으로 준비 중이며, 관심 있으신 분은 문의 주세요.',
    type: 'rpa',
    tier: 'premium',
    comingSoon: true,
    features: ['재무제표 입력 → 현금흐름표 자동 생성', '간접법 기준', '검증 로직 내장'],
    premiumFeatures: ['맞춤 계정 매핑', '다회사 일괄 처리', '업데이트 지원'],
    contentMatch: ['현금흐름', 'rpa'],
  },
]

export const getProduct = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug)
