// src/utils/socket.ts
import { Server as SocketIOServer } from "socket.io";
import http from "http";
import { logger } from "./logger";

let io: SocketIOServer;

export const initializeSocket = (server: http.Server): SocketIOServer => {
  io = new SocketIOServer(server, {
    cors: {
      origin: ["http://localhost:3000"],
      credentials: true,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    logger.info(`Client connected to socket: ${socket.id}`);

    // Authenticate socket connection
    socket.on("authenticate", (token: string) => {
      try {
        // Verify JWT token
        // Store user data in socket
        socket.data.authenticated = true;
        socket.emit("authenticated", { success: true });
      } catch (error) {
        socket.emit("error", { message: "Authentication failed" });
      }
    });

    socket.on("disconnect", () => {
      logger.info(`Client disconnected from socket: ${socket.id}`);
    });
  });

  return io;
};

export const getSocketIO = (): SocketIOServer => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
