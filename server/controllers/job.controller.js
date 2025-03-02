"use strict";

const { ForbiddenError } = require("../core/error.response");
const { Job } = require("../models");
const jobService = require("../services/job.service");

class JobController {
  getAllJobs = async (req, res) => {
    try {
      const jobs = await jobService.getAllJobs();
      res.json({ jobs });
    } catch (err) {
      console.error("Error fetching all jobs:", err);
      res.status(500).json({ message: "Server error while fetching jobs!" });
    }
  };

  getRecommendedJobs = async (req, res) => {
    try {
      const userId = req.params.id;
      const result = await jobService.getRecommendedJobs(userId);

      if (result.success) {
        res.json({ jobs: result.jobs });
      } else {
        res.status(404).json({ message: result.message });
      }
    } catch (err) {
      console.error("Error fetching recommended jobs:", err);
      res
        .status(500)
        .json({ message: "Server error while fetching recommended jobs!" });
    }
  };

  getJobDetails = async (req, res) => {
    try {
      const jobId = req.params.id;
      const result = await jobService.getJobDetails(jobId);

      if (result.success) {
        res.json({ job: result.job });
      } else {
        res.status(404).json({ message: result.message });
      }
    } catch (err) {
      console.error("Error fetching job details:", err);
      res
        .status(500)
        .json({ message: "Server error while fetching job details!" });
    }
  };

  createJob = async (req, res) => {
    try {
      const { title, skills, location, salary_range, short_description } =
        req.body;
      const newJob = new Job({
        title,
        company_id: req.user._id,
        skills,
        location,
        salary_range,
        short_description,
        posted_date: Date.now(),
      });

      await newJob.save();

      return res.status(201).send({
        message: "Job posted successfully!",
        metadata: newJob,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Internal Server Error",
      });
    }
  };

  async updateJob(req, res) {
    const { id } = req.params;
    const recruiterId = req.user._id;

    const updatedJob = await jobService.updateJob(id, recruiterId, req.body);
    if (!updatedJob)
      throw new ForbiddenError("You can only edit your own job posts.");

    return res.status(200).send({
      message: "Job updated successfully.",
      metadata: updatedJob,
    });
  }

  async deleteJob(req, res) {
    const { id } = req.params;
    const recruiterId = req.user._id;

    const deleted = await jobService.deleteJob(id, recruiterId);
    if (!deleted)
      throw new ForbiddenError("You can only delete your own job posts.");

    return res.status(200).send({
      message: "Job deleted successfully.",
    });
  }

  getPostedJobs = async (req, res) => {
    try {
      const { recruiterId } = req.params;

      const jobs = await Job.find({ company_id: recruiterId })
        .populate("company_id", "name location")
        .lean();

      res.json({ jobs });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
}

module.exports = new JobController();
