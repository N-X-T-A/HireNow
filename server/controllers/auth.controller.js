"use strict";

const { CREATED, OK } = require("../core/success.response");
const { AuthFailureError } = require("../core/error.response");
const { User, UserProfile } = require("../models");
const bcrypt = require("bcryptjs");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");
const jwt = require("jsonwebtoken");
const authService = require("../services/auth.service");

class AuthController {
  signUp = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        email,
        passwordHash: hashedPassword,
      });

      await newUser.save();

      const newProfile = new UserProfile({
        userId: newUser._id,
        username,
      });

      await newProfile.save();

      newUser.profileId = newProfile._id;
      await newUser.save();

      newUser.passwordHash = undefined;

      return res.status(201).json({
        message: "Account registered successfully!",
      });
    } catch (error) {
      console.error("Sign-up error:", error);
      return res.status(500).json({
        message: error.message || "Internal Server Error",
      });
    }
  };

  signIn = async (req, res) => {
    try {
      const { email, password } = req.body;
      const { user, accessToken } = await authService.login({
        email,
        password,
      });

      const userProfile = await UserProfile.findOne({ userId: user._id })
        .select("username photoURL")
        .lean();

      const userData = {
        ...user.toObject(),
        username: userProfile?.username,
        photoURL: userProfile?.photoURL,
        accessToken,
      };

      res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });

      return new OK({
        message: "Login successful!",
        metadata: userData,
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
        user = new User({ email });
        await user.save();

        const userProfile = new UserProfile({
          userId: user._id,
          username: name,
          photoURL: picture,
        });

        await userProfile.save();

        user.profileId = userProfile._id;
        await user.save();
      }

      const accessToken = generateAccessToken(user);

      res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });

      res.json({ user, accessToken });
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

  registerRecruiter = async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await authService.registerRecruiter({ email, password });

      return new CREATED({
        message: "Recruiter registered successfully!",
        metadata: result,
      }).send(res);
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
      });
    }
  };
}

module.exports = new AuthController();
