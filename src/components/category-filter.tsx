'use client'

/**
 * Shared category chip used by the blog feed (`/blog`) and browse explorer
 * (`/browse`). Renders a single pill toggle with a count.
 */
export function Chip({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-xs transition-colors ${
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border/60 text-muted-foreground hover:border-foreground/40 hover:text-foreground'
      }`}
    >
      <span>{label}</span>
      <span className={active ? 'opacity-70' : 'text-muted-foreground/60'}>{count}</span>
    </button>
  )
}
