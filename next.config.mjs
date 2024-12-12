const nextConfig = {
  eslint: {
    dirs: ["src"],
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ticketkite.com",
      },
    ],
  },
  env: {
    WOOCOMMERCE_BASE_URL: process.env.WOOCOMMERCE_BASE_URL,
    WOOCOMMERCE_CONSUMER_KEY: process.env.WOOCOMMERCE_CONSUMER_KEY,
    WOOCOMMERCE_CONSUMER_SECRET: process.env.WOOCOMMERCE_CONSUMER_SECRET,
  },
};

export default nextConfig;