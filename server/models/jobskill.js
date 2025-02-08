"use strict";
const mongoose = require("mongoose");

const JobSkillSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobListing",
      required: true,
    },
    skillId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobSkill", JobSkillSchema);
