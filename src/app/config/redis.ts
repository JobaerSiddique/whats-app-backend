import Redis from "ioredis";
import config from ".";
import { logger } from "../utils/logger";

export const redis = new Redis({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,

  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 3,
});

redis.on("connect", () => {
  logger.info("Redis connected successfully");
});

redis.on("error", (error) => {
  logger.error("Redis connection error:", error);
});
