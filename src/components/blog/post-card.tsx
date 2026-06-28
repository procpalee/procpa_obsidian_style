import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { type PostMeta, formatDate } from '@/lib/blog-shared'

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl border border-border/60 p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-sm"
    >
      <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
        <span className="rounded-full border border-border/60 px-2 py-0.5 text-foreground/80">
          {post.categoryLabel}
        </span>
        <span>{formatDate(post.date)}</span>
        <span aria-hidden>·</span>
        <span>{post.readingTime}분</span>
      </div>
      <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight group-hover:text-primary">
        {post.title}
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {post.description}
      </p>
      {post.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {post.tags.slice(0, 4).map((t) => (
            <span key={t} className="font-mono text-xs text-muted-foreground">
              #{t}
            </span>
          ))}
        </div>
      )}
      <span className="mt-4 inline-flex items-center gap-1 border-t border-border/60 pt-3 text-sm font-medium text-primary transition-opacity group-hover:opacity-80">
        읽기 <ArrowUpRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  )
}
