import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { BlogIndex } from '@/components/blog/blog-index'
import { getAllPosts, getAllTags } from '@/lib/blog'
import { content } from '@/lib/site-content'

const t = content.blog
const DESC = content.meta.blog.description
const ogTitle = encodeURIComponent(content.meta.blog.title)
const og = `/api/og?kicker=BLOG&title=${ogTitle}`

export const metadata: Metadata = {
  title: content.meta.blog.title,
  description: DESC,
  alternates: { canonical: '/blog' },
  openGraph: { title: content.meta.blog.title, description: DESC, url: '/blog', images: [{ url: og, width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: content.meta.blog.title, description: DESC, images: [og] },
}

export default function BlogPage() {
  const posts = getAllPosts()
  const tags = getAllTags()
  return (
    <>
      <div className="mx-auto max-w-[1440px] px-6 py-14 sm:py-20">
        <PageHero en={t.hero.en} ko={t.hero.ko} description={t.hero.description} />
      </div>
      <section className="border-t border-border/60">
        <div className="mx-auto max-w-[1440px] px-6 py-12 sm:py-16">
          <BlogIndex posts={posts} tags={tags} />
        </div>
      </section>
    </>
  )
}
