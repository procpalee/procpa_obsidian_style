import Link from 'next/link'

const links = [
  { href: '/', label: '홈' },
  { href: '/blog', label: '블로그' },
  { href: '/series', label: '시리즈' },
]

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-24 sm:py-32">
      <p className="font-mono text-sm uppercase tracking-widest text-primary">404</p>
      <h1 className="mt-3 text-balance font-bold leading-[1.1] tracking-[-0.03em] text-[clamp(2.25rem,4.5vw,3.75rem)]">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-muted-foreground text-[clamp(1.0625rem,1.6vw,1.375rem)]">
        주소가 바뀌었거나 삭제된 페이지일 수 있습니다. 아래 링크로 이동해 보세요.
      </p>
      <nav className="mt-10 flex flex-wrap gap-3">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-full border border-border bg-secondary/50 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
