"use strict";
const mongoose = require("mongoose");

const UserExperienceSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, auto: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  company_name: { type: String },
  position: { type: String },
  start_date: { type: Date },
  end_date: { type: Date },
  description: { type: String },
});

module.exports = mongoose.model("UserExperience", UserExperienceSchema);
