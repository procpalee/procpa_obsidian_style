# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Personal **portfolio** site for a Korean CPA — 이재현 (procpa.co.kr). Static Next.js 16 (App Router, Turbopack) on Vercel. It introduces who he is, what he does, and lets visitors send a business inquiry (회계 자문 · AI 도입/AX 컨설팅 · 강의 · 협업).

It used to be a blog/knowledge-base; that was removed. Writing now lives **externally** and is only linked: Naver Blog (`blog.naver.com/procpalee`) and Wikidocs. There is **no on-site blog, content pipeline, or Velite** anymore. The author's old Obsidian markdown still sits in `content/` on disk but is **not tracked by git and not consumed by the build** (gitignored); don't wire it back in without being asked.

## Commands

```bash
npm run dev     # next dev (Turbopack)
npm run build   # next build
npm run start   # serve production build
npm run lint    # eslint
```

Deploy: push to `master` → Vercel auto-deploys. (`npm run lint` currently has 0 errors; 2 known warnings about the CDN font `<link>` in `layout.tsx` — intentional.)

## Routing architecture

App Router under `src/app/`. Next.js 16 — **`params`/`searchParams` are `Promise`** and must be `await`ed. Routes:

- `/` (home), `/about` (소개), `/portfolio` (작업 — 도서·강의·프로젝트·뉴스), `/contact` (문의 — Web3Forms form + channels), `/terms`, `/disclaimer`.
- `src/app/api/og/route.tsx` — dynamic OG image (Satori); pages link it via `generateMetadata().openGraph.images = /api/og?...`.
- `sitemap.ts`, `robots.ts` — static portfolio routes only.
- `next.config.ts` redirects old paths → new: `/projects`→`/portfolio`; `/blog /browse /downloads /tags /series`→`/`.
- Do **not** reintroduce `middleware.ts` (use `proxy.ts` if ever needed).

## Editing copy & content (important)

Most user-facing copy is centralized so it can be edited without touching components — see **`EDITING.md`**. In short:

- **Narrative copy** (home hero, section kickers/titles/descriptions, CTA, Approach points, page heroes, nav/footer labels, form labels/messages, page metadata): **`src/lib/site-content.ts`** — one file. Components read from it; don't hardcode new strings in JSX, add them here.
- **List data**: `src/lib/*-data.ts` — `services-data` (4 services), `publications-data` (도서), `projects-data`, `press-data` (뉴스), `lectures-data` (강의, may be empty → section shows a "준비 중" note), `about-data` (stats·advisory·career·education·expertise·certificates·contacts), `site-config.ts` (email/kakao/naver/wikidocs/youtube/github links + `web3formsKey`).
- **Legal pages** (`/terms`, `/disclaimer`): long copy edited directly in their `page.tsx`.
- **Images**: hero `public/hero-cover.jpg` (duotone-tinted in `hero-fx/image-duotone.tsx`), book covers `public/covers/*.jpg`.

## Design system

- **Framework**: Tailwind v4 + a tiny bit of shadcn-style UI (`src/components/ui/button.tsx`, `sheet.tsx`, built on `@base-ui/react`). Tailwind plugins via `@plugin` in `src/app/globals.css` (typography + tw-animate-css).
- **Fonts**: Pretendard (CDN `<link>` in `src/app/layout.tsx` head) for sans; `font-mono` maps to the same sans stack (labels/numbers use `tabular-nums`).
- **Theme**: near-black dark + blue `primary`. Dark is default. No next-themes — pre-hydration script in `src/lib/theme-script.ts` injected into `<head>`; `src/components/theme-toggle.tsx` toggles `.dark` on `<html>` + `localStorage('theme')`.
- **Layout width**: header, footer, and all pages share `mx-auto max-w-[1440px] px-6`. Keep in sync.
- **Tone**: hierarchy from typography, monospace kickers, hairline dividers (`border-border/60`). Korean text gets `word-break: keep-all` (on `<body>`). **Exception — the home page**: editorial impact is allowed there — duotone image hero with gradient overlays + shimmer accent word + entrance animations (`src/components/home/hero-fx/*`), the credential marquee, count-up stat numerals, and oversized display type (`Section size="display"`). Home FX keyframes/utilities live in `globals.css` (`fx-*`, `.edge-fade-x`), all `prefers-reduced-motion`-aware. Subpages keep the no-gradient/no-glow restraint.
- **Border canon**: structural dividers/cards use `border-border/60`; interactive controls (button/inputs/CTA links) use full `border-border`.
- **Color**: zinc + blue `primary`. Functional semantic color only — project status dots (`project-card.tsx`: emerald/amber) and the hero accent. Verify light + dark.

## Home page

`src/app/page.tsx`: **Hero(+Work Index) → CredentialMarquee → ServicesIndex → ProofStats → WorksStrip → ContactFinale**. The home page *is* the inquiry funnel — the hero answers who/what/how-to-contact above the fold (badge with name+KICPA role, big headline, conversion lede, primary CTA to `/contact#inquiry`, a plain mailto link, and a bottom Work Index of the 4 services anchoring to `/#services`). Service rows in `ServicesIndex` deep-link to `/contact?type=<key>#inquiry`. Sections (except hero/marquee) wrapped in `src/components/reveal.tsx`. Hero = `home/hero.tsx` → `home/hero-fx/hero-fx-shell.tsx` + `home/hero-fx/image-duotone.tsx`. `ProofStats` renders `about-data.stats` with Korean labels from `home.approach.statsLabels` (index-matched — keep order in sync). Deliberate CTA budget: hero primary → service rows → closing CTA; don't scatter more.

## SEO

- Per-page `generateMetadata()` sets `openGraph.images`/`twitter.images` to `/api/og?...`.
- JSON-LD via `src/components/json-ld.tsx` — `websiteJsonLd()` + `personJsonLd()` (Person with `makesOffer` from services + `contactPoint`). Keep the `SITE` constant in sync with `metadata.metadataBase` in `src/app/layout.tsx`.
- `sitemap.ts` / `robots.ts` list the static routes; no content feeds (rss/llms removed).
