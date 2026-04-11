import Link from 'next/link'
import Image from 'next/image'
import { ThemeToggle } from '@/components/theme-toggle'
import { PalettePicker } from '@/components/palette-picker'
import { CommandPalette } from '@/components/command-palette'

const nav = [
  { href: '/', label: '홈' },
  { href: '/about', label: '소개' },
  { href: '/explore', label: '탐색' },
  { href: '/graph', label: '그래프' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" aria-label="PROCPA" className="flex items-center">
          <Image
            src="/procpa_light_v2.png"
            alt="PROCPA"
            width={1134}
            height={317}
            priority
            className="block h-7 w-auto dark:hidden"
          />
          <Image
            src="/procpa_dark_v2.png"
            alt="PROCPA"
            width={1134}
            height={317}
            priority
            className="hidden h-7 w-auto dark:block"
          />
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
          <div className="ml-2 flex items-center gap-0.5">
            <CommandPalette />
            <PalettePicker />
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  )
}
