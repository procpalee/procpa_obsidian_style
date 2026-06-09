import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export const runtime = 'nodejs'

// Latin/number glyphs we always need (domain, dates) regardless of the title.
const BASE_GLYPHS = 'PROCPAprocpa.co.kr0123456789.,:·-—&()/ '

type OgFont = { name: string; data: ArrayBuffer; weight: 400 | 700; style: 'normal' }

/**
 * next/og (Satori) ships no CJK glyphs, so Korean text renders as boxes unless
 * we provide a font. We fetch a per-request *subset* of Noto Sans KR from Google
 * Fonts containing only the glyphs in this card — tiny and fast.
 */
async function loadGoogleFont(weight: 400 | 700, text: string): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@${weight}&text=${encodeURIComponent(text)}`
    const css = await (
      await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; OG)' } })
    ).text()
    const src = css.match(/src:\s*url\(([^)]+)\)\s*format/)?.[1]
    if (!src) return null
    const res = await fetch(src)
    if (!res.ok) return null
    return await res.arrayBuffer()
  } catch {
    return null
  }
}

async function loadFonts(text: string): Promise<OgFont[]> {
  const subset = text + BASE_GLYPHS
  const [r400, r700] = await Promise.all([loadGoogleFont(400, subset), loadGoogleFont(700, subset)])
  const fonts: OgFont[] = []
  if (r400) fonts.push({ name: 'Noto Sans KR', data: r400, weight: 400, style: 'normal' })
  if (r700) fonts.push({ name: 'Noto Sans KR', data: r700, weight: 700, style: 'normal' })
  return fonts
}

const IMG_HEADERS = {
  'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable',
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = (searchParams.get('title') ?? 'PROCPA').slice(0, 120)
  const subtitle = (searchParams.get('subtitle') ?? '').slice(0, 200)
  const kicker = (searchParams.get('kicker') ?? 'PROCPA').slice(0, 40)
  const meta = (searchParams.get('meta') ?? '').slice(0, 40)
  const variant = searchParams.get('variant') ?? 'a'

  const fonts = await loadFonts(`${title}${subtitle}${kicker}${meta}`)
  const props = { title, subtitle, kicker, meta, fonts }

  if (variant === 'b') return variantB(props)
  if (variant === 'c') return variantC(props)
  return variantA(props)
}

type OgProps = {
  title: string
  subtitle: string
  kicker: string
  meta: string
  fonts: OgFont[]
}

function imageOptions(fonts: OgFont[]) {
  return {
    width: 1200,
    height: 630,
    headers: IMG_HEADERS,
    ...(fonts.length ? { fonts } : {}),
  } as const
}

const FONT_FAMILY = '"Noto Sans KR", sans-serif'

/* ── Variant A: Accent Line ── */
function variantA({ title, subtitle, kicker, meta, fonts }: OgProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#000',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          fontFamily: FONT_FAMILY,
        }}
      >
        {/* Top accent line */}
        <div style={{ height: 4, background: '#5b9cff', width: '100%' }} />
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '60px 80px 50px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 18,
              color: '#888',
              letterSpacing: 4,
              textTransform: 'uppercase' as const,
            }}
          >
            <span>{kicker}</span>
            {meta && <span>{meta}</span>}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.15, color: '#fff' }}>
              {title}
            </div>
            {subtitle && (
              <div style={{ fontSize: 24, color: '#aaa', lineHeight: 1.4 }}>{subtitle}</div>
            )}
          </div>
          <div style={{ fontSize: 20, color: '#5b9cff', letterSpacing: 1 }}>procpa.co.kr</div>
        </div>
      </div>
    ),
    imageOptions(fonts),
  )
}

/* ── Variant B: Left Stripe ── */
function variantB({ title, subtitle, kicker, meta, fonts }: OgProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#000',
          color: '#fff',
          display: 'flex',
          position: 'relative',
          fontFamily: FONT_FAMILY,
        }}
      >
        {/* Left stripe */}
        <div style={{ width: 6, background: '#5b9cff', height: '100%', flexShrink: 0 }} />
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '60px 80px 50px 74px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 18,
              color: '#888',
              letterSpacing: 4,
              textTransform: 'uppercase' as const,
            }}
          >
            <span>{kicker}</span>
            {meta && <span>{meta}</span>}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.15, color: '#fff' }}>
              {title}
            </div>
            {subtitle && (
              <div style={{ fontSize: 24, color: '#aaa', lineHeight: 1.4 }}>{subtitle}</div>
            )}
          </div>
          <div style={{ fontSize: 20, color: '#5b9cff', letterSpacing: 1 }}>procpa.co.kr</div>
        </div>
      </div>
    ),
    imageOptions(fonts),
  )
}

/* ── Variant C: Border Frame ── */
function variantC({ title, subtitle, kicker, meta, fonts }: OgProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#000',
          color: '#fff',
          display: 'flex',
          padding: 24,
          fontFamily: FONT_FAMILY,
        }}
      >
        <div
          style={{
            flex: 1,
            border: '1px solid #333',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '50px 64px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 18,
              color: '#888',
              letterSpacing: 4,
              textTransform: 'uppercase' as const,
            }}
          >
            <span>{kicker}</span>
            {meta && <span>{meta}</span>}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.15, color: '#fff' }}>
              {title}
            </div>
            {subtitle && (
              <div style={{ fontSize: 22, color: '#aaa', lineHeight: 1.4 }}>{subtitle}</div>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, color: '#5b9cff', letterSpacing: 1 }}>
            procpa.co.kr
          </div>
        </div>
      </div>
    ),
    imageOptions(fonts),
  )
}
