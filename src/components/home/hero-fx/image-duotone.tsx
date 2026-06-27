import Image from 'next/image'

/** 듀오톤 — 이미지를 블루 톤으로 가볍게 물들이고 은은한 글로우가 떠다님. 이미지가 보이도록 오버레이는 옅게. */
export function DuotoneBg() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#070912]">
      <style>{`
        @keyframes fxDrift{0%,100%{transform:translate(-6%,-4%) scale(1)}50%{transform:translate(8%,6%) scale(1.2)}}
        @media (prefers-reduced-motion: reduce){.fx-drift{animation:none}}
      `}</style>
      <Image src="/hero-cover.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-[#0b1c4a] opacity-45 mix-blend-multiply" />
      <div className="fx-drift absolute left-1/4 top-0 h-[70vh] w-[70vh] rounded-full bg-[#3b82f6] opacity-25 blur-[110px] [animation:fxDrift_18s_ease-in-out_infinite]" />
    </div>
  )
}
