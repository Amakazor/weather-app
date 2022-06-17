/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: { ssr: true, displayName: true },
  },
  pageExtensions: [
    "page.tsx",
    "page.ts",
    "page.js",
    "page.jsx",
    "endpoint.tsx",
    "endpoint.ts",
    "endpoint.js",
    "endpoint.jsx",
  ],
};

module.exports = nextConfig;
