"use strict";
const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Types.ObjectId, auto: true },
    name: { type: String, default: "" },
    industry: { type: String },
    location: { type: String },
    description: { type: String },
    website: { type: String },
    logo: { type: String },
    background_image: { type: String },
    size: { type: String },
    founded_year: { type: Number },
    social_links: {
      linkedin: { type: String },
      facebook: { type: String },
    },
  },
  { timestamps: false }
);

module.exports = mongoose.model("Company", CompanySchema);
