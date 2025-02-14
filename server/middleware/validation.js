"use strict";

const User = require("../models/user");
const { BadRequestError } = require("../core/error.response");

const isDuplicateEmail = async (req, res, next) => {
  try {
    const email = req.body.email;

    if (!email) {
      return res.status(400).json({ message: "Email là bắt buộc." });
    }

    const user = await User.findOne({ email });

    if (user) {
      return new BadRequestError({ message: "Email này đã được đăng ký" }).send(
        res
      );
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ name: error.name, message: error.message });
  }
};

const verifyGoogleToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: "Token không hợp lệ" });
    }

    const googleRes = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`
    );

    if (!googleRes.ok) {
      return res.status(401).json({ message: "Token không hợp lệ từ Google" });
    }

    const googleUser = await googleRes.json();

    req.googleUser = googleUser;

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const validation = {
  isDuplicateEmail,
  verifyGoogleToken,
};

module.exports = validation;
