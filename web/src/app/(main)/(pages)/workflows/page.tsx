"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import { toast } from "sonner";
import videoAnimation from "../../../../../public/animations/video-upload.json";
import { cn } from "@/lib/utils";
import Features from "@/components/global/Features";
import { createVideo } from "@/actions/video-actions";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Table components from ShadCN
import { Loader } from "lucide-react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [isDropping, setIsDropping] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      return;
    }

    setIsUploading(true);
    const timestamp = Date.now();
    try {
      const urlResponse = await fetch("/api/video/upload", {
        method: "POST",
        body: JSON.stringify({ filename: `${timestamp}_${file?.name}` }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await urlResponse.json();
      const presignedUrl = json.url;
      const filename = json.filename;

      const response = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file?.type,
        },
      });

      console.log(response);

      if (response.ok) {
        const url = response.url.split("?")[0] || "";

        const data = await createVideo({
          title: file?.name,
          originalUrl: url,
        });
        console.log(data);

        toast.success("Video uploaded successfully and Processed In The Queue");
        getAllVideos();
      } else {
        toast.error("Failed to upload video");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsUploading(false);
      setFile(null);
    }
  };

  const getAllVideos = async () => {
    if (loading) return;
    setLoading(true);
    const res = await fetch("/api/video/redis-video");
    const json = await res.json();
    setVideos(json?.videos);
    setLoading(false);
  };

  const startPolling = () => {
    const intervalId = setInterval(() => {
      getAllVideos();
    }, 5000);

    setIntervalId(intervalId);
  };

  const stopPolling = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  useEffect(() => {
    getAllVideos();
  }, []);

  return (
    <div className="w-[100%] max-w-6xl mx-auto py-12 px-2 md:py-20 lg:py-10">
      <div className="grid gap-8 md:gap-12 lg:gap-8">
        <div className="grid gap-4 md:gap-6 lg:gap-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Video Platform
          </h1>
          <p className="text-gray-600 dark:text-gray-300  md:text-lg lg:text-xl leading-relaxed">
            Effortlessly upload videos by dragging and dropping them. We’ll
            automatically convert them into HLS format for smooth playback on
            any device. <br />
            Customize your videos with captions, dynamic thumbnails, and
            AI-generated timelines. Share them securely using embeddable
            iframes, and track performance with detailed analytics.
          </p>
        </div>

        <div className="rounded-xl p-6 md:p-8 lg:p-10 grid gap-6 md:gap-8 lg:gap-10">
          <label htmlFor="video" className="cursor-pointer">
            <div
              // className="flex items-center justify-center mx-40 aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg"
              className={cn(
                "hover:cursor-pointer hover:bg-secondary hover:border-primary border-2 p-2 transition-all ease-in-out rounded-3xl",
                `${
                  isDropping ? "animate-pulse border-primary bg-secondary" : ""
                }`
              )}
              onDragOver={(event) => {
                if (isUploading) return;
                event.preventDefault();

                setIsDropping(true);
              }}
              onDrop={(event) => {
                event.preventDefault();
                if (isUploading) {
                  toast.warning("Video is Alredy in Processing");
                  return;
                }
                setIsDropping(false);
                const files = event.dataTransfer.files;

                if (files.length) {
                  const file = files[0];
                  if (file.type.includes("video/")) {
                    setFile(file);
                  } else {
                    toast.error("Invalid file type, only videos are supported");
                  }
                }
              }}
            >
              <div className="flex flex-col items-center justify-center space-y-4">
                <Lottie className="h-40" animationData={videoAnimation} play />
                <p className="text-gray-500 dark:text-gray-400">
                  {isDropping
                    ? "Dropping..."
                    : "Drag and drop your videos here"}
                </p>
                <input
                  className="hidden"
                  id="video"
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  disabled={isUploading}
                />
                <p>{file?.name}</p>
                <div>
                  <Button
                    variant="outline"
                    onClick={handleUpload}
                    disabled={isUploading || !file}
                  >
                    {isUploading ? "Uploading..." : "Upload Video"}
                  </Button>
                </div>
              </div>
            </div>
          </label>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Button disabled={intervalId !== null} onClick={getAllVideos}>
                Refresh
              </Button>
              {intervalId ? (
                <Button onClick={stopPolling} variant={"destructive"}>
                  Stop Polling
                </Button>
              ) : (
                <Button onClick={startPolling}>Start Polling</Button>
              )}
            </div>

            <div className="space-y-5 my-5">
              <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white">
                Uploaded Videos
              </h1>

              <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
                {loading ? (
                  <div className="w-full flex justify-center items-center h-20">
                    <Loader className="w-12 h-12  border-blue-500 rounded-full animate-spin"></Loader>
                  </div>
                ) : (
                  <Table className="min-w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Video ID</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Original URL</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {videos?.map((video: any) => (
                        <TableRow
                          key={video.key}
                          className="border-t border-gray-200 dark:border-gray-700"
                        >
                          {/* Video Title and Link */}
                          <TableCell>
                            <Button
                              variant="link"
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                            >
                              {video.key
                                ?.replace("video:", "")
                                ?.replace(":status", "")}
                            </Button>
                          </TableCell>

                          {/* Created Date */}
                          <TableCell>
                            {new Date(
                              video?.video?.createdAt
                            )?.toLocaleString()}
                          </TableCell>

                          {/* Original URL */}
                          <TableCell>
                            <a
                              href={video?.video.originalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                            >
                              {video?.video.originalUrl}
                            </a>
                          </TableCell>

                          {/* Video Status */}
                          <TableCell>
                            <span
                              className={`font-semibold text-center uppercase ${
                                video.status === "QUEUE"
                                  ? "text-yellow-500"
                                  : video.status === "PROCESSING"
                                  ? "text-green-800"
                                  : video.status === "PROCESSED"
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {video.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </div>
          </div>
        </div>

        <Features />
      </div>
    </div>
  );
}
