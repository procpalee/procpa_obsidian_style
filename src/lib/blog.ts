// 블로그 — content/posts/*.md (Obsidian Vault에서 sync-to-blog.mjs로 동기화된 산출물)를 읽어
// 목록/본문을 제공한다. 파일은 ASCII slug 파일명, frontmatter에 category('ai'|'project')·slug 포함.
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import remarkCallout from './remark-callout'
import { type CategoryKey, type PostMeta, CATEGORY_LABEL, CATEGORIES, formatDate } from './blog-shared'

export { CATEGORIES, formatDate }
export type { PostMeta, CategoryKey }

export type Post = PostMeta & { html: string }

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')
const IS_PROD = process.env.NODE_ENV === 'production'

function readingTimeOf(body: string): number {
  // 한국어 기준 분당 ~500자. 코드/공백 제외 대략치.
  const chars = body.replace(/\s+/g, '').length
  return Math.max(1, Math.round(chars / 500))
}

function normalizeCategory(v: unknown): CategoryKey {
  return v === 'project' ? 'project' : 'ai'
}

function parseFile(file: string): { meta: PostMeta; body: string } | null {
  const raw = fs.readFileSync(file, 'utf8')
  const { data, content } = matter(raw)
  if (data.draft && IS_PROD) return null
  const slug = String(data.slug || path.basename(file, '.md'))
  const category = normalizeCategory(data.category)
  return {
    body: content,
    meta: {
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ''),
      date: String(data.date ?? ''),
      updated: data.updated ? String(data.updated) : undefined,
      category,
      categoryLabel: CATEGORY_LABEL[category],
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      cover: data.cover ? String(data.cover) : undefined,
      readingTime: readingTimeOf(content),
    },
  }
}

function listFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md')).map((f) => path.join(POSTS_DIR, f))
}

export function getAllPosts(): PostMeta[] {
  return listFiles()
    .map(parseFile)
    .filter((p): p is { meta: PostMeta; body: string } => p !== null)
    .map((p) => p.meta)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
}

export function getAllTags(): string[] {
  const set = new Set<string>()
  for (const p of getAllPosts()) p.tags.forEach((t) => set.add(t))
  return [...set].sort((a, b) => a.localeCompare(b, 'ko'))
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const file = path.join(POSTS_DIR, `${slug}.md`)
  if (!fs.existsSync(file)) return null
  const parsed = parseFile(file)
  if (!parsed) return null
  const html = String(
    await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkCallout)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeSlug)
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(parsed.body),
  )
  return { ...parsed.meta, html }
}
