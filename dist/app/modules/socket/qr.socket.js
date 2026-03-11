"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = void 0;
const whatapp_service_1 = require("../whatsApp/whatapp.service");
const initSocket = (io) => {
    whatapp_service_1.client.on("qr", (qr) => {
        io.emit("qr", qr);
    });
    whatapp_service_1.client.on("ready", () => {
        console.log("WhatsApp Ready");
    });
};
exports.initSocket = initSocket;
