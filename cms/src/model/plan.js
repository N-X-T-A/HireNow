import mongoose from "mongoose";
import slugify from "slugify";

const planSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slugId: { type: String, unique: true },
  price: { type: Number, required: true },
  isPopular: { type: Boolean, default: false },
  features: [{ type: String, required: true }],
});

planSchema.pre("save", async function (next) {
  const Plan = mongoose.model("Plan");

  if (this.isNew || this.isModified("name")) {
    this.slugId = slugify(this.name, { lower: true, strict: true });
  }

  if (this.isModified("isPopular") && this.isPopular) {
    await Plan.updateMany(
      { isPopular: true, _id: { $ne: this._id } },
      { $set: { isPopular: false } }
    );
  }

  next();
});

export const Plan = mongoose.model("Plan", planSchema);
