import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";

import app from "./app";
import { initSocket } from "./app/modules/socket/qr.socket";
import { connectDB } from "./app/config/db";
import { initWhatsApp } from "./app/modules/whatsApp/whatapp.service";

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

initSocket(io);

const start = async () => {
  await connectDB();

  initWhatsApp();

  server.listen(5000, () => {
    console.log("Server running on port 5000");
  });
};

start();
