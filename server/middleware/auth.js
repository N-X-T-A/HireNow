"use strict";

const jwt = require("jsonwebtoken");
const { AuthFailureError, ForbiddenError } = require("../core/error.response");
const { User } = require("../models");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) throw new AuthFailureError("Access token is required!");

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) throw new AuthFailureError("Invalid or expired token!");

      const user = await User.findById(decoded.id).select("-passwordHash");
      if (!user) throw new AuthFailureError("User not found!");

      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

const isRecruiter = (req, res, next) => {
  if (req.user?.role !== "recruiter") {
    return res.status(403).json({
      message: "Permission denied! Only recruiters can perform this action.",
    });
  }
  next();
};

const isAuthenticated = (req, res, next) => {
  try {
    const token =
      req.cookies.access_token || req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Unauthorized." });

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Error:", error);
    return res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = { verifyToken, isRecruiter, isAuthenticated };
