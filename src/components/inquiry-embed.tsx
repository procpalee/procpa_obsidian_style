'use client'

import { useEffect } from 'react'
import { FORMS, withPrefill } from '@/lib/site-config'

declare global {
  interface Window {
    Tally?: { loadEmbeds: () => void }
  }
}

/**
 * Embeds a hosted Tally form (inquiry or email-gate). The Tally widget script
 * auto-resizes any iframe carrying `data-tally-src`. `service` is forwarded as a
 * hidden field so a single form can segment by service area.
 *
 * Google Form fallback: pass a Google embed URL as `formUrl` — the iframe markup
 * is identical; just give it a taller fixed `minHeight` (Google iframes don't
 * auto-resize) since the Tally script will simply no-op.
 */
export function InquiryEmbed({
  service,
  formUrl = FORMS.inquiry,
  title = '문의 폼',
  minHeight = 600,
}: {
  service?: string
  formUrl?: string
  title?: string
  minHeight?: number
}) {
  useEffect(() => {
    const id = 'tally-embed-script'
    if (document.getElementById(id)) {
      window.Tally?.loadEmbeds()
      return
    }
    const s = document.createElement('script')
    s.id = id
    s.src = 'https://tally.so/widgets/embed.js'
    s.async = true
    document.body.appendChild(s)
  }, [])

  const src = withPrefill(formUrl, { service })

  return (
    <iframe
      data-tally-src={src}
      src={src}
      loading="lazy"
      width="100%"
      height={minHeight}
      title={title}
      className="w-full rounded-2xl border border-border/60 bg-card"
    />
  )
}
