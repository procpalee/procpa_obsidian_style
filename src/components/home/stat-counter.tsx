'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * 숫자 카운트업 — 뷰포트 진입 시 0→최종값. "7+" 같은 접미사는 유지.
 * SSR/JS 미동작/reduced-motion에서는 최종값이 그대로 보인다.
 */
export function StatCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const el = ref.current
    const match = value.match(/^(\d+)(.*)$/)
    if (!el || !match) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const target = parseInt(match[1], 10)
    const suffix = match[2]
    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const duration = 900
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setDisplay(`${Math.round(target * eased)}${suffix}`)
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value])

  return <span ref={ref}>{display}</span>
}
