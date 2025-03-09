"use strict";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Company } = require("../models");
const { AuthFailureError, BadRequestError } = require("../core/error.response");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");

class AuthService {
  async registerRecruiter({ email, password }) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("Email đã được sử dụng.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCompany = new Company({});
    await newCompany.save();

    const recruiter = new User({
      email,
      passwordHash: hashedPassword,
      role: "recruiter",
      companyId: newCompany._id,
    });

    await recruiter.save();

    const accessToken = generateAccessToken(recruiter);
    const refreshToken = generateRefreshToken(recruiter);

    return {
      user: {
        email: recruiter.email,
        role: recruiter.role,
        companyId: newCompany._id,
      },
      accessToken,
      refreshToken,
    };
  }

  async login({ email, password }) {
    const user = await User.findOne({ email }).populate("companyId");
    if (!user) {
      throw new AuthFailureError("Invalid email or password.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new AuthFailureError("Invalid email or password.");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return {
      user: {
        email: user.email,
        role: user.role,
        company: user.companyId || null,
      },
      accessToken,
      refreshToken,
    };
  }
}

module.exports = new AuthService();
