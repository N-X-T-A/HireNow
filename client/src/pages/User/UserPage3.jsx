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

const UserPage3 = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);

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
    }
  }, [selectedConversation]);

  const handleSendMessage = async (content) => {
    if (!selectedConversation) return;

    try {
      const newMessage = await sendMessage(selectedConversation._id, content);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      <div className="h-[calc(80vh-100px)] flex gap-4">
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
