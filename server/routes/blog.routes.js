"use strict";

const express = require("express");
const asyncHandler = require("express-async-handler");

const router = express.Router();
const BlogController = require("../controllers/blog.controller");

router.get("/", asyncHandler(BlogController.getAllBlogs));
router.get("/:id", asyncHandler(BlogController.getBlogById));

module.exports = router;
