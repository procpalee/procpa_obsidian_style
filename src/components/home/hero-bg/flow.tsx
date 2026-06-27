'use client'

import { useEffect, useRef } from 'react'

/** 플로우 필드 — 입자가 노이즈 벡터장을 따라 흐르며 잔상을 남김. 고급스러운 유기적 모션. */
export function FlowBg() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const parent = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !parent || !ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let raf = 0
    let t = 0
    let ps: { x: number; y: number; life: number }[] = []

    function spawn() {
      return { x: Math.random() * w, y: Math.random() * h, life: 40 + Math.random() * 120 }
    }
    function init() {
      const n = Math.min(420, Math.max(120, Math.floor((w * h) / 4200)))
      ps = Array.from({ length: n }, spawn)
    }
    function resize() {
      const r = parent!.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx!.fillStyle = '#0a0c10'
      ctx!.fillRect(0, 0, w, h)
      init()
      // 초기 1프레임 즉시 렌더(빈 화면 방지). 이후 rAF가 흐름을 만든다.
      ctx!.fillStyle = 'rgba(150,180,255,0.5)'
      for (const p of ps) ctx!.fillRect(p.x, p.y, 1.4, 1.4)
    }

    function angle(x: number, y: number) {
      return (Math.sin(x * 0.0022 + t) + Math.cos(y * 0.0022 + t * 0.7)) * Math.PI
    }

    function frame() {
      t += 0.0016
      // 잔상: 반투명 다크로 서서히 덮음
      ctx!.fillStyle = 'rgba(10,12,16,0.07)'
      ctx!.fillRect(0, 0, w, h)
      for (const p of ps) {
        const a = angle(p.x, p.y)
        const nx = p.x + Math.cos(a) * 1.1
        const ny = p.y + Math.sin(a) * 1.1
        const fade = Math.min(1, p.life / 60)
        ctx!.strokeStyle = `rgba(140,175,255,${0.32 * fade})`
        ctx!.lineWidth = 1
        ctx!.beginPath()
        ctx!.moveTo(p.x, p.y)
        ctx!.lineTo(nx, ny)
        ctx!.stroke()
        p.x = nx
        p.y = ny
        p.life -= 1
        if (p.life <= 0 || p.x < 0 || p.x > w || p.y < 0 || p.y > h) Object.assign(p, spawn())
      }
      raf = requestAnimationFrame(frame)
    }

    resize()
    window.addEventListener('resize', resize)
    if (!reduce) raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />
}
