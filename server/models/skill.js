"use strict";
const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Types.ObjectId, auto: true },
    name: { type: String, required: true },
  },
  { timestamps: false }
);

module.exports = mongoose.model("Skill", SkillSchema);
