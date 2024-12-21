"use client";
import { Video } from "@/lib/types";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "../ui/table";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type VideoTableProps = {
  videos: Video[];
};

const VideoTable = ({ videos }: VideoTableProps) => {
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  const handleClick = (videoId: string) => {
    router.push(`/dashboard/video/${videoId}`);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <Table>
      <TableCaption>A list of your videos.</TableCaption>

      {/* Table Header */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="w-[300px]">Original URL</TableHead>
          <TableHead>Thumbnail</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Created At</TableHead>
        </TableRow>
      </TableHeader>

      {/* Table Body */}
      <TableBody>
        {videos?.map((video) => (
          <TableRow key={video.id}>
            {/* Video ID with clickable effect */}
            <TableCell
              onClick={() => handleClick(video.id)}
              className="font-medium dark:hover:text-blue-700 hover:text-zinc-700 cursor-pointer transition-all"
            >
              {video.id}
            </TableCell>

            {/* Video Title */}
            <TableCell>{video.title}</TableCell>

            {/* Video Description */}
            <TableCell>{video.description || "N/A"}</TableCell>

            {/* Video Original URL */}
            <TableCell>
              <a
                href={video.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                {video.originalUrl}
              </a>
            </TableCell>

            {/* Video Thumbnail */}
            <TableCell>
              {video.thumbnailUrl ? (
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-20 h-20 object-cover"
                />
              ) : (
                <div className="w-20 h-20 flex justify-center items-center bg-gray-300 dark:bg-gray-600">
                  <span className="text-black dark:text-white text-xs">
                    No Thumbnail
                  </span>
                </div>
              )}
            </TableCell>

            {/* Video Status */}
            <TableCell>
              <span
                className={`font-semibold uppercase ${
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

            {/* Video Creation Date */}
            <TableCell className="text-right">
              {new Date(video.createdAt).toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      {/* Table Footer */}
      <TableFooter>
        <TableRow>
          <TableCell colSpan={8} className="text-center">
            Total Videos: {videos.length}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default VideoTable;
