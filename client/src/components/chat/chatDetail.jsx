import React, { useState } from "react";

const ChatDetail = ({ selectedConversation, messages, onSendMessage }) => {
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
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={msg._id}
              className={`mb-2.5 p-2.5 rounded-md max-w-xs ${msg.sender_id === selectedConversation.partner._id ? "bg-gray-100" : "bg-blue-100"}`}
            >
              <p>{msg.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No messages yet</p>
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
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatDetail;
