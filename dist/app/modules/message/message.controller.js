"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessages = exports.sendMessageController = void 0;
const message_service_1 = require("./message.service");
const sendMessageController = async (req, res) => {
    const { phone, message } = req.body;
    const result = await (0, message_service_1.sendMessageService)(phone, message);
    res.json({
        success: true,
        data: result,
    });
};
exports.sendMessageController = sendMessageController;
const getMessages = async (req, res) => {
    try {
        const result = await (0, message_service_1.getMessagesFromDB)();
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get messages",
        });
    }
};
exports.getMessages = getMessages;
