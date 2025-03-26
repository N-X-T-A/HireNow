import { useEffect, useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import ChatList from "../components/chats/ChatList";
import ChatUI from "../components/chats/ChatUI";
import {
  fetchMessages,
  sendMessage,
  fetchConversations,
  Message,
  Conversation,
  markMessagesAsRead,
} from "../api/chatApi";

// Import socket utils
import { connectSocket, getSocket, disconnectSocket } from "../utils/socket";

export default function Chats() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Kết nối socket
    const token = localStorage.getItem("accessToken");
    if (token) connectSocket(token);

    const socket = getSocket();
    if (socket) {
      socket.on("connect", () => console.log("Socket connected"));
      socket.on("disconnect", () => console.log("Socket disconnected"));

      socket.on("newMessage", (newMessage: Message) => {
        if (newMessage.conversation_id === selectedConversation?._id) {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
        getConversations();
      });
    }

    // Ngắt kết nối khi rời khỏi trang
    return () => {
      disconnectSocket();
    };
  }, [selectedConversation]);

  const getConversations = async (conversationId?: string) => {
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

  const handleSendMessage = async (content: string) => {
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
      <PageMeta title="Chat Page" description="" />
      <PageBreadcrumb pageTitle="Chat" />

      <div className="h-[calc(80vh-100px)] flex gap-4">
        <div className="w-1/4 bg-gray-100 dark:bg-gray-900 p-0 rounded-lg overflow-hidden">
          <ChatList
            conversations={conversations}
            onSelectUser={setSelectedConversation}
          />
        </div>

        <div className="w-3/4 bg-white dark:bg-gray-800 p-0 rounded-lg overflow-hidden">
          {selectedConversation ? (
            <ChatUI
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
}
