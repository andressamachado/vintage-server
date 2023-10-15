// Import dotenv to process environment variables from `.env` file.
require("dotenv").config({ path: "../.env" });

module.exports = {
  client: process.env.DB_CLIENT,
  connection: {
    client: process.env.DB_CLIENT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: "utf8",
  },
  migrations: {
    directory: "./migrations",
  },
  seeds: {
    directory: "./seeds",
  },
};
