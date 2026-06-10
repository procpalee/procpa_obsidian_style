import Link from 'next/link'
import { socials } from '@/components/social-icons'

const columns: { label: string; links: { href: string; label: string; external?: boolean }[] }[] = [
  {
    label: 'Content',
    links: [
      { href: '/blog', label: '블로그' },
      { href: '/series', label: '시리즈' },
      { href: '/downloads', label: '자료실' },
    ],
  },
  {
    label: 'About',
    links: [
      { href: '/about', label: '소개' },
      { href: '/projects', label: '프로젝트' },
    ],
  },
  {
    label: 'Contact',
    links: [
      { href: '/contact', label: '문의하기' },
      { href: 'mailto:wogus3575@naver.com', label: '이메일', external: true },
    ],
  },
  {
    label: 'More',
    links: [
      { href: '/rss.xml', label: 'RSS', external: true },
      { href: '/sitemap.xml', label: '사이트맵', external: true },
      { href: '/terms', label: '이용약관' },
      { href: '/disclaimer', label: '면책조항' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border/60">
      <div className="mx-auto max-w-[1440px] px-6 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <p className="font-mono text-sm font-semibold tracking-tight">PROCPA</p>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-muted-foreground [word-break:keep-all]">
              한국공인회계사 이재현. 회계·재무 전문성에 AI의 생산성을 더합니다.
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.label} aria-label={col.label}>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {col.label}
              </p>
              <ul className="mt-4 space-y-2.5 text-[13px]">
                {col.links.map((l) => (
                  <li key={l.href}>
                    {l.external ? (
                      <a
                        href={l.href}
                        target={l.href.startsWith('http') ? '_blank' : undefined}
                        rel={l.href.startsWith('http') ? 'noreferrer' : undefined}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} className="text-muted-foreground transition-colors hover:text-foreground">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-border/60 pt-6 text-[13px] text-muted-foreground sm:flex-row sm:justify-between">
          <p className="font-mono">© {new Date().getFullYear()} PROCPA</p>
          <div className="flex items-center gap-4">
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
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
