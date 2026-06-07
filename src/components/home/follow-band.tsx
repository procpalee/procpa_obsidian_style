import { Section } from '@/components/home/section'
import { socials } from '@/components/social-icons'
import { ArrowUpRight } from 'lucide-react'

const channelDesc: Record<string, string> = {
  'Naver Blog': '회계·AI 실무 인사이트를 가장 먼저 기록합니다.',
  YouTube: '실전 활용법을 영상으로 풀어 설명합니다.',
  GitHub: '직접 만든 도구의 소스 코드를 공유합니다.',
  KakaoTalk: '실무자들과 실시간으로 소통하는 오픈채팅.',
}

export function FollowBand() {
  const channels = socials.filter((s) => s.featured)
  const email = socials.find((s) => s.label === 'Email')

  return (
    <Section
      id="follow"
      kicker="Subscribe"
      title="구독하고 함께 성장해요"
      description="새 글·도구·강의 소식을 채널에서 가장 먼저 받아보세요. 회계와 AI를 함께 공부하는 동료들을 환영합니다."
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
              className="group flex items-center gap-4 rounded-2xl border border-border/60 p-5 transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-sm"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-semibold tracking-tight">{s.label}</span>
                  <span className="font-mono text-xs text-muted-foreground">{s.handle}</span>
                </div>
                <p className="mt-0.5 text-[15px] leading-relaxed text-muted-foreground">
                  {channelDesc[s.label]}
                </p>
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
