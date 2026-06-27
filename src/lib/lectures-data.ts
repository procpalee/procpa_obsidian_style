// 강의·워크숍 이력 — /portfolio 페이지에서 사용.
// 아직 없음(향후 추가 예정). 항목이 생기면 아래 배열에 추가하면 자동 렌더된다.

export type Lecture = {
  key: string
  title: string
  description: string
  /** 주최/대상 기관 */
  org?: string
  /** 시점 라벨 */
  date?: string
  /** 자료·신청 링크 (선택) */
  url?: string
}

export const lectures: Lecture[] = []
