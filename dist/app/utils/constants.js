"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGE_STATUS = exports.SOCKET_EVENTS = void 0;
exports.SOCKET_EVENTS = {
    CONNECTION: "connection",
    DISCONNECT: "disconnect",
    QR_CODE: "qr-code",
    READY: "ready",
    AUTHENTICATED: "authenticated",
    AUTH_FAILURE: "auth-failure",
    MESSAGE_SENT: "message-sent",
    MESSAGE_FAILED: "message-failed",
    DISCONNECTED: "disconnected",
};
exports.MESSAGE_STATUS = {
    PENDING: "pending",
    SENT: "sent",
    DELIVERED: "delivered",
    FAILED: "failed",
};
