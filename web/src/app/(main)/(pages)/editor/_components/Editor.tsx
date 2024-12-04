"use client";
import ActiveImage from "@/components/editor/active-image";
import EditorLoadingScreen from "@/components/editor/editor-lodaing";
import Layers from "@/components/editor/layers";
import LayersSideBar from "@/components/editor/layers/layers-sidebar";
import ExportAsset from "@/components/editor/toolbar/export-media";
import ImageTools from "@/components/editor/toolbar/image-tools";
import VideoTools from "@/components/editor/toolbar/video-tool";
import UploadForm from "@/components/editor/upload/upload-form";
import UploadImage from "@/components/editor/upload/upload-image";
import { useLayerStore } from "@/store/layer-store";
import React from "react";

export default function Editor() {
  const activeLayer = useLayerStore((state) => state.activeLayer);

  return (
    <div className="flex flex-col-reverse md:flex-row w-full h-full overflow-x-hidden">
      <div className="py-6 px-4  min-w-48 flex flex-col gap-4">
        {activeLayer.resourceType === "image" && <ImageTools />}
        {activeLayer.resourceType === "video" && <VideoTools />}
        {activeLayer.resourceType && (
          <ExportAsset resource={activeLayer.resourceType} />
        )}
      </div>
      <EditorLoadingScreen />
      <UploadForm />
      <LayersSideBar />
      <ActiveImage />
      <div className="hidden md:block">
        <Layers />
      </div>
    </div>
  );
}
