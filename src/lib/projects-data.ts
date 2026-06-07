// 개발 프로젝트 — 홈 Projects 섹션과 /projects 페이지에서 공용으로 사용.
// 마케팅용 큐레이션 정보(스택·배포 링크·상태)를 담는다.
// 관련 개발 글은 articleMatch(slugAsParams 부분 문자열)로 #site/content에서 런타임 매칭한다.

export type ProjectCategory = 'Web App' | 'Plugin' | 'MCP Server'
export type ProjectStatus = 'live' | 'wip' | 'archived'

export type Project = {
  key: string
  name: string
  /** 한 줄 요약 */
  tagline: string
  /** 2~3문장 설명 */
  description: string
  stack: string[]
  category: ProjectCategory
  status: ProjectStatus
  year: string
  /** 배포(Live) URL */
  liveUrl?: string
  /** 소스 저장소 */
  repoUrl?: string
  /** 관련 개발 글 매칭용 slugAsParams 부분 문자열 */
  articleMatch?: string
}

export const projects: Project[] = [
  {
    key: 'procpa',
    name: 'PROCPA',
    tagline: '옵시디언으로 쓰고 그대로 웹에 올리는 개인 지식 플랫폼',
    description:
      '옵시디언에서 작성한 마크다운을 빌드 파이프라인으로 검증·변환해 그대로 발행하는 지식 관리 사이트입니다. 위키링크·백링크·지식 그래프까지 직접 구현했습니다.',
    stack: ['Next.js', 'TypeScript', 'Velite', 'Tailwind'],
    category: 'Web App',
    status: 'live',
    year: '2026',
    liveUrl: 'https://procpa.co.kr',
    articleMatch: 'procpa-개인-지식관리',
  },
  {
    key: 'marklog',
    name: 'Marklog',
    tagline: '네이버 블로그를 위한 마크다운 커스터마이징 변환기',
    description:
      '마크다운을 네이버 블로그 에디터에 바로 붙여넣을 수 있는 서식으로 변환합니다. 코드블록·표·콜아웃 등 까다로운 요소를 자동 정리해 글쓰기 시간을 줄여줍니다.',
    stack: ['React', 'TypeScript'],
    category: 'Web App',
    status: 'live',
    year: '2026',
    liveUrl: 'https://marklog.procpa.co.kr/',
    articleMatch: 'marklog-네이버',
  },
  {
    key: 'marklog-obsidian',
    name: 'Marklog for Obsidian',
    tagline: '옵시디언에서 바로 변환하는 Marklog 플러그인',
    description:
      'Marklog 변환 기능을 옵시디언 안으로 가져온 플러그인입니다. 작성 중인 노트를 떠나지 않고 네이버 블로그용 서식으로 변환·복사할 수 있습니다.',
    stack: ['TypeScript', 'Obsidian API'],
    category: 'Plugin',
    status: 'live',
    year: '2026',
    articleMatch: 'marklog-for-obsidian',
  },
  {
    key: 'clickthumb',
    name: 'ClickThumb',
    tagline: '디자인 툴 없이 10초 만에 끝내는 썸네일 제작기',
    description:
      '디자인 도구 없이도 클릭 몇 번으로 일관된 썸네일을 만드는 경량 웹 도구입니다. 블로그·콘텐츠 제작의 반복 작업을 빠르게 처리합니다.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    category: 'Web App',
    status: 'live',
    year: '2026',
    liveUrl: 'https://clickthumb.procpa.co.kr/',
    articleMatch: 'clickthumb',
  },
  {
    key: 'opendart-mcp',
    name: 'OpenDART MCP',
    tagline: 'AI가 한국 기업 공시를 직접 읽는 MCP 웹 서버',
    description:
      '전자공시시스템(OpenDART) API를 연동한 MCP 서버입니다. 클로드에 커스텀 커넥터로 연결하면 공시 데이터를 직접 불러와 분석할 수 있도록 웹에 배포했습니다.',
    stack: ['MCP', 'TypeScript', 'OpenDART API'],
    category: 'MCP Server',
    status: 'live',
    year: '2026',
    articleMatch: '전자공시시스템opendart',
  },
  {
    key: 'peer-group-mcp',
    name: 'Peer-Group-Search MCP',
    tagline: 'DCF 평가의 유사회사 선정을 자동화하는 MCP 서버',
    description:
      'DCF 평가에서 가장 손이 많이 가는 유사회사(Peer Group) 선정과 데이터 수집을 자동화하는 MCP 서버입니다. 클로드 엑셀 기반 평가 워크플로우와 연결됩니다.',
    stack: ['MCP', 'TypeScript', 'Financial Data'],
    category: 'MCP Server',
    status: 'wip',
    year: '2026',
    articleMatch: 'dcf-평가를-위한-peer-group',
  },
]

export const statusLabel: Record<ProjectStatus, string> = {
  live: 'Live',
  wip: 'In Progress',
  archived: 'Archived',
}
