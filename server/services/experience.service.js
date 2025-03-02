"use strict";

const { UserExperience } = require("../models");

class ExperienceService {
  async updateUserExperience(userId, experience) {
    await UserExperience.deleteMany({ user_id: userId });
    await UserExperience.insertMany(
      experience.map((exp) => ({ user_id: userId, ...exp }))
    );
  }

  async getUserExperience(userId) {
    return await UserExperience.find({ user_id: userId });
  }
}

module.exports = new ExperienceService();
