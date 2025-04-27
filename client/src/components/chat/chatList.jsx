import React, { useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";

const ChatList = ({ conversations, onSelectUser }) => {
  const [search, setSearch] = useState("");
  const { translations } = useLanguage();

  const filteredConversations = conversations.filter((conversation) =>
    conversation.partner.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full  bg-white border-2 h-[800px]  rounded-lg p-4 flex flex-col">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
      />

      <ul className="flex-1 overflow-y-auto space-y-2">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conversation) => (
            <li
              key={conversation._id}
              className="flex items-center gap-3 p-4 border-b cursor-pointer hover:bg-gray-100"
              onClick={() => onSelectUser(conversation)}
            >
              <img
                src={conversation.partner.photoURL}
                alt={conversation.partner.username}
                className="w-10 h-10 rounded-full "
              />
              <div className="flex-1">
                <p className=" !mb-1 font-semibold">
                  {conversation.partner.username}
                </p>
                <p className="!mb-0 text-sm text-gray-500 line-clamp-2">
                  {conversation.last_message}
                </p>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-4">
            {translations["noConversations"]}
          </p>
        )}
      </ul>
    </div>
  );
};

export default ChatList;
