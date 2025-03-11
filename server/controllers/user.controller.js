"use strict";

const userService = require("../services/user.service");

class UserController {
  updateProfile = async (req, res) => {
    try {
      const userId = req.user.id;
      const { name, phone, education, experience, skills } = req.body;

      const result = await userService.updateProfile(userId, {
        name,
        phone,
        education,
        experience,
        skills,
      });

      if (result.success) {
        return res.json({ message: result.message });
      } else {
        return res.status(404).json({ message: result.message });
      }
    } catch (err) {
      console.error("Lỗi cập nhật hồ sơ:", err);
      res.status(500).json({ message: "Đã xảy ra lỗi khi cập nhật hồ sơ!" });
    }
  };
}

module.exports = new UserController();
