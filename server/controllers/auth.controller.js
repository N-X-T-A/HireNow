"use strict";

const { CREATED, OK } = require("../core/success.response");
const { AuthFailureError } = require("../core/error.response");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");
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

      user.passwordHash = undefined;

      const token = generateToken(user);

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

  google = async (req, res) => {
    try {
      const { googleUser } = req;
      const { email, name, picture } = googleUser;
      let user = await User.findOne({ email });
      if (!user) {
        user = new User({ username: name, email, photoURL: picture });
        await user.save();
      }

      user.passwordHash = undefined;
      const userToken = generateToken(user);

      res.json({ user, token: userToken });
    } catch (error) {
      console.error("Lỗi xác thực Google:", error);
      res.status(401).json({ message: "Xác thực không hợp lệ" });
    }
  };
}

module.exports = new AuthController();
