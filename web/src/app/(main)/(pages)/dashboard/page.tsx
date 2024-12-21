import { getVideos } from "@/actions/video-actions";
import VideoTable from "@/components/video/video-table";
import VideoCard from "@/components/video/video-table";
import { db } from "@/lib/db";
import React from "react";

const DashboardPage = async () => {
  const videos = await getVideos();

  return (
    <div className="flex flex-col gap-4 relative p-2">
      <h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b">
        Dashboard
      </h1>

      <div className="p-3">
        <VideoTable videos={videos} />
      </div>
    </div>
  );
};

export default DashboardPage;
