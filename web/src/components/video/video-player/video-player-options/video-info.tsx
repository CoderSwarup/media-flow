"use client";
import { Video } from "@/lib/types";
import React, { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CloudUpload, Paperclip, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";
import { updateVideoMetaData } from "@/actions/video-actions";
import { Label } from "@/components/ui/label";

// Schema for the form validation
const formSchema = z.object({
  videotitle: z.string().min(4),
  videodescription: z.string().min(10),
});

export default function VideoInfo({ video }: { video: Video }) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(
    video?.thumbnailUrl || null
  );
  const [sumbmitting, setSumbitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videotitle: video?.title || "",
      videodescription: video?.description || "",
    },
  });

  // Handle the image upload success and update the thumbnail URL
  const handleImageUpload = async (file: any) => {
    // console.log("✅ File Upload Success:", file);

    if (file && file.cdnUrl) {
      const uploadedImage = file.cdnUrl;
      setThumbnailUrl(uploadedImage); // Update the state with the uploaded image URL
    }
  };

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSumbitting(true);
    try {
      const updatedVideoData = {
        ...values,
        videoId: video.id,
        thumbnailUrl: thumbnailUrl,
      };

      const videoUpdate = await updateVideoMetaData(updatedVideoData);
      if (videoUpdate) {
        if (videoUpdate.description) {
          form.setValue("videodescription", videoUpdate.description);
        }
        setThumbnailUrl(videoUpdate.thumbnailUrl);
        form.setValue("videotitle", videoUpdate.title);
        toast.success("Video MetaData Upadated Sucessfully");
      } else {
        throw new Error("Video MetaData Not Update");
      }

      console.log(updatedVideoData);
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setSumbitting(false);
    }
  }

  return (
    <div>
      <div className="flex flex-col w-full justify-center items-center gap-2 my-2">
        <Label className="self-start text-md">Thumbnail</Label>
        {thumbnailUrl ? (
          // Show existing thumbnail if available
          <div className="relative w-[200px] h-[200px] ">
            <img
              src={thumbnailUrl}
              alt="Thumbnail"
              className="w-full h-full  rounded-md"
            />
            <Button
              onClick={() => setThumbnailUrl(null)} // Remove the current thumbnail if user wants to upload a new one
              className="absolute top-0 right-0 w-10 h-10 p-[2px] rounded-full "
            >
              <X size={32} />
            </Button>
          </div>
        ) : (
          // If no thumbnail, allow file upload
          <FileUploaderRegular
            sourceList="local, url"
            classNameUploader="uc-dark"
            pubkey={process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string}
            onFileUploadSuccess={handleImageUpload}
            multiple={false}
            maxLocalFileSizeBytes={5000000}
            imgOnly
          />
        )}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl mx-auto py-10"
        >
          {/* Video Title */}
          <FormField
            control={form.control}
            name="videotitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Title" type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Video Description */}
          <FormField
            control={form.control}
            name="videodescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button disabled={sumbmitting} type="submit">
            Submit
          </Button>
        </form>
      </Form>{" "}
    </div>
  );
}
