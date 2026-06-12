import { posts } from '#site/content'
import { Section, SectionLink } from '@/components/home/section'
import { PostCard } from '@/components/content-card'
import { NoteCarousel } from '@/components/note-carousel'
import { topicLabel } from '@/lib/topics'

const cleanLabel = (key: string) => topicLabel(key).replace(/^\d+\.\s*/, '')

export function BlogHighlights() {
  const recentPosts = posts
    .filter((p) => !p.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 6)

  if (recentPosts.length === 0) return null

  return (
    <Section
      id="blog"
      kicker="Blog"
      title="인사이트 공유"
      description="회계 실무 및 AI 활용 관련 인사이트 공유"
      action={<SectionLink href="/blog">블로그 전체 보기 →</SectionLink>}
    >
      <NoteCarousel>
        {recentPosts.map((p) => (
          <PostCard
            key={p.slug}
            title={p.title}
            description={p.description}
            url={`/${p.slugAsParams}`}
            date={p.date}
            category={cleanLabel(p.category)}
            variant="card"
          />
        ))}
      </NoteCarousel>
    </Section>
  )
}
