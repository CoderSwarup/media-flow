"use client";

import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { FileWarning, X } from "lucide-react";
import { uploadImage } from "@/server/upload-image-action";
import { useEditorStore } from "@/store/editor-store";
import { useLayerStore } from "@/store/layer-store";
import Lottie from "react-lottie-player";
import animationData from "../../../../public/animations/image-upload.json";

export default function UploadImage() {
  const setGenerating = useEditorStore((state) => state.setGenerating);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const updateLayer = useLayerStore((state) => state.updateLayer);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/webp": [".webp"],
      "image/jpeg": ["jpeg"],
    },
    onDrop: async (acceptedFiles, fileRejections) => {
      if (acceptedFiles.length) {
        const formData = new FormData();
        formData.append("image", acceptedFiles[0]);
        //Generate Object url
        const objectUrl = URL.createObjectURL(acceptedFiles[0]);

        setGenerating(true);

        updateLayer({
          id: activeLayer.id,
          url: objectUrl,
          width: 0,
          height: 0,
          name: "uploading",
          publicId: "",
          format: "",
          resourceType: "image",
        });

        setActiveLayer(activeLayer.id);

        const res = await uploadImage({ image: formData });

        if (res?.data?.success) {
          updateLayer({
            id: activeLayer.id,
            url: res.data.success.url,
            width: res.data.success.width,
            height: res.data.success.height,
            name: res.data.success.original_filename,
            publicId: res.data.success.public_id,
            format: res.data.success.format,
            resourceType: res.data.success.resource_type,
          });

          setActiveLayer(activeLayer.id);
          setGenerating(false);
        }

        if (res?.data?.error) {
          setGenerating(false);
        }
      }

      if (fileRejections.length) {
        console.log("rejected");
        toast.error(fileRejections[0].errors[0].message, {
          style: {
            marginLeft: "10px",
          },
          icon: <FileWarning className="pr-[10px]" size={30} color="yellow" />,
          action: (
            <button
              onClick={() => toast.dismiss()} // Close the toast when clicked
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <X size={20} color="red" />
            </button>
          ),
        });
      }
    },
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        " hover:cursor-pointer hover:bg-secondary hover:border-primary transition-all  ease-in-out ",
        `${isDragActive ? "animate-pulse border-primary bg-secondary" : ""}`
      )}
    >
      <CardContent className="flex flex-col h-full items-center justify-center px-2 py-24  text-xs ">
        <input {...getInputProps()} />
        <div className="flex items-center flex-col justify-center gap-4">
          <Lottie
            className="h-48"
            animationData={animationData} // Pass the imported JSON object
            play
          />
          <p className="text-muted-foreground text-2xl">
            {isDragActive
              ? "Drop your image here!"
              : "Start by uploading an image"}
          </p>
          <p className="text-muted-foreground">
            Supported Formats .jpeg .jpg .png .webp
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
