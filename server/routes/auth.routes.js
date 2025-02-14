"use strict";

const express = require("express");
const asyncHandler = require("express-async-handler");
const { validation } = require("../middleware");

const router = express.Router();
const AuthController = require("../controllers/auth.controller");

router.post(
  "/signup",
  [validation.isDuplicateEmail],
  asyncHandler(AuthController.signUp)
);

router.post("/signin", asyncHandler(AuthController.signIn));
router.post(
  "/google",
  [validation.verifyGoogleToken],
  asyncHandler(AuthController.google)
);

module.exports = router;
