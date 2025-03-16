"use strict";

const moment = require("moment");
require("moment/locale/vi");
const { Job, IndustrySkill, Skill } = require("../models");
const skillService = require("./skill.service");

class JobService {
  async getAllJobs() {
    const jobs = await Job.find()
      .populate("company_id", "name logo background_image locations")
      .lean();

    const jobList = await Promise.all(
      jobs
        .filter((job) => job.company_id)
        .map(async (job) => {
          const industrySkillNames = await Skill.find({
            _id: { $in: job.skills },
          }).select("name");

          return {
            _id: job._id,
            title: job.title,
            salary_range: job.salary_range,
            skills: industrySkillNames.map((skill) => skill.name),
            posted_time: this.calculatePostedTime(job.posted_date),
            location: this.formatLocations(job.company_id.locations),
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
      .populate("company_id", "name logo background_image locations")
      .lean();

    const recommendedJobs = await Promise.all(
      jobs
        .filter((job) => job.company_id)
        .map(async (job) => {
          const industrySkillNames = await Skill.find({
            _id: { $in: job.skills },
          }).select("name");

          return {
            _id: job._id,
            title: job.title,
            salary_range: job.salary_range,
            posted_time: this.calculatePostedTime(job.posted_date),
            locations: job.company_id.locations || [],
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
      .populate("company_id", "name location logo background_image locations")
      .lean();

    if (!job) return { success: false, message: "Job not found!" };

    const industrySkill = await skillService.getIndustrySkill(job.skills);

    return {
      success: true,
      job: {
        _id: job._id,
        title: job.title,
        company: {
          _id: job.company_id._id,
          name: job.company_id.name,
          logo: job.company_id.logo,
          background_image: job.company_id.background_image,
          locations: job.company_id.locations,
        },
        skills: industrySkill,
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
    const jobs = await IndustrySkill.find().select("_id title");
    return jobs;
  };

  getSkillsByJobId = async (jobId) => {
    const industrySkill = await IndustrySkill.findById(jobId).populate(
      "skill_id",
      "name"
    );

    if (!industrySkill) return [];
    return industrySkill.skill_id.map((skill) => ({
      _id: skill._id,
      name: skill.name,
    }));
  };

  calculatePostedTime(posted_date) {
    return moment(posted_date).fromNow();
  }

  formatLocations(locations) {
    if (!locations || !locations.length) return "";

    const uniqueCities = [...new Set(locations.map((loc) => loc.city))];

    return uniqueCities.length === 1
      ? uniqueCities[0]
      : uniqueCities.join(" - ");
  }
}

module.exports = new JobService();
