import { posts } from '#site/content'
import { Section, SectionLink } from '@/components/home/section'
import { PostCard } from '@/components/content-card'

export function BlogHighlights() {
  const recentPosts = posts
    .filter((p) => !p.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 4)

  if (recentPosts.length === 0) return null

  return (
    <Section
      id="blog"
      kicker="Blog"
      title="인사이트와 가이드"
      description="실무에 바로 쓰는 회계·AI 인사이트와, 깊이 있게 정리한 실무 가이드를 정리합니다."
      action={<SectionLink href="/blog">블로그 전체 보기 →</SectionLink>}
    >
      <div className="divide-y divide-border/60">
        {recentPosts.map((p) => (
          <PostCard
            key={p.slug}
            title={p.title}
            description={p.description}
            url={`/${p.slugAsParams}`}
            date={p.date}
            tags={p.tags}
            variant="list"
          />
        ))}
      </div>
    </Section>
  )
}
