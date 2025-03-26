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

router.get("/signout", asyncHandler(AuthController.signOut));

router.post(
  "/google",
  [validation.verifyGoogleToken],
  asyncHandler(AuthController.google)
);

router.post(
  "/recruiter/register",
  asyncHandler(AuthController.registerRecruiter)
);

router.post("/recruiter/signin", asyncHandler(AuthController.signInRecruiter));

module.exports = router;
