const { Favorite } = require("../models");

class FavoriteService {
  async saveFavoriteJob(userId, jobId) {
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
