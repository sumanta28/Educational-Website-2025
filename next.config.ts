// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   reactStrictMode: true,
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  eslint: {
    // ✅ Disables ESLint during "next build"
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
