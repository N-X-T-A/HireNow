"use strict";

const { CREATED, OK } = require("../core/success.response");
const { AuthFailureError } = require("../core/error.response");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController {
  signUp = async (req, res) => {
    try {
      const { username, email, password, photoURL } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        passwordHash: hashedPassword,
        photoURL,
      });

      await newUser.save();
      newUser.passwordHash = undefined;

      return new CREATED({
        message: "Đăng ký tài khoản thành công!",
        metadata: newUser,
      }).send(res);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: error.message || "Internal Server Error",
      });
    }
  };

  signIn = async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthFailureError("Invalid email or password.");
      }

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) {
        throw new AuthFailureError("Invalid email or password.");
      }

      const token = jwt.sign(
        { id: user._id, email: email, role: user.role },
        process.env.SECRET_CODE,
        { expiresIn: "1d" }
      );

      user.passwordHash = undefined;

      return new OK({
        message: "Đăng nhập tài khoản thành công!",
        metadata: { token, user },
      }).send(res);
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
      });
    }
  };
}

module.exports = new AuthController();
