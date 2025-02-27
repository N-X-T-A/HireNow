"use strict";
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true, default: null },
    phone: { type: String },
    location: { type: String },
    bio: { type: String },
    profile_picture: {
      type: String,
      default:
        "https://res.cloudinary.com/dna4rtodi/image/upload/v1738904017/avatar_dzjb7j.png",
    },
    role: { type: String, enum: ["candidate", "recruiter"], required: true },
    isFirstLogin: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
