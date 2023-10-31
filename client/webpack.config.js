const developmentConfig = require("./webpack.development.config");
const productionConfig = require("./webpack.production.config");

module.exports = (env, { mode }) => {
  return mode === "production" ? productionConfig : developmentConfig;
};
