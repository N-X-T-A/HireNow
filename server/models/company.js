"use strict";
const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    industry: { type: String },
    description: { type: String },
    website: { type: String },
    logoURL: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", CompanySchema);
