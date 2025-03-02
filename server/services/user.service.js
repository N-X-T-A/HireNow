"use strict";

const { User } = require("../models");
const educationService = require("./education.service");
const experienceService = require("./experience.service");
const skillService = require("./skill.service");

class UserService {
  async updateProfile(userId, { name, phone, education, experience, skills }) {
    const user = await User.findById(userId);
    if (!user) {
      return { success: false, message: "Người dùng không tồn tại!" };
    }

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.isFirstLogin = false;
    await user.save();

    if (education?.length > 0)
      await educationService.updateUserEducation(userId, education);
    if (experience?.length > 0)
      await experienceService.updateUserExperience(userId, experience);
    if (skills?.length > 0) await skillService.updateUserSkills(userId, skills);

    return { success: true, message: "Thông tin cập nhật thành công!" };
  }
}

module.exports = new UserService();
