'use client'

import { useEffect, useRef, useState } from 'react'
import { stats } from '@/lib/about-data'

/** Count-up that runs once when scrolled into view (respects reduced-motion). */
function useCountUp(target: number, ms = 1100) {
  const [n, setN] = useState(0)
  const ref = useRef<HTMLSpanElement | null>(null)
  const done = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const raf = requestAnimationFrame(() => setN(target))
      return () => cancelAnimationFrame(raf)
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || done.current) return
        done.current = true
        const start = performance.now()
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / ms)
          setN(Math.round(target * (1 - Math.pow(1 - p, 3))))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [target, ms])

  return { n, ref }
}

function Stat({ value, label }: { value: string; label: string }) {
  const target = parseInt(value, 10) || 0
  const suffix = value.replace(/[\d]/g, '') // keep "+" etc.
  const { n, ref } = useCountUp(target)
  return (
    <div className="flex flex-col">
      <span ref={ref} className="text-4xl font-bold tracking-tight tabular-nums sm:text-5xl">
        {n}
        {suffix}
      </span>
      <span className="mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  )
}

/** Interactive (count-up) stats band — impact device #3. */
export function StatsStrip() {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-8 px-6 py-12 sm:py-16 lg:grid-cols-4">
        {stats.map((s) => (
          <Stat key={s.label} value={s.value} label={s.label} />
        ))}
      </div>
    </section>
  )
}
