const ChatService = require("../services/chat.service");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join_room", (conversationId) => {
      socket.join(conversationId);
    });

    socket.on("send_message", async (data) => {
      const { conversation_id, sender_id, content } = data;
      const message = await ChatService.sendMessage(
        conversation_id,
        sender_id,
        content
      );
      io.to(conversation_id).emit("receive_message", message);
    });

    socket.on("edit_message", async (data) => {
      const { message_id, content } = data;
      const updatedMessage = await ChatService.editMessage(message_id, content);
      io.to(updatedMessage.conversation_id).emit(
        "update_message",
        updatedMessage
      );
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
