import { ECSClient, RunTaskCommand } from "@aws-sdk/client-ecs";
import { config } from "../config/config.js";

const ecsClient = new ECSClient({
  region: config.AWS_REGION,
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  },
});

export const runTask = async (runTaskParams) => {
  return ecsClient.send(new RunTaskCommand(runTaskParams));
};
