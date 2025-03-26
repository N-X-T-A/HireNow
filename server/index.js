const app = require("./app");
const connectDB = require("./config/mongo.config");
require("dotenv").config();
const http = require("http");
const socketIo = require("socket.io");
const chatSocket = require("./socket/chat.socket");

const PORT = process.env.APP_PORT || 3001;

connectDB();

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: [process.env.CLIENT, process.env.RECRUITER],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

chatSocket(io);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
