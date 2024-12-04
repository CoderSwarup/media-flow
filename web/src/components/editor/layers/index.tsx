import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/editor-store";
import { useLayerStore } from "@/store/layer-store";
import { ArrowRight, Images, Layers2 } from "lucide-react";
import LayerImage from "./layer-editor";
import LayerInfo from "./layer-info";
import { useMemo } from "react";
import Image from "next/image";

export default function Layers() {
  const layers = useLayerStore((state) => state.layers);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const addLayer = useLayerStore((state) => state.addLayer);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);

  const layerComparisonMode = useLayerStore(
    (state) => state.layerComparisonMode
  );
  const setLayerComparisonMode = useLayerStore(
    (state) => state.setLayerComparisonMode
  );
  const comparedLayers = useLayerStore((state) => state.comparedLayers);
  const toggleComparedLayer = useLayerStore(
    (state) => state.toggleComparedLayer
  );
  const setComparedLayers = useLayerStore((state) => state.setComparedLayers);
  const generating = useEditorStore((state) => state.generating);

  const getLayerImage = useMemo(
    () => (id: string) => {
      const layer = layers.find((l) => l.id === id);
      return layer ? layer.url : "Nothing here";
    },
    [layers]
  );

  const visibleLayers = useMemo(
    () =>
      layerComparisonMode
        ? layers.filter((layer) => layer.url && layer.resourceType === "image")
        : layers,
    [layerComparisonMode, layers]
  );

  return (
    <Card className="basis-[320px] shrink-0  scrollbar-thin scrollbar-track-secondary overflow-y-scroll scrollbar-thumb-primary scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-x-hidden relative flex flex-col shadow-2xl">
      <CardHeader className="sticky top-0 z-50 px-4 py-6  min-h-28 bg-card shadow-sm">
        {layerComparisonMode ? (
          <div>
            <CardTitle className="text-sm pb-2">Comparing...</CardTitle>
            <CardDescription className="flex gap-2 items-center">
              <Image
                alt="compare"
                width={32}
                height={32}
                src={getLayerImage(comparedLayers[0]) as string}
              />
              {comparedLayers.length > 0 && <ArrowRight />}
              {comparedLayers.length > 1 ? (
                <Image
                  alt="compare"
                  width={32}
                  height={32}
                  src={getLayerImage(comparedLayers[1]) as string}
                />
              ) : (
                "Nothing here"
              )}
            </CardDescription>
          </div>
        ) : (
          <div className="flex flex-col gap-1 ">
            <CardTitle className="text-sm ">
              {activeLayer.name || "Layers"}
            </CardTitle>
            {activeLayer.width && activeLayer.height ? (
              <CardDescription className="text-xs">
                {activeLayer.width}X{activeLayer.height}
              </CardDescription>
            ) : null}
          </div>
        )}
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-2">
        {visibleLayers.map((layer, index) => (
          <div
            key={index}
            className={cn(
              "cursor-pointer ease-in-out hover:bg-secondary border border-transparent",
              {
                "animate-pulse": generating,
                "border-primary": layerComparisonMode
                  ? comparedLayers.includes(layer.id)
                  : activeLayer.id === layer.id,
              }
            )}
            onClick={() => {
              if (generating) return;
              setActiveLayer(layer.id);
              if (layerComparisonMode) {
                toggleComparedLayer(layer.id);
              } else {
                setActiveLayer(layer.id);
              }
            }}
          >
            <div className="relative p-4 flex items-center">
              <div className="flex gap-2 items-center h-8 w-full justify-between">
                {!layer.url ? (
                  <p className="text-xs font-medium justify-self-end ">
                    New layer
                  </p>
                ) : null}
                <LayerImage layer={layer} />
                {layers.length !== 1 && (
                  <LayerInfo layer={layer} layerIndex={index} />
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>

      <div className="sticky bottom-0 bg-card flex flex-col md:flex-row  gap-2 shrink-0 p-1">
        <Button
          onClick={() => {
            addLayer({
              id: crypto.randomUUID(),
              url: "",
              height: 0,
              width: 0,
              publicId: "",
              name: "",
              format: "",
            });
          }}
          className="w-full flex gap-2 rounded-none"
          variant={"outline"}
        >
          <span>Create Layers</span>
          <Layers2 className="text-secondary-foreground" size={18} />
        </Button>

        <Button
          disabled={
            generating ||
            !activeLayer.url ||
            activeLayer.resourceType === "video"
          }
          onClick={() => {
            if (generating) return;
            if (layerComparisonMode) {
              setLayerComparisonMode(!layerComparisonMode);
            } else {
              setComparedLayers([activeLayer.id]);
            }
          }}
          variant={layerComparisonMode ? "destructive" : "outline"}
          className="w-full flex gap-2 rounded-none"
        >
          <span className={cn("text-xs font-bold")}>
            {layerComparisonMode ? "Stop Comparing" : "Compare"}
          </span>
          {!layerComparisonMode && (
            <Images className="text-secondary-foreground" size={18} />
          )}
        </Button>
      </div>
    </Card>
  );
}
