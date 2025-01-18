require("dotenv").config();

module.exports = {
  secret: process.env.SECRET_CODE,
  jwtExpiration: 3600,
  jwtRefreshExpiration: 86400,
};
