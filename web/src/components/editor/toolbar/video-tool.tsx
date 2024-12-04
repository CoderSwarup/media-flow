"use client";

import { useLayerStore } from "@/store/layer-store";
import VideoTranscription from "./videotools/transcribe";
import SmartCrop from "./videotools/smart-crop";

export default function VideoTools() {
  const activeLayer = useLayerStore((state) => state.activeLayer);
  if (activeLayer.resourceType === "video")
    return (
      <>
        <h1 className="font-extrabold	 text-md text-center weight-900">
          🚀 Video Editing Tool ⚙️
        </h1>
        <VideoTranscription />
        <SmartCrop />
      </>
    );
}
