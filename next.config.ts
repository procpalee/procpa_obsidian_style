import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 소개+포트폴리오 통합 → /about
      { source: '/portfolio', destination: '/about', permanent: true },
      { source: '/projects', destination: '/about', permanent: true },
      // 옛 블로그 분류 경로는 새 블로그로
      { source: '/series', destination: '/blog', permanent: true },
      { source: '/tags', destination: '/blog', permanent: true },
      // 제거된 자료실 섹션의 기존 링크는 홈으로
      { source: '/browse', destination: '/', permanent: true },
      { source: '/downloads', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
