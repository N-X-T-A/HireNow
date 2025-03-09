const ChatService = require("../services/chat.service");

class ChatController {
  async startConversation(req, res) {
    try {
      const { job_id, applicant_id, recruiter_id } = req.body;
      const conversation = await ChatService.startConversation(
        job_id,
        applicant_id,
        recruiter_id
      );
      res.json(conversation);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Server error when starting conversation" });
    }
  }

  async getConversations(req, res) {
    try {
      const { userId, role } = req.params;
      const conversations = await ChatService.getConversations(userId, role);
      res.json(conversations);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Server error when fetching conversations" });
    }
  }

  async getMessages(req, res) {
    try {
      const messages = await ChatService.getMessages(
        req.params.conversation_id
      );
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Server error when fetching messages" });
    }
  }

  async sendMessage(req, res) {
    try {
      const { conversation_id, sender_id, content } = req.body;
      const message = await ChatService.sendMessage(
        conversation_id,
        sender_id,
        content
      );
      res.json(message);
    } catch (error) {
      res.status(500).json({ message: "Server error when sending message" });
    }
  }

  async editMessage(req, res) {
    try {
      const { message_id, content } = req.body;
      const updatedMessage = await ChatService.editMessage(message_id, content);
      res.json(updatedMessage);
    } catch (error) {
      res.status(500).json({ message: "Server error when editing message" });
    }
  }
}

module.exports = new ChatController();
