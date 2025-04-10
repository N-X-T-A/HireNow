"use strict";
const mongoose = require("mongoose");
const generateSlug = require("../utils/slugify");

const planSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slugId: { type: String, unique: true },
  price: { type: Number, required: true },
  label: { type: String, default: null },
  features: [{ type: String, required: true }],
});

planSchema.pre("save", function (next) {
  if (!this.slugId && this.name) {
    this.slugId = generateSlug(this.name);
  }
  next();
});

module.exports = mongoose.model("Plan", planSchema);
