"use strict";
const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Types.ObjectId, auto: true },
    name: { type: String, default: "" },
    industry_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "IndustrySkill",
    },
    locations: [
      {
        city: String,
        detailed_location: String,
        _id: false,
      },
    ],
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
    servicePackage: {
      type: String,
      enum: ["none", "basic", "featured", "premium"],
      default: "none",
    },
  },
  { timestamps: false }
);

module.exports = mongoose.model("Company", CompanySchema);
