'use client'

import { useEffect, useRef } from 'react'

/** 컬러 플로우 필드 — 입자가 노이즈 벡터장을 따라 흐르며 색상이 순환(블루↔바이올렛↔시안). 화려한 모션. */
export function ColorFlowBg() {
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

    const spawn = () => ({ x: Math.random() * w, y: Math.random() * h, life: 40 + Math.random() * 140 })
    function init() {
      const n = Math.min(520, Math.max(160, Math.floor((w * h) / 3400)))
      ps = Array.from({ length: n }, spawn)
    }
    function base() {
      ctx!.fillStyle = '#070912'
      ctx!.fillRect(0, 0, w, h)
    }
    function resize() {
      const r = parent!.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      base()
      init()
      // 초기 1프레임
      for (const p of ps) {
        const hue = 200 + 80 * (0.5 + 0.5 * Math.sin(p.x * 0.004))
        ctx!.fillStyle = `hsla(${hue},90%,65%,0.5)`
        ctx!.fillRect(p.x, p.y, 1.5, 1.5)
      }
    }
    const angle = (x: number, y: number) => (Math.sin(x * 0.0024 + t) + Math.cos(y * 0.0024 + t * 0.7)) * Math.PI

    function frame() {
      t += 0.0018
      ctx!.fillStyle = 'rgba(7,9,18,0.06)'
      ctx!.fillRect(0, 0, w, h)
      for (const p of ps) {
        const a = angle(p.x, p.y)
        const nx = p.x + Math.cos(a) * 1.2
        const ny = p.y + Math.sin(a) * 1.2
        const hue = 200 + 80 * (0.5 + 0.5 * Math.sin(p.x * 0.004 + t * 2))
        const fade = Math.min(1, p.life / 60)
        ctx!.strokeStyle = `hsla(${hue},95%,68%,${0.38 * fade})`
        ctx!.lineWidth = 1.2
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
