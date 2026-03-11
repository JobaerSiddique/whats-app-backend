import * as dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT,
  db: process.env.Database_url,
  secret: process.env.SECRET,
  accessToken: process.env.accessToken,
  RefreshToken: process.env.RefreshToken,
  salt_Rounds: process.env.SALT_ROUNDS,
  NODE_ENV: process.env.NODE_ENV,
  accessTokenExpires: process.env.access_Expires,
  refreshTokenExpires: process.env.refresh_Expires,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  WHATSAPP_SESSION_PATH: process.env.WHATSAPP_SESSION_PATH,
  SESSION_SECRET: process.env.SESSION_SECRET,
  MESSAGE_QUEUE_CONCURRENCY: process.env.MESSAGE_QUEUE_CONCURRENCY,
  RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS,
  RATE_LIMIT_MAX_REQUESTS: process.env.RATE_LIMIT_MAX_REQUESTS,
};
