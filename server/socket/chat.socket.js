"use strict";

const ChatService = require("../services/chat.service");

const chatSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("joinConversation", (conversationId) => {
      socket.join(conversationId);
      console.log(`User ${socket.id} joined conversation: ${conversationId}`);
    });

    socket.on(
      "sendMessage",
      async ({ conversation_id, sender_id, content }) => {
        try {
          const message = await ChatService.sendMessage(
            conversation_id,
            sender_id,
            content
          );
          io.to(conversation_id).emit("newMessage", message);
        } catch (error) {
          console.error("Error sending message:", error.message);
        }
      }
    );

    socket.on("markAsRead", async ({ conversation_id, user_id }) => {
      try {
        await ChatService.markMessagesAsRead(conversation_id, user_id);
        io.to(conversation_id).emit("messagesRead", { conversation_id });
      } catch (error) {
        console.error("Error marking messages as read:", error.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

module.exports = chatSocket;
