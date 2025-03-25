"use strict";
const ChatService = require("../services/chat.service");

class ChatController {
  async sendMessage(req, res) {
    const { conversation_id, content } = req.body;
    const sender_id = req.user.id;

    try {
      const message = await ChatService.sendMessage(
        conversation_id,
        sender_id,
        content
      );
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getMessages(req, res) {
    const { conversation_id } = req.params;
    const user_id = req.user.id;

    try {
      const messages = await ChatService.getMessages(conversation_id);
      await ChatService.markMessagesAsRead(conversation_id, user_id);
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getConversations(req, res) {
    try {
      const user_id = req.user.id;
      const conversations = await ChatService.getConversations(user_id);

      if (!conversations.length) {
        return res
          .status(200)
          .json({ message: "No conversations found", metadata: [] });
      }

      res.status(200).json({
        message: "Conversations fetched successfully",
        metadata: conversations,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async markMessagesAsRead(req, res) {
    const { conversation_id } = req.body;
    const user_id = req.user.id;
    await ChatService.markMessagesAsRead(conversation_id, user_id);
    res.status(200).json({ message: "Messages marked as read" });
  }
}

module.exports = new ChatController();
