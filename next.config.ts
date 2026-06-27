import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 프로젝트 → 포트폴리오(출판·프로젝트·글 통합)로 이전
      { source: '/projects', destination: '/portfolio', permanent: true },
      // 제거된 블로그·자료실 섹션의 기존 링크는 홈으로 보냄.
      { source: '/series', destination: '/', permanent: true },
      { source: '/blog', destination: '/', permanent: true },
      { source: '/browse', destination: '/', permanent: true },
      { source: '/downloads', destination: '/', permanent: true },
      { source: '/tags', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
