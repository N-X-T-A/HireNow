import React, { useEffect, useState } from "react";
import ChatList from "../../components/chat/chatList";
import ChatDetail from "../../components/chat/chatDetail";
import JobP3Header from "../../components/user/jobP3Header";
import {
  fetchMessages,
  sendMessage,
  fetchConversations,
  markMessagesAsRead,
} from "../../apis/chatApi";
import { connectSocket, disconnectSocket, getSocket } from "../../utils/socket";

const UserPage3 = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    const socket = connectSocket(token);

    socket.on("newMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on("messagesRead", ({ conversation_id }) => {
      if (selectedConversation?._id === conversation_id) {
        getMessages(conversation_id);
      }
    });

    return () => {
      disconnectSocket();
    };
  }, [selectedConversation]);

  const getConversations = async (conversationId) => {
    try {
      const data = await fetchConversations();
      setConversations(data);

      if (conversationId) {
        const foundConversation = data.find(
          (conv) => conv._id === conversationId
        );
        if (foundConversation) {
          setSelectedConversation(foundConversation);
        }
      } else if (data.length > 0 && !selectedConversation) {
        setSelectedConversation(data[0]);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
      setConversations([]);
    }
  };

  const getMessages = async () => {
    if (!selectedConversation) return;
    try {
      const data = await fetchMessages(selectedConversation._id);
      setMessages(data);
    } catch (error) {
      console.warn("No messages found, waiting for the first message.");
      setMessages([]);
    }
  };

  useEffect(() => {
    getConversations();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      getMessages();
      markMessagesAsRead(selectedConversation._id);

      const socket = getSocket();
      if (socket) {
        socket.emit("joinConversation", selectedConversation._id);
      }
    }
  }, [selectedConversation]);

  const handleSendMessage = async (content) => {
    if (!selectedConversation) return;

    try {
      const newMessage = await sendMessage(selectedConversation._id, content);

      const socket = getSocket();
      if (socket) {
        socket.emit("sendMessage", newMessage);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      <JobP3Header />
      <div className=" flex gap-4 mt-2">
        <div className="w-1/4 bg-gray-100 dark:bg-gray-900 p-0 rounded-lg overflow-hidden">
          <ChatList
            conversations={conversations}
            onSelectUser={setSelectedConversation}
          />
        </div>

        <div className="w-3/4 bg-white dark:bg-gray-800 p-0 rounded-lg overflow-hidden">
          {selectedConversation ? (
            <ChatDetail
              selectedConversation={selectedConversation}
              messages={messages}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500">
                Select a conversation to start chat
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserPage3;
