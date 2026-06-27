import { certificates, education, advisory } from '@/lib/about-data'
import { services } from '@/lib/services-data'
import { siteConfig } from '@/lib/site-config'

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

const SITE = 'https://procpa.co.kr'
const DEFAULT_OG = `${SITE}/og-default.png`

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'PROCPA',
    alternateName: '회계사의 기록',
    url: SITE,
    description: '회계사의 기록 — 회계·재무 전문성에 AI의 생산성을 더하다.',
    inLanguage: 'ko-KR',
    image: DEFAULT_OG,
    publisher: {
      '@type': 'Person',
      name: '이재현',
      url: `${SITE}/about`,
    },
  }
}

export function personJsonLd(opts: {
  sameAs?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: '이재현',
    url: `${SITE}/about`,
    image: DEFAULT_OG,
    jobTitle: '한국공인회계사',
    description:
      '회계·재무 전문성에 AI의 생산성을 더하는 한국공인회계사. 한국공인회계사회 AI 자문위원, 방위사업청 원가관리 자문위원.',
    knowsAbout: ['회계감사', '내부회계관리제도(ICFR)', '기업가치평가', '원가분석', 'AI 활용', '생산성'],
    hasCredential: certificates
      .flatMap((g) => g.items)
      .map((name) => ({ '@type': 'EducationalOccupationalCredential', name })),
    alumniOf: education.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.title })),
    memberOf: advisory.map((a) => ({ '@type': 'Organization', name: a.org })),
    worksFor: { '@type': 'Organization', name: '정인회계법인' },
    email: siteConfig.email,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'business inquiry',
      email: siteConfig.email,
      url: `${SITE}/contact`,
      availableLanguage: ['Korean'],
    },
    makesOffer: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.title, description: s.summary },
    })),
    sameAs: opts.sameAs ?? [],
  }
}
