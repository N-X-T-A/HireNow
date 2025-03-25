"use strict";
const { Conversation, Message, UserProfile } = require("../models");

class ChatService {
  async sendMessage(conversation_id, sender_id, content) {
    let conversation = await Conversation.findById(conversation_id);

    if (!conversation) {
      throw new Error("Conversation not found");
    }

    const newMessage = await Message.create({
      conversation_id,
      sender_id,
      content,
      is_read: false,
    });

    conversation.last_message = content;
    conversation.last_message_time = new Date();
    conversation.unread_count += 1;
    await conversation.save();

    return newMessage;
  }

  async getMessages(conversation_id) {
    const conversation = await Conversation.findById(conversation_id);
    if (!conversation) {
      throw new Error("Conversation not found");
    }

    const messages = await Message.find({ conversation_id }).sort({
      createdAt: 1,
    });

    return messages;
  }

  async getConversations(user_id) {
    const conversations = await Conversation.find({
      $or: [{ applicant_id: user_id }, { recruiter_id: user_id }],
    })
      .populate("applicant_id", "_id")
      .populate("recruiter_id", "_id")
      .sort({ last_message_time: -1 })
      .lean();

    if (!conversations.length) {
      return [];
    }

    const userIds = conversations
      .flatMap((conv) => [conv.applicant_id._id, conv.recruiter_id._id])
      .map((id) => id.toString());

    const profiles = await UserProfile.find({ userId: { $in: userIds } })
      .select("userId username photoURL")
      .lean();

    const profileMap = profiles.reduce((acc, profile) => {
      acc[profile.userId.toString()] = profile;
      return acc;
    }, {});

    return conversations.map((conv) => {
      const isRecruiter = conv.recruiter_id._id.toString() === user_id;
      const partner = isRecruiter ? conv.applicant_id : conv.recruiter_id;
      const partnerProfile = profileMap[partner._id.toString()] || {};

      return {
        _id: conv._id,
        last_message: conv.last_message,
        last_message_time: conv.last_message_time,
        unread_count: conv.unread_count,
        partner: {
          _id: partner._id,
          username: partnerProfile.username || "Unknown",
          photoURL:
            partnerProfile.photoURL ||
            "https://res.cloudinary.com/dna4rtodi/image/upload/v1738904017/avatar_dzjb7j.png",
        },
      };
    });
  }

  async markMessagesAsRead(conversation_id, user_id) {
    await Message.updateMany(
      { conversation_id, sender_id: { $ne: user_id } },
      { is_read: true }
    );

    await Conversation.findByIdAndUpdate(conversation_id, { unread_count: 0 });
  }
}

module.exports = new ChatService();
