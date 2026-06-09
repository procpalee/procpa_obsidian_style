'use client'

import { useState, type ReactNode } from 'react'
import {
  Info,
  Lightbulb,
  AlertTriangle,
  AlertOctagon,
  BookOpen,
  Quote,
  FileText,
  CheckCircle,
  HelpCircle,
  Bug,
  Flame,
  List,
  ChevronRight,
} from 'lucide-react'

type CalloutType =
  | 'note'
  | 'tip'
  | 'warning'
  | 'danger'
  | 'info'
  | 'example'
  | 'quote'
  | 'abstract'
  | 'success'
  | 'question'
  | 'bug'
  | 'important'
  | 'todo'

const config: Record<
  CalloutType,
  { icon: typeof Info; accent: string; bar: string; tint: string }
> = {
  note: { icon: Info, accent: 'text-blue-500', bar: 'border-blue-500/70', tint: 'bg-blue-500/[0.07]' },
  info: { icon: Info, accent: 'text-blue-500', bar: 'border-blue-500/70', tint: 'bg-blue-500/[0.07]' },
  tip: { icon: Lightbulb, accent: 'text-emerald-500', bar: 'border-emerald-500/70', tint: 'bg-emerald-500/[0.07]' },
  success: { icon: CheckCircle, accent: 'text-emerald-500', bar: 'border-emerald-500/70', tint: 'bg-emerald-500/[0.07]' },
  warning: { icon: AlertTriangle, accent: 'text-amber-500', bar: 'border-amber-500/70', tint: 'bg-amber-500/[0.07]' },
  important: { icon: Flame, accent: 'text-amber-500', bar: 'border-amber-500/70', tint: 'bg-amber-500/[0.07]' },
  danger: { icon: AlertOctagon, accent: 'text-red-500', bar: 'border-red-500/70', tint: 'bg-red-500/[0.07]' },
  bug: { icon: Bug, accent: 'text-red-500', bar: 'border-red-500/70', tint: 'bg-red-500/[0.07]' },
  example: { icon: List, accent: 'text-violet-500', bar: 'border-violet-500/70', tint: 'bg-violet-500/[0.07]' },
  quote: { icon: Quote, accent: 'text-muted-foreground', bar: 'border-border', tint: 'bg-muted/40' },
  abstract: { icon: FileText, accent: 'text-sky-500', bar: 'border-sky-500/70', tint: 'bg-sky-500/[0.07]' },
  question: { icon: HelpCircle, accent: 'text-amber-500', bar: 'border-amber-500/70', tint: 'bg-amber-500/[0.07]' },
  todo: { icon: CheckCircle, accent: 'text-blue-500', bar: 'border-blue-500/70', tint: 'bg-blue-500/[0.07]' },
}

interface CalloutProps {
  type?: string
  title?: string
  foldable?: boolean
  defaultOpen?: boolean
  children: ReactNode
}

export function Callout({
  type = 'note',
  title,
  foldable = false,
  defaultOpen = true,
  children,
}: CalloutProps) {
  const [open, setOpen] = useState(defaultOpen)
  const t = (type as CalloutType) in config ? (type as CalloutType) : 'note'
  const { icon: Icon, accent, bar, tint } = config[t]

  const displayTitle = title || t.charAt(0).toUpperCase() + t.slice(1)

  return (
    <div className={`my-4 rounded-r-lg border-l-[3px] ${bar} ${tint} px-4 py-3 not-prose`}>
      <div
        className={`flex items-center gap-2 ${foldable ? 'cursor-pointer select-none' : ''}`}
        onClick={foldable ? () => setOpen(!open) : undefined}
        role={foldable ? 'button' : undefined}
        tabIndex={foldable ? 0 : undefined}
        onKeyDown={
          foldable
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setOpen(!open)
                }
              }
            : undefined
        }
      >
        <Icon className={`h-4 w-4 shrink-0 ${accent}`} />
        <span className={`text-sm font-semibold ${accent}`}>{displayTitle}</span>
        {foldable && (
          <ChevronRight
            className={`ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
              open ? 'rotate-90' : ''
            }`}
          />
        )}
      </div>
      {(!foldable || open) && (
        <div className="mt-2 text-[15px] leading-relaxed text-foreground/90 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
          {children}
        </div>
      )}
    </div>
  )
}
