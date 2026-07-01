import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'
import fs from 'node:fs'
import path from 'node:path'
import { content } from '@/lib/site-content'
import { services } from '@/lib/services-data'

// 홈 히어로 카드 하단의 업무 인덱스 라인 (실제 히어로 Work Index를 미러링)
const WORK_AREAS = services.map((s) => s.title).join(' · ')

export const runtime = 'nodejs'

/** 히어로 배경 이미지를 data URI로 (Satori가 파일을 직접 못 읽으므로 인라인). */
function heroDataUri(): string | null {
  try {
    const buf = fs.readFileSync(path.join(process.cwd(), 'public', 'hero-cover.jpg'))
    return `data:image/jpeg;base64,${buf.toString('base64')}`
  } catch {
    return null
  }
}

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

  if (variant === 'hero') {
    const rawTitle = searchParams.get('title')
    if (rawTitle) {
      // 다른 페이지: 히어로 배경 위에 페이지 제목/부제
      const heroFonts = await loadFonts(`${title}${subtitle}${kicker}`)
      return variantHero(heroFonts, { kicker, title, subtitle })
    }
    // 홈: 실제 히어로 헤드라인(강조어 포함) + 업무 인덱스 라인
    const h = content.home.hero
    const heroFonts = await loadFonts(
      `${h.badge}${h.headline1}${h.headlineAccent}${h.headlineSuffix}${h.lede}${WORK_AREAS}`,
    )
    return variantHero(heroFonts)
  }

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

/* ── Variant Hero: 실제 히어로(배경 이미지 + 듀오톤). opts 없으면 홈 헤드라인, 있으면 페이지 제목/부제 ── */
function variantHero(fonts: OgFont[], opts?: { kicker: string; title: string; subtitle: string }) {
  const h = content.home.hero
  const bg = heroDataUri()
  const badge = opts ? opts.kicker : h.badge
  const lede = opts ? opts.subtitle : h.lede
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: '#070912',
          fontFamily: FONT_FAMILY,
        }}
      >
        {bg && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bg}
            alt=""
            width={1200}
            height={630}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
        {/* 블루 듀오톤 + 가독성용 어두운 그라데이션 */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(11,28,74,0.5)' }} />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, rgba(4,7,16,0.92) 0%, rgba(4,7,16,0.6) 55%, rgba(4,7,16,0.3) 100%)',
          }}
        />
        {/* 콘텐츠 */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            padding: '0 80px',
          }}
        >
          <div style={{ display: 'flex' }}>
            <div
              style={{
                fontSize: 20,
                color: '#cdd8f0',
                letterSpacing: 3,
                textTransform: 'uppercase' as const,
                border: '1px solid rgba(255,255,255,0.28)',
                borderRadius: 999,
                padding: '8px 18px',
              }}
            >
              {badge}
            </div>
          </div>
          {opts ? (
            <div style={{ display: 'flex', fontSize: 66, fontWeight: 700, lineHeight: 1.15, color: '#fff', marginTop: 28 }}>
              {opts.title}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: 74, fontWeight: 700, lineHeight: 1.12, color: '#fff', marginTop: 28 }}>
              <span>{h.headline1}</span>
              <span>
                <span style={{ color: '#5b9cff' }}>{h.headlineAccent}</span>
                {h.headlineSuffix}
              </span>
            </div>
          )}
          {lede ? <div style={{ display: 'flex', fontSize: 26, color: '#c7cedd', marginTop: 26 }}>{lede}</div> : null}
        </div>
        {/* 홈 카드: 하단에 의뢰 가능한 업무 인덱스 (실제 히어로 Work Index 미러) */}
        {!opts && (
          <div
            style={{
              position: 'absolute',
              bottom: 88,
              left: 80,
              right: 80,
              paddingTop: 18,
              borderTop: '1px solid rgba(255,255,255,0.2)',
              fontSize: 21,
              color: '#9fb4dd',
              letterSpacing: 1,
              display: 'flex',
            }}
          >
            {WORK_AREAS}
          </div>
        )}
        <div style={{ position: 'absolute', bottom: 46, left: 80, fontSize: 22, color: '#5b9cff', letterSpacing: 1 }}>
          procpa.co.kr
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
