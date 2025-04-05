import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    short_title: { type: String },
    description: { type: String },
    image: { type: String, required: true },
    tags: { type: [String], ref: "tag" },
  },
  { timestamps: true }
);

export const Blog = mongoose.model("blog", BlogSchema);
