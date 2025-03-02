"use strict";
const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    industry: { type: String },
    location: { type: String },
    description: { type: String },
    website: { type: String },
    logo: { type: String },
  },
  { timestamps: false }
);

module.exports = mongoose.model("Company", CompanySchema);
