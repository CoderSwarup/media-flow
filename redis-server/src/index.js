import { Worker } from "bullmq";
import { markVideoAsProcessing, redis } from "./lib/redis.js";
import { config } from "./config/config.js";
import { runTask } from "./lib/ecs.js";

const Wait = () => new Promise((res, rej) => setTimeout(() => res(), 5000));

const worker = new Worker(
  "VIDEO_QUEUE",
  async (job) => {
    try {
      const videoDetails = job.data.data;

      const currentData = await redis.get(`video:${videoDetails.id}:status`);

      if (currentData) {
        const data = JSON.parse(currentData);

        data.status = "PROCESSING";

        await markVideoAsProcessing(`video:${videoDetails.id}:status`, data);

        console.log("Status updated successfully.");
      } else {
        throw new Error("Video data not found in Redis.");
      }

      const subnets = [
        config.AWS_SUBNET_1,
        config.AWS_SUBNET_2,
        config.AWS_SUBNET_3,
      ];

      const runTaskParams = {
        cluster: config.AWS_CLUSTER_ARN,
        taskDefinition: config.ECS_TASK_ARN,
        launchType: "FARGATE",
        networkConfiguration: {
          awsvpcConfiguration: {
            subnets,
            assignPublicIp: "ENABLED",
          },
        },
        overrides: {
          containerOverrides: [
            {
              name: config.CONTAINER_NAME,
              environment: [
                // { name: "VIDEO_DETAILS", value: JSON.stringify(videoDetails) },
                { name: "REDIS_URL", value: config.REDIS_URL },

                { name: "AWS_ACCESS_KEY", value: config.AWS_ACCESS_KEY },
                {
                  name: "AWS_SECRET_ACCESS_KEY",
                  value: config.AWS_SECRET_ACCESS_KEY,
                },
                { name: "AWS_REGION", value: config.AWS_REGION },

                { name: "VIDEO_BUCKET", value: config.VIDEO_BUCKET },
                { name: "VIDEO_KEY", value: config.VIDEO_KEY },
                {
                  name: "TARGET_BUCKET_NAME",
                  value: config.TARGET_BUCKET_NAME,
                },
                { name: "TARGET_BUCKET_KEY", value: config.TARGET_BUCKET_KEY },
                { name: "DATABASE_URL", value: config.DATABASE_URL },

                { name: "VIDEO_ID", value: videoDetails.id },
              ],
            },
          ],
        },
      };

      const response = await runTask(runTaskParams);
      console.log("ECS Task started:", response.tasks?.[0]?.taskDefinitionArn);
    } catch (error) {
      console.error("Error processing message:", error);
    }
  },
  {
    connection: {
      url: process.env.REDIS_URL,
    },
  }
);

worker.on("completed", (job) => {
  console.log("JOB COMPLETED");
});
