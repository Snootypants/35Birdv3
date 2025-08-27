/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  transpilePackages: ['@35bird/ui', '@35bird/games-asteroids'],
}

module.exports = nextConfig