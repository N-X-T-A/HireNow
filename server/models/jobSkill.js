"use strict";
const mongoose = require("mongoose");

const JobSkillSchema = new mongoose.Schema({
  job_id: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  skill_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
    required: true,
  },
});

module.exports = mongoose.model("JobSkill", JobSkillSchema);
