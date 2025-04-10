const express = require("express");
const asyncHandler = require("express-async-handler");
const {
  getCompanyStatistics,
} = require("../controllers/statistics.controller");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.get("/", verifyToken, asyncHandler(getCompanyStatistics));

module.exports = router;
