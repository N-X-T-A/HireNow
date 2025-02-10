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

const isDuplicatePhoneNumber = async (req, res, next) => {
  try {
    const phoneNumber = req.body.phonenumber;

    if (!phoneNumber) {
      return res.status(400).json({ message: "Số điện thoại là bắt buộc." });
    }

    const user = await User.findOne({ phoneNumber });

    if (user) {
      return new BadRequestError({
        message: "Số điện thoại này đã được đăng ký",
      }).send(res);
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ name: error.name, message: error.message });
  }
};

const verifySignUp = {
  isDuplicateEmail,
  isDuplicatePhoneNumber,
};

module.exports = verifySignUp;
