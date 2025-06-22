import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        domains: ['image.tmdb.org'],
    },
    transpilePackages: ['tailwindcss', 'postcss'],
};

export default nextConfig;
