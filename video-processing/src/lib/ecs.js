import { ECSClient, StopTaskCommand } from "@aws-sdk/client-ecs";
import { config } from "../config/config.js";

const ecsClient = new ECSClient({ region: config.AWS_REGION });

export async function shutdownECSTask(clusterName, taskArn) {
  try {
    const command = new StopTaskCommand({
      cluster: clusterName,
      task: taskArn,
    });
    await ecsClient.send(command);
    console.log("ECS task shutdown successfully");
  } catch (error) {
    console.error("Error shutting down ECS task:", error);
  }
}
