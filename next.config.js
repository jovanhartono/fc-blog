const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
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
