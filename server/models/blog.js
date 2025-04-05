"use strict";
const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    short_title: { type: String },
    description: { type: String },
    image: { type: String, required: true },
    tags: { type: [String], ref: "Tag" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);
