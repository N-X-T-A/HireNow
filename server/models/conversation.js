"use strict";
const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
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
  last_message_time: { type: Date, default: Date.now },
  unread_count: { type: Number, default: 0 },
});

module.exports = mongoose.model("Conversation", conversationSchema);
