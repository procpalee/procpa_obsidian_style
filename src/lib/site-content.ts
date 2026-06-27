// ────────────────────────────────────────────────────────────────────────
// 사이트 문구 단일 출처 (Single source of copy)
//
// 화면에 보이는 대부분의 문구는 여기서 고칩니다. 따옴표/쉼표 형식만 유지하면 됩니다.
// 목록형 데이터(서비스·도서·강의·프로젝트·뉴스·경력/자격증·연락처/링크)는 src/lib/*-data.ts 에서 수정합니다.
// 자세한 안내는 루트의 EDITING.md 참고.
// ────────────────────────────────────────────────────────────────────────

export const content = {
  /** 각 페이지 SEO 제목/설명 (검색결과·공유 카드에 사용) */
  meta: {
    home: {
      title: 'PROCPA — 이재현',
      description:
        '한국공인회계사 이재현. 회계·재무 전문성에 AI의 생산성을 더합니다. AX 컨설팅·강의·협업 문의를 받습니다.',
    },
    about: {
      title: '소개',
      description: '한국공인회계사 이재현 — 회계·재무 전문성과 AI의 생산성을 모두 갖춘 전문가.',
    },
    portfolio: {
      title: '포트폴리오',
      description:
        '직접 집필한 도서, 강의, 개발한 도구·MCP 서버, 그리고 활동까지 — 그동안의 작업을 한곳에 모았습니다.',
    },
    contact: {
      title: '문의하기',
      description: '회계·재무 자문, AI 도입 컨설팅, 강의·집필, 협업 제안 — 어떤 주제든 편하게 연락주세요.',
      ogSubtitle: '한국공인회계사 이재현에게 연락하기',
    },
  },

  /** 상단/하단 메뉴 */
  nav: {
    header: [
      { href: '/', label: '홈' },
      { href: '/about', label: '소개' },
      { href: '/portfolio', label: '포트폴리오' },
      { href: '/contact', label: '문의' },
    ],
    menuOpen: '메뉴 열기',
    menuTitle: '메뉴',
    footer: [
      { href: '/terms', label: '이용약관' },
      { href: '/disclaimer', label: '면책조항' },
      { href: '/sitemap.xml', label: '사이트맵' },
    ],
  },

  /** 홈 */
  home: {
    hero: {
      badge: '공인회계사 · AI 자문위원',
      headline1: '회계 전문성에', // 1번째 줄
      headlineAccent: 'AI의 생산성', // 2번째 줄 강조어(그라데이션)
      headlineSuffix: '을 더합니다', // 강조어 뒤 문구
      lede: '회계 도메인 전문성에 AI를 더해, 회계·재무 실무의 AI 전환(AX)을 설계하고 이끕니다. 회계 자문, AI 도입·AX 컨설팅, 강의, 협업을 함께합니다.',
      ctaPrimary: '업무 문의하기',
      ctaSecondary: '포트폴리오 보기',
    },
    approach: {
      kicker: 'Approach',
      title: '회계 전문성과 AI, 그리고 실행력',
      description: '깊이 있는 회계 실무 위에 AI 생산성과 직접 만드는 실행력을 더합니다.',
      points: [
        {
          title: '회계 실무의 깊이',
          desc: '감사·내부회계관리제도·가치평가·원가까지, 상장·비상장 현장에서 In-charge로 쌓은 실무 전문성.',
        },
        {
          title: 'AI로 끌어올린 생산성',
          desc: '실무에 바로 쓰는 AI 워크플로우를 설계해 반복은 자동화하고 판단에 집중합니다.',
        },
        {
          title: '직접 만드는 실행력',
          desc: '필요한 도구·MCP 서버를 직접 개발·배포합니다. 말이 아니라 결과물로 증명합니다.',
        },
      ],
    },
    services: {
      kicker: 'What I do',
      title: '이런 일을 함께합니다',
      description: '회계 도메인 전문성과 AI 활용 역량으로 까다로운 실무 과제를 함께 풀어드립니다.',
    },
    cta: {
      badge: 'WORK WITH ME',
      headingLine1: '회계·재무 실무,',
      headingAccent: 'AI와 함께',
      headingSuffix: ' 풀어드립니다',
      paragraph1: '회계·재무 자문, AI 도입 컨설팅, 강의·집필, 협업까지 —',
      paragraph2: '필요하신 일이 있다면 편하게 문의해 주세요.',
      primary: '업무 문의하기',
      secondary: '실무 자동화 커뮤니티',
    },
  },

  /** 소개 */
  about: {
    hero: {
      en: 'About',
      koPre: '한국공인회계사 ',
      koName: '이재현', // 강조(파랑)
      koPost: '입니다.',
      // 설명: 강조어 2개(hi1, hi2) + 마무리 문구
      hi1: '회계·재무 전문성',
      mid: '과 ',
      hi2: 'AI의 생산성',
      descTail: '을 모두 갖춘 새로운 시대의 전문가를 지향합니다.',
    },
    sections: {
      career: { en: 'Career', ko: '경력' },
      education: { en: 'Education', ko: '학력' },
      expertise: { en: 'Expertise', ko: '전문 분야' },
      certificates: { en: 'Certificates', ko: '자격증' },
    },
  },

  /** 포트폴리오 */
  portfolio: {
    hero: { en: 'Works', ko: '포트폴리오' }, // 설명은 meta.portfolio.description 재사용
    books: {
      kicker: 'Books',
      title: '도서',
      description: '실무에서 쌓은 노하우와 AI 활용 인사이트를 가이드북으로 정리해 공유합니다.',
    },
    lectures: {
      kicker: 'Lectures',
      title: '강의',
      description: '회계·AI 실무 강의와 워크숍을 진행합니다.',
      empty: '강의·워크숍 이력을 준비 중입니다. 곧 업데이트됩니다.',
    },
    projects: {
      kicker: 'Projects',
      title: '프로젝트',
      description: '실무에서 마주친 불편함을 코드로 풀어, 웹과 MCP 서버로 배포해 운영합니다.',
    },
    press: {
      kicker: 'Press',
      title: '뉴스',
      description: '주요 외부 활동과 언론 보도를 공유합니다.',
      empty: '활동·언론 보도를 곧 추가할 예정입니다.',
    },
    readMore: '읽기',
  },

  /** 문의 */
  contact: {
    hero: {
      en: 'Contact',
      ko: '문의하기',
      description: '회계·재무 자문부터 AX 컨설팅, 강의·집필, 협업 제안까지 — 어떤 주제든 편하게 연락주세요.',
    },
    inquiry: {
      kicker: 'Inquiry',
      title: '업무 문의',
      description: '아래 양식으로 보내주시면 이메일로 전달됩니다. 영업일 기준 1~2일 내 회신드립니다.',
    },
    channels: {
      kicker: 'Channels',
      title: '연락 채널',
      description: '이메일·카카오톡이 가장 빠릅니다. 블로그·유튜브·깃허브에서도 만나보실 수 있습니다.',
    },
    testimonials: { title: '이런 평가를 받았습니다' },
    form: {
      name: { label: '이름 *', placeholder: '홍길동' },
      email: { label: '이메일 *', placeholder: 'you@example.com' },
      type: { label: '문의 유형 *', placeholder: '선택해 주세요', etc: '기타' },
      company: { label: '회사·소속 (선택)', placeholder: '회사명 / 직함' },
      message: { label: '문의 내용 *', placeholder: '어떤 도움이 필요하신지 편하게 적어주세요.' },
      submit: '문의 보내기',
      sending: '보내는 중…',
      error: '전송에 실패했습니다. 잠시 후 다시 시도하시거나 이메일로 연락 주세요.',
      successTitle: '문의가 접수되었습니다',
      successBody: '보내주신 내용을 확인하고 영업일 기준 1~2일 내 회신드리겠습니다. 감사합니다.',
      fallbackNote: '아래 채널로 바로 연락 주세요. 영업일 기준 1~2일 내 회신드립니다.',
      fallbackEmail: '이메일 보내기',
      fallbackKakao: '카카오톡 1:1',
    },
  },
} as const
