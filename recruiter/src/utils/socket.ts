import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
const SOCKET_URL = "http://localhost:5000";

export const connectSocket = (token: string): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      auth: { token },
    });

    socket.on("connect", () => console.log("Socket connected"));
    socket.on("disconnect", () => console.log("Socket disconnected"));
  }
  return socket;
};

export const getSocket = (): Socket | null => {
  if (!socket) {
    console.warn("Socket is not connected!");
  }
  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
