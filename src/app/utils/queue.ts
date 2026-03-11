// src/utils/queue.ts
import { Queue, Worker, QueueScheduler } from "bull";
import Redis from "ioredis";
import logger from "./logger";
import config from "../config";

const redisOptions = {
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
  password: config.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
};

export const createQueue = (name: string): Queue => {
  const queue = new Queue(name, {
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

  const scheduler = new QueueScheduler(name, {
    redis: redisOptions,
  });

  logger.info(`Queue ${name} created`);

  return queue;
};

export const createWorker = (
  name: string,
  processor: (job: any) => Promise<any>,
): Worker => {
  const worker = new Worker(name, processor, {
    redis: redisOptions,
    concurrency: 5,
    limiter: {
      max: 100,
      duration: 1000,
    },
  });

  worker.on("completed", (job) => {
    logger.info(`Job ${job.id} completed successfully`);
  });

  worker.on("failed", (job, err) => {
    logger.error(`Job ${job?.id} failed:`, err);
  });

  worker.on("error", (err) => {
    logger.error("Worker error:", err);
  });

  return worker;
};
