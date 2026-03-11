"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSocketIO = exports.initializeSocket = void 0;
// src/utils/socket.ts
const socket_io_1 = require("socket.io");
const logger_1 = require("./logger");
let io;
const initializeSocket = (server) => {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: ["http://localhost:3000"],
            credentials: true,
            methods: ["GET", "POST"],
        },
    });
    io.on("connection", (socket) => {
        logger_1.logger.info(`Client connected to socket: ${socket.id}`);
        // Authenticate socket connection
        socket.on("authenticate", (token) => {
            try {
                // Verify JWT token
                // Store user data in socket
                socket.data.authenticated = true;
                socket.emit("authenticated", { success: true });
            }
            catch (error) {
                socket.emit("error", { message: "Authentication failed" });
            }
        });
        socket.on("disconnect", () => {
            logger_1.logger.info(`Client disconnected from socket: ${socket.id}`);
        });
    });
    return io;
};
exports.initializeSocket = initializeSocket;
const getSocketIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized");
    }
    return io;
};
exports.getSocketIO = getSocketIO;
