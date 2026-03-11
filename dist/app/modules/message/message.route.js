"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRoutes = void 0;
const express_1 = __importDefault(require("express"));
const message_controller_1 = require("./message.controller");
const validation_1 = require("../../middleware/validation");
const message_vaildation_1 = require("./message.vaildation");
const router = express_1.default.Router();
router.post("/send", (0, validation_1.validateRequest)(message_vaildation_1.sendMessageSchema), message_controller_1.sendMessageController);
// router.get("/", getMessages);
exports.messageRoutes = router;
