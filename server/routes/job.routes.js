"use strict";

const express = require("express");
const asyncHandler = require("express-async-handler");

const router = express.Router();

const JobController = require("../controllers/job.controller");

const {
  verifyToken,
  isRecruiter,
  isAuthenticated,
} = require("../middleware/auth");

router.get("/listings", asyncHandler(JobController.getAllJobsSkill));

router.get("/skills/:id", asyncHandler(JobController.getSkillsByJobId));

router.get("/", asyncHandler(JobController.getAllJobs));

router.get(
  "/recommend",
  verifyToken,
  asyncHandler(JobController.getRecommendedJobs)
);

router.get("/:id", asyncHandler(JobController.getJobDetails));

router.get(
  "/posted-jobs/:recruiterId",
  isAuthenticated,
  isRecruiter,
  asyncHandler(JobController.getPostedJobs)
);

router.post(
  "/",
  verifyToken,
  isRecruiter,
  asyncHandler(JobController.createJob)
);

router.put(
  "/:id",
  [isAuthenticated, isRecruiter],
  asyncHandler(JobController.updateJob)
);

router.delete(
  "/:id",
  [isAuthenticated, isRecruiter],
  asyncHandler(JobController.deleteJob)
);

module.exports = router;
