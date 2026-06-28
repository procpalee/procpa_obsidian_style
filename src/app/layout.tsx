import type { Metadata } from 'next'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import Script from 'next/script'
import { themeScript } from '@/lib/theme-script'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  metadataBase: new URL('https://procpa.co.kr'),
  title: {
    default: 'PROCPA — 회계사의 기록',
    template: '%s · PROCPA',
  },
  description: '회계사의 기록 — 회계·재무 전문성에 AI의 생산성을 더하다.',
  applicationName: 'PROCPA',
  authors: [{ name: '이재현', url: 'https://procpa.co.kr/about' }],
  creator: '이재현',
  publisher: 'PROCPA',
  keywords: [
    '공인회계사',
    '회계사',
    '회계',
    '재무',
    '회계감사',
    '내부회계관리제도',
    'ICFR',
    '기업가치평가',
    '원가분석',
    'AI 활용',
    '생산성',
    '옵시디언',
    'PROCPA',
    '이재현',
  ],
  category: 'finance',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://procpa.co.kr',
    siteName: 'PROCPA',
    title: 'PROCPA — 회계사의 기록',
    description: '회계사의 기록 — 회계·재무 전문성에 AI의 생산성을 더하다.',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'PROCPA — 회계사의 기록' }],
  },
  alternates: {
    canonical: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PROCPA — 회계사의 기록',
    description: '회계사의 기록 — 회계·재무 전문성에 AI의 생산성을 더하다.',
    images: ['/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  // Search-console ownership tokens — supplied via Vercel env (empty → not rendered).
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.NAVER_SITE_VERIFICATION
      ? { other: { 'naver-site-verification': process.env.NAVER_SITE_VERIFICATION } }
      : {}),
  },
  formatDetection: { telephone: false, address: false, email: false },
  other: {
    'color-scheme': 'dark light',
    'theme-color': '#000000',
  },
  icons: {
    icon: [
      { url: '/favicon.ico?v=2' },
      { url: '/icon.png?v=2', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=2' },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className="dark h-full antialiased"
    >
      <head>
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/variable/PretendardVariable.subset.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* 폰트 CSS 비동기 로딩: print → all 트릭으로 FCP 블로킹 방지 */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/variable/pretendardvariable.min.css"
          media="print"
          // @ts-expect-error -- onLoad sets media to 'all' after async load
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/variable/pretendardvariable.min.css"
          />
        </noscript>
        {/* Noto Sans KR (보조 한글 폰트) — 비동기 로딩 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap"
          media="print"
          // @ts-expect-error -- onLoad sets media to 'all' after async load
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap"
          />
        </noscript>
        <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground [word-break:keep-all]">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
