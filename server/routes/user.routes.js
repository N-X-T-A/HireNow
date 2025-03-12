"use strict";

const express = require("express");
const asyncHandler = require("express-async-handler");

const router = express.Router();
const { verifyToken } = require("../middleware/auth");

const UserController = require("../controllers/user.controller");

router.put(
  "/update-profile",
  verifyToken,
  asyncHandler(UserController.updateProfile)
);

module.exports = router;
