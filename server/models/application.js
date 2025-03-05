"use strict";
const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Types.ObjectId, auto: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    job_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    cover_letter: { type: String },
    resume: { type: String },
    status: {
      type: String,
      enum: ["Submitted", "Viewed", "Interview", "Rejected", "Accepted"],
      default: "Submitted",
    },
    applied_date: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

module.exports = mongoose.model("Application", ApplicationSchema);
