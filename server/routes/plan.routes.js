const express = require("express");
const PlanController = require("../controllers/plan.controller");
const asyncHandler = require("express-async-handler");

const router = express.Router();

router.get("/", asyncHandler(PlanController.getAll));
router.get("/:slugId", asyncHandler(PlanController.getPlanBySlug));

module.exports = router;
