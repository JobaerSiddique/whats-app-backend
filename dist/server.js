"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("./app"));
const qr_socket_1 = require("./app/modules/socket/qr.socket");
const db_1 = require("./app/config/db");
const whatapp_service_1 = require("./app/modules/whatsApp/whatapp.service");
const server = http_1.default.createServer(app_1.default);
const io = new socket_io_1.Server(server, {
    cors: { origin: "*" },
});
(0, qr_socket_1.initSocket)(io);
const start = async () => {
    await (0, db_1.connectDB)();
    (0, whatapp_service_1.initWhatsApp)();
    server.listen(5000, () => {
        console.log("Server running on port 5000");
    });
};
start();
