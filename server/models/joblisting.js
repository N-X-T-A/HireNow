"use strict";
const mongoose = require("mongoose");

const JobListingSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "JobCategory" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: String },
    salaryRange: { type: String },
    location: { type: String },
    expiryDate: { type: Date },
    isHot: { type: Boolean, default: false },
    isNew: { type: Boolean, default: false },
    viewCount: { type: Number, default: 0 },
    keywords: { type: [String] },
    workplace: { type: String },
    jobDetails: { type: Object },
  },
  { timestamps: true }
);
