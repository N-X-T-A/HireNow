const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Types.ObjectId, auto: true },
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true },
    phone: { type: String, default: null },
    location: { type: String, default: null },
    bio: { type: String, default: null },
    photoURL: {
      type: String,
      default:
        "https://res.cloudinary.com/dna4rtodi/image/upload/v1738904017/avatar_dzjb7j.png",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserProfile", UserProfileSchema);
