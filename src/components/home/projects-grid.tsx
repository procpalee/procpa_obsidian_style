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

export function ProjectsGrid() {
  return (
    <Section
      id="projects"
      kicker="Projects"
      title="직접 만든 도구들"
      description="회계·콘텐츠 작업의 불편함을 직접 코드로 풀어, 웹과 MCP 서버로 배포해 운영합니다."
      action={<SectionLink href="/projects">프로젝트 전체 보기 →</SectionLink>}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
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
