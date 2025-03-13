"use strict";

const { UserSkill, Skill } = require("../models");

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

  async getJobSkills(skillIds) {
    const skills = await Skill.find({ _id: { $in: skillIds } }).select("name");
    return skills.map((skill) => skill.name);
  }
}

module.exports = new SkillService();
