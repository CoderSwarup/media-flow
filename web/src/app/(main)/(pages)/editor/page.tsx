"use client";

import React from "react";
import Editor from "./_components/Editor";
import { EditorStore } from "@/store/editor-store";
import { LayerStore } from "@/store/layer-store";

export default function Page() {
  return (
    <EditorStore.Provider initialValue={{ generating: false }}>
      <LayerStore.Provider
        initialValue={{
          layers: [
            {
              id: crypto.randomUUID(),
              url: "",
              height: 0,
              width: 0,
              publicId: "",
            },
          ],
          layerComparisonMode: false,
        }}
      >
        <Editor />
      </LayerStore.Provider>
    </EditorStore.Provider>
  );
}
