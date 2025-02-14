"use strict";

const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const token = jwt.sign({ user }, process.env.SECRET_CODE, {
    expiresIn: "1d",
  });

  return token;
};

module.exports = {
  generateToken,
};
