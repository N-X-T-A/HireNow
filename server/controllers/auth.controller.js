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
      console.log("Received token:", token);

      if (!token) {
        console.error("Không nhận được token từ frontend");
        return res.status(400).json({ message: "Token không hợp lệ" });
      }

      const googleRes = await fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
      );
      const googleUser = await googleRes.json();

      console.log("Google User:", googleUser);

      if (!googleUser.email) {
        console.error("Lỗi xác thực Google:", googleUser);
        throw new Error("Lỗi xác thực Google");
      }

      const { email, name, picture } = googleUser;

      const user = await User.findOne({ email });
      if (!user) {
        const newUser = new User({
          username: name,
          email,
          photoURL: picture,
        });

        await newUser.save();
        newUser.passwordHash = undefined;
        const userToken = generateToken(newUser);
        res.json({ user: newUser, token: userToken });
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

const generateToken = (user) => {
  const token = jwt.sign({ user }, process.env.SECRET_CODE, {
    expiresIn: "1d",
  });

  return token;
};

module.exports = new AuthController();
