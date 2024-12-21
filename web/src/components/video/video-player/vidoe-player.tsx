"use client";
import { Button } from "@/components/ui/button";
import React, { useRef, useState, useEffect } from "react";
import VideoJS from "../video-js";
import { Video } from "@/lib/types";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

type VideoPlayerProps = {
  video: Video;
};

const VideoPlayer = ({ video }: VideoPlayerProps) => {
  const playerRef = useRef(null);
  const transcodedplayerRef = useRef(null);

  const [resolution, setResolution] = useState(360);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    plugins: {
      qualityLevels: {
        default: "auto",
      },
    },
    sources: [
      {
        src: video?.originalUrl,
      },
    ],
  };

  const transcodedvideoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    plugins: {
      qualityLevels: {
        default: "auto",
      },
    },
    sources: [
      {
        src: `${process.env.NEXT_PUBLIC_AWS_VIDEO_ARN}/${process.env.NEXT_PUBLIC_TARGET_VIDEO_BUCKET}/${video.id}/output_${resolution}p/hls_${resolution}p.m3u8`,
        type: "application/x-mpegURL",
      },
    ],
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    player.on("waiting", () => {
      console.log("player is waiting");
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };

  const handleTranscodedPlayerReady = (player: any) => {
    transcodedplayerRef.current = player;

    player.on("waiting", () => {
      console.log("player is waiting");
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };

  return (
    <div className="grid auto-rows-min gap-4   lg:grid-cols-2">
      <div className="aspect-video rounded-xl bg-muted/50">
        <div className="container p-6">
          <div className="flex  items-start justify-between">
            <h3 className="text-4xl font-bold">Transcoded Video</h3>
            <Select
              onValueChange={(value) => {
                setResolution(+value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Auto</SelectLabel>
                  <SelectItem value="360">360p</SelectItem>
                  <SelectItem value="480">480p</SelectItem>
                  <SelectItem value="720">720p</SelectItem>
                </SelectGroup>
              </SelectContent>{" "}
            </Select>
          </div>

          <div className="max-w-screen-md mx-auto mt-10 rounded-lg overflow-hidden">
            <VideoJS
              options={transcodedvideoJsOptions}
              onReady={handleTranscodedPlayerReady}
            />
          </div>
        </div>
      </div>

      <div className="aspect-video rounded-xl bg-muted/50">
        <div className="container p-6">
          <div className="flex flex-col items-start">
            <h3 className="text-4xl font-bold">Original Video</h3>
          </div>

          <div className="max-w-screen-md mx-auto mt-10 rounded-lg overflow-hidden">
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
