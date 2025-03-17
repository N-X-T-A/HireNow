const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Types.ObjectId, auto: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String },
    role: {
      type: String,
      enum: ["candidate", "recruiter"],
      default: "candidate",
    },
    companyId: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
      default: null,
    },
    isFirstLogin: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
