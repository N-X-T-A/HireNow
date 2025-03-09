const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/application.controller");
const { verifyToken, isRecruiter } = require("../middleware/auth");

router.post("/", verifyToken, applicationController.applyForJob);
router.get("/", verifyToken, applicationController.getAppliedJobs);
router.get(
  "/job/:jobId",
  verifyToken,
  isRecruiter,
  applicationController.getApplicantsByJob
);
router.get(
  "/applicants",
  verifyToken,
  isRecruiter,
  applicationController.getApplicants
);

module.exports = router;
