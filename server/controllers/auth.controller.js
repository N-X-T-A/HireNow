"use strict";

const { CREATED, OK } = require("../core/success.response");
const { AuthFailureError, ForbiddenError } = require("../core/error.response");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");
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
        message: "Account registered successfully!",
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

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });

      return new OK({
        message: "Login successful!",
        metadata: { accessToken, refreshToken, user },
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
        user = new User({
          username: name,
          email,
          photoURL: picture,
        });

        await user.save();
      }

      user.passwordHash = undefined;
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });

      res.json({ user, accessToken, refreshToken });
    } catch (error) {
      console.error("Google authentication error:", error);
      return res.status(401).json({ message: "Invalid Google authentication" });
    }
  };

  refreshToken = async (req, res) => {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken)
        return res.status(401).json({ message: "Unauthorized." });

      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      const user = await User.findById(decoded.userId);
      if (!user) return res.status(401).json({ message: "Unauthorized." });

      const newAccessToken = generateAccessToken(user);
      res.cookie("access_token", newAccessToken, { httpOnly: true });

      res.json({ accessToken: newAccessToken });
    } catch (error) {
      return res.status(401).json({ message: "Invalid refresh token." });
    }
  };

  signOut = (req, res) => {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.json({ message: "Logged out successfully!" });
  };
}

module.exports = new AuthController();
