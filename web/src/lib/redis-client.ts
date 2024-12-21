import { Redis } from "ioredis";
import { Queue } from "bullmq";

const redisClient = new Redis(process.env.REDIS_URL as string);

export default redisClient;

export const VideoQueue = new Queue("VIDEO_QUEUE", {
  connection: {
    url: process.env.REDIS_URL,
  },
  defaultJobOptions: {
    removeOnComplete: true,
    attempts: 2,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
    removeOnFail: {
      count: 100,
    },
  },
});
