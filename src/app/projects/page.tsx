import type { Metadata } from 'next'
import { ProjectCard } from '@/components/project-card'
import { PageHero } from '@/components/page-hero'
import { resolveArticleHref } from '@/components/home/projects-grid'
import { projects, type ProjectCategory } from '@/lib/projects-data'

export const metadata: Metadata = {
  title: '프로젝트',
  description:
    '회계·콘텐츠 작업의 불편함을 직접 코드로 풀어 만든 웹 앱·플러그인·MCP 서버 모음.',
}

const order: ProjectCategory[] = ['Web App', 'Plugin', 'MCP Server']

const categoryTitle: Record<ProjectCategory, string> = {
  'Web App': '웹 앱',
  Plugin: '플러그인',
  'MCP Server': 'MCP 서버',
}

export default function ProjectsPage() {
  const groups = order
    .map((cat) => ({ cat, items: projects.filter((p) => p.category === cat) }))
    .filter((g) => g.items.length > 0)

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-14 sm:py-20">
      <PageHero
        en="Projects"
        ko="직접 만든 도구들"
        description="실무에서 마주친 불편함을 코드로 풀어, 웹과 MCP 서버로 배포해 운영합니다. 각 프로젝트의 제작 과정은 글로도 정리해 두었습니다."
      />

      <div className="mt-20 space-y-20">
        {groups.map((g) => (
          <section key={g.cat}>
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {g.cat}
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              {categoryTitle[g.cat]}
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((p) => (
                <ProjectCard
                  key={p.key}
                  project={p}
                  articleHref={resolveArticleHref(p.articleMatch)}
                  detailed
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
