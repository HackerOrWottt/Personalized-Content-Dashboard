/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['image.tmdb.org', 'newsapi.org', 'via.placeholder.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    NEWS_API_KEY: process.env.NEWS_API_KEY,
    TMDB_API_KEY: process.env.TMDB_API_KEY,
  },
}

module.exports = nextConfig
