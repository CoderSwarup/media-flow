import { s3Client } from "@/lib/ecs-client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const getPresignedUrl = async (key: string, expires: number = 900) => {
  const timeStamp = new Date().getTime();
  const KEY = `${process.env.VIDEO_UPLOAD_KEY}/${key}`;
  const command = new PutObjectCommand({
    Bucket: process.env.VIDEO_BUCKET,
    Key: KEY,
  });

  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn: expires });
    return url;
  } catch (error) {
    console.error("Error generating presigned URL", error);
    return null;
  }
};
