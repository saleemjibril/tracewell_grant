/** @type {import('next').NextConfig} */
const apiOrigin =
  process.env.API_ORIGIN || "https://tracewell-grant-api.onrender.com";

const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
      return [
        {
          source: "/api/grants",
          destination: `${apiOrigin}/api/grants`,
        },
        {
          source: "/api/grants/:path*",
          destination: `${apiOrigin}/api/grants/:path*`,
        },
        {
          source: "/api/newsletter/:path*",
          destination: `${apiOrigin}/api/newsletter/:path*`,
        },
      ];
    },
    images: {
      domains: ['res.cloudinary.com', 'i.scdn.co', 'cdn-images-1.medium.com', 'miro.medium.com'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'picsum.photos',
          pathname: '/**',
        },
      ],
      loader: 'default',
      formats: ['image/webp', 'image/avif'],
    },
  }
  
  export default nextConfig;
  
  