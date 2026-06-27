'use client'

import { useEffect, useRef } from 'react'

/** 드리프팅 그리드 — 천천히 흐르는 격자 + 교차점에서 명멸하는 노드. 테크/건축 느낌. */
export function GridBg() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const parent = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !parent || !ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const GAP = 52
    let w = 0
    let h = 0
    let raf = 0
    let t = 0
    let nodes: { x: number; y: number; phase: number }[] = []

    function init() {
      nodes = []
      const cols = Math.ceil(w / GAP)
      const rows = Math.ceil(h / GAP)
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          if (Math.random() < 0.06) nodes.push({ x: i * GAP, y: j * GAP, phase: Math.random() * Math.PI * 2 })
        }
      }
    }
    function resize() {
      const r = parent!.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      init()
      draw(0) // 초기 1프레임 즉시 렌더.
    }

    function draw(off: number) {
      ctx!.clearRect(0, 0, w, h)
      ctx!.strokeStyle = 'rgba(140,160,200,0.10)'
      ctx!.lineWidth = 1
      ctx!.beginPath()
      for (let x = (off % GAP) - GAP; x < w + GAP; x += GAP) {
        ctx!.moveTo(x, 0)
        ctx!.lineTo(x, h)
      }
      for (let y = (off % GAP) - GAP; y < h + GAP; y += GAP) {
        ctx!.moveTo(0, y)
        ctx!.lineTo(w, y)
      }
      ctx!.stroke()
      for (const n of nodes) {
        const a = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(t * 1.8 + n.phase))
        ctx!.fillStyle = `rgba(120,160,255,${a})`
        ctx!.beginPath()
        ctx!.arc(n.x + (off % GAP), n.y + (off % GAP), 1.8, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    function frame() {
      t += 0.02
      draw(t * 9)
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
