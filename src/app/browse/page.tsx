import type { Metadata } from 'next'
import { TOPIC_KEYS } from '@/lib/topics'
import { buildCategoryData } from '@/lib/category'
import { PageHero } from '@/components/page-hero'
import { BrowseTabs, type BrowseDoc } from '@/components/browse-tabs'
import { ogImageUrl } from '@/lib/og'

export const dynamic = 'force-static'

const DESC = '회계·AI·개발 등 카테고리별로 시리즈와 포스트를 한곳에서 탐색합니다.'
const OG = ogImageUrl({ kicker: 'PROCPA · BROWSE', title: '카테고리별 탐색', subtitle: DESC })

export const metadata: Metadata = {
  title: '카테고리별 탐색',
  description: DESC,
  alternates: { canonical: '/browse' },
  openGraph: { title: '카테고리별 탐색', description: DESC, url: '/browse', images: [{ url: OG, width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: '카테고리별 탐색', description: DESC, images: [OG] },
}

export default function BrowsePage() {
  const docs: BrowseDoc[] = TOPIC_KEYS.flatMap((cat) =>
    buildCategoryData(cat).docs.map((d) => ({ ...d, category: cat })),
  )

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-14 sm:py-20">
      <PageHero
        en="Browse"
        ko="카테고리별 탐색"
        description="카테고리별로 시리즈와 포스트를 한곳에서 모아 봅니다."
      />

      <div className="mt-14 sm:mt-16">
        <BrowseTabs docs={docs} />
      </div>
    </div>
  )
}
