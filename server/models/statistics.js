"use strict";
const mongoose = require("mongoose");

const statisticsSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    monthly: {
      categories: {
        type: [String],
        required: true,
        default: [],
      },
      series: [
        {
          name: { type: String, required: true },
          data: { type: [Number], required: true },
        },
      ],
    },
    quarterly: {
      categories: {
        type: [String],
        required: true,
        default: [],
      },
      series: [
        {
          name: { type: String, required: true },
          data: { type: [Number], required: true },
        },
      ],
    },
    annually: {
      categories: {
        type: [String],
        required: true,
        default: [],
      },
      series: [
        {
          name: { type: String, required: true },
          data: { type: [Number], required: true },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Statistics", statisticsSchema);
