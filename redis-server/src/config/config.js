import dotenv from "dotenv";
dotenv.config();

const _config = {
  AWS_REGION: process.env.AWS_REGION,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,

  REDIS_URL: process.env.REDIS_URL,

  VIDEO_BUCKET: process.env.VIDEO_BUCKET,
  VIDEO_KEY: process.env.VIDEO_KEY,
  TARGET_BUCKET_NAME: process.env.TARGET_BUCKET_NAME,
  TARGET_BUCKET_KEY: process.env.TARGET_BUCKET_KEY,

  ECS_TASK_ARN: process.env.ECS_TASK_ARN,
  AWS_CLUSTER_ARN: process.env.AWS_CLUSTER_ARN,
  CONTAINER_NAME: process.env.CONTAINER_NAME,

  AWS_SUBNET_1: process.env.AWS_SUBNET_1,
  AWS_SUBNET_2: process.env.AWS_SUBNET_2,
  AWS_SUBNET_3: process.env.AWS_SUBNET_3,

  DATABASE_URL: process.env.DATABASE_URL,
};

export const config = Object.freeze(_config);
