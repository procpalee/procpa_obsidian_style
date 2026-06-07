import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-5 text-center text-[13px] text-muted-foreground md:h-14 md:flex-row md:justify-between md:py-0 md:text-left">
        <p className="font-mono">© {new Date().getFullYear()} PROCPA</p>
        <nav className="flex items-center gap-5">
          <Link href="/terms" className="hover:text-foreground">이용약관</Link>
          <Link href="/disclaimer" className="hover:text-foreground">면책조항</Link>
          <Link href="/sitemap.xml" className="hover:text-foreground">사이트맵</Link>
        </nav>
      </div>
    </footer>
  )
}
