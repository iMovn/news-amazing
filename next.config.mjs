/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.shenlong.cloud',
            },
            {
                protocol: 'https',
                hostname: 'img.youtube.com',
            },
        ],
    },
};

export default nextConfig;
