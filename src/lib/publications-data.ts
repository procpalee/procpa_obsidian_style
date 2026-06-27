// 출판물(가이드북·저서) — /portfolio 페이지에서 사용.
// 본문은 외부(위키독스/네이버)에 있고 여기서는 백링크만 제공한다.
// TODO: 각 항목의 url 을 실제 위키독스/네이버 주소로 교체.

import { siteConfig } from '@/lib/site-config'

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
    key: 'icfr-guide',
    title: '내부회계관리제도 실무 가이드북',
    description:
      '도입 배경부터 설계·운영평가까지, 내부회계관리제도(ICFR) 실무를 단계별로 정리한 가이드북.',
    cover: '/covers/icfr.jpg',
    platform: 'Wikidocs',
    url: siteConfig.wikidocs,
    year: '2026',
    status: '연재 중',
  },
  {
    key: 'antigravity-guide',
    title: '비개발자를 위한 Antigravity 가이드',
    description:
      '코드를 모르는 실무자도 따라 할 수 있는 Antigravity(AI 코딩 환경) 입문·활용 가이드.',
    cover: '/covers/antigravity.jpg',
    platform: 'Wikidocs',
    url: siteConfig.wikidocs,
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
    url: siteConfig.wikidocs,
    year: '2026',
    status: '연재 중',
  },
  {
    key: 'claude-cowork-guide',
    title: '클로드 코워크(Claude Cowork) 실무 가이드',
    description:
      'Claude Cowork로 협업·문서·업무 흐름을 자동화하는 실무 활용 가이드.',
    cover: '/covers/claude-cowork.jpg',
    platform: 'Wikidocs',
    url: siteConfig.wikidocs,
    year: '2026',
    status: '연재 중',
  },
]
