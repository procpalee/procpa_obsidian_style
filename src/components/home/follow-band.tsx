import { Section } from '@/components/home/section'
import { socials } from '@/components/social-icons'
import { ArrowUpRight } from 'lucide-react'

export function FollowBand() {
  const channels = socials.filter((s) => s.featured)
  const email = socials.find((s) => s.label === 'Email')

  return (
    <Section
      id="follow"
      kicker="Contact Me"
      title="다양한 채널로 소통합니다."
      description="업무 연락부터 가벼운 커피챗까지 모두 환영합니다."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {channels.map((s) => {
          const Icon = s.icon
          return (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-border/60 p-4 transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-sm"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <span className="text-base font-semibold tracking-tight">{s.label}</span>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
            </a>
          )
        })}
      </div>

      {email && (
        <p className="mt-6 text-sm text-muted-foreground">
          업무·협업 제안은 이메일{' '}
          <a href={email.href} className="font-medium text-primary hover:opacity-80">
            {email.handle}
          </a>
          으로 편하게 주세요.
        </p>
      )}
    </Section>
  )
}
