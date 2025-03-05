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

  async getApplicantsByJob(recruiterId, jobId) {
    const job = await Job.findById(jobId);
    if (!job || job.company_id.toString() !== recruiterId.toString()) {
      throw new ForbiddenError(
        "You do not have access to this job's applicants."
      );
    }

    return await Application.find({ job_id: jobId })
      .populate("user_id", "username email phone location photoURL")
      .select("resume cover_letter applied_date")
      .lean();
  }
}

module.exports = new ApplicationService();
