import Link from 'next/link'
import { socials } from '@/components/social-icons'

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border/60">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-3 px-6 py-5 text-center text-xs text-muted-foreground md:h-14 md:grid-cols-3 md:py-0 md:text-left">
        <p className="font-mono md:justify-self-start">© {new Date().getFullYear()} PROCPA</p>
        <nav className="flex items-center justify-center gap-5 md:justify-self-center">
          <Link href="/terms" className="hover:text-foreground">이용약관</Link>
          <Link href="/disclaimer" className="hover:text-foreground">면책조항</Link>
          <Link href="/sitemap.xml" className="hover:text-foreground">사이트맵</Link>
        </nav>
        <div className="flex items-center justify-center gap-4 md:justify-self-end">
          {socials.map((s) => {
            const Icon = s.icon
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="transition-colors hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
