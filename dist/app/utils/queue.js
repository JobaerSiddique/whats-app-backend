"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWorker = exports.createQueue = void 0;
// src/utils/queue.ts
const bull_1 = require("bull");
const logger_1 = __importDefault(require("./logger"));
const config_1 = __importDefault(require("../config"));
const redisOptions = {
    host: config_1.default.REDIS_HOST,
    port: config_1.default.REDIS_PORT,
    password: config_1.default.REDIS_PASSWORD,
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
};
const createQueue = (name) => {
    const queue = new bull_1.Queue(name, {
        redis: redisOptions,
        defaultJobOptions: {
            attempts: 3,
            backoff: {
                type: "exponential",
                delay: 2000,
            },
            removeOnComplete: true,
            removeOnFail: false,
        },
    });
    const scheduler = new bull_1.QueueScheduler(name, {
        redis: redisOptions,
    });
    logger_1.default.info(`Queue ${name} created`);
    return queue;
};
exports.createQueue = createQueue;
const createWorker = (name, processor) => {
    const worker = new bull_1.Worker(name, processor, {
        redis: redisOptions,
        concurrency: 5,
        limiter: {
            max: 100,
            duration: 1000,
        },
    });
    worker.on("completed", (job) => {
        logger_1.default.info(`Job ${job.id} completed successfully`);
    });
    worker.on("failed", (job, err) => {
        logger_1.default.error(`Job ${job?.id} failed:`, err);
    });
    worker.on("error", (err) => {
        logger_1.default.error("Worker error:", err);
    });
    return worker;
};
exports.createWorker = createWorker;
