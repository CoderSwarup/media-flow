"use client";

import { Layer } from "@/store/layer-store";
import Image from "next/image";
import { ImgComparisonSlider } from "@img-comparison-slider/react";

export default function ImageComparison({ layers }: { layers: Layer[] }) {
  if (layers.length === 0) {
    return <div>No layers selected for comparison</div>;
  }

  if (layers.length === 1) {
    return (
      <div className="h-full ">
        <Image
          src={layers[0].url || ""}
          fill
          alt={layers[0].name || "Single image"}
          className=" rounded-lg  object-contain"
        />
      </div>
    );
  }

  return (
    <ImgComparisonSlider>
      <img
        slot="first"
        src={layers[0].url}
        alt={layers[0].name || "Image one"}
      />
      <img
        slot="second"
        src={layers[1].url}
        alt={layers[1].name || "Image two"}
      />
    </ImgComparisonSlider>
  );
}
