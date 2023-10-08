/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "html.vristo.sbthemes.com",
      "cdn3.iconfinder.com",
      "drive.google.com",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
