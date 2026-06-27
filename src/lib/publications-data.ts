// 출판물(가이드북·저서) — /portfolio 페이지에서 사용.
// 본문은 외부(위키독스)에 있고 여기서는 백링크만 제공한다.

export type Publication = {
  key: string
  title: string
  description: string
  /** 표지 이미지 (public 경로) */
  cover?: string
  /** 게시 플랫폼 표시용 */
  platform: string
  url: string
  year: string
  /** 진행 상태 라벨 (선택) */
  status?: string
}

export const publications: Publication[] = [
  {
    key: 'antigravity-guide',
    title: '비개발자를 위한 Antigravity 가이드',
    description:
      '코드를 모르는 실무자도 따라 할 수 있는 Antigravity(AI 코딩 환경) 입문·활용 가이드.',
    cover: '/covers/antigravity.jpg',
    platform: 'Wikidocs',
    url: 'https://wikidocs.net/book/18574',
    year: '2026',
    status: '연재 중',
  },
  {
    key: 'claude-excel-guide',
    title: '클로드 엑셀(Claude for Excel) 가이드',
    description:
      'Claude for Excel로 회계·재무 업무를 자동화하는 실전 활용 가이드. 스킬·커넥터 활용법 포함.',
    cover: '/covers/claude-excel.jpg',
    platform: 'Wikidocs',
    url: 'https://wikidocs.net/book/19374',
    year: '2026',
    status: '연재 중',
  },
]
