"use strict";
const express = require("express");
const router = express.Router();

const ChatController = require("../controllers/chat.controller");
const asyncHandler = require("express-async-handler");

router.post("/start", asyncHandler(ChatController.startConversation));
router.get(
  "/conversations/:userId/:role",
  asyncHandler(ChatController.getConversations)
);
router.get(
  "/messages/:conversation_id",
  asyncHandler(ChatController.getMessages)
);
router.post("/send", asyncHandler(ChatController.sendMessage));
router.put("/edit", asyncHandler(ChatController.editMessage));

module.exports = router;
