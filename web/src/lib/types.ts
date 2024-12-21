import { VideoStatus } from "@prisma/client";
import { z } from "zod";

export const EditUserProfileSchema = z.object({
  email: z.string().email("Required"),
  name: z.string().min(1, "Required"),
});

export interface User {
  id: string;
  clerkId: string;
  name: string;
  email: string;
  profileImage?: string;
  tier: string;
  credits: number;
  createdAt: Date;
  updatedAt: Date;
  videos: Video[];
}

export interface Caption {
  id: string;
  language: string;
  url: string;
  videoId: string;
  createdAt: Date;
}

export interface Timeline {
  id: string;
  title: string;
  description: string | null | undefined;
  startTime: number;
  endTime: number;
  isAIGenerated: boolean;
  videoId: string;
  createdAt: Date;
}

export interface VideoAnalytics {
  id: string;
  averageViewTime: number;
  totalViews: number;
  videoId: string;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Video {
  id: string;
  title: string;
  description?: string | null | undefined;
  originalUrl: string;
  thumbnailUrl?: string | null | undefined;
  status: VideoStatus;
  captions?: Caption[];
  timelines?: Timeline[];
  analytics?: VideoAnalytics | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
