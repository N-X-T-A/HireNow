"use strict";
const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Types.ObjectId, auto: true },
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    title: { type: String, required: true },
    skills: { type: [String], required: true },
    salary_range: { type: String, required: true },
    reasons_to_join: { type: String, required: true },
    required_experience: { type: String, required: true },
    responsibility: { type: String, required: true },
    description: { type: String, required: true },
    posted_date: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

module.exports = mongoose.model("Job", JobSchema);
