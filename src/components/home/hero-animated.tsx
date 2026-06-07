'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

/* 움직이는 홈 히어로 시안 — 캔버스/CSS 애니메이션 기반. prefers-reduced-motion 존중. */

const ACCENT = '91,156,255' // dark primary(#5B9CFF) 기준

function Ctas() {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <Link
        href="/#follow"
        className="rounded-md bg-primary px-5 py-2.5 text-[14px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        구독하기
      </Link>
      <Link
        href="/contact"
        className="rounded-md border border-border/60 px-5 py-2.5 text-[14px] font-medium transition-colors hover:border-foreground/40"
      >
        문의하기
      </Link>
    </div>
  )
}

/** 시안 G — Constellation: 마우스에 반응하는 파티클 네트워크(캔버스). 가장 화려·인터랙티브. */
export function HeroConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let raf = 0
    const mouse = { x: -9999, y: -9999 }
    type P = { x: number; y: number; vx: number; vy: number }
    let pts: P[] = []

    function resize() {
      const rect = canvas!.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.max(28, Math.min(96, Math.floor((w * h) / 13000)))
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
      }))
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h)
      for (const p of pts) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const d2 = dx * dx + dy * dy
        if (d2 < 130 * 130) {
          const d = Math.sqrt(d2) || 1
          const f = ((130 - d) / 130) * 0.9
          p.x += (dx / d) * f
          p.y += (dy / d) * f
        }
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d = Math.hypot(dx, dy)
          if (d < 135) {
            ctx!.strokeStyle = `rgba(${ACCENT},${(1 - d / 135) * 0.38})`
            ctx!.lineWidth = 1
            ctx!.beginPath()
            ctx!.moveTo(pts[i].x, pts[i].y)
            ctx!.lineTo(pts[j].x, pts[j].y)
            ctx!.stroke()
          }
        }
      }
      for (const p of pts) {
        ctx!.fillStyle = `rgba(${ACCENT},0.9)`
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, 1.7, 0, Math.PI * 2)
        ctx!.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    if (reduce) cancelAnimationFrame(raf)

    const onMove = (e: PointerEvent) => {
      const r = canvas!.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    window.addEventListener('resize', resize)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-background">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="relative mx-auto max-w-3xl px-6 py-28 text-center sm:py-36">
        <p className="font-mono text-sm uppercase tracking-widest text-primary">Home</p>
        <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl">
          회계 전문성에 <span className="text-primary">AI의 생산성</span>을 더합니다
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-[1.8] text-muted-foreground">
          회계·재무 실무에 AI를 접목해 더 빠르고 정확하게 일하는 법을 연구하고, 그 과정을{' '}
          <span className="text-foreground">글·도구·강의</span>로 공유합니다.
        </p>
        <p className="mt-3 font-mono text-xs text-muted-foreground/70">
          (배경의 점들이 마우스를 따라 반응합니다)
        </p>
        <div className="mt-8 flex justify-center">
          <Ctas />
        </div>
      </div>
    </section>
  )
}

/** 시안 H — Typewriter: 핵심 키워드가 타이핑/회전하는 헤드라인. */
export function HeroTyping() {
  const words = ['AI의 생산성', '데이터 분석', '자동화 워크플로', '지식 공유']
  const [text, setText] = useState('')
  const [wi, setWi] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(words[0])
      return
    }
    const current = words[wi % words.length]
    let t: ReturnType<typeof setTimeout>
    if (!deleting) {
      if (text.length < current.length) {
        t = setTimeout(() => setText(current.slice(0, text.length + 1)), 95)
      } else {
        t = setTimeout(() => setDeleting(true), 1400)
      }
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(current.slice(0, text.length - 1)), 45)
      } else {
        t = setTimeout(() => {
          setDeleting(false)
          setWi((n) => n + 1)
        }, 200)
      }
    }
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, deleting, wi])

  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-background">
      <div
        className="absolute inset-0 opacity-70"
        style={{ backgroundImage: 'url(/hero-grid.svg)', backgroundSize: '48px 48px' }}
      />
      <div className="relative mx-auto max-w-5xl px-6 py-24 sm:py-32">
        <p className="font-mono text-sm uppercase tracking-widest text-primary">Home</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.18] tracking-tight sm:text-5xl">
          회계 전문성에
          <br />
          <span className="text-primary">{text}</span>
          <span className="ml-0.5 inline-block h-[0.9em] w-[3px] translate-y-[2px] animate-pulse bg-primary" />
          을 더합니다
        </h1>
        <p className="mt-6 max-w-2xl text-[16px] leading-[1.85] text-muted-foreground">
          안녕하세요, 한국공인회계사 <span className="text-foreground">이재현</span>입니다.
          회계·재무 실무에 AI를 접목해 더 빠르고 정확하게 일하는 법을 연구합니다.
        </p>
        <div className="mt-8">
          <Ctas />
        </div>
      </div>
    </section>
  )
}
