import getConfig from "next/config";

const {
  publicRuntimeConfig: { DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST },
} = getConfig();

export const config = {
  db: {
    database: DATABASE,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    host: DB_HOST,
  },
};
