import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/hero-section'
import { PhilosophySection } from '@/components/home/philosophy-section'
import { ServicesSection } from '@/components/home/services-section'
import { ExpertiseSection } from '@/components/home/expertise-section'
import { RecentPostsSection } from '@/components/home/recent-posts-section'
import { CtaSection } from '@/components/home/cta-section'

export const metadata: Metadata = {
  title: '디자인 미리보기',
  robots: { index: false, follow: false },
}

/**
 * 새 디자인 방향(CMDS 스타일 차용: 그린/핑크 듀얼 액센트 · 큰 타이트 타이포 ·
 * mono 라벨 · pill 버튼 · 보더 그리드) 미리보기. 사이트 실제 토큰을 사용하므로
 * 헤더의 테마 토글로 라이트/다크를 모두 확인할 수 있습니다.
 * 승인되면 이 섹션들이 그대로 실제 홈(src/app/page.tsx)이 됩니다.
 */
export default function DesignPreviewPage() {
  return (
    <div className="border-t border-border">
      <HeroSection />
      <PhilosophySection />
      <ServicesSection />
      <ExpertiseSection />
      <RecentPostsSection />
      <CtaSection />
    </div>
  )
}
