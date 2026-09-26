/** @type {import('next').NextConfig} */
const nextConfig = {basePath: '/buy-a-mobile-coffee-bike',
     assetPrefix: '/buy-a-mobile-coffee-bike', images: { formats: ['image/avif', 'image/webp'], remotePatterns: [{ protocol: 'https', hostname: 'coffeebike.ca' }, { protocol: 'https', hostname: 'i.ytimg.com' }] },};

module.exports = nextConfig;
