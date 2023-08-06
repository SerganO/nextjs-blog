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
    DATABASE: process.env.DATABASE,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT:process.env.REDIS_PORT,
    API_STRING: process.env.API_STRING,

  },
};
