import Image from 'next/image'

/** 켄번스 — 배경 이미지가 천천히 줌·팬하며 살아있는 느낌. */
export function KenBurnsBg() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes fxKen{0%{transform:scale(1.05) translate(0,0)}100%{transform:scale(1.22) translate(-2.5%,-2%)}}
        @media (prefers-reduced-motion: reduce){.fx-ken{animation:none}}
      `}</style>
      <div className="fx-ken absolute inset-0 [animation:fxKen_22s_ease-in-out_infinite_alternate]">
        <Image src="/hero-cover.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
      </div>
    </div>
  )
}
