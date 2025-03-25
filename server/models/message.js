"use strict";
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  conversation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
    required: true,
  },
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: { type: String, required: true },
  is_read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, expires: "180d" },
});

module.exports = mongoose.model("Message", messageSchema);
