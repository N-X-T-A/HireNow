import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});

export const Tag = mongoose.model("tag", TagSchema);
