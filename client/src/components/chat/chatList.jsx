import { useState } from "react";

const ChatList = ({ onSelectChat }) => {
  const [chats, setChats] = useState([
    {
      id: 1,
      image: "/src/assets/login/3.webp",
      lastMessage: "Xin chào!",
      name: "Nguyễn Văn A",
    },
    {
      id: 2,
      image: "/src/assets/login/1.webp",
      lastMessage: "Xin chào!",
      name: "Trần Thị B",
    },
    {
      id: 3,
      image: "/src/assets/login/2.webp",
      lastMessage: "Xin chào!",
      name: "Trần Thị C",
    },
    {
      id: 4,
      image: "/src/assets/login/4.webp",
      lastMessage: "Xin chào!",
      name: "Trần Thị D",
    },
  ]);

  return (
    <div
      className="h-[800px] rounded-lg"
      style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
    >
      <div className="">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className="p-3 flex gap-4 items-center border-b hover:bg-gray-100 cursor-pointer"
          >
            <img
              src={chat.image}
              alt=""
              className="w-14 h-14 rounded-full object-cover"
            />
            <span className="flex flex-col gap-2 ">
              <p className="!mb-0">{chat.name}</p>
              <p className="!mb-0 text-gray-500">{chat.lastMessage}</p>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
