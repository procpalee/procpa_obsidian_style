import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { posts, chapters } from '#site/content'

export const dynamic = 'force-static'

const SITE = 'https://procpa.co.kr'
const CONTENT_ROOT = path.join(process.cwd(), 'content')

/** Read original markdown for a content entry, stripping YAML frontmatter. */
async function readMarkdown(slug: string): Promise<string | null> {
  try {
    const raw = await readFile(path.join(CONTENT_ROOT, `${slug}.md`), 'utf8')
    return raw.replace(/^---\n[\s\S]*?\n---\n?/, '').trim()
  } catch {
    return null
  }
}

// llms-full.txt — full prose of every published note, for AI ingestion/citation.
export async function GET() {
  const sortedPosts = posts
    .filter((p) => !p.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))

  const sortedChapters = chapters
    .filter((c) => !c.draft)
    .sort((a, b) => a.slugAsParams.localeCompare(b.slugAsParams))

  const entries = [
    ...sortedPosts.map((p) => ({
      title: p.title,
      url: `${SITE}/${p.slugAsParams}`,
      date: p.date,
      slug: p.slug,
    })),
    ...sortedChapters.map((c) => ({
      title: c.title,
      url: `${SITE}/${c.slugAsParams}`,
      date: c.last_synced ?? undefined,
      slug: c.slug,
    })),
  ]

  const sections: string[] = []
  for (const e of entries) {
    const md = await readMarkdown(e.slug)
    if (!md) continue
    const meta = [`URL: ${e.url}`, e.date ? `Date: ${e.date}` : null]
      .filter(Boolean)
      .join('\n')
    sections.push(`# ${e.title}\n${meta}\n\n${md}`)
  }

  const body = `# PROCPA — 회계사의 기록 (전체 본문)

> 한국공인회계사 이재현의 지식베이스 전체 본문입니다. 회계·재무 실무와 AI 활용에 관한 글·가이드의 원문을 포함합니다. 사이트 맵은 ${SITE}/llms.txt 를 참고하세요.

${sections.join('\n\n---\n\n')}
`

  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  })
}
