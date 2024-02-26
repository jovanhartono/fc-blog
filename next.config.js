const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  formats: ["image/avif", "image/webp"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fresclean.id",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

module.exports = withContentlayer({ ...nextConfig });
