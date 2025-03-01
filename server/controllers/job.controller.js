"use strict";

const { Job, UserSkill, Skill, JobSkill } = require("../models");

class JobController {
  getRecommendedJobs = async (req, res) => {
    try {
      const userId = req.params.id;

      // 🔹 Lấy danh sách kỹ năng của ứng viên
      const userSkills = await UserSkill.find({ user_id: userId }).select(
        "skill_id"
      );

      if (!userSkills.length) {
        return res
          .status(404)
          .json({ message: "Ứng viên chưa có kỹ năng nào được lưu!" });
      }

      const skillIds = userSkills.map((us) => us.skill_id.toString());

      // 🔹 Lấy danh sách công việc và công ty
      const jobs = await Job.find()
        .populate("company_id", "name location")
        .lean();

      // 🔹 Lấy tất cả kỹ năng của các công việc
      const jobSkills = await JobSkill.find()
        .populate("skill_id", "name")
        .lean();

      // 🔹 Ánh xạ JobSkill vào công việc
      const jobMap = jobs.map((job) => {
        const relatedSkills = jobSkills.filter(
          (js) => js.job_id.toString() === job._id.toString()
        );
        return {
          _id: job._id,
          title: job.title,
          company: job.company_id, // Chỉ giữ lại thông tin công ty
          skills: relatedSkills.map((js) => js.skill_id), // Danh sách kỹ năng yêu cầu
        };
      });

      res.json({ jobs: jobMap });
    } catch (err) {
      console.error("Lỗi khi lấy danh sách công việc phù hợp:", err);
      res
        .status(500)
        .json({ message: "Lỗi server khi tìm công việc phù hợp!" });
    }
  };
}

module.exports = new JobController();
