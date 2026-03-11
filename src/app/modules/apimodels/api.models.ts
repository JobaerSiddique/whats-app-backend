import { z } from "zod";

// API Response schemas
export const apiResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    error: z
      .object({
        message: z.string(),
        statusCode: z.number(),
        stack: z.string().optional(),
      })
      .optional(),
  });

// Status response schema
export const statusResponseSchema = z.object({
  isReady: z.boolean(),
  hasQR: z.boolean(),
});

// QR response schema
export const qrResponseSchema = z.object({
  qr: z.string().optional(),
  message: z.string().optional(),
});

// Message send response schema
export const messageSendResponseSchema = z.object({
  jobId: z.string(),
  message: z.string(),
});

// Job status response schema
export const jobStatusResponseSchema = z.object({
  id: z.string(),
  state: z.string(),
  data: z.any(),
  result: z.any().optional(),
  failedReason: z.string().optional(),
  attempts: z.number(),
});

export type StatusResponse = z.infer<typeof statusResponseSchema>;
export type QRResponse = z.infer<typeof qrResponseSchema>;
export type MessageSendResponse = z.infer<typeof messageSendResponseSchema>;
export type JobStatusResponse = z.infer<typeof jobStatusResponseSchema>;
