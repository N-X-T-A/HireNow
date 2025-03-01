"use strict";

const express = require("express");
const asyncHandler = require("express-async-handler");

const router = express.Router();

const JobController = require("../controllers/job.controller");

router.get("/recommend/:id", asyncHandler(JobController.getRecommendedJobs));

module.exports = router;
