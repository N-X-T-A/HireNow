"use strict";

const { UserEducation } = require("../models");

class EducationService {
  async updateUserEducation(userId, education) {
    await UserEducation.deleteMany({ user_id: userId });
    await UserEducation.insertMany(
      education.map((edu) => ({ user_id: userId, ...edu }))
    );
  }

  async getUserEducation(userId) {
    return await UserEducation.find({ user_id: userId });
  }
}

module.exports = new EducationService();
