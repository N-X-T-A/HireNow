"use strict";
const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, auto: true },
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  jobId: { type: mongoose.Types.ObjectId, ref: "Job", required: true },
});

module.exports = mongoose.model("Favorite", FavoriteSchema);
