import Link from 'next/link'
import { content } from '@/lib/site-content'

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border/60">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-3 px-6 py-5 text-center text-[13px] text-muted-foreground md:h-14 md:flex-row md:justify-between md:py-0 md:text-left">
        <p className="font-mono">© {new Date().getFullYear()} PROCPA</p>
        <nav className="flex items-center gap-5">
          {content.nav.footer.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
