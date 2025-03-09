const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Types.ObjectId, auto: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["candidate", "recruiter"],
      default: "candidate",
    },
    profileId: {
      type: mongoose.Types.ObjectId,
      ref: "UserProfile",
      default: null,
    },
    companyId: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
