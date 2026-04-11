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
  { icon: typeof Info; accent: string; bg: string }
> = {
  note: { icon: Info, accent: 'text-blue-500', bg: 'bg-blue-500/8 border-blue-500/30' },
  info: { icon: Info, accent: 'text-blue-500', bg: 'bg-blue-500/8 border-blue-500/30' },
  tip: { icon: Lightbulb, accent: 'text-emerald-500', bg: 'bg-emerald-500/8 border-emerald-500/30' },
  success: { icon: CheckCircle, accent: 'text-emerald-500', bg: 'bg-emerald-500/8 border-emerald-500/30' },
  warning: { icon: AlertTriangle, accent: 'text-amber-500', bg: 'bg-amber-500/8 border-amber-500/30' },
  important: { icon: Flame, accent: 'text-amber-500', bg: 'bg-amber-500/8 border-amber-500/30' },
  danger: { icon: AlertOctagon, accent: 'text-red-500', bg: 'bg-red-500/8 border-red-500/30' },
  bug: { icon: Bug, accent: 'text-red-500', bg: 'bg-red-500/8 border-red-500/30' },
  example: { icon: List, accent: 'text-violet-500', bg: 'bg-violet-500/8 border-violet-500/30' },
  quote: { icon: Quote, accent: 'text-muted-foreground', bg: 'bg-muted/50 border-border' },
  abstract: { icon: FileText, accent: 'text-sky-500', bg: 'bg-sky-500/8 border-sky-500/30' },
  question: { icon: HelpCircle, accent: 'text-amber-500', bg: 'bg-amber-500/8 border-amber-500/30' },
  todo: { icon: CheckCircle, accent: 'text-blue-500', bg: 'bg-blue-500/8 border-blue-500/30' },
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
  const { icon: Icon, accent, bg } = config[t]

  const displayTitle = title || t.charAt(0).toUpperCase() + t.slice(1)

  return (
    <div className={`my-4 rounded-md border ${bg} not-prose`}>
      <div
        className={`flex items-center gap-2 px-4 py-3 ${foldable ? 'cursor-pointer select-none' : ''}`}
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
        <span className={`text-sm font-medium ${accent}`}>{displayTitle}</span>
        {foldable && (
          <ChevronRight
            className={`ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
              open ? 'rotate-90' : ''
            }`}
          />
        )}
      </div>
      {(!foldable || open) && (
        <div className="border-t border-inherit px-4 py-3 text-sm leading-relaxed [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
          {children}
        </div>
      )}
    </div>
  )
}
