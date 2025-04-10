"use strict";
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["paypal", "zalopay"], required: true },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  servicePackage: { type: String, required: true },
  orderId: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", paymentSchema);
