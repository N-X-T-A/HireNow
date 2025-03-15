"use strict";

const moment = require("moment");
require("moment/locale/vi");
const { Job, JobSkill, Skill } = require("../models");
const skillService = require("./skill.service");

class JobService {
  async getAllJobs() {
    const jobs = await Job.find()
      .populate("company_id", "name logo background_image")
      .lean();

    const jobList = await Promise.all(
      jobs
        .filter((job) => job.company_id)
        .map(async (job) => {
          const jobSkillNames = await Skill.find({
            _id: { $in: job.skills },
          }).select("name");
          return {
            _id: job._id,
            title: job.title,
            location: job.location,
            salary_range: job.salary_range,
            skills: jobSkillNames.map((skill) => skill.name),
            posted_time: this.calculatePostedTime(job.posted_date),
            company: {
              name: job.company_id.name,
              logo: job.company_id.logo || "",
              background_image: job.company_id.background_image || "",
            },
          };
        })
    );

    return jobList;
  }

  async getRecommendedJobs(userId) {
    const userSkills = await skillService.getUserSkills(userId);
    if (!userSkills.length) {
      return { success: false, message: "No skills found for the user!" };
    }

    const jobs = await Job.find()
      .populate("company_id", "name logo background_image")
      .lean();

    const recommendedJobs = await Promise.all(
      jobs
        .filter((job) => job.company_id)
        .map(async (job) => {
          const jobSkillNames = await Skill.find({
            _id: { $in: job.skills },
          }).select("name");
          return {
            _id: job._id,
            title: job.title,
            location: job.location,
            salary_range: job.salary_range,
            posted_time: this.calculatePostedTime(job.posted_date),
            skills: jobSkillNames.map((skill) => skill.name),
            company: {
              name: job.company_id?.name,
              logo: job.company_id?.logo,
              background_image: job.company_id?.background_image || "",
            },
          };
        })
    );

    return { success: true, jobs: recommendedJobs };
  }

  async getJobDetails(jobId) {
    const job = await Job.findById(jobId)
      .populate("company_id", "name location logo background_image")
      .lean();

    if (!job) return { success: false, message: "Job not found!" };

    const jobSkills = await skillService.getJobSkills(job.skills);

    return {
      success: true,
      job: {
        _id: job._id,
        title: job.title,
        company: {
          name: job.company_id.name,
          logo: job.company_id.logo,
          background_image: job.company_id.background_image,
          location: job.company_id.location,
        },
        skills: jobSkills,
        location: job.location,
        salary_range: job.salary_range,
        reasons_to_join: job.reasons_to_join,
        required_experience: job.required_experience,
        responsibility: job.responsibility,
        description: job.description,
        posted_time: this.calculatePostedTime(job.posted_date),
      },
    };
  }

  async updateJob(jobId, recruiterId, jobData) {
    const job = await Job.findById(jobId);
    if (!job) return null;

    if (String(job.company_id) !== String(recruiterId)) {
      return null;
    }

    delete jobData.company_id;

    const updatedJob = await Job.findByIdAndUpdate(jobId, jobData, {
      new: true,
      runValidators: true,
    })
      .populate("company_id", "name logo background_image")
      .lean();

    return {
      _id: updatedJob._id,
      title: updatedJob.title,
      location: updatedJob.location,
      salary_range: updatedJob.salary_range,
      posted_time: this.calculatePostedTime(updatedJob.posted_date),
      company: {
        name: updatedJob.company_id.name,
        logo: updatedJob.company_id.logo,
        background_image: updatedJob.company_id.background_image,
      },
    };
  }

  async deleteJob(jobId, recruiterId) {
    const job = await Job.findById(jobId);
    if (!job) return null;

    if (String(job.company_id) !== String(recruiterId)) {
      return null;
    }

    await Job.findByIdAndDelete(jobId);
    return true;
  }

  getAllJobsSkill = async () => {
    const jobs = await JobSkill.find().select("_id title");
    return jobs;
  };

  getSkillsByJobId = async (jobId) => {
    const jobSkills = await JobSkill.findById(jobId).populate(
      "skill_id",
      "name"
    );

    if (!jobSkills) return [];
    return jobSkills.skill_id.map((skill) => ({
      _id: skill._id,
      name: skill.name,
    }));
  };

  calculatePostedTime(posted_date) {
    return moment(posted_date).fromNow();
  }
}

module.exports = new JobService();
