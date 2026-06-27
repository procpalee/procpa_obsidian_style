/** 코닉 스포트라이트 — 컬러 코닉 그라데이션이 회전하며 빛이 쓸고 지나간다 + 은은한 격자. (CSS) */
export function SpotlightBg() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#070912]">
      <style>{`
        @keyframes fxSpin{to{transform:translate(-50%,-50%) rotate(360deg)}}
        @keyframes fxPulse{0%,100%{opacity:.35}50%{opacity:.6}}
        @media (prefers-reduced-motion: reduce){.fx-spin{animation:none!important}}
      `}</style>
      <div
        className="fx-spin absolute left-1/2 top-1/2 h-[170vh] w-[170vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[50px] [animation:fxSpin_26s_linear_infinite]"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0deg, #2563eb 50deg, transparent 120deg, #7c3aed 190deg, transparent 250deg, #06b6d4 320deg, transparent 360deg)',
        }}
      />
      <div
        className="absolute inset-0 [background-size:48px_48px] [background-image:linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,transparent,#070912_75%)]" />
    </div>
  )
}
