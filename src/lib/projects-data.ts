// 개발 프로젝트 — 홈 Projects 섹션과 /portfolio 페이지에서 공용으로 사용.
// 마케팅용 큐레이션 정보(스택·배포 링크·상태)를 담는다.

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
}

export const projects: Project[] = [
  {
    key: 'marklog',
    name: 'Marklog',
    tagline: '네이버 블로그용 마크다운 변환기 — 웹 + 옵시디언 플러그인',
    description:
      '마크다운을 네이버 블로그 에디터 서식으로 변환합니다. 코드블록·표·콜아웃 등 까다로운 요소를 자동 정리하며, 웹앱과 옵시디언 플러그인 두 가지로 제공해 글쓰기 흐름을 끊지 않습니다.',
    stack: ['React', 'TypeScript', 'Obsidian API'],
    category: 'Web App',
    status: 'live',
    year: '2026',
    liveUrl: 'https://marklog.procpa.co.kr/',
    repoUrl: 'https://github.com/procpalee/Marklog',
  },
  {
    key: 'protask',
    name: 'Protask',
    tagline: '직접 호스팅하는 프로젝트·GTD 태스크 매니저',
    description:
      'Supabase·Vercel에 직접 올려 쓰는 개인용 작업 관리 도구입니다. 테이블·칸반·캘린더 등 다양한 뷰와 GTD 워크플로우, Excalidraw 캔버스 기반 계획 시각화를 지원하는 설치형 PWA입니다.',
    stack: ['React', 'TypeScript', 'Supabase', 'PWA'],
    category: 'Web App',
    status: 'live',
    year: '2026',
    repoUrl: 'https://github.com/procpalee/protask',
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
    repoUrl: 'https://github.com/procpalee/ClickThumb',
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
    repoUrl: 'https://github.com/procpalee/OpenDART-MCP-Server',
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
    repoUrl: 'https://github.com/procpalee/DCF-Peergroup-Search',
  },
]

export const statusLabel: Record<ProjectStatus, string> = {
  live: 'Live',
  wip: 'In Progress',
  archived: 'Archived',
}
