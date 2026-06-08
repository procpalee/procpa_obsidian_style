import type { Metadata } from 'next'
import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { ServicesGrid } from '@/components/home/services-grid'
import { Section } from '@/components/home/section'
import { GithubIcon, YoutubeIcon, NaverIcon } from '@/components/social-icons'
import { contacts } from '@/lib/about-data'

const ogTitle = encodeURIComponent('문의하기')
const ogSubtitle = encodeURIComponent('한국공인회계사 이재현에게 연락하기')

export const metadata: Metadata = {
  title: '문의하기',
  description:
    '회계·재무 자문, AI 도입 컨설팅, 강의·집필, 협업 제안 — 어떤 주제든 편하게 연락주세요.',
  alternates: { canonical: '/contact' },
  openGraph: {
    images: [
      {
        url: `/api/og?kicker=PROCPA&title=${ogTitle}&subtitle=${ogSubtitle}`,
        width: 1200,
        height: 630,
      },
    ],
  },
}

const iconFor: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Email: Mail,
  KakaoTalk: MessageCircle,
  'Naver Blog': NaverIcon,
  YouTube: YoutubeIcon,
  GitHub: GithubIcon,
}

export default function ContactPage() {
  return (
    <>
      <div className="mx-auto max-w-[1440px] px-6 py-14 sm:py-20">
        <PageHero
          en="Contact"
          ko="문의하기"
          description="회계·재무 자문부터 AX 컨설팅, 강의·집필, 협업 제안까지 — 어떤 주제든 편하게 연락주세요."
        />
      </div>

      {/* 업무 소개 (홈에서 이관) */}
      <ServicesGrid />

      {/* 연락 채널 */}
      <Section
        id="channels"
        kicker="Channels"
        title="연락 채널"
        description="이메일·카카오톡이 가장 빠릅니다. 블로그·유튜브·깃허브에서도 만나보실 수 있습니다."
      >
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
    </>
  )
}
