import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 시리즈·블로그를 /blog 한 페이지로 통합 (시리즈 목록 → 블로그)
      { source: '/series', destination: '/blog', permanent: true },
    ];
  },
};

export default nextConfig;
