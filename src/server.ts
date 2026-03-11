import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";

import app from "./app";
import { initSocket } from "./app/modules/socket/qr.socket";
import { connectDB } from "./app/config/db";
import { initWhatsApp } from "./app/modules/whatsApp/whatapp.service";
import { env } from "./app/config/env";

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

initSocket(io);

const start = async () => {
  await connectDB();

  initWhatsApp();

  server.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
};

start();
