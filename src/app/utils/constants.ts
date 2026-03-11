export const SOCKET_EVENTS = {
  CONNECTION: "connection",
  DISCONNECT: "disconnect",
  QR_CODE: "qr-code",
  READY: "ready",
  AUTHENTICATED: "authenticated",
  AUTH_FAILURE: "auth-failure",
  MESSAGE_SENT: "message-sent",
  MESSAGE_FAILED: "message-failed",
  DISCONNECTED: "disconnected",
} as const;

export const MESSAGE_STATUS = {
  PENDING: "pending",
  SENT: "sent",
  DELIVERED: "delivered",
  FAILED: "failed",
} as const;
