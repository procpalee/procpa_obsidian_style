import { posts, series } from '#site/content'

export const dynamic = 'force-static'

const SITE = 'https://procpa.co.kr'

// llms.txt — concise, link-first map of the site for LLM-based search/agents.
// Spec: https://llmstxt.org
export function GET() {
  const sortedPosts = posts
    .filter((p) => !p.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))

  const sortedSeries = series
    .filter((s) => !s.draft)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  const postLines = sortedPosts
    .map((p) => `- [${p.title}](${SITE}/${p.slugAsParams}): ${p.description}`)
    .join('\n')

  const seriesLines = sortedSeries
    .map((s) => `- [${s.title}](${SITE}/${s.slugAsParams}): ${s.description}`)
    .join('\n')

  const body = `# PROCPA — 회계사의 기록

> 한국공인회계사 이재현의 지식베이스입니다. 회계감사·내부회계(ICFR)·기업가치평가·원가분석 등 회계·재무 실무 전문성에, 데이터·AI를 접목한 생산성 향상 노하우를 더해 글과 가이드, 오픈소스 프로젝트로 공유합니다. 저자는 한국공인회계사회 AI 자문위원, 방위사업청 원가관리 자문위원으로 활동하고 있습니다.

## 저자 / 문의
- [소개](${SITE}/about): 경력·자격·자문 이력 및 전문 분야
- [문의](${SITE}/contact): 업무(회계·재무 자문)·AI 컨설팅·강의/워크숍·협업 문의
- [자료실](${SITE}/downloads): 실무 템플릿 등 다운로드 자료
- [전체 본문(llms-full.txt)](${SITE}/llms-full.txt): 모든 글의 전문을 포함한 버전

## Series
${seriesLines}

## Posts
${postLines}
`

  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  })
}
