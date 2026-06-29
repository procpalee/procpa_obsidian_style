import type { Metadata } from 'next'
import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Section } from '@/components/home/section'
import { ContactForm } from '@/components/contact-form'
import { GithubIcon, YoutubeIcon, NaverIcon, ThreadsIcon } from '@/components/social-icons'
import { contacts } from '@/lib/about-data'
import { testimonials } from '@/lib/testimonials-data'
import { content } from '@/lib/site-content'

const t = content.contact
const ogTitle = encodeURIComponent(content.meta.contact.title)
const ogSubtitle = encodeURIComponent(content.meta.contact.ogSubtitle)

export const metadata: Metadata = {
  title: content.meta.contact.title,
  description: content.meta.contact.description,
  alternates: { canonical: '/contact' },
  openGraph: {
    images: [
      {
        url: `/api/og?kicker=PROCPA&title=${ogTitle}&subtitle=${ogSubtitle}&variant=hero`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`/api/og?kicker=PROCPA&title=${ogTitle}&subtitle=${ogSubtitle}&variant=hero`],
  },
}

const iconFor: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Email: Mail,
  KakaoTalk: MessageCircle,
  'Naver Blog': NaverIcon,
  YouTube: YoutubeIcon,
  Threads: ThreadsIcon,
  GitHub: GithubIcon,
}

export default function ContactPage() {
  return (
    <>
      <div className="mx-auto max-w-[1440px] px-6 py-14 sm:py-20">
        <PageHero en={t.hero.en} ko={t.hero.ko} description={t.hero.description} />
      </div>

      {/* 업무 문의 폼 (주 섹션) */}
      <Section id="inquiry" kicker={t.inquiry.kicker} title={t.inquiry.title} description={t.inquiry.description}>
        <ContactForm />
      </Section>

      {/* 연락 채널 */}
      <Section id="channels" kicker={t.channels.kicker} title={t.channels.title} description={t.channels.description}>
        <div className="grid gap-3 sm:grid-cols-2">
          {contacts.map((c) => {
            const Icon = iconFor[c.label] ?? Mail
            const external = c.href.startsWith('http')
            return (
              <a
                key={c.label}
                href={c.href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                className="group flex items-center gap-4 rounded-2xl border border-border/60 p-5 transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-sm"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <span className="text-[15px] font-semibold tracking-tight">{c.label}</span>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                    {c.description}
                  </p>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
              </a>
            )
          })}
        </div>
      </Section>

      {/* 후기 — 데이터가 있을 때만 렌더 */}
      {testimonials.length > 0 && (
        <Section id="testimonials" kicker="Testimonials" title={t.testimonials.title}>
          <div className="grid gap-3 sm:grid-cols-2">
            {testimonials.map((t) => (
              <figure
                key={t.quote}
                className="flex flex-col rounded-xl border border-border/60 p-6"
              >
                <blockquote className="text-base leading-relaxed text-foreground [word-break:keep-all]">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4 border-t border-border/60 pt-4 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{t.author}</span>
                  {t.role && <span> · {t.role}</span>}
                  {t.context && <p className="mt-1 font-mono text-[13px]">{t.context}</p>}
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
      )}

    </>
  )
}
