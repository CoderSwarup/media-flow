import React from "react";

interface VideoAnalyticsProps {
  totalViews: number;
  averageViewTime: number;
}

const VideoAnalyticsCard: React.FC<VideoAnalyticsProps> = ({
  totalViews,
  averageViewTime,
}) => {
  const averageViewTimeInMinutes = (averageViewTime / 60).toFixed(2);

  return (
    <div className="mx-auto shadow-lg rounded-lg overflow-hidden p-6">
      <h2 className="text-xl font-semibold text-center text-zinc-800 dark:text-zinc-200 mb-4">
        Video Analytics
      </h2>
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-center justify-between border-2 p-3 rounded-md">
          <div className="text-sm text-gray-800 dark:text-gray-500">
            Total Views
          </div>
          <div className="text-lg font-medium text-zinc-700 dark:text-zinc-200 font-bold">
            {totalViews}
          </div>
        </div>

        <div className="flex flex-col items-center flex-wrap justify-between border-2 p-3 rounded-md">
          <div className="text-sm text-gray-800 dark:text-gray-500">
            Avg. Watch Time (Minutes)
          </div>
          <div className="text-lg font-medium text-zinc-700 dark:text-zinc-200 font-bold">
            {averageViewTimeInMinutes} mins
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoAnalyticsCard;
