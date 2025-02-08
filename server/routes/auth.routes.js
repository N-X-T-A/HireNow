"use strict";

const express = require("express");
const asyncHandler = require("express-async-handler");
const { verifySignUp } = require("../middleware");

const router = express.Router();
const AuthController = require("../controllers/auth.controller");

router.post(
  "/signup",
  [verifySignUp.isDuplicateEmail],
  asyncHandler(AuthController.signUp)
);

router.post("/signin", asyncHandler(AuthController.signIn));

module.exports = router;
