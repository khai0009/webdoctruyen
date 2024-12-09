import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'th.bing.com',
        port: '',
        pathname: '/th?id=%22.*%22&pid=Api&mkt=en-US&',
      },
    ],
  },
  
};

export default nextConfig;
