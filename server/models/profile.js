"use strict";
const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: { type: String, required: true },
    phoneNumber: { type: String },
    address: { type: String },
    summary: { type: String },
    resumeURL: { type: String },
    age: { type: Number, required: false },
    desiredIndustry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobCategory",
      required: false,
    },
    desiredSkills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);
