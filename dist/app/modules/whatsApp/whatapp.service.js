"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWhatsAppMessage = exports.initWhatsApp = exports.client = void 0;
const whatsapp_web_js_1 = require("whatsapp-web.js");
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
exports.client = new whatsapp_web_js_1.Client({
    authStrategy: new whatsapp_web_js_1.LocalAuth(),
    puppeteer: {
        executablePath: "C:\\Users\\Jobaer Siddique\\.cache\\puppeteer\\chrome\\win64-146.0.7680.66\\chrome-win64\\chrome.exe",
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    },
});
const initWhatsApp = () => {
    exports.client.initialize();
    exports.client.on("qr", (qr) => {
        console.log("Scan this QR with WhatsApp");
        qrcode_terminal_1.default.generate(qr, { small: true });
    });
    exports.client.on("ready", () => {
        console.log("WhatsApp Ready ✅");
    });
    exports.client.on("disconnected", () => {
        console.log("WhatsApp Disconnected");
        exports.client.initialize();
    });
};
exports.initWhatsApp = initWhatsApp;
const sendWhatsAppMessage = async (phone, message) => {
    const chatId = `${phone}@c.us`;
    if (!exports.client.info) {
        throw new Error("WhatsApp not ready");
    }
    const response = await exports.client.sendMessage(chatId, message);
    return response;
};
exports.sendWhatsAppMessage = sendWhatsAppMessage;
