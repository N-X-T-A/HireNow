import React, { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useLanguage } from "../../hooks/useLanguage";
const ChatDetail = ({ selectedConversation, messages, onSendMessage }) => {
  const [message, setMessage] = useState("");
  const { translations } = useLanguage();

  const handleSendMessage = () => {
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage("");
  };

  return (
    <div className="flex flex-col border-2 p-4 h-full overflow-hidden">
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

      <div className=" flex-1 overflow-y-auto max-h-[525px] p-4">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={msg._id}
              className={` rounded-md w-full  ${msg.sender_id === selectedConversation.partner._id ? "text-left" : "text-right"}`}
            >
              <p
                className={`inline-block p-3 rounded-lg ${msg.sender_id === selectedConversation.partner._id ? "bg-gray-100" : "bg-blue-100"}`}
              >
                {msg.content}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">
            {translations["noMessages"]}
          </p>
        )}
      </div>

      <div className="p-4 flex items-center gap-2 border-t-1">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={translations["enterMessage"]}
          className="flex-[9] p-2 border-1 rounded-md focus:border-2 focus:outline-none resize-none"
        />
        <button
          onClick={handleSendMessage}
          className="p-2 flex-[1] bg-blue-500 text-white flex items-center justify-center rounded h-full"
        >
          <PaperAirplaneIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ChatDetail;
