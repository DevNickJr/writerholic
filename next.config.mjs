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
};

export default nextConfig;
