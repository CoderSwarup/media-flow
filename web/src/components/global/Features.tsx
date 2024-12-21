import React from "react";
import { CardSpotlight } from "./ui/card-spotlight";
import { TextRevealCard } from "./ui/text-reveal-card";

export default function Features() {
  return (
    <div className="w-full h-full relative space-y-5">
      <TextRevealCard
        className="bg-transperent border-none"
        text="Discover More Features"
        revealText="Unlock More Features"
      ></TextRevealCard>
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3 max-w-6xl mx-auto">
        <CardSpotlight className="flex flex-col items-center   rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2 z-20">
            Upload & Convert
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm z-20">
            Drag and drop your videos, and let us handle the heavy lifting of
            transcoding into multiple resolutions for smooth playback.
          </p>
        </CardSpotlight>

        <CardSpotlight className="flex flex-col items-center   rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2 z-20">
            Customizable Timelines
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm z-20">
            Create or let AI generate interactive video timelines for enhanced
            user engagement.
          </p>
        </CardSpotlight>

        <CardSpotlight className="flex flex-col items-center   rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2 z-20">
            Captions & Subtitles
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm z-20">
            Add or generate captions in multiple languages to make your videos
            accessible to a global audience.
          </p>
        </CardSpotlight>

        <CardSpotlight className="flex flex-col items-center   rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2 z-20">
            Share Securely
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm z-20">
            Share your videos using customizable iframes with advanced
            restrictions like domain lock and expiration.
          </p>
        </CardSpotlight>

        <CardSpotlight className="flex flex-col items-center   rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2 z-20">
            Real-Time Analytics
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm z-20">
            Gain insights into view time, engagement, and overall performance
            with our analytics dashboard.
          </p>
        </CardSpotlight>

        <CardSpotlight className="flex flex-col items-center   rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2 z-20">
            High-Quality Thumbnails
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm z-20">
            Automatically generate high-resolution thumbnails for visually
            appealing previews of your videos.
          </p>
        </CardSpotlight>
      </div>
    </div>
  );
}
