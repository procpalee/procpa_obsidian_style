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
    jobTitle: '한국공인회계사',
    knowsAbout: ['회계감사', '내부회계관리제도(ICFR)', '기업가치평가', '원가분석', 'AI 활용', '생산성'],
    worksFor: { '@type': 'Organization', name: 'PROCPA', url: SITE },
    sameAs: opts.sameAs ?? [],
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
