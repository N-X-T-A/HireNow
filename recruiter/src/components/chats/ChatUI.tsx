import React, { useState } from "react";
import type { Conversation, Message } from "../../api/chatApi";
import { PaperPlaneIcon } from "../../icons";
import Loader from "../ui/loader/Loader";

interface ChatUIProps {
  selectedConversation: Conversation;
  messages: Message[];
  onSendMessage: (content: string) => void;
  loading: boolean;
}

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const isNewGroup = (current: string, previous?: string) => {
  if (!previous) return true;
  const currentTime = new Date(current).getTime();
  const previousTime = new Date(previous).getTime();
  return currentTime - previousTime > 10 * 60 * 1000;
};

const ChatUI: React.FC<ChatUIProps> = ({
  selectedConversation,
  messages,
  onSendMessage,
  loading,
}) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center gap-4 p-4 border-b bg-white">
        <img
          src={selectedConversation.partner.photoURL}
          alt={selectedConversation.partner.username}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex flex-col">
          <p className="text-lg font-semibold">
            {selectedConversation.partner.username}
          </p>
          <p className="text-sm text-gray-500">
            {selectedConversation.partner.email}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loader />
          </div>
        ) : messages?.length > 0 ? (
          messages.map((msg, index) => {
            const showDate =
              index === 0 ||
              isNewGroup(msg.createdAt, messages[index - 1]?.createdAt);

            return (
              <div key={msg._id}>
                {showDate && (
                  <div className="text-center text-sm text-gray-400 mb-2">
                    {formatDate(msg.createdAt)}
                  </div>
                )}

                <div
                  className={`mb-2.5 p-2.5 rounded-md max-w-xs ${
                    msg.sender_id === selectedConversation.partner._id
                      ? "bg-gray-100 justify-self-start"
                      : "bg-blue-100 justify-self-end"
                  }`}
                >
                  <p>{msg.content}</p>
                  <span className="text-xs text-gray-500">
                    {formatTime(msg.createdAt)}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-center justify-center">
            No messages yet
          </p>
        )}
      </div>

      <div className="p-4 flex items-center gap-2 border-t-1">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 p-2 border-none rounded-md focus:border-none focus:outline-none resize-none"
        />
        <button
          onClick={handleSendMessage}
          className="p-2 bg-blue-500 text-white rounded"
        >
          <PaperPlaneIcon />
        </button>
      </div>
    </div>
  );
};

export default ChatUI;
