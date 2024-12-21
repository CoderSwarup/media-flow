"use server";
import { db } from "@/lib/db";
import redisClient, { VideoQueue } from "@/lib/redis-client";
import { currentUser } from "@clerk/nextjs/server";
import { VideoStatus } from "@prisma/client";
import { currentUserData } from "./user-actions";
import { Video } from "@/lib/types";
import { redirect } from "next/navigation";

type VideoTypes = {
  title?: string;
  description?: string;
  originalUrl?: string;
  thumbnailUrl?: string;
  status?: string;
};

export const createVideo = async (data: VideoTypes) => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("User not found");
    }
    const isUserExist = await db.user.findUnique({
      where: {
        clerkId: user?.id,
      },
    });

    if (!isUserExist) {
      throw new Error("User not found");
    }
    const video = await db.video.create({
      data: {
        title: data.title || "",
        originalUrl: data.originalUrl || "",
        userId: isUserExist?.id,
      },
    });
    console.log(video);

    await redisClient.set(
      `video:${video?.id}:status`,
      JSON.stringify({
        status: "QUEUE",
        userId: isUserExist.id,
        video,
      })
    );

    //add video to the queue
    const res = await VideoQueue.add(video?.id, {
      data: video,
    });

    return video;
  } catch (error) {
    return null;
  }
};

export const getVideos = async (): Promise<Video[]> => {
  try {
    const user = await currentUserData();
    if (!user) {
      throw new Error("User not found");
    }

    const videos = await db.video.findMany({
      where: {
        userId: user.id,
        status: {
          not: "PROCESSING",
        },
      },
      include: {
        captions: true,
        timelines: true,
        analytics: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return videos || [];
  } catch (error) {
    return [];
  }
};

export const updateVideoMetaData = async (data: {
  videoId: string;
  videotitle: string;
  thumbnailUrl?: string | null;
  videodescription?: string | null;
}) => {
  try {
    const user = await currentUserData();

    if (!user) {
      return redirect("/sign-in");
    }

    const video = await db.video.update({
      where: {
        id: data.videoId,
        userId: user.id,
      },
      data: {
        title: data.videotitle,
        thumbnailUrl: data.thumbnailUrl,
        description: data.videodescription,
      },
    });

    if (!video) return null;

    return video;
  } catch (error) {
    return null;
  }
};

export const uploadVideoCaptions = async (data: {
  language: string;
  url: string;
  videoId: string;
}) => {
  try {
    const user = await currentUserData();
    if (!user) {
      throw new Error("User not found");
    }

    const updateCaption = await db.caption.create({
      data: {
        videoId: data.videoId,
        language: data.language,
        url: data.url,
      },
    });

    if (!updateCaption) {
      return null;
    }

    return updateCaption;
  } catch (error) {
    return null;
  }
};

export const deleteVideo = async (videoId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return redirect("/sign-in");
    }
    const isUserExist = await db.user.findUnique({
      where: {
        clerkId: user?.id,
      },
    });

    if (!isUserExist) {
      return {
        message: "User Not Found",
        status: false,
      };
    }

    const video = await db.video.findUnique({
      where: {
        id: videoId,
        userId: isUserExist.id,
      },
    });

    if (!video) {
      return {
        message: "Video Not Found",
        status: false,
      };
    }

    const videoData = await redisClient.get(`video:${video?.id}:status`);

    if (videoData) {
      const video = JSON.parse(videoData);

      if (video.status === "PROCESSING") {
        return {
          message: "Video Is In Processing Mode Please Delete it Later!...",
          status: false,
        };
      }

      if (video?.status === "QUEUE") {
        await redisClient.del(`video:${video?.id}:status`);
      }
    }

    if (video?.status === "QUEUE") {
      await redisClient.del(`video:${video?.id}:status`);
    }

    if (video?.status === "PROCESSING") {
      return {
        message: "Video Is In Processing Mode Please Delete it Later!...",
        status: false,
      };
    }

    await db.video.delete({
      where: {
        id: videoId,
      },
    });

    return {
      message: "Video Deleted Successfully",
      status: true,
    };
  } catch (error) {
    return {
      message: "Error Deleting Video",
      status: false,
    };
  }
};
