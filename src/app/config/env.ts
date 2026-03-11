import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string(),
  Database_url: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number(),
});

export const env = envSchema.parse(process.env);
