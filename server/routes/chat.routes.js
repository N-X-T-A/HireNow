"use strict";
const express = require("express");
const router = express.Router();
const ChatController = require("../controllers/chat.controller");
const asyncHandler = require("express-async-handler");
const { verifyToken } = require("../middleware/auth");

router.post("/message", verifyToken, asyncHandler(ChatController.sendMessage));

router.get(
  "/messages/:conversation_id",
  verifyToken,
  asyncHandler(ChatController.getMessages)
);

router.get(
  "/conversations",
  verifyToken,
  asyncHandler(ChatController.getConversations)
);

router.post(
  "/messages/read",
  verifyToken,
  asyncHandler(ChatController.markMessagesAsRead)
);

module.exports = router;
