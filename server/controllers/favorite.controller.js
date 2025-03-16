const favoriteService = require("../services/favorite.service");

class FavoriteController {
  async saveFavoriteJob(req, res) {
    try {
      const result = await favoriteService.saveFavoriteJob(
        req.user._id,
        req.params.jobId
      );
      return res.status(201).json({
        message: "Job added to favorites.",
        metadata: result,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
      });
    }
  }

  async getFavoriteJobs(req, res) {
    try {
      const jobs = await favoriteService.getFavoriteJobs(req.user._id);
      return res.status(200).json({
        message: "Fetched favorite jobs successfully.",
        metadata: jobs,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
      });
    }
  }

  async removeFavoriteJob(req, res) {
    try {
      await favoriteService.removeFavoriteJob(req.user._id, req.params.jobId);
      return res.status(200).json({ message: "Job removed from favorites." });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
      });
    }
  }
}

module.exports = new FavoriteController();
