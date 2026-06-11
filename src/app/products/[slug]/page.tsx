import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { products, getProduct } from '@/lib/products-data'
import { projects } from '@/lib/projects-data'
import { relatedContent } from '@/lib/related-content'
import { PageHero } from '@/components/page-hero'
import { Section } from '@/components/home/section'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { EmailGate } from '@/components/email-gate'
import { Badge } from '@/components/ui/badge'
import { PostCard, SeriesCard } from '@/components/content-card'
import { JsonLd, breadcrumbJsonLd } from '@/components/json-ld'

const SITE = 'https://procpa.co.kr'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const p = getProduct(slug)
  if (!p) return {}
  const ogTitle = encodeURIComponent(p.name)
  const ogSubtitle = encodeURIComponent(p.tagline)
  const url = `/products/${p.slug}`
  return {
    title: p.name,
    description: p.description,
    alternates: { canonical: url },
    openGraph: {
      title: p.name,
      description: p.description,
      url,
      images: [{ url: `/api/og?kicker=PRODUCT&title=${ogTitle}&subtitle=${ogSubtitle}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      images: [`/api/og?kicker=PRODUCT&title=${ogTitle}&subtitle=${ogSubtitle}`],
    },
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const p = getProduct(slug)
  if (!p) notFound()

  const project = p.projectKey ? projects.find((x) => x.key === p.projectKey) : undefined
  const related = p.contentMatch ? relatedContent({ match: p.contentMatch, limit: 4 }) : []
  const url = `${SITE}/products/${p.slug}`

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', url: SITE },
          { name: '제품', url: `${SITE}/products` },
          { name: p.name, url },
        ])}
      />

      <div className="mx-auto max-w-[1440px] px-6 py-14 sm:py-20">
        <Breadcrumbs
          items={[
            { name: '홈', href: '/' },
            { name: '제품', href: '/products' },
            { name: p.name },
          ]}
        />
        <PageHero
          en={p.type === 'rpa' ? 'RPA' : 'Template'}
          ko={
            <span className="flex flex-wrap items-center gap-3">
              {p.name}
              <Badge variant={p.tier === 'free' ? 'secondary' : 'default'}>
                {p.tier === 'free' ? '무료' : '프리미엄'}
              </Badge>
            </span>
          }
          description={p.description}
        />

        {/* CTA */}
        <div className="mt-8">
          {p.tier === 'free' && p.fileUrl ? (
            <EmailGate productSlug={p.slug} gateFormUrl={p.gateFormUrl} />
          ) : (
            <Link
              href="/contact?service=products"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {p.comingSoon ? '출시 알림·문의하기' : '구매 문의하기'} →
            </Link>
          )}
        </div>
      </div>

      <Section id="features" kicker="Features" title="구성">
        <ul className="grid gap-3 sm:grid-cols-2">
          {p.features.map((f) => (
            <li
              key={f}
              className="flex gap-2.5 rounded-xl border border-border/60 p-4 text-base leading-relaxed text-muted-foreground [word-break:keep-all]"
            >
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {f}
            </li>
          ))}
        </ul>
        {p.premiumFeatures && p.premiumFeatures.length > 0 && (
          <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Premium</p>
            <ul className="mt-3 space-y-2">
              {p.premiumFeatures.map((f) => (
                <li key={f} className="flex gap-2.5 text-base leading-relaxed text-muted-foreground [word-break:keep-all]">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      {project && (
        <Section id="project" kicker="Related Project" title="관련 프로젝트">
          <Link
            href={project.liveUrl ?? '/projects'}
            target={project.liveUrl ? '_blank' : undefined}
            rel={project.liveUrl ? 'noreferrer' : undefined}
            className="group flex flex-col rounded-2xl border border-border/60 p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-sm"
          >
            <h3 className="text-lg font-semibold tracking-tight group-hover:text-primary">{project.name}</h3>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground [word-break:keep-all]">{project.tagline}</p>
          </Link>
        </Section>
      )}

      {related.length > 0 && (
        <Section id="related" kicker="Related" title="관련 콘텐츠">
          <div className="grid gap-3 sm:grid-cols-2">
            {related.map((d) =>
              d.type === 'series' ? (
                <SeriesCard key={d.url} title={d.title} description={d.description ?? ''} url={d.url} variant="default" />
              ) : (
                <div key={d.url} className="rounded-2xl border border-border/60 p-5">
                  <PostCard title={d.title} description={d.description} url={d.url} date={d.date} variant="list" />
                </div>
              ),
            )}
          </div>
        </Section>
      )}
    </>
  )
}
