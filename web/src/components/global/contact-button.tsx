"use client";
import { useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { GoogleGeminiEffect } from "./ui/google-gemini-effect";

export default function ContactButton() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);
  return (
    <div
      className="h-[400vh] bg-black w-full dark:border dark:bg-[#020817] rounded-md relative pt-40 overflow-clip"
      ref={ref}
    >
      <GoogleGeminiEffect
        title={`Transform Your Media with MediaFlow`}
        description={`Effortlessly manage, edit, and transcode your videos with the power of MediaFlow. Start automating your media workflow today and unlock limitless possibilities.`}
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
      />
    </div>
  );
}
