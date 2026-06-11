import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { serviceAreas, getService } from '@/lib/services-data'
import { relatedContent } from '@/lib/related-content'
import { PageHero } from '@/components/page-hero'
import { Section } from '@/components/home/section'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { InquiryEmbed } from '@/components/inquiry-embed'
import { PostCard, SeriesCard } from '@/components/content-card'
import {
  JsonLd,
  serviceJsonLd,
  faqJsonLd,
  breadcrumbJsonLd,
} from '@/components/json-ld'

const SITE = 'https://procpa.co.kr'

export function generateStaticParams() {
  return serviceAreas.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const s = getService(slug)
  if (!s) return {}
  const ogTitle = encodeURIComponent(s.title)
  const ogSubtitle = encodeURIComponent(s.tagline)
  const url = `/services/${s.slug}`
  return {
    title: `${s.title} 서비스`,
    description: s.summary,
    alternates: { canonical: url },
    openGraph: {
      title: `${s.title} 서비스`,
      description: s.summary,
      url,
      images: [{ url: `/api/og?kicker=SERVICE&title=${ogTitle}&subtitle=${ogSubtitle}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      images: [`/api/og?kicker=SERVICE&title=${ogTitle}&subtitle=${ogSubtitle}`],
    },
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const s = getService(slug)
  if (!s) notFound()

  const related = relatedContent({
    category: s.contentCategory,
    tags: s.contentTags,
    match: s.contentMatch,
    limit: 6,
  })
  const url = `${SITE}/services/${s.slug}`

  return (
    <>
      <JsonLd data={serviceJsonLd({ name: `${s.title} 서비스`, description: s.summary, url, serviceType: s.title })} />
      <JsonLd data={faqJsonLd(s.faqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', url: SITE },
          { name: '서비스', url: `${SITE}/services` },
          { name: s.title, url },
        ])}
      />

      <div className="mx-auto max-w-[1440px] px-6 py-14 sm:py-20">
        <Breadcrumbs
          items={[
            { name: '홈', href: '/' },
            { name: '서비스', href: '/services' },
            { name: s.title },
          ]}
        />
        <PageHero en={s.en} ko={s.title} description={s.summary} />
      </div>

      {/* 대상 + (외부감사 등) 처음 고객 콜아웃 */}
      <Section id="for-whom" kicker="For Whom" title="이런 분께 도움이 됩니다">
        <ul className="grid gap-3 sm:grid-cols-2">
          {s.forWhom.map((w) => (
            <li
              key={w}
              className="flex gap-2.5 rounded-xl border border-border/60 p-4 text-base leading-relaxed text-muted-foreground [word-break:keep-all]"
            >
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {w}
            </li>
          ))}
        </ul>

        {s.firstTimeNotes && (
          <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-6">
            <h3 className="text-lg font-semibold tracking-tight text-foreground [word-break:keep-all]">
              {s.firstTimeNotes.title}
            </h3>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground [word-break:keep-all]">
              {s.firstTimeNotes.body}
            </p>
            <Link
              href="#inquiry"
              className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {s.cta} →
            </Link>
          </div>
        )}
      </Section>

      {/* 진행 과정 */}
      <Section id="process" kicker="Process" title="진행 과정">
        <ol className="divide-y divide-border/60">
          {s.process.map((step, i) => (
            <li key={step.title} className="flex gap-5 py-5">
              <span className="font-mono text-sm text-muted-foreground/70">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold tracking-tight [word-break:keep-all]">{step.title}</h3>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground [word-break:keep-all]">
                  {step.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* 관련 실무 콘텐츠 (자동 연결) */}
      {related.length > 0 && (
        <Section
          id="related"
          kicker="Related"
          title="관련 실무 콘텐츠"
          description="실제 실무를 어떤 순서로, 어떻게 수행하는지 다룬 글과 시리즈입니다."
        >
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

      {/* FAQ */}
      {s.faqs.length > 0 && (
        <Section id="faq" kicker="FAQ" title="자주 묻는 질문">
          <div className="divide-y divide-border/60">
            {s.faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-medium [word-break:keep-all]">
                  {f.q}
                  <span className="font-mono text-muted-foreground transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground [word-break:keep-all]">{f.a}</p>
              </details>
            ))}
          </div>
        </Section>
      )}

      {/* 문의 폼 */}
      <Section
        id="inquiry"
        kicker="Inquiry"
        title={`${s.title} 문의 남기기`}
        description="아래 폼을 남겨주시면 검토 후 빠르게 회신드립니다. 이메일·카카오톡으로도 연락하실 수 있습니다."
      >
        <InquiryEmbed service={s.slug} />
      </Section>
    </>
  )
}
