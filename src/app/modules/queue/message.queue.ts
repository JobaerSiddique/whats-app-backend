import { Queue } from "bullmq";
import { env } from "../../config/env";

export const messageQueue = new Queue("messageQueue", {
  connection: {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
  },
  defaultJobOptions: {
    attempts: 1, // retry off
  },
});
