import Link from 'next/link'
import { Fragment, type ReactNode } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { posts, series, chapters } from '#site/content'
import { topicLabel } from '@/lib/topics'
import { MDXContent } from '@/components/mdx-content'
import { TableOfContents } from '@/components/table-of-contents'
import { ReadingProgress } from '@/components/reading-progress'
import { ShareButtons } from '@/components/share-buttons'
import { MobileCollapsible } from '@/components/mobile-collapsible'
import { BacklinksPanel } from '@/components/backlinks-panel'
import { JsonLd, articleJsonLd, seriesJsonLd, breadcrumbJsonLd } from '@/components/json-ld'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { ScrollArea } from '@/components/ui/scroll-area'

const DEFAULT_OG = '/og-default.png'

const SITE = 'https://procpa.co.kr'

interface PageProps {
  params: Promise<{ slug: string[] }>
}

// ── Resolve content by full path ──

type Resolved =
  | {
      type: 'post'
      post: (typeof posts)[number]
      prev?: (typeof posts)[number]
      next?: (typeof posts)[number]
    }
  | { type: 'series'; series: (typeof series)[number]; tree: ChapterNode[]; totalCount: number }
  | {
      type: 'chapter'
      series: (typeof series)[number]
      chapter: (typeof chapters)[number]
      tree: ChapterNode[]
      flat: (typeof chapters)[number][]
      prev?: (typeof chapters)[number]
      next?: (typeof chapters)[number]
    }

function resolveContent(path: string): Resolved | null {
  // 1. Post
  const post = posts.find((p) => p.slugAsParams === path)
  if (post && !post.draft) {
    // 같은 폴더(category+subcategory) 내 포스트 날짜순 정렬 → 이전/다음
    const siblings = posts
      .filter(
        (p) =>
          !p.draft &&
          p.category === post.category &&
          p.subcategory === post.subcategory,
      )
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    const idx = siblings.findIndex((p) => p.slugAsParams === path)
    return {
      type: 'post',
      post,
      prev: siblings[idx + 1], // 더 오래된 글 = 이전
      next: siblings[idx - 1], // 더 최근 글 = 다음
    }
  }

  // 2. Series landing
  const s = series.find((s) => s.slugAsParams === path)
  if (s && !s.draft) {
    const tree = buildChapterTree(s.slugAsParams)
    const totalCount = chapters.filter((c) => c.series === s.slugAsParams && !c.draft).length
    return { type: 'series', series: s, tree, totalCount }
  }

  // 3. Chapter
  const chapter = chapters.find((c) => c.slugAsParams === path)
  if (chapter && !chapter.draft) {
    const sr = series.find((s) => s.slugAsParams === chapter.series)
    if (sr) {
      const tree = buildChapterTree(sr.slugAsParams)
      const flat = flattenTree(tree)
      const idx = flat.indexOf(chapter)
      return {
        type: 'chapter',
        series: sr,
        chapter,
        tree,
        flat,
        prev: flat[idx - 1],
        next: flat[idx + 1],
      }
    }
  }

  return null
}

// ── Chapter tree ──

type ChapterNode = {
  chapter: (typeof chapters)[number]
  children: ChapterNode[]
}

function buildChapterTree(seriesSlugAsParams: string): ChapterNode[] {
  const all = chapters
    .filter((c) => c.series === seriesSlugAsParams && !c.draft)
    .sort((a, b) => a.order - b.order)

  const roots: ChapterNode[] = []
  const byPath = new Map<string, ChapterNode>()

  // withinSeries: strip the series prefix (topic/sub/series) to get chapter-relative path
  const seriesPrefix = seriesSlugAsParams + '/'

  for (const c of all) {
    const withinSeries = c.slugAsParams.startsWith(seriesPrefix)
      ? c.slugAsParams.slice(seriesPrefix.length)
      : c.slugAsParams
    const node: ChapterNode = { chapter: c, children: [] }
    byPath.set(withinSeries, node)

    if (!c.parentPath) {
      roots.push(node)
    } else {
      const parent = byPath.get(c.parentPath)
      if (parent) parent.children.push(node)
      else roots.push(node)
    }
  }
  return roots
}

