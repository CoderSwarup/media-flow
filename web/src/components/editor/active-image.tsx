import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEditorStore } from "@/store/editor-store";
import { Layer, useLayerStore } from "@/store/layer-store";
import ImageComparison from "./image-comparison";

export default function ActiveImage() {
  const generating = useEditorStore((state) => state.generating);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const layerComparisonMode = useLayerStore(
    (state) => state.layerComparisonMode
  );
  const comparedLayers = useLayerStore((state) => state.comparedLayers);
  const layers = useLayerStore((state) => state.layers);

  if (!activeLayer.url && comparedLayers.length === 0) return null;

  const renderLayer = (layer: Layer) => (
    <div className="relative w-full h-full flex items-center justify-center min-w-[200px] min-h-[200px]">
      {layer.resourceType === "image" && (
        <Image
          alt={layer.name || "Image"}
          src={layer.url || ""}
          fill={true}
          className={cn(
            "rounded-lg object-contain ",
            generating ? "animate-pulse" : ""
          )}
        />
      )}
      {layer.resourceType === "video" && (
        <video
          width={layer.width}
          height={layer.height}
          controls
          className="rounded-lg object-contain max-w-full max-h-full"
          src={layer.transcriptionURL || layer.url}
        />
      )}
    </div>
  );

  if (layerComparisonMode && comparedLayers.length > 0) {
    const comparisonLayers = comparedLayers
      .map((id) => layers.find((layer) => layer.id === id))
      .filter(Boolean) as Layer[];

    return (
      <div className="w-full relative h-svh md:p-24 bg-secondary flex flex-col items-center justify-center">
        <ImageComparison layers={comparisonLayers} />
      </div>
    );
  }

  return (
    <div className="w-full h-full relative h-svh p-2 md:p-24 bg-secondary flex flex-col items-center justify-center">
      {renderLayer(activeLayer)}
    </div>
  );
}
