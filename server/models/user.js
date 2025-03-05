"use strict";
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Types.ObjectId, auto: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, default: null },
    phone: { type: String },
    location: { type: String },
    bio: { type: String },
    photoURL: {
      type: String,
      default:
        "https://res.cloudinary.com/dna4rtodi/image/upload/v1738904017/avatar_dzjb7j.png",
    },
    role: {
      type: String,
      enum: ["candidate", "recruiter"],
      default: "candidate",
    },
    isFirstLogin: { type: Boolean, default: true },
    companyId: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
      default: null,
    },
  },
  { timestamps: false }
);

module.exports = mongoose.model("User", UserSchema);
