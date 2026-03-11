"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageType = exports.MessageStatus = void 0;
var MessageStatus;
(function (MessageStatus) {
    MessageStatus["PENDING"] = "pending";
    MessageStatus["QUEUED"] = "queued";
    MessageStatus["PROCESSING"] = "processing";
    MessageStatus["SENT"] = "sent";
    MessageStatus["DELIVERED"] = "delivered";
    MessageStatus["READ"] = "read";
    MessageStatus["FAILED"] = "failed";
})(MessageStatus || (exports.MessageStatus = MessageStatus = {}));
var MessageType;
(function (MessageType) {
    MessageType["TEXT"] = "text";
    MessageType["IMAGE"] = "image";
    MessageType["VIDEO"] = "video";
    MessageType["AUDIO"] = "audio";
    MessageType["DOCUMENT"] = "document";
    MessageType["LOCATION"] = "location";
    MessageType["CONTACT"] = "contact";
})(MessageType || (exports.MessageType = MessageType = {}));
