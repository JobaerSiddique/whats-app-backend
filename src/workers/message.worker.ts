import { Worker, Job } from "bullmq";
import mongoose from "mongoose";

import { env } from "../app/config/env";
import { Message } from "../app/modules/message/message.model";

/**
 * MongoDB Connection
 */
const connectDB = async () => {
  try {
    await mongoose.connect(env.Database_url);
    console.log("MongoDB Connected");
  } catch (error) {
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

  const worker = new Worker(
    "messageQueue",
    async (job: Job) => {
      const { messageId } = job.data;

      try {
        console.log("Processing job:", messageId);

        await Message.findByIdAndUpdate(messageId, {
          status: "processing",
        });

        console.log("Job processed:", messageId);
      } catch (error) {
        console.error("Worker error:", error);
        throw error;
      }
    },
    {
      connection: {
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
      },
    },
  );

  worker.on("completed", (job) => {
    console.log(`Job completed: ${job.id}`);
  });

  worker.on("failed", (job, err) => {
    console.error(`Job failed: ${job?.id}`, err);
  });
};

startWorker();
