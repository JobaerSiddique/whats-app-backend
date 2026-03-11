"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobStatusResponseSchema = exports.messageSendResponseSchema = exports.qrResponseSchema = exports.statusResponseSchema = exports.apiResponseSchema = void 0;
const zod_1 = require("zod");
// API Response schemas
const apiResponseSchema = (dataSchema) => zod_1.z.object({
    success: zod_1.z.boolean(),
    data: dataSchema.optional(),
    error: zod_1.z
        .object({
        message: zod_1.z.string(),
        statusCode: zod_1.z.number(),
        stack: zod_1.z.string().optional(),
    })
        .optional(),
});
exports.apiResponseSchema = apiResponseSchema;
// Status response schema
exports.statusResponseSchema = zod_1.z.object({
    isReady: zod_1.z.boolean(),
    hasQR: zod_1.z.boolean(),
});
// QR response schema
exports.qrResponseSchema = zod_1.z.object({
    qr: zod_1.z.string().optional(),
    message: zod_1.z.string().optional(),
});
// Message send response schema
exports.messageSendResponseSchema = zod_1.z.object({
    jobId: zod_1.z.string(),
    message: zod_1.z.string(),
});
// Job status response schema
exports.jobStatusResponseSchema = zod_1.z.object({
    id: zod_1.z.string(),
    state: zod_1.z.string(),
    data: zod_1.z.any(),
    result: zod_1.z.any().optional(),
    failedReason: zod_1.z.string().optional(),
    attempts: zod_1.z.number(),
});
