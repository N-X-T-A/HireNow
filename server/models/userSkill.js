"use strict";
const mongoose = require("mongoose");

const UserSkillSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, auto: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  skill_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
    required: true,
  },
});

module.exports = mongoose.model("UserSkill", UserSkillSchema);
