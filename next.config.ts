import type { NextConfig } from 'next'

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
	/* config options here */
	async rewrites() {
		return [
			// {
			// 	source: '/api/:path*', // 匹配所有 /api 开头的请求
			// 	destination: 'https://api.ljaym.com/api/:path*', // 转发到目标 API
			// },
			{
				source: '/api/:path*', // 匹配所有 /api 开头的请求
				destination: 'https://api.tmlabs.ai/api/:path*', // 转发到目标 API
			},
		]
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'via.placeholder.com',
			},
			{
				protocol: 'https',
				hostname: 'picsum.photos',
			},
		],
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	devServer: {
		port: 5689,
	},
}

export default nextConfig
