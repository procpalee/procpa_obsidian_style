import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border/60">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-6 py-6 text-center text-[13px] text-muted-foreground md:flex-row md:items-center md:justify-between md:py-5 md:text-left">
        <p className="font-mono">© {new Date().getFullYear()} PROCPA</p>
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link href="/services" className="hover:text-foreground">서비스</Link>
          <Link href="/ax" className="hover:text-foreground">AX 컨설팅</Link>
          <Link href="/products" className="hover:text-foreground">제품</Link>
          <Link href="/contact" className="hover:text-foreground">문의</Link>
          <Link href="/terms" className="hover:text-foreground">이용약관</Link>
          <Link href="/disclaimer" className="hover:text-foreground">면책조항</Link>
          <Link href="/sitemap.xml" className="hover:text-foreground">사이트맵</Link>
        </nav>
      </div>
    </footer>
  )
}
