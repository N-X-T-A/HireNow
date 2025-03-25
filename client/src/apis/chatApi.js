const API_URL = "http://localhost:5000/api/v1/chat";
const TOKEN = sessionStorage.getItem("access_token");

export const fetchConversations = async () => {
  const response = await fetch(`${API_URL}/conversations`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("Failed to fetch conversations");
  const data = await response.json();
  return data.metadata;
};

export const fetchMessages = async (conversationId) => {
  const response = await fetch(`${API_URL}/messages/${conversationId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("Failed to fetch messages");
  return response.json();
};

export const sendMessage = async (conversation_id, content) => {
  const response = await fetch(`${API_URL}/message`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ conversation_id, content }),
  });

  if (!response.ok) throw new Error("Failed to send message");
  return response.json();
};

export const markMessagesAsRead = async (conversationId) => {
  const response = await fetch(`${API_URL}/messages/${conversationId}/read`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("Failed to mark messages as read");
  return response.json();
};
