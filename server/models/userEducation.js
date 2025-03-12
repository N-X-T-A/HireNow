"use strict";
const mongoose = require("mongoose");

const UserEducationSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, auto: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  institution: { type: String, default: null },
  degree: { type: String, default: null },
  field_of_study: { type: String, default: null },
  start_date: { type: Date, default: null },
  end_date: { type: Date, default: null },
  description: { type: String, default: null },
});

module.exports = mongoose.model("UserEducation", UserEducationSchema);