function flattenTree(nodes: ChapterNode[]): (typeof chapters)[number][] {
  const result: (typeof chapters)[number][] = []
  for (const node of nodes) {
    result.push(node.chapter)
    if (node.children.length > 0) result.push(...flattenTree(node.children))
  }
  return result
}

function findNodeChildren(nodes: ChapterNode[], slug: string): ChapterNode[] {
  for (const node of nodes) {
    if (node.chapter.slug === slug) return node.children
    if (node.children.length > 0) {
      const found = findNodeChildren(node.children, slug)
      if (found.length > 0) return found
    }
  }
  return []
}

// ── Static params ──

export async function generateStaticParams() {
  const all: { slug: string[] }[] = []

  // Content pages
  for (const p of posts) all.push({ slug: p.slugAsParams.split('/') })
  for (const s of series) all.push({ slug: s.slugAsParams.split('/') })
  for (const c of chapters) all.push({ slug: c.slugAsParams.split('/') })
  return all
}

// ── Metadata ──

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: rawSlug } = await params
  const path = rawSlug.map((s) => decodeURIComponent(s)).join('/')
  const r = resolveContent(path)
  if (!r) return {}

  if (r.type === 'post') {
    const { post } = r
    const ogImage = post.cover || DEFAULT_OG
    return {
      title: post.title,
      description: post.description,
      alternates: { canonical: `/${post.slugAsParams}` },
      openGraph: { title: post.title, description: post.description, type: 'article', publishedTime: post.date, images: [{ url: ogImage, width: 1200, height: 630 }] },
      twitter: { card: 'summary_large_image', title: post.title, description: post.description, images: [ogImage] },
    }
  }

  if (r.type === 'series') {
    const { series: s } = r
    const ogImage = s.cover || DEFAULT_OG
    return {
      title: s.title,
      description: s.description,
      alternates: { canonical: `/${s.slugAsParams}` },
      openGraph: { title: s.title, description: s.description, type: 'article', ...(s.date ? { publishedTime: s.date } : {}), images: [{ url: ogImage, width: 1200, height: 630 }] },
      twitter: { card: 'summary_large_image', title: s.title, description: s.description, images: [ogImage] },
    }
  }

  // chapter
  const title = `${r.chapter.title} · ${r.series.title}`
  const description = r.chapter.description ?? r.series.description
  const ogImage = r.series.cover || DEFAULT_OG
  const chapterModified = r.chapter.last_synced || undefined
  return {
    title,
    description,
    alternates: { canonical: `/${r.chapter.slugAsParams}` },
    openGraph: { title, description, type: 'article', ...(r.series.date ? { publishedTime: r.series.date } : {}), ...(chapterModified ? { modifiedTime: chapterModified } : {}), images: [{ url: ogImage, width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
  }
}

// ── Chapter list (series landing) ──

function ChapterList({
  nodes,
  depth = 0,
  counter,
}: {
  nodes: ChapterNode[]
  depth?: number
  counter: { value: number }
}) {
  return (
    <ol className={depth > 0 ? 'ml-6 border-l border-border/60' : 'divide-y divide-border/60'}>
      {nodes.map((node) => {
        const i = ++counter.value
        return (
          <li key={node.chapter.slug}>
            <Link
              href={`/${node.chapter.slugAsParams}`}
              className="group flex items-baseline gap-4 py-4"
            >
              <span className="font-mono text-xs text-muted-foreground">
                {String(i).padStart(2, '0')}
              </span>
              <div className="flex-1">
                <h3 className="font-medium group-hover:text-primary">{node.chapter.title}</h3>
                {node.chapter.description && (
                  <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                    {node.chapter.description}
                  </p>
                )}
              </div>
            </Link>
            {node.children.length > 0 && (
              <ChapterList nodes={node.children} depth={depth + 1} counter={counter} />
            )}
          </li>
        )
      })}
    </ol>
  )
}

// ── Sidebar (chapter page) ──

function navItemCls(active: boolean) {
  return `block rounded-md px-2.5 py-1.5 text-sm leading-snug transition-colors ${
    active
      ? 'bg-primary/10 font-medium text-primary'
      : 'text-muted-foreground hover:bg-card hover:text-foreground'
  }`
}

function SidebarList({
  nodes,
  activeSlug,
  seriesHref,
  depth = 0,
}: {
  nodes: ChapterNode[]
  activeSlug: string
  seriesHref?: string
  depth?: number
}) {
  return (
    <ul className={depth > 0 ? 'ml-2.5 mt-0.5 space-y-0.5 border-l border-border/60 pl-2' : 'space-y-0.5'}>
      {depth === 0 && seriesHref && (
        <li>
          <Link href={seriesHref} className={navItemCls(activeSlug === '__series__')}>
            책 소개
          </Link>
        </li>
      )}
      {nodes.map((node) => {
        const active = node.chapter.slug === activeSlug
        return (
          <li key={node.chapter.slug}>
            <Link href={`/${node.chapter.slugAsParams}`} className={navItemCls(active)}>
              {node.chapter.title}
            </Link>
            {node.children.length > 0 && (
              <SidebarList nodes={node.children} activeSlug={activeSlug} depth={depth + 1} />
            )}
          </li>
        )
      })}
    </ul>
  )
}

// ── Doc chrome (CMDS-reference docs styling) ──

/** Accent-soft pill above the doc title — e.g. "AI 생산성 · 일반". */
function DocKicker({ parts }: { parts: ReactNode[] }) {
  return (
    <div className="inline-flex flex-wrap items-center rounded-md bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
      {parts.map((p, i) => (
        <span key={i} className="inline-flex items-center">
          {i > 0 && <span className="mx-1.5 opacity-40">·</span>}
          {p}
        </span>
      ))}
    </div>
  )
}

/** Mono key/value frontmatter card under the doc header. */
function MetaCard({ rows }: { rows: { label: string; value: ReactNode }[] }) {
  const visible = rows.filter((r) => r.value !== undefined && r.value !== null && r.value !== '')
  if (!visible.length) return null
  return (
    <dl className="mt-5 grid w-full grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 rounded-lg border border-border/60 bg-card px-4 py-3 font-mono text-xs">
      {visible.map((r) => (
        <Fragment key={r.label}>
          <dt className="text-muted-foreground">{r.label}</dt>
          <dd className="text-foreground">{r.value}</dd>
        </Fragment>
      ))}
    </dl>
  )
}

const DOC_TITLE_CLS =
  'text-balance font-bold tracking-[-0.028em] leading-[1.1] text-[clamp(2rem,4vw,2.75rem)] text-foreground'

// ── Page ──

export default async function ContentPage({ params }: PageProps) {
  const { slug: rawSlug } = await params
  const path = rawSlug.map((s) => decodeURIComponent(s)).join('/')
  const r = resolveContent(path)
  if (!r) notFound()

  if (r.type === 'post') return <PostView post={r.post} prev={r.prev} next={r.next} />
  if (r.type === 'series') return <SeriesView r={r} />
  return <ChapterView r={r} />
}

// ── Post view ──

function PostView({
  post,
  prev,
  next,
}: {
  post: (typeof posts)[number]
  prev?: (typeof posts)[number]
  next?: (typeof posts)[number]
}) {
  const url = `${SITE}/${post.slugAsParams}`
  return (
    <>
    <ReadingProgress />
    <div className="mx-auto max-w-[1440px] px-6 py-12">
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.description,
          url,
          datePublished: post.date,
          dateModified: post.updated,
          image: new URL(post.cover ?? DEFAULT_OG, SITE).toString(),
          tags: post.tags,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', url: SITE },
          { name: topicLabel(post.category), url: `${SITE}/browse` },
          { name: post.title, url },
        ])}
      />
      <div className="lg:flex lg:justify-center lg:gap-12">
        {/* ── Main content (centered blog column) ── */}
        <article className="mx-auto w-full min-w-0 max-w-[72ch] lg:mx-0">
          <header className="mb-10 border-b border-border/60 pb-6">
            <Breadcrumbs
              items={[
                { name: '홈', href: '/' },
                { name: topicLabel(post.category), href: '/browse' },
                { name: post.title },
              ]}
            />
            <div className="mb-4 flex items-start justify-between gap-4">
              <DocKicker
                parts={[
                  <Link key="cat" href="/browse" className="hover:opacity-70">{topicLabel(post.category)}</Link>,
                  ...(post.subcategory ? [<span key="sub">{post.subcategory}</span>] : []),
                ]}
              />
              <ShareButtons url={url} title={post.title} />
            </div>
            <h1 className={DOC_TITLE_CLS}>{post.title}</h1>
            {post.description && (
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{post.description}</p>
            )}
            <MetaCard
              rows={[
                { label: '발행', value: post.date.slice(0, 10) },
                {
                  label: '수정',
                  value: post.updated && post.updated !== post.date ? post.updated.slice(0, 10) : '',
                },
                { label: '읽기', value: `${post.metadata.readingTime}분` },
                { label: '태그', value: post.tags.length ? post.tags.join(', ') : '' },
              ]}
            />
          </header>

          {/* TOC collapsible (mobile / tablet only) */}
          {post.toc.length > 0 && (
            <div className="lg:hidden">
              <MobileCollapsible title="On this page" alwaysVisible>
                <TableOfContents items={post.toc} hideTitle />
              </MobileCollapsible>
            </div>
          )}

          <div className="prose max-w-none dark:prose-invert">
            <MDXContent code={post.body} />
          </div>

          {/* 이전/다음 네비게이션 */}
          {(prev || next) && (
            <nav className="mt-16 flex items-center justify-between gap-4 border-t border-border/60 pt-6 text-sm">
              {prev ? (
                <Link href={`/${prev.slugAsParams}`} className="group min-w-0 flex-1">
                  <div className="text-xs text-muted-foreground">이전</div>
                  <div className="truncate group-hover:text-primary">← {prev.title}</div>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
              {next ? (
                <Link href={`/${next.slugAsParams}`} className="group min-w-0 flex-1 text-right">
                  <div className="text-xs text-muted-foreground">다음</div>
                  <div className="truncate group-hover:text-primary">{next.title} →</div>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
            </nav>
          )}

          {/* 백링크 */}
          <BacklinksPanel slug={post.slugAsParams} />
        </article>

        {/* ── Right rail: on this page (desktop) ── */}
        {post.toc.length > 0 && (
          <aside className="hidden w-[15rem] shrink-0 lg:block">
            <div className="sticky top-20">
              <TableOfContents items={post.toc} />
            </div>
          </aside>
        )}
      </div>
    </div>
    </>
  )
}

// ── Series landing view ──

function SeriesView({ r }: { r: Extract<Resolved, { type: 'series' }> }) {
  const s = r.series
  const url = `${SITE}/${s.slugAsParams}`
  const seriesChapters = chapters
    .filter((c) => !c.draft && c.series === s.slugAsParams)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  const lastModified = seriesChapters
    .map((c) => c.last_synced)
    .filter((d): d is string => !!d)
    .sort()
    .pop()
  return (
    <div className="mx-auto max-w-[1440px] px-6">
      <JsonLd
        data={seriesJsonLd({
          title: s.title,
          description: s.description,
          url,
          datePublished: s.date,
          dateModified: lastModified ?? s.date,
          image: new URL(s.cover ?? DEFAULT_OG, SITE).toString(),
          tags: s.tags,
          chapters: seriesChapters.map((c) => ({ name: c.title, url: `${SITE}/${c.slugAsParams}` })),
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', url: SITE },
          { name: topicLabel(s.category), url: `${SITE}/browse` },
          { name: s.title, url },
        ])}
      />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[17rem_minmax(0,1fr)]">
        {/* ── Left sidebar: chapter nav (desktop) ── */}
        <aside className="hidden border-r border-border/60 lg:block">
          <div className="group/sidebar sticky top-14 h-[calc(100vh-3.5rem)]">
            <ScrollArea className="h-full [&_[data-slot=scroll-area-scrollbar]]:opacity-0 [&_[data-slot=scroll-area-scrollbar]]:transition-opacity group-hover/sidebar:[&_[data-slot=scroll-area-scrollbar]]:opacity-100">
              <div className="py-8 pr-6">
                <div className="mb-3 px-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  목차
                </div>
                <SidebarList nodes={r.tree} activeSlug="__series__" seriesHref={`/${s.slugAsParams}`} />
              </div>
            </ScrollArea>
          </div>
        </aside>

        {/* ── Main content ── */}
        <article className="min-w-0 py-12">
          <div className="mx-auto max-w-[72ch]">
            {/* Mobile: chapter nav */}
            <div className="lg:hidden">
              <MobileCollapsible title={`${s.title} · 목차`}>
                <SidebarList nodes={r.tree} activeSlug="__series__" seriesHref={`/${s.slugAsParams}`} />
              </MobileCollapsible>
            </div>

            <header className="mb-10 border-b border-border/60 pb-6">
              <Breadcrumbs
                items={[
                  { name: '홈', href: '/' },
                  { name: topicLabel(s.category), href: '/browse' },
                  { name: s.title },
                ]}
              />
              <DocKicker
                parts={[
                  <Link key="cat" href="/browse" className="hover:opacity-70">{topicLabel(s.category)}</Link>,
                  ...(s.subcategory ? [<span key="sub">{s.subcategory}</span>] : []),
                  '시리즈',
                ]}
              />
              <h1 className={`mt-4 ${DOC_TITLE_CLS}`}>{s.title}</h1>
              {s.description && (
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{s.description}</p>
              )}
              <MetaCard
                rows={[
                  { label: '챕터', value: `${r.totalCount}개` },
                  { label: '발행', value: s.date ? s.date.slice(0, 10) : '' },
                  { label: '태그', value: s.tags.length ? s.tags.join(', ') : '' },
                ]}
              />
            </header>

            {/* Cover image */}
            {s.cover && (
              <div className="mb-10 max-w-[200px] overflow-hidden rounded-lg border border-border/60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.cover} alt={s.title} className="h-auto w-full object-cover" />
              </div>
            )}

            {/* Book intro body (MDX) */}
            {s.body && (
              <section className="prose mb-12 max-w-none dark:prose-invert">
                <MDXContent code={s.body} />
              </section>
            )}
          </div>
        </article>
      </div>
    </div>
  )
}

// ── Chapter view ──

function ChapterView({ r }: { r: Extract<Resolved, { type: 'chapter' }> }) {
  const url = `${SITE}/${r.chapter.slugAsParams}`
  const childNodes = findNodeChildren(r.tree, r.chapter.slug)
  return (
    <>
    <ReadingProgress />
    <div className="mx-auto max-w-[1440px] px-6">
      <JsonLd
        data={articleJsonLd({
          title: `${r.chapter.title} · ${r.series.title}`,
          description: r.chapter.description ?? r.series.description,
          url,
          datePublished: r.series.date ?? '',
          dateModified: r.chapter.last_synced || undefined,
          image: new URL(r.series.cover ?? DEFAULT_OG, SITE).toString(),
          tags: r.series.tags,
          isPartOf: { name: r.series.title, url: `${SITE}/${r.series.slugAsParams}` },
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', url: SITE },
          { name: topicLabel(r.series.category), url: `${SITE}/browse` },
          { name: r.series.title, url: `${SITE}/${r.series.slugAsParams}` },
          { name: r.chapter.title, url },
        ])}
      />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[17rem_minmax(0,1fr)] xl:grid-cols-[17rem_minmax(0,1fr)_15rem]">
        {/* ── Left sidebar: chapter navigation ── */}
        <aside className="hidden border-r border-border/60 lg:block">
          <div className="group/sidebar sticky top-14 h-[calc(100vh-3.5rem)]">
            <ScrollArea className="h-full [&_[data-slot=scroll-area-scrollbar]]:opacity-0 [&_[data-slot=scroll-area-scrollbar]]:transition-opacity group-hover/sidebar:[&_[data-slot=scroll-area-scrollbar]]:opacity-100">
              <div className="py-8 pr-6">
                <div className="mb-3 px-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  목차
                </div>
                <SidebarList nodes={r.tree} activeSlug={r.chapter.slug} seriesHref={`/${r.series.slugAsParams}`} />
              </div>
            </ScrollArea>
          </div>
        </aside>

        {/* ── Main content ── */}
        <article className="min-w-0 py-12">
          <div className="mx-auto max-w-[72ch]">
            {/* Mobile: chapter navigation */}
            <div className="lg:hidden">
              <MobileCollapsible title={`${r.series.title} · 목차`}>
                <SidebarList nodes={r.tree} activeSlug={r.chapter.slug} seriesHref={`/${r.series.slugAsParams}`} />
              </MobileCollapsible>
            </div>

            <header className="mb-10 border-b border-border/60 pb-6">
              <Breadcrumbs
                items={[
                  { name: '홈', href: '/' },
                  { name: topicLabel(r.series.category), href: '/browse' },
                  { name: r.series.title, href: `/${r.series.slugAsParams}` },
                  { name: r.chapter.title },
                ]}
              />
              <div className="mb-4 flex items-start justify-between gap-4">
                <DocKicker
                  parts={[
                    <Link key="cat" href="/browse" className="hover:opacity-70">{topicLabel(r.series.category)}</Link>,
                    <Link key="series" href={`/${r.series.slugAsParams}`} className="hover:opacity-70">{r.series.title}</Link>,
                  ]}
                />
                <ShareButtons url={url} title={r.chapter.title} />
              </div>
              <h1 className={DOC_TITLE_CLS}>{r.chapter.title}</h1>
              {r.chapter.description && (
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{r.chapter.description}</p>
              )}
              <MetaCard
                rows={[
                  { label: '시리즈', value: r.series.title },
                  { label: '발행', value: r.series.date ? r.series.date.slice(0, 10) : '' },
                  { label: '수정', value: r.chapter.last_synced ? r.chapter.last_synced.slice(0, 10) : '' },
                ]}
              />
            </header>

            {/* TOC collapsible (below xl; right rail takes over on xl) */}
            {r.chapter.toc.length > 0 && (
              <div className="xl:hidden">
                <MobileCollapsible title="On this page" alwaysVisible>
                  <TableOfContents items={r.chapter.toc} hideTitle />
                </MobileCollapsible>
              </div>
            )}

            {childNodes.length > 0 ? (
              <section>
                <h2 className="mb-4 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                  하위 챕터
                </h2>
                <ChapterList nodes={childNodes} counter={{ value: 0 }} />
              </section>
            ) : (
              <div className="prose max-w-none dark:prose-invert">
                <MDXContent code={r.chapter.body} />
              </div>
            )}

            <nav className="mt-16 flex items-center justify-between gap-4 border-t border-border/60 pt-6 text-sm">
              {r.prev ? (
                <Link href={`/${r.prev.slugAsParams}`} className="group min-w-0 flex-1">
                  <div className="text-xs text-muted-foreground">이전</div>
                  <div className="truncate group-hover:text-primary">← {r.prev.title}</div>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
              {r.next ? (
                <Link href={`/${r.next.slugAsParams}`} className="group min-w-0 flex-1 text-right">
                  <div className="text-xs text-muted-foreground">다음</div>
                  <div className="truncate group-hover:text-primary">{r.next.title} →</div>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
            </nav>

            {/* 백링크 */}
            <BacklinksPanel slug={r.chapter.slugAsParams} />
          </div>
        </article>

        {/* ── Right rail: on this page (xl) ── */}
        {r.chapter.toc.length > 0 && (
          <aside className="hidden xl:block">
            <div className="sticky top-14 py-12">
              <TableOfContents items={r.chapter.toc} />
            </div>
          </aside>
        )}
      </div>
    </div>
    </>
  )
}
