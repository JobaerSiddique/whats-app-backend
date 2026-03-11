// src/app/modules/message/message.interface.ts
import { Types } from "mongoose";

export enum MessageStatus {
  PENDING = "pending",
  QUEUED = "queued",
  PROCESSING = "processing",
  SENT = "sent",
  DELIVERED = "delivered",
  READ = "read",
  FAILED = "failed",
}

export enum MessageType {
  TEXT = "text",
  IMAGE = "image",
  VIDEO = "video",
  AUDIO = "audio",
  DOCUMENT = "document",
  LOCATION = "location",
  CONTACT = "contact",
}

export interface IMessage {
  messageId: string;
  to: string;
  from?: string;
  text: string;
  type: MessageType;
  status: MessageStatus;
  priority: "high" | "normal" | "low";
  attempts: number;
  maxAttempts: number;
  error?: string;
  sentAt?: Date;
  deliveredAt?: Date;
  readAt?: Date;
  failedAt?: Date;
  userId?: Types.ObjectId;
  sessionId?: string;
  metadata?: Record<string, any>;
  webhookUrl?: string;
  webhookSecret?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessageWebhook {
  webhookId: string;
  url: string;
  secret?: string;
  events: MessageStatus[];
  userId: Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessageTemplate {
  templateId: string;
  name: string;
  text: string;
  variables: string[];
  userId: Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessageStats {
  total: number;
  sent: number;
  delivered: number;
  read: number;
  failed: number;
  pending: number;
  successRate: number;
  averageDeliveryTime?: number;
}

export interface IMessageFilter {
  status?: MessageStatus;
  userId?: string;
  fromDate?: Date;
  toDate?: Date;
  to?: string;
  tags?: string[];
  search?: string;
}

export interface IMessageResponse {
  messageId: string;
  to: string;
  text: string;
  status: MessageStatus;
  sentAt?: Date;
  deliveredAt?: Date;
  readAt?: Date;
  error?: string;
}
