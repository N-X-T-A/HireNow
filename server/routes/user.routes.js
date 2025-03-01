"use strict";

const express = require("express");
const asyncHandler = require("express-async-handler");

const router = express.Router();

const UserController = require("../controllers/user.controller");

router.post("/update-profile/:id", asyncHandler(UserController.updateProfile));

module.exports = router;
