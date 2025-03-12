"use strict";

const {
  User,
  UserProfile,
  UserEducation,
  UserExperience,
  UserSkill,
} = require("../models");

class UserService {
  async updateProfile(userId, { name, phone, education, experience, skills }) {
    const user = await User.findById(userId);
    if (!user) {
      return { success: false, message: "User not found!" };
    }

    let profile = await UserProfile.findOne({ userId: user._id });
    if (!profile) {
      profile = new UserProfile({ userId: user._id, username: name, phone });
    } else {
      profile.username = name || profile.username;
      profile.phone = phone || profile.phone;
    }
    await profile.save();

    let userEducation = await UserEducation.findOne({ user_id: user._id });
    if (!userEducation) {
      userEducation = new UserEducation({ user_id: user._id });
    }
    Object.assign(userEducation, education);
    await userEducation.save();

    let userExperience = await UserExperience.findOne({ user_id: user._id });
    if (!userExperience) {
      userExperience = new UserExperience({ user_id: user._id });
    }
    Object.assign(userExperience, experience);
    await userExperience.save();

    if (skills?.length > 0) {
      await UserSkill.deleteMany({ user_id: user._id });
      const skillDocs = skills.map((skillId) => ({
        user_id: user._id,
        skill_id: skillId,
      }));
      await UserSkill.insertMany(skillDocs);
    }

    return { success: true, message: "Profile updated successfully!" };
  }
}

module.exports = new UserService();
