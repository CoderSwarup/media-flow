"use client";

import { useLayerStore } from "@/store/layer-store";
import Lottie from "react-lottie-player";
import animationData from "../../../public/animations/loading.json";

import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "../ui/dialog";
import { useEditorStore } from "@/store/editor-store";

export default function EditorLoadingScreen() {
  const generating = useEditorStore((state) => state.generating);
  const setGenerating = useEditorStore((state) => state.setGenerating);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  return (
    <Dialog open={generating} onOpenChange={setGenerating}>
      <DialogContent className="sm:max-w-[425px] flex flex-col items-center">
        <DialogHeader>
          <DialogTitle>Editing {activeLayer.name}</DialogTitle>
          <DialogDescription>
            Please note that this operation might take up to a couple of
            seconds.
          </DialogDescription>
        </DialogHeader>
        <Lottie className="w-36" animationData={animationData} play />
      </DialogContent>
    </Dialog>
  );
}
