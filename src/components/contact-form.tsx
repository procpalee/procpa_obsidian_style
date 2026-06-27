'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Check, Mail, MessageCircle } from 'lucide-react'
import { services } from '@/lib/services-data'
import { siteConfig } from '@/lib/site-config'
import { content } from '@/lib/site-content'

const t = content.contact.form
const TYPE_OPTIONS = [...services.map((s) => ({ key: s.key, label: s.title })), { key: 'etc', label: t.type.etc }]

const inputCls =
  'w-full rounded-lg border border-border bg-secondary/40 px-3.5 py-2.5 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-foreground/40 focus:bg-secondary/60'

type Status = 'idle' | 'sending' | 'success' | 'error'

export function ContactForm() {
  const [type, setType] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  // ?type=<key> 딥링크 → 문의 유형 사전 선택 (useSearchParams 대신 window로 정적 렌더 유지)
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get('type')
    if (!t || !TYPE_OPTIONS.some((o) => o.key === t)) return
    const id = setTimeout(() => setType(t), 0)
    return () => clearTimeout(id)
  }, [])

  // Web3Forms 키 미설정 → 이메일/카카오 안내로 graceful fallback
  if (!siteConfig.web3formsKey) {
    return (
      <div className="rounded-2xl border border-border/60 p-6 sm:p-8">
        <p className="text-base leading-relaxed text-muted-foreground">{t.fallbackNote}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Mail className="h-4 w-4" /> {t.fallbackEmail}
          </a>
          <a
            href={siteConfig.kakaoDirect}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-foreground/40"
          >
            <MessageCircle className="h-4 w-4" /> {t.fallbackKakao}
          </a>
        </div>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-border/60 p-10 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="mt-5 text-xl font-semibold tracking-tight">{t.successTitle}</h3>
        <p className="mt-2 max-w-sm text-base leading-relaxed text-muted-foreground">{t.successBody}</p>
      </div>
    )
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    if (fd.get('botcheck')) return // honeypot
    const typeLabel = TYPE_OPTIONS.find((o) => o.key === fd.get('type'))?.label ?? '기타'
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: siteConfig.web3formsKey,
          subject: `[PROCPA 문의] ${typeLabel} — ${fd.get('name')}`,
          from_name: 'PROCPA 웹사이트',
          이름: fd.get('name'),
          이메일: fd.get('email'),
          문의유형: typeLabel,
          소속: fd.get('company') || '-',
          내용: fd.get('message'),
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const sending = status === 'sending'

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-border/60 p-6 sm:p-8">
      {/* honeypot */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {t.name.label}
          </span>
          <input name="name" required placeholder={t.name.placeholder} className={inputCls} />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {t.email.label}
          </span>
          <input name="email" type="email" required placeholder={t.email.placeholder} className={inputCls} />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {t.type.label}
          </span>
          <select
            name="type"
            required
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={inputCls}
          >
            <option value="" disabled>
              {t.type.placeholder}
            </option>
            {TYPE_OPTIONS.map((o) => (
              <option key={o.key} value={o.key}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {t.company.label}
          </span>
          <input name="company" placeholder={t.company.placeholder} className={inputCls} />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {t.message.label}
        </span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder={t.message.placeholder}
          className={inputCls + ' resize-y'}
        />
      </label>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {sending ? t.sending : t.submit}
          {!sending && <ArrowRight className="h-4 w-4" />}
        </button>
        {status === 'error' && <span className="text-sm text-destructive">{t.error}</span>}
      </div>
    </form>
  )
}
