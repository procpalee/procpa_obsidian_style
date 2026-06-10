import { certificates, education, advisory } from '@/lib/about-data'

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
const AUTHOR = { '@type': 'Person', name: '이재현', url: `${SITE}/about` }
const PUBLISHER = {
  '@type': 'Organization',
  name: 'PROCPA',
  url: SITE,
  logo: { '@type': 'ImageObject', url: `${SITE}/icon.png` },
}

export function articleJsonLd(opts: {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified?: string
  image?: string
  tags?: string[]
  isPartOf?: { name: string; url: string }
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: opts.title,
    description: opts.description,
    mainEntityOfPage: { '@type': 'WebPage', '@id': opts.url },
    url: opts.url,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: AUTHOR,
    publisher: PUBLISHER,
    image: opts.image ?? DEFAULT_OG,
    keywords: opts.tags?.join(', '),
    inLanguage: 'ko-KR',
    ...(opts.isPartOf
      ? { isPartOf: { '@type': 'Book', name: opts.isPartOf.name, url: opts.isPartOf.url } }
      : {}),
  }
}

export function seriesJsonLd(opts: {
  title: string
  description: string
  url: string
  datePublished?: string
  dateModified?: string
  image?: string
  tags?: string[]
  chapters: { name: string; url: string }[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: opts.title,
    description: opts.description,
    mainEntityOfPage: { '@type': 'WebPage', '@id': opts.url },
    url: opts.url,
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    author: AUTHOR,
    publisher: PUBLISHER,
    image: opts.image ?? DEFAULT_OG,
    inLanguage: 'ko-KR',
    ...(opts.tags?.length ? { keywords: opts.tags.join(', ') } : {}),
    numberOfPages: opts.chapters.length,
    hasPart: opts.chapters.map((c, i) => ({
      '@type': 'Chapter',
      position: i + 1,
      name: c.name,
      url: c.url,
    })),
  }
}

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
    sameAs: opts.sameAs ?? [],
  }
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
  }
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
