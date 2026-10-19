import type { NextConfig } from 'next';

const basePath = (process.env.BASE_PATH || '').replace(/\/$/, '');
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { unoptimized: true },
  experimental: { cpus: 2 },
  webpack: (config) => {
    config.module.rules.push({ test: /\.bib$/, type: 'asset/source' });
    return config;
  },
};
export default nextConfig;
