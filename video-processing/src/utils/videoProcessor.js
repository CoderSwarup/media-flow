import { exec } from "child_process";
import { mkdirSync, readdirSync } from "fs";
import { join } from "path";
import { uploadToS3 } from "../lib/s3.js";
import { config } from "../config/config.js";

export async function processVideo(
  objectKey,
  inputFile,
  outputDir,
  bucketName,
  resolutions
) {
  try {
    console.log("Processing video");
    for (const res of resolutions) {
      console.log("Processing video for resolution:", res);

      const hlsPath = join(outputDir, `hls_${res}p`);
      const outputPath = join(outputDir, `output_${res}p`);

      mkdirSync(outputPath, { recursive: true });

      const command = `ffmpeg -i ${inputFile} -vf "scale=-2:${res}" -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 ${hlsPath}.m3u8`;

      await new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error running FFmpeg: ${error}`);
            reject(error);
          } else {
            console.log(`FFmpeg output: ${stdout}`);
            resolve();
          }
        });
      });

      console.log("Uploading video to S3 for resolution:", res);

      await uploadToS3(
        `${hlsPath}.m3u8`,
        bucketName,
        `${config.TARGET_BUCKET_KEY}/${config.VIDEO_ID}/output_${res}p/hls_${res}p.m3u8`
      );
      const segmentFiles = readdirSync(outputPath).filter((file) =>
        file.endsWith(".ts")
      );

      for (const segment of segmentFiles) {
        console.log(
          "Uploading video segment to S3 for resolution:",
          res,
          segment
        );

        await uploadToS3(
          join(outputPath, segment),
          bucketName,
          `${config.TARGET_BUCKET_KEY}/${config.VIDEO_ID}/output_${res}p/${segment}`
        );
      }
    }
  } catch (error) {
    console.error("Error processing video:", error);
  }
}
