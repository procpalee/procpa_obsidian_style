'use client'

import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

interface MobileCollapsibleProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
  alwaysVisible?: boolean
}

export function MobileCollapsible({
  title,
  children,
  defaultOpen = false,
  alwaysVisible = false,
}: MobileCollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={`mb-6 rounded-md border border-border/60${alwaysVisible ? '' : ' lg:hidden'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          {title}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      {open && (
        <div className="border-t border-border/60 px-4 py-3">
          {children}
        </div>
      )}
    </div>
  )
}
