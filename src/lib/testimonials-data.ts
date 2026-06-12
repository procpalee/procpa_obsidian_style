/**
 * 강의·자문·협업 후기. 후기가 확보되면 아래 배열에 항목만 추가하세요.
 * 배열이 비어 있으면 관련 섹션은 렌더되지 않습니다(소셜 프루프 가드).
 */
export type Testimonial = {
  quote: string
  author: string
  role?: string
  context?: string
}

export const testimonials: Testimonial[] = []
