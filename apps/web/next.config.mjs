/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // TODO: turbopackがこの機能に対応したら有効化する
    // removeConsole: true,
  },
  experimental: {
    // TODO: turbopackがこの機能に対応したら有効化する
    // typedRoutes: true,
  },
};

export default nextConfig;
