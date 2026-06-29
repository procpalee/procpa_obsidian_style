import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getAllPosts, getPostBySlug, formatDate } from '@/lib/blog'
import { content } from '@/lib/site-content'
import { JsonLd, blogPostingJsonLd } from '@/components/json-ld'

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  const og = `/api/og?kicker=BLOG&title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(`${post.categoryLabel} · ${formatDate(post.date)}`)}&variant=hero`
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${slug}`,
      type: 'article',
      images: [{ url: og, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description, images: [og] },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  // 같은 카테고리 내 이전/다음 (목록은 최신순)
  const same = getAllPosts().filter((p) => p.category === post.category)
  const i = same.findIndex((p) => p.slug === slug)
  const newer = i > 0 ? same[i - 1] : null
  const older = i >= 0 && i < same.length - 1 ? same[i + 1] : null

  return (
    <>
      <JsonLd data={blogPostingJsonLd(post)} />
      <article className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> {content.blog.backToList}
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
          <span className="rounded-full border border-border/60 px-2 py-0.5 text-foreground/80">{post.categoryLabel}</span>
          <span>{formatDate(post.date)}</span>
          <span aria-hidden>·</span>
          <span>{post.readingTime}분</span>
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-[-0.02em] sm:text-4xl [word-break:keep-all]">{post.title}</h1>
        {post.description && (
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground [word-break:keep-all]">{post.description}</p>
        )}
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="font-mono text-xs text-muted-foreground">#{tag}</span>
            ))}
          </div>
        )}

        <div
          className="prose prose-lg mt-10 max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        {(newer || older) && (
          <nav className="mt-16 grid gap-3 border-t border-border/60 pt-8 sm:grid-cols-2">
            {older ? (
              <Link
                href={`/blog/${older.slug}`}
                className="group rounded-2xl border border-border/60 p-5 transition-colors hover:border-foreground/40"
              >
                <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground">
                  <ArrowLeft className="h-3.5 w-3.5" /> 이전 글
                </span>
                <span className="mt-1.5 block font-medium group-hover:text-primary">{older.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {newer ? (
              <Link
                href={`/blog/${newer.slug}`}
                className="group rounded-2xl border border-border/60 p-5 text-right transition-colors hover:border-foreground/40"
              >
                <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground">
                  다음 글 <ArrowRight className="h-3.5 w-3.5" />
                </span>
                <span className="mt-1.5 block font-medium group-hover:text-primary">{newer.title}</span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </article>
    </>
  )
}
