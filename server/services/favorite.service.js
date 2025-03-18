const { Favorite, Job } = require("../models");
const { formatLocations } = require("../utils/format");

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
    const favorites = await Favorite.find({ userId }).populate({
      path: "jobId",
      select: "title company_id skills salary_range",
      populate: {
        path: "company_id",
        select: "name locations",
      },
    });

    return favorites
      .filter((fav) => fav.jobId)
      .map((fav) => {
        const { _id, title, company_id, skills, salary_range } = fav.jobId;
        return {
          _id: fav._id,
          job_id: _id,
          title,
          skills,
          salary_range,
          company: company_id
            ? {
                _id: company_id._id,
                name: company_id.name,
                location: formatLocations(company_id.locations),
              }
            : null,
        };
      });
  }

  async removeFavoriteJob(userId, jobId) {
    return await Favorite.findOneAndDelete({ userId, jobId });
  }
}

module.exports = new FavoriteService();
