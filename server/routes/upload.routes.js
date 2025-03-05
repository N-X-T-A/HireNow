"use strict";

const express = require("express");
const router = express.Router();
const multer = require("multer");
const UploadController = require("../controllers/upload.controller");
const { verifyToken } = require("../middleware/auth");

const storage = multer.diskStorage({});
const upload = multer({ storage });

router.post(
  "/image",
  verifyToken,
  upload.single("image"),
  UploadController.uploadImage
);
router.post(
  "/resume",
  verifyToken,
  upload.single("resume"),
  UploadController.uploadResume
);

module.exports = router;
