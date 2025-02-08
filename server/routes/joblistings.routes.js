"use strict";

const express = require("express");
const asyncHandler = require("express-async-handler");
const joblistingsController = require("../controllers/joblistings.controller");

const router = express.Router();

router.get("/:id", asyncHandler(joblistingsController.getByID));

module.exports = router;
