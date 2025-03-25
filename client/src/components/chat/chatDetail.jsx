import { useState, useEffect } from "react";

const ChatDetail = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (chatId) {
      setMessages([
        { id: 1, text: "Xin chào!", sender: "user" },
        { id: 2, text: "Chào bạn!", sender: "me" },
      ]);
    }
  }, [chatId]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: Date.now(), text: newMessage, sender: "me" },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div
      className="w-full flex flex-col rounded-lg"
      style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
    >
      {chatId ? (
        <>
          <div className="flex-1 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 my-1 ${msg.sender === "me" ? "text-right" : "text-left"}`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${msg.sender === "me" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="p-2 border-t flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="Nhập tin nhắn..."
            />
            <button
              onClick={sendMessage}
              className="ml-2 p-2 bg-blue-500 text-white rounded"
            >
              Gửi
            </button>
          </div>
        </>
      ) : (
        <div className="text-center p-4">Chọn cuộc trò chuyện</div>
      )}
    </div>
  );
};

export default ChatDetail;
