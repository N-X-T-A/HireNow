const API_URL = "http://localhost:5000/api/v1/chat";
const TOKEN = localStorage.getItem("accessToken");

export interface Conversation {
  _id: string;
  last_message: string;
  last_message_time: string;
  unread_count: number;
  partner: {
    _id: string;
    username: string;
    photoURL: string;
    email: string;
  };
}

export interface Message {
  _id: string;
  sender_id: string;
  content: string;
  createdAt: string;
}

export const fetchConversations = async (): Promise<Conversation[]> => {
  const response = await fetch(`${API_URL}/conversations`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch conversations");
  }

  const data = await response.json();
  return data.metadata;
};

export const fetchMessages = async (
  conversationId: string
): Promise<Message[]> => {
  const response = await fetch(`${API_URL}/messages/${conversationId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }

  const data = await response.json();
  return data;
};

export const sendMessage = async (
  conversation_id: string,
  content: string
): Promise<Message> => {
  const response = await fetch(`${API_URL}/message`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ conversation_id, content }),
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  const data = await response.json();
  return data;
};

export const markMessagesAsRead = async (conversationId: string) => {
  const response = await fetch(`${API_URL}/messages/read`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ conversation_id: conversationId }),
  });

  if (!response.ok) {
    throw new Error("Failed to mark messages as read");
  }
};
