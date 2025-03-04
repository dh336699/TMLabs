import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
    async rewrites() {
    return [
      {
        source: '/api/:path*', // 匹配所有 /api 开头的请求
        destination: 'https://api.ljaym.com/api/:path*', // 转发到目标 API
      },
    ];
  },
}

export default nextConfig
