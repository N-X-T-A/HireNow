"use strict";
const mongoose = require("mongoose");

const JobCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobCategory", JobCategorySchema);
