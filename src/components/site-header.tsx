'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/theme-toggle'
import dynamic from 'next/dynamic'
const CommandPalette = dynamic(() => import('@/components/command-palette').then((m) => m.CommandPalette), { ssr: false })
import { socials } from '@/components/social-icons'

const nav = [
  { href: '/', label: '홈' },
  { href: '/about', label: '소개' },
  { href: '/series', label: '시리즈' },
  { href: '/blog', label: '블로그' },
  { href: '/projects', label: '프로젝트' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-6">
        <Link href="/" aria-label="PROCPA" className="flex shrink-0 items-center">
          <Image
            src="/procpa_light2.png"
            alt="PROCPA"
            width={1134}
            height={317}
            priority
            className="block h-6 w-auto object-contain dark:hidden sm:h-7"
          />
          <Image
            src="/procpa_dark2.png"
            alt="PROCPA"
            width={1134}
            height={317}
            priority
            className="hidden h-6 w-auto object-contain dark:block sm:h-7"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 text-base text-muted-foreground md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
          <div className="ml-1 flex items-center gap-0.5">
            <CommandPalette />
            <ThemeToggle />
          </div>
          <Link
            href="/contact"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            문의하기
          </Link>
        </nav>

        {/* Mobile/tablet: icons + hamburger */}
        <div className="flex items-center gap-0.5 text-muted-foreground md:hidden">
          <CommandPalette />
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="메뉴 열기"
              className="-mr-2 inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-foreground"
            >
              <Menu className="h-4 w-4" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] overflow-y-auto p-0">
              <SheetTitle className="sr-only">메뉴</SheetTitle>
              <nav className="flex flex-col px-6 py-6">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="py-2.5 text-base font-medium transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}

                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2.5 text-[15px] font-semibold text-primary-foreground"
                >
                  문의하기
                </Link>

                <div className="mt-6 flex items-center gap-4 border-t border-border/60 pt-5 text-muted-foreground">
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
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
