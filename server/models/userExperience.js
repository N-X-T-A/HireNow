"use strict";
const mongoose = require("mongoose");

const UserExperienceSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, auto: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  company_name: { type: String, default: null },
  position: { type: String, default: null },
  start_date: { type: Date, default: null },
  end_date: { type: Date, default: null },
  description: { type: String, default: null },
});

module.exports = mongoose.model("UserExperience", UserExperienceSchema);
