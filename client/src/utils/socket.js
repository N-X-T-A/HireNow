import { io } from "socket.io-client";

let socket = null;
const SERVER_URL = "http://localhost:5000";

export const connectSocket = (token) => {
  if (!socket) {
    socket = io(SERVER_URL, {
      auth: { token },
      transports: ["websocket"],
    });

    socket.on("connect", () => console.log("Socket connected:", socket.id));
    socket.on("disconnect", () => console.log("Socket disconnected"));
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("Socket disconnected manually");
  }
};

export const getSocket = () => socket;
