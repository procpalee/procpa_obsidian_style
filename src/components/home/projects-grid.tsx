import { posts } from '#site/content'
import { Section, SectionLink } from '@/components/home/section'
import { ProjectCard } from '@/components/project-card'
import { projects } from '@/lib/projects-data'

/** articleMatch(slugAsParams 부분 문자열)로 관련 개발 글의 라우트를 찾는다. */
export function resolveArticleHref(articleMatch?: string): string | undefined {
  if (!articleMatch) return undefined
  const post = posts.find((p) => !p.draft && p.slugAsParams.includes(articleMatch))
  return post ? `/${post.slugAsParams}` : undefined
}

export function ProjectsGrid({ limit }: { limit?: number } = {}) {
  const shown = limit ? projects.slice(0, limit) : projects
  return (
    <Section
      id="projects"
      kicker="Projects"
      title="개발 프로젝트"
      description="실무 및 컨텐츠 작업을 위한 위한 다양한 웹/앱, MCP 서버 등을 개발 및 배포합니다."
      action={<SectionLink href="/projects">프로젝트 전체 보기 →</SectionLink>}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <ProjectCard
            key={p.key}
            project={p}
            articleHref={resolveArticleHref(p.articleMatch)}
          />
        ))}
      </div>
    </Section>
  )
}
