/** 오로라 메시 — 블루/바이올렛/시안 블롭이 떠다니며 색이 흐른다. (CSS, 화려한 배경) */
export function AuroraBg() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#070912]">
      <style>{`
        @keyframes fxBlobA{0%,100%{transform:translate(-8%,-6%) scale(1)}50%{transform:translate(14%,10%) scale(1.3)}}
        @keyframes fxBlobB{0%,100%{transform:translate(12%,-4%) scale(1.1)}50%{transform:translate(-12%,14%) scale(1.45)}}
        @keyframes fxBlobC{0%,100%{transform:translate(-4%,12%) scale(1)}50%{transform:translate(10%,-12%) scale(1.3)}}
        @keyframes fxHue{0%{filter:hue-rotate(0deg)}100%{filter:hue-rotate(50deg)}}
        .fx-aurora{animation:fxHue 14s ease-in-out infinite alternate}
        @media (prefers-reduced-motion: reduce){.fx-aurora,.fx-aurora>*{animation:none!important}}
      `}</style>
      <div className="fx-aurora absolute inset-0">
        <div className="absolute left-[2%] top-[-10%] h-[60vh] w-[60vh] rounded-full bg-[#2563eb] opacity-55 blur-[90px] [animation:fxBlobA_17s_ease-in-out_infinite]" />
        <div className="absolute right-[0%] top-[6%] h-[55vh] w-[55vh] rounded-full bg-[#7c3aed] opacity-50 blur-[100px] [animation:fxBlobB_21s_ease-in-out_infinite]" />
        <div className="absolute left-[28%] bottom-[-12%] h-[52vh] w-[52vh] rounded-full bg-[#06b6d4] opacity-45 blur-[100px] [animation:fxBlobC_19s_ease-in-out_infinite]" />
      </div>
    </div>
  )
}
