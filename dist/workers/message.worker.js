"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("../app/config/env");
const message_model_1 = require("../app/modules/message/message.model");
/**
 * MongoDB Connection
 */
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(env_1.env.Database_url);
        console.log("MongoDB Connected");
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};
/**
 * Worker Start
 */
const startWorker = async () => {
    await connectDB();
    console.log("Worker started");
    const worker = new bullmq_1.Worker("messageQueue", async (job) => {
        const { messageId } = job.data;
        try {
            console.log("Processing job:", messageId);
            await message_model_1.Message.findByIdAndUpdate(messageId, {
                status: "processing",
            });
            console.log("Job processed:", messageId);
        }
        catch (error) {
            console.error("Worker error:", error);
            throw error;
        }
    }, {
        connection: {
            host: env_1.env.REDIS_HOST,
            port: env_1.env.REDIS_PORT,
        },
    });
    worker.on("completed", (job) => {
        console.log(`Job completed: ${job.id}`);
    });
    worker.on("failed", (job, err) => {
        console.error(`Job failed: ${job?.id}`, err);
    });
};
startWorker();
