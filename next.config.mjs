import config from './src/config/config.json' assert { type: 'json' }

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  reactStrictMode: true,
  basePath: config.base_path !== '/' ? config.base_path : '',
  trailingSlash: config.site.trailing_slash,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '', // todo: add hostname
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
