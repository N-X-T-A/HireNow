"use strict";

const bcrypt = require("bcryptjs");
const { User, Company, Statistics } = require("../models");
const { AuthFailureError, BadRequestError } = require("../core/error.response");
const { generateAccessToken } = require("../utils/token");
const { getQuarter } = require("../utils/getQuarter");

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

    const newStatistics = new Statistics({
      companyId: newCompany._id,
      monthly: {
        categories: [new Date().toLocaleString("default", { month: "short" })],
        series: [
          { name: "Jobs Posted", data: [0] },
          { name: "Applications", data: [0] },
        ],
      },
      quarterly: {
        categories: [getQuarter(new Date())],
        series: [
          { name: "Jobs Posted", data: [0] },
          { name: "Applications", data: [0] },
        ],
      },
      annually: {
        categories: [new Date().getFullYear().toString()],
        series: [
          { name: "Jobs Posted", data: [0] },
          { name: "Applications", data: [0] },
        ],
      },
    });

    newStatistics.save();

    recruiter.passwordHash = undefined;

    const accessToken = generateAccessToken(recruiter);

    return {
      user: recruiter,
      accessToken,
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

    user.passwordHash = undefined;

    const accessToken = generateAccessToken(user);

    return {
      user,
      accessToken,
    };
  }
}

module.exports = new AuthService();
