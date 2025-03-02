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
    description: { type: String },
    location: { type: String },
    salary_range: { type: String },
    job_type: { type: String },
    experience_level: { type: String },
    deadline: { type: Date },
    posted_date: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

module.exports = mongoose.model("Job", JobSchema);
