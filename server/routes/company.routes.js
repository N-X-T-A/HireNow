"use strict";

const express = require("express");
const asyncHandler = require("express-async-handler");

const router = express.Router();

const CompanyController = require("../controllers/company.controller");

const { verifyToken } = require("../middleware/auth");

router.put(
  "/:id",
  [verifyToken],
  asyncHandler(CompanyController.updateCompany)
);

module.exports = router;
