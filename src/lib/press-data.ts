// 활동·언론 보도 — /portfolio 페이지의 '뉴스' 섹션에서 사용.
// 한국공인회계사회(한공회) 간담회 등 외부 활동/보도 링크를 모은다.
// 항목을 추가하면 자동 렌더되고, 비어 있으면 '준비 중' 안내가 표시된다.
//
// 예시(실제 본인 등장 보도로 확인 후 교체):
// {
//   key: 'kicpa-ai-roundtable',
//   title: 'AI 활용 공유 회계사회 전국 순회 간담회',
//   outlet: '한국세정신문',
//   date: '2026',
//   url: 'https://www.taxtimes.co.kr/news/article.html?no=275171',
// },

export type Press = {
  key: string
  title: string
  /** 매체/주최 */
  outlet: string
  /** 시점 라벨 */
  date?: string
  url: string
}

export const press: Press[] = [
  {
    key: 'kicpa-ai-3396',
    title: `"AI, 위기 아닌 기회"… 한공회 간담회장 가득 메운 '열기'`,
    outlet: 'CPA뉴스',
    date: '2026.06.23',
    url: 'https://news.kicpa.or.kr/news/articleView.html?idxno=3396',
  },
  {
    key: 'kicpa-ai-3112',
    title: `한공회, AI 실무 격차 해소 나섰다…"활용 사례 공유 기회 확대"`,
    outlet: 'CPA뉴스',
    date: '2026.05.18',
    url: 'https://news.kicpa.or.kr/news/articleView.html?idxno=3112',
  },
]
