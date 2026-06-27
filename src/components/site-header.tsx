'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/theme-toggle'
import { socials } from '@/components/social-icons'

const nav = [
  { href: '/', label: '홈' },
  { href: '/about', label: '소개' },
  { href: '/portfolio', label: '포트폴리오' },
  { href: '/contact', label: '문의' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background">
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
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile/tablet: icons + hamburger */}
        <div className="flex items-center gap-0.5 text-muted-foreground md:hidden">
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
