/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'image.tmdb.org',
      'tmdb.org',
      'themoviedb.org',
      'www.themoviedb.org',
      'i.ytimg.com',
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
