"use strict";
const mongoose = require("mongoose");

const UserEducationSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, auto: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  institution: { type: String },
  degree: { type: String },
  field_of_study: { type: String },
  start_date: { type: Date },
  end_date: { type: Date },
  description: { type: String },
});

module.exports = mongoose.model("UserEducation", UserEducationSchema);
