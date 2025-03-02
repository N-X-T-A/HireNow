const { Conversation, Message } = require("../models");

class ChatService {
  async startConversation(job_id, applicant_id, recruiter_id) {
    let conversation = await Conversation.findOne({
      job_id,
      applicant_id,
      recruiter_id,
    });

    if (!conversation) {
      conversation = await Conversation.create({
        job_id,
        applicant_id,
        recruiter_id,
      });
    }

    return conversation;
  }

  async getConversations(userId, role) {
    const filter =
      role === "recruiter"
        ? { recruiter_id: userId }
        : { applicant_id: userId };
    return await Conversation.find(filter).populate(
      "job_id recruiter_id applicant_id"
    );
  }

  async getMessages(conversation_id) {
    return await Message.find({ conversation_id });
  }

  async sendMessage(conversation_id, sender_id, content) {
    const message = await Message.create({
      conversation_id,
      sender_id,
      content,
    });
    await Conversation.findByIdAndUpdate(conversation_id, {
      last_message: content,
      last_updated: Date.now(),
    });
    return message;
  }

  async editMessage(message_id, content) {
    return await Message.findByIdAndUpdate(
      message_id,
      { content },
      { new: true }
    );
  }
}

module.exports = new ChatService();
