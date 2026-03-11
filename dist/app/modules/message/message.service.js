"use strict";
// import { messageQueue } from "../queue/message.queue";
// import { sendWhatsAppMessage } from "../whatsApp/whatapp.service";
// import { Message } from "./message.model";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessagesFromDB = exports.sendMessageService = void 0;
// export const sendMessageService = async (phone: string, message: string) => {
//   const saved = await Message.create({
//     phone,
//     message,
//   });
//   await messageQueue.add("sendMessage", {
//     messageId: saved._id,
//   });
//   await sendWhatsAppMessage(phone, message);
//   return saved;
// };
const message_queue_1 = require("../queue/message.queue");
const whatapp_service_1 = require("../whatsApp/whatapp.service");
const message_model_1 = require("./message.model");
const sendMessageService = async (phone, message) => {
    const saved = await message_model_1.Message.create({
        phone,
        message,
    });
    await message_queue_1.messageQueue.add("sendMessage", {
        messageId: saved._id,
    });
    // WhatsApp send using active client
    await (0, whatapp_service_1.sendWhatsAppMessage)(phone, message);
    await message_model_1.Message.findByIdAndUpdate(saved._id, {
        status: "sent",
    });
    return saved;
};
exports.sendMessageService = sendMessageService;
const getMessagesFromDB = async () => {
    const result = await message_model_1.Message.find().sort({ createdAt: -1 });
    return result;
};
exports.getMessagesFromDB = getMessagesFromDB;
