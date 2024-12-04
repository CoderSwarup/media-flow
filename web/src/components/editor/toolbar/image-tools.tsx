"use client";

import BgRemove from "./IamgesTool/bg-remove";
import AIBackgroundReplace from "./IamgesTool/bg-replace";
import ExtractPart from "./IamgesTool/extract-part";
import GenRemove from "./IamgesTool/gen-remove";
import GenerativeFill from "./IamgesTool/generative-fill";

export default function ImageTools() {
  return (
    <>
      <h1 className="font-extrabold	 text-md text-center weight-900">
        🚀 Image Editing Tool ⚙️
      </h1>
      <GenRemove />
      <BgRemove />
      <AIBackgroundReplace />
      <ExtractPart />
      <GenerativeFill />
    </>
  );
}
