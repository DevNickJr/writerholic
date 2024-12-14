/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
      missingSuspenseWithCSRBailout: false,
    },
    images: {
      unoptimized: true,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'firebasestorage.googleapis.com',
          port: '',
          pathname: '/v0/b/brilliant-brains-7e04f.appspot.com/**',
        },
      ],
    },
    async headers() {
      return [
        {
          source: "/api/:path*",
          headers: [
            {
              key: "Access-Control-Allow-Origin",
              value: "*", // Set your origin
            },
            {
              key: "Access-Control-Allow-Methods",
              value: "GET, POST, PUT, DELETE, OPTIONS",
            },
            {
              key: "Access-Control-Allow-Headers",
              value: "Content-Type, Authorization",
            },
            {
              key: "Cache-Control",
              value: "no-store",
            },
            {
              key: "max-age",
              value: 0,
            },
          ],
        },
      ];
    },
};

export default nextConfig;
