// next.config.js

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL,
  },
};
