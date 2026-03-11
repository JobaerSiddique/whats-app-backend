"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageQueue = void 0;
const bullmq_1 = require("bullmq");
const env_1 = require("../../config/env");
exports.messageQueue = new bullmq_1.Queue("messageQueue", {
    connection: {
        host: env_1.env.REDIS_HOST,
        port: env_1.env.REDIS_PORT,
    },
    defaultJobOptions: {
        attempts: 1, // retry off
    },
});
