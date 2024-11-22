"use client";

import React, { useEffect, useState } from "react";
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

// Define Props
type Props = {
  userImage: string | null;
  onDelete?: () => Promise<void>;
  onUpload: (image: string) => Promise<void>;
};

const ProfilePicture = ({ userImage, onDelete, onUpload }: Props) => {
  const [image, setImage] = useState<string | null>(userImage);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setImage(userImage);
  }, [userImage]);

  const handleRemoveImage = async () => {
    await onDelete?.();
    setImage(null);
  };

  const handleImageUpload = async (file: any) => {
    console.log("✅File Upload Success:", file);

    if (file && file.cdnUrl) {
      const uploadedImage = file.cdnUrl;
      await onUpload(uploadedImage); // Call the onUpload handler passed via props
      setImage(uploadedImage); // Update the local state to display the image
    } else {
      setError("Failed to upload image.");
    }
  };

  return (
    <div className="flex-col">
      <p className="text-lg text-white">Profile Picture</p>
      <div className="flex h-[400px] flex-col items-center justify-center">
        {error && <p className="text-red-500">{error}</p>}
        {image ? (
          <>
            <div className="relative h-[300px] w-[300px] border border-2">
              <Image
                src={image}
                alt="User Image"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <Button
              onClick={handleRemoveImage}
              className="bg-transparent text-white/70 hover:bg-transparent hover:text-white"
            >
              <X /> Remove Image
            </Button>
          </>
        ) : (
          <>
            <FileUploaderRegular
              sourceList="local, url, camera, dropbox"
              classNameUploader="uc-dark"
              pubkey={process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string}
              onFileUploadSuccess={handleImageUpload}
              multiple={false}
              maxLocalFileSizeBytes={5000000}
              imgOnly
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePicture;
