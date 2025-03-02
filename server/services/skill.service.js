"use strict";

const { UserSkill, JobSkill } = require("../models");

class SkillService {
  async updateUserSkills(userId, skills) {
    await UserSkill.deleteMany({ user_id: userId });
    await UserSkill.insertMany(
      skills.map((skill_id) => ({ user_id: userId, skill_id }))
    );
  }

  async getUserSkills(userId) {
    return await UserSkill.find({ user_id: userId }).select("skill_id");
  }

  async getJobSkills(jobId) {
    return await JobSkill.find({ job_id: jobId }).populate("skill_id", "name");
  }
}

module.exports = new SkillService();
