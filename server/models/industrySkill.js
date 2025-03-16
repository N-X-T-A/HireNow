"use strict";
const mongoose = require("mongoose");

const IndustrySkillSchema = new mongoose.Schema({
  title: { type: String, required: true },
  skill_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },
  ],
});

module.exports = mongoose.model("IndustrySkill", IndustrySkillSchema);
