"use strict";

const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  job_id: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  applicant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recruiter_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  last_message: { type: String },
  last_updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Conversation", conversationSchema);
