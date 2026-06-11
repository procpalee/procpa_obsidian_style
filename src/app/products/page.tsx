import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { products } from '@/lib/products-data'
import { PageHero } from '@/components/page-hero'
import { Section } from '@/components/home/section'
import { Badge } from '@/components/ui/badge'

const ogTitle = encodeURIComponent('템플릿·제품')
const ogSubtitle = encodeURIComponent('실무 템플릿·RPA')
const DESC = '회계·재무 실무에 바로 쓰는 템플릿과 RPA. 무료 자료는 이메일로 받아보실 수 있습니다.'

export const metadata: Metadata = {
  title: '템플릿·제품',
  description: DESC,
  alternates: { canonical: '/products' },
  openGraph: {
    title: '템플릿·제품',
    description: DESC,
    url: '/products',
    images: [{ url: `/api/og?kicker=PROCPA&title=${ogTitle}&subtitle=${ogSubtitle}`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`/api/og?kicker=PROCPA&title=${ogTitle}&subtitle=${ogSubtitle}`],
  },
}

export default function ProductsPage() {
  return (
    <>
      <div className="mx-auto max-w-[1440px] px-6 py-14 sm:py-20">
        <PageHero
          en="Templates & Products"
          ko="템플릿·제품"
          description="실무에 바로 쓰는 엑셀 템플릿과 자동화 RPA. 무료 자료는 이메일을 남기면 받아보실 수 있습니다."
          action={
            <Link
              href="/downloads"
              className="inline-flex items-center rounded-full border border-border px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              무료 자료실 →
            </Link>
          }
        />
      </div>

      <Section id="items" kicker="Catalog" title="제품">
        <div className="grid gap-3 sm:grid-cols-2">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group flex flex-col rounded-2xl border border-border/60 p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Badge variant={p.tier === 'free' ? 'secondary' : 'default'}>
                    {p.tier === 'free' ? '무료' : '프리미엄'}
                  </Badge>
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {p.type === 'rpa' ? 'RPA' : 'Template'}
                  </span>
                  {p.comingSoon && (
                    <span className="font-mono text-xs text-muted-foreground/70">출시 예정</span>
                  )}
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
              </div>
              <h3 className="mt-3 text-xl font-semibold tracking-tight group-hover:text-primary [word-break:keep-all]">
                {p.name}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground [word-break:keep-all]">{p.tagline}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}
