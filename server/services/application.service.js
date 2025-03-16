const { ForbiddenError } = require("../core/error.response");
const { Application, Job } = require("../models/");

class ApplicationService {
  async applyForJob(userId, jobId, resume, coverLetter) {
    const application = new Application({
      user_id: userId,
      job_id: jobId,
      resume,
      cover_letter: coverLetter,
      applied_date: Date.now(),
    });

    return await application.save();
  }

  async getAppliedJobs(userId) {
    return await Application.find({ user_id: userId })
      .populate(
        "job_id",
        "title company_id location salary_range short_description"
      )
      .lean();
  }

  async getApplicants(recruiterId) {
    try {
      const jobs = await Job.find({ company_id: recruiterId }).select("_id");
      if (!jobs.length) {
        return [];
      }

      const jobIds = jobs.map((job) => job._id);

      const applications = await Application.find({ job_id: { $in: jobIds } })
        .populate({
          path: "user_id",
          select: "username email profileId",
          populate: {
            path: "profileId",
            model: "UserProfile",
            select: "photoURL",
          },
        })
        .populate("job_id", "title")
        .select("cover_letter resume applied_date status")
        .lean();

      return applications.map((app) => {
        const user = app.user_id;
        const job = app.job_id;

        return {
          _id: app._id,
          user: {
            _id: user._id,
            email: user.email,
            photo_url: user.profileId?.photoURL || null,
          },
          job: {
            _id: job._id,
            title: job.title,
          },
          cover_letter: app.cover_letter,
          resume: app.resume,
          status: app.status,
          applied_date: app.applied_date,
        };
      });
    } catch (error) {
      console.error("Error in getApplicants:", error);
      throw new Error("Failed to fetch applicants. Please try again later.");
    }
  }
}

module.exports = new ApplicationService();
