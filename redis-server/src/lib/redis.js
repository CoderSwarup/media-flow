import Redis from "ioredis";
import { config } from "../config/config.js";

export const redis = new Redis(config.REDIS_URL);

export const markVideoAsProcessing = async (
  key,
  value,
  expireTimeInSeconds
) => {
  if (expireTimeInSeconds) {
    await redis.set(key, JSON.stringify(value), "EX", expireTimeInSeconds);
  } else {
    await redis.set(key, JSON.stringify(value));
  }
};
