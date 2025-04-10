const { Job } = require("../models");
const applicationService = require("../services/application.service");
const { updateJobStatistics } = require("../utils/statisticsUpdater");

class ApplicationController {
  async applyForJob(req, res) {
    try {
      if (req.user.role === "recruiter") {
        return res.status(403).json({
          message: "Recruiters cannot apply for jobs.",
        });
      }

      const userId = req.user._id;
      const { job_id, resume, cover_letter } = req.body;

      const job = await Job.findById(job_id);
      if (!job) {
        return res.status(404).json({
          message: "Job not found.",
        });
      }

      const companyId = job.company_id;

      const result = await applicationService.applyForJob(
        userId,
        job_id,
        resume,
        cover_letter
      );

      await updateJobStatistics(companyId, "applyForJob");

      return res.status(201).json({
        message: "Application submitted successfully!",
        metadata: result,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
      });
    }
  }

  async cancelJobApplication(req, res) {
    try {
      if (req.user.role === "recruiter") {
        return res.status(403).json({
          message: "Recruiters cannot cancel applications.",
        });
      }

      const userId = req.user._id;
      const jobId = req.params.id;

      const result = await applicationService.cancelJobApplication(
        userId,
        jobId
      );

      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
      });
    }
  }

  async getAppliedJobs(req, res) {
    try {
      const userId = req.user._id;
      const jobs = await applicationService.getAppliedJobs(userId);
      console.log(jobs);
      return res.status(200).json({
        message: "Fetched applied jobs successfully.",
        metadata: jobs,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
      });
    }
  }

  async getApplicants(req, res) {
    try {
      const recruiterId = req.user.companyId;
      const applicants = await applicationService.getApplicants(recruiterId);

      return res.status(200).json({
        message: "Fetched applicants successfully.",
        metadata: applicants,
      });
    } catch (error) {
      console.error("Error in getApplicants:", error);

      return res.status(500).json({
        message: error.message || "Internal Server Error",
      });
    }
  }

  async updateApplicationStatus(req, res) {
    try {
      if (req.user.role !== "recruiter") {
        return res.status(403).json({
          message: "Only recruiters can update application statuses.",
        });
      }

      const { applicationId, status } = req.body;

      const updatedApplication =
        await applicationService.updateApplicationStatus(
          applicationId,
          status,
          req.user.id
        );

      res.status(200).json({
        message: "Application status updated successfully!",
        metadata: updatedApplication,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
      });
    }
  }
}

module.exports = new ApplicationController();
