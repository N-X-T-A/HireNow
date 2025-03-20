"use strict";

const { ForbiddenError } = require("../core/error.response");
const { Job, User } = require("../models");
const jobService = require("../services/job.service");
const { formatLocations } = require("../utils/format");

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
      const userId = req.user.id;
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
      const {
        title,
        skills,
        salary_range,
        reasons_to_join,
        required_experience,
        responsibility,
        description,
      } = req.body;
      const newJob = new Job({
        title,
        company_id: req.user.companyId,
        skills,
        salary_range,
        reasons_to_join,
        required_experience,
        responsibility,
        description,
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
    const user = await User.findById(req.user.id).select("companyId");
    const recruiterId = user.companyId;

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
    const user = await User.findById(req.user.id).select("companyId");
    const recruiterId = user.companyId;
    const deleted = await jobService.deleteJob(id, recruiterId);
    if (!deleted)
      throw new ForbiddenError("You can only delete your own job posts.");

    return res.status(200).send({
      message: "Job deleted successfully.",
    });
  }

  getPostedJobs = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("companyId");
      const recruiterId = user.companyId;
      const jobs = await Job.find({ company_id: recruiterId })
        .populate("company_id", "name locations")
        .lean();

      const formattedJobs = jobs.map((job) => {
        const location = formatLocations(job.company_id.locations);
        const { company_id, ...jobWithoutCompanyId } = job;
        return {
          ...jobWithoutCompanyId,
          location,
        };
      });

      res.json({ jobs: formattedJobs });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getAllJobsSkill = async (req, res) => {
    try {
      const jobs = await jobService.getAllJobsSkill();
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: "Error fetching job list" });
    }
  };

  getSkillsByJobId = async (req, res) => {
    try {
      const { id } = req.params;
      const skills = await jobService.getSkillsByJobId(id);
      res.json(skills);
    } catch (error) {
      res.status(500).json({ error: "Error fetching skill list" });
    }
  };
}

module.exports = new JobController();
