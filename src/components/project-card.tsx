import { ArrowUpRight } from 'lucide-react'
import { type Project, type ProjectStatus, statusLabel } from '@/lib/projects-data'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

const statusDot: Record<ProjectStatus, string> = {
  live: 'bg-emerald-500',
  wip: 'bg-amber-500',
  archived: 'bg-muted-foreground',
}

function StatusPill({ status }: { status: ProjectStatus }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
      <span className={`h-1.5 w-1.5 rounded-full ${statusDot[status]}`} />
      {statusLabel[status]}
    </span>
  )
}

export function ProjectCard({
  project,
  detailed = false,
}: {
  project: Project
  detailed?: boolean
}) {
  const { name, tagline, description, stack, category, status, year, liveUrl, repoUrl } = project

  return (
    <div className="group flex h-full flex-col rounded-2xl border border-border/60 p-5 transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
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
            className="rounded-full bg-secondary px-2.5 py-0.5 font-mono text-xs text-muted-foreground"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-4 border-t border-border/60 pt-4 text-sm">
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
        {repoUrl && (
          <a
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            Repository
          </a>
        )}
        <span className="ml-auto font-mono text-xs text-muted-foreground">{year}</span>
      </div>
    </div>
  )
}
