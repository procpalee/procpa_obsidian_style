// 사이트 전역 상수 단일 출처 — 링크·연락처·업무 가능 상태.
// 흩어져 하드코딩되던 이메일/카카오/외부 링크를 여기로 통합한다.

export const siteConfig = {
  /** 연락 채널 */
  email: 'wogus3575@naver.com',
  kakaoDirect: 'https://open.kakao.com/o/sQCXbyXg', // 1:1 오픈채팅
  kakaoCommunity: 'https://open.kakao.com/o/gcpfDupi', // 실무 자동화 커뮤니티 오픈채팅방

  /** 외부 글/채널 (별도 사이트 — 백링크만) */
  naverBlog: 'https://blog.naver.com/procpalee',
  wikidocs: 'https://wikidocs.net/', // TODO: 정확한 가이드북 URL로 교체
  youtube: 'https://www.youtube.com/@Jaehyun-f9c',
  github: 'https://github.com/procpalee',

  /** Web3Forms 공개 access key (클라이언트 노출 OK). 미설정 시 폼 대신 이메일 안내로 fallback. */
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '',
} as const
