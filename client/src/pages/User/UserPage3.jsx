import React, { useState } from "react";
import ChatList from "../../components/chat/chatList";
import ChatDetail from "../../components/chat/chatDetail";
import JobP3Header from "../../components/user/jobP3Header";

const UserPage3 = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  return (
    <>
      <JobP3Header />
      <div className="flex w-full gap-2 mt-2">
        <div
          className="flex-1 md:flex-[3]  p-2 max-h-[900px] overflow-y-auto cursor-pointer"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <ChatList onSelectChat={setSelectedChat} />
        </div>
        <div
          className="hidden md:flex md:flex-[7] p-2  max-h-[900px] overflow-y-auto w-full"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <ChatDetail chatId={selectedChat} />
        </div>
      </div>
    </>
  );
};

export default UserPage3;
