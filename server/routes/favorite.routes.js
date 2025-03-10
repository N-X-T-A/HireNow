const express = require("express");
const asyncHandler = require("express-async-handler");

const router = express.Router();
const favoriteController = require("../controllers/favorite.controller");

const { verifyToken } = require("../middleware/auth");

router.post("/", verifyToken, asyncHandler(favoriteController.saveFavoriteJob));
router.get("/", verifyToken, asyncHandler(favoriteController.getFavoriteJobs));
router.delete(
  "/:jobId",
  verifyToken,
  asyncHandler(favoriteController.removeFavoriteJob)
);

module.exports = router;
