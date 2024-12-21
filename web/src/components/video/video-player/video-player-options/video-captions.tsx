"use client";
import React, { useState, useEffect } from "react";
import { Video } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import { toast } from "sonner";
import "@uploadcare/react-uploader/core.css";
import { uploadVideoCaptions } from "@/actions/video-actions";

interface VideoCaptionsProps {
  video: Video;
}

export default function VideoCaptions({ video }: VideoCaptionsProps) {
  const [captions, setCaptions] = useState<any>(video.captions);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en"); // Default language is 'en'

  const handleFileUploadSuccess = async (file: any) => {
    if (file && file.cdnUrl) {
      const newCaption = {
        language: selectedLanguage,
        url: file.cdnUrl,
        videoId: video.id,
      };

      try {
        const uploadcaption = await uploadVideoCaptions(newCaption);
        if (uploadcaption) {
          toast.success("Caption uploaded successfully.");
          setCaptions((prev: any) => [...prev.uploadcaption]);
        } else {
          toast.error("Failed to upload caption");
        }
      } catch (error) {
        console.error("Error uploading caption:", error);
        toast.error("Failed to upload caption.");
      }
    }
  };

  return (
    <div className="w-full p-3">
      <div className="flex w-full flex-col items-start justify-start gap-2">
        <h2 className="text-md font-bold">Captions</h2>
        <p className="text-xs text-zinc-600 dark:text-zinc-200">
          Add Captions, Subtitles, or notes to the Video. Supported formats are
          .VTT and .SRT.
        </p>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Select Language</label>
          <select
            className="border border-gray-300 p-2 rounded-md"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="hi">Hindi</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Upload Caption File</label>
          <FileUploaderRegular
            sourceList="local, url"
            className="uc-dark"
            pubkey={process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string}
            onFileUploadSuccess={handleFileUploadSuccess}
            multiple={false}
            maxLocalFileSizeBytes={5000000} // Limit file size to 5MB
            accept=".vtt,.srt"
          />
        </div>

        {video.captions &&
          video.captions.map((caption) => {
            return (
              <div className="flex flex-col gap-2 mt-4">
                <p className="text-sm font-medium">Existing Caption Files</p>
                <a
                  href={caption.url}
                  target="_blank"
                  className="text-blue-500 hover:underline"
                  download
                >
                  Download {caption.language.toUpperCase()} Caption
                </a>
              </div>
            );
          })}
      </div>
    </div>
  );
}
