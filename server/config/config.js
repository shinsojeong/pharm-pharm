const dotenv = require("dotenv");
dotenv.config();
const env = process.env;

const dbConfig = {
  development: {
    username: env.MYSQL_USERNAME,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
    host: env.MYSQL_HOST,
    port: env.MARIA_PORT,
    dialect: "mysql",
  },

  production: {
    username: env.MARIA_USERNAME,
    password: env.MARIA_PASSWORD,
    database: env.MARIA_DATABASE,
    host: env.MARIA_HOST,
    port: env.MARIA_PORT,
    dialect: "mariadb",
  },

  test: {
    username: env.MYSQL_USERNAME,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
    host: env.MYSQL_HOST,
    port: env.MYSQL_PORT,
    dialect: "mysql",
  },
};

module.exports = dbConfig;
