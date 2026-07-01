import Image from 'next/image'

/** 듀오톤 — 이미지를 블루 톤으로 가볍게 물들이고 은은한 글로우가 떠다님. 이미지가 보이도록 오버레이는 옅게. */
export function DuotoneBg() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#070912]">
      <style>{`
        @keyframes fxDrift{0%,100%{transform:translate(-6%,-4%) scale(1)}50%{transform:translate(8%,6%) scale(1.2)}}
        @media (prefers-reduced-motion: reduce){.fx-drift{animation:none}}
      `}</style>
      <Image
        src="/hero-cover.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDABQODxIPDRQSERIXFhQYHzMhHxwcHz8tLyUzSkFOTUlBSEZSXHZkUldvWEZIZoxob3p9hIWET2ORm4+AmnaBhH//2wBDARYXFx8bHzwhITx/VEhUf39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f3//wAARCAANABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDpIYQuMAdB2qR7mOHKkbiMZwBWU15LNGGY4THKpx+tVLadPNKIjLhgT8+c1TJR00aKy7lxg8jiiq6XQUFUjAAPTNFLUeh//9k="
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#0b1c4a] opacity-50 mix-blend-multiply" />
      {/* 12콜럼 그리드를 따라 흐르는 세로 헤어라인 — 타이포가 지면 위에 놓인 느낌 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: 'clamp(80px, 8.33vw, 120px) 100%',
        }}
      />
      <div className="fx-drift absolute left-1/4 top-0 h-[70vh] w-[70vh] rounded-full bg-[#3b82f6] opacity-25 blur-[110px] [animation:fxDrift_18s_ease-in-out_infinite]" />
    </div>
  )
}
