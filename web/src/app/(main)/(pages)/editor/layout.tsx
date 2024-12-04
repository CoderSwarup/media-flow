import { Metadata } from "next";
import React from "react";

type Props = { children: React.ReactNode };

export const metadata: Metadata = {
  title: "Media Flow Media Editor",
  description: "Edit , Optimize Your Video ,Images With AI.",
};

export default function MediaEditorLayout({ children }: Props) {
  return <main className="w-full h-full">{children}</main>;
}
