"use strict";

const moment = require("moment");
require("moment/locale/vi");
const { Job } = require("../models");
const skillService = require("./skill.service");

class JobService {
  async getAllJobs() {
    const jobs = await Job.find().populate("company_id", "name").lean();
    return jobs.map((job) => ({
      _id: job._id,
      title: job.title,
      company: job.company_id.name,
      skills: job.skills,
      location: job.location,
      salary_range: job.salary_range,
      short_description: job.short_description,
      posted_time: this.calculatePostedTime(job.posted_date),
    }));
  }

  async getRecommendedJobs(userId) {
    const userSkills = await skillService.getUserSkills(userId);
    if (!userSkills.length) {
      return { success: false, message: "No skills found for the user!" };
    }

    const jobs = await Job.find().populate("company_id", "name logo").lean();
    const recommendedJobs = await Promise.all(
      jobs.map(async (job) => {
        const relatedSkills = await skillService.getJobSkills(job._id);
        return {
          _id: job._id,
          title: job.title,
          company: job.company_id,
          skills: relatedSkills.map((js) => js.skill_id.name),
          location: job.location,
          salary_range: job.salary_range,
          short_description: job.short_description,
          posted_time: this.calculatePostedTime(job.posted_date),
        };
      })
    );

    return { success: true, jobs: recommendedJobs };
  }

  async getJobDetails(jobId) {
    const job = await Job.findById(jobId)
      .populate("company_id", "name location")
      .lean();
    if (!job) return { success: false, message: "Job not found!" };
    job.posted_date = undefined;
    const jobSkills = await skillService.getJobSkills(jobId);
    return {
      success: true,
      job: {
        ...job,
        skills: jobSkills.map((js) => js.skill_id.name),
        posted_time: this.calculatePostedTime(job.posted_date),
      },
    };
  }

  async updateJob(jobId, recruiterId, jobData) {
    const job = await Job.findById(jobId).lean();
    if (!job) return null;

    if (String(job.recruiter_id) !== String(recruiterId)) {
      return null;
    }

    delete jobData.company_id;

    const updatedJob = await Job.findByIdAndUpdate(jobId, jobData, {
      new: true,
      runValidators: true,
    }).lean();
    return updatedJob;
  }

  async deleteJob(jobId, recruiterId) {
    const job = await Job.findById(jobId).lean();
    if (!job) return null;

    if (String(job.recruiter_id) !== String(recruiterId)) {
      return null;
    }

    await Job.findByIdAndDelete(jobId);
    return true;
  }

  calculatePostedTime(posted_date) {
    return moment(posted_date).fromNow();
  }
}

module.exports = new JobService();
