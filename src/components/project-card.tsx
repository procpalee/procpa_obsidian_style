import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { type Project, type ProjectStatus, statusLabel } from '@/lib/projects-data'

const statusDot: Record<ProjectStatus, string> = {
  live: 'bg-emerald-500',
  wip: 'bg-amber-500',
  archived: 'bg-muted-foreground',
}

function StatusPill({ status }: { status: ProjectStatus }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
      <span className={`h-1.5 w-1.5 rounded-full ${statusDot[status]}`} />
      {statusLabel[status]}
    </span>
  )
}

export function ProjectCard({
  project,
  articleHref,
  detailed = false,
}: {
  project: Project
  articleHref?: string
  detailed?: boolean
}) {
  const { name, tagline, description, stack, category, status, year, liveUrl } = project

  return (
    <div className="group flex flex-col rounded-2xl border border-border/60 p-5 transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {category}
        </span>
        <StatusPill status={status} />
      </div>

      <h3 className="mt-3 text-lg font-semibold tracking-tight">{name}</h3>
      <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{tagline}</p>
      {detailed && (
        <p className="mt-3 text-base leading-relaxed text-muted-foreground/90">{description}</p>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {stack.map((s) => (
          <span
            key={s}
            className="rounded-full bg-secondary px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-4 border-t border-border/60 pt-4 text-[13px]">
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-medium text-primary transition-opacity hover:opacity-80"
          >
            Live
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        )}
        {articleHref && (
          <Link
            href={articleHref}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            제작기 →
          </Link>
        )}
        <span className="ml-auto font-mono text-[11px] text-muted-foreground">{year}</span>
      </div>
    </div>
  )
}
