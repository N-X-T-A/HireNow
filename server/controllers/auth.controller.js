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
      const { token } = req.body;
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const { name, email, picture } = ticket.getPayload();
      const user = await User.findOne({ email });
      if (!user) {
        const newUser = new User({
          username: name,
          email,
          photoURL: picture,
        });

        await newUser.save();
      }

      const appToken = generateToken(user);

      res.cookie("token", appToken, { httpOnly: true, secure: false });

      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ success: false, message: "Invalid Google Token" });
    }
  };
}

const generateToken = (user) => {
  const token = jwt.sign({ user }, process.env.SECRET_CODE, {
    expiresIn: "1d",
  });

  return token;
};

module.exports = new AuthController();
