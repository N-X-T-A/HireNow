const { Favorite, Job } = require("../models");

class FavoriteService {
  async saveFavoriteJob(userId, jobId) {
    const jobExists = await Job.findById(jobId);
    if (!jobExists) {
      throw { statusCode: 404, message: "Job not found." };
    }

    const exists = await Favorite.findOne({ userId, jobId });
    if (exists) {
      throw { statusCode: 400, message: "Job is already in favorites." };
    }

    return await Favorite.create({ userId, jobId });
  }

  async getFavoriteJobs(userId) {
    return await Favorite.find({ userId }).populate(
      "jobId",
      "title companyId skills location salary shortDescription"
    );
  }

  async removeFavoriteJob(userId, jobId) {
    return await Favorite.findOneAndDelete({ userId, jobId });
  }
}

module.exports = new FavoriteService();
