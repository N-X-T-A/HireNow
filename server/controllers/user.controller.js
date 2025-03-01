"use strict";

const { User, UserEducation, UserExperience, UserSkill } = require("../models");

class UserController {
  updateProfile = async (req, res) => {
    try {
      const userId = req.params.id;
      const { name, phone, education, experience, skills } = req.body;

      // 🔹 Kiểm tra user có tồn tại không
      const user = await User.findById(userId);
      if (!user)
        return res.status(404).json({ message: "Người dùng không tồn tại!" });

      // 🔹 Cập nhật thông tin cá nhân
      user.name = name || user.name;
      user.phone = phone || user.phone;
      user.isFirstLogin = false;
      await user.save();

      // 🔹 Cập nhật học vấn (Xóa cũ -> Thêm mới)
      if (education && education.length > 0) {
        await UserEducation.deleteMany({ user_id: userId });
        await UserEducation.insertMany(
          education.map((edu) => ({
            user_id: userId,
            school: edu.school,
            degree: edu.degree,
            field_of_study: edu.field_of_study,
            start_year: edu.start_year,
            end_year: edu.end_year,
          }))
        );
      }

      // 🔹 Cập nhật kinh nghiệm (Xóa cũ -> Thêm mới)
      if (experience && experience.length > 0) {
        await UserExperience.deleteMany({ user_id: userId });
        await UserExperience.insertMany(
          experience.map((exp) => ({
            user_id: userId,
            company: exp.company,
            title: exp.title,
            start_date: exp.start_date,
            end_date: exp.end_date,
            description: exp.description,
          }))
        );
      }

      // 🔹 Cập nhật kỹ năng (Xóa cũ -> Thêm mới)
      if (skills && skills.length > 0) {
        await UserSkill.deleteMany({ user_id: userId });

        await UserSkill.insertMany(
          skills.map((skill_id) => ({
            user_id: userId,
            skill_id: skill_id,
          }))
        );
      }

      res.json({ message: "Thông tin cập nhật thành công!" });
    } catch (err) {
      console.error("Lỗi cập nhật hồ sơ:", err);
      res.status(500).json({ message: "Đã xảy ra lỗi khi cập nhật hồ sơ!" });
    }
  };
}

module.exports = new UserController();
