/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'image.tmdb.org',
      'tmdb.org',
      'themoviedb.org',
      'www.themoviedb.org',
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
