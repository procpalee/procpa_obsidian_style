import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 소개+포트폴리오 통합 → /about
      { source: '/portfolio', destination: '/about', permanent: true },
      { source: '/projects', destination: '/about', permanent: true },
      // 블로그 제거 — 기존/옛 경로는 홈으로
      { source: '/blog', destination: '/', permanent: true },
      { source: '/blog/:path*', destination: '/', permanent: true },
      { source: '/series', destination: '/', permanent: true },
      { source: '/tags', destination: '/', permanent: true },
      { source: '/browse', destination: '/', permanent: true },
      { source: '/downloads', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
